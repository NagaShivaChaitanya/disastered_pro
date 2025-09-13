import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegionalAlert = ({ alerts, onDismissAlert }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  if (!alerts || alerts?.length === 0) return null;

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10 border-error text-error';
      case 'high': return 'bg-warning/10 border-warning text-warning';
      case 'medium': return 'bg-accent/10 border-accent text-accent';
      default: return 'bg-primary/10 border-primary text-primary';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'weather': return 'Cloud';
      case 'earthquake': return 'Zap';
      case 'flood': return 'Droplets';
      case 'fire': return 'Flame';
      default: return 'AlertTriangle';
    }
  };

  return (
    <div className="mb-6 space-y-3">
      {alerts?.map((alert) => (
        <div
          key={alert?.id}
          className={`border-2 rounded-lg p-4 transition-standard ${getAlertColor(alert?.severity)}`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Icon name={getAlertIcon(alert?.type)} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-semibold text-foreground">
                  {alert?.title}
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-caption px-2 py-1 bg-current/20 rounded-full">
                    {alert?.severity?.toUpperCase()}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="X"
                    onClick={() => onDismissAlert(alert?.id)}
                    className="w-6 h-6 text-current hover:bg-current/20"
                  />
                </div>
              </div>
              
              <p className="text-sm text-foreground/80 mb-3">
                {alert?.summary}
              </p>
              
              {expandedAlert === alert?.id && (
                <div className="mb-3 p-3 bg-background/50 rounded-lg">
                  <p className="text-sm text-foreground mb-2">
                    {alert?.details}
                  </p>
                  
                  {alert?.recommendations && (
                    <div>
                      <h5 className="font-body font-medium text-foreground mb-2">
                        Recommended Actions:
                      </h5>
                      <ul className="text-sm text-foreground/80 space-y-1">
                        {alert?.recommendations?.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="ChevronRight" size={14} className="mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-foreground/60">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{alert?.region}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{alert?.timeAgo}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={expandedAlert === alert?.id ? "ChevronUp" : "ChevronDown"}
                    onClick={() => setExpandedAlert(expandedAlert === alert?.id ? null : alert?.id)}
                    className="text-xs text-current hover:bg-current/20"
                  >
                    {expandedAlert === alert?.id ? 'Less' : 'More'}
                  </Button>
                  
                  {alert?.relatedModules && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="BookOpen"
                      className="text-xs border-current text-current hover:bg-current/20"
                    >
                      Learn More
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegionalAlert;