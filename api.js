// ============================================
// API MODULE - LIVE MARKET DATA
// ============================================

class MarketDataAPI {
    constructor(config) {
        this.config = config;
        this.cache = new Map();
        this.candleCache = new Map(); // Cache for historical candle data
        this.lastUpdate = null;
    }

    // ============================================
    // STOCK QUOTE - Get real-time price
    // ============================================
    async getStockQuote(symbol) {
        try {
            const url = `${this.config.api.baseUrl}/quote?symbol=${symbol}&token=${this.config.api.apiKey}`;

            // Create AbortController for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            // Finnhub returns: { c: current, h: high, l: low, o: open, pc: previous close, t: timestamp }
            return {
                symbol: symbol,
                currentPrice: data.c,
                open: data.o,
                high: data.h,
                low: data.l,
                previousClose: data.pc,
                change: data.c - data.pc,
                changePercent: ((data.c - data.pc) / data.pc) * 100,
                timestamp: data.t
            };
        } catch (error) {
            console.error(`Error fetching quote for ${symbol}:`, error);

            // Return cached data if available
            if (this.cache.has(symbol)) {
                console.log(`Using cached data for ${symbol}`);
                return this.cache.get(symbol);
            }

            // Return demo data as fallback
            return this.getDemoQuote(symbol);
        }
    }

    // ============================================
    // MULTIPLE QUOTES - Batch fetch
    // ============================================
    async getMultipleQuotes(symbols) {
        const promises = symbols.map(symbol => this.getStockQuote(symbol));
        const results = await Promise.all(promises);

        // Cache results
        results.forEach(quote => {
            if (quote) {
                this.cache.set(quote.symbol, quote);
            }
        });

        this.lastUpdate = new Date();
        return results;
    }

    // ============================================
    // COMPANY PROFILE - Get company info
    // ============================================
    async getCompanyProfile(symbol) {
        try {
            const url = `${this.config.api.baseUrl}/stock/profile2?symbol=${symbol}&token=${this.config.api.apiKey}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            return {
                symbol: symbol,
                name: data.name,
                industry: data.finnhubIndustry,
                marketCap: data.marketCapitalization,
                logo: data.logo
            };
        } catch (error) {
            console.error(`Error fetching profile for ${symbol}:`, error);
            return null;
        }
    }

    // ============================================
    // MARKET NEWS - Get recent news
    // ============================================
    async getMarketNews(category = 'general') {
        try {
            const url = `${this.config.api.baseUrl}/news?category=${category}&token=${this.config.api.apiKey}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            // Return top 5 news items
            return data.slice(0, 5).map(item => ({
                headline: item.headline,
                summary: item.summary,
                source: item.source,
                url: item.url,
                datetime: new Date(item.datetime * 1000)
            }));
        } catch (error) {
            console.error('Error fetching market news:', error);
            return [];
        }
    }

    // ============================================
    // HISTORICAL CANDLES - Get price history
    // ============================================
    async getHistoricalCandles(symbol, resolution = 'D', daysBack = 30) {
        const cacheKey = `${symbol}_${resolution}_${daysBack}`;

        // Check cache first
        if (this.candleCache.has(cacheKey)) {
            const cached = this.candleCache.get(cacheKey);
            const now = Date.now();
            // Cache historical data for 1 hour (3600000ms)
            if (now - cached.timestamp < 3600000) {
                console.log(`📦 Using cached historical data for ${symbol} (${daysBack}d)`);
                return cached.data;
            }
        }

        try {
            const to = Math.floor(Date.now() / 1000);
            const from = to - (daysBack * 24 * 60 * 60);

            const url = `${this.config.api.baseUrl}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${this.config.api.apiKey}`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout for history

            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            let candles = [];

            // Fallback to Demo Data if API limits truncate the range (e.g. 5Y requested, 1Y received)
            if (data.c && data.c.length < (daysBack * 0.75) && daysBack > 300 && data.s !== 'no_data') {
                console.warn(`⚠️ Historical data for ${symbol} was truncated by API limits. Switching to Demo Data for full ${daysBack}-day coverage.`);
                candles = this.getDemoCandles(symbol, daysBack);
            } else if (data.s === 'no_data') {
                console.warn(`No historical data available for ${symbol}`);
                candles = this.getDemoCandles(symbol, daysBack);
            } else {
                candles = data.c.map((close, i) => ({
                    timestamp: data.t[i] * 1000,
                    open: data.o[i],
                    high: data.h[i],
                    low: data.l[i],
                    close: close,
                    volume: data.v[i]
                }));
            }

            // Save to cache
            this.candleCache.set(cacheKey, {
                timestamp: Date.now(),
                data: candles
            });

            return candles;
        } catch (error) {
            console.error('Error fetching historical candles:', error);
            const demo = this.getDemoCandles(symbol, daysBack);
            return demo;
        }
    }

