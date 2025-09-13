import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmergencyAccess = () => {
  const emergencyContacts = [
    { label: 'Emergency Services', number: '112', icon: 'Phone' },
    { label: 'Disaster Helpline', number: '1078', icon: 'AlertTriangle' },
    { label: 'Fire Services', number: '101', icon: 'Flame' }
  ];

  const handleEmergencyCall = (number) => {
    window.open(`tel:${number}`);
  };

  return (
    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="AlertTriangle" size={20} className="text-destructive animate-pulse" />
        <h3 className="font-heading font-semibold text-lg text-destructive">
          Emergency Access
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Need immediate help? Access emergency services without logging in.
      </p>
      <div className="space-y-3 mb-4">
        {emergencyContacts?.map((contact, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Icon name={contact?.icon} size={16} className="text-destructive" />
              </div>
              <div>
                <p className="font-body font-medium text-sm text-foreground">
                  {contact?.label}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {contact?.number}
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              iconName="Phone"
              onClick={() => handleEmergencyCall(contact?.number)}
            >
              Call
            </Button>
          </div>
        ))}
      </div>
      <Link to="/emergency-contacts">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="ExternalLink"
          iconPosition="right"
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          View All Emergency Contacts
        </Button>
      </Link>
    </div>
  );
};

export default EmergencyAccess;