import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyHeader = ({ onEmergencyToggle, isEmergencyActive = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationStatus, setLocationStatus] = useState('checking');
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate location detection
    const detectLocation = async () => {
      try {
        // Mock location detection
        await new Promise(resolve => setTimeout(resolve, 2000));
        setUserLocation('Punjab, India');
        setLocationStatus('detected');
      } catch (error) {
        setLocationStatus('failed');
      }
    };

    detectLocation();
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
  };

  const getLocationIcon = () => {
    switch (locationStatus) {
      case 'checking': return 'Loader';
      case 'detected': return 'MapPin';
      case 'failed': return 'MapPinOff';
      default: return 'MapPin';
    }
  };

  const getLocationColor = () => {
    switch (locationStatus) {
      case 'checking': return 'text-warning';
      case 'detected': return 'text-success';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${
      isEmergencyActive ? 'border-destructive bg-destructive/5' : ''
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Emergency Contacts
            </h1>
            <p className="text-muted-foreground">
              Quick access to critical communication resources during emergencies
            </p>
          </div>
          
          <Button
            variant={isEmergencyActive ? "destructive" : "outline"}
            size="lg"
            iconName="AlertTriangle"
            iconPosition="left"
            onClick={onEmergencyToggle}
            className={isEmergencyActive ? 'animate-pulse shadow-emergency' : ''}
          >
            {isEmergencyActive ? 'Exit Emergency Mode' : 'Emergency Mode'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Time */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <div className="font-mono font-bold text-lg text-foreground">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>

          {/* Location Status */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon 
              name={getLocationIcon()} 
              size={20} 
              className={`${getLocationColor()} ${locationStatus === 'checking' ? 'animate-spin' : ''}`} 
            />
            <div>
              <div className="font-medium text-foreground">
                {locationStatus === 'checking' && 'Detecting Location...'}
                {locationStatus === 'detected' && userLocation}
                {locationStatus === 'failed' && 'Location Unavailable'}
              </div>
              <div className="text-xs text-muted-foreground">
                Current Location
              </div>
            </div>
          </div>

          {/* Emergency Status */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon 
              name={isEmergencyActive ? "AlertTriangle" : "Shield"} 
              size={20} 
              className={isEmergencyActive ? "text-destructive animate-pulse" : "text-success"} 
            />
            <div>
              <div className={`font-medium ${isEmergencyActive ? 'text-destructive' : 'text-success'}`}>
                {isEmergencyActive ? 'Emergency Active' : 'System Normal'}
              </div>
              <div className="text-xs text-muted-foreground">
                Emergency Status
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Mode Alert */}
        {isEmergencyActive && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-destructive animate-pulse" />
              <span className="font-heading font-semibold text-destructive">
                Emergency Mode Active
              </span>
            </div>
            <p className="text-sm text-destructive/80">
              All emergency contacts are highlighted and quick actions are enabled. 
              Emergency services have been notified of your location.
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="font-heading font-bold text-2xl text-primary">24</div>
            <div className="text-xs text-muted-foreground">Total Contacts</div>
          </div>
          <div className="p-3 bg-success/10 rounded-lg">
            <div className="font-heading font-bold text-2xl text-success">18</div>
            <div className="text-xs text-muted-foreground">Verified</div>
          </div>
          <div className="p-3 bg-warning/10 rounded-lg">
            <div className="font-heading font-bold text-2xl text-warning">4</div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
          <div className="p-3 bg-accent/10 rounded-lg">
            <div className="font-heading font-bold text-2xl text-accent">12</div>
            <div className="text-xs text-muted-foreground">Available Now</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHeader;