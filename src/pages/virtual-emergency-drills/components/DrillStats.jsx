import React from 'react';
import Icon from '../../../components/AppIcon';

const DrillStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Drills',
      value: stats?.totalDrills,
      icon: 'Target',
      color: 'text-primary bg-primary/10'
    },
    {
      label: 'Completed',
      value: stats?.completedDrills,
      icon: 'CheckCircle',
      color: 'text-success bg-success/10'
    },
    {
      label: 'Average Score',
      value: `${stats?.averageScore}%`,
      icon: 'TrendingUp',
      color: 'text-warning bg-warning/10'
    },
    {
      label: 'Time Spent',
      value: `${stats?.totalTimeSpent}h`,
      icon: 'Clock',
      color: 'text-accent bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${item?.color}`}>
              <Icon name={item?.icon} size={20} />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">
                {item?.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {item?.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrillStats;