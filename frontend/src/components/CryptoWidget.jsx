import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Copy, 
  ArrowUpDown, 
  BarChart3,
  Users,
  Star,
  ExternalLink,
  Plus,
  Minus,
  Activity
} from 'lucide-react';

export const PortfolioWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Wallet size={20} />
          Portfolio Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-xl font-bold">${data.totalValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">24h P&L</p>
              <div className="flex items-center gap-1">
                {data.totalPnL > 0 ? (
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <p className={`text-lg font-semibold ${data.totalPnL > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                  ${Math.abs(data.totalPnL).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {data.assets.slice(0, 4).map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-400">{asset.symbol}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.balance}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${asset.value.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    {asset.change24h > 0 ? (
                      <TrendingUp className="w-3 h-3 text-yellow-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span className={`text-xs ${asset.change24h > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {Math.abs(asset.change24h)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const WatchlistWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Star size={20} />
          Market Watch
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 6).map((coin) => (
            <div key={coin.symbol} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
              <div>
                <p className="text-sm font-medium">{coin.symbol}</p>
                <p className="text-xs text-muted-foreground">{coin.volume}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${coin.price}</p>
                <div className="flex items-center gap-1">
                  {coin.change24h > 0 ? (
                    <TrendingUp className="w-3 h-3 text-yellow-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className={`text-xs ${coin.change24h > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {Math.abs(coin.change24h)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const ChartWidget = ({ data }) => {
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));

  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-yellow-400">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} />
            BTC/USDT Chart
          </div>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            $43,256
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-32 mt-4">
          <svg className="w-full h-full" viewBox="0 0 400 120">
            <defs>
              <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#facc15" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="url(#priceGradient)"
              stroke="#facc15"
              strokeWidth="2"
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 400;
                const y = 120 - ((d.price - minPrice) / (maxPrice - minPrice)) * 100 - 10;
                return `${x},${y}`;
              }).join(' ')}
            />
            <polyline
              fill="none"
              stroke="#facc15"
              strokeWidth="2"
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 400;
                const y = 120 - ((d.price - minPrice) / (maxPrice - minPrice)) * 100 - 10;
                return `${x},${y}`;
              }).join(' ')}
            />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">24h High</p>
            <p className="text-sm font-medium text-yellow-400">${maxPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24h Low</p>
            <p className="text-sm font-medium text-red-400">${minPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24h Vol</p>
            <p className="text-sm font-medium">1.2B</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const SwapWidget = ({ data }) => {
  const [fromToken, setFromToken] = React.useState('BTC');
  const [toToken, setToToken] = React.useState('ETH');
  const [amount, setAmount] = React.useState('0.1');

  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <ArrowUpDown size={20} />
          Quick Swap
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-muted/20 border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">From</span>
              <span className="text-xs text-muted-foreground">Balance: 1.2345</span>
            </div>
            <div className="flex items-center justify-between">
              <input 
                className="bg-transparent text-lg font-medium outline-none flex-1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
              />
              <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 ml-2">
                {fromToken}
              </Badge>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full p-2"
              onClick={() => {
                setFromToken(toToken);
                setToToken(fromToken);
              }}
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-3 rounded-lg bg-muted/20 border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">To</span>
              <span className="text-xs text-muted-foreground">Balance: 8.9876</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">
                {fromToken === 'BTC' && toToken === 'ETH' ? (parseFloat(amount) * 16.15).toFixed(4) : '0.0'}
              </span>
              <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 ml-2">
                {toToken}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span>1 {fromToken} = 16.15 {toToken}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Network Fee</span>
            <span className="text-yellow-400">~$2.50</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Slippage</span>
            <span>0.05%</span>
          </div>
        </div>

        <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
          Swap Tokens
        </Button>
      </CardContent>
    </Card>
  );
};

export const CopyTradeWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Copy size={20} />
          Top Traders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.slice(0, 3).map((trader) => (
            <div key={trader.trader} className="p-3 rounded-lg border bg-muted/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{trader.trader}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        trader.tier === 'Diamond' ? 'text-yellow-400 border-yellow-400' : 
                        'text-blue-400 border-blue-400'
                      }`}
                    >
                      {trader.tier}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={trader.isFollowing ? "secondary" : "default"}
                  className={trader.isFollowing ? "" : "bg-yellow-400 text-black hover:bg-yellow-500"}
                >
                  {trader.isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Win Rate</p>
                  <p className="font-medium text-yellow-400">{trader.winRate}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Return</p>
                  <p className="font-medium text-green-400">+{trader.totalReturn}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">24h P&L</p>
                  <p className={`font-medium ${trader.recentPnL > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {trader.recentPnL > 0 ? '+' : ''}${trader.recentPnL}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const WalletsWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Wallet size={20} />
          Connected Wallets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((wallet) => (
            <div key={wallet.name} className="flex items-center justify-between p-2 rounded">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  wallet.status === 'connected' ? 'bg-yellow-400' : 'bg-gray-500'
                }`} />
                <div>
                  <p className="text-sm font-medium">{wallet.name}</p>
                  <p className="text-xs text-muted-foreground">{wallet.network}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{wallet.balance}</p>
                <p className="text-xs text-muted-foreground capitalize">{wallet.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const TradesWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Activity size={20} />
          Recent Trades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 4).map((trade, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/20">
              <div className="flex items-center gap-3">
                <Badge 
                  variant={trade.side === 'BUY' ? "default" : "secondary"}
                  className={`text-xs ${
                    trade.side === 'BUY' 
                      ? 'bg-yellow-400/20 text-yellow-400' 
                      : 'bg-red-400/20 text-red-400'
                  }`}
                >
                  {trade.side}
                </Badge>
                <div>
                  <p className="text-sm font-medium">{trade.pair}</p>
                  <p className="text-xs text-muted-foreground">{trade.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{trade.amount}</p>
                <p className={`text-xs ${trade.pnl > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {trade.pnl > 0 ? '+' : ''}${trade.pnl}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const OrderBookWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <BarChart3 size={20} />
          Order Book
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground grid grid-cols-3">
            <span>Price</span>
            <span>Size</span>
            <span>Total</span>
          </div>
          
          <div className="space-y-1">
            {data.asks.slice(0, 3).reverse().map((ask, index) => (
              <div key={`ask-${index}`} className="grid grid-cols-3 text-xs py-1">
                <span className="text-red-400">{ask.price.toFixed(2)}</span>
                <span>{ask.size.toFixed(3)}</span>
                <span>{ask.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-b py-2 text-center">
            <span className="text-lg font-bold text-yellow-400">43,247.50</span>
            <p className="text-xs text-muted-foreground">Last Price</p>
          </div>
          
          <div className="space-y-1">
            {data.bids.slice(0, 3).map((bid, index) => (
              <div key={`bid-${index}`} className="grid grid-cols-3 text-xs py-1">
                <span className="text-yellow-400">{bid.price.toFixed(2)}</span>
                <span>{bid.size.toFixed(3)}</span>
                <span>{bid.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};