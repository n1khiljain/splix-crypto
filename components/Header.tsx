import { Button } from './ui/button';
import { LogIn } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  username: string;
}

export function Header({ isLoggedIn, onLogin, username }: HeaderProps) {
  return (
    <header className="border-b border-purple-500/30 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center text-3xl"></div>
          <h1 className="text-white text-2xl">Splix.io Part 2</h1>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn && username && (
            <span className="text-purple-300">Welcome, {username}!</span>
          )}
          {!isLoggedIn && (
            <Button 
              variant="outline" 
              className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
              onClick={onLogin}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}