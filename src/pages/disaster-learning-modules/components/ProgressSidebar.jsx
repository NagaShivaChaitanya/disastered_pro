import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressSidebar = ({ userProgress, achievements, onViewAllBadges }) => {
  const getStreakIcon = (streak) => {
    if (streak >= 30) return { icon: 'Flame', color: 'text-error' };
    if (streak >= 14) return { icon: 'Zap', color: 'text-warning' };
    if (streak >= 7) return { icon: 'Star', color: 'text-accent' };
    return { icon: 'Circle', color: 'text-muted-foreground' };
  };

  const streakInfo = getStreakIcon(userProgress?.currentStreak);

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6 sticky top-6">
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg text-foreground">Your Progress</h3>
          <span className="text-2xl font-heading font-bold text-primary">
            {userProgress?.overallCompletion}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 mb-2">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${userProgress?.overallCompletion}%` }}
          />
        </div>
        
        <p className="text-xs text-muted-foreground">
          {userProgress?.completedModules} of {userProgress?.totalModules} modules completed
        </p>
      </div>
      {/* Current Streak */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name={streakInfo?.icon} size={20} className={streakInfo?.color} />
          <span className="font-heading font-semibold text-foreground">Learning Streak</span>
        </div>
        <div className="text-2xl font-heading font-bold text-foreground mb-1">
          {userProgress?.currentStreak} days
        </div>
        <p className="text-xs text-muted-foreground">
          Keep it up! Your longest streak: {userProgress?.longestStreak} days
        </p>
      </div>
      {/* Points & Level */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body font-medium text-foreground">Total Points</span>
          <div className="flex items-center space-x-1 text-warning">
            <Icon name="Star" size={16} />
            <span className="font-heading font-bold">{userProgress?.totalPoints?.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="font-body font-medium text-foreground">Current Level</span>
          <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-caption font-medium">
            Level {userProgress?.currentLevel}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${userProgress?.levelProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {userProgress?.pointsToNextLevel} points to next level
        </p>
      </div>
      {/* Recent Achievements */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-heading font-semibold text-foreground">Recent Badges</h4>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            onClick={onViewAllBadges}
            className="text-xs"
          >
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {achievements?.recentBadges?.slice(0, 6)?.map((badge, index) => (
            <div key={index} className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${badge?.color}`}>
                <Icon name={badge?.icon} size={16} color="white" />
              </div>
              <span className="text-xs font-caption text-center text-foreground line-clamp-2">
                {badge?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Weekly Goal */}
      <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Target" size={18} className="text-accent" />
          <span className="font-heading font-semibold text-foreground">Weekly Goal</span>
        </div>
        <div className="text-lg font-heading font-bold text-foreground mb-1">
          {userProgress?.weeklyProgress} / {userProgress?.weeklyGoal} modules
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${(userProgress?.weeklyProgress / userProgress?.weeklyGoal) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {userProgress?.weeklyGoal - userProgress?.weeklyProgress} modules remaining this week
        </p>
      </div>
      {/* Motivational Message */}
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="MessageCircle" size={16} className="text-primary mt-1" />
          <div>
            <p className="text-sm font-body text-foreground mb-1">
              {userProgress?.motivationalMessage}
            </p>
            <p className="text-xs text-muted-foreground">
              - DisasterEd Pro Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;