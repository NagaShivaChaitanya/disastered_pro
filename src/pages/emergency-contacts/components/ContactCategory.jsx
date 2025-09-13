import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ContactCard from './ContactCard';

const ContactCategory = ({ 
  category, 
  contacts, 
  onCall, 
  onMessage, 
  onEdit, 
  onAddContact,
  isCollapsed = false,
  onToggle 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    contact?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    contact?.phone?.includes(searchTerm)
  );

  const getCategoryIcon = (categoryName) => {
    switch (categoryName?.toLowerCase()) {
      case 'emergency services': return 'Siren';
      case 'institutional contacts': return 'Building';
      case 'family members': return 'Users';
      case 'disaster response teams': return 'Shield';
      case 'medical emergency': return 'Heart';
      case 'fire department': return 'Flame';
      case 'police': return 'Shield';
      default: return 'Phone';
    }
  };

  const getCategoryColor = (categoryName) => {
    switch (categoryName?.toLowerCase()) {
      case 'emergency services': return 'text-destructive';
      case 'medical emergency': return 'text-destructive';
      case 'fire department': return 'text-destructive';
      case 'police': return 'text-destructive';
      case 'institutional contacts': return 'text-primary';
      case 'family members': return 'text-accent';
      case 'disaster response teams': return 'text-warning';
      default: return 'text-foreground';
    }
  };

  const isEmergencyCategory = (categoryName) => {
    const emergencyCategories = ['emergency services', 'medical emergency', 'fire department', 'police'];
    return emergencyCategories?.includes(categoryName?.toLowerCase());
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div 
        className="flex items-center justify-between p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-standard"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            isEmergencyCategory(category?.name) ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
          }`}>
            <Icon name={getCategoryIcon(category?.name)} size={20} />
          </div>
          <div>
            <h2 className={`font-heading font-bold text-lg ${getCategoryColor(category?.name)}`}>
              {category?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {contacts?.length} contact{contacts?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {category?.priority && (
            <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
              Priority
            </span>
          )}
          
          <Icon 
            name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-4">
          {/* Search and Add Contact */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            
            {onAddContact && (
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                onClick={() => onAddContact(category?.name)}
              >
                Add
              </Button>
            )}
          </div>

          {/* Category Description */}
          {category?.description && (
            <div className="mb-4 p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <Icon name="Info" size={14} className="inline mr-2" />
                {category?.description}
              </p>
            </div>
          )}

          {/* Contacts Grid */}
          {filteredContacts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts?.map((contact) => (
                <ContactCard
                  key={contact?.id}
                  contact={contact}
                  onCall={onCall}
                  onMessage={onMessage}
                  onEdit={onEdit}
                  isEmergency={isEmergencyCategory(category?.name)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                {searchTerm ? 'No contacts found matching your search' : 'No contacts in this category'}
              </p>
              {onAddContact && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => onAddContact(category?.name)}
                >
                  Add First Contact
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactCategory;