import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-card flex items-center justify-center">
            <Icon name="Shield" size={32} color="white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={14} color="white" />
          </div>
        </div>
      </div>
      {/* Title and Tagline */}
      <h1 className="font-heading font-bold text-4xl text-foreground mb-2">
        DisasterEd Pro
      </h1>
      <p className="text-lg text-muted-foreground mb-1">
        Comprehensive Disaster Preparedness Education
      </p>
      <p className="text-sm text-muted-foreground">
        Empowering educational institutions across India with safety knowledge
      </p>
      {/* Status Indicator */}
      <div className="flex items-center justify-center space-x-2 mt-4 text-sm">
        <div className="flex items-center space-x-1 text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>System Online</span>
        </div>
        <span className="text-muted-foreground">•</span>
        <div className="text-muted-foreground">
          Last updated: {new Date()?.toLocaleDateString('en-IN')}
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;