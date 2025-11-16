import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Wallet, User } from 'lucide-react';

interface OnboardingCardProps {
  onComplete: (username: string, depositAmount: number) => void;
}

export function OnboardingCard({ onComplete }: OnboardingCardProps) {
  const [username, setUsername] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // Mock wallet connection
    setWalletConnected(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && depositAmount && walletConnected) {
      onComplete(username, parseFloat(depositAmount));
    }
  };

  return (
    <Card className="bg-slate-800/90 border-purple-500/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Get Started</CardTitle>
        <CardDescription className="text-gray-300">
          Create your username and deposit funds to start playing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-purple-300">
              <User className="inline mr-2 h-4 w-4" />
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-900 border-purple-500/30 text-white placeholder:text-gray-500"
              required
            />
          </div>

          {/* Wallet Connection */}
          <div className="space-y-2">
            <Label className="text-purple-300">
              <Wallet className="inline mr-2 h-4 w-4" />
              Crypto Wallet
            </Label>
            {!walletConnected ? (
              <Button
                type="button"
                variant="outline"
                className="w-full border-purple-500 text-purple-300 hover:bg-purple-500/20"
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </Button>
            ) : (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-md">
                <p className="text-green-300 text-sm">
                  ✓ Wallet Connected: 0x742d...4b2a
                </p>
              </div>
            )}
          </div>

          {/* Deposit Amount */}
          {walletConnected && (
            <div className="space-y-2">
              <Label htmlFor="deposit" className="text-purple-300">
                Initial Deposit (ETH)
              </Label>
              <Input
                id="deposit"
                type="number"
                step="0.001"
                min="0.01"
                placeholder="0.05"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="bg-slate-900 border-purple-500/30 text-white placeholder:text-gray-500"
                required
              />
              <p className="text-xs text-gray-400">
                Minimum deposit: 0.01 ETH
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={!username || !depositAmount || !walletConnected}
          >
            Complete Setup
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
