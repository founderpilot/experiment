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
  Eye,
  Grid3X3,
  Trash2,
  Edit3
} from 'lucide-react';
import { mockCryptoData, dashboardTemplates, widgetLibrary } from '../data/mockData';
import {
  WatchlistWidget,
  ChartWidget,
  BuyWidget,
  SellWidget,
  PositionsWidget,
  PendingOrdersWidget,
  CopyTradeWidget,
  TopTradersWidget,
  WalletsWidget,
  TransactionsWidget,
  TokenInfoWidget,
  TopHoldersWidget,
  BubbleMapWidget,
  DCAWidget,
  SnipeWidget,
  TransactionHistoryWidget
} from './AllWidgets';
import TemplateSelector from './TemplateSelector';
import WidgetSelector from './WidgetSelector';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const widgetComponents = {
  watchlist: WatchlistWidget,
  chart: ChartWidget,
  buy: BuyWidget,
  sell: SellWidget,
  positions: PositionsWidget,
  pendingorders: PendingOrdersWidget,
  copytrade: CopyTradeWidget,
  toptraders: TopTradersWidget,
  wallets: WalletsWidget,
  transactions: TransactionsWidget,
  tokeninfo: TokenInfoWidget,
  topholders: TopHoldersWidget,
  bubblemap: BubbleMapWidget,
  dca: DCAWidget,
  snipe: SnipeWidget,
  transactionhistory: TransactionHistoryWidget,
};

const BananaPro = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('beginner');
  const [layouts, setLayouts] = useState({
    lg: dashboardTemplates.beginner.layout,
    md: dashboardTemplates.beginner.layout,
    sm: dashboardTemplates.beginner.layout.map(item => ({...item, w: Math.min(item.w, 6), x: item.x % 6})),
    xs: dashboardTemplates.beginner.layout.map(item => ({...item, w: Math.min(item.w, 4), x: item.x % 4})),
    xxs: dashboardTemplates.beginner.layout.map(item => ({...item, w: 2, x: 0}))
  });
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-hide hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleLayoutChange = (layout, layouts) => {
    if (isEditMode) {
      setLayouts(layouts);
    }
  };

  const handleSave = () => {
    setIsEditMode(false);
    // Here you would save to backend/localStorage
    localStorage.setItem('bananaPro_layouts', JSON.stringify(layouts));
    localStorage.setItem('bananaPro_template', currentTemplate);
    console.log('Layout saved:', layouts);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset to saved layout
    const savedLayouts = localStorage.getItem('bananaPro_layouts');
    if (savedLayouts) {
      setLayouts(JSON.parse(savedLayouts));
    } else {
      setLayouts({
        lg: dashboardTemplates[currentTemplate].layout,
        md: dashboardTemplates[currentTemplate].layout,
        sm: dashboardTemplates[currentTemplate].layout.map(item => ({...item, w: Math.min(item.w, 6), x: item.x % 6})),
        xs: dashboardTemplates[currentTemplate].layout.map(item => ({...item, w: Math.min(item.w, 4), x: item.x % 4})),
        xxs: dashboardTemplates.beginner.layout.map(item => ({...item, w: 2, x: 0}))
      });
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm('Reset to default layout? This will lose all customizations.');
    if (confirmed) {
      const template = dashboardTemplates[currentTemplate];
      setLayouts({
        lg: template.layout,
        md: template.layout,
        sm: template.layout.map(item => ({...item, w: Math.min(item.w, 6), x: item.x % 6})),
        xs: template.layout.map(item => ({...item, w: Math.min(item.w, 4), x: item.x % 4})),
        xxs: template.layout.map(item => ({...item, w: 2, x: 0}))
      });
    }
  };

  const handleTemplateSelect = (templateKey) => {
    setCurrentTemplate(templateKey);
    const template = dashboardTemplates[templateKey];
    setLayouts({
      lg: template.layout,
      md: template.layout,
      sm: template.layout.map(item => ({...item, w: Math.min(item.w, 6), x: item.x % 6})),
      xs: template.layout.map(item => ({...item, w: Math.min(item.w, 4), x: item.x % 4})),
      xxs: template.layout.map(item => ({...item, w: 2, x: 0}))
    });
    setIsEditMode(false);
  };

  const handleEditLayout = (templateKey) => {
    setCurrentTemplate(templateKey);
    const template = dashboardTemplates[templateKey];
    setLayouts({
      lg: template.layout,
      md: template.layout,
      sm: template.layout.map(item => ({...item, w: Math.min(item.w, 6), x: item.x % 6})),
      xs: template.layout.map(item => ({...item, w: Math.min(item.w, 4), x: item.x % 4})),
      xxs: template.layout.map(item => ({...item, w: 2, x: 0}))
    });
    setIsEditMode(true);
    setShowTemplateSelector(false);
    setShowHint(false);
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      handleCancel();
    } else {
      setIsEditMode(true);
      setShowHint(false);
    }
  };

  const handleAddWidget = (newWidget) => {
    const updatedLayouts = { ...layouts };
    
    // Add widget to all breakpoints
    Object.keys(updatedLayouts).forEach(breakpoint => {
      const layout = [...updatedLayouts[breakpoint]];
      
      // Find a good position for the new widget
      let maxY = 0;
      layout.forEach(item => {
        const bottomY = item.y + item.h;
        if (bottomY > maxY) maxY = bottomY;
      });
      
      // Adjust widget size based on breakpoint
      let widgetConfig = { ...newWidget };
      switch (breakpoint) {
        case 'sm':
          widgetConfig.w = Math.min(newWidget.w, 6);
          widgetConfig.x = 0;
          break;
        case 'xs':
          widgetConfig.w = Math.min(newWidget.w, 4);
          widgetConfig.x = 0;
          break;
        case 'xxs':
          widgetConfig.w = 2;
          widgetConfig.x = 0;
          break;
        default:
          break;
      }
      
      widgetConfig.y = maxY;
      layout.push(widgetConfig);
      updatedLayouts[breakpoint] = layout;
    });
    
    setLayouts(updatedLayouts);
    setShowWidgetSelector(false);
  };

  const handleRemoveWidget = (widgetId) => {
    const updatedLayouts = { ...layouts };
    
    Object.keys(updatedLayouts).forEach(breakpoint => {
      updatedLayouts[breakpoint] = updatedLayouts[breakpoint].filter(item => item.i !== widgetId);
    });
    
    setLayouts(updatedLayouts);
  };

  const renderWidget = (item) => {
    const widgetType = item.widgetType || item.i;
    const WidgetComponent = widgetComponents[widgetType];
    
    if (!WidgetComponent) {
      return (
        <div className="widget-card h-full flex items-center justify-center">
          <p className="text-muted-foreground">Widget not found: {widgetType}</p>
        </div>
      );
    }

    const widgetData = {
      watchlist: mockCryptoData.watchlist,
      chart: mockCryptoData.chartData,
      buy: mockCryptoData,
      sell: mockCryptoData,
      positions: mockCryptoData.positions,
      pendingorders: mockCryptoData.pendingOrders,
      copytrade: mockCryptoData.copyTrades,
      toptraders: mockCryptoData.topTraders,
      wallets: mockCryptoData.wallets,
      transactions: mockCryptoData.transactions,
      tokeninfo: mockCryptoData.tokenInfo,
      topholders: mockCryptoData.topHolders,
      bubblemap: mockCryptoData.bubbleMap,
      dca: mockCryptoData.dcaOrders,
      snipe: mockCryptoData.snipeTargets,
      transactionhistory: mockCryptoData.recentTrades,
    };

    return <WidgetComponent data={widgetData[widgetType]} />;
  };

  const currentWidgets = layouts.lg || [];

  return (
    <div className={`min-h-screen bg-background p-2 md:p-4 ${isEditMode ? 'edit-mode' : ''}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
        <div className="animate-in slide-in-from-left duration-700">
          <h1 className="text-xl md:text-3xl font-bold text-yellow-400 transition-all duration-500 hover:scale-105 hover:drop-shadow-lg">
            🍌 Banana Pro
          </h1>
          <p className="text-sm md:text-base text-muted-foreground transition-colors duration-300 hover:text-yellow-400/80">
            {dashboardTemplates[currentTemplate].name} • {currentWidgets.length} widgets active
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto animate-in slide-in-from-right duration-700">
          <Button
            variant="outline"
            onClick={() => setShowTemplateSelector(true)}
            className="flex items-center gap-2 flex-1 md:flex-none text-xs md:text-sm transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25"
            size={isMobile ? "sm" : "default"}
          >
            <Settings size={14} className="transition-transform duration-300 hover:rotate-90" />
            {isMobile ? 'Templates' : 'Templates'}
          </Button>
          
          {isEditMode ? (
            <div className="flex gap-2 animate-in slide-in-from-top duration-500">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2 text-xs md:text-sm transition-all duration-300 hover:border-red-400 hover:text-red-400 hover:scale-105"
                size={isMobile ? "sm" : "default"}
              >
                <RotateCcw size={14} className="transition-transform duration-300 hover:rotate-180" />
                {isMobile ? 'Reset' : 'Reset Layout'}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2 text-xs md:text-sm transition-all duration-300 hover:border-gray-400 hover:text-gray-400 hover:scale-105"
                size={isMobile ? "sm" : "default"}
              >
                <X size={14} className="transition-transform duration-300 hover:rotate-90" />
                {isMobile ? 'Cancel' : 'Cancel'}
              </Button>
              <Button
                onClick={handleSave}
                className="flex items-center gap-2 text-xs md:text-sm bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25"
                size={isMobile ? "sm" : "default"}
              >
                <Save size={14} className="transition-transform duration-300 hover:scale-110" />
                {isMobile ? 'Save' : 'Save Layout'}
              </Button>
            </div>
          ) : (
            <Button
              onClick={toggleEditMode}
              className="flex items-center gap-2 text-xs md:text-sm bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25"
              size={isMobile ? "sm" : "default"}
            >
              <Edit3 size={14} className="transition-transform duration-300 hover:rotate-12" />
              {isMobile ? 'Edit' : 'Edit Layout'}
            </Button>
          )}
        </div>
      </div>

      {/* Edit Mode Hint */}
      {isEditMode && showHint && (
        <div className="edit-mode-hint animate-in slide-in-from-top duration-500">
          ✨ Drag widgets to reposition • Drag corners to resize • Use the + button to add more widgets
        </div>
      )}

      {/* Hint Chip */}
      {!isEditMode && showHint && (
        <div className="flex items-center justify-center mb-4 animate-in slide-in-from-top duration-500">
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-2 text-sm text-yellow-400/80 backdrop-blur-sm transition-all duration-300 hover:bg-yellow-400/20 hover:border-yellow-400/40 hover:text-yellow-400 hover:scale-105">
            💡 Click the yellow button to customize your dashboard
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="relative">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={80}
          onLayoutChange={handleLayoutChange}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          draggableHandle=".widget-card"
          margin={[16, 16]}
          containerPadding={[16, 16]}
          useCSSTransforms={true}
          transformScale={1}
          preventCollision={false}
          compactType="vertical"
          className={`transition-all duration-500 ${isEditMode ? 'edit-mode-grid' : ''}`}
        >
          {currentWidgets.map((widget) => {
            const WidgetComponent = widgetComponents[widget.widgetType];
            if (!WidgetComponent) return null;

            return (
              <div key={widget.i} className="widget-container">
                <div className="widget-card h-full flex items-center justify-center transition-all duration-500 hover:shadow-lg hover:shadow-yellow-400/10">
                  <WidgetComponent data={mockCryptoData} />
                </div>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>

      {/* Widget Add FAB - Only show in edit mode */}
      {isEditMode && (
        <button
          className="widget-add-fab animate-in slide-in-from-bottom duration-500"
          onClick={() => setShowWidgetSelector(true)}
          title="Add Widget"
        >
          <Grid3X3 size={20} className="transition-transform duration-300 hover:rotate-90" />
        </button>
      )}

      {/* Main FAB */}
      <button
        className={`banana-fab ${isEditMode ? 'pulse-animation' : ''} animate-in slide-in-from-bottom duration-700`}
        onClick={toggleEditMode}
        title={isEditMode ? "Exit Edit Mode" : "Customize Dashboard"}
      >
        {isEditMode ? <X size={isMobile ? 20 : 24} className="transition-transform duration-300 hover:rotate-90" /> : <Plus size={isMobile ? 20 : 24} className="transition-transform duration-300 hover:rotate-45" />}
      </button>

      {/* Template Selector Modal */}
      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        templates={dashboardTemplates}
        currentTemplate={currentTemplate}
        onSelectTemplate={handleTemplateSelect}
        onEditLayout={handleEditLayout}
      />

      {/* Widget Selector Modal */}
      <WidgetSelector
        isOpen={showWidgetSelector}
        onClose={() => setShowWidgetSelector(false)}
        widgetLibrary={widgetLibrary}
        onAddWidget={handleAddWidget}
        existingWidgets={currentWidgets}
      />
    </div>
  );
};

export default BananaPro;