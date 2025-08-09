// Mock data for crypto trading dashboard

export const mockCryptoData = {
  portfolio: {
    totalValue: 45670.89,
    totalPnL: 2345.67,
    totalPnLPercent: 5.42,
    assets: [
      { symbol: 'BTC', name: 'Bitcoin', balance: 1.2345, value: 32567.89, change24h: 2.34 },
      { symbol: 'ETH', name: 'Ethereum', balance: 8.9876, value: 9876.54, change24h: -1.23 },
      { symbol: 'SOL', name: 'Solana', balance: 45.6789, value: 2234.56, change24h: 4.56 },
      { symbol: 'USDC', name: 'USD Coin', balance: 991.99, value: 991.99, change24h: 0.01 },
    ]
  },

  watchlist: [
    { symbol: 'BTC/USDT', price: 43256.78, change24h: 2.34, volume: '1.2B' },
    { symbol: 'ETH/USDT', price: 2678.90, change24h: -1.23, volume: '890M' },
    { symbol: 'SOL/USDT', price: 98.45, change24h: 4.56, volume: '234M' },
    { symbol: 'ADA/USDT', price: 0.4567, change24h: -2.34, volume: '123M' },
    { symbol: 'DOT/USDT', price: 6.789, change24h: 1.23, volume: '89M' },
  ],

  recentTrades: [
    { pair: 'BTC/USDT', side: 'BUY', amount: '0.0234', price: '43250.00', time: '2 min ago', pnl: 23.45 },
    { pair: 'ETH/USDT', side: 'SELL', amount: '1.2345', price: '2675.50', time: '5 min ago', pnl: -12.34 },
    { pair: 'SOL/USDT', side: 'BUY', amount: '45.678', price: '98.20', time: '12 min ago', pnl: 45.67 },
    { pair: 'ADA/USDT', side: 'SELL', amount: '1000', price: '0.4560', time: '23 min ago', pnl: -5.67 },
  ],

  copyTrades: [
    { 
      trader: 'CryptoKing_007', 
      followers: 12450, 
      winRate: 87.5, 
      totalReturn: 245.67,
      recentPnL: 12.34,
      isFollowing: true,
      tier: 'Diamond'
    },
    { 
      trader: 'MoonShot_Trader', 
      followers: 8900, 
      winRate: 78.9, 
      totalReturn: 189.45,
      recentPnL: -8.90,
      isFollowing: false,
      tier: 'Gold'
    },
    { 
      trader: 'DeFi_Wizard', 
      followers: 15670, 
      winRate: 92.1, 
      totalReturn: 389.12,
      recentPnL: 45.67,
      isFollowing: true,
      tier: 'Diamond'
    },
  ],

  swapPairs: [
    { from: 'BTC', to: 'ETH', rate: '16.15', spread: '0.05%' },
    { from: 'ETH', to: 'SOL', rate: '27.21', spread: '0.08%' },
    { from: 'SOL', to: 'USDT', rate: '98.45', spread: '0.03%' },
    { from: 'USDC', to: 'BTC', rate: '0.0000231', spread: '0.04%' },
  ],

  chartData: [
    { time: '09:00', price: 42800, volume: 1234567 },
    { time: '10:00', price: 43100, volume: 1456789 },
    { time: '11:00', price: 42950, volume: 1345678 },
    { time: '12:00', price: 43250, volume: 1567890 },
    { time: '13:00', price: 43400, volume: 1234567 },
    { time: '14:00', price: 43200, volume: 1678901 },
    { time: '15:00', price: 43500, volume: 1456789 },
  ],

  wallets: [
    { name: 'MetaMask', balance: '$12,345.67', status: 'connected', network: 'Ethereum' },
    { name: 'Phantom', balance: '$8,901.23', status: 'connected', network: 'Solana' },
    { name: 'Binance Wallet', balance: '$23,456.78', status: 'disconnected', network: 'BSC' },
    { name: 'Trust Wallet', balance: '$1,234.56', status: 'connected', network: 'Multi-chain' },
  ],

  orderBook: {
    bids: [
      { price: 43245.00, size: 0.245, total: 10.59 },
      { price: 43240.00, size: 0.567, total: 24.52 },
      { price: 43235.00, size: 1.234, total: 53.35 },
      { price: 43230.00, size: 0.891, total: 38.51 },
      { price: 43225.00, size: 2.456, total: 106.12 },
    ],
    asks: [
      { price: 43250.00, size: 0.123, total: 5.32 },
      { price: 43255.00, size: 0.789, total: 34.13 },
      { price: 43260.00, size: 1.567, total: 67.78 },
      { price: 43265.00, size: 0.456, total: 19.73 },
      { price: 43270.00, size: 2.234, total: 96.61 },
    ]
  }
};

export const dashboardTemplates = {
  beginner: {
    name: 'Beginner Trader',
    description: 'Simple layout focused on portfolio overview and basic trading',
    layout: [
      { i: 'portfolio', x: 0, y: 0, w: 6, h: 3, minW: 4, minH: 2 },
      { i: 'watchlist', x: 6, y: 0, w: 6, h: 3, minW: 4, minH: 2 },
      { i: 'chart', x: 0, y: 3, w: 8, h: 4, minW: 6, minH: 3 },
      { i: 'swap', x: 8, y: 3, w: 4, h: 4, minW: 3, minH: 3 },
    ]
  },
  intermediate: {
    name: 'Intermediate Trader',
    description: 'Balanced view with copy trading and order management',
    layout: [
      { i: 'portfolio', x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
      { i: 'watchlist', x: 4, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
      { i: 'copytrade', x: 8, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
      { i: 'chart', x: 0, y: 2, w: 8, h: 4, minW: 6, minH: 3 },
      { i: 'orderbook', x: 8, y: 2, w: 4, h: 4, minW: 3, minH: 3 },
      { i: 'trades', x: 0, y: 6, w: 6, h: 2, minW: 4, minH: 2 },
      { i: 'swap', x: 6, y: 6, w: 6, h: 2, minW: 4, minH: 2 },
    ]
  },
  advanced: {
    name: 'Advanced Trader',
    description: 'Complete trading workspace with all tools and analytics',
    layout: [
      { i: 'portfolio', x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'watchlist', x: 3, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'copytrade', x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'wallets', x: 9, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'chart', x: 0, y: 2, w: 6, h: 4, minW: 6, minH: 3 },
      { i: 'orderbook', x: 6, y: 2, w: 3, h: 4, minW: 3, minH: 3 },
      { i: 'swap', x: 9, y: 2, w: 3, h: 4, minW: 3, minH: 3 },
      { i: 'trades', x: 0, y: 6, w: 8, h: 2, minW: 4, minH: 2 },
      { i: 'analytics', x: 8, y: 6, w: 4, h: 2, minW: 3, minH: 2 },
    ]
  }
};