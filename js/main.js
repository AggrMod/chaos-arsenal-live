// Real API endpoints
const APIs = {
    coinGecko: 'https://api.coingecko.com/api/v3',
    fearGreed: 'https://api.alternative.me/fng/',
    cryptoNews: 'https://min-api.cryptocompare.com/data/v2/news/'
};

// Rate limiting tracking
const rateLimits = {
    coinGecko: { lastCall: 0, minInterval: 1000 },
    fearGreed: { lastCall: 0, minInterval: 1000 },
    cryptoNews: { lastCall: 0, minInterval: 1000 }
};

// Auto-refresh intervals (can be paused)
let intervals = {
    marketData: null,
    fearGreed: null,
    cryptoNews: null
};

/**
 * Fetch with retry logic and exponential backoff
 * @param {string} url - API endpoint URL
 * @param {number} retries - Number of retry attempts (default: 3)
 * @returns {Promise<any>} - Parsed JSON response
 */
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Fetch attempt ${i + 1} failed:`, error.message);

            // If this was the last retry, throw the error
            if (i === retries - 1) {
                throw error;
            }

            // Exponential backoff: 1s, 2s, 4s
            const delay = Math.pow(2, i) * 1000;
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

/**
 * Check rate limit before making API call
 * @param {string} apiName - Name of the API (matches rateLimits keys)
 * @returns {boolean} - Whether the call is allowed
 */
function checkRateLimit(apiName) {
    const now = Date.now();
    const limit = rateLimits[apiName];

    if (!limit) return true;

    if (now - limit.lastCall < limit.minInterval) {
        console.warn(`Rate limit: ${apiName} called too frequently. Please wait.`);
        return false;
    }

    limit.lastCall = now;
    return true;
}

/**
 * Update ARIA live region for screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('aria-live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
    }
}

/**
 * Fetch real market data from CoinGecko
 */
async function fetchRealData() {
    if (!checkRateLimit('coinGecko')) return;

    const feed = document.getElementById('realMarketFeed');
    const statusDot = document.querySelector('#market-status-dot');

    try {
        // Update status to loading
        if (statusDot) {
            statusDot.className = 'status-dot status-warning';
        }

        const data = await fetchWithRetry(
            `${APIs.coinGecko}/simple/price?ids=bitcoin,ethereum,solana,cardano,polkadot&vs_currencies=usd&include_24hr_change=true`
        );

        feed.innerHTML = '';

        Object.entries(data).forEach(([coin, info]) => {
            const change = info.usd_24h_change;
            const priceClass = change >= 0 ? 'price-up' : 'price-down';
            const arrow = change >= 0 ? '📈' : '📉';

            const ticker = document.createElement('div');
            ticker.className = 'price-ticker';
            ticker.setAttribute('role', 'status');
            ticker.setAttribute('aria-live', 'polite');
            ticker.innerHTML = `
                <span>${coin.toUpperCase()}:</span>
                <span class="${priceClass}">$${info.usd.toLocaleString()} ${arrow} ${change.toFixed(2)}%</span>
            `;
            feed.appendChild(ticker);
        });

        const timestamp = document.createElement('div');
        timestamp.style.marginTop = '15px';
        timestamp.style.color = '#ffd700';
        timestamp.style.textAlign = 'center';
        timestamp.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        feed.appendChild(timestamp);

        // Update status to success
        if (statusDot) {
            statusDot.className = 'status-dot status-live';
        }

        announceToScreenReader('Market data updated successfully');

    } catch (error) {
        console.error('Error fetching real data:', error);
        feed.innerHTML = `
            <div style="color: #ff0000;">
                ❌ Error fetching real market data<br>
                <span style="font-size: 0.8em;">${error.message}</span>
            </div>
        `;

        if (statusDot) {
            statusDot.className = 'status-dot status-error';
        }

        announceToScreenReader('Error loading market data');
    }
}

/**
 * Fetch Fear & Greed Index
 */
async function fetchFearGreed() {
    if (!checkRateLimit('fearGreed')) return;

    const valueElement = document.getElementById('fearGreedValue');
    const labelElement = document.getElementById('fearGreedLabel');
    const statusDot = document.querySelector('#feargreed-status-dot');

    try {
        // Update status to loading
        if (statusDot) {
            statusDot.className = 'status-dot status-warning';
        }

        const data = await fetchWithRetry(`${APIs.fearGreed}?limit=1`);

        if (data.data && data.data[0]) {
            const index = data.data[0];
            const value = parseInt(index.value);

            let color = '#ff0000'; // Extreme Fear
            let label = 'Extreme Fear';

            if (value >= 75) {
                color = '#ff4500';
                label = 'Extreme Greed';
            } else if (value >= 55) {
                color = '#ffd700';
                label = 'Greed';
            } else if (value >= 45) {
                color = '#00ff00';
                label = 'Neutral';
            } else if (value >= 25) {
                color = '#ff8c00';
                label = 'Fear';
            }

            valueElement.textContent = value;
            valueElement.style.color = color;
            labelElement.textContent = label;

            // Update status to success
            if (statusDot) {
                statusDot.className = 'status-dot status-live';
            }

            announceToScreenReader(`Fear and Greed Index updated: ${value}, ${label}`);
        }
    } catch (error) {
        console.error('Error fetching Fear & Greed:', error);
        valueElement.textContent = 'Error';
        valueElement.style.color = '#ff0000';
        labelElement.textContent = 'Unable to load';

        if (statusDot) {
            statusDot.className = 'status-dot status-error';
        }

        announceToScreenReader('Error loading Fear and Greed Index');
    }
}

/**
 * Fetch crypto news
 */
async function fetchCryptoNews() {
    if (!checkRateLimit('cryptoNews')) return;

    const feed = document.getElementById('newsFeed');
    const statusDot = document.querySelector('#news-status-dot');

    try {
        // Update status to loading
        if (statusDot) {
            statusDot.className = 'status-dot status-warning';
        }

        const data = await fetchWithRetry(`${APIs.cryptoNews}?lang=EN&sortOrder=latest`);

        feed.innerHTML = '';

        if (data.Data && data.Data.length > 0) {
            data.Data.slice(0, 5).forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.style.marginBottom = '10px';
                newsItem.style.padding = '8px';
                newsItem.style.borderLeft = '3px solid #00ff00';
                newsItem.setAttribute('role', 'article');
                newsItem.innerHTML = `
                    <div style="color: #ffd700; font-weight: bold;">${article.title}</div>
                    <div style="color: #00ffff; font-size: 0.8em; margin-top: 5px;">
                        ${new Date(article.published_on * 1000).toLocaleString()}
                    </div>
                `;
                feed.appendChild(newsItem);
            });

            // Update status to success
            if (statusDot) {
                statusDot.className = 'status-dot status-live';
            }

            announceToScreenReader('Crypto news updated successfully');
        } else {
            feed.innerHTML = '<div style="color: #ff0000;">No news data available</div>';
            if (statusDot) {
                statusDot.className = 'status-dot status-warning';
            }
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        feed.innerHTML = `
            <div style="color: #ff0000;">
                ❌ Error fetching crypto news<br>
                <span style="font-size: 0.8em;">${error.message}</span>
            </div>
        `;

        if (statusDot) {
            statusDot.className = 'status-dot status-error';
        }

        announceToScreenReader('Error loading crypto news');
    }
}

// Fake liquidation and whale tracking functions removed
// All liquidation and large trade data available through AGGR.TRADE
// NO FAKE SIGNALS POLICY

/**
 * Start auto-refresh intervals
 */
function startAutoRefresh() {
    // Clear any existing intervals
    stopAutoRefresh();

    // Auto-refresh real data every 30 seconds
    intervals.marketData = setInterval(fetchRealData, 30000);

    // Auto-refresh Fear & Greed every 60 seconds
    intervals.fearGreed = setInterval(fetchFearGreed, 60000);

    // Auto-refresh news every 5 minutes
    intervals.cryptoNews = setInterval(fetchCryptoNews, 300000);

    console.log('Auto-refresh started');
}

/**
 * Stop auto-refresh intervals
 */
function stopAutoRefresh() {
    Object.values(intervals).forEach(interval => {
        if (interval) clearInterval(interval);
    });

    intervals = {
        marketData: null,
        fearGreed: null,
        cryptoNews: null
    };

    console.log('Auto-refresh stopped');
}

/**
 * Handle page visibility changes for smart auto-refresh
 */
function handleVisibilityChange() {
    if (document.hidden) {
        console.log('Page hidden - pausing auto-refresh');
        stopAutoRefresh();
    } else {
        console.log('Page visible - resuming auto-refresh and updating data');
        // Refresh all data immediately when page becomes visible
        fetchRealData();
        fetchFearGreed();
        fetchCryptoNews();
        // Restart auto-refresh intervals
        startAutoRefresh();
    }
}

/**
 * Add keyboard navigation and button effects
 */
function initializeButtons() {
    document.querySelectorAll('.chaos-button').forEach(button => {
        // Visual feedback on click
        button.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });

        // Keyboard accessibility
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Initialize the application
 */
function init() {
    console.log('🔥 Chaos Arsenal Live - Initializing...');

    // Load real data immediately
    fetchRealData();
    fetchFearGreed();
    fetchCryptoNews();

    // Initialize button interactions
    initializeButtons();

    // Start auto-refresh intervals
    startAutoRefresh();

    // Setup Page Visibility API for smart refresh
    document.addEventListener('visibilitychange', handleVisibilityChange);

    console.log('✅ Initialization complete!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
