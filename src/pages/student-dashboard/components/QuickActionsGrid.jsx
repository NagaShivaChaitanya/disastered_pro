import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsGrid = () => {
  const quickActions = [
    {
      id: 1,
      title: "Virtual Emergency Drill",
      description: "Practice emergency scenarios in a safe environment",
      icon: "Target",
      color: "bg-blue-500",
      route: "/virtual-emergency-drills",
      isHighPriority: true,
      stats: "5 drills available",
      buttonText: "Start Drill"
    },
    {
      id: 2,
      title: "Survival Games Hub",
      description: "Master disaster management through immersive gaming",
      icon: "Gamepad2",
      color: "bg-orange-500",
      route: "/survival-games-hub",
      isHighPriority: true,
      stats: "12 games • VR supported",
      buttonText: "Play Games"
    },
    {
      id: 3,
      title: "Safety Quiz",
      description: "Test your disaster preparedness knowledge",
      icon: "Brain",
      color: "bg-green-500",
      route: "/disaster-learning-modules",
      isHighPriority: false,
      stats: "12 quizzes pending",
      buttonText: "Take Quiz"
    },
    {
      id: 4,
      title: "Emergency Contacts",
      description: "Quick access to critical emergency numbers",
      icon: "Phone",
      color: "bg-red-500",
      route: "/emergency-contacts",
      isHighPriority: true,
      stats: "24/7 available",
      buttonText: "View Contacts"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Fire Safety Drill",
      date: "2025-01-15",
      time: "10:30 AM",
      type: "Mandatory",
      icon: "Flame"
    },
    {
      id: 2,
      title: "VR Earthquake Simulation",
      date: "2025-01-18",
      time: "2:00 PM",
      type: "VR Experience",
      icon: "Smartphone"
    },
    {
      id: 3,
      title: "First Aid Workshop",
      date: "2025-01-22",
      time: "11:00 AM",
      type: "Recommended",
      icon: "Heart"
    }
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Mandatory': return 'text-red-600 bg-red-100';
      case 'Optional': return 'text-blue-600 bg-blue-100';
      case 'Recommended': return 'text-orange-600 bg-orange-100';
      case 'VR Experience': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Quick Actions */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-2xl text-foreground">
            Quick Actions
          </h2>
          <div className="text-sm text-muted-foreground">
            Ready to learn? Start here! 🚀
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <div
              key={action?.id}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-lg transition-standard group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-standard`}>
                  <Icon name={action?.icon} size={24} color="white" />
                </div>
                {action?.isHighPriority && (
                  <div className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Priority
                  </div>
                )}
              </div>

              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {action?.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {action?.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">
                  {action?.stats}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="ArrowRight" size={14} className="text-primary" />
                </div>
              </div>

              <Link to={action?.route}>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Play"
                  iconPosition="left"
                  fullWidth
                >
                  {action?.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* VR Gaming Section */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-xl mb-2">
                🥽 VR Gaming Experience
              </h3>
              <p className="text-purple-100">
                Immerse yourself in realistic disaster scenarios with Virtual Reality
              </p>
            </div>
            <Icon name="Smartphone" size={48} className="text-purple-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Mountain" size={20} />
                <h4 className="font-semibold">Earthquake VR</h4>
              </div>
              <p className="text-sm text-purple-100 mb-3">
                Experience realistic earthquake scenarios
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">500 points</span>
                <Link to="/survival-games-hub">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                    className="bg-white text-purple-600 hover:bg-purple-50"
                  >
                    Play VR
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Flame" size={20} />
                <h4 className="font-semibold">Fire Escape VR</h4>
              </div>
              <p className="text-sm text-purple-100 mb-3">
                Master fire evacuation in VR
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">750 points</span>
                <Link to="/survival-games-hub">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                    className="bg-white text-purple-600 hover:bg-purple-50"
                  >
                    Play VR
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link to="/survival-games-hub">
              <Button
                variant="outline"
                iconName="Gamepad2"
                iconPosition="left"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                View All Games
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Upcoming Events */}
      <div className="lg:col-span-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-2xl text-foreground">
            Upcoming Events
          </h2>
          <Icon name="Calendar" size={20} className="text-muted-foreground" />
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <div className="space-y-4">
            {upcomingEvents?.map((event) => (
              <div
                key={event?.id}
                className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-standard"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={event?.icon} size={18} className="text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {event?.title}
                    </h4>
                    <div className={`text-xs px-2 py-1 rounded-full font-medium ${getEventTypeColor(event?.type)}`}>
                      {event?.type}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    <span>
                      {new Date(event.date)?.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </span>
                    <Icon name="Clock" size={12} />
                    <span>{event?.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <Link to="/virtual-emergency-drills">
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                fullWidth
              >
                View All Events
              </Button>
            </Link>
          </div>
        </div>

        {/* Gamification Panel */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Trophy" size={20} className="text-green-600" />
            <h3 className="font-heading font-semibold text-green-800">
              Your Progress
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Total Points</span>
              <span className="font-bold text-green-800">2,840</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Games Completed</span>
              <span className="font-bold text-green-800">5/12</span>
            </div>
            
            <div className="w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>
            
            <div className="text-xs text-green-600 text-center">
              Complete 2 more games to unlock VR Multiplayer!
            </div>
          </div>
        </div>

        {/* Emergency Quick Access */}
        <div className="mt-6 bg-destructive/10 border border-destructive/20 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="AlertTriangle" size={18} className="text-destructive" />
            <h3 className="font-heading font-semibold text-destructive">
              Emergency Access
            </h3>
          </div>
          
          <p className="text-destructive/80 text-sm mb-4">
            Quick access to emergency contacts and procedures
          </p>
          
          <Link to="/emergency-contacts">
            <Button
              variant="destructive"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              fullWidth
              className="shadow-emergency"
            >
              Emergency Contacts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsGrid;