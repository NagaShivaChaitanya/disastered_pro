import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
    { label: 'Learn', path: '/disaster-learning-modules', icon: 'BookOpen' },
    { label: 'Practice', path: '/virtual-emergency-drills', icon: 'Target' },
    { label: 'Emergency', path: '/emergency-contacts', icon: 'Phone', isEmergency: true }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-card">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <Link to="/student-dashboard" className="flex items-center space-x-2 mr-8">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Shield" size={20} color="white" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">
            DisasterEd Pro
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 flex-1">
          {navigationItems?.slice(0, 3)?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-standard ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Emergency Contact Button - Desktop */}
        <div className="hidden md:flex items-center ml-auto">
          <Link to="/emergency-contacts">
            <Button
              variant="destructive"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              className="shadow-emergency animate-pulse"
            >
              Emergency
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto flex items-center space-x-2">
          {/* Emergency Button - Mobile */}
          <Link to="/emergency-contacts">
            <Button
              variant="destructive"
              size="icon"
              iconName="Phone"
              className="shadow-emergency"
            />
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            onClick={toggleMobileMenu}
          />
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.slice(0, 3)?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-body font-medium transition-standard ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            {/* Emergency Contact - Mobile Menu */}
            <Link
              to="/emergency-contacts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-body font-medium bg-destructive text-destructive-foreground shadow-emergency"
            >
              <Icon name="Phone" size={18} />
              <span>Emergency Contacts</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;