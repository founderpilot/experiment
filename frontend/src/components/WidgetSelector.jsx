import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Star, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Copy, 
  Crown, 
  Wallet, 
  History, 
  Info, 
  Users, 
  Circle, 
  Repeat, 
  Crosshair, 
  ScrollText,
  Search,
  Plus,
  Grid3X3
} from 'lucide-react';

const iconMap = {
  Star, BarChart3, TrendingUp, TrendingDown, Target, Clock, Copy, Crown, 
  Wallet, History, Info, Users, Circle, Repeat, Crosshair, ScrollText
};

const categoryColors = {
  Popular: 'text-yellow-400 border-yellow-400',
  Market: 'text-blue-400 border-blue-400',
  Trading: 'text-green-400 border-green-400', 
  Analysis: 'text-purple-400 border-purple-400',
  Social: 'text-pink-400 border-pink-400',
  Assets: 'text-orange-400 border-orange-400',
  History: 'text-indigo-400 border-indigo-400',
  Strategy: 'text-red-400 border-red-400'
};

const WidgetSelector = ({ 
  isOpen, 
  onClose, 
  widgetLibrary, 
  onAddWidget, 
  existingWidgets = [] 
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...new Set(widgetLibrary.map(w => w.category))];

  const filteredWidgets = widgetLibrary.filter(widget => {
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || widget.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddWidget = (widget) => {
    // Generate unique ID for the widget
    const newWidget = {
      i: `${widget.id}_${Date.now()}`,
      x: 0,
      y: 0,
      w: 4,
      h: 3,
      minW: 3,
      minH: 2,
      widgetType: widget.id
    };
    onAddWidget(newWidget);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-400 text-lg md:text-xl">
            <Grid3X3 size={24} />
            Widget Library
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Drag widgets to your dashboard or click to add them
          </p>
        </DialogHeader>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 max-h-96 overflow-y-auto">
          {filteredWidgets.map((widget, index) => {
            const Icon = iconMap[widget.icon] || Grid3X3;
            const isAlreadyAdded = existingWidgets.some(w => w.widgetType === widget.id);
            const isPopular = widget.category === 'Popular';

            return (
              <Card 
                key={widget.id}
                className={`widget-selector-card cursor-pointer transition-all duration-500 hover:border-yellow-400/50 hover:shadow-2xl hover:scale-105 group ${
                  isAlreadyAdded ? 'opacity-50 cursor-not-allowed' : 'hover:border-yellow-400'
                } ${isPopular ? 'popular-widget' : ''}`}
                onClick={() => !isAlreadyAdded && handleAddWidget(widget)}
                style={{
                  animationDelay: `${index * 50}ms`,
                  transform: 'translateY(20px)',
                  opacity: 0,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                        isPopular ? 'bg-yellow-400/30 group-hover:bg-yellow-400/50' : 'bg-yellow-400/20 group-hover:bg-yellow-400/30'
                      }`}>
                        <Icon className={`w-4 h-4 transition-all duration-300 ${
                          isPopular ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-yellow-400 group-hover:text-yellow-300'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold transition-colors duration-300 group-hover:text-yellow-400">
                          {widget.name}
                        </CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`text-xs transition-all duration-300 ${
                            categoryColors[widget.category] || 'text-gray-400 border-gray-400'
                          } ${isPopular ? 'popular-badge' : ''}`}
                        >
                          {widget.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Popular indicator */}
                    {isPopular && (
                      <div className="popular-indicator">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                {/* Widget Preview */}
                <div className="widget-preview relative overflow-hidden rounded-lg mb-3">
                  <div className={`aspect-video flex items-center justify-center transition-all duration-500 group-hover:scale-105 ${
                    isPopular 
                      ? 'bg-gradient-to-br from-yellow-400/20 via-yellow-400/10 to-muted/40 group-hover:from-yellow-400/30 group-hover:via-yellow-400/20 group-hover:to-yellow-400/10' 
                      : 'bg-gradient-to-br from-muted/20 to-muted/40 group-hover:from-yellow-400/10 group-hover:to-yellow-400/20'
                  }`}>
                    {/* Preview Image Placeholder - You can replace these with actual GIFs */}
                    <div className="text-center p-4 transition-all duration-300 group-hover:scale-110">
                      <Icon className={`w-12 h-12 mx-auto mb-2 transition-all duration-300 ${
                        isPopular ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-yellow-400/60 group-hover:text-yellow-400'
                      }`} />
                      <p className={`text-xs transition-colors duration-300 ${
                        isPopular ? 'text-yellow-400/80 group-hover:text-yellow-400' : 'text-muted-foreground group-hover:text-yellow-400/80'
                      }`}>
                        {widget.preview}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                    <div className="p-3 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xs font-medium">{widget.name}</span>
                        {!isAlreadyAdded && (
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Plus className="w-3 h-3 text-black" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating particles for popular widgets */}
                  {isPopular && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="floating-particle particle-1"></div>
                      <div className="floating-particle particle-2"></div>
                      <div className="floating-particle particle-3"></div>
                    </div>
                  )}
                </div>

                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-yellow-400/80">
                    {widget.description}
                  </p>
                  
                  {isAlreadyAdded ? (
                    <div className="flex items-center justify-center">
                      <Badge variant="secondary" className="text-xs text-muted-foreground">
                        Already Added
                      </Badge>
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      className={`w-full transition-all duration-300 transform group-hover:scale-105 ${
                        isPopular 
                          ? 'bg-yellow-400/30 text-yellow-400 hover:bg-yellow-400 hover:text-black border-yellow-400/50 hover:border-yellow-400 shadow-lg group-hover:shadow-yellow-400/25' 
                          : 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400 hover:text-black border-yellow-400/30 hover:border-yellow-400'
                      }`}
                      onClick={() => handleAddWidget(widget)}
                    >
                      <Plus className="w-3 h-3 mr-1 transition-transform duration-300 group-hover:rotate-90" />
                      Add Widget
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredWidgets.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No widgets found matching your criteria</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {filteredWidgets.length} widgets available
          </p>
          <Button onClick={onClose} className="bg-yellow-400 text-black hover:bg-yellow-500">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WidgetSelector;