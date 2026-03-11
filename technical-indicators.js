/**
 * TECHNICAL INDICATORS MODULE
 * Core mathematical functions for stock analysis.
 */

class TechnicalIndicators {
    /**
     * Simple Moving Average (SMA)
     * @param {number[]} prices 
     * @param {number} period 
     * @returns {number[]}
     */
    static calculateSMA(prices, period) {
        if (prices.length < period) return [];
        let r = [];
        for (let i = period - 1; i < prices.length; i++) {
            const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            r.push(sum / period);
        }
        return r;
    }

    /**
     * Exponential Moving Average (EMA)
     * @param {number[]} prices 
     * @param {number} period 
     * @returns {number[]}
     */
    static calculateEMA(prices, period) {
        if (prices.length < period) return [];
        const k = 2 / (period + 1);
        let ema = [prices.slice(0, period).reduce((a, b) => a + b, 0) / period];
        for (let i = period; i < prices.length; i++) {
            ema.push((prices[i] - ema[ema.length - 1]) * k + ema[ema.length - 1]);
        }
        return ema;
    }

    /**
     * Relative Strength Index (RSI)
     * @param {number[]} prices 
     * @param {number} period 
     * @returns {number[]}
     */
    static calculateRSI(prices, period = 14) {
        if (prices.length <= period) return [];
        let gains = [];
        let losses = [];
        for (let i = 1; i < prices.length; i++) {
            const diff = prices[i] - prices[i - 1];
            gains.push(Math.max(0, diff));
            losses.push(Math.max(0, -diff));
        }

        let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
        let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

        let rsi = [];
        const smoothingFactor = (period - 1) / period;

        for (let i = period; i < prices.length; i++) {
            const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
            rsi.push(100 - (100 / (1 + rs)));

            if (i < prices.length - 1) {
                avgGain = (avgGain * (period - 1) + gains[i]) / period;
                avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
            }
        }
        return rsi;
    }

    /**
     * Moving Average Convergence Divergence (MACD)
     * @param {number[]} prices 
     * @returns {{macdLine: number[], signalLine: number[], histogram: number[]}}
     */
    static calculateMACD(prices) {
        const ema12 = this.calculateEMA(prices, 12);
        const ema26 = this.calculateEMA(prices, 26);

        // Adjust for diff in length
        const offset = ema12.length - ema26.length;
        const macdLine = [];
        for (let i = 0; i < ema26.length; i++) {
            macdLine.push(ema12[i + offset] - ema26[i]);
        }

        const signalLine = this.calculateEMA(macdLine, 9);
        const signalOffset = macdLine.length - signalLine.length;
        const histogram = [];
        for (let i = 0; i < signalLine.length; i++) {
            histogram.push(macdLine[i + signalOffset] - signalLine[i]);
        }

        return { macdLine, signalLine, histogram };
    }
    /**
     * Identifies Support and Resistance Zones (SRZ)
     * @param {number[]} prices 
     * @param {number} window Size for peak/valley detection
     * @returns {{support: number[], resistance: number[]}}
     */
    static calculateSRZones(prices, window = 10) {
        if (prices.length < window * 2) return { support: [], resistance: [] };
        let supports = [];
        let resistances = [];

        for (let i = window; i < prices.length - window; i++) {
            const current = prices[i];
            const slice = prices.slice(i - window, i + window + 1);

            // Peak (Resistance)
            if (current === Math.max(...slice)) {
                resistances.push(current);
            }
            // Valley (Support)
            if (current === Math.min(...slice)) {
                supports.push(current);
            }
        }

        // Simplify by clustering (optional, but good for "zones")
        const cluster = (arr) => {
            if (arr.length === 0) return [];
            arr.sort((a, b) => a - b);
            let clusters = [[arr[0]]];
            for (let i = 1; i < arr.length; i++) {
                const head = clusters[clusters.length - 1];
                const avg = head.reduce((a, b) => a + b, 0) / head.length;
                if (Math.abs(arr[i] - avg) / avg < 0.02) { // 2% proximity
                    head.push(arr[i]);
                } else {
                    clusters.push([arr[i]]);
                }
            }
            return clusters.map(c => c.reduce((a, b) => a + b, 0) / c.length);
        };

        return {
            support: cluster(supports),
            resistance: cluster(resistances)
        };
    }

    /**
     * Calculates Z-Score (Distance from mean in Standard Deviations)
     * @param {number[]} prices 
     * @param {number} period 
     * @returns {number[]}
     */
    static calculateZScore(prices, period = 20) {
        if (prices.length < period) return [];
        let zScores = [];
        for (let i = period - 1; i < prices.length; i++) {
            const slice = prices.slice(i - period + 1, i + 1);
            const mean = slice.reduce((a, b) => a + b, 0) / period;
            const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
            const stdDev = Math.sqrt(variance);
            zScores.push(stdDev === 0 ? 0 : (prices[i] - mean) / stdDev);
        }
        return zScores;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechnicalIndicators;
}
