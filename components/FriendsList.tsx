import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Users, UserPlus, Circle, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useAccount } from 'wagmi';

interface Friend {
  id: string;
  walletAddress: string;
  username?: string;
  status: 'online' | 'offline';
  inGame: boolean;
}

interface FriendsListProps {
  isLoggedIn: boolean;
}

export function FriendsList({ isLoggedIn }: FriendsListProps) {
  const { address, isConnected } = useAccount();
  const [friends, setFriends] = useState<Friend[]>([]); // Empty friends list - will be populated from database later
  const [newFriendAddress, setNewFriendAddress] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddFriend = () => {
    // Validate wallet address format (basic check)
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (newFriendAddress.trim() && addressRegex.test(newFriendAddress.trim())) {
      // TODO: Add friend to database via Supabase
      // For now, just show a message that this will be implemented
      console.log('Adding friend with wallet address:', newFriendAddress.trim());
      // In the future, this will:
      // 1. Store the friendship relationship in Supabase
      // 2. Link wallet addresses together
      // 3. Fetch friends list from database
      
      setNewFriendAddress('');
      setOpenDialog(false);
      alert('Friend request feature coming soon! This will be stored in the database.');
    } else {
      alert('Please enter a valid wallet address (0x...)');
    }
  };

  return (
    <Card className="bg-slate-800/90 border-purple-500/30 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-400" />
          Friends
        </CardTitle>
        {isConnected && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="text-purple-300 hover:bg-purple-500/20">
                <UserPlus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-purple-500/30">
              <DialogHeader>
                <DialogTitle className="text-white">Add Friend</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Enter your friend's wallet address to send a friend request
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="0x..."
                  value={newFriendAddress}
                  onChange={(e) => setNewFriendAddress(e.target.value)}
                  className="bg-slate-900 border-purple-500/30 text-white font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddFriend()}
                />
                <Button
                  onClick={handleAddFriend}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!newFriendAddress.trim()}
                >
                  Add Friend
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="bg-slate-900/50 border border-purple-500/30 rounded-lg p-6 text-center">
            <Lock className="h-12 w-12 mx-auto mb-3 text-gray-500" />
            <p className="text-gray-400 text-sm">
              Connect your wallet to see your friends
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {friends.length === 0 ? (
              <div className="bg-slate-900/50 border border-purple-500/30 rounded-lg p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-500" />
                <p className="text-gray-400 text-sm mb-2">
                  No friends yet
                </p>
                <p className="text-gray-500 text-xs">
                  Add friends by their wallet address to play together!
                </p>
              </div>
            ) : (
              friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900/50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                    <Circle
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-800 ${
                        friend.status === 'online' ? 'fill-green-500 text-green-500' : 'fill-gray-500 text-gray-500'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">
                      {friend.username || `${friend.walletAddress.slice(0, 6)}...${friend.walletAddress.slice(-4)}`}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                      {friend.walletAddress.slice(0, 10)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {friend.inGame ? 'In Game' : friend.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  {friend.status === 'online' && friend.inGame && (
                    <Button size="sm" variant="outline" className="text-xs border-purple-500 text-purple-300 hover:bg-purple-500/20">
                      Join
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}