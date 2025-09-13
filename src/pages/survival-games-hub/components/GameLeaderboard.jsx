import React from 'react';
import Icon from '../../../components/AppIcon';

const GameLeaderboard = () => {
  const leaderboardData = [
    {
      id: 1,
      name: 'Arjun Singh',
      points: 4250,
      completedGames: 8,
      avatar: 'AS',
      isCurrentUser: false
    },
    {
      id: 2,
      name: 'Priya Sharma',
      points: 3890,
      completedGames: 7,
      avatar: 'PS',
      isCurrentUser: false
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      points: 3650,
      completedGames: 6,
      avatar: 'RK',
      isCurrentUser: false
    },
    {
      id: 4,
      name: 'You',
      points: 2840,
      completedGames: 5,
      avatar: 'YU',
      isCurrentUser: true
    },
    {
      id: 5,
      name: 'Sneha Patel',
      points: 2720,
      completedGames: 4,
      avatar: 'SP',
      isCurrentUser: false
    }
  ];

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Icon name="Crown" size={16} className="text-yellow-500" />;
      case 1: return <Icon name="Medal" size={16} className="text-gray-400" />;
      case 2: return <Icon name="Award" size={16} className="text-orange-600" />;
      default: return <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          🏆 Leaderboard
        </h3>
        <div className="text-xs text-muted-foreground">
          This Week
        </div>
      </div>

      <div className="space-y-3">
        {leaderboardData?.map((player, index) => (
          <div
            key={player?.id}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-standard ${
              player?.isCurrentUser 
                ? 'bg-primary/5 border border-primary/20' :'bg-muted/30 hover:bg-muted/50'
            }`}
          >
            <div className="flex-shrink-0 w-6 flex justify-center">
              {getRankIcon(index)}
            </div>

            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                player?.isCurrentUser 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
              }`}>
                {player?.avatar}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`font-medium text-sm truncate ${
                  player?.isCurrentUser ? 'text-primary' : 'text-foreground'
                }`}>
                  {player?.name}
                </p>
                <div className="text-right">
                  <p className="font-bold text-sm text-foreground">
                    {player?.points?.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {player?.completedGames} games
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground mb-2">
          Your current rank: <span className="font-semibold">#15</span> globally
        </p>
        <div className="text-xs text-muted-foreground">
          🎯 Complete more games to climb the leaderboard!
        </div>
      </div>
    </div>
  );
};

export default GameLeaderboard;