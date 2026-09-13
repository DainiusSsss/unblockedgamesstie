import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_GAMES } from './data/defaultGames.js';
import { Header } from './components/Header.js';
import { CategoryBar } from './components/CategoryBar.js';
import { GameCard } from './components/GameCard.js';
import { GamePlayer } from './components/GamePlayer.js';
import { JsonModal } from './components/JsonModal.js';
import { AddGameModal } from './components/AddGameModal.js';
import { Sparkles, Shuffle, Flame, ShieldCheck, Terminal, Heart } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState(DEFAULT_GAMES);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('unblocked_favorites');
      return saved ? JSON.parse(saved) : ['snake', 'game-2048'];
    } catch {
      return ['snake', 'game-2048'];
    }
  });

  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load games from public/games.json and localStorage custom games
  useEffect(() => {
    async function loadGames() {
      try {
        const basePath = import.meta.env.BASE_URL || './';
        const jsonUrl = `${basePath.replace(/\/$/, '')}/games.json`;
        const res = await fetch(jsonUrl);
        if (res.ok) {
          const jsonGames = await res.json();
          // Load custom games from localStorage
          const savedCustom = localStorage.getItem('unblocked_custom_games');
          const customGames = savedCustom ? JSON.parse(savedCustom) : [];
          setGames([...customGames, ...jsonGames]);
          return;
        }
      } catch (err) {
        console.warn('Could not fetch games.json, using bundled defaults:', err);
      }

      // Fallback
      const savedCustom = localStorage.getItem('unblocked_custom_games');
      const customGames = savedCustom ? JSON.parse(savedCustom) : [];
      setGames([...customGames, ...DEFAULT_GAMES]);
    }

    loadGames();
  }, []);

  // Save favorites to localStorage
  const handleToggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('unblocked_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Add custom game
  const handleAddGame = (newGame) => {
    setGames((prev) => {
      const updated = [newGame, ...prev];
      const customOnly = updated.filter((g) => g.isCustom);
      localStorage.setItem('unblocked_custom_games', JSON.stringify(customOnly));
      return updated;
    });
    setSelectedGame(newGame);
  };

  // Delete custom game
  const handleDeleteCustom = (e, id) => {
    e.stopPropagation();
    setGames((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      const customOnly = updated.filter((g) => g.isCustom);
      localStorage.setItem('unblocked_custom_games', JSON.stringify(customOnly));
      return updated;
    });
    if (selectedGame?.id === id) {
      setSelectedGame(null);
    }
  };

  // Reset defaults
  const handleResetDefaults = () => {
    localStorage.removeItem('unblocked_custom_games');
    setGames(DEFAULT_GAMES);
    setIsJsonModalOpen(false);
  };

  // Random game launcher
  const handlePlayRandom = () => {
    if (games.length === 0) return;
    const randomIndex = Math.floor(Math.random() * games.length);
    setSelectedGame(games[randomIndex]);
  };

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Category filter
      if (selectedCategory === 'Favorites') {
        if (!favorites.includes(game.id)) return false;
      } else if (selectedCategory !== 'All' && game.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesCategory = game.category.toLowerCase().includes(query);
        const matchesDesc = game.description.toLowerCase().includes(query);
        const matchesControls = game.controls.toLowerCase().includes(query);
        return matchesTitle || matchesCategory || matchesDesc || matchesControls;
      }

      return true;
    });
  }, [games, selectedCategory, searchQuery, favorites]);

  // Featured game for top spotlight
  const featuredGame = useMemo(() => {
    return games.find((g) => g.isFeatured) || games[0];
  }, [games]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        gamesCount={games.length}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Spotlight Hero Banner */}
        {!searchQuery && selectedCategory === 'All' && featuredGame && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 p-6 sm:p-8">
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Featured Game
                </span>
                <span className="text-xs text-slate-400">• JSON-stored iframe</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {featuredGame.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {featuredGame.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedGame(featuredGame)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Play Featured Now
                </button>

                <button
                  onClick={handlePlayRandom}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <Shuffle className="w-4 h-4 text-cyan-400" /> Random Pick
                </button>
              </div>
            </div>

            {/* Subtle background graphics */}
            <div className="absolute right-4 bottom-4 sm:right-10 sm:top-1/2 sm:-translate-y-1/2 opacity-15 pointer-events-none text-cyan-400 font-mono text-xs hidden sm:block">
              <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/40 w-72 space-y-1 select-none">
                <div className="text-slate-500">// games.json entry</div>
                <div className="text-cyan-300">id: "{featuredGame.id}"</div>
                <div className="text-amber-300">iframe: "&lt;iframe src=...&gt;"</div>
                <div className="text-emerald-400">category: "{featuredGame.category}"</div>
              </div>
            </div>
          </div>
        )}

        {/* Category Navigation Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              favoritesCount={favorites.length}
            />
          </div>
        </div>

        {/* Games Grid Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <b className="text-slate-200">{filteredGames.length}</b> {filteredGames.length === 1 ? 'game' : 'games'}
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </span>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-cyan-400 hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelectGame={(g) => setSelectedGame(g)}
                  isFavorite={favorites.includes(game.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onDeleteCustom={handleDeleteCustom}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-200">No games found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No matching games found for your query or filter. Try clearing your search or add a custom iframe game!
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-md shadow-cyan-600/20"
                >
                  Add Custom Iframe Game
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-900">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">JSON-Backed Storage</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Every game's iframe is declared and loaded directly from <code className="text-cyan-400 font-mono">games.json</code>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Zero AI & Zero Tracker</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Pure HTML, JavaScript, and CSS gameplay. Clean sandboxed iframe execution with zero tracking.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Local Bookmarks & Custom Games</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Save favorites or paste any external &lt;iframe&gt; embed code to expand your unblocked catalog.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-900/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Unblocked Games</span>
            <span>•</span>
            <span>Pure HTML5, CSS & JS Iframe Portal</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              View games.json
            </button>
            <span>•</span>
            <span>Local & Sandbox Safe</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedGame && (
        <GamePlayer
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          isFavorite={favorites.includes(selectedGame.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <JsonModal
        games={games}
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        onResetDefaults={handleResetDefaults}
      />

      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />
    </div>
  );
}
