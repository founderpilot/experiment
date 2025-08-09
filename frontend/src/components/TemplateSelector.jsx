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
  Check
} from 'lucide-react';

const TemplateSelector = ({ isOpen, onClose, templates, currentTemplate, onSelectTemplate }) => {
  const templateIcons = {
    beginner: User,
    intermediate: TrendingUp,
    advanced: Crown
  };

  const templateColors = {
    beginner: 'text-blue-400',
    intermediate: 'text-yellow-400', 
    advanced: 'text-purple-400'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-400">
            <Layout size={24} />
            Choose Your Trading Layout
          </DialogTitle>
          <p className="text-muted-foreground">
            Select a layout template that matches your trading experience and needs
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {Object.entries(templates).map(([key, template]) => {
            const Icon = templateIcons[key];
            const isSelected = currentTemplate === key;

            return (
              <Card 
                key={key} 
                className={`cursor-pointer transition-all duration-300 hover:border-yellow-400/50 ${
                  isSelected ? 'border-yellow-400 bg-yellow-400/5' : 'border-border'
                }`}
                onClick={() => onSelectTemplate(key)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-6 h-6 ${templateColors[key]}`} />
                      <h3 className="font-semibold">{template.name}</h3>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                        <Check className="w-4 h-4 text-black" />
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>

                  {/* Layout Preview */}
                  <div className="aspect-video bg-muted/20 rounded-lg p-2 mb-4">
                    <div className="grid grid-cols-12 grid-rows-8 gap-1 h-full">
                      {template.layout.map((item) => (
                        <div
                          key={item.i}
                          className={`bg-yellow-400/20 rounded border border-yellow-400/30 flex items-center justify-center`}
                          style={{
                            gridColumn: `${item.x + 1} / span ${item.w}`,
                            gridRow: `${item.y + 1} / span ${item.h}`
                          }}
                        >
                          <span className="text-xs font-medium text-yellow-400 capitalize">
                            {item.i.replace('trade', '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Layout Info */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {template.layout.length} widgets
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${templateColors[key]} bg-current/10`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            You can always customize any layout after selecting it
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              className="bg-yellow-400 text-black hover:bg-yellow-500"
              onClick={onClose}
            >
              Continue with {templates[currentTemplate]?.name || 'Current'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;