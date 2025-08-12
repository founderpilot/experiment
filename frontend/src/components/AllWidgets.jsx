import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Copy, 
  Star,
  BarChart3,
  Target,
  Clock,
  Crown,
  History,
  Info,
  Users,
  Circle,
  Repeat,
  Crosshair,
  ScrollText,
  Plus,
  Minus,
  ArrowUpDown,
  ExternalLink,
  Play,
  Pause,
  Settings,
  Eye,
  Activity,
  Zap,
  Shield
} from 'lucide-react';

// Watchlist Widget
export const WatchlistWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Star size={16} />
          <span className="text-sm md:text-base">Watchlist</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.slice(0, 5).map((coin) => (
          <div key={coin.symbol} className="flex items-center justify-between p-2 rounded hover:bg-muted/20 text-xs md:text-sm">
            <div>
              <p className="font-medium">{coin.symbol}</p>
              <p className="text-xs text-muted-foreground">{coin.volume}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${coin.price}</p>
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
      </CardContent>
    </Card>
  );
};

// Chart Widget
export const ChartWidget = ({ data }) => {
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));

  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-yellow-400">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span className="text-sm md:text-base">BTC/USDT</span>
          </div>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-xs">
            $43,256
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-24 md:h-32 mt-4">
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
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 text-center text-xs">
          <div>
            <p className="text-muted-foreground">24h High</p>
            <p className="font-medium text-yellow-400">${maxPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">24h Low</p>
            <p className="font-medium text-red-400">${minPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Volume</p>
            <p className="font-medium">1.2B</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Buy Widget
export const BuyWidget = ({ data }) => {
  const [amount, setAmount] = useState('100');
  const [orderType, setOrderType] = useState('MARKET');

  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-400">
          <TrendingUp size={16} />
          <span className="text-sm md:text-base">Buy</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2 mb-3">
          <Button 
            size="sm" 
            variant={orderType === 'MARKET' ? 'default' : 'outline'}
            onClick={() => setOrderType('MARKET')}
            className="flex-1 text-xs"
          >
            Market
          </Button>
          <Button 
            size="sm"
            variant={orderType === 'LIMIT' ? 'default' : 'outline'}
            onClick={() => setOrderType('LIMIT')}
            className="flex-1 text-xs"
          >
            Limit
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="p-2 rounded bg-muted/20 border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Amount (USDT)</span>
              <span className="text-xs text-muted-foreground">Balance: $2,450</span>
            </div>
            <Input 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-0 bg-transparent p-0 text-sm font-medium"
              placeholder="0.00"
            />
          </div>
          
          {orderType === 'LIMIT' && (
            <div className="p-2 rounded bg-muted/20 border">
              <span className="text-xs text-muted-foreground">Price (USDT)</span>
              <Input 
                defaultValue="43,200"
                className="border-0 bg-transparent p-0 text-sm font-medium mt-1"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-1">
          {['25%', '50%', '75%', '100%'].map(percent => (
            <Button key={percent} size="sm" variant="outline" className="text-xs">
              {percent}
            </Button>
          ))}
        </div>

        <Button className="w-full bg-green-500 hover:bg-green-600 text-black">
          <TrendingUp className="w-4 h-4 mr-2" />
          Buy BTC
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Est. Quantity:</span>
            <span>{orderType === 'MARKET' ? '0.00231 BTC' : '0.00232 BTC'}</span>
          </div>
          <div className="flex justify-between">
            <span>Fee:</span>
            <span className="text-yellow-400">~$0.75</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Sell Widget
export const SellWidget = ({ data }) => {
  const [amount, setAmount] = useState('0.1');
  const [orderType, setOrderType] = useState('MARKET');

  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-400">
          <TrendingDown size={16} />
          <span className="text-sm md:text-base">Sell</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2 mb-3">
          <Button 
            size="sm" 
            variant={orderType === 'MARKET' ? 'default' : 'outline'}
            onClick={() => setOrderType('MARKET')}
            className="flex-1 text-xs"
          >
            Market
          </Button>
          <Button 
            size="sm"
            variant={orderType === 'LIMIT' ? 'default' : 'outline'}
            onClick={() => setOrderType('LIMIT')}
            className="flex-1 text-xs"
          >
            Limit
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="p-2 rounded bg-muted/20 border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Amount (BTC)</span>
              <span className="text-xs text-muted-foreground">Balance: 1.2345</span>
            </div>
            <Input 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-0 bg-transparent p-0 text-sm font-medium"
              placeholder="0.00"
            />
          </div>
          
          {orderType === 'LIMIT' && (
            <div className="p-2 rounded bg-muted/20 border">
              <span className="text-xs text-muted-foreground">Price (USDT)</span>
              <Input 
                defaultValue="43,300"
                className="border-0 bg-transparent p-0 text-sm font-medium mt-1"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-1">
          {['25%', '50%', '75%', '100%'].map(percent => (
            <Button key={percent} size="sm" variant="outline" className="text-xs">
              {percent}
            </Button>
          ))}
        </div>

        <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
          <TrendingDown className="w-4 h-4 mr-2" />
          Sell BTC
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Est. Value:</span>
            <span>{orderType === 'MARKET' ? '$4,325.60' : '$4,330.00'}</span>
          </div>
          <div className="flex justify-between">
            <span>Fee:</span>
            <span className="text-yellow-400">~$3.25</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Positions Widget
export const PositionsWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Target size={16} />
          <span className="text-sm md:text-base">Positions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 3).map((position, index) => (
            <div key={index} className="p-2 rounded border bg-muted/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={position.side === 'LONG' ? "default" : "secondary"}
                    className={`text-xs ${
                      position.side === 'LONG' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {position.side}
                  </Badge>
                  <span className="text-sm font-medium">{position.symbol}</span>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${position.pnl > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {position.pnl > 0 ? '+' : ''}${position.pnl}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-medium">{position.size}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Entry</p>
                  <p className="font-medium">${position.entryPrice}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current</p>
                  <p className="font-medium">${position.currentPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Pending Orders Widget
export const PendingOrdersWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Clock size={16} />
          <span className="text-sm md:text-base">Pending Orders</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 4).map((order, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/20">
              <div className="flex items-center gap-2">
                <Badge 
                  variant={order.side === 'BUY' ? "default" : "secondary"}
                  className={`text-xs ${
                    order.side === 'BUY' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {order.side}
                </Badge>
                <div>
                  <p className="text-sm font-medium">{order.symbol}</p>
                  <p className="text-xs text-muted-foreground">{order.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{order.amount}</p>
                <p className="text-xs text-yellow-400">${order.price}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Copy Trade Widget
export const CopyTradeWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Copy size={16} />
          <span className="text-sm md:text-base">Copy Trade</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.slice(0, 2).map((trader) => (
            <div key={trader.trader} className="p-2 rounded border bg-muted/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <Crown className="w-3 h-3 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{trader.trader}</p>
                    <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                      {trader.tier}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={trader.isFollowing ? "secondary" : "default"}
                  className={`text-xs ${trader.isFollowing ? "" : "bg-yellow-400 text-black hover:bg-yellow-500"}`}
                >
                  {trader.isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Win Rate</p>
                  <p className="font-medium text-green-400">{trader.winRate}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Return</p>
                  <p className="font-medium text-yellow-400">+{trader.totalReturn}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">24h P&L</p>
                  <p className={`font-medium ${trader.recentPnL > 0 ? 'text-green-400' : 'text-red-400'}`}>
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

// Additional widgets...
export const TopTradersWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Crown size={16} />
          <span className="text-sm md:text-base">Top Traders</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 4).map((trader) => (
            <div key={trader.rank} className="flex items-center justify-between p-2 rounded hover:bg-muted/20">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center text-xs font-bold text-yellow-400">
                  {trader.rank}
                </div>
                <span className="text-sm font-medium">{trader.trader}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-400">{trader.pnl}</p>
                <p className="text-xs text-muted-foreground">{trader.winRate}%</p>
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
          <Wallet size={16} />
          <span className="text-sm md:text-base">Wallets</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.map((wallet) => (
            <div key={wallet.name} className="flex items-center justify-between p-2 rounded hover:bg-muted/20">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  wallet.status === 'connected' ? 'bg-green-400' : 'bg-gray-500'
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

export const TransactionsWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <History size={16} />
          <span className="text-sm md:text-base">Transactions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 4).map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/20">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {tx.type}
                </Badge>
                <div>
                  <p className="text-sm font-medium">{tx.asset}</p>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{tx.amount}</p>
                <p className={`text-xs ${
                  tx.status === 'COMPLETED' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const TokenInfoWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Info size={16} />
          <span className="text-sm md:text-base">Token Info</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center">
          <h3 className="text-lg font-bold">{data.name}</h3>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            #{data.rank} • {data.symbol}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-medium text-yellow-400">${data.price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Market Cap</p>
            <p className="font-medium">{data.marketCap}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Volume 24h</p>
            <p className="font-medium">{data.volume24h}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Supply</p>
            <p className="font-medium">{data.supply}/{data.maxSupply}</p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">BTC Dominance</p>
          <p className="text-lg font-bold text-yellow-400">{data.dominance}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const TopHoldersWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Users size={16} />
          <span className="text-sm md:text-base">Top Holders</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 4).map((holder, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/20">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <Wallet className="w-3 h-3 text-yellow-400" />
                </div>
                <span className="text-sm font-mono">{holder.address}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{holder.balance}</p>
                <p className="text-xs text-yellow-400">{holder.percentage}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const BubbleMapWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Circle size={16} />
          <span className="text-sm md:text-base">Bubble Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-32 md:h-40">
          <div className="flex flex-wrap gap-2 justify-center items-center h-full">
            {data.map((token) => (
              <div
                key={token.symbol}
                className={`rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all hover:scale-110 ${
                  token.change > 0 
                    ? 'bg-green-500/20 border-green-400 text-green-400' 
                    : 'bg-red-500/20 border-red-400 text-red-400'
                }`}
                style={{
                  width: `${Math.max(30, token.size / 15)}px`,
                  height: `${Math.max(30, token.size / 15)}px`,
                  fontSize: `${Math.max(8, token.size / 50)}px`
                }}
              >
                {token.symbol}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">Market cap visualization</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const DCAWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Repeat size={16} />
          <span className="text-sm md:text-base">DCA Orders</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 3).map((order, index) => (
            <div key={index} className="p-2 rounded border bg-muted/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                    {order.asset}
                  </Badge>
                  <span className="text-sm font-medium">${order.amount}</span>
                </div>
                <Button size="sm" variant="outline" className="text-xs">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Frequency</p>
                  <p className="font-medium">{order.frequency}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Next</p>
                  <p className="font-medium text-yellow-400">{order.nextExecution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button size="sm" className="w-full mt-3 bg-yellow-400 text-black hover:bg-yellow-500">
          <Plus className="w-4 h-4 mr-2" />
          New DCA Order
        </Button>
      </CardContent>
    </Card>
  );
};

export const SnipeWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Crosshair size={16} />
          <span className="text-sm md:text-base">Snipe</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 3).map((target, index) => (
            <div key={index} className="p-2 rounded border bg-muted/10">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                  {target.symbol}
                </Badge>
                <Badge 
                  variant={target.status === 'ACTIVE' ? 'default' : 'secondary'}
                  className={`text-xs ${
                    target.status === 'ACTIVE' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}
                >
                  {target.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Target</p>
                  <p className="font-medium">${target.targetPrice}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current</p>
                  <p className="font-medium">${target.currentPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button size="sm" className="w-full mt-3 bg-yellow-400 text-black hover:bg-yellow-500">
          <Crosshair className="w-4 h-4 mr-2" />
          New Snipe
        </Button>
      </CardContent>
    </Card>
  );
};

export const TransactionHistoryWidget = ({ data }) => {
  return (
    <Card className="widget-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <ScrollText size={16} />
          <span className="text-sm md:text-base">Trade History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 4).map((trade, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/20">
              <div className="flex items-center gap-2">
                <Badge 
                  variant={trade.side === 'BUY' ? "default" : "secondary"}
                  className={`text-xs ${
                    trade.side === 'BUY' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
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
                <p className={`text-xs ${trade.pnl > 0 ? 'text-green-400' : 'text-red-400'}`}>
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