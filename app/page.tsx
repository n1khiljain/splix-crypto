"use client";

import * as React from "react";
import { useState } from 'react';
import { Header } from '@/components/Header';
import { OnboardingCard } from '@/components/OnboardingCard';
import { WalletCard } from '@/components/WalletCard';
import { Leaderboard } from '@/components/Leaderboard';
import { SkinCustomizer } from '@/components/SkinCustomizer';
import { FriendsList } from '@/components/FriendsList';
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from '@/components/ui/button';
import { Gamepad2, Lock, User } from 'lucide-react';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  goerli,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, goerli],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

function AppContent() {
  const { address, isConnected } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasUsername, setHasUsername] = useState(false);
  const [username, setUsername] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectedSkin, setSelectedSkin] = useState('#3b82f6');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleOnboardingComplete = (newUsername: string, depositAmount: number) => {
    setUsername(newUsername);
    setWalletBalance(depositAmount);
    setHasUsername(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setHasUsername(true);
    }
  };

  const handleJoinGame = () => {
    // Mock joining game
    const displayName = username || address?.slice(0, 6) + '...' + address?.slice(-4) || 'Player';
    alert(`Joining game as ${displayName} with skin color ${selectedSkin}!`);
  };

  // Can join game if wallet is connected (username optional for now)
  const canJoinGame = isConnected;

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} username={username} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Join Game Section */}
            <div className="bg-slate-800/90 rounded-lg p-8 shadow-2xl">
              <h2 className="text-white text-3xl mb-4">Join Game</h2>
              <p className="text-purple-100 mb-6">

              </p>
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
              </form>
              {!canJoinGame && (
                <p className="text-purple-200 text-sm mb-4 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Please connect your wallet to join the game
                </p>
              )}
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleJoinGame}
                disabled={!canJoinGame}
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                {canJoinGame ? 'Join Game' : 'Connect Wallet'}
              </Button>
            </div>

            {/* Onboarding Card - Show when wallet connected but no username */}
            {/* {isConnected && !hasUsername && (
              <OnboardingCard onComplete={handleOnboardingComplete} />
            )}*/}

            {/* Leaderboard */}
            <Leaderboard currentUsername={username} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Wallet Card */}
            <WalletCard 
              balance={walletBalance} 
              onBalanceChange={setWalletBalance}
              isLoggedIn={isLoggedIn}
            />

            {/* Friends List */}
            <FriendsList isLoggedIn={isLoggedIn} />

            {/* Skin Customizer */}
            {/* <SkinCustomizer 
              selectedSkin={selectedSkin} 
              onSkinChange={setSelectedSkin} 
            />*/}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AppContent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
