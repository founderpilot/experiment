import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  User, 
  TrendingUp, 
  Crown,
  Layout,
  Check,
  Sparkles,
  Edit3
} from 'lucide-react';

const TemplateSelector = ({ isOpen, onClose, templates, currentTemplate, onSelectTemplate, onEditLayout }) => {
  const templateIcons = {
    beginner: User,
    intermediate: TrendingUp,
    advanced: Crown
  };

  const templateColors = {
    beginner: 'text-green-400',
    intermediate: 'text-yellow-400', 
    advanced: 'text-purple-400'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-400 text-lg md:text-xl">
            <Layout size={24} />
            Choose Your Trading Layout
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Select a layout template that matches your trading experience and needs
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
          {Object.entries(templates).map(([key, template], index) => {
            const Icon = templateIcons[key];
            const isSelected = currentTemplate === key;

            return (
              <Card 
                key={key} 
                className={`template-card cursor-pointer transition-all duration-700 hover:border-yellow-400/50 hover:scale-105 group ${
                  isSelected ? 'border-yellow-400 bg-yellow-400/5' : 'border-border'
                }`}
                onClick={() => onSelectTemplate(key)}
                style={{
                  animationDelay: `${index * 200}ms`,
                  transform: 'translateY(30px)',
                  opacity: 0,
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg transition-all duration-500 group-hover:scale-110 ${
                        isSelected ? 'bg-yellow-400/20' : 'bg-muted/20 group-hover:bg-yellow-400/10'
                      }`}>
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ${
                          templateColors[key]
                        } group-hover:scale-110`} />
                      </div>
                      <h3 className="font-semibold text-sm md:text-base transition-colors duration-300 group-hover:text-yellow-400">
                        {template.name}
                      </h3>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-yellow-400 flex items-center justify-center transform scale-75 animate-in zoom-in-75 duration-300">
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-black" />
                      </div>
                    )}
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-yellow-400/80">
                    {template.description}
                  </p>

                  {/* Layout Preview */}
                  <div className="aspect-video bg-muted/20 rounded-lg p-2 mb-4 transition-all duration-500 group-hover:bg-yellow-400/10 group-hover:scale-105 overflow-hidden">
                    <div className="grid grid-cols-12 grid-rows-8 gap-0.5 md:gap-1 h-full">
                      {template.layout.map((item, itemIndex) => (
                        <div
                          key={item.i}
                          className="bg-yellow-400/20 rounded border border-yellow-400/30 flex items-center justify-center transition-all duration-500 group-hover:bg-yellow-400/30 group-hover:border-yellow-400/50"
                          style={{
                            gridColumn: `${item.x + 1} / span ${item.w}`,
                            gridRow: `${item.y + 1} / span ${item.h}`,
                            animationDelay: `${itemIndex * 100}ms`,
                            animation: 'fadeInScale 0.6s ease-out forwards'
                          }}
                        >
                          <span className="text-xs font-medium text-yellow-400 capitalize hidden md:block transition-all duration-300 group-hover:scale-110">
                            {item.i.replace('trade', '').replace('history', 'hist')}
                          </span>
                          <span className="text-xs font-medium text-yellow-400 capitalize md:hidden transition-all duration-300 group-hover:scale-110">
                            {item.i.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Layout Info */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs transition-all duration-300 group-hover:border-yellow-400/50 group-hover:text-yellow-400/80">
                      {template.layout.length} widgets
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs transition-all duration-300 ${templateColors[key]} bg-current/10 group-hover:scale-105`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Badge>
                  </div>

                  {/* Edit Layout Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditLayout(key);
                    }}
                    className="w-full flex items-center gap-2 text-xs hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-yellow-400/25"
                  >
                    <Edit3 size={14} className="transition-transform duration-300 group-hover:rotate-12" />
                    Edit Layout
                  </Button>

                  {/* Recommended Badge */}
                  {key === 'intermediate' && (
                    <div className="flex items-center justify-center mt-2">
                      <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400 text-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-400/30">
                        <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                        Recommended
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-4 border-t gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            You can always customize any layout after selecting it
          </p>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" onClick={onClose} className="flex-1 md:flex-none">
              Cancel
            </Button>
            <Button 
              className="bg-yellow-400 text-black hover:bg-yellow-500 flex-1 md:flex-none"
              onClick={onClose}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;