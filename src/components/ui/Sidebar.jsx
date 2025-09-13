import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/student-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and progress tracking'
    },
    {
      label: 'Learning Modules',
      path: '/disaster-learning-modules',
      icon: 'BookOpen',
      description: 'Interactive disaster education'
    },
    {
      label: 'Virtual Drills',
      path: '/virtual-emergency-drills',
      icon: 'Target',
      description: 'Practice emergency scenarios'
    },
    {
      label: 'Emergency Contacts',
      path: '/emergency-contacts',
      icon: 'Phone',
      description: 'Critical communication resources',
      isEmergency: true
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleEmergencyMode = () => {
    setIsEmergencyMode(!isEmergencyMode);
  };

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border shadow-card z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Navigation
            </h2>
          )}
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              onClick={onToggle}
              className="h-8 w-8"
            />
          )}
        </div>

        {/* Emergency Mode Toggle */}
        <div className="p-4 border-b border-border">
          <Button
            variant={isEmergencyMode ? "destructive" : "outline"}
            size={isCollapsed ? "icon" : "sm"}
            iconName="AlertTriangle"
            iconPosition={isCollapsed ? undefined : "left"}
            onClick={handleEmergencyMode}
            className={`w-full ${isEmergencyMode ? 'shadow-emergency' : ''}`}
          >
            {!isCollapsed && (isEmergencyMode ? 'Exit Emergency' : 'Emergency Mode')}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => {
            const isActive = isActivePath(item?.path);
            const isEmergencyItem = item?.isEmergency;
            
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-body font-medium transition-standard group ${
                  isActive
                    ? isEmergencyItem
                      ? 'bg-destructive text-destructive-foreground shadow-emergency'
                      : 'bg-primary text-primary-foreground'
                    : isEmergencyItem
                      ? 'text-destructive hover:bg-destructive/10 hover:text-destructive' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                } ${isEmergencyMode && isEmergencyItem ? 'animate-pulse' : ''}`}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={`flex-shrink-0 ${isEmergencyItem && isEmergencyMode ? 'animate-pulse' : ''}`}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item?.label}</div>
                    {item?.description && (
                      <div className="text-xs opacity-75 truncate">
                        {item?.description}
                      </div>
                    )}
                  </div>
                )}
                {!isCollapsed && isActive && (
                  <div className="w-2 h-2 bg-current rounded-full flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border space-y-2">
            <div className="text-xs font-caption font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Quick Actions
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              iconPosition="left"
              className="w-full justify-start"
            >
              Help & Support
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              className="w-full justify-start"
            >
              Settings
            </Button>
          </div>
        )}

        {/* Emergency Status Indicator */}
        {isEmergencyMode && (
          <div className={`p-4 bg-destructive/10 border-t border-destructive/20 ${
            isCollapsed ? 'px-2' : ''
          }`}>
            <div className="flex items-center space-x-2 text-destructive">
              <Icon name="AlertTriangle" size={16} className="animate-pulse" />
              {!isCollapsed && (
                <span className="text-xs font-caption font-medium">
                  Emergency Mode Active
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;