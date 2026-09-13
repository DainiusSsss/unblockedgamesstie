import React from 'react';
import { Play, Heart, Star, Users, ExternalLink, Trash2, Smartphone } from 'lucide-react';
import { GameIcon } from './GameIcon.js';

export const AppCard = ({
  app,
  onSelectApp,
  isFavorite,
  onToggleFavorite,
  onDeleteCustom,
}) => {
  const accent = app.accentColor || '#00f2fe';

  return (
    <div
      onClick={() => onSelectApp(app)}
      className="group relative bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top bar: Category & Favorite */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60 flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-cyan-400" />
              {app.category || 'App'}
            </span>
            {app.badge && (
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase text-white shadow-sm"
                style={{ backgroundColor: accent }}
              >
                {app.badge}
              </span>
            )}
            {app.isCustom && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                Custom App
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {app.isCustom && onDeleteCustom && (
              <button
                onClick={(e) => onDeleteCustom(e, app.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Delete custom app"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => onToggleFavorite(e, app.id)}
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

        {/* App Banner Preview Area */}
        <div
          className="relative w-full h-36 rounded-xl flex items-center justify-center overflow-hidden mb-4 border border-slate-800/80"
          style={{
            background: `radial-gradient(circle at center, ${accent}25 0%, #030712 100%)`
          }}
        >
          {/* Accent glow & app icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: accent,
              boxShadow: `0 10px 25px -5px ${accent}40`
            }}
          >
            <GameIcon name={app.icon || 'Video'} className="w-8 h-8 text-slate-950" />
          </div>

          {/* Overlay hover launch button */}
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <div className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Open in Iframe</span>
            </div>

            {app.iframeSrc && (
              <a
                href={app.webUrl || app.iframeSrc}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs shadow-md"
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-slate-100 text-lg group-hover:text-cyan-400 transition-colors">
            {app.title}
          </h3>
          <span className="text-[11px] font-mono text-cyan-400/90 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-900/60 shrink-0">
            iframe
          </span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {app.description}
        </p>
      </div>

      {/* Footer Stats & Quick Launch */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-semibold text-slate-200">{app.rating || '4.9'}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Users className="w-3.5 h-3.5" />
            <span>{app.plays || '500K'} visits</span>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-cyan-400 group-hover:underline">
          Launch App &rarr;
        </span>
      </div>
    </div>
  );
};
