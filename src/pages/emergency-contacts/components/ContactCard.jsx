import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactCard = ({ contact, onCall, onMessage, onEdit, isEmergency = false }) => {
  const handleCall = () => {
    window.open(`tel:${contact?.phone}`);
    if (onCall) onCall(contact);
  };

  const handleMessage = () => {
    window.open(`sms:${contact?.phone}`);
    if (onMessage) onMessage(contact);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'busy': return 'text-warning';
      case 'unavailable': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'busy': return 'Clock';
      case 'unavailable': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-card transition-standard hover:shadow-modal ${
      isEmergency ? 'border-destructive/30 bg-destructive/5' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
            isEmergency ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
          }`}>
            <Icon name={contact?.icon || 'User'} size={20} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {contact?.name}
            </h3>
            <p className="text-sm text-muted-foreground">{contact?.role}</p>
            {contact?.department && (
              <p className="text-xs text-muted-foreground">{contact?.department}</p>
            )}
          </div>
        </div>
        
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            iconName="Edit"
            onClick={() => onEdit(contact)}
            className="h-8 w-8"
          />
        )}
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Phone" size={16} className="text-muted-foreground" />
          <span className="font-mono text-sm text-foreground">{contact?.phone}</span>
          {contact?.verified && (
            <Icon name="CheckCircle" size={14} className="text-success" />
          )}
        </div>
        
        {contact?.email && (
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{contact?.email}</span>
          </div>
        )}
        
        {contact?.location && (
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{contact?.location}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon(contact?.status)} 
            size={14} 
            className={getStatusColor(contact?.status)} 
          />
          <span className={`text-xs font-medium ${getStatusColor(contact?.status)}`}>
            {contact?.status ? contact?.status?.charAt(0)?.toUpperCase() + contact?.status?.slice(1) : 'Unknown'}
          </span>
        </div>
        
        {contact?.lastSeen && (
          <span className="text-xs text-muted-foreground">
            Last seen: {contact?.lastSeen}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <Button
          variant={isEmergency ? "destructive" : "default"}
          size="sm"
          iconName="Phone"
          iconPosition="left"
          onClick={handleCall}
          className="flex-1"
        >
          Call
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
          onClick={handleMessage}
          className="flex-1"
        >
          Message
        </Button>
      </div>
      {contact?.specialInstructions && (
        <div className="mt-3 p-2 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">
            <Icon name="Info" size={12} className="inline mr-1" />
            {contact?.specialInstructions}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactCard;