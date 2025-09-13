import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DrillSimulation = ({ drill, onComplete, onExit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Mock video data for each drill step
  const stepVideos = {
    0: {
      title: "Emergency Response Introduction",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo video
      duration: "2:30",
      description: "Watch this introductory video to understand the scenario"
    },
    1: {
      title: "Post-Emergency Actions",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo video
      duration: "3:15",
      description: "Learn about actions to take after the immediate danger has passed"
    }
  };

  useEffect(() => {
    if (!isPaused && !showVideo && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoChoice();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPaused, showVideo, timeRemaining]);

  const handleAutoChoice = () => {
    // Auto-select the first choice if time runs out
    const currentStepData = drill?.steps?.[currentStep];
    if (currentStepData?.choices?.length > 0) {
      handleChoiceSelect(currentStepData?.choices?.[0]);
    }
  };

  const handleChoiceSelect = (choice) => {
    const newChoices = [...userChoices, {
      stepIndex: currentStep,
      selectedChoice: choice,
      timeUsed: 30 - timeRemaining,
      isCorrect: choice?.isCorrect
    }];
    
    setUserChoices(newChoices);

    if (currentStep < drill?.steps?.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeRemaining(30);
    } else {
      // Drill completed
      const correctChoices = newChoices?.filter(choice => choice?.isCorrect)?.length;
      const totalChoices = newChoices?.length;
      const accuracy = (correctChoices / totalChoices) * 100;
      const averageTime = newChoices?.reduce((sum, choice) => sum + choice?.timeUsed, 0) / totalChoices;

      onComplete({
        accuracy,
        correctChoices,
        totalChoices,
        averageTime,
        totalTime: drill?.duration,
        points: Math.round(accuracy * 10 + (30 - averageTime) * 5)
      });
    }
  };

  const handleWatchVideo = () => {
    const video = stepVideos?.[currentStep];
    if (video) {
      setCurrentVideo(video);
      setShowVideo(true);
      setIsPaused(true);
    }
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setCurrentVideo(null);
    setIsPaused(false);
  };

  const currentStepData = drill?.steps?.[currentStep];
  
  if (!currentStepData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-destructive mx-auto mb-4" />
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">
            Drill Data Not Available
          </h2>
          <Button onClick={onExit} variant="outline">
            Return to Drills
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Video Modal */}
      {showVideo && currentVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  {currentVideo?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Duration: {currentVideo?.duration} • {currentVideo?.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={handleCloseVideo}
              />
            </div>
            
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <iframe
                width="100%"
                height="100%"
                src={currentVideo?.url}
                title={currentVideo?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="primary"
                iconName="CheckCircle"
                iconPosition="left"
                onClick={handleCloseVideo}
              >
                Continue Drill
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Drill Header */}
      <div className="bg-card border-b border-border shadow-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={onExit}
                className="text-muted-foreground hover:text-foreground"
              />
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">
                  {drill?.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {drill?.steps?.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Timer */}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                timeRemaining <= 10 ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name="Clock" size={16} />
                <span className="font-mono font-bold">
                  {String(Math.floor(timeRemaining / 60))?.padStart(2, '0')}:
                  {String(timeRemaining % 60)?.padStart(2, '0')}
                </span>
              </div>

              {/* Pause/Resume */}
              <Button
                variant="ghost"
                size="icon"
                iconName={isPaused ? "Play" : "Pause"}
                onClick={() => setIsPaused(!isPaused)}
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{currentStep + 1}/{drill?.steps?.length}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / drill?.steps?.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Simulation Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scenario Image/Video */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
              {currentStepData?.image ? (
                <img
                  src={currentStepData?.image}
                  alt={currentStepData?.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Icon name="Image" size={48} className="text-muted-foreground" />
                </div>
              )}
              
              {/* Video button overlay */}
              {stepVideos?.[currentStep] && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    iconName="Play"
                    iconPosition="left"
                    onClick={handleWatchVideo}
                    className="bg-white text-black hover:bg-white/90"
                  >
                    Watch Training Video
                  </Button>
                </div>
              )}
            </div>

            {/* Additional Video Info */}
            {stepVideos?.[currentStep] && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="PlayCircle" size={16} className="text-blue-600" />
                  <h4 className="font-medium text-blue-800">Training Video Available</h4>
                </div>
                <p className="text-sm text-blue-700">
                  {stepVideos?.[currentStep]?.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Play"
                  iconPosition="left"
                  onClick={handleWatchVideo}
                  className="mt-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  Watch Video ({stepVideos?.[currentStep]?.duration})
                </Button>
              </div>
            )}
          </div>

          {/* Scenario Text and Choices */}
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                {currentStepData?.title}
              </h2>
              <div className="bg-muted/50 border-l-4 border-primary p-4 rounded-r-lg">
                <p className="text-foreground leading-relaxed">
                  {currentStepData?.scenario}
                </p>
              </div>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-lg text-foreground">
                What do you do?
              </h3>
              {currentStepData?.choices?.map((choice, index) => (
                <button
                  key={choice?.id}
                  onClick={() => handleChoiceSelect(choice)}
                  disabled={isPaused}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isPaused 
                      ? 'opacity-50 cursor-not-allowed' :'hover:border-primary hover:bg-primary/5 cursor-pointer'
                  } bg-card border-border`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="text-foreground font-medium">
                      {choice?.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Pause Notice */}
            {isPaused && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <Icon name="Pause" size={24} className="text-orange-600 mx-auto mb-2" />
                <p className="text-orange-800 font-medium">Drill Paused</p>
                <p className="text-sm text-orange-700">
                  {showVideo ? "Video is playing" : "Click resume to continue"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillSimulation;