const express = require('express');
const cors = require('cors');
const IB = require('ib');
const path = require('path');

const app = express();
const PORT = 3001;
const TWS_PORT = 4002; // Default for IB Gateway. TWS is 7496.

app.use(cors());
app.use(express.json());

// Initialize IB Instance
const ib = new IB({
    port: TWS_PORT,
    host: '127.0.0.1',
    clientId: 0
});

let ibConnected = false;
let accountData = {
    netLiquidation: 'Fetching...',
    availableFunds: 'Fetching...',
    status: 'disconnected'
};

let positions = {}; // Store active positions keyed by symbol

// ============================================
// IBKR EVENT LISTENERS
// ============================================

ib.on('updatePortfolio', (contract, position, marketPrice, marketValue, averageCost, unrealizedPNL, realizedPNL, accountName) => {
    const symbol = contract.symbol;
    console.log(`📦 Position Update: ${symbol} | Qty: ${position} | PNL: ${unrealizedPNL}`);

    // If position is 0, remove it (closed)
    if (position === 0) {
        delete positions[symbol];
    } else {
        positions[symbol] = {
            symbol,
            position,
            marketPrice,
            averageCost,
            unrealizedPNL: unrealizedPNL || 0,
            realizedPNL: realizedPNL || 0
        };
    }
});

ib.on('error', (err) => {
    // Ignore informational "errors" (2104, 2106, 2108, etc are just status messages)
    if (err.message && (err.message.includes('connection is OK') || err.message.includes('data farm'))) {
        console.log(`ℹ️ IB Message: ${err.message}`);
        return;
    }

    // Only disconnect on critical errors
    if (err.code === 'ECONNREFUSED' || err.message.includes('Socket closed')) {
        console.error(`❌ IB Critical Error: ${err.message}`);
        ibConnected = false;
        accountData.status = 'disconnected';
    } else {
        console.warn(`⚠️ IB Warning: ${err.message}`);
    }
});

ib.on('connected', () => {
    console.log('✅ Connected to TWS/Gateway socket.');
    ibConnected = true;
    accountData.status = 'connected';

    // Request managed accounts to find the correct ID
    ib.reqManagedAccts();
});

ib.on('managedAccounts', (accountsList) => {
    console.log(`📋 Managed Accounts: ${accountsList}`);
    const accounts = accountsList.split(',');
    if (accounts.length > 0) {
        const accountId = accounts[0];
        console.log(`📡 Requesting Account Updates for: ${accountId}`);
        ib.reqAccountUpdates(true, accountId);

        // Also request a Summary Snapshot (more reliable for initial load)
        console.log('📡 Requesting Account Summary...');
        ib.reqAccountSummary(1, 'All', 'NetLiquidation,TotalCashValue,BuyingPower,AvailableFunds');
    }
});

ib.on('accountSummary', (reqId, account, tag, value, currency) => {
    console.log(`📊 Summary: ${tag} = ${value} (${currency})`);
    if (tag === 'NetLiquidation') accountData.netLiquidation = value;
    if (tag === 'AvailableFunds') accountData.availableFunds = value;
    if (tag === 'TotalCashValue') accountData.totalCashValue = value;
    if (tag === 'BuyingPower') accountData.buyingPower = value;
});

ib.on('accountSummaryEnd', (reqId) => {
    console.log('🏁 Account Summary Received');
});

ib.on('updateAccountValue', (key, value, currency, accountName) => {
    // Accept any currency for now, or just the first one that comes in
    console.log(`🔑 Key: ${key}, Value: ${value}, Currency: ${currency}`);

    if (key === 'NetLiquidation') {
        accountData.netLiquidation = value;
        accountData.currency = currency;
    }
    if (key === 'AvailableFunds') {
        accountData.availableFunds = value;
    }
    if (key === 'TotalCashValue') {
        accountData.totalCashValue = value;
    }
    if (key === 'BuyingPower') {
        accountData.buyingPower = value;
    }
});

ib.on('updateAccountTime', (timeStamp) => {
    accountData.lastUpdate = timeStamp;
});

// ============================================
// REST ENDPOINTS (BRIDGING DASHBOARD TO SOCKET)
// ============================================

app.get('/status', (req, res) => {
    res.json({
        status: ibConnected ? 'connected' : 'disconnected',
        gateway: 'Desktop TWS',
        port: TWS_PORT
    });
});

app.get('/account', (req, res) => {
    if (!ibConnected) {
        return res.status(502).json({ error: 'IB Gateway not connected' });
    }
    res.json(accountData);
});

app.get('/positions', (req, res) => {
    if (!ibConnected) {
        return res.status(502).json({ error: 'IB Gateway not connected' });
    }
    // Convert map to array
    res.json(Object.values(positions));
});

app.post('/order', (req, res) => {
    const { symbol, side, qty, type, price } = req.body;

    if (!ibConnected) {
        return res.status(502).json({ error: 'IB Gateway not connected' });
    }

    try {
        console.log(`🚀 Placing order: ${side} ${qty} ${symbol} @ ${price || 'MKT'}`);

        // Note: TWS API requires a Contract object and an Order object.
        // This is a simplified version for demonstration.
        const contract = ib.contract.stock(symbol, 'SMART', 'USD');
        const order = ib.order.limit(side, qty, price || 0);

        if (type === 'MKT') {
            order.orderType = 'MKT';
            order.lmtPrice = 0;
        }

        // Enable Outside Regular Trading Hours (Pre/Post Market)
        order.outsideRth = true;

        const orderId = Math.floor(Math.random() * 10000); // In production, use ib.reqIds()
        ib.placeOrder(orderId, contract, order);

        res.json({ status: 'Order Submitted', orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start IB Connection
console.log(`📡 Attempting to connect to TWS on port ${TWS_PORT}...`);
ib.connect();

app.listen(PORT, () => {
    console.log(`🚀 Global Bridge Server running on http://localhost:${PORT}`);
    console.log(`🔗 Bridging Website (REST) <--> IB Gateway (Socket)`);
});
