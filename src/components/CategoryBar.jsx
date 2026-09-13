import React from 'react';
import { Sparkles, Heart, Gamepad2, Puzzle, Flame, Clock, Trophy, Coffee } from 'lucide-react';

export const CategoryBar = ({
  selectedCategory,
  onSelectCategory,
  favoritesCount,
}) => {
  const categories = [
    { id: 'All', label: 'All Games', icon: Sparkles },
    { id: 'Favorites', label: `Favorites (${favoritesCount})`, icon: Heart, highlight: favoritesCount > 0 },
    { id: 'Arcade', label: 'Arcade', icon: Gamepad2 },
    { id: 'Puzzle', label: 'Puzzle', icon: Puzzle },
    { id: 'Action', label: 'Action', icon: Flame },
    { id: 'Retro', label: 'Retro', icon: Clock },
    { id: 'Sports', label: 'Sports', icon: Trophy },
    { id: 'Casual', label: 'Casual', icon: Coffee },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : cat.highlight ? 'text-rose-400' : 'text-slate-400'}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
