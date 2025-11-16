import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardProps {
  currentUsername: string;
}

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, username: 'Example', score: 45820, earnings: 2.45 },
];

export function Leaderboard({ currentUsername }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-300" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return <span className="text-gray-400">#{rank}</span>;
  };

  return (
    <Card className="bg-slate-800/90 border-purple-500/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Global Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                player.username === currentUsername
                  ? 'bg-purple-600/30 border border-purple-500/50'
                  : 'bg-slate-900/50 hover:bg-slate-900/80'
              }`}
            >
              <div className="w-8 flex justify-center">
                {getRankIcon(player.rank)}
              </div>
              <div className="flex-1">
                <p className={`${player.username === currentUsername ? 'text-purple-200' : 'text-white'}`}>
                  {player.username}
                  {player.username === currentUsername && (
                    <span className="ml-2 text-xs text-purple-300">(You)</span>
                  )}
                </p>
                <p className="text-gray-400 text-sm">{player.score.toLocaleString()} points</p>
              </div>
              <div className="text-right">
                <p className="text-green-400">{player.earnings.toFixed(2)} ETH</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
