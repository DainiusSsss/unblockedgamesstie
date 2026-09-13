import React from 'react';
import {
  Sparkles,
  Heart,
  Gamepad2,
  Puzzle,
  Flame,
  Clock,
  Trophy,
  Coffee,
  Smartphone,
  Globe,
  Video,
  Music,
  Tv,
  Bot,
  Shield,
  Film,
} from 'lucide-react';

export const CategoryBar = ({
  activeSection = 'games',
  selectedCategory,
  onSelectCategory,
  favoritesCount,
  onSwitchSection,
  appsCount = 1,
}) => {
  const gameCategories = [
    { id: 'All', label: 'All Games', icon: Sparkles },
    { id: 'Favorites', label: `Favorites (${favoritesCount})`, icon: Heart, highlight: favoritesCount > 0 },
    { id: 'Action', label: 'Action & Pursuits', icon: Flame },
    { id: 'Sports', label: 'Sports & Racing', icon: Trophy },
    { id: 'Arcade', label: 'Arcade', icon: Gamepad2 },
    { id: 'Retro', label: 'Retro', icon: Clock },
    { id: 'Casual', label: 'Casual & IO', icon: Coffee },
    { id: 'Puzzle', label: 'Puzzle', icon: Puzzle },
  ];

  const appCategories = [
    { id: 'All', label: 'All Apps', icon: Smartphone },
    { id: 'Favorites', label: `Favorites (${favoritesCount})`, icon: Heart, highlight: favoritesCount > 0 },
    { id: 'Social', label: 'Social & Media', icon: Video },
    { id: 'Entertainment', label: 'Movies & TV', icon: Film },
    { id: 'Music', label: 'Music & Audio', icon: Music },
    { id: 'AI & Tools', label: 'AI & Productivity', icon: Bot },
    { id: 'Streaming', label: 'Streaming', icon: Tv },
    { id: 'Gaming', label: 'Cloud Gaming', icon: Gamepad2 },
    { id: 'Sports', label: 'Sports', icon: Trophy },
    { id: 'Utilities', label: 'Unblock & Tools', icon: Shield },
  ];

  const categories = activeSection === 'apps' ? appCategories : gameCategories;

  return (
    <div className="flex items-center justify-between gap-3 w-full overflow-x-auto pb-1 scrollbar-none">
      <div className="flex items-center gap-2 shrink-0">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? activeSection === 'apps'
                    ? 'bg-pink-500 text-slate-950 shadow-md shadow-pink-500/20 font-bold'
                    : 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : cat.highlight ? 'text-rose-400' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {onSwitchSection && (
        <div className="shrink-0 pl-2 border-l border-slate-800">
          <button
            onClick={() => onSwitchSection(activeSection === 'games' ? 'apps' : 'games')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeSection === 'games'
                ? 'bg-pink-950/40 text-pink-400 border-pink-800/60 hover:bg-pink-900/50'
                : 'bg-cyan-950/40 text-cyan-400 border-cyan-800/60 hover:bg-cyan-900/50'
            }`}
          >
            {activeSection === 'games' ? (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Go to Apps ({appsCount})</span>
              </>
            ) : (
              <>
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Back to Games</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
