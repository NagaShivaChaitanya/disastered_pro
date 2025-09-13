import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GameCard from './components/GameCard';
import GameFilters from './components/GameFilters';
import GameStats from './components/GameStats';
import GameLeaderboard from './components/GameLeaderboard';

const SurvivalGamesHub = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    status: 'all',
    duration: 60,
    search: ''
  });

  const [gameStats] = useState({
    totalGames: 12,
    completedGames: 5,
    totalPoints: 2840,
    currentStreak: 3,
    rank: 15,
    hoursPlayed: 8.5
  });

  // Mock survival games data
  const survivalGames = [
    {
      id: 1,
      title: "Earthquake Survival Challenge",
      category: "earthquake",
      difficulty: "Beginner",
      duration: 25,
      maxPoints: 500,
      description: "Navigate through a collapsed building scenario, making critical decisions to ensure survival and help others.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop",
      isCompleted: true,
      bestScore: 450,
      attempts: 3,
      isVRSupported: true,
      objectives: [
        "Find safe shelter under sturdy furniture",
        "Locate emergency supplies",
        "Help injured survivors",
        "Navigate evacuation route"
      ],
      skills: ["Decision Making", "Risk Assessment", "Emergency Response"],
      rewardPoints: 450
    },
    {
      id: 2,
      title: "Flood Escape Mission",
      category: "flood",
      difficulty: "Intermediate",
      duration: 30,
      maxPoints: 600,
      description: "Escape rising floodwaters while managing limited resources and helping community members reach safety.",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop",
      isCompleted: false,
      bestScore: 0,
      attempts: 0,
      isVRSupported: true,
      objectives: [
        "Monitor water level changes",
        "Secure emergency supplies",
        "Coordinate group evacuation",
        "Navigate to higher ground"
      ],
      skills: ["Resource Management", "Leadership", "Environmental Awareness"],
      rewardPoints: 600
    },
    {
      id: 3,
      title: "Wildfire Evacuation Race",
      category: "fire",
      difficulty: "Advanced",
      duration: 20,
      maxPoints: 750,
      description: "Race against time to evacuate a community threatened by rapidly spreading wildfire.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      isCompleted: true,
      bestScore: 680,
      attempts: 5,
      isVRSupported: true,
      objectives: [
        "Assess fire spread patterns",
        "Plan optimal evacuation routes",
        "Manage panic and crowd control",
        "Coordinate with emergency services"
      ],
      skills: ["Strategic Planning", "Crisis Management", "Communication"],
      rewardPoints: 680
    },
    {
      id: 4,
      title: "Cyclone Shelter Challenge",
      category: "cyclone",
      difficulty: "Intermediate",
      duration: 35,
      maxPoints: 550,
      description: "Prepare and manage a cyclone shelter while ensuring the safety and wellbeing of evacuees.",
      image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&h=400&fit=crop",
      isCompleted: false,
      bestScore: 0,
      attempts: 0,
      isVRSupported: false,
      objectives: [
        "Set up emergency shelter",
        "Manage food and water supplies",
        "Coordinate medical assistance",
        "Maintain morale and order"
      ],
      skills: ["Organization", "Resource Allocation", "Social Management"],
      rewardPoints: 550
    },
    {
      id: 5,
      title: "Chemical Spill Response",
      category: "chemical",
      difficulty: "Advanced",
      duration: 40,
      maxPoints: 800,
      description: "Handle a hazardous chemical spill while protecting yourself and coordinating emergency response.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop",
      isCompleted: true,
      bestScore: 720,
      attempts: 2,
      isVRSupported: true,
      objectives: [
        "Identify chemical hazards",
        "Implement containment procedures",
        "Evacuate affected areas",
        "Coordinate decontamination"
      ],
      skills: ["Hazmat Response", "Technical Knowledge", "Safety Protocols"],
      rewardPoints: 720
    },
    {
      id: 6,
      title: "Multi-Hazard City Survival",
      category: "mixed",
      difficulty: "Expert",
      duration: 60,
      maxPoints: 1000,
      description: "Ultimate survival challenge with multiple concurrent disasters requiring comprehensive emergency management.",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=400&fit=crop",
      isCompleted: false,
      bestScore: 0,
      attempts: 0,
      isVRSupported: true,
      objectives: [
        "Prioritize multiple emergencies",
        "Allocate limited resources",
        "Coordinate multi-agency response",
        "Adapt strategies in real-time"
      ],
      skills: ["Strategic Thinking", "Multi-tasking", "Leadership", "Adaptability"],
      rewardPoints: 1000,
      isLocked: true,
      unlockCondition: "Complete 4 other games with 70%+ score"
    },
    {
      id: 7,
      title: "Tsunami Warning Response",
      category: "tsunami",
      difficulty: "Intermediate",
      duration: 15,
      maxPoints: 450,
      description: "React to tsunami warning systems and lead coastal community evacuation to safety zones.",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=400&fit=crop",
      isCompleted: false,
      bestScore: 0,
      attempts: 1,
      isVRSupported: false,
      objectives: [
        "Recognize warning signals",
        "Execute rapid evacuation",
        "Guide community to high ground",
        "Assist vulnerable populations"
      ],
      skills: ["Quick Decision Making", "Community Leadership", "Emergency Protocols"],
      rewardPoints: 450
    },
    {
      id: 8,
      title: "Landslide Rescue Mission",
      category: "landslide",
      difficulty: "Advanced",
      duration: 45,
      maxPoints: 700,
      description: "Coordinate search and rescue operations in landslide-affected mountainous terrain.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      isCompleted: true,
      bestScore: 590,
      attempts: 4,
      isVRSupported: true,
      objectives: [
        "Assess terrain stability",
        "Locate trapped survivors",
        "Coordinate rescue teams",
        "Manage equipment and supplies"
      ],
      skills: ["Terrain Analysis", "Rescue Techniques", "Team Coordination"],
      rewardPoints: 590
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      difficulty: 'all',
      status: 'all',
      duration: 60,
      search: ''
    });
  };

  // Filter games based on current filters
  const filteredGames = survivalGames?.filter(game => {
    if (filters?.category !== 'all' && game?.category !== filters?.category) return false;
    if (filters?.difficulty !== 'all' && game?.difficulty?.toLowerCase() !== filters?.difficulty) return false;
    if (filters?.status !== 'all') {
      if (filters?.status === 'completed' && !game?.isCompleted) return false;
      if (filters?.status === 'available' && (game?.isCompleted || game?.isLocked)) return false;
      if (filters?.status === 'locked' && !game?.isLocked) return false;
    }
    if (game?.duration > filters?.duration) return false;
    if (filters?.search && !game?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !game?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    
    return true;
  });

  const handleStartGame = (game) => {
    // In a real app, this would navigate to the game or open game modal
    console.log('Starting game:', game?.title);
    // For demo, just show alert
    alert(`Starting ${game?.title}! This would launch the survival game simulation.`);
  };

  const handleStartVRGame = (game) => {
    // In a real app, this would launch VR mode
    console.log('Starting VR game:', game?.title);
    alert(`Launching ${game?.title} in VR Mode! Put on your VR headset.`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-4xl mb-2">
                Survival Games Hub
              </h1>
              <p className="text-orange-100 text-lg">
                Test your disaster management skills through immersive gaming experiences
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/virtual-emergency-drills">
                <Button
                  variant="outline"
                  iconName="Target"
                  iconPosition="left"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Emergency Drills
                </Button>
              </Link>
              
              <Link to="/student-dashboard">
                <Button
                  variant="outline"
                  iconName="Home"
                  iconPosition="left"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Game Statistics */}
            <GameStats stats={gameStats} />

            {/* Filters */}
            <GameFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />

            {/* Featured VR Games Section */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-2">
                    🥽 VR Gaming Experience
                  </h2>
                  <p className="text-purple-100">
                    Immerse yourself in realistic disaster scenarios with Virtual Reality
                  </p>
                </div>
                <Icon name="Smartphone" size={48} className="text-purple-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {survivalGames?.filter(game => game?.isVRSupported)?.slice(0, 3)?.map((game) => (
                  <div key={`vr-${game?.id}`} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-2">{game?.title}</h3>
                    <p className="text-sm text-purple-100 mb-3">
                      Experience this scenario in immersive VR
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      iconName="Play"
                      iconPosition="left"
                      fullWidth
                      onClick={() => handleStartVRGame(game)}
                      className="bg-white text-purple-600 hover:bg-purple-50"
                    >
                      Launch VR
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Games Grid */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading font-semibold text-2xl text-foreground">
                  Survival Challenges
                </h2>
                <p className="text-muted-foreground">
                  {filteredGames?.length} of {survivalGames?.length} games available
                </p>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Earn points by completing challenges! 🎯
              </div>
            </div>

            {filteredGames?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGames?.map((game) => (
                  <GameCard
                    key={game?.id}
                    game={game}
                    onStartGame={() => handleStartGame(game)}
                    onStartVRGame={() => handleStartVRGame(game)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  No games found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more games
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <GameLeaderboard />

            {/* Achievement Progress */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card mb-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                🏆 Achievements
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">First Responder</p>
                    <p className="text-xs text-muted-foreground">Complete 5 games</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">5/5</p>
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">VR Explorer</p>
                    <p className="text-xs text-muted-foreground">Try 3 VR games</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-orange-600">2/3</p>
                    <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-orange-500"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Master Survivor</p>
                    <p className="text-xs text-muted-foreground">Score 80%+ in any game</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-muted-foreground">0/1</p>
                    <Icon name="Lock" size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Lightbulb" size={18} className="text-blue-600" />
                <h3 className="font-heading font-semibold text-blue-800">
                  Gaming Tips
                </h3>
              </div>
              
              <div className="space-y-2 text-sm text-blue-700">
                <p>• Start with Beginner games to learn basics</p>
                <p>• Try VR mode for immersive experience</p>
                <p>• Replay games to improve your score</p>
                <p>• Complete objectives to earn bonus points</p>
                <p>• Share strategies with friends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurvivalGamesHub;