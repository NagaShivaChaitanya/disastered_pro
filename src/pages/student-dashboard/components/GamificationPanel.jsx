import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GamificationPanel = () => {
  const userStats = {
    totalPoints: 2450,
    currentLevel: 8,
    nextLevelPoints: 2800,
    leaderboardPosition: 12,
    totalParticipants: 156,
    streakDays: 7,
    completedChallenges: 23
  };

  const recentBadges = [
    {
      id: 1,
      name: "Earthquake Expert",
      description: "Completed all earthquake safety modules",
      icon: "Award",
      color: "bg-orange-500",
      earnedDate: "2025-01-10",
      isNew: true
    },
    {
      id: 2,
      name: "Drill Master",
      description: "Participated in 10 virtual emergency drills",
      icon: "Target",
      color: "bg-blue-500",
      earnedDate: "2025-01-08",
      isNew: false
    },
    {
      id: 3,
      name: "Safety Champion",
      description: "Achieved 100% in safety quiz",
      icon: "Shield",
      color: "bg-green-500",
      earnedDate: "2025-01-05",
      isNew: false
    },
    {
      id: 4,
      name: "Team Player",
      description: "Helped 5 classmates in group activities",
      icon: "Users",
      color: "bg-purple-500",
      earnedDate: "2025-01-03",
      isNew: false
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', points: 45 },
    { day: 'Tue', points: 32 },
    { day: 'Wed', points: 58 },
    { day: 'Thu', points: 41 },
    { day: 'Fri', points: 67 },
    { day: 'Sat', points: 23 },
    { day: 'Sun', points: 39 }
  ];

  const progressPercentage = ((userStats?.totalPoints - (userStats?.currentLevel - 1) * 350) / 350) * 100;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-2xl text-foreground">
          Your Progress
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-success" />
          <span className="text-success font-medium text-sm">+{weeklyProgress?.[weeklyProgress?.length - 1]?.points} today</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Points and Level Section */}
        <div className="lg:col-span-1">
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-primary"
                  strokeDasharray={`${progressPercentage * 3.14} 314`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-heading font-bold text-2xl text-foreground">
                    {userStats?.currentLevel}
                  </div>
                  <div className="text-xs text-muted-foreground">Level</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-heading font-bold text-3xl text-primary">
                {userStats?.totalPoints?.toLocaleString('en-IN')}
              </div>
              <div className="text-muted-foreground text-sm">Total Points</div>
              <div className="text-xs text-muted-foreground">
                {userStats?.nextLevelPoints - userStats?.totalPoints} points to next level
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-heading font-bold text-xl text-foreground">
                #{userStats?.leaderboardPosition}
              </div>
              <div className="text-xs text-muted-foreground">Rank</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-heading font-bold text-xl text-foreground">
                {userStats?.streakDays}
              </div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="lg:col-span-1">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            Weekly Activity
          </h3>
          <div className="space-y-3">
            {weeklyProgress?.map((day, index) => (
              <div key={day?.day} className="flex items-center space-x-3">
                <div className="w-8 text-xs text-muted-foreground font-medium">
                  {day?.day}
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(day?.points / 70) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-xs text-foreground font-medium text-right">
                  {day?.points}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Flame" size={16} className="text-success" />
              <span className="text-success text-sm font-medium">
                {userStats?.streakDays} day learning streak! 🔥
              </span>
            </div>
          </div>
        </div>

        {/* Recent Badges */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Recent Badges
            </h3>
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentBadges?.slice(0, 4)?.map((badge) => (
              <div
                key={badge?.id}
                className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-standard"
              >
                <div className={`w-10 h-10 ${badge?.color} rounded-full flex items-center justify-center relative`}>
                  <Icon name={badge?.icon} size={18} color="white" />
                  {badge?.isNew && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground">
                    {badge?.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {badge?.description}
                  </div>
                </div>
                {badge?.isNew && (
                  <div className="text-xs text-secondary font-medium">New!</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" iconName="Trophy" iconPosition="left">
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;