    // ============================================
    // DEMO CANDLES - Fallback historical data
    // ============================================
    getDemoCandles(symbol, daysBack = 30) {
        const candles = [];
        const basePrice = this.getDemoQuote(symbol).currentPrice;

        // Use current time for historical demo data so it's always relevant
        const now = Date.now();

        // Seeded random function for consistency
        const seededRandom = (seed) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        // Create a base seed from the symbol
        let symbolHash = 0;
        for (let i = 0; i < symbol.length; i++) {
            symbolHash = ((symbolHash << 5) - symbolHash) + symbol.charCodeAt(i);
            symbolHash |= 0;
        }

        for (let i = daysBack; i >= 0; i--) {
            const timestamp = now - (i * 24 * 60 * 60 * 1000);
            const seed = symbolHash + i;

            // Realism: Add Market Cycles (Sine Wave)
            const cycle = Math.sin(i / 30) * 0.05; // 5% cyclical swings every 30 days
            const longTrend = -0.0003 * i; // Base upward drift

            // Realism: Add occasional "Shocks" (Crashes)
            let shock = 0;
            if (seededRandom(seed + 100) > 0.97) {
                shock = -0.04 * seededRandom(seed + 200); // Rare 0-4% drop
            }

            const volatility = 0.025;
            const variation = (seededRandom(seed) - 0.5) * volatility;

            const multiplier = 1 + longTrend + cycle + shock + variation;

            const open = basePrice * multiplier;
            const close = open * (1 + (seededRandom(seed + 1) - 0.5) * 0.015);
            const high = Math.max(open, close) * (1 + seededRandom(seed + 2) * 0.01);
            const low = Math.min(open, close) * (1 - seededRandom(seed + 3) * 0.01);
            const volume = Math.floor(1000000 + seededRandom(seed + 4) * 5000000);

            candles.push({
                timestamp,
                open,
                high,
                low,
                close,
                volume,
                isDemo: true
            });
        }

        return candles;
    }

    // ============================================
    // MARKET STATUS - Check if market is open
    // ============================================
    isMarketOpen() {
        const now = new Date();

        // Check if it's a weekday (Monday = 1, Friday = 5)
        const day = now.getDay();
        if (day === 0 || day === 6) {
            return false; // Weekend
        }

        // Convert to US Eastern Time (approximate)
        // Note: This is simplified and doesn't account for DST perfectly
        const utcHours = now.getUTCHours();
        const utcMinutes = now.getUTCMinutes();
        const etHours = (utcHours - 5 + 24) % 24; // EST offset
        const etTime = etHours + (utcMinutes / 60);

        // Market hours: 9:30 AM - 4:00 PM ET
        return etTime >= this.config.marketHours.open && etTime < this.config.marketHours.close;
    }

    // ============================================
    // DEMO DATA - Fallback when API fails
    // ============================================
    getDemoQuote(symbol) {
        const demoData = {
            'AAPL': { currentPrice: 182.30, previousClose: 178.50 },
            'TSLA': { currentPrice: 251.20, previousClose: 245.80 },
            'NVDA': { currentPrice: 492.50, previousClose: 485.20 },
            'MSFT': { currentPrice: 425.80, previousClose: 420.00 },
            'AMZN': { currentPrice: 178.50, previousClose: 175.00 },
            'GOOGL': { currentPrice: 142.80, previousClose: 140.00 },
            'META': { currentPrice: 459.00, previousClose: 450.00 },
            'NFLX': { currentPrice: 591.60, previousClose: 580.00 },
            'AMD': { currentPrice: 163.20, previousClose: 160.00 },
            'INTC': { currentPrice: 42.84, previousClose: 42.00 },
            'CRM': { currentPrice: 285.60, previousClose: 280.00 },
            'PYPL': { currentPrice: 61.20, previousClose: 60.00 },
            'ADBE': { currentPrice: 561.00, previousClose: 550.00 },
            'ORCL': { currentPrice: 117.30, previousClose: 115.00 }
        };

        const demo = demoData[symbol] || { currentPrice: 100, previousClose: 98 };

        return {
            symbol: symbol,
            currentPrice: demo.currentPrice,
            open: demo.previousClose,
            high: demo.currentPrice * 1.02,
            low: demo.previousClose * 0.98,
            previousClose: demo.previousClose,
            change: demo.currentPrice - demo.previousClose,
            changePercent: ((demo.currentPrice - demo.previousClose) / demo.previousClose) * 100,
            timestamp: Date.now() / 1000,
            isDemo: true
        };
    }

    // ============================================
    // CALCULATE P&L - Profit/Loss calculation
    // ============================================
    calculatePnL(symbol, currentPrice, entryPrice, shares) {
        const priceDiff = currentPrice - entryPrice;
        const dollarPnL = priceDiff * shares;
        const percentPnL = (priceDiff / entryPrice) * 100;

        return {
            dollarPnL: dollarPnL,
            percentPnL: percentPnL,
            isProfit: dollarPnL > 0
        };
    }

    // ============================================
    // GET LAST UPDATE TIME
    // ============================================
    getLastUpdateTime() {
        return this.lastUpdate;
    }

    // ============================================
    // VALIDATE API KEY
    // ============================================
    async validateApiKey() {
        if (this.config.api.apiKey === 'YOUR_API_KEY_HERE') {
            console.warn('⚠️ API key not configured. Using demo mode.');
            return false;
        }

        try {
            // Try to fetch a quote to validate the key
            const testQuote = await this.getStockQuote('AAPL');
            return !testQuote.isDemo;
        } catch (error) {
            console.error('API key validation failed:', error);
            return false;
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarketDataAPI;
}
