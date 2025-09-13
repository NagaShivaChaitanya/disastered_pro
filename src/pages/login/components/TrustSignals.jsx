import React from 'react';
import Icon from '../../../components/AppIcon';


const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      name: 'Government of Punjab',
      description: 'Officially endorsed by Punjab Education Department',
      icon: 'Shield',
      verified: true
    },
    {
      id: 2,
      name: 'NDMA Compliance',
      description: 'Certified by National Disaster Management Authority',
      icon: 'CheckCircle',
      verified: true
    },
    {
      id: 3,
      name: 'Educational Standards',
      description: 'Meets national educational safety standards',
      icon: 'Award',
      verified: true
    }
  ];

  const statistics = [
    { label: 'Schools Protected', value: '2,500+', icon: 'School' },
    { label: 'Students Trained', value: '5,00,000+', icon: 'Users' },
    { label: 'Emergency Drills', value: '10,000+', icon: 'Target' },
    { label: 'Success Rate', value: '98.5%', icon: 'TrendingUp' }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="ShieldCheck" size={20} className="text-success" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Trusted & Certified
          </h3>
        </div>
        
        <div className="space-y-3">
          {trustBadges?.map((badge) => (
            <div key={badge?.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name={badge?.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="font-body font-medium text-sm text-foreground">
                    {badge?.name}
                  </p>
                  {badge?.verified && (
                    <Icon name="Verified" size={14} className="text-success" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {badge?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Impact Statistics
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {statistics?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name={stat?.icon} size={18} className="text-primary" />
              </div>
              <div className="font-heading font-bold text-lg text-foreground">
                {stat?.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Government Partnership */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 border border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="Building2" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-body font-medium text-sm text-foreground">
              Official Partner
            </p>
            <p className="text-xs text-muted-foreground">
              Ministry of Education & NDMA, Government of India
            </p>
          </div>
          <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;