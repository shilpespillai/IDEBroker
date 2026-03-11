// ============================================
// AI TRADING BOT - INTERACTIVE FEATURES
// ============================================

// ============================================
// GLOBAL STATE & CLASSES
// ============================================
let marketAPI;
let refreshInterval;
let aiEngine;
let portfolio;
let tradeManager;
let liveProvider;
let masterChart;
let backtestEngine;

document.addEventListener('DOMContentLoaded', () => {
    // Mark JS as enabled for CSS fallbacks
    document.body.classList.add('js-enabled');

    console.log('🚀 Platform initializing...');

    // Initialize interactive features
    try { initScrollAnimations(); } catch (e) { console.error('Scroll animations failed:', e); }
    try { initProgressBars(); } catch (e) { console.error('Progress bars failed:', e); }
    try { initCountUpAnimations(); } catch (e) { console.error('CountUp animations failed:', e); }
    try { initSmoothScroll(); } catch (e) { console.error('Smooth scroll failed:', e); }
    try { initHeaderScroll(); } catch (e) { console.error('Header scroll failed:', e); }

    // Initialize live data features
    initLiveData().catch(e => console.error('initLiveData failed:', e));
});

/**
 * Handles header transition on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger progress bars when visible
                if (entry.target.classList.contains('glass-card')) {
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        setTimeout(() => {
                            bar.style.width = progress + '%';
                        }, 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// PROGRESS BAR ANIMATIONS
// ============================================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        // Set initial width to 0
        bar.style.width = '0%';
    });
}

// ============================================
// COUNT-UP ANIMATIONS FOR METRICS
// ============================================
function initCountUpAnimations() {
    const metricValues = document.querySelectorAll('.metric-value[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateValue(entry.target);
            }
        });
    }, observerOptions);

    metricValues.forEach(el => observer.observe(el));
}

function animateValue(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    // Determine if it's a percentage
    const isPercentage = element.textContent.includes('%');

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format the number
        let displayValue;
        if (isPercentage) {
            displayValue = current.toFixed(1) + '%';
        } else {
            displayValue = Math.round(current);
        }

        element.textContent = displayValue;
    }, stepDuration);
}

// ============================================
// NAVIGATION UTILITIES
// ============================================
function scrollToSection(sectionId) {
    console.log(`🎯 Moving to section: ${sectionId}`);
    const target = document.querySelector(sectionId.startsWith('#') ? sectionId : `#${sectionId}`);

    if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    } else {
        console.warn(`⚠️ Section not found: ${sectionId}`);
    }
}

// Ensure it's available globally for onclick handlers
window.scrollToSection = scrollToSection;

function initSmoothScroll() {
    console.log('🔗 Smoothing scroll for all anchors...');
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                scrollToSection(href);
            }
        });
    });
}

// ============================================
// DYNAMIC BACKGROUND ANIMATION
// ============================================
// Add subtle mouse movement effect to hero section
const hero = document.querySelector('.hero');

if (hero) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });

    function animateBackground() {
        // Smooth easing
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        if (hero.style) {
            hero.style.setProperty('--mouse-x', currentX + 'px');
            hero.style.setProperty('--mouse-y', currentY + 'px');
        }

        requestAnimationFrame(animateBackground);
    }

    animateBackground();
}

// ============================================
// ENHANCED HOVER EFFECTS
// ============================================
const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// PRICING CARD INTERACTIONS
// ============================================
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        // Slightly dim other cards
        pricingCards.forEach(otherCard => {
            if (otherCard !== this) {
                otherCard.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', function () {
        // Restore opacity
        pricingCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🤖 AI Trading Bot', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00ff88, #00d4ff); -webkit-background-clip: text; color: transparent;');
console.log('%cInterested in how this works? Check out our API documentation!', 'font-size: 14px; color: #00d4ff;');

// ============================================
// LIVE DATA INTEGRATION
// ============================================

async function initLiveData() {
    try {
        // Initialize API, AI Engine, and Portfolio
        marketAPI = new MarketDataAPI(CONFIG);
        aiEngine = new AITradingEngine(CONFIG);
        portfolio = new Portfolio(CONFIG.paperTrading ? CONFIG.paperTrading.startingBalance : 100000);
        tradeManager = new TradeManager(portfolio);
        liveProvider = new LiveTradeProvider(CONFIG);

        // Initial market status update (Local time based, doesn't need API)
        updateMarketStatus(marketAPI.isMarketOpen());

        // Check if API key is configured
        const isValid = await marketAPI.validateApiKey();
        const apiStatus = document.getElementById('api-status-badge');
        const apiText = document.getElementById('api-status-text');

        if (!isValid) {
            console.warn('⚠️ Using demo mode. Add your API key to config.js for live data.');
            if (apiStatus) apiStatus.classList.remove('online');
            if (apiText) apiText.textContent = 'Finnhub: Demo Mode';
        } else {
            console.log('✅ API key validated. Live data enabled.');
            if (apiStatus) apiStatus.classList.add('online');
            if (apiText) apiText.textContent = 'Finnhub: Connected';
        }

        // Initial data fetch
        await fetchAndUpdateData();

        // Set up refresh button
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', handleManualRefresh);
        }

        // Set up reset button
        const resetBtn = document.getElementById('reset-portfolio-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', handleResetPortfolio);
        }

        // Set up auto-refresh if enabled
        if (CONFIG.api.autoRefresh) {
            startAutoRefresh();
        }
    } catch (error) {
        console.error('CRITICAL: initLiveData failed:', error);
        // Fallback status update if it failed earlier
        if (marketAPI) updateMarketStatus(marketAPI.isMarketOpen());
    }

    // Always try to initialize these even if data fetch fails
    try {
        await initCharts();
        initIbkrUI();
    } catch (e) {
        console.error('Failed to initialize UI modules:', e);
    }
}

function initIbkrUI() {
    const modeToggle = document.getElementById('mode-toggle');
    const modeLabel = document.getElementById('mode-label');
    const ibkrStatus = document.getElementById('ibkr-status');

    if (!modeToggle) return;

    // Set initial state from config
    modeToggle.checked = CONFIG.ibkr.enabled;
    modeLabel.textContent = CONFIG.ibkr.enabled ? 'Live Mode (IBKR)' : 'Paper Mode';
    if (CONFIG.ibkr.enabled) ibkrStatus.style.display = 'flex';

    modeToggle.addEventListener('change', async (e) => {
        CONFIG.ibkr.enabled = e.target.checked;
        const portfolioTitle = document.getElementById('portfolio-title');
        const statusText = document.getElementById('ibkr-status-text');

        modeLabel.textContent = CONFIG.ibkr.enabled ? 'Live Mode (IBKR)' : 'Paper Mode';
        ibkrStatus.style.display = CONFIG.ibkr.enabled ? 'flex' : 'none';

        if (CONFIG.ibkr.enabled) {
            statusText.textContent = 'IBKR: Checking...';
            // Immediate check
            const status = await liveProvider.getStatus();
            if (status.status === 'connected') {
                ibkrStatus.classList.add('online');
                statusText.textContent = 'IBKR: Online';
            } else {
                ibkrStatus.classList.remove('online');
                statusText.textContent = 'IBKR: Offline';
            }
        }

        if (portfolioTitle) {
            portfolioTitle.textContent = CONFIG.ibkr.enabled ? 'Live Account (Interactive Brokers)' : 'Virtual Portfolio (Paper Trading)';
        }

        console.log(`🔄 Switched to ${CONFIG.ibkr.enabled ? 'LIVE' : 'PAPER'} mode`);
        updatePortfolioUI();
    });

    // Periodically check bridge status
    setInterval(async () => {
        if (!CONFIG.ibkr.enabled) return;

        const status = await liveProvider.getStatus();
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.getElementById('ibkr-status-text');

        if (status.status === 'connected') {
            ibkrStatus.classList.add('online');
            statusText.textContent = 'IBKR: Online';
        } else {
            ibkrStatus.classList.remove('online');
            statusText.textContent = 'IBKR: Offline';
        }
    }, 5000);
}

// ============================================
// CHART INITIALIZATION
// ============================================

let stockCharts = {};

// ============================================
// CHART INITIALIZATION
// ============================================


async function initCharts() {
    const stockSelector = document.getElementById('master-stock-select');
    const timeframeSelector = document.getElementById('master-timeframe-select');
    const backtestBtn = document.getElementById('run-backtest-btn');
    const closeBacktestBtn = document.getElementById('close-backtest');

    if (!stockSelector || !timeframeSelector) return;

    // Use default values from selectors
    const initialSymbol = stockSelector.value;
    const initialTimeframe = timeframeSelector.value;

    // Initialize the master chart
    masterChart = new StockChart('master-chart-canvas', initialSymbol);
    masterChart.timeframe = initialTimeframe;
    await masterChart.init(marketAPI);

    // Initialize Backtest Engine
    backtestEngine = new BacktestEngine(aiEngine);

    // Event Listeners for controls
    stockSelector.addEventListener('change', async (e) => {
        setLoadingState(true);
        const symbol = e.target.value;
        await masterChart.changeSymbol(symbol);

        // Trigger intermediate AI update for selected asset
        const candles = await marketAPI.getHistoricalCandles(symbol, 'D', 250);
        const quote = await marketAPI.getStockQuote(symbol);
        const signal = aiEngine.analyzeStock(symbol, candles, quote.currentPrice);
        updateStrategyUI(symbol, signal);

        setLoadingState(false);
    });

    // Initial Strategy UI update for default selection
    (async () => {
        const candles = await marketAPI.getHistoricalCandles(initialSymbol, 'D', 250);
        const quote = await marketAPI.getStockQuote(initialSymbol);
        const signal = aiEngine.analyzeStock(initialSymbol, candles, quote.currentPrice);
        updateStrategyUI(initialSymbol, signal);
    })();

    timeframeSelector.addEventListener('change', async (e) => {
        setLoadingState(true);
        await masterChart.changeTimeframe(e.target.value);
        setLoadingState(false);
    });

    if (backtestBtn) {
        backtestBtn.addEventListener('click', handleRunBacktest);
    }

    if (closeBacktestBtn) {
        closeBacktestBtn.addEventListener('click', () => {
            document.getElementById('backtest-results-panel').style.display = 'none';
        });
    }

    setLoadingState(false);
}

async function handleRunBacktest() {
    setLoadingState(true);

    try {
        const symbol = document.getElementById('master-stock-select').value;
        const periodYears = document.getElementById('backtest-period-select').value;
        const daysBack = parseInt(periodYears) * 365;

        console.log(`🚀 Starting ${periodYears}Y backtest for ${symbol}...`);

        // Fetch historical data based on selected period
        const candles = await marketAPI.getHistoricalCandles(symbol, 'D', daysBack);
        console.log(`📊 Fetched ${candles.length} candles for backtest.`);

        if (!candles || candles.length === 0) {
            throw new Error('No historical data returned from API.');
        }

        const report = backtestEngine.run(symbol, candles, portfolio.startingBalance);
        console.log('📈 Backtest simulation complete. Generating report...');

        displayBacktestResults(report);
        console.log('✅ Backtest results displayed successfully.');
    } catch (error) {
        console.error('❌ Backtest failure:', error);
        alert('Backtest Error: ' + error.message);
    } finally {
        setLoadingState(false);
    }
}

function displayBacktestResults(report) {
    const panel = document.getElementById('backtest-results-panel');
    const symbolDisplay = document.getElementById('bt-symbol-display');
    const balanceDisplay = document.getElementById('bt-balance');
    const profitDisplay = document.getElementById('bt-profit');
    const roiDisplay = document.getElementById('bt-roi');
    const winrateDisplay = document.getElementById('bt-winrate');
    const tradesDisplay = document.getElementById('bt-trades');
    const tradesBody = document.getElementById('bt-trades-body');

    panel.style.display = 'block';
    symbolDisplay.textContent = report.symbol;

    roiDisplay.textContent = `${report.totalReturn.toFixed(2)}%`;
    roiDisplay.style.color = report.totalReturn >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-pink)';

    if (balanceDisplay) balanceDisplay.textContent = `$${report.finalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (profitDisplay) {
        const netProfit = report.finalBalance - report.initialBalance;
        profitDisplay.textContent = `${netProfit >= 0 ? '+' : ''}$${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        profitDisplay.style.color = netProfit >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-pink)';
    }

    winrateDisplay.textContent = `${report.winRate.toFixed(1)}%`;
    tradesDisplay.textContent = report.totalTrades;

    // Clear and populate trades table
    tradesBody.innerHTML = '';

    const allTrades = [...report.trades].reverse(); // Show all trades, newest at top

    if (allTrades.length === 0) {
        tradesBody.innerHTML = '<tr><td colspan="5" style="padding: 1rem; text-align: center;">No trades executed during this period.</td></tr>';
    } else {
        allTrades.forEach(trade => {
            const row = document.createElement('tr');
            row.style.borderBottom = '1px solid var(--glass-border)';

            const profitVal = typeof trade.profit === 'number' ? trade.profit : null;
            const pnl = profitVal !== null ? (profitVal >= 0 ? '+' : '') + '$' + Math.abs(profitVal).toFixed(2) : '-';
            const pnlColor = profitVal !== null ? (profitVal >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-pink)') : 'inherit';
            const balanceVal = trade.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            row.innerHTML = `
                <td style="padding: 0.5rem;">${trade.date}</td>
                <td style="padding: 0.5rem; font-weight: 600; color: ${trade.type.includes('BUY') ? 'var(--color-accent-cyan)' : 'var(--color-accent-purple)'}">${trade.type}</td>
                <td style="padding: 0.5rem;">$${trade.price.toFixed(2)}</td>
                <td style="padding: 0.5rem; color: ${pnlColor}">${pnl}</td>
                <td style="padding: 0.5rem; color: var(--color-text-tertiary); font-size: 0.75rem;">$${balanceVal}</td>
            `;
            tradesBody.appendChild(row);
        });

        // Add detailed summary breakdown at the bottom of the table
        const winSum = report.trades.reduce((acc, t) => (t.profit && t.profit > 0 ? acc + t.profit : acc), 0);
        const lossSum = report.trades.reduce((acc, t) => (t.profit && t.profit < 0 ? acc + t.profit : acc), 0);
        const netSum = winSum + lossSum;

        const summaryRows = [
            { label: 'Total Gains (Winners)', value: winSum, color: 'var(--color-accent-green)' },
            { label: 'Total Losses (Losers)', value: lossSum, color: 'var(--color-accent-pink)' },
            { label: 'Net Simulation Profit', value: netSum, color: netSum >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-pink)', isTotal: true }
        ];

        summaryRows.forEach(s => {
            const sRow = document.createElement('tr');
            sRow.style.background = s.isTotal ? 'rgba(15, 23, 42, 0.05)' : 'transparent';
            sRow.style.fontWeight = s.isTotal ? '800' : '500';
            sRow.innerHTML = `
                <td colspan="3" style="padding: 0.5rem 0.75rem; text-align: right; font-size: 0.75rem; color: var(--color-text-tertiary);">${s.label}:</td>
                <td style="padding: 0.5rem 0.75rem; color: ${s.color};">${s.value >= 0 ? '+' : ''}$${s.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td style="padding: 0.5rem 0.75rem;"></td>
            `;
            tradesBody.appendChild(sRow);
        });
    }

    // Scroll to results
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function fetchAndUpdateData() {
    try {
        // Show loading state
        setLoadingState(true);

        // Fetch quotes for all stocks
        const quotes = await marketAPI.getMultipleQuotes(CONFIG.stocks);

        // Update dashboard
        updateDashboard(quotes);

        // Run Trading Logic
        await runTradingLogic(quotes);

        // Update Portfolio UI
        updatePortfolioUI();

        // Update last updated time
        updateLastUpdatedTime();

        // Hide loading state
        setLoadingState(false);

        console.log('📊 Data updated successfully');
    } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingState(false);
    }
}

function updateDashboard(quotes) {
    // Update position table
    quotes.forEach(quote => {
        const row = document.querySelector(`tr[data-symbol="${quote.symbol}"]`);
        if (!row) return;

        const entryPrice = CONFIG.entryPrices[quote.symbol];
        const shares = CONFIG.positionSizes[quote.symbol];

        // Calculate P&L
        const pnl = marketAPI.calculatePnL(quote.symbol, quote.currentPrice, entryPrice, shares);

        // Update current price
        const currentPriceCell = row.querySelector('.current-price');
        if (currentPriceCell) {
            currentPriceCell.textContent = `$${quote.currentPrice.toFixed(2)}`;
            currentPriceCell.classList.add('data-updated');
            setTimeout(() => currentPriceCell.classList.remove('data-updated'), 500);
        }

        // Update P&L
        const pnlCell = row.querySelector('.pnl');
        if (pnlCell) {
            const sign = pnl.isProfit ? '+' : '';
            pnlCell.textContent = `${sign}$${Math.abs(pnl.dollarPnL).toFixed(0)} (${pnl.percentPnL.toFixed(1)}%)`;
            pnlCell.style.color = pnl.isProfit ? 'var(--color-accent-green)' : '#ff4444';
            pnlCell.classList.add('data-updated');
            setTimeout(() => pnlCell.classList.remove('data-updated'), 500);
        }

        // Update confidence bar (simulated - would come from AI model in production)
        const confidenceBar = row.querySelector('.confidence-bar');
        if (confidenceBar) {
            const confidence = 85 + Math.random() * 10; // Simulated confidence
            confidenceBar.setAttribute('data-progress', confidence.toFixed(0));
            confidenceBar.style.width = confidence + '%';
        }
    });

    // Update aggregate metrics
    updateAggregateMetrics(quotes);
}

function updateAggregateMetrics(quotes) {
    // Calculate total P&L
    let totalPnL = 0;
    let totalValue = 0;

    quotes.forEach(quote => {
        const entryPrice = CONFIG.entryPrices[quote.symbol];
        const shares = CONFIG.positionSizes[quote.symbol];
        const pnl = marketAPI.calculatePnL(quote.symbol, quote.currentPrice, entryPrice, shares);
        totalPnL += pnl.dollarPnL;
        totalValue += quote.currentPrice * shares;
    });

    // Calculate win rate (simulated)
    const winRate = 70 + Math.random() * 10;

    // Calculate risk exposure (simulated)
    const riskExposure = (totalValue / 50000) * 100; // Assuming $50k portfolio

    // Update metric cards (these are already animated on scroll, so we don't update them dynamically)
    // In a real app, you'd update these values here
}

function updateMarketStatus(isOpen) {
    const statusBadge = document.getElementById('market-status-badge');
    const statusIcon = document.getElementById('market-status-icon');
    const statusText = document.getElementById('market-status-text');

    if (!statusBadge || !statusIcon || !statusText) return;

    if (isOpen) {
        statusIcon.textContent = '🟢';
        statusText.textContent = 'Market Open';
        statusBadge.classList.add('market-status-open');
        statusBadge.classList.remove('market-status-closed');
    } else {
        statusIcon.textContent = '🔴';
        statusText.textContent = 'Market Closed';
        statusBadge.classList.add('market-status-closed');
        statusBadge.classList.remove('market-status-open');
    }
}

function updateLastUpdatedTime() {
    const lastUpdatedEl = document.getElementById('last-updated');
    if (!lastUpdatedEl) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    lastUpdatedEl.textContent = `Last updated: ${timeString}`;
}

function setLoadingState(isLoading) {
    const refreshBtn = document.getElementById('refresh-btn');
    if (!refreshBtn) return;

    if (isLoading) {
        refreshBtn.classList.add('loading');
        refreshBtn.disabled = true;
    } else {
        refreshBtn.classList.remove('loading');
        refreshBtn.disabled = false;
    }
}

async function handleManualRefresh() {
    console.log('🔄 Manual refresh triggered');
    await fetchAndUpdateData();
}

function startAutoRefresh() {
    // Clear any existing interval
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }

    // Set up new interval
    refreshInterval = setInterval(async () => {
        console.log('🔄 Auto-refresh triggered');
        await fetchAndUpdateData();
    }, CONFIG.api.refreshInterval);

    console.log(`✅ Auto-refresh enabled (every ${CONFIG.api.refreshInterval / 1000} seconds)`);
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
        console.log('⏸️ Auto-refresh stopped');
    }
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    stopAutoRefresh();
});

// ============================================
// LIVE TRADE PROVIDER - IBKR BRIDGE INTERFACE
// ============================================

class LiveTradeProvider {
    constructor(config) {
        const ibkr = config.ibkr || {};
        this.url = ibkr.bridgeUrl || 'http://localhost:3001';
        this.enabled = ibkr.enabled || false;
    }

    async getStatus() {
        try {
            const response = await fetch(`${this.url}/status`);
            return await response.json();
        } catch (error) {
            console.error('IBKR Bridge connection failed:', error);
            return { status: 'disconnected' };
        }
    }

    async getAccountSummary() {
        try {
            const response = await fetch(`${this.url}/account`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch IBKR account summary:', error);
            return null;
        }
    }

    async placeOrder(symbol, side, qty, price = null) {
        try {
            const response = await fetch(`${this.url}/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    symbol,
                    side,
                    qty,
                    type: price ? 'LMT' : 'MKT',
                    price
                })
            });
            return await response.json();
        } catch (error) {
            console.error(`Failed to place ${side} order for ${symbol}:`, error);
            return { error: 'Order failed' };
        }
    }

    async getPositions() {
        try {
            const response = await fetch(`${this.url}/positions`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch IBKR positions:', error);
            return [];
        }
    }
}

async function runTradingLogic(quotes) {
    const isLiveMode = CONFIG.ibkr && CONFIG.ibkr.enabled;

    // Virtual Portfolio handles paper trading
    if (!isLiveMode && (!CONFIG.paperTrading || !CONFIG.paperTrading.enabled)) return;

    // For demo/paper trading we run even if market is closed if demoMode is on
    // UPDATE: Start trading immediately if live mode is enabled (Pre-Market)
    // if (!marketAPI.isMarketOpen() && !CONFIG.demoMode && !isLiveMode) return;

    // Allow Pre-Market Trading for testing
    const isExtendedHours = true;
    if (!marketAPI.isMarketOpen() && !CONFIG.demoMode && !isLiveMode && !isExtendedHours) {
        console.log('💤 Market is closed. Bot sleeping.');
        return;
    }

    // Find the currently selected stock in the chart to update the Strategy Engine UI
    const selectedSymbol = document.getElementById('master-stock-select')?.value || 'AAPL';

    console.log(`🤖 Bot Running Analysis on ${quotes.length} stocks...`);

    for (const quote of quotes) {
        // Get data for analysis (Need 250 days for valid EMA-200)
        const candles = await marketAPI.getHistoricalCandles(quote.symbol, 'D', 250);
        const signal = aiEngine.analyzeStock(quote.symbol, candles, quote.currentPrice);

        // Update Strategy Engine UI if this is the selected symbol
        if (quote.symbol === selectedSymbol) {
            updateStrategyUI(quote.symbol, signal);
        }

        console.log(`🔍 ${quote.symbol}: ${signal.type} (${signal.confidence}%) - ${signal.reason}`);

        if (isLiveMode) {
            await handleLiveTradingSignal(quote.symbol, quote.currentPrice, signal);
        } else {
            await handlePaperTradingSignal(quote.symbol, quote.currentPrice, signal);
        }
    }
}

function updateStrategyUI(symbol, signal) {
    // Update Confidence Score
    const confidenceVal = document.getElementById('ai-confidence-value');
    const confidenceBar = document.getElementById('ai-confidence-bar');
    const confidenceReason = document.getElementById('ai-confidence-reason');

    if (confidenceVal) confidenceVal.textContent = `${signal.confidence}%`;
    if (confidenceBar) {
        confidenceBar.style.width = `${signal.confidence}%`;
        confidenceBar.setAttribute('data-progress', signal.confidence);
    }
    if (confidenceReason) confidenceReason.textContent = signal.reason;

    // Update Technical Indicators
    if (signal.indicators) {
        const { rsi, macd, signal: macdSignal } = signal.indicators;

        // RSI: 0-100 scale, but "strength" is usually how far from 50
        const rsiStrength = Math.min(100, Math.floor(Math.abs(rsi - 50) * 2));
        setIndicator('rsi', rsiStrength, `${rsi.toFixed(1)}`);

        // MACD: Hard to map to 0-100 directly, let's use confidence relative to 0
        const macdStrength = Math.min(100, Math.floor(Math.abs(macd) / (macd + Math.abs(macdSignal) || 1) * 100));
        setIndicator('macd', signal.confidence * 0.9, signal.type === 'HOLD' ? 'Neutral' : 'Strong');

        // MA (EMA-200): Use proximity
        const maStrength = signal.reason.includes('below 200-day') ? 30 : 85;
        setIndicator('ma', maStrength, maStrength > 50 ? 'Bullish' : 'Bearish');

        // Trend (Z-Score)
        setIndicator('trend', Math.min(100, signal.confidence * 0.8), 'Trending');

        // Volume (Simulated from candle data)
        setIndicator('volume', 75 + Math.random() * 20, 'Strong');

        // Momentum
        setIndicator('momentum', 60 + Math.random() * 30, 'Active');
    }

    // Update Sentiment (Mocking for now as Finnhub's news needs more logic)
    updateSentimentUI(symbol);
}

function setIndicator(id, value, text) {
    const percentEl = document.getElementById(`strategy-${id}-percent`);
    const barEl = document.getElementById(`strategy-${id}-bar`);
    if (percentEl) percentEl.textContent = text.includes('%') ? text : `${value}%`;
    if (percentEl && !text.includes('%')) percentEl.textContent = text; // Just text if provided
    if (barEl) {
        barEl.style.width = `${value}%`;
        barEl.setAttribute('data-progress', value);
    }
}

function updateSentimentUI(symbol) {
    const sentiments = {
        'twitter': ['Bullish', 'Neutral', 'Very Bullish', 'Bullish'],
        'news': ['Positive', 'Stable', 'Positive', 'Mixed'],
        'reddit': ['Strong', 'Hype', 'Moderate', 'Strong'],
        'analysts': ['Buy', 'Hold', 'Strong Buy', 'Buy']
    };

    // Use symbol to seed pseudo-randomness for semi-consistent mock sentiment
    const seed = symbol.charCodeAt(0);
    const getIndex = (arr) => seed % arr.length;

    document.getElementById('sentiment-twitter').textContent = `Twitter: ${sentiments.twitter[getIndex(sentiments.twitter)]}`;
    document.getElementById('sentiment-news').textContent = `News: ${sentiments.news[getIndex(sentiments.news)]}`;
    document.getElementById('sentiment-reddit').textContent = `Reddit: ${sentiments.reddit[getIndex(sentiments.reddit)]}`;
    document.getElementById('sentiment-analysts').textContent = `Analysts: ${sentiments.analysts[getIndex(sentiments.analysts)]}`;
}

async function handleLiveTradingSignal(symbol, price, signal) {
    if (signal.type === 'BUY' && signal.confidence > 75) {
        console.log(`🚀 [LIVE] analyzing BUY signal for ${symbol}...`);

        // 1. Get current account summary (Buying Power)
        const account = await liveProvider.getAccountSummary();
        if (!account) {
            console.error('❌ [LIVE] Failed to fetch account info. Aborting trade.');
            return;
        }

        const buyingPower = parseFloat(account.buyingPower || account.availableFunds || '0');
        console.log(`💰 Buying Power: $${buyingPower.toFixed(2)} | Stock Price: $${price}`);

        // 2. Check affordability
        if (buyingPower < price) {
            console.warn(`⚠️ [LIVE] Insufficient funds to buy ${symbol}. Needed: $${price}, Has: $${buyingPower}`);
            return;
        }

        // 3. Calculate safe quantity (Use max 95% of Buying Power to be safe)
        // For a small account, we might want to risk less, but let's assume we want to buy as much as we can up to a limit?
        // Let's cap it at max 20% of buying power per trade for diversification, or $1000, whichever is smaller? 
        // User has $10 account so we should probably just try to buy 1 share if possible.
        // Let's settle on: Buy MAX 1 share for now if funds allow, to keep it super safe for testing.

        const maxQty = Math.floor(buyingPower / price);
        const qtyToBuy = 1; // Start conservative. Only buy 1 share.

        if (maxQty < qtyToBuy) {
            console.warn(`⚠️ [LIVE] Insufficient funds for 1 share of ${symbol}.`);
            return;
        }

        console.log(`🚀 [LIVE] Placing BUY order for ${qtyToBuy} share(s) of ${symbol}...`);
        const result = await liveProvider.placeOrder(symbol, 'BUY', qtyToBuy, price);

        if (!result.error) {
            console.log('✅ [LIVE] Order placed successfully:', result);
            notifyTrade(`Live BUY ${symbol} @ $${price}`);
        } else {
            console.error('❌ [LIVE] Order failed:', result.error);
        }

    } else if (signal.type === 'SELL' && signal.confidence > 75) {
        // For selling, we would ideally check if we hold the position first.
        // The current simple implementation tries to sell 1 share (shorting if not held).
        // For safety on a small account, let's DISABLE shorting/selling for now unless we know we have it.
        // Since we don't have a "getPositions" check here yet, let's skip SELLs to avoid accidental shorts.
        console.log(`⚠️ [LIVE] SELL signal received for ${symbol}, but skipping to avoid accidental shorting implementation.`);

        /* 
        console.log(`🚀 [LIVE] Placing SELL order for ${symbol}...`);
        const result = await liveProvider.placeOrder(symbol, 'SELL', 1);
        if (!result.error) {
            console.log('✅ [LIVE] Order placed successfully:', result);
            notifyTrade(`Live SELL ${symbol} @ $${price}`);
        }
        */
    }
}

async function handlePaperTradingSignal(symbol, price, signal) {
    if (signal.type === 'BUY' && signal.confidence > 70) {
        const pos = portfolio.positions[symbol];
        if (!pos) {
            const sharesToBuy = Math.floor((portfolio.cash * 0.1) / price);
            if (sharesToBuy > 0 && portfolio.buy(symbol, sharesToBuy, price)) {
                tradeManager.recordTrade({
                    symbol: symbol,
                    type: 'BUY',
                    shares: sharesToBuy,
                    price: price,
                    reason: signal.reason
                });
            }
        }
    } else if (signal.type === 'SELL' && signal.confidence > 70) {
        const pos = portfolio.positions[symbol];
        if (pos && portfolio.sell(symbol, pos.shares, price)) {
            tradeManager.recordTrade({
                symbol: symbol,
                type: 'SELL',
                shares: pos.shares,
                price: price,
                reason: signal.reason
            });
        }
    }
}

function notifyTrade(message) {
    // Simple toast notification (to be implemented in UI)
    console.log('TOAST:', message);
}

function updatePortfolioUI() {
    const totalValueEl = document.getElementById('portfolio-total-value');
    const cashEl = document.getElementById('portfolio-cash');
    const pnlEl = document.getElementById('portfolio-pnl');
    const historyBody = document.getElementById('trade-history-body');

    if (!totalValueEl || !cashEl || !historyBody) return;

    // Detect Mode
    const isLive = CONFIG.ibkr && CONFIG.ibkr.enabled;

    if (isLive) {
        updateLivePortfolioUI();
        return;
    }

    const currentPrices = {};
    CONFIG.stocks.forEach(s => {
        if (marketAPI.cache.has(s)) {
            currentPrices[s] = marketAPI.cache.get(s).currentPrice;
        }
    });

    const totalValue = portfolio.getTotalValue(currentPrices);
    const totalPnl = totalValue - portfolio.startingBalance;

    totalValueEl.textContent = `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    cashEl.textContent = `$${portfolio.cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    if (pnlEl) {
        const sign = totalPnl >= 0 ? '+' : '';
        pnlEl.textContent = `${sign}$${Math.abs(totalPnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        pnlEl.style.color = totalPnl >= 0 ? 'var(--color-accent-green)' : '#ff4444';
    }

    const history = tradeManager.getHistory();
    if (history.length > 0) {
        historyBody.innerHTML = history.slice(0, 10).map(t => `
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                <td style="padding: 0.75rem; font-size: 0.8125rem; color: var(--color-text-secondary);">${new Date(t.time).toLocaleTimeString()}</td>
                <td style="padding: 0.75rem;"><span style="color: ${t.type === 'BUY' ? 'var(--color-accent-green)' : '#ff4444'}; font-weight: 700; font-size: 0.75rem;">${t.type}</span></td>
                <td style="padding: 0.75rem; font-weight: 600;">${t.symbol}</td>
                <td style="padding: 0.75rem; color: var(--color-text-secondary);">$${t.price.toFixed(2)}</td>
                <td style="padding: 0.75rem; color: var(--color-text-secondary);">${t.shares}</td>
                <td style="padding: 0.75rem; font-size: 0.75rem; color: var(--color-text-tertiary); max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.reason}</td>
            </tr>
        `).join('');
    }
}

async function updateLivePortfolioUI() {
    const summary = await liveProvider.getAccountSummary();
    if (!summary) return;

    const totalValueEl = document.getElementById('portfolio-total-value');
    const cashEl = document.getElementById('portfolio-cash');

    // Specific IBKR summary keys might vary, using placeholders
    const netLiq = summary.netLiquidation || 'Fetching...';
    // Use BuyingPower if available (since we added it to bridge), otherwise AvailableFunds
    const cash = summary.buyingPower || summary.availableFunds || 'Fetching...';

    // Safe parsing helper
    const formatValue = (val) => {
        if (!val || val === 'Fetching...') return 'Fetching...';
        const num = parseFloat(val);
        return isNaN(num) ? val : `$${num.toLocaleString()}`;
    };

    totalValueEl.textContent = formatValue(netLiq);
    cashEl.textContent = formatValue(cash);

    await updateLivePositionsUI();
}

async function updateLivePositionsUI() {
    const positions = await liveProvider.getPositions();
    const tableBody = document.getElementById('positions-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (!positions || positions.length === 0) {
        tableBody.innerHTML = `
            <tr id="no-positions-row">
                <td colspan="5" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                    No active positions
                </td>
            </tr>`;
        return;
    }

    positions.forEach(pos => {
        const pnl = pos.unrealizedPNL || 0;
        const pnlClass = pnl >= 0 ? 'text-accent-green' : 'text-accent-red';
        const pnlSign = pnl >= 0 ? '+' : '';
        const pnlPercent = pos.averageCost > 0 ? ((pnl / (pos.averageCost * pos.position)) * 100).toFixed(2) : '0.00';

        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        row.innerHTML = `
            <td style="padding: 1rem; font-weight: 600;">${pos.symbol}</td>
            <td style="padding: 1rem; color: var(--color-text-secondary);">$${parseFloat(pos.averageCost).toFixed(2)}</td>
            <td style="padding: 1rem; color: var(--color-text-secondary);">$${parseFloat(pos.marketPrice).toFixed(2)}</td>
            <td style="padding: 1rem;" class="${pnlClass}">${pnlSign}$${pnl.toFixed(2)} (${pnlPercent}%)</td>
            <td style="padding: 1rem;">
                <span class="badge" style="background: rgba(255, 255, 255, 0.1);">Live</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function handleResetPortfolio() {
    if (!confirm('Are you sure you want to reset your Virtual Portfolio? This will clear all trades and reset your balance to $100,000.')) {
        return;
    }

    console.log('🔄 Resetting Virtual Portfolio...');
    portfolio.reset();
    tradeManager.history = [];
    tradeManager.saveHistory();
    updatePortfolioUI();

    // Add toast or notification
    console.log('✅ Portfolio reset complete');
}
