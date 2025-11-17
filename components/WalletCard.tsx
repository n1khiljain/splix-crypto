import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Wallet, Plus, Minus, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

interface WalletCardProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  isLoggedIn: boolean;
}

export function WalletCard({ balance, onBalanceChange, isLoggedIn }: WalletCardProps) {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  
  // Get connected wallet info
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    address: address,
  });
  
  // Use real wallet balance if connected, otherwise use prop balance
  const displayBalance = isConnected && balanceData 
    ? parseFloat(formatEther(balanceData.value))
    : balance;
  
  // Format wallet address for display
  const formatAddress = (addr: string | undefined) => {
    if (!addr) return 'Not connected';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      onBalanceChange(balance + amount);
      setDepositAmount('');
      setOpenDeposit(false);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= balance) {
      onBalanceChange(balance - amount);
      setWithdrawAmount('');
      setOpenWithdraw(false);
    }
  };

  return (
    <Card className="bg-slate-800/90 border-purple-500/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wallet className="h-5 w-5 text-purple-400" />
          Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="bg-slate-900/50 border border-purple-500/30 rounded-lg p-6 text-center">
            <Lock className="h-12 w-12 mx-auto mb-3 text-gray-500" />
            <p className="text-gray-400 text-sm">
              Connect your wallet to view balance
            </p>
          </div>
        ) : (
          <>
            {/* Balance Display */}
            <div className="bg-slate-800/50 border border-purple-500/30 rounded-lg p-4">
              <p className="text-gray-300 text-sm mb-1">Wallet Balance</p>
              {balanceLoading ? (
                <p className="text-white text-3xl">Loading...</p>
              ) : (
                <>
                  <p className="text-white text-3xl">{displayBalance.toFixed(4)} {balanceData?.symbol || 'ETH'}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    ≈ ${(displayBalance * 3000).toFixed(2)} USD
                  </p>
                </>
              )}
            </div>

            {/* Wallet Address */}
            <div className="space-y-1">
              <p className="text-gray-400 text-xs">Wallet Address</p>
              <p className="text-purple-300 text-sm font-mono">{formatAddress(address)}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Dialog open={openDeposit} onOpenChange={setOpenDeposit}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Funds
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-purple-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add Funds</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Deposit ETH from your connected wallet
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit-amount" className="text-purple-300">
                        Amount (ETH)
                      </Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        step="0.001"
                        min="0.001"
                        placeholder="0.05"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="bg-slate-900 border-purple-500/30 text-white"
                      />
                    </div>
                    <Button
                      onClick={handleDeposit}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                    >
                      Deposit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={openWithdraw} onOpenChange={setOpenWithdraw}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20">
                    <Minus className="h-4 w-4 mr-1" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-purple-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-white">Withdraw Funds</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Withdraw ETH to your connected wallet
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-amount" className="text-purple-300">
                        Amount (ETH)
                      </Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        step="0.001"
                        min="0.001"
                        max={balance}
                        placeholder="0.05"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="bg-slate-900 border-purple-500/30 text-white"
                      />
                      <p className="text-xs text-gray-400">
                        Available: {balance.toFixed(4)} ETH
                      </p>
                    </div>
                    <Button
                      onClick={handleWithdraw}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance}
                    >
                      Withdraw
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}