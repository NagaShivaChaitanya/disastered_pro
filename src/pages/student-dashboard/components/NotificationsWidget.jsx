import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsWidget = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'drill_reminder',
      title: 'Fire Safety Drill Tomorrow',
      message: 'Mandatory fire evacuation drill scheduled for January 15th at 10:30 AM. Please be prepared to participate.',
      timestamp: '2025-01-13T10:40:55',
      isRead: false,
      priority: 'high',
      icon: 'Flame',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'New Badge Earned!',
      message: 'Congratulations! You have earned the "Earthquake Expert" badge for completing all earthquake safety modules.',
      timestamp: '2025-01-13T09:15:30',
      isRead: false,
      priority: 'medium',
      icon: 'Award',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 3,
      type: 'system_alert',
      title: 'Weather Alert - Heavy Rain Expected',
      message: 'Heavy rainfall predicted for your region. Review flood safety procedures and evacuation routes.',
      timestamp: '2025-01-13T08:30:00',
      isRead: true,
      priority: 'high',
      icon: 'CloudRain',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 4,
      type: 'module_update',
      title: 'New Learning Module Available',
      message: 'A new module on "Cyclone Preparedness" has been added to your learning path.',
      timestamp: '2025-01-12T16:45:00',
      isRead: true,
      priority: 'medium',
      icon: 'BookOpen',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 5,
      type: 'quiz_reminder',
      title: 'Pending Quiz: First Aid Basics',
      message: 'You have a pending quiz on First Aid Basics. Complete it before the deadline on January 20th.',
      timestamp: '2025-01-12T14:20:00',
      isRead: true,
      priority: 'medium',
      icon: 'Brain',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 6,
      type: 'maintenance',
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance on January 16th from 2:00 AM to 4:00 AM. Some features may be temporarily unavailable.',
      timestamp: '2025-01-11T18:00:00',
      isRead: true,
      priority: 'low',
      icon: 'Settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', count: notifications?.length },
    { id: 'unread', label: 'Unread', count: notifications?.filter(n => !n?.isRead)?.length },
    { id: 'high', label: 'Priority', count: notifications?.filter(n => n?.priority === 'high')?.length }
  ];

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications?.filter(n => !n?.isRead);
      case 'high':
        return notifications?.filter(n => n?.priority === 'high');
      default:
        return notifications;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-orange-500';
      case 'low': return 'border-l-gray-500';
      default: return 'border-l-gray-300';
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="bg-card border border-border rounded-xl shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-foreground" />
          <h2 className="font-heading font-bold text-xl text-foreground">
            Notifications
          </h2>
          {notifications?.filter(n => !n?.isRead)?.length > 0 && (
            <div className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">
              {notifications?.filter(n => !n?.isRead)?.length}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Settings">
            Settings
          </Button>
          <Button variant="ghost" size="sm" iconName="CheckCheck">
            Mark All Read
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-standard ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {tab?.label}
            {tab?.count > 0 && (
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/50 transition-standard border-l-4 ${getPriorityColor(notification?.priority)} ${
                  !notification?.isRead ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification?.bgColor}`}>
                    <Icon name={notification?.icon} size={18} className={notification?.color} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`font-medium text-sm ${
                        !notification?.isRead ? 'text-foreground font-semibold' : 'text-foreground'
                      }`}>
                        {notification?.title}
                        {!notification?.isRead && (
                          <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block" />
                        )}
                      </h4>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatTimeAgo(notification?.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {notification?.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          notification?.priority === 'high' ?'text-red-600 bg-red-100'
                            : notification?.priority === 'medium' ?'text-orange-600 bg-orange-100' :'text-gray-600 bg-gray-100'
                        }`}>
                          {notification?.priority?.charAt(0)?.toUpperCase() + notification?.priority?.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {!notification?.isRead && (
                          <Button variant="ghost" size="sm" iconName="Eye">
                            Mark Read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              No notifications
            </h3>
            <p className="text-muted-foreground text-sm">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      {filteredNotifications?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            fullWidth
          >
            View All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsWidget;