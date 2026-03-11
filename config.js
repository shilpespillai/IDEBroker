// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    // API Configuration
    api: {
        // Get your free API key from: https://finnhub.io/register
        // IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual API key
        apiKey: 'd65rbphr01qiish0qe70d65rbphr01qiish0qe7g',
        baseUrl: 'https://finnhub.io/api/v1',
        // Refresh interval in milliseconds (30 seconds)
        refreshInterval: 30000,
        // Enable/disable auto-refresh
        autoRefresh: true
    },

    // Stock symbols to track
    stocks: ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN', 'GOOGL', 'META', 'NFLX', 'AMD', 'INTC', 'CRM', 'PYPL', 'ADBE', 'ORCL'],

    // Entry prices for P&L calculation (simulated entry points)
    // These represent the prices at which positions were "opened"
    entryPrices: {
        'AAPL': 178.50,
        'TSLA': 245.80,
        'NVDA': 485.20,
        'MSFT': 420.00,
        'AMZN': 175.00,
        'GOOGL': 140.00,
        'META': 450.00,
        'NFLX': 580.00,
        'AMD': 160.00,
        'INTC': 42.00,
        'CRM': 280.00,
        'PYPL': 60.00,
        'ADBE': 550.00,
        'ORCL': 115.00
    },

    // Position sizes (number of shares)
    positionSizes: {
        'AAPL': 10,
        'TSLA': 5,
        'NVDA': 3,
        'MSFT': 8,
        'AMZN': 12,
        'GOOGL': 15,
        'META': 4,
        'NFLX': 2,
        'AMD': 10,
        'INTC': 50,
        'CRM': 5,
        'PYPL': 20,
        'ADBE': 3,
        'ORCL': 15
    },

    // IBKR Integration
    ibkr: {
        bridgeUrl: 'http://localhost:3001',
        enabled: true,
        accountId: '', // Set this to your IBKR account ID
        mode: 'PAPER' // 'PAPER' or 'LIVE'
    },

    // Market hours (US Eastern Time)
    marketHours: {
        open: 9.5,   // 9:30 AM
        close: 16    // 4:00 PM
    },

    // Demo mode fallback
    demoMode: true,  // Set to true to use demo data if API fails

    // Paper Trading Configuration
    paperTrading: {
        enabled: true,
        startingBalance: 100000,
        maxPositionSize: 0.15,  // 15% of portfolio
        maxRiskPerTrade: 0.02,  // 2% of portfolio
        checkInterval: 30000,   // 30 seconds
        autoTrade: true         // Automatically execute trades based on AI
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
