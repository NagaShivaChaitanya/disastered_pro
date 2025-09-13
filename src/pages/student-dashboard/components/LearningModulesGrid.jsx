import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningModulesGrid = () => {
  const learningModules = [
    {
      id: 1,
      title: "Earthquake Safety",
      description: "Learn how to stay safe during earthquakes with interactive simulations",
      icon: "Mountain",
      progress: 85,
      difficulty: "Beginner",
      duration: "15 mins",
      isCompleted: false,
      isRegionalPriority: true,
      color: "bg-orange-500",
      totalLessons: 8,
      completedLessons: 7
    },
    {
      id: 2,
      title: "Flood Preparedness",
      description: "Understand flood risks and emergency response procedures",
      icon: "Waves",
      progress: 60,
      difficulty: "Intermediate",
      duration: "20 mins",
      isCompleted: false,
      isRegionalPriority: true,
      color: "bg-blue-500",
      totalLessons: 10,
      completedLessons: 6
    },
    {
      id: 3,
      title: "Fire Safety",
      description: "Master fire prevention and evacuation techniques",
      icon: "Flame",
      progress: 100,
      difficulty: "Beginner",
      duration: "12 mins",
      isCompleted: true,
      isRegionalPriority: false,
      color: "bg-red-500",
      totalLessons: 6,
      completedLessons: 6
    },
    {
      id: 4,
      title: "Cyclone Awareness",
      description: "Prepare for cyclones and severe weather conditions",
      icon: "Wind",
      progress: 30,
      difficulty: "Advanced",
      duration: "25 mins",
      isCompleted: false,
      isRegionalPriority: true,
      color: "bg-purple-500",
      totalLessons: 12,
      completedLessons: 4
    },
    {
      id: 5,
      title: "First Aid Basics",
      description: "Essential first aid skills for emergency situations",
      icon: "Heart",
      progress: 45,
      difficulty: "Beginner",
      duration: "18 mins",
      isCompleted: false,
      isRegionalPriority: false,
      color: "bg-green-500",
      totalLessons: 9,
      completedLessons: 4
    },
    {
      id: 6,
      title: "Emergency Communication",
      description: "Learn effective communication during disasters",
      icon: "MessageCircle",
      progress: 0,
      difficulty: "Intermediate",
      duration: "22 mins",
      isCompleted: false,
      isRegionalPriority: false,
      color: "bg-indigo-500",
      totalLessons: 11,
      completedLessons: 0
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-orange-600 bg-orange-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
            Learning Modules
          </h2>
          <p className="text-muted-foreground">
            Interactive disaster preparedness courses tailored for your region
          </p>
        </div>
        <Link to="/disaster-learning-modules">
          <Button variant="outline" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningModules?.map((module) => (
          <div
            key={module.id}
            className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-lg transition-standard group cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-standard`}>
                <Icon name={module.icon} size={24} color="white" />
              </div>
              
              <div className="flex items-center space-x-2">
                {module.isRegionalPriority && (
                  <div className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Priority
                  </div>
                )}
                {module.isCompleted && (
                  <div className="bg-success text-success-foreground rounded-full p-1">
                    <Icon name="Check" size={14} />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              {module.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {module.description}
            </p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Progress: {module.completedLessons}/{module.totalLessons} lessons
                </span>
                <span className="text-sm font-medium text-foreground">
                  {module.progress}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    module.isCompleted ? 'bg-success' : 'bg-primary'
                  }`}
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span className="text-xs">{module.duration}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Link to="/disaster-learning-modules" className="block">
              <Button
                variant={module.isCompleted ? "outline" : "default"}
                size="sm"
                iconName={module.isCompleted ? "RotateCcw" : "Play"}
                iconPosition="left"
                fullWidth
              >
                {module.isCompleted ? "Review" : "Continue Learning"}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningModulesGrid;