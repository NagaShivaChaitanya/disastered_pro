import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import EmergencyAccessBar from '../../components/ui/EmergencyAccessBar';

// Import components
import ModuleCard from './components/ModuleCard';
import ProgressSidebar from './components/ProgressSidebar';
import CategoryFilter from './components/CategoryFilter';
import QuickStats from './components/QuickStats';
import RegionalAlert from './components/RegionalAlert';

const DisasterLearningModules = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [alerts, setAlerts] = useState([]);

  // Mock data for disaster learning modules
  const categories = [
    {
      id: 'all',
      name: 'All Modules',
      icon: 'Grid3x3',
      moduleCount: 24,
      completionRate: 45,
      isRegionalPriority: false
    },
    {
      id: 'earthquake',
      name: 'Earthquakes',
      icon: 'Zap',
      moduleCount: 6,
      completionRate: 67,
      isRegionalPriority: true
    },
    {
      id: 'flood',
      name: 'Floods',
      icon: 'Droplets',
      moduleCount: 5,
      completionRate: 40,
      isRegionalPriority: true
    },
    {
      id: 'fire',
      name: 'Fire Safety',
      icon: 'Flame',
      moduleCount: 4,
      completionRate: 75,
      isRegionalPriority: false
    },
    {
      id: 'cyclone',
      name: 'Cyclones',
      icon: 'Wind',
      moduleCount: 3,
      completionRate: 33,
      isRegionalPriority: true
    },
    {
      id: 'drought',
      name: 'Droughts',
      icon: 'Sun',
      moduleCount: 3,
      completionRate: 0,
      isRegionalPriority: false
    },
    {
      id: 'landslide',
      name: 'Landslides',
      icon: 'Mountain',
      moduleCount: 3,
      completionRate: 0,
      isRegionalPriority: false
    }
  ];

  const modules = [
    {
      id: 1,
      title: 'Earthquake Preparedness Basics',
      description: 'Learn fundamental earthquake safety measures, including drop-cover-hold techniques and emergency kit preparation.',
      category: 'earthquake',
      difficulty: 'beginner',
      duration: '45 mins',
      lessons: 8,
      points: 150,
      progress: 75,
      enrolled: 1247,
      imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
      isNew: false,
      isLocked: false,
      prerequisites: []
    },
    {
      id: 2,
      title: 'Flood Response and Evacuation',
      description: 'Master flood emergency procedures, evacuation routes, and water safety protocols for your region.',
      category: 'flood',
      difficulty: 'intermediate',
      duration: '60 mins',
      lessons: 10,
      points: 200,
      progress: 30,
      enrolled: 892,
      imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
      isNew: true,
      isLocked: false,
      prerequisites: ['Basic Emergency Response']
    },
    {
      id: 3,
      title: 'Fire Safety in Schools',
      description: 'Comprehensive fire safety training including prevention, detection, and evacuation procedures.',
      category: 'fire',
      difficulty: 'beginner',
      duration: '30 mins',
      lessons: 6,
      points: 120,
      progress: 100,
      enrolled: 2156,
      imageUrl: 'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?w=400&h=300&fit=crop',
      isNew: false,
      isLocked: false,
      prerequisites: []
    },
    {
      id: 4,
      title: 'Cyclone Preparedness for Coastal Areas',
      description: 'Specialized training for cyclone-prone regions including storm surge awareness and shelter protocols.',
      category: 'cyclone',
      difficulty: 'intermediate',
      duration: '75 mins',
      lessons: 12,
      points: 250,
      progress: 0,
      enrolled: 634,
      imageUrl: 'https://images.pixabay.com/photo/2017/07/09/12/03/storm-2487334_1280.jpg?w=400&h=300&fit=crop',
      isNew: true,
      isLocked: false,
      prerequisites: ['Weather Awareness Basics']
    },
    {
      id: 5,
      title: 'Advanced Earthquake Response',
      description: 'Advanced techniques for post-earthquake assessment, search and rescue basics, and community coordination.',
      category: 'earthquake',
      difficulty: 'advanced',
      duration: '90 mins',
      lessons: 15,
      points: 300,
      progress: 0,
      enrolled: 423,
      imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
      isNew: false,
      isLocked: true,
      prerequisites: ['Earthquake Preparedness Basics', 'First Aid Certification']
    },
    {
      id: 6,
      title: 'Drought Management and Water Conservation',
      description: 'Learn about drought impacts, water conservation techniques, and agricultural adaptation strategies.',
      category: 'drought',
      difficulty: 'beginner',
      duration: '50 mins',
      lessons: 9,
      points: 180,
      progress: 0,
      enrolled: 567,
      imageUrl: 'https://images.pixabay.com/photo/2016/10/11/21/43/drought-1735086_1280.jpg?w=400&h=300&fit=crop',
      isNew: false,
      isLocked: false,
      prerequisites: []
    }
  ];

  const userProgress = {
    overallCompletion: 45,
    completedModules: 11,
    totalModules: 24,
    currentStreak: 12,
    longestStreak: 28,
    totalPoints: 2450,
    currentLevel: 3,
    levelProgress: 65,
    pointsToNextLevel: 550,
    weeklyProgress: 3,
    weeklyGoal: 5,
    motivationalMessage: "You\'re making excellent progress! Keep up the consistent learning to reach your weekly goal."
  };

  const achievements = {
    recentBadges: [
      { name: 'Fire Safety Expert', icon: 'Flame', color: 'bg-error' },
      { name: 'Quick Learner', icon: 'Zap', color: 'bg-warning' },
      { name: 'Consistent Student', icon: 'Calendar', color: 'bg-accent' },
      { name: 'Knowledge Seeker', icon: 'BookOpen', color: 'bg-primary' },
      { name: 'Team Player', icon: 'Users', color: 'bg-secondary' },
      { name: 'Safety Champion', icon: 'Shield', color: 'bg-success' }
    ]
  };

  const moduleStats = {
    totalModules: 24,
    userRegion: 'Punjab, India',
    completedModules: 11,
    hoursLearned: 18.5,
    currentStreak: 12,
    totalPoints: 2450
  };

  const regionalAlerts = [
    {
      id: 1,
      type: 'weather',
      severity: 'high',
      title: 'Monsoon Flood Warning',
      summary: 'Heavy rainfall expected in Punjab region. Review flood preparedness modules.',
      details: `The India Meteorological Department has issued a high alert for heavy to very heavy rainfall in Punjab over the next 48 hours. River levels are expected to rise significantly, with potential flooding in low-lying areas.`,
      region: 'Punjab, India',
      timeAgo: '2 hours ago',
      recommendations: [
        'Review flood evacuation routes in your area',
        'Complete the "Flood Response and Evacuation" module',
        'Prepare emergency kit with 72-hour supplies',
        'Stay updated with local weather alerts'
      ],
      relatedModules: ['flood']
    }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended for You' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'difficulty', label: 'Difficulty Level' },
    { value: 'duration', label: 'Duration' },
    { value: 'progress', label: 'Your Progress' }
  ];

  // Filter and sort modules
  const filteredModules = modules?.filter(module => {
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    const matchesSearch = module.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         module.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedModules = [...filteredModules]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b?.isNew - a?.isNew;
      case 'popular':
        return b?.enrolled - a?.enrolled;
      case 'difficulty':
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        return difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty];
      case 'duration':
        return parseInt(a?.duration) - parseInt(b?.duration);
      case 'progress':
        return b?.progress - a?.progress;
      default:
        return 0;
    }
  });

  const handleStartModule = (module) => {
    console.log('Starting module:', module.title);
    // Navigate to module content or show module details
  };

  const handleContinueModule = (module) => {
    console.log('Continuing module:', module.title);
    // Navigate to module content at last position
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleViewAllBadges = () => {
    console.log('Viewing all badges');
    // Navigate to achievements page
  };

  useEffect(() => {
    setAlerts(regionalAlerts);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EmergencyAccessBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BreadcrumbTrail />
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Disaster Learning Modules
            </h1>
            <p className="text-muted-foreground">
              Interactive education tailored to your region's disaster risks
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              iconName="Grid3x3"
              onClick={() => setViewMode('grid')}
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              iconName="List"
              onClick={() => setViewMode('list')}
            />
            
            <Link to="/virtual-emergency-drills">
              <Button
                variant="secondary"
                iconName="Target"
                iconPosition="left"
              >
                Practice Drills
              </Button>
            </Link>
          </div>
        </div>

        {/* Regional Alerts */}
        <RegionalAlert 
          alerts={alerts}
          onDismissAlert={handleDismissAlert}
        />

        {/* Quick Stats */}
        <QuickStats stats={moduleStats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              moduleStats={moduleStats}
            />

            {/* Search and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search modules by title or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full"
                />
              </div>
              
              <div className="sm:w-64">
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by..."
                />
              </div>
            </div>

            {/* Module Grid/List */}
            <div className={`${
              viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
            }`}>
              {sortedModules?.length > 0 ? (
                sortedModules?.map(module => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onStartModule={handleStartModule}
                    onContinueModule={handleContinueModule}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    No modules found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Load More */}
            {sortedModules?.length > 0 && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  iconName="ChevronDown"
                  iconPosition="right"
                >
                  Load More Modules
                </Button>
              </div>
            )}
          </div>

          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <ProgressSidebar
              userProgress={userProgress}
              achievements={achievements}
              onViewAllBadges={handleViewAllBadges}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterLearningModules;