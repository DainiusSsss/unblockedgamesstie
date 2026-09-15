import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_GAMES } from './data/defaultGames.js';
import { DEFAULT_APPS } from './data/defaultApps.js';
import { Header } from './components/Header.js';
import { CategoryBar } from './components/CategoryBar.js';
import { GameCard } from './components/GameCard.js';
import { AppCard } from './components/AppCard.js';
import { GamePlayer } from './components/GamePlayer.js';
import { JsonModal } from './components/JsonModal.js';
import { AddGameModal } from './components/AddGameModal.js';
import { Sparkles, Shuffle, Flame, ShieldCheck, Terminal, Heart, Smartphone, ExternalLink, Play, Video } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('games'); // 'games' | 'apps'
  const [games, setGames] = useState(DEFAULT_GAMES);
  const [apps, setApps] = useState(DEFAULT_APPS);
  const [selectedItem, setSelectedItem] = useState(null); // either game or app
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('unblocked_favorites');
      return saved ? JSON.parse(saved) : ['escape-road-3', 'eaglercraft-1-8-8', 'tiktok'];
    } catch {
      return ['escape-road-3', 'eaglercraft-1-8-8', 'tiktok'];
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
          const savedCustom = localStorage.getItem('unblocked_custom_games');
          const customGames = savedCustom ? JSON.parse(savedCustom) : [];
          const jsonIds = new Set(jsonGames.map((g) => g.id));
          const uniqueCustom = customGames.filter((g) => !jsonIds.has(g.id));
          setGames([...uniqueCustom, ...jsonGames]);
          return;
        }
      } catch (err) {
        console.warn('Could not fetch games.json, using bundled defaults:', err);
      }

      // Fallback
      const savedCustom = localStorage.getItem('unblocked_custom_games');
      const customGames = savedCustom ? JSON.parse(savedCustom) : [];
      const defaultIds = new Set(DEFAULT_GAMES.map((g) => g.id));
      const uniqueCustom = customGames.filter((g) => !defaultIds.has(g.id));
      setGames([...uniqueCustom, ...DEFAULT_GAMES]);
    }

    async function loadApps() {
      try {
        const basePath = import.meta.env.BASE_URL || './';
        const jsonUrl = `${basePath.replace(/\/$/, '')}/apps.json`;
        const res = await fetch(jsonUrl);
        if (res.ok) {
          const jsonApps = await res.json();
          const savedCustomApps = localStorage.getItem('unblocked_custom_apps');
          const customApps = savedCustomApps ? JSON.parse(savedCustomApps) : [];
          const jsonIds = new Set(jsonApps.map((a) => a.id));
          const uniqueCustom = customApps.filter((a) => !jsonIds.has(a.id));
          setApps([...uniqueCustom, ...jsonApps]);
          return;
        }
      } catch (err) {
        console.warn('Could not fetch apps.json, using bundled default apps:', err);
      }

      // Fallback for apps
      const savedCustomApps = localStorage.getItem('unblocked_custom_apps');
      const customApps = savedCustomApps ? JSON.parse(savedCustomApps) : [];
      const defaultIds = new Set(DEFAULT_APPS.map((a) => a.id));
      const uniqueCustom = customApps.filter((a) => !defaultIds.has(a.id));
      setApps([...uniqueCustom, ...DEFAULT_APPS]);
    }

    loadGames();
    loadApps();
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

  // Add custom game or app
  const handleAddEntry = (newEntry) => {
    if (newEntry.isApp) {
      setApps((prev) => {
        const updated = [newEntry, ...prev];
        const customOnly = updated.filter((a) => a.isCustom);
        localStorage.setItem('unblocked_custom_apps', JSON.stringify(customOnly));
        return updated;
      });
      setActiveSection('apps');
    } else {
      setGames((prev) => {
        const updated = [newEntry, ...prev];
        const customOnly = updated.filter((g) => g.isCustom);
        localStorage.setItem('unblocked_custom_games', JSON.stringify(customOnly));
        return updated;
      });
      setActiveSection('games');
    }
    setSelectedItem(newEntry);
  };

  // Delete custom game or app
  const handleDeleteCustom = (e, id) => {
    e.stopPropagation();
    if (activeSection === 'apps') {
      setApps((prev) => {
        const updated = prev.filter((a) => a.id !== id);
        const customOnly = updated.filter((a) => a.isCustom);
        localStorage.setItem('unblocked_custom_apps', JSON.stringify(customOnly));
        return updated;
      });
    } else {
      setGames((prev) => {
        const updated = prev.filter((g) => g.id !== id);
        const customOnly = updated.filter((g) => g.isCustom);
        localStorage.setItem('unblocked_custom_games', JSON.stringify(customOnly));
        return updated;
      });
    }
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  // Reset defaults
  const handleResetDefaults = () => {
    localStorage.removeItem('unblocked_custom_games');
    localStorage.removeItem('unblocked_custom_apps');
    localStorage.removeItem('unblocked_favorites');
    setFavorites([]);
    setGames(DEFAULT_GAMES);
    setApps(DEFAULT_APPS);
    setIsJsonModalOpen(false);
  };

  // Random game or app launcher
  const handlePlayRandom = () => {
    const list = activeSection === 'apps' ? apps : games;
    if (list.length === 0) return;
    const randomIndex = Math.floor(Math.random() * list.length);
    setSelectedItem(list[randomIndex]);
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
        const matchesControls = (game.controls || '').toLowerCase().includes(query);
        return matchesTitle || matchesCategory || matchesDesc || matchesControls;
      }

      return true;
    });
  }, [games, selectedCategory, searchQuery, favorites]);

  // Filtered apps
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      // Category filter
      if (selectedCategory === 'Favorites') {
        if (!favorites.includes(app.id)) return false;
      } else if (selectedCategory !== 'All' && app.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = app.title.toLowerCase().includes(query);
        const matchesCategory = (app.category || '').toLowerCase().includes(query);
        const matchesDesc = (app.description || '').toLowerCase().includes(query);
        return matchesTitle || matchesCategory || matchesDesc;
      }

      return true;
    });
  }, [apps, selectedCategory, searchQuery, favorites]);

  // Featured game for top spotlight
  const featuredGame = useMemo(() => {
    return games.find((g) => g.isFeatured) || games[0];
  }, [games]);

  // Featured app (TikTok) for apps spotlight
  const featuredApp = useMemo(() => {
    return apps.find((a) => a.id === 'tiktok') || apps[0];
  }, [apps]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Header with Games vs Apps toggle */}
      <Header
        activeSection={activeSection}
        setActiveSection={(sec) => {
          setActiveSection(sec);
          setSelectedCategory('All');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        gamesCount={games.length}
        appsCount={apps.length}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Spotlight Hero Banner for Games */}
        {activeSection === 'games' && !searchQuery && selectedCategory === 'All' && featuredGame && (
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
                  onClick={() => setSelectedItem(featuredGame)}
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

        {/* Spotlight Hero Banner for Apps Section */}
        {activeSection === 'apps' && !searchQuery && selectedCategory === 'All' && featuredApp && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-pink-950/40 border border-slate-800 p-6 sm:p-8">
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" /> Web Apps Portal
                </span>
                <span className="text-xs text-slate-400">• Sandboxed Web Applications</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <span>{featuredApp.title}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-600 text-white">
                  Trending
                </span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {featuredApp.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedItem(featuredApp)}
                  className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-sm shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-slate-950" /> Launch {featuredApp.title}
                </button>
              </div>
            </div>

            {/* Subtle visual branding element */}
            <div className="absolute right-6 bottom-4 sm:right-12 sm:top-1/2 sm:-translate-y-1/2 opacity-20 pointer-events-none hidden sm:block">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-2xl">
                <Video className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Category Navigation Bar */}
        <div className="space-y-4">
          <CategoryBar
            activeSection={activeSection}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            favoritesCount={favorites.length}
            onSwitchSection={(sec) => {
              setActiveSection(sec);
              setSelectedCategory('All');
            }}
            appsCount={apps.length}
          />
        </div>

        {/* Games or Apps Grid Section */}
        {activeSection === 'games' ? (
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
                    onSelectGame={(g) => setSelectedItem(g)}
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
                <h3 className="text-base font-bold text-slate-200">
                  {games.length === 0 ? 'No games in library' : 'No matching games found'}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {games.length === 0
                    ? 'All games have been removed. You can add games anytime using the "Add Game" button or paste iframe games in the JSON database.'
                    : 'No games match your active search or category filter. Try clearing your search or filter.'}
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
                    Add Game
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Apps Grid Section */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                Showing <b className="text-slate-200">{filteredApps.length}</b> {filteredApps.length === 1 ? 'web app' : 'web apps'}
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </span>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-pink-400 hover:underline"
                >
                  Clear Search
                </button>
              )}
            </div>

            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filteredApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onSelectApp={(a) => setSelectedItem(a)}
                    isFavorite={favorites.includes(app.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onDeleteCustom={handleDeleteCustom}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-pink-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-200">
                  {apps.length === 0 ? 'No apps in library' : 'No matching apps found'}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {apps.length === 0
                    ? 'No apps currently stored. Click "Add App" to add TikTok or another web application.'
                    : 'No apps match your active search query. Try clearing your search.'}
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
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-xs font-semibold text-white shadow-md shadow-pink-600/20"
                  >
                    Add Web App
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Feature Highlights bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-900">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">JSON-Backed Catalog</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Every game and app iframe is configured in <code className="text-cyan-400 font-mono">games.json</code> & <code className="text-pink-400 font-mono">apps.json</code>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Zero AI & Sandboxed Execution</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Pure HTML5, CSS & JS gameplay. Clean sandboxed iframe execution with full-screen support.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Local Bookmarks & Custom Embeds</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Save favorites or paste any external &lt;iframe&gt; embed to expand your games and apps library.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-900/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Unblocked Portal</span>
            <span>•</span>
            <span>Games & Web Apps Iframe Container</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              View JSON Data
            </button>
            <span>•</span>
            <span>Local & Sandbox Safe</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedItem && (
        <GamePlayer
          game={selectedItem}
          onClose={() => setSelectedItem(null)}
          isFavorite={favorites.includes(selectedItem.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <JsonModal
        games={games}
        apps={apps}
        defaultDataset={activeSection}
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        onResetDefaults={handleResetDefaults}
      />

      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddEntry}
        defaultSection={activeSection}
      />
    </div>
  );
}
