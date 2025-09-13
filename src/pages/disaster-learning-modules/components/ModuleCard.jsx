import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ModuleCard = ({ module, onStartModule, onContinueModule }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card hover:shadow-modal transition-standard overflow-hidden">
      {/* Module Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={module.imageUrl}
          alt={module.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getDifficultyColor(module.difficulty)}`}>
            {module.difficulty?.charAt(0)?.toUpperCase() + module.difficulty?.slice(1)}
          </span>
        </div>
        {module.isNew && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-caption font-medium">
              New
            </span>
          </div>
        )}
      </div>
      {/* Module Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2">
            {module.title}
          </h3>
          <div className="flex items-center space-x-1 text-warning ml-2">
            <Icon name="Star" size={16} />
            <span className="text-sm font-body font-medium">{module.points}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {module.description}
        </p>

        {/* Module Stats */}
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{module.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{module.enrolled} enrolled</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={14} />
            <span>{module.lessons} lessons</span>
          </div>
        </div>

        {/* Progress Bar */}
        {module.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-caption text-muted-foreground">Progress</span>
              <span className="text-xs font-caption font-medium text-foreground">{module.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(module.progress)}`}
                style={{ width: `${module.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {module.prerequisites && module.prerequisites?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-1 mb-2">
              <Icon name="Lock" size={14} className="text-muted-foreground" />
              <span className="text-xs font-caption text-muted-foreground">Prerequisites</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {module.prerequisites?.map((prereq, index) => (
                <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between">
          {module.progress > 0 ? (
            <Button
              variant="outline"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={() => onContinueModule(module)}
              className="flex-1"
            >
              Continue Learning
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={() => onStartModule(module)}
              className="flex-1"
              disabled={module.isLocked}
            >
              {module.isLocked ? 'Locked' : 'Start Module'}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            iconName="Bookmark"
            className="ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;