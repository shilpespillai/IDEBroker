/**
 * PAPER TRADING SYSTEM
 * Manages virtual portfolio and simulated trade execution.
 */

class Portfolio {
    constructor(startingBalance = 100000) {
        this.startingBalance = startingBalance;
        this.cash = startingBalance;
        this.positions = {}; // { SYMBOL: { shares: number, avgPrice: number } }
        this.load();
    }

    /**
     * Calculates the total value of the portfolio.
     * @param {Object} currentPrices { SYMBOL: price }
     * @returns {number}
     */
    getTotalValue(currentPrices) {
        let value = this.cash;
        for (const symbol in this.positions) {
            const price = currentPrices[symbol] || 0;
            value += this.positions[symbol].shares * price;
        }
        return value;
    }

    /**
     * Executes a buy order.
     * @param {string} symbol 
     * @param {number} shares 
     * @param {number} price 
     * @returns {boolean} Success
     */
    buy(symbol, shares, price) {
        const cost = shares * price;
        if (cost > this.cash) return false;

        this.cash -= cost;
        if (!this.positions[symbol]) {
            this.positions[symbol] = { shares: 0, avgPrice: 0 };
        }

        const current = this.positions[symbol];
        const totalCost = (current.shares * current.avgPrice) + cost;
        current.shares += shares;
        current.avgPrice = totalCost / current.shares;

        this.save();
        return true;
    }

    /**
     * Executes a sell order.
     * @param {string} symbol 
     * @param {number} shares 
     * @param {number} price 
     * @returns {boolean} Success
     */
    sell(symbol, shares, price) {
        if (!this.positions[symbol] || this.positions[symbol].shares < shares) return false;

        this.cash += shares * price;
        this.positions[symbol].shares -= shares;

        if (this.positions[symbol].shares === 0) {
            delete this.positions[symbol];
        }

        this.save();
        return true;
    }

    save() {
        const data = {
            cash: this.cash,
            positions: this.positions,
            startingBalance: this.startingBalance
        };
        localStorage.setItem('paper_trading_portfolio', JSON.stringify(data));
    }

    load() {
        const saved = localStorage.getItem('paper_trading_portfolio');
        if (saved) {
            const data = JSON.parse(saved);
            this.cash = data.cash;
            this.positions = data.positions;
            this.startingBalance = data.startingBalance;
        }
    }

    reset() {
        this.cash = this.startingBalance;
        this.positions = {};
        this.save();
    }
}

class TradeManager {
    constructor(portfolio) {
        this.portfolio = portfolio;
        this.history = [];
        this.loadHistory();
    }

    /**
     * Records a trade in the history.
     * @param {Object} trade { symbol, type, shares, price, time, reason }
     */
    recordTrade(trade) {
        trade.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        trade.time = trade.time || new Date().toISOString();
        this.history.unshift(trade);
        this.saveHistory();
    }

    saveHistory() {
        localStorage.setItem('paper_trading_history', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('paper_trading_history');
        if (saved) {
            this.history = JSON.parse(saved);
        }
    }

    getHistory() {
        return this.history;
    }

    calculateStats() {
        if (this.history.length === 0) return { winRate: 0, totalTrades: 0 };

        // Simple win rate based on realized trades would be complex here, 
        // let's just track total trades for now.
        return {
            totalTrades: this.history.length,
            buys: this.history.filter(t => t.type === 'BUY').length,
            sells: this.history.filter(t => t.type === 'SELL').length
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, TradeManager };
}
