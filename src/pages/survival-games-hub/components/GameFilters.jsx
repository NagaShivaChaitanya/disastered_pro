import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const GameFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'flood', label: 'Flood' },
    { value: 'fire', label: 'Fire/Wildfire' },
    { value: 'cyclone', label: 'Cyclone/Hurricane' },
    { value: 'chemical', label: 'Chemical Hazard' },
    { value: 'tsunami', label: 'Tsunami' },
    { value: 'landslide', label: 'Landslide' },
    { value: 'mixed', label: 'Multi-Hazard' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Games' },
    { value: 'available', label: 'Available to Play' },
    { value: 'completed', label: 'Completed' },
    { value: 'locked', label: 'Locked' }
  ];

  const handleSearchChange = (e) => {
    onFilterChange('search', e?.target?.value);
  };

  const handleDurationChange = (e) => {
    onFilterChange('duration', parseInt(e?.target?.value));
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Filter Games
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="xl:col-span-2">
          <Input
            placeholder="Search games..."
            value={filters?.search}
            onChange={handleSearchChange}
            icon="Search"
          />
        </div>

        {/* Category */}
        <Select
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />

        {/* Difficulty */}
        <Select
          options={difficultyOptions}
          value={filters?.difficulty}
          onChange={(value) => onFilterChange('difficulty', value)}
        />

        {/* Status */}
        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Max Duration: {filters?.duration}min
          </label>
          <input
            type="range"
            min="10"
            max="90"
            step="5"
            value={filters?.duration}
            onChange={handleDurationChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>10min</span>
            <span>90min</span>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters?.category !== 'all' || filters?.difficulty !== 'all' || filters?.status !== 'all' || filters?.search || filters?.duration < 60) && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Active filters:</span>
            
            {filters?.category !== 'all' && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                {categoryOptions?.find(opt => opt?.value === filters?.category)?.label}
              </span>
            )}
            
            {filters?.difficulty !== 'all' && (
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                {difficultyOptions?.find(opt => opt?.value === filters?.difficulty)?.label}
              </span>
            )}
            
            {filters?.status !== 'all' && (
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              </span>
            )}
            
            {filters?.search && (
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                Search: "{filters?.search}"
              </span>
            )}
            
            {filters?.duration < 60 && (
              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                ≤{filters?.duration}min
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameFilters;