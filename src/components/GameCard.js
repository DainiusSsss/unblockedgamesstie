import React from 'react';
import { Play, Heart, Star, Users, Trash2 } from 'lucide-react';
import { GameIcon } from './GameIcon.js';

export const GameCard = ({
  game,
  onSelectGame,
  isFavorite,
  onToggleFavorite,
  onDeleteCustom,
}) => {
  const accent = game.accentColor || '#06b6d4';

  return (
    <div
      onClick={() => onSelectGame(game)}
      className="group relative bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top bar: Category & Favorite */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
              {game.category}
            </span>
            {game.badge && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase text-white"
                style={{ backgroundColor: accent }}
              >
                {game.badge}
              </span>
            )}
            {game.isCustom && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                Custom
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {game.isCustom && onDeleteCustom && (
              <button
                onClick={(e) => onDeleteCustom(e, game.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Delete custom game"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => onToggleFavorite(e, game.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-rose-500 bg-rose-950/40 border border-rose-800/50'
                  : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Thumbnail Preview Area */}
        <div
          className="relative w-full h-32 rounded-xl flex items-center justify-center overflow-hidden mb-3.5 border border-slate-800"
          style={{
            background: `radial-gradient(circle at center, ${accent}22 0%, #090d16 100%)`
          }}
        >
          {/* Accent glow */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: accent }}
          >
            <GameIcon name={game.icon} className="w-8 h-8 text-white" />
          </div>

          {/* Overlay hover play button */}
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Launch Game</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <h3 className="font-bold text-slate-100 text-base mb-1 group-hover:text-cyan-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Footer Stats & Button */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-semibold text-slate-200">{game.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{game.plays}</span>
          </div>
        </div>

        <span className="text-[11px] font-medium text-cyan-400/90 group-hover:underline flex items-center gap-1">
          Play <Play className="w-2.5 h-2.5 fill-cyan-400" />
        </span>
      </div>
    </div>
  );
};
