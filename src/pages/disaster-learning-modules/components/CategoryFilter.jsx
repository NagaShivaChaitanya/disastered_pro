import React from 'react';
import Icon from '../../../components/AppIcon';


const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, moduleStats }) => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Disaster Categories
        </h3>
        <div className="text-sm text-muted-foreground">
          {moduleStats?.totalModules} total modules
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories?.map((category) => {
          const isSelected = selectedCategory === category?.id;
          const isRegionalPriority = category?.isRegionalPriority;
          
          return (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`relative p-4 rounded-lg border-2 transition-standard text-left ${
                isSelected
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              {/* Regional Priority Badge */}
              {isRegionalPriority && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
                </div>
              )}
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={category?.icon} size={24} />
                </div>
                
                <div className="text-center">
                  <div className={`font-body font-medium text-sm ${
                    isSelected ? 'text-primary' : 'text-foreground'
                  }`}>
                    {category?.name}
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    {category?.moduleCount} modules
                  </div>
                  
                  {isRegionalPriority && (
                    <div className="text-xs text-error font-medium mt-1">
                      Regional Priority
                    </div>
                  )}
                </div>
              </div>
              {/* Progress Indicator */}
              {category?.completionRate > 0 && (
                <div className="absolute bottom-1 left-1 right-1">
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-primary' : 'bg-accent'
                      }`}
                      style={{ width: `${category?.completionRate}%` }}
                    />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {/* Regional Information */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="font-body font-medium text-foreground">
            Content for {moduleStats?.userRegion}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Modules are customized based on your location's disaster risk profile. 
          Priority categories are highlighted based on regional vulnerability assessments.
        </p>
      </div>
    </div>
  );
};

export default CategoryFilter;