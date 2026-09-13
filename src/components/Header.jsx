import React from 'react';
import { Gamepad2, Search, FileJson, Plus, Sparkles, X } from 'lucide-react';

export const Header = ({
  searchQuery,
  setSearchQuery,
  onOpenJsonModal,
  onOpenAddModal,
  gamesCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-100 tracking-tight">Unblocked Games</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                JSON Powered
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Iframe arcade running locally & in browser</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search games by title, genre, controls..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenJsonModal}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            title="Inspect & Edit games.json"
          >
            <FileJson className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">JSON Data</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Add a custom game with iframe"
          >
            <Plus className="w-4 h-4" />
            <span>Add Iframe Game</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{gamesCount} Games</span>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search games..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
