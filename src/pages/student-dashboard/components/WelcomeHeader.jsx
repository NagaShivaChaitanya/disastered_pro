import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName, userRole, currentTime }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Stay prepared, stay safe! 🛡️",
      "Knowledge is your best protection! 📚",
      "Every drill makes you stronger! 💪",
      "Safety first, always! 🚨",
      "Be the hero in your story! ⭐"
    ];
    return messages?.[Math.floor(Math.random() * messages?.length)];
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-6 mb-6 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="font-heading font-bold text-2xl lg:text-3xl mb-2">
            {getGreeting()}, {userName}! 👋
          </h1>
          <p className="text-primary-foreground/90 text-lg mb-1">
            {getMotivationalMessage()}
          </p>
          <p className="text-primary-foreground/75 text-sm">
            Role: {userRole} • Last login: {currentTime}
          </p>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mb-2">
              <Icon name="Calendar" size={24} color="white" />
            </div>
            <p className="text-xs text-primary-foreground/75">
              {new Date()?.toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short' 
              })}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mb-2">
              <Icon name="Clock" size={24} color="white" />
            </div>
            <p className="text-xs text-primary-foreground/75">
              {new Date()?.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;