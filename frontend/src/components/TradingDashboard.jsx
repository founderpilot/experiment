import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Save, 
  X, 
  RotateCcw, 
  Settings,
  Sparkles,
  Eye
} from 'lucide-react';
import { mockCryptoData, dashboardTemplates } from '../data/mockData';
import {
  PortfolioWidget,
  WatchlistWidget,
  ChartWidget,
  SwapWidget,
  CopyTradeWidget,
  WalletsWidget,
  TradesWidget,
  OrderBookWidget
} from './CryptoWidget';
import TemplateSelector from './TemplateSelector';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const widgetComponents = {
  portfolio: PortfolioWidget,
  watchlist: WatchlistWidget,
  chart: ChartWidget,
  swap: SwapWidget,
  copytrade: CopyTradeWidget,
  wallets: WalletsWidget,
  trades: TradesWidget,
  orderbook: OrderBookWidget,
};

const TradingDashboard = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('beginner');
  const [layouts, setLayouts] = useState({
    lg: dashboardTemplates.beginner.layout
  });
  const [showHint, setShowHint] = useState(true);

  // Auto-hide hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleLayoutChange = (layout) => {
    if (isEditMode) {
      setLayouts({ lg: layout });
    }
  };

  const handleSave = () => {
    setIsEditMode(false);
    // Here you would save to backend/localStorage
    console.log('Layout saved:', layouts);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset to saved layout
    setLayouts({ lg: dashboardTemplates[currentTemplate].layout });
  };

  const handleReset = () => {
    const confirmed = window.confirm('Reset to default layout? This will lose all customizations.');
    if (confirmed) {
      setLayouts({ lg: dashboardTemplates[currentTemplate].layout });
    }
  };

  const handleTemplateSelect = (templateKey) => {
    setCurrentTemplate(templateKey);
    setLayouts({ lg: dashboardTemplates[templateKey].layout });
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      handleCancel();
    } else {
      setIsEditMode(true);
      setShowHint(false);
    }
  };

  const renderWidget = (widgetId) => {
    const WidgetComponent = widgetComponents[widgetId];
    if (!WidgetComponent) return <div>Widget not found</div>;

    const widgetData = {
      portfolio: mockCryptoData.portfolio,
      watchlist: mockCryptoData.watchlist,
      chart: mockCryptoData.chartData,
      swap: mockCryptoData.swapPairs,
      copytrade: mockCryptoData.copyTrades,
      wallets: mockCryptoData.wallets,
      trades: mockCryptoData.recentTrades,
      orderbook: mockCryptoData.orderBook,
    };

    return <WidgetComponent data={widgetData[widgetId]} />;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">Crypto Dashboard</h1>
          <p className="text-muted-foreground">
            {dashboardTemplates[currentTemplate].name} • {layouts.lg.length} widgets active
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowTemplateSelector(true)}
            className="flex items-center gap-2"
          >
            <Settings size={16} />
            Templates
          </Button>
          
          {isEditMode && (
            <>
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X size={16} />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-yellow-400 text-black hover:bg-yellow-500 flex items-center gap-2"
              >
                <Save size={16} />
                Save Layout
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Hint Chip */}
      {showHint && !isEditMode && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Badge 
            variant="secondary" 
            className="bg-yellow-400/20 text-yellow-400 border-yellow-400/50 px-4 py-2 text-sm animate-pulse"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Click the + button to customize your dashboard
          </Badge>
        </div>
      )}

      {/* Edit Mode Banner */}
      {isEditMode && (
        <div className="mb-4 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-400">
            <Eye className="w-5 h-5" />
            <span className="font-medium">Edit Mode Active</span>
            <Badge variant="outline" className="ml-auto border-yellow-400 text-yellow-400">
              Drag & Resize widgets
            </Badge>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="widget-grid">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          onLayoutChange={handleLayoutChange}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          rowHeight={60}
          draggableHandle=".widget-card"
        >
          {layouts.lg.map((item) => (
            <div key={item.i} className="relative group">
              {renderWidget(item.i)}
              {isEditMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="secondary" className="text-xs">
                    {item.w}×{item.h}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>

      {/* Floating Action Button */}
      <button
        className={`trading-fab ${isEditMode ? 'pulse-animation' : ''}`}
        onClick={toggleEditMode}
        title={isEditMode ? "Exit Edit Mode" : "Customize Dashboard"}
      >
        {isEditMode ? <X size={24} /> : <Plus size={24} />}
      </button>

      {/* Template Selector Modal */}
      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        templates={dashboardTemplates}
        currentTemplate={currentTemplate}
        onSelectTemplate={handleTemplateSelect}
      />
    </div>
  );
};

export default TradingDashboard;