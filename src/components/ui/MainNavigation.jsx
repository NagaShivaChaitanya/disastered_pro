import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MainNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/student-dashboard',
      icon: 'LayoutDashboard',
      description: 'Your learning progress and overview'
    },
    {
      label: 'Learn',
      path: '/disaster-learning-modules',
      icon: 'BookOpen',
      description: 'Interactive disaster preparedness modules'
    },
    {
      label: 'Practice',
      path: '/virtual-emergency-drills',
      icon: 'Target',
      description: 'Virtual emergency drill simulations'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <nav className="bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex space-x-8">
            {navigationItems?.map((item) => {
              const isActive = isActivePath(item?.path);
              
              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`group flex items-center px-4 py-4 text-sm font-body font-medium border-b-2 transition-standard ${
                    isActive
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className="mr-2"
                  />
                  <span>{item?.label}</span>
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md shadow-modal opacity-0 group-hover:opacity-100 transition-standard pointer-events-none z-50 whitespace-nowrap">
                    {item?.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover rotate-45"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;