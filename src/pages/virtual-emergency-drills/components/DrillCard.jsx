import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DrillCard = ({ drill, onStartDrill }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-success bg-success/10 border-success/20';
      case 'intermediate':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'advanced':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getDisasterIcon = (type) => {
    const iconMap = {
      'earthquake': 'Zap',
      'fire': 'Flame',
      'flood': 'Waves',
      'cyclone': 'Wind',
      'tsunami': 'Waves',
      'landslide': 'Mountain',
      'chemical': 'Beaker',
      'medical': 'Heart'
    };
    return iconMap?.[type?.toLowerCase()] || 'AlertTriangle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-standard">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${drill?.isCompleted ? 'bg-success/10' : 'bg-primary/10'}`}>
            <Icon 
              name={getDisasterIcon(drill?.type)} 
              size={24} 
              className={drill?.isCompleted ? 'text-success' : 'text-primary'}
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {drill?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {drill?.type} • {drill?.duration} minutes
            </p>
          </div>
        </div>
        
        {drill?.isCompleted && (
          <div className="flex items-center space-x-1 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-xs font-caption">Completed</span>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {drill?.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className={`px-2 py-1 rounded-md border text-xs font-caption font-medium ${getDifficultyColor(drill?.difficulty)}`}>
            {drill?.difficulty}
          </div>
          
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Users" size={14} />
            <span className="text-xs">{drill?.participants} participants</span>
          </div>
          
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Star" size={14} />
            <span className="text-xs">{drill?.rating}/5</span>
          </div>
        </div>
      </div>
      {drill?.prerequisites && drill?.prerequisites?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-caption text-muted-foreground mb-2">Prerequisites:</p>
          <div className="flex flex-wrap gap-1">
            {drill?.prerequisites?.map((prereq, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {prereq}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {drill?.isCompleted && (
            <div className="text-xs text-success">
              Score: {drill?.lastScore}%
            </div>
          )}
          {drill?.attempts > 0 && (
            <div className="text-xs text-muted-foreground">
              Attempts: {drill?.attempts}
            </div>
          )}
        </div>
        
        <Button
          variant={drill?.isCompleted ? "outline" : "default"}
          size="sm"
          iconName={drill?.isCompleted ? "RotateCcw" : "Play"}
          iconPosition="left"
          onClick={() => onStartDrill(drill)}
          disabled={drill?.isLocked}
        >
          {drill?.isCompleted ? 'Retry' : 'Start Drill'}
        </Button>
      </div>
    </div>
  );
};

export default DrillCard;