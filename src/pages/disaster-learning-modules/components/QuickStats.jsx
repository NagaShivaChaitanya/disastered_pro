import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Modules Completed',
      value: stats?.completedModules,
      total: stats?.totalModules,
      icon: 'CheckCircle',
      color: 'text-success bg-success/10'
    },
    {
      label: 'Hours Learned',
      value: stats?.hoursLearned,
      icon: 'Clock',
      color: 'text-primary bg-primary/10',
      suffix: 'hrs'
    },
    {
      label: 'Current Streak',
      value: stats?.currentStreak,
      icon: 'Flame',
      color: 'text-warning bg-warning/10',
      suffix: 'days'
    },
    {
      label: 'Points Earned',
      value: stats?.totalPoints?.toLocaleString('en-IN'),
      icon: 'Star',
      color: 'text-accent bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg shadow-card p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-heading font-bold text-foreground">
                  {stat?.value}
                </span>
                {stat?.suffix && (
                  <span className="text-sm text-muted-foreground">
                    {stat?.suffix}
                  </span>
                )}
                {stat?.total && (
                  <span className="text-sm text-muted-foreground">
                    / {stat?.total}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground truncate">
                {stat?.label}
              </p>
              
              {stat?.total && (
                <div className="w-full bg-muted rounded-full h-1 mt-2">
                  <div 
                    className="bg-success h-1 rounded-full transition-all duration-300"
                    style={{ width: `${(stat?.value / stat?.total) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;