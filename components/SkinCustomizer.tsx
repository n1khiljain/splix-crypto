import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Palette } from 'lucide-react';

interface SkinCustomizerProps {
  selectedSkin: string;
  onSkinChange: (color: string) => void;
}

const skinColors = [
  { name: 'Ocean Blue', color: '#3b82f6' },
  { name: 'Cyber Purple', color: '#a855f7' },
  { name: 'Neon Pink', color: '#ec4899' },
  { name: 'Toxic Green', color: '#10b981' },
  { name: 'Solar Orange', color: '#f97316' },
  { name: 'Electric Yellow', color: '#eab308' },
  { name: 'Blood Red', color: '#ef4444' },
  { name: 'Mint Teal', color: '#14b8a6' },
];

export function SkinCustomizer({ selectedSkin, onSkinChange }: SkinCustomizerProps) {
  return (
    <Card className="bg-slate-800/90 border-purple-500/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Palette className="h-5 w-5 text-purple-400" />
          Customize Skin
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Preview */}
        <div className="bg-slate-900/50 rounded-lg p-4 flex items-center justify-center">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-lg shadow-lg transition-all duration-300"
              style={{ backgroundColor: selectedSkin }}
            />
            <div className="absolute inset-0 rounded-lg border-2 border-white/20" />
          </div>
        </div>

        {/* Color Selection */}
        <div className="grid grid-cols-4 gap-2">
          {skinColors.map((skin) => (
            <button
              key={skin.color}
              onClick={() => onSkinChange(skin.color)}
              className={`group relative aspect-square rounded-lg transition-all hover:scale-110 ${
                selectedSkin === skin.color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : ''
              }`}
              style={{ backgroundColor: skin.color }}
              title={skin.name}
            >
              {selectedSkin === skin.color && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs">
          {skinColors.find(s => s.color === selectedSkin)?.name || 'Custom Color'}
        </p>
      </CardContent>
    </Card>
  );
}