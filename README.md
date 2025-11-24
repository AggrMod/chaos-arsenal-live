# 🔥 Chaos Arsenal Live

A real-time cryptocurrency market data dashboard featuring live feeds from multiple sources, built for [givenflowers.org](https://givenflowers.org).

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 100% Real Data Feeds - NO FAKE SIGNALS

- **⚡ AGGR.TRADE Integration** - Complete live trading terminal
  - Embedded full-featured trading terminal
  - Real-time order flow from 16+ exchanges
  - **✅ Live Liquidations** - Real liquidation data from exchanges
  - **✅ Large Trade Tracking** - Whale trades and significant orders
  - Volume aggregation and advanced charting
  - WebSocket connections for instant updates

- **📈 Real-Time Market Prices** - Live cryptocurrency prices from CoinGecko API
  - Bitcoin, Ethereum, Solana, Cardano, Polkadot
  - 24-hour price changes with visual indicators
  - Auto-refresh every 30 seconds

- **😱 Fear & Greed Index** - Market sentiment indicator
  - Real-time data from Alternative.me API
  - Color-coded sentiment levels
  - Auto-refresh every 60 seconds

- **📰 Crypto News Feed** - Latest cryptocurrency news
  - Powered by CryptoCompare API
  - Top 5 most recent articles
  - Auto-refresh every 5 minutes

## 🚀 Quick Start

### Deployment

This is a static single-page application. No build process required!

```bash
# Clone the repository
git clone https://github.com/AggrMod/chaos-arsenal-live.git
cd chaos-arsenal-live

# Serve locally (any static server works)
python -m http.server 8000
# or
npx serve .
# or just open index.html in your browser
```

Visit `http://localhost:8000` in your browser.

### Hosting Options

- **GitHub Pages**: Enable in repository settings
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **Any static host**: Upload `index.html`

## 🔌 Data Sources

### Real-Time APIs (No Keys Required)

| Source | Type | Data Provided | Update Frequency |
|--------|------|---------------|------------------|
| **AGGR.TRADE** | WebSocket | Live trades, liquidations, large orders from 16+ exchanges | Real-time |
| **CoinGecko** | REST API | Cryptocurrency prices & 24h changes | 30 seconds |
| **Alternative.me** | REST API | Fear & Greed Index | 60 seconds |
| **CryptoCompare** | REST API | Latest crypto news | 5 minutes |

### About AGGR.TRADE

AGGR is an open-source cryptocurrency trade aggregator that:
- Connects to 16+ exchanges via WebSocket
- Shows **real-time liquidations** as they happen
- Tracks **large trades (whales)** automatically
- Aggregates volume and provides advanced charting
- Requires **no API keys** for basic usage

**Supported Exchanges**: Binance, Coinbase, BitMEX, Bitfinex, Kraken, Bybit, Deribit, OKX, Gate.io, Huobi, and more.

Learn more: [github.com/Tucsky/aggr](https://github.com/Tucsky/aggr)

## 🎨 Customization

### Modify Tracked Cryptocurrencies

Edit the `fetchRealData()` function in `index.html`:

```javascript
// Change these coin IDs (line 325)
const response = await fetch(
  `${APIs.coinGecko}/simple/price?ids=bitcoin,ethereum,solana,cardano,polkadot&vs_currencies=usd&include_24hr_change=true`
);

// To track different coins, replace with any CoinGecko coin IDs:
// dogecoin, ripple, avalanche-2, chainlink, etc.
```

### Adjust Refresh Intervals

Modify the intervals in the initialization code (lines 450-452):

```javascript
setInterval(fetchRealData, 30000);     // Market data (default: 30s)
setInterval(fetchFearGreed, 60000);    // Fear & Greed (default: 60s)
setInterval(fetchCryptoNews, 300000);  // News (default: 5min)
```

### Customize Visual Theme

Edit the CSS variables in the `<style>` section:

```css
body {
    background: linear-gradient(135deg, #000000, #1a1a2e, #16213e);
    color: #00ff00; /* Change to your preferred color */
}
```

## 🛠️ Technical Details

### Browser Compatibility

- **Chrome/Edge**: ✅ Fully supported
- **Firefox**: ✅ Fully supported
- **Safari**: ✅ Fully supported (v12+)
- **Opera**: ✅ Fully supported

Requires modern browser with:
- ES2017+ support (async/await)
- Fetch API
- CSS Grid

### Performance

- **Lightweight**: Single HTML file, no dependencies
- **Responsive**: Mobile-first CSS Grid layout
- **Efficient**: Smart auto-refresh with configurable intervals
- **Fast**: Direct API calls, no backend proxy

### Security

- All APIs are called client-side (CORS-enabled)
- No API keys stored (using public endpoints)
- No data persistence or cookies
- No external JavaScript libraries

## 📊 Project Structure

```
chaos-arsenal-live/
├── index.html          # Main application file
├── README.md          # This file
└── LICENSE            # MIT License
```

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

### Potential Improvements
- [ ] Implement real liquidation data API
- [ ] Add whale movement tracking with Whale Alert API
- [ ] Support for more cryptocurrencies
- [ ] Historical price charts
- [ ] User preferences (save favorite coins)
- [ ] Desktop notifications for price alerts
- [ ] Dark/light theme toggle
- [ ] Export data functionality

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This dashboard is for informational purposes only. Cryptocurrency trading carries risk. Always do your own research before making investment decisions.

**Data Policy:**
- ✅ 100% real market data - **NO FAKE SIGNALS**
- ✅ All liquidations and large trades from AGGR.TRADE are real
- ✅ Live API connections to exchanges and data providers
- Real-time data may have slight delays depending on exchange API
- API availability depends on third-party services
- No financial advice is provided

## 🌸 Credits

Built with ❤️ for [givenflowers.org](https://givenflowers.org)

**APIs & Data Sources:**
- [CoinGecko](https://www.coingecko.com/) - Cryptocurrency data
- [Alternative.me](https://alternative.me/) - Fear & Greed Index
- [CryptoCompare](https://www.cryptocompare.com/) - Crypto news
- [AGGR.TRADE](https://aggr.trade/) - Trading terminal

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Visit [givenflowers.org](https://givenflowers.org)

---

**"No fake signals, only REAL market data!"** - Built for the chaos of crypto markets 🚀
