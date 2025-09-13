import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ onEmergencyBroadcast, onMassNotification, userRole = 'student' }) => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [broadcastType, setBroadcastType] = useState('');

  const emergencyActions = [
    {
      id: 'fire',
      label: 'Fire Emergency',
      icon: 'Flame',
      color: 'destructive',
      description: 'Report fire incident and alert all contacts'
    },
    {
      id: 'earthquake',
      label: 'Earthquake Alert',
      icon: 'Zap',
      color: 'warning',
      description: 'Activate earthquake response protocol'
    },
    {
      id: 'flood',
      label: 'Flood Warning',
      icon: 'Waves',
      color: 'primary',
      description: 'Issue flood evacuation notice'
    },
    {
      id: 'medical',
      label: 'Medical Emergency',
      icon: 'Heart',
      color: 'destructive',
      description: 'Request immediate medical assistance'
    }
  ];

  const quickDialNumbers = [
    { label: 'Emergency Services', number: '112', icon: 'Phone' },
    { label: 'Fire Department', number: '101', icon: 'Flame' },
    { label: 'Police', number: '100', icon: 'Shield' },
    { label: 'Ambulance', number: '108', icon: 'Heart' }
  ];

  const handleEmergencyAction = (actionId) => {
    setBroadcastType(actionId);
    setIsEmergencyMode(true);
    if (onEmergencyBroadcast) {
      onEmergencyBroadcast(actionId);
    }
  };

  const handleQuickDial = (number) => {
    window.open(`tel:${number}`);
  };

  const handleMassNotify = () => {
    if (onMassNotification) {
      onMassNotification();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={20} className="text-warning" />
            <h2 className="font-heading font-bold text-lg text-foreground">
              Quick Actions
            </h2>
          </div>
          
          {isEmergencyMode && (
            <div className="flex items-center space-x-2 text-destructive">
              <Icon name="AlertTriangle" size={16} className="animate-pulse" />
              <span className="text-sm font-medium">Emergency Mode</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Quick Dial Numbers */}
        <div>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">
            Emergency Numbers
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {quickDialNumbers?.map((contact) => (
              <Button
                key={contact?.number}
                variant="outline"
                size="sm"
                iconName={contact?.icon}
                iconPosition="left"
                onClick={() => handleQuickDial(contact?.number)}
                className="flex-col h-auto py-3 space-y-1"
              >
                <span className="font-mono font-bold">{contact?.number}</span>
                <span className="text-xs opacity-75">{contact?.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Emergency Actions - Only for authorized users */}
        {(userRole === 'administrator' || userRole === 'teacher') && (
          <div>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">
              Emergency Broadcast
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {emergencyActions?.map((action) => (
                <Button
                  key={action?.id}
                  variant={action?.color}
                  size="sm"
                  iconName={action?.icon}
                  iconPosition="left"
                  onClick={() => handleEmergencyAction(action?.id)}
                  className="justify-start h-auto py-3 px-4"
                >
                  <div className="text-left">
                    <div className="font-medium">{action?.label}</div>
                    <div className="text-xs opacity-75">{action?.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Mass Notification - Only for administrators */}
        {userRole === 'administrator' && (
          <div>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">
              Communication Tools
            </h3>
            <div className="space-y-2">
              <Button
                variant="secondary"
                size="sm"
                iconName="Megaphone"
                iconPosition="left"
                onClick={handleMassNotify}
                fullWidth
              >
                Send Mass Notification
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Mail"
                  iconPosition="left"
                >
                  Email All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  SMS All
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Location Services */}
        <div>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">
            Location Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MapPin"
              iconPosition="left"
            >
              Share Location
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Navigation"
              iconPosition="left"
            >
              Evacuation Routes
            </Button>
          </div>
        </div>

        {/* Emergency Status */}
        <div className="p-3 bg-muted rounded-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">System Status</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-success">All Systems Operational</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: 'Asia/Kolkata'
            })} IST
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;