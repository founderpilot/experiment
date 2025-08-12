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
  Market: 'text-blue-400 border-blue-400',
  Trading: 'text-green-400 border-green-400', 
  Analysis: 'text-purple-400 border-purple-400',
  Social: 'text-pink-400 border-pink-400',
  Assets: 'text-yellow-400 border-yellow-400',
  History: 'text-orange-400 border-orange-400',
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
          {filteredWidgets.map((widget) => {
            const Icon = iconMap[widget.icon] || Grid3X3;
            const isAlreadyAdded = existingWidgets.some(w => w.widgetType === widget.id);

            return (
              <Card 
                key={widget.id}
                className="cursor-pointer transition-all duration-300 hover:border-yellow-400/50 hover:shadow-lg hover:scale-105"
                onClick={() => !isAlreadyAdded && handleAddWidget(widget)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold">{widget.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${categoryColors[widget.category] || 'text-gray-400 border-gray-400'}`}
                        >
                          {widget.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {widget.description}
                  </p>
                  
                  {/* Preview Box */}
                  <div className="bg-muted/20 rounded p-2 mb-3 min-h-[60px] flex items-center justify-center">
                    <div className="text-center">
                      <Icon className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">
                        {widget.preview}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className={`w-full text-xs ${
                      isAlreadyAdded 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-yellow-400 text-black hover:bg-yellow-500'
                    }`}
                    disabled={isAlreadyAdded}
                  >
                    {isAlreadyAdded ? (
                      'Already Added'
                    ) : (
                      <>
                        <Plus className="w-3 h-3 mr-1" />
                        Add Widget
                      </>
                    )}
                  </Button>
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