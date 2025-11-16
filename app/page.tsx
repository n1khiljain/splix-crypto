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
import { Gamepad2, Lock } from 'lucide-react';

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

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, goerli],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export default function App() {
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

  const handleJoinGame = () => {
    // Mock joining game
    alert(`Joining game as ${username} with skin color ${selectedSkin}!`);
  };

  const canJoinGame = isLoggedIn && hasUsername;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
        <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} username={username} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Join Game Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 shadow-2xl">
              <h2 className="text-white text-3xl mb-4">Ready to Play?</h2>
              <p className="text-purple-100 mb-6">
                Join a match and start conquering territory. Every square you claim earns you crypto!
              </p>
              {!canJoinGame && (
                <p className="text-purple-200 text-sm mb-4 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {!isLoggedIn 
                    ? 'Please login and complete setup to join the game'
                    : 'Please complete your profile setup below to join the game'
                  }
                </p>
              )}
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleJoinGame}
                disabled={!canJoinGame}
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                {canJoinGame ? 'Join Game' : 'Login Required'}
              </Button>
            </div>

            {/* Onboarding Card - Show when not setup */}
            {isLoggedIn && !hasUsername && (
              <OnboardingCard onComplete={handleOnboardingComplete} />
            )}

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
            <SkinCustomizer 
              selectedSkin={selectedSkin} 
              onSkinChange={setSelectedSkin} 
            />
          </div>
        </div>
      </main>
      </div>
    </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

    
  );
}
