import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameCard = ({ game, onStartGame, onStartVRGame }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-orange-600 bg-orange-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      case 'expert': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'earthquake': return 'Mountain';
      case 'flood': return 'Droplets';
      case 'fire': return 'Flame';
      case 'cyclone': return 'Wind';
      case 'chemical': return 'Beaker';
      case 'tsunami': return 'Waves';
      case 'landslide': return 'Triangle';
      case 'mixed': return 'Zap';
      default: return 'AlertTriangle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-standard group">
      {/* Game Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={game?.image}
          alt={game?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game?.difficulty)}`}>
            {game?.difficulty}
          </div>
          
          {game?.isVRSupported && (
            <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="Smartphone" size={12} />
              <span>VR</span>
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{game?.duration}min</span>
          </div>
        </div>

        {/* Completion status */}
        {game?.isCompleted && (
          <div className="absolute bottom-4 left-4">
            <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="CheckCircle" size={12} />
              <span>Completed</span>
            </div>
          </div>
        )}

        {game?.isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <Icon name="Lock" size={24} className="mx-auto mb-2" />
              <p className="text-sm font-medium">Locked</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
              {game?.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name={getCategoryIcon(game?.category)} size={14} />
              <span className="capitalize">{game?.category}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              {game?.maxPoints}
            </div>
            <div className="text-xs text-muted-foreground">Max Points</div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {game?.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {game?.skills?.slice(0, 2)?.map((skill, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
          {game?.skills?.length > 2 && (
            <span className="text-xs text-muted-foreground px-2 py-1">
              +{game?.skills?.length - 2} more
            </span>
          )}
        </div>

        {/* Progress/Stats */}
        {game?.isCompleted ? (
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Best Score:</span>
              <span className="font-semibold text-foreground">{game?.bestScore}/{game?.maxPoints}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Attempts:</span>
              <span className="font-semibold text-foreground">{game?.attempts}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(game?.bestScore / game?.maxPoints) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : game?.attempts > 0 ? (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-700">In Progress</span>
              <span className="font-semibold text-orange-800">{game?.attempts} attempts</span>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="text-sm text-blue-700 flex items-center space-x-1">
              <Icon name="Star" size={14} />
              <span>Ready to start your first attempt!</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {game?.isLocked ? (
          <div className="text-center py-2">
            <p className="text-xs text-muted-foreground">{game?.unlockCondition}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              onClick={onStartGame}
              variant="default"
              iconName="Play"
              iconPosition="left"
              fullWidth
            >
              {game?.isCompleted ? 'Play Again' : 'Start Game'}
            </Button>
            
            {game?.isVRSupported && (
              <Button
                onClick={onStartVRGame}
                variant="outline"
                iconName="Smartphone"
                iconPosition="left"
                fullWidth
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                VR Mode
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;