import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTrackingSection = () => {
  const progressData = {
    overallProgress: 68,
    modulesCompleted: 12,
    totalModules: 18,
    quizzesPassed: 8,
    totalQuizzes: 12,
    drillsParticipated: 15,
    totalDrills: 20,
    averageScore: 87,
    timeSpentLearning: 145, // in minutes
    certificatesEarned: 3
  };

  const recentActivity = [
    {
      id: 1,
      type: "module_completed",
      title: "Completed Earthquake Safety Module",
      description: "Scored 92% in final assessment",
      timestamp: "2025-01-13T09:30:00",
      icon: "BookOpen",
      color: "text-green-600"
    },
    {
      id: 2,
      type: "drill_participated",
      title: "Participated in Fire Evacuation Drill",
      description: "Response time: 2 minutes 15 seconds",
      timestamp: "2025-01-12T14:45:00",
      icon: "Target",
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "quiz_completed",
      title: "Passed Flood Safety Quiz",
      description: "Score: 85% (8/10 correct)",
      timestamp: "2025-01-11T16:20:00",
      icon: "Brain",
      color: "text-purple-600"
    },
    {
      id: 4,
      type: "badge_earned",
      title: "Earned Safety Champion Badge",
      description: "For consistent high performance",
      timestamp: "2025-01-10T11:00:00",
      icon: "Award",
      color: "text-orange-600"
    }
  ];

  const skillsProgress = [
    { skill: "Earthquake Preparedness", level: 85, maxLevel: 100 },
    { skill: "Fire Safety", level: 92, maxLevel: 100 },
    { skill: "Flood Response", level: 78, maxLevel: 100 },
    { skill: "First Aid", level: 65, maxLevel: 100 },
    { skill: "Emergency Communication", level: 45, maxLevel: 100 }
  ];

  const getSkillColor = (level) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Overall Progress */}
      <div className="lg:col-span-1">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
          Progress Overview
        </h2>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          {/* Circular Progress */}
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto">
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
                  strokeDasharray={`${progressData?.overallProgress * 3.14} 314`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-heading font-bold text-3xl text-foreground">
                    {progressData?.overallProgress}%
                  </div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-heading font-bold text-xl text-foreground">
                {progressData?.modulesCompleted}/{progressData?.totalModules}
              </div>
              <div className="text-xs text-muted-foreground">Modules</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-heading font-bold text-xl text-foreground">
                {progressData?.averageScore}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Score</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-heading font-bold text-xl text-foreground">
                {progressData?.drillsParticipated}
              </div>
              <div className="text-xs text-muted-foreground">Drills Done</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-heading font-bold text-xl text-foreground">
                {Math.floor(progressData?.timeSpentLearning / 60)}h
              </div>
              <div className="text-xs text-muted-foreground">Time Spent</div>
            </div>
          </div>

          <Button variant="outline" size="sm" iconName="TrendingUp" iconPosition="left" fullWidth>
            View Detailed Report
          </Button>
        </div>
      </div>
      {/* Skills Progress */}
      <div className="lg:col-span-1">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
          Skills Development
        </h2>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <div className="space-y-4">
            {skillsProgress?.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {skill?.skill}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {skill?.level}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getSkillColor(skill?.level)}`}
                    style={{ width: `${skill?.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-primary font-medium text-sm">Next Goal</span>
            </div>
            <p className="text-primary/80 text-sm">
              Complete 3 more modules to unlock Advanced Certification
            </p>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="lg:col-span-1">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
          Recent Activity
        </h2>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <div className="space-y-4">
            {recentActivity?.map((activity) => (
              <div
                key={activity?.id}
                className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={activity?.icon} size={16} className={activity?.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground mb-1">
                    {activity?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-1">
                    {activity?.description}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              iconName="History"
              iconPosition="left"
              fullWidth
            >
              View All Activity
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackingSection;