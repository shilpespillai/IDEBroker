// ============================================
// CHART COMPONENT - Interactive Price Charts
// ============================================

class StockChart {
    constructor(canvasId, symbol) {
        this.canvasId = canvasId;
        this.symbol = symbol;
        this.chart = null;
        this.timeframe = '1M'; // Default timeframe
        this.chartType = 'line'; // 'line' or 'candlestick'
    }

    // ============================================
    // INITIALIZE CHART
    // ============================================
    async init(marketAPI) {
        this.marketAPI = marketAPI;
        await this.loadData();
        this.render();
    }

    // ============================================
    // LOAD CHART DATA
    // ============================================
    async loadData() {
        const daysMap = {
            '1D': 1,
            '1W': 7,
            '1M': 30,
            '3M': 90,
            '1Y': 365
        };

        const days = daysMap[this.timeframe] || 30;
        this.candles = await this.marketAPI.getHistoricalCandles(this.symbol, 'D', days);
    }

    // ============================================
    // RENDER CHART
    // ============================================
    render() {
        const canvas = document.getElementById(this.canvasId);
        if (!canvas) {
            console.error(`Canvas ${this.canvasId} not found`);
            return;
        }

        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (this.chart) {
            this.chart.destroy();
        }

        // Prepare data for Chart.js
        const labels = this.candles.map(c => new Date(c.timestamp).toLocaleDateString());
        const prices = this.candles.map(c => c.close);

        // Determine color based on overall trend
        const firstPrice = prices[0];
        const lastPrice = prices[prices.length - 1];
        const isPositive = lastPrice >= firstPrice;

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        if (isPositive) {
            gradient.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 255, 136, 0.01)');
        } else {
            gradient.addColorStop(0, 'rgba(255, 68, 68, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 68, 68, 0.01)');
        }

        // Chart configuration
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${this.symbol} Price`,
                    data: prices,
                    borderColor: isPositive ? '#00ff88' : '#ff4444',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: isPositive ? '#00ff88' : '#ff4444',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: '#ffffff',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            title: (context) => {
                                return new Date(this.candles[context[0].dataIndex].timestamp).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                });
                            },
                            label: (context) => {
                                const candle = this.candles[context.dataIndex];
                                return [
                                    `Open: $${candle.open.toFixed(2)}`,
                                    `High: $${candle.high.toFixed(2)}`,
                                    `Low: $${candle.low.toFixed(2)}`,
                                    `Close: $${candle.close.toFixed(2)}`,
                                    `Volume: ${(candle.volume / 1000000).toFixed(2)}M`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#64748b',
                            maxTicksLimit: 8,
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        position: 'right',
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#64748b',
                            callback: (value) => '$' + value.toFixed(2),
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        };

        this.chart = new Chart(ctx, config);
    }

    // ============================================
    // CHANGE TIMEFRAME
    // ============================================
    async changeTimeframe(timeframe) {
        this.timeframe = timeframe;
        await this.loadData();
        this.render();
    }

    // ============================================
    // CHANGE SYMBOL
    // ============================================
    async changeSymbol(symbol) {
        this.symbol = symbol;
        await this.loadData();
        this.render();
    }

    // ============================================
    // UPDATE WITH NEW DATA
    // ============================================
    async update() {
        await this.loadData();
        this.render();
    }

    // ============================================
    // DESTROY CHART
    // ============================================
    destroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StockChart;
}
