import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DrillFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const disasterTypes = [
    { value: 'all', label: 'All Types', icon: 'Grid3x3' },
    { value: 'earthquake', label: 'Earthquake', icon: 'Zap' },
    { value: 'fire', label: 'Fire', icon: 'Flame' },
    { value: 'flood', label: 'Flood', icon: 'Waves' },
    { value: 'cyclone', label: 'Cyclone', icon: 'Wind' },
    { value: 'chemical', label: 'Chemical', icon: 'Beaker' },
    { value: 'medical', label: 'Medical', icon: 'Heart' }
  ];

  const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Drills' },
    { value: 'available', label: 'Available' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Filter Drills
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      </div>
      <div className="space-y-6">
        {/* Disaster Type Filter */}
        <div>
          <h3 className="font-body font-medium text-sm text-foreground mb-3">
            Disaster Type
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {disasterTypes?.map((type) => (
              <button
                key={type?.value}
                onClick={() => onFilterChange('type', type?.value)}
                className={`flex flex-col items-center p-3 rounded-lg border transition-standard ${
                  filters?.type === type?.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={type?.icon} size={20} className="mb-1" />
                <span className="text-xs font-caption text-center">
                  {type?.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty and Status Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Difficulty Filter */}
          <div>
            <h3 className="font-body font-medium text-sm text-foreground mb-3">
              Difficulty Level
            </h3>
            <div className="space-y-2">
              {difficultyLevels?.map((level) => (
                <label
                  key={level?.value}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={level?.value}
                    checked={filters?.difficulty === level?.value}
                    onChange={(e) => onFilterChange('difficulty', e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{level?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className="font-body font-medium text-sm text-foreground mb-3">
              Completion Status
            </h3>
            <div className="space-y-2">
              {statusOptions?.map((status) => (
                <label
                  key={status?.value}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    value={status?.value}
                    checked={filters?.status === status?.value}
                    onChange={(e) => onFilterChange('status', e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{status?.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <h3 className="font-body font-medium text-sm text-foreground mb-3">
            Duration Range
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="range"
                min="5"
                max="60"
                value={filters?.maxDuration || 60}
                onChange={(e) => onFilterChange('maxDuration', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5 min</span>
                <span>{filters?.maxDuration || 60} min</span>
                <span>60 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div>
          <h3 className="font-body font-medium text-sm text-foreground mb-3">
            Search Drills
          </h3>
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search by title, type, or description..."
              value={filters?.search || ''}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillFilters;