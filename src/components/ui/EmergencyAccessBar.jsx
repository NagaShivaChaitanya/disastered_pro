import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyAccessBar = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleEmergencyActivation = () => {
    setIsEmergencyActive(!isEmergencyActive);
    
    // Store emergency state in localStorage for persistence
    localStorage.setItem('emergency-mode', (!isEmergencyActive)?.toString());
    
    // Trigger emergency mode across the application
    window.dispatchEvent(new CustomEvent('emergency-mode-toggle', {
      detail: { active: !isEmergencyActive }
    }));
  };

  const emergencyContacts = [
    { label: 'Emergency Services', number: '911', icon: 'Phone' },
    { label: 'Campus Security', number: '555-0123', icon: 'Shield' },
    { label: 'Emergency Coordinator', number: '555-0456', icon: 'UserCheck' }
  ];

  return (
    <div className={`fixed top-0 right-0 z-50 transition-all duration-300 ${
      isEmergencyActive ? 'w-full' : 'w-auto'
    }`}>
      {/* Collapsed Emergency Button */}
      {!isEmergencyActive && (
        <div className="p-4">
          <Button
            variant="destructive"
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
            onClick={handleEmergencyActivation}
            className="shadow-emergency animate-pulse"
          >
            Emergency
            {!isOnline && (
              <Icon name="WifiOff" size={14} className="ml-2" />
            )}
          </Button>
        </div>
      )}
      {/* Expanded Emergency Panel */}
      {isEmergencyActive && (
        <div className="w-full bg-destructive text-destructive-foreground shadow-emergency">
          <div className="flex items-center justify-between p-4 border-b border-destructive-foreground/20">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="animate-pulse" />
              <h2 className="font-heading font-bold text-lg">Emergency Mode Active</h2>
              {!isOnline && (
                <div className="flex items-center space-x-1 text-sm">
                  <Icon name="WifiOff" size={16} />
                  <span>Offline</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={handleEmergencyActivation}
              className="text-destructive-foreground hover:bg-destructive-foreground/10"
            />
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {emergencyContacts?.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-destructive-foreground/10 rounded-lg"
                >
                  <Icon name={contact?.icon} size={18} />
                  <div>
                    <div className="font-body font-medium text-sm">{contact?.label}</div>
                    <div className="font-mono text-sm">{contact?.number}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="Phone"
                    className="ml-auto text-destructive-foreground hover:bg-destructive-foreground/10"
                    onClick={() => window.open(`tel:${contact?.number}`)}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Link to="/emergency-contacts">
                <Button
                  variant="outline"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="border-destructive-foreground text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
                >
                  View All Contacts
                </Button>
              </Link>

              <div className="text-xs font-caption opacity-75">
                Last updated: {new Date()?.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyAccessBar;