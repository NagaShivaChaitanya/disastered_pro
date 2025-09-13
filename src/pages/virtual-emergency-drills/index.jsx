import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DrillCard from './components/DrillCard';
import DrillSimulation from './components/DrillSimulation';
import DrillFilters from './components/DrillFilters';
import DrillStats from './components/DrillStats';
import DrillCompletion from './components/DrillCompletion';

const VirtualEmergencyDrills = () => {
  const [activeView, setActiveView] = useState('drills'); // 'drills', 'simulation', 'completion'
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [completionResults, setCompletionResults] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    difficulty: 'all',
    status: 'all',
    maxDuration: 60,
    search: ''
  });

  // Mock drill data
  const mockDrills = [
    {
      id: 1,
      title: "Earthquake Response Protocol",
      type: "earthquake",
      difficulty: "Beginner",
      duration: 15,
      participants: 1,
      rating: 4.8,
      description: "Learn the essential steps for earthquake safety including Drop, Cover, and Hold On techniques. Practice identifying safe spots and evacuation procedures.",
      prerequisites: ["Basic Safety Awareness"],
      isCompleted: true,
      isLocked: false,
      attempts: 2,
      lastScore: 85,
      steps: [
        {
          title: "Initial Response",
          scenario: "You feel strong shaking in your classroom. The ground is moving violently and objects are falling from shelves.",
          choices: [
            { id: 1, text: "Run outside immediately", isCorrect: false },
            { id: 2, text: "Drop, Cover, and Hold On under your desk", isCorrect: true },
            { id: 3, text: "Stand in the doorway", isCorrect: false },
            { id: 4, text: "Hide under the staircase", isCorrect: false }
          ],
          image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop"
        },
        {
          title: "After Shaking Stops",
          scenario: "The earthquake has stopped. You are safe under your desk but need to decide your next action.",
          choices: [
            { id: 1, text: "Stay under the desk and wait", isCorrect: false },
            { id: 2, text: "Check for injuries and hazards before moving", isCorrect: true },
            { id: 3, text: "Run outside as fast as possible", isCorrect: false },
            { id: 4, text: "Use the elevator to evacuate", isCorrect: false }
          ],
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
        }
      ],
      learningPoints: [
        "Drop, Cover, and Hold On is the safest immediate response",
        "Never run during shaking - you may fall and get injured",
        "Check for injuries and hazards before evacuating",
        "Use stairs, never elevators during earthquakes"
      ]
    },
    {
      id: 2,
      title: "Fire Emergency Evacuation",
      type: "fire",
      difficulty: "Intermediate",
      duration: 20,
      participants: 1,
      rating: 4.9,
      description: "Master fire evacuation procedures including smoke detection, escape route planning, and helping others safely exit the building.",
      prerequisites: ["Basic Safety Awareness", "Building Layout Knowledge"],
      isCompleted: false,
      isLocked: false,
      attempts: 0,
      lastScore: 0,
      steps: [
        {
          title: "Fire Detection",
          scenario: "You smell smoke in the hallway and hear the fire alarm. You need to assess the situation quickly.",
          choices: [
            { id: 1, text: "Investigate the source of smoke", isCorrect: false },
            { id: 2, text: "Alert others and begin evacuation", isCorrect: true },
            { id: 3, text: "Wait for instructions", isCorrect: false },
            { id: 4, text: "Call emergency services first", isCorrect: false }
          ],
          image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=400&fit=crop"
        }
      ]
    },
    {
      id: 3,
      title: "Flood Response and Safety",
      type: "flood",
      difficulty: "Intermediate",
      duration: 25,
      participants: 1,
      rating: 4.7,
      description: "Learn flood safety protocols including water depth assessment, evacuation timing, and emergency supply management.",
      prerequisites: ["Weather Awareness", "Basic Safety Awareness"],
      isCompleted: false,
      isLocked: false,
      attempts: 1,
      lastScore: 72,
      steps: [
        {
          title: "Rising Water Assessment",
          scenario: "Heavy rains have caused water to accumulate around your school. You need to decide when and how to evacuate safely.",
          choices: [
            { id: 1, text: "Wait until water reaches the building", isCorrect: false },
            { id: 2, text: "Evacuate to higher ground immediately", isCorrect: true },
            { id: 3, text: "Try to drive through the water", isCorrect: false },
            { id: 4, text: "Stay inside and wait for rescue", isCorrect: false }
          ],
          image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop"
        }
      ]
    },
    {
      id: 4,
      title: "Chemical Spill Response",
      type: "chemical",
      difficulty: "Advanced",
      duration: 30,
      participants: 1,
      rating: 4.6,
      description: "Advanced training for chemical emergency response including hazard identification, containment procedures, and decontamination protocols.",
      prerequisites: ["Intermediate Safety Training", "Chemical Awareness"],
      isCompleted: false,
      isLocked: false,
      attempts: 0,
      lastScore: 0,
      steps: [
        {
          title: "Chemical Identification",
          scenario: "A chemical spill has occurred in the science lab. You need to identify the hazard level and respond appropriately.",
          choices: [
            { id: 1, text: "Try to clean it up immediately", isCorrect: false },
            { id: 2, text: "Evacuate the area and alert authorities", isCorrect: true },
            { id: 3, text: "Ventilate the room first", isCorrect: false },
            { id: 4, text: "Take photos for documentation", isCorrect: false }
          ],
          image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop"
        }
      ]
    },
    {
      id: 5,
      title: "Cyclone Preparedness",
      type: "cyclone",
      difficulty: "Intermediate",
      duration: 35,
      participants: 1,
      rating: 4.5,
      description: "Comprehensive cyclone preparedness including early warning recognition, shelter preparation, and post-storm safety measures.",
      prerequisites: ["Weather Awareness"],
      isCompleted: true,
      isLocked: false,
      attempts: 3,
      lastScore: 91,
      steps: [
        {
          title: "Early Warning Response",
          scenario: "A cyclone warning has been issued for your area. You have 24 hours to prepare your school for the storm.",
          choices: [
            { id: 1, text: "Continue normal activities", isCorrect: false },
            { id: 2, text: "Secure the building and prepare emergency supplies", isCorrect: true },
            { id: 3, text: "Evacuate immediately", isCorrect: false },
            { id: 4, text: "Wait for more information", isCorrect: false }
          ],
          image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&h=400&fit=crop"
        }
      ]
    },
    {
      id: 6,
      title: "Medical Emergency Response",
      type: "medical",
      difficulty: "Beginner",
      duration: 18,
      participants: 1,
      rating: 4.9,
      description: "Basic medical emergency response including first aid basics, emergency calling procedures, and victim assessment.",
      prerequisites: [],
      isCompleted: false,
      isLocked: false,
      attempts: 0,
      lastScore: 0,
      steps: [
        {
          title: "Initial Assessment",
          scenario: "A student has collapsed in the hallway. You are the first person to arrive at the scene.",
          choices: [
            { id: 1, text: "Move the person immediately", isCorrect: false },
            { id: 2, text: "Check for responsiveness and breathing", isCorrect: true },
            { id: 3, text: "Give water to drink", isCorrect: false },
            { id: 4, text: "Leave to get help", isCorrect: false }
          ],
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop"
        }
      ]
    }
  ];

  // Mock statistics
  const mockStats = {
    totalDrills: mockDrills?.length,
    completedDrills: mockDrills?.filter(drill => drill?.isCompleted)?.length,
    averageScore: Math.round(
      mockDrills?.filter(drill => drill?.isCompleted)?.reduce((sum, drill) => sum + drill?.lastScore, 0) / 
      mockDrills?.filter(drill => drill?.isCompleted)?.length || 0
    ),
    totalTimeSpent: 12
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      difficulty: 'all',
      status: 'all',
      maxDuration: 60,
      search: ''
    });
  };

  const handleStartDrill = (drill) => {
    setSelectedDrill(drill);
    setActiveView('simulation');
  };

  const handleDrillComplete = (results) => {
    setCompletionResults(results);
    setActiveView('completion');
  };

  const handleRetryDrill = () => {
    setActiveView('simulation');
    setCompletionResults(null);
  };

  const handleContinueLearning = () => {
    setActiveView('drills');
    setSelectedDrill(null);
    setCompletionResults(null);
  };

  const handleViewAnalytics = () => {
    // In a real app, this would navigate to analytics page
    console.log('View analytics for drill:', selectedDrill?.id);
    handleContinueLearning();
  };

  const handleExitSimulation = () => {
    setActiveView('drills');
    setSelectedDrill(null);
  };

  // Filter drills based on current filters
  const filteredDrills = mockDrills?.filter(drill => {
    if (filters?.type !== 'all' && drill?.type !== filters?.type) return false;
    if (filters?.difficulty !== 'all' && drill?.difficulty?.toLowerCase() !== filters?.difficulty) return false;
    if (filters?.status !== 'all') {
      if (filters?.status === 'completed' && !drill?.isCompleted) return false;
      if (filters?.status === 'available' && (drill?.isCompleted || drill?.isLocked)) return false;
      if (filters?.status === 'in-progress' && drill?.attempts === 0) return false;
    }
    if (drill?.duration > filters?.maxDuration) return false;
    if (filters?.search && !drill?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !drill?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    
    return true;
  });

  // Render different views based on activeView state
  if (activeView === 'simulation' && selectedDrill) {
    return (
      <DrillSimulation
        drill={selectedDrill}
        onComplete={handleDrillComplete}
        onExit={handleExitSimulation}
      />
    );
  }

  if (activeView === 'completion' && selectedDrill && completionResults) {
    return (
      <DrillCompletion
        drill={selectedDrill}
        results={completionResults}
        onRetry={handleRetryDrill}
        onContinue={handleContinueLearning}
        onViewAnalytics={handleViewAnalytics}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">
                Virtual Emergency Drills
              </h1>
              <p className="text-muted-foreground mt-2">
                Practice disaster response procedures through interactive simulations
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/disaster-learning-modules">
                <Button
                  variant="outline"
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Learning Modules
                </Button>
              </Link>
              
              <Link to="/emergency-contacts">
                <Button
                  variant="destructive"
                  iconName="Phone"
                  iconPosition="left"
                  className="shadow-emergency"
                >
                  Emergency Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <DrillStats stats={mockStats} />

        {/* Filters */}
        <DrillFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-card mb-6">
          <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
            Quick Start
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              iconName="Zap"
              iconPosition="left"
              onClick={() => {
                const beginnerDrills = mockDrills?.filter(d => d?.difficulty === 'Beginner' && !d?.isCompleted);
                if (beginnerDrills?.length > 0) handleStartDrill(beginnerDrills?.[0]);
              }}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">Start Beginner Drill</div>
                <div className="text-xs text-muted-foreground">Perfect for first-time users</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => {
                const incompleteDrills = mockDrills?.filter(d => d?.attempts > 0 && !d?.isCompleted);
                if (incompleteDrills?.length > 0) handleStartDrill(incompleteDrills?.[0]);
              }}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">Continue Practice</div>
                <div className="text-xs text-muted-foreground">Resume previous drills</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              iconName="TrendingUp"
              iconPosition="left"
              onClick={() => {
                const challengingDrills = mockDrills?.filter(d => d?.difficulty === 'Advanced' && !d?.isLocked);
                if (challengingDrills?.length > 0) handleStartDrill(challengingDrills?.[0]);
              }}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">Challenge Mode</div>
                <div className="text-xs text-muted-foreground">Advanced scenarios</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Drill Results */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Available Drills
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredDrills?.length} of {mockDrills?.length} drills shown
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              iconName="Grid3x3"
              className="text-primary"
            />
            <Button
              variant="ghost"
              size="icon"
              iconName="List"
            />
          </div>
        </div>

        {/* Drill Cards Grid */}
        {filteredDrills?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrills?.map((drill) => (
              <DrillCard
                key={drill?.id}
                drill={drill}
                onStartDrill={handleStartDrill}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              No drills found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more drills
            </p>
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Icon name="HelpCircle" size={24} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Need Help Getting Started?
              </h3>
              <p className="text-muted-foreground mb-4">
                Virtual emergency drills help you practice disaster response in a safe environment. 
                Start with beginner-level drills and work your way up to more complex scenarios.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link to="/disaster-learning-modules">
                  <Button variant="outline" size="sm">
                    View Learning Materials
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  Watch Tutorial
                </Button>
                <Button variant="ghost" size="sm">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualEmergencyDrills;