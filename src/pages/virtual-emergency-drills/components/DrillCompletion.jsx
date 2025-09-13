import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DrillCompletion = ({ drill, results, onRetry, onContinue, onViewAnalytics }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return "Outstanding performance! You're well-prepared for emergencies.";
    if (score >= 80) return "Great job! You demonstrated good emergency response skills.";
    if (score >= 70) return "Good work! Review the areas for improvement and try again.";
    if (score >= 60) return "Fair performance. Consider reviewing the learning materials.";
    return "Keep practicing! Emergency preparedness requires continuous learning.";
  };

  const achievements = [
    {
      condition: results?.score >= 90,
      title: 'Emergency Expert',
      description: 'Scored 90% or higher',
      icon: 'Award'
    },
    {
      condition: results?.timeUsed <= drill?.duration * 30,
      title: 'Quick Responder',
      description: 'Completed in under 50% of allotted time',
      icon: 'Zap'
    },
    {
      condition: results?.score === 100,
      title: 'Perfect Score',
      description: 'Answered all questions correctly',
      icon: 'Star'
    }
  ];

  const earnedAchievements = achievements?.filter(achievement => achievement?.condition);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="p-6 border-b border-border text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            results?.score >= 70 ? 'bg-success/10' : 'bg-warning/10'
          }`}>
            <Icon 
              name={results?.score >= 70 ? "CheckCircle" : "AlertCircle"} 
              size={32} 
              className={results?.score >= 70 ? 'text-success' : 'text-warning'}
            />
          </div>
          
          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
            Drill Completed!
          </h1>
          
          <p className="text-muted-foreground">
            {drill?.title}
          </p>
        </div>

        {/* Results */}
        <div className="p-6 space-y-6">
          {/* Score */}
          <div className="text-center">
            <div className={`text-6xl font-heading font-bold mb-2 ${getScoreColor(results?.score)}`}>
              {results?.score}%
            </div>
            <p className="text-muted-foreground mb-4">
              {getScoreMessage(results?.score)}
            </p>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Icon name="Clock" size={20} className="text-muted-foreground mx-auto mb-2" />
              <div className="font-heading font-semibold text-foreground">
                {Math.floor(results?.timeUsed / 60)}:{(results?.timeUsed % 60)?.toString()?.padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground">Time Used</div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Icon name="Target" size={20} className="text-muted-foreground mx-auto mb-2" />
              <div className="font-heading font-semibold text-foreground">
                {Math.round((results?.score / 100) * drill?.steps?.length)}/{drill?.steps?.length}
              </div>
              <div className="text-xs text-muted-foreground">Correct Answers</div>
            </div>
          </div>

          {/* Achievements */}
          {earnedAchievements?.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                Achievements Unlocked
              </h3>
              <div className="space-y-2">
                {earnedAchievements?.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <Icon name={achievement?.icon} size={20} className="text-success" />
                    <div>
                      <div className="font-body font-medium text-foreground">
                        {achievement?.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement?.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Learning Points */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
              Key Learning Points
            </h3>
            <div className="space-y-2">
              {drill?.learningPoints?.map((point, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              )) || [
                "Always prioritize personal safety first",
                "Follow established evacuation procedures",
                "Communicate clearly with emergency responders",
                "Stay calm and help others when safe to do so"
              ]?.map((point, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={onRetry}
              className="flex-1"
            >
              Retry Drill
            </Button>
            
            <Button
              variant="outline"
              iconName="BarChart3"
              iconPosition="left"
              onClick={onViewAnalytics}
              className="flex-1"
            >
              View Analytics
            </Button>
            
            <Button
              variant="default"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={onContinue}
              className="flex-1"
            >
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillCompletion;