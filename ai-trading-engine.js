/**
 * AI TRADING ENGINE
 * Interprets technical indicators to generate trade signals.
 */

class AITradingEngine {
    constructor(config) {
        this.config = config;
    }

    /**
     * Analyzes a stock's historical and current data to generate a signal.
     * @param {string} symbol 
     * @param {Object[]} candles 
     * @param {number} currentPrice 
     * @returns {Object} Signal object
     */
    analyzeStock(symbol, candles, currentPrice) {
        if (!candles || candles.length < 50) {
            return {
                symbol,
                type: 'HOLD',
                confidence: 0,
                reason: 'Insufficient data for analysis (min 50 candles required)'
            };
        }

        const prices = candles.map(c => c.close);

        // Calculate Indicators
        const rsiArray = TechnicalIndicators.calculateRSI(prices, 14);
        const macd = TechnicalIndicators.calculateMACD(prices);
        const sma50Array = TechnicalIndicators.calculateSMA(prices, 50);
        const ema200Array = TechnicalIndicators.calculateEMA(prices, 200);

        const currentRSI = rsiArray[rsiArray.length - 1];
        const currentMACD = macd.macdLine[macd.macdLine.length - 1];
        const currentSignal = macd.signalLine[macd.signalLine.length - 1];
        const currentSMA50 = sma50Array.length > 0 ? sma50Array[sma50Array.length - 1] : null;
        const currentEMA200 = ema200Array.length > 0 ? ema200Array[ema200Array.length - 1] : null;

        // Advanced: SRZ and MMR (Z-Score)
        const srz = TechnicalIndicators.calculateSRZones(prices, 15);
        const zScores = TechnicalIndicators.calculateZScore(prices, 20);
        const currentZScore = zScores.length > 0 ? zScores[zScores.length - 1] : 0;

        let score = 0; // -100 to 100
        let reasons = [];

        // 1. RSI Logic (Mean Reversion & Extremes)
        if (currentRSI < 30) {
            score += 45; // Extreme value
            reasons.push('Deep Oversold (RSI < 30)');
        } else if (currentRSI < 40 && currentRSI > rsiArray[rsiArray.length - 2]) {
            score += 30;
            reasons.push('RSI Turning Up (Dip Buying Alert)');
        } else if (currentRSI > 70) {
            score -= 45;
            reasons.push('Deep Overbought (RSI > 70)');
        } else if (currentRSI > 60 && currentRSI < rsiArray[rsiArray.length - 2]) {
            score -= 30;
            reasons.push('RSI Turning Down (Weakness Detected)');
        }

        // Hard Filter: Never Buy if RSI is over 65 (Extreme risk of buying the top)
        if (currentRSI > 65 && score > 0) {
            score = -20;
            reasons.push('Blocked: Risk of buying the top (RSI too high)');
        }

        // 2. MACD Logic (Histogram Slope / Anticipatory Entry)
        const currentHist = currentMACD - currentSignal;
        const prevHist = macd.macdLine[macd.macdLine.length - 2] - macd.signalLine[macd.signalLine.length - 2];
        const prevHist2 = macd.macdLine[macd.macdLine.length - 3] - macd.signalLine[macd.signalLine.length - 3];

        if (currentHist > prevHist && prevHist > prevHist2) {
            score += 35; // Momentum is building (early entry)
            reasons.push('MACD Momentum Accelerating Upward');
        } else if (currentHist < prevHist && prevHist < prevHist2) {
            score -= 35;
            reasons.push('MACD Momentum Accelerating Downward');
        }

        // Confirmation vs Divergence
        if (currentMACD > currentSignal && currentHist > 0) {
            score += 15; // Confirmed bullish zone
        } else if (currentMACD < currentSignal && currentHist < 0) {
            score -= 15; // Confirmed bearish zone
        }

        // 4. Advanced Signals: Support/Resistance & MMR

        // Support Zone Check
        const nearSupport = srz.support.some(s => Math.abs(currentPrice - s) / s < 0.015);
        if (nearSupport && score > 0) {
            score += 20;
            reasons.push('SRZ: Price currently testing Support Zone');
        }

        // Resistance Zone Check
        const nearResistance = srz.resistance.some(r => Math.abs(currentPrice - r) / r < 0.015);
        if (nearResistance) {
            score -= 25;
            reasons.push('SRZ: Near Resistance Zone (Profit Taking Risk)');
        }

        // MMR (Mean Momentum Reversal)
        // Using currentHist and prevHist already defined in the MACD section above.

        if (currentZScore < -2.2 && currentHist > prevHist) {
            score += 30; // Momentum exhaustion at historical low
            reasons.push('MMR: Significant Momentum Reversal at Z-Score Low');
        } else if (currentZScore > 2.2 && currentHist < prevHist) {
            score -= 30; // Momentum exhaustion at historical high
            reasons.push('MMR: Significant Momentum Reversal at Z-Score High');
        }

        // 3. Long Term Trend & Mean Reversion (Only if EMA-200 is available)
        if (currentEMA200) {
            if (currentPrice < currentEMA200) {
                score -= 40; // Penalty for buying below 200-day trend
                reasons.push('Price below 200-day EMA (Bearish Territory)');
            } else {
                score += 20; // Bonus for being in a verified uptrend
            }
        }

        const smaDist = ((currentPrice - currentSMA50) / currentSMA50) * 100;

        if (smaDist < -7) {
            score += 35; // Deeper dip buying
            reasons.push('Mean Reversion: Oversold relative to 50-day SMA');
        } else if (smaDist > 15) {
            score -= 40;
            reasons.push('Risk: Extremely overextended from 50-day average');
        }

        // Final Signal Generation
        let type = 'HOLD';
        let confidence = Math.min(100, Math.abs(score));

        if (score >= 65) {
            type = 'BUY';
        } else if (score <= -60) {
            type = 'SELL';
        }

        return {
            symbol,
            type,
            confidence,
            reason: reasons.join(', ') || 'Neutral outlook',
            indicators: {
                rsi: currentRSI,
                macd: currentMACD,
                signal: currentSignal,
                sma50: currentSMA50
            }
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AITradingEngine;
}
