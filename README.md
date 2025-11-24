# 🔥 Chaos Arsenal Live

A real-time cryptocurrency market data dashboard featuring live feeds from multiple sources, built for [givenflowers.org](https://givenflowers.org).

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Live Data Feeds
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

- **⚡ AGGR.TRADE Integration** - Live trading view
  - Embedded full-featured trading terminal
  - Real-time order flow from 17+ exchanges

### Demo Features (Simulated Data)
> ⚠️ **Note**: The following features currently display simulated data for demonstration purposes:

- **💀 Liquidations Tracker** - Sample liquidation events
- **🐋 Whale Movements** - Sample large transaction alerts

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

## 🔌 API Integration

### APIs Used (No Keys Required)

| API | Endpoint | Purpose | Rate Limit |
|-----|----------|---------|------------|
| **CoinGecko** | `api.coingecko.com/api/v3` | Cryptocurrency prices | 10-50 calls/min |
| **Alternative.me** | `api.alternative.me/fng/` | Fear & Greed Index | Unlimited |
| **CryptoCompare** | `min-api.cryptocompare.com` | Crypto news | ~100,000 calls/month |
| **AGGR.TRADE** | `aggr.trade` | Trading terminal | N/A (iframe) |

### Future API Integration

To enable real liquidation and whale tracking data, consider:

- **Coinglass API** - For real liquidation data (requires API key)
- **Whale Alert API** - For whale transactions (requires API key)

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

- Real-time data may have slight delays
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
