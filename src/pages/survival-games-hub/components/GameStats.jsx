import React from 'react';
import Icon from '../../../components/AppIcon';

const GameStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <div className="bg-card border border-border rounded-xl p-4 shadow-card text-center">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Icon name="Gamepad2" size={20} color="white" />
        </div>
        <div className="text-2xl font-bold text-foreground">{stats?.totalGames}</div>
        <div className="text-sm text-muted-foreground">Total Games</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 shadow-card text-center">
        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Icon name="CheckCircle" size={20} color="white" />
        </div>
        <div className="text-2xl font-bold text-foreground">{stats?.completedGames}</div>
        <div className="text-sm text-muted-foreground">Completed</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 shadow-card text-center">
        <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Icon name="Star" size={20} color="white" />
        </div>
        <div className="text-2xl font-bold text-foreground">{stats?.totalPoints?.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">Total Points</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 shadow-card text-center">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Icon name="Flame" size={20} color="white" />
        </div>
        <div className="text-2xl font-bold text-foreground">{stats?.currentStreak}</div>
        <div className="text-sm text-muted-foreground">Win Streak</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 shadow-card text-center">
        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Icon name="Trophy" size={20} color="white" />
        </div>
        <div className="text-2xl font-bold text-foreground">#{stats?.rank}</div>
        <div className="text-sm text-muted-foreground">Global Rank</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 shadow-card text-center">
        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Icon name="Clock" size={20} color="white" />
        </div>
        <div className="text-2xl font-bold text-foreground">{stats?.hoursPlayed}h</div>
        <div className="text-sm text-muted-foreground">Hours Played</div>
      </div>
    </div>
  );
};

export default GameStats;