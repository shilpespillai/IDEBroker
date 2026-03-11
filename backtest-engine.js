/**
 * BACKTEST ENGINE
 * Simulates trading strategies over historical market data.
 */

class BacktestEngine {
    constructor(aiEngine) {
        this.aiEngine = aiEngine;
    }

    /**
     * Runs a backtest for a specific symbol.
     * @param {string} symbol 
     * @param {Object[]} candles 
     * @param {number} initialBalance 
     * @returns {Object} Backtest report
     */
    run(symbol, candles, initialBalance = 100000) {
        if (!candles || candles.length < 60) {
            throw new Error('Insufficient historical data for backtesting.');
        }

        let balance = initialBalance;
        let position = 0; // Number of shares held
        let entryPrice = 0;
        let trades = [];
        let equityCurve = [];
        let winCount = 0;
        let lossCount = 0;
        let maxEquity = initialBalance;
        let maxDrawdown = 0;

        // Dynamic Warm-up: Don't lose too much data to indicators if the dataset is small.
        // We need at least some data for EMA-200, but we'll start earlier if needed.
        const startIndex = Math.min(200, Math.floor(candles.length * 0.2));

        let highestPrice = 0;

        for (let i = startIndex; i < candles.length; i++) {
            const currentCandle = candles[i];
            const currentPrice = currentCandle.close;
            const dataSlice = candles.slice(0, i + 1);

            // 🛡️ TRAILING STOP-LOSS CHECK
            if (position > 0) {
                // Update the highest price reached while holding this position
                if (currentPrice > highestPrice) {
                    highestPrice = currentPrice;
                }

                const dropFromPeak = ((highestPrice - currentPrice) / highestPrice) * 100;

                // Exit if price drops 5% from the highest point reached (Trailing Stop)
                // Widened from 3% to allow for more natural volatility
                if (dropFromPeak >= 5) {
                    const proceeds = position * currentPrice;
                    const profit = proceeds - (position * entryPrice);

                    balance += proceeds;
                    if (profit > 0) winCount++;
                    else lossCount++;

                    trades.push({
                        date: new Date(currentCandle.timestamp).toLocaleDateString(),
                        type: 'SELL (TRAILING STOP)',
                        price: currentPrice,
                        shares: position,
                        profit: profit,
                        balance: balance
                    });

                    position = 0;
                    entryPrice = 0;
                    highestPrice = 0;
                    continue;
                }
            }

            // Get AI signal for this point in time
            const signal = this.aiEngine.analyzeStock(symbol, dataSlice, currentPrice);

            // Execute Trades
            if (signal.type === 'BUY' && position === 0) {
                // Buy approx 10% of current balance worth of shares
                const amountToInvest = balance * 0.1;
                const sharesToBuy = Math.floor(amountToInvest / currentPrice);

                if (sharesToBuy > 0) {
                    position = sharesToBuy;
                    entryPrice = currentPrice;
                    highestPrice = currentPrice; // Reset peak tracker
                    const cost = sharesToBuy * currentPrice;
                    balance -= cost;

                    trades.push({
                        date: new Date(currentCandle.timestamp).toLocaleDateString(),
                        type: 'BUY',
                        price: currentPrice,
                        shares: sharesToBuy,
                        balance: balance
                    });
                }
            } else if (signal.type === 'SELL' && position > 0) {
                // Sell current position
                const proceeds = position * currentPrice;
                const profit = proceeds - (position * entryPrice);

                balance += proceeds;

                if (profit > 0) winCount++;
                else lossCount++;

                trades.push({
                    date: new Date(currentCandle.timestamp).toLocaleDateString(),
                    type: 'SELL',
                    price: currentPrice,
                    shares: position,
                    profit: profit,
                    balance: balance
                });

                position = 0;
                entryPrice = 0;
            }

            // Track performance
            const currentEquity = balance + (position * currentPrice);
            equityCurve.push({ date: currentCandle.timestamp, value: currentEquity });

            if (currentEquity > maxEquity) maxEquity = currentEquity;
            const dropdown = (maxEquity - currentEquity) / maxEquity;
            if (dropdown > maxDrawdown) maxDrawdown = dropdown;
        }

        // Close any remaining position at the final price
        if (position > 0) {
            const finalPrice = candles[candles.length - 1].close;
            const proceeds = position * finalPrice;
            const profit = proceeds - (position * entryPrice);
            balance += proceeds;

            if (profit > 0) winCount++;
            else lossCount++;

            trades.push({
                date: new Date(candles[candles.length - 1].timestamp).toLocaleDateString(),
                type: 'SELL (EXPIRED)',
                price: finalPrice,
                shares: position,
                profit: profit,
                balance: balance
            });
            position = 0;
        }

        const totalReturn = ((balance - initialBalance) / initialBalance) * 100;
        const winRate = (winCount + lossCount) > 0 ? (winCount / (winCount + lossCount)) * 100 : 0;

        return {
            symbol,
            initialBalance,
            finalBalance: balance,
            totalReturn,
            winRate,
            maxDrawdown: maxDrawdown * 100,
            totalTrades: trades.length,
            trades,
            equityCurve
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BacktestEngine;
}
