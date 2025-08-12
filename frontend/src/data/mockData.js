// Mock data for Banana Pro crypto trading dashboard

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
    { symbol: 'BTC/USDT', price: 43256.78, change24h: 2.34, volume: '1.2B', marketCap: '850B' },
    { symbol: 'ETH/USDT', price: 2678.90, change24h: -1.23, volume: '890M', marketCap: '320B' },
    { symbol: 'SOL/USDT', price: 98.45, change24h: 4.56, volume: '234M', marketCap: '42B' },
    { symbol: 'ADA/USDT', price: 0.4567, change24h: -2.34, volume: '123M', marketCap: '16B' },
    { symbol: 'DOT/USDT', price: 6.789, change24h: 1.23, volume: '89M', marketCap: '8.5B' },
  ],

  positions: [
    { symbol: 'BTC/USDT', side: 'LONG', size: '0.5', entryPrice: 42800, currentPrice: 43256, pnl: 228, pnlPercent: 1.07, margin: 5000 },
    { symbol: 'ETH/USDT', side: 'SHORT', size: '2.0', entryPrice: 2700, currentPrice: 2678, pnl: 44, pnlPercent: 0.81, margin: 2000 },
    { symbol: 'SOL/USDT', side: 'LONG', size: '10', entryPrice: 95.20, currentPrice: 98.45, pnl: 32.5, pnlPercent: 3.41, margin: 1000 },
  ],

  pendingOrders: [
    { symbol: 'BTC/USDT', type: 'LIMIT', side: 'BUY', amount: '0.1', price: 42500, status: 'PENDING' },
    { symbol: 'ETH/USDT', type: 'STOP', side: 'SELL', amount: '1.5', price: 2600, status: 'PENDING' },
    { symbol: 'SOL/USDT', type: 'LIMIT', side: 'BUY', amount: '5', price: 95, status: 'PENDING' },
  ],

  recentTrades: [
    { pair: 'BTC/USDT', side: 'BUY', amount: '0.0234', price: '43250.00', time: '2 min ago', pnl: 23.45 },
    { pair: 'ETH/USDT', side: 'SELL', amount: '1.2345', price: '2675.50', time: '5 min ago', pnl: -12.34 },
    { pair: 'SOL/USDT', side: 'BUY', amount: '45.678', price: '98.20', time: '12 min ago', pnl: 45.67 },
    { pair: 'ADA/USDT', side: 'SELL', amount: '1000', price: '0.4560', time: '23 min ago', pnl: -5.67 },
  ],

  transactions: [
    { type: 'DEPOSIT', asset: 'USDT', amount: 1000, hash: '0x1234...', time: '1 hour ago', status: 'COMPLETED' },
    { type: 'SWAP', asset: 'BTC → ETH', amount: 0.05, hash: '0x5678...', time: '2 hours ago', status: 'COMPLETED' },
    { type: 'WITHDRAWAL', asset: 'SOL', amount: 10, hash: '0x9abc...', time: '3 hours ago', status: 'PENDING' },
  ],

  copyTrades: [
    { 
      trader: 'BananaKing_007', 
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

  topTraders: [
    { rank: 1, trader: 'CryptoWhale', pnl: '45.2K', winRate: 94.2, followers: 25600 },
    { rank: 2, trader: 'BananaSniper', pnl: '38.7K', winRate: 89.1, followers: 18900 },
    { rank: 3, trader: 'DeFiMaster', pnl: '32.1K', winRate: 85.6, followers: 14300 },
    { rank: 4, trader: 'YieldFarmer', pnl: '28.9K', winRate: 82.4, followers: 12100 },
  ],

  topHolders: [
    { address: '0x1234...abcd', balance: '1,234.56 BTC', percentage: '2.34%' },
    { address: '0x5678...efgh', balance: '987.65 BTC', percentage: '1.87%' },
    { address: '0x9abc...ijkl', balance: '743.21 BTC', percentage: '1.41%' },
    { address: '0xdef0...mnop', balance: '567.89 BTC', percentage: '1.08%' },
  ],

  tokenInfo: {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43256.78,
    marketCap: '850.2B',
    volume24h: '12.3B',
    supply: '19.8M',
    maxSupply: '21M',
    rank: 1,
    dominance: '52.4%'
  },

  dcaOrders: [
    { asset: 'BTC', amount: 100, frequency: 'Daily', nextExecution: '2 hours', totalInvested: 3000, avgPrice: 41250 },
    { asset: 'ETH', amount: 50, frequency: 'Weekly', nextExecution: '3 days', totalInvested: 1200, avgPrice: 2580 },
    { asset: 'SOL', amount: 25, frequency: 'Bi-weekly', nextExecution: '10 days', totalInvested: 500, avgPrice: 89.60 },
  ],

  snipeTargets: [
    { symbol: 'PEPE', targetPrice: 0.000012, currentPrice: 0.000014, trigger: 'BELOW', status: 'ACTIVE' },
    { symbol: 'SHIB', targetPrice: 0.000025, currentPrice: 0.000023, trigger: 'ABOVE', status: 'ACTIVE' },
    { symbol: 'BONK', targetPrice: 0.000008, currentPrice: 0.000009, trigger: 'BELOW', status: 'TRIGGERED' },
  ],

  bubbleMap: [
    { symbol: 'BTC', size: 850, change: 2.34, color: 'green' },
    { symbol: 'ETH', size: 320, change: -1.23, color: 'red' },
    { symbol: 'SOL', size: 42, change: 4.56, color: 'green' },
    { symbol: 'ADA', size: 16, change: -2.34, color: 'red' },
    { symbol: 'DOT', size: 8.5, change: 1.23, color: 'green' },
    { symbol: 'LINK', size: 7.2, change: 0.89, color: 'green' },
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
};

export const dashboardTemplates = {
  beginner: {
    name: 'Beginner Trader',
    description: 'Simple layout focused on portfolio and basic trading',
    layout: [
      { i: 'watchlist', x: 0, y: 0, w: 6, h: 3, minW: 3, minH: 2 },
      { i: 'chart', x: 6, y: 0, w: 6, h: 3, minW: 4, minH: 2 },
      { i: 'buy', x: 0, y: 3, w: 6, h: 3, minW: 3, minH: 2 },
      { i: 'sell', x: 6, y: 3, w: 6, h: 3, minW: 3, minH: 2 },
    ]
  },
  intermediate: {
    name: 'Intermediate Trader',
    description: 'Balanced view with positions and copy trading',
    layout: [
      { i: 'watchlist', x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
      { i: 'positions', x: 4, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
      { i: 'copytrade', x: 8, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
      { i: 'chart', x: 0, y: 2, w: 8, h: 4, minW: 6, minH: 3 },
      { i: 'pendingorders', x: 8, y: 2, w: 4, h: 4, minW: 3, minH: 3 },
      { i: 'buy', x: 0, y: 6, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'sell', x: 3, y: 6, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'transactions', x: 6, y: 6, w: 6, h: 2, minW: 4, minH: 2 },
    ]
  },
  advanced: {
    name: 'Advanced Trader',
    description: 'Complete trading workspace with all tools and analytics',
    layout: [
      { i: 'watchlist', x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'positions', x: 3, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'toptraders', x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'wallets', x: 9, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
      { i: 'chart', x: 0, y: 2, w: 6, h: 4, minW: 6, minH: 3 },
      { i: 'bubblemap', x: 6, y: 2, w: 3, h: 4, minW: 3, minH: 3 },
      { i: 'tokeninfo', x: 9, y: 2, w: 3, h: 4, minW: 3, minH: 3 },
      { i: 'buy', x: 0, y: 6, w: 2, h: 2, minW: 2, minH: 2 },
      { i: 'sell', x: 2, y: 6, w: 2, h: 2, minW: 2, minH: 2 },
      { i: 'dca', x: 4, y: 6, w: 2, h: 2, minW: 2, minH: 2 },
      { i: 'snipe', x: 6, y: 6, w: 2, h: 2, minW: 2, minH: 2 },
      { i: 'transactions', x: 8, y: 6, w: 4, h: 2, minW: 3, minH: 2 },
    ]
  }
};

export const widgetLibrary = [
  {
    id: 'watchlist',
    name: 'Watchlist',
    category: 'Market',
    description: 'Track favorite crypto pairs',
    icon: 'Star',
    preview: 'Live price tracking with 24h changes'
  },
  {
    id: 'chart',
    name: 'Chart',
    category: 'Analysis', 
    description: 'Price charts and technical analysis',
    icon: 'BarChart3',
    preview: 'Interactive price charts with indicators'
  },
  {
    id: 'buy',
    name: 'Buy',
    category: 'Trading',
    description: 'Place buy orders',
    icon: 'TrendingUp',
    preview: 'Quick buy interface with order types'
  },
  {
    id: 'sell',
    name: 'Sell',
    category: 'Trading',
    description: 'Place sell orders',
    icon: 'TrendingDown',
    preview: 'Quick sell interface with profit targets'
  },
  {
    id: 'positions',
    name: 'Positions',
    category: 'Trading',
    description: 'Open trading positions',
    icon: 'Target',
    preview: 'Active positions with P&L tracking'
  },
  {
    id: 'pendingorders',
    name: 'Pending Orders',
    category: 'Trading',
    description: 'Manage pending orders',
    icon: 'Clock',
    preview: 'List of pending limit and stop orders'
  },
  {
    id: 'copytrade',
    name: 'Copy Trade',
    category: 'Social',
    description: 'Follow top traders',
    icon: 'Copy',
    preview: 'Browse and copy successful traders'
  },
  {
    id: 'toptraders',
    name: 'Top Traders',
    category: 'Social',
    description: 'Leaderboard of best performers',
    icon: 'Crown',
    preview: 'Rankings by profit and win rate'
  },
  {
    id: 'wallets',
    name: 'Wallets',
    category: 'Assets',
    description: 'Connected wallet overview',
    icon: 'Wallet',
    preview: 'Multi-wallet balance management'
  },
  {
    id: 'transactions',
    name: 'Transactions',
    category: 'History',
    description: 'Transaction history',
    icon: 'History',
    preview: 'Complete transaction records'
  },
  {
    id: 'tokeninfo',
    name: 'Token Info',
    category: 'Analysis',
    description: 'Detailed token information',
    icon: 'Info',
    preview: 'Market cap, supply, and token metrics'
  },
  {
    id: 'topholders',
    name: 'Top Holders',
    category: 'Analysis',
    description: 'Largest token holders',
    icon: 'Users',
    preview: 'Whale wallet tracking'
  },
  {
    id: 'bubblemap',
    name: 'Bubble Map',
    category: 'Analysis',
    description: 'Market visualization',
    icon: 'Circle',
    preview: 'Visual market cap representation'
  },
  {
    id: 'dca',
    name: 'DCA',
    category: 'Strategy',
    description: 'Dollar cost averaging',
    icon: 'Repeat',
    preview: 'Automated recurring investments'
  },
  {
    id: 'snipe',
    name: 'Snipe',
    category: 'Strategy',
    description: 'Price target triggers',
    icon: 'Crosshair',
    preview: 'Automated price-based trading'
  },
  {
    id: 'transactionhistory',
    name: 'Transaction History',
    category: 'History',
    description: 'Detailed trade history',
    icon: 'ScrollText',
    preview: 'Complete trading activity log'
  }
];