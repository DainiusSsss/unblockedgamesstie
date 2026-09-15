import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Music,
  Search,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc,
  ListMusic,
  Sparkles,
  Link,
  Flame,
  Radio,
  Clock,
  Check,
  RotateCcw,
  Headphones,
  ExternalLink,
  Library,
  Compass
} from 'lucide-react';

export const SPOTIFY_PLAYLIST_CATALOG = [
  // Top Hits & Global Charts
  {
    id: '37i9dQZF1DXcBWIGoYBM5M',
    name: "Today's Top Hits",
    category: 'Charts',
    description: 'The biggest songs in the world right now across all genres.',
    color: '#1db954',
    icon: Flame,
    likes: '34M'
  },
  {
    id: '37i9dQZEVXbMDoHDwVN2tF',
    name: 'Top 50 - Global',
    category: 'Charts',
    description: 'Your daily update of the most played tracks worldwide right now.',
    color: '#0ea5e9',
    icon: Disc,
    likes: '19M'
  },
  {
    id: '37i9dQZEVXbLRQDuF5jeBp',
    name: 'Top 50 - USA',
    category: 'Charts',
    description: 'The most popular songs in the United States today.',
    color: '#ef4444',
    icon: Flame,
    likes: '9.2M'
  },
  {
    id: '37i9dQZEVXbLiRSasKsNU9',
    name: 'Viral 50 - Global',
    category: 'Charts',
    description: 'Trending tracks exploding on social media and streaming charts.',
    color: '#f59e0b',
    icon: Sparkles,
    likes: '6.8M'
  },
  {
    id: '37i9dQZF1DX0kbLQ0whqHW',
    name: 'Mega Hit Mix',
    category: 'Charts',
    description: 'Non-stop global hits from the hottest artists.',
    color: '#8b5cf6',
    icon: Radio,
    likes: '8.4M'
  },

  // Hip-Hop & Rap
  {
    id: '37i9dQZF1DX0XUsuxWHRQd',
    name: 'RapCaviar',
    category: 'Hip-Hop',
    description: 'Heavyweight hip-hop playlist featuring Drake, Travis Scott, Kendrick, Future.',
    color: '#f59e0b',
    icon: Disc,
    likes: '16M'
  },
  {
    id: '37i9dQZF1DX2WmsMg0qLzF',
    name: 'Most Necessary',
    category: 'Hip-Hop',
    description: 'The official voice of the next generation of hip-hop.',
    color: '#f97316',
    icon: Flame,
    likes: '3.1M'
  },
  {
    id: '37i9dQZF1DWY4xHQp97bvN',
    name: 'Get Turnt',
    category: 'Hip-Hop',
    description: 'High-energy trap and rap bangers to turn up to.',
    color: '#dc2626',
    icon: Sparkles,
    likes: '7.5M'
  },
  {
    id: '37i9dQZF1DX186v583rmzp',
    name: '90s Hip-Hop Don',
    category: 'Hip-Hop',
    description: 'Golden era hip-hop: 2Pac, Biggie, Nas, Wu-Tang, Snoop Dogg.',
    color: '#eab308',
    icon: Disc,
    likes: '4.2M'
  },

  // Chill & Study
  {
    id: '37i9dQZF1DX4WYpdgoIcn6',
    name: 'Chill Hits',
    category: 'Chill',
    description: 'Relaxed, acoustic, and laid-back pop melodies for unwinding.',
    color: '#06b6d4',
    icon: Sparkles,
    likes: '8.9M'
  },
  {
    id: '37i9dQZF1DWWQRwui0ExPn',
    name: 'Lofi Beats',
    category: 'Chill',
    description: 'Beats to study, work, game, or relax to 24/7.',
    color: '#8b5cf6',
    icon: Headphones,
    likes: '5.6M'
  },
  {
    id: '37i9dQZF1DX4sWSpwq3LiO',
    name: 'Peaceful Piano',
    category: 'Chill',
    description: 'Peaceful solo piano pieces to help you focus or calm down.',
    color: '#3b82f6',
    icon: Music,
    likes: '7.1M'
  },
  {
    id: '37i9dQZF1DWZeKCadgRdKQ',
    name: 'Deep Focus',
    category: 'Chill',
    description: 'Atmospheric ambient and post-rock for deep productivity.',
    color: '#6366f1',
    icon: Disc,
    likes: '4.4M'
  },

  // Workout & Gym
  {
    id: '37i9dQZF1DX76Wlfdnj7AP',
    name: 'Beast Mode',
    category: 'Workout',
    description: 'Hard-hitting pump up tracks for max PRs and intense cardio.',
    color: '#ef4444',
    icon: Flame,
    likes: '10.2M'
  },
  {
    id: '37i9dQZF1DWWY64vgF9hzU',
    name: 'Gym Phonk & Drift',
    category: 'Workout',
    description: 'High octane phonk, cowbell, and bass drift beats for weightlifting.',
    color: '#a855f7',
    icon: Radio,
    likes: '4.9M'
  },
  {
    id: '37i9dQZF1DXe6bgvfg8GSp',
    name: 'Cardio Workout',
    category: 'Workout',
    description: 'Upbeat 128-140 BPM dance tracks to keep your heart rate soaring.',
    color: '#ec4899',
    icon: Flame,
    likes: '3.6M'
  },

  // Pop & Dance
  {
    id: '37i9dQZF1DWUa8ZRTfalHk',
    name: 'Pop Rising',
    category: 'Pop',
    description: 'Who is next in pop music. Fresh new chart toppers.',
    color: '#ec4899',
    icon: Radio,
    likes: '3.3M'
  },
  {
    id: '37i9dQZF1DXa2PvUpywmrr',
    name: 'Dance Party Hits',
    category: 'Pop',
    description: 'House, EDM, and festival dance floor anthems.',
    color: '#10b981',
    icon: Sparkles,
    likes: '6.7M'
  },
  {
    id: '37i9dQZF1DXcZDD7cfEKhW',
    name: 'Pop Remixes',
    category: 'Pop',
    description: 'Your favorite pop radio singles reimagined by world-class DJs.',
    color: '#06b6d4',
    icon: Disc,
    likes: '2.8M'
  },

  // Rock & Metal
  {
    id: '37i9dQZF1DX1rVvRgjXZwF',
    name: 'Rock Classics',
    category: 'Rock',
    description: 'Iconic rock anthems from Queen, Led Zeppelin, AC/DC, Nirvana.',
    color: '#e11d48',
    icon: Music,
    likes: '12.4M'
  },
  {
    id: '37i9dQZF1DX3oM43CtKnRV',
    name: '00s Rock Anthems',
    category: 'Rock',
    description: 'Linkin Park, Green Day, Blink-182, Evanescence, Paramore.',
    color: '#3b82f6',
    icon: Disc,
    likes: '5.1M'
  },
  {
    id: '37i9dQZF1DWZBC2zrIPCFS',
    name: 'Alternative 90s',
    category: 'Rock',
    description: 'Grunge, Britpop, and alternative hits that defined a decade.',
    color: '#64748b',
    icon: Radio,
    likes: '3.8M'
  },

  // Gaming & Electronic
  {
    id: '37i9dQZF1DXdfO2leQAh30',
    name: 'Gaming Beats',
    category: 'Gaming',
    description: 'Electronic, synthwave, and trap beats curated for clutch gaming sessions.',
    color: '#10b981',
    icon: Headphones,
    likes: '2.9M'
  },
  {
    id: '37i9dQZF1DXdLEN7aqioXM',
    name: 'Synthwave / RetroWave',
    category: 'Gaming',
    description: 'Nostalgic 80s analog synthesizers and neon night drives.',
    color: '#d946ef',
    icon: Sparkles,
    likes: '2.4M'
  },
  {
    id: '37i9dQZF1DX4dyzvuaRJ0n',
    name: 'Electronic Circus',
    category: 'Gaming',
    description: 'Bass-boosted EDM, Dubstep, and Trap to fuel high APM games.',
    color: '#f97316',
    icon: Flame,
    likes: '1.9M'
  },

  // Mood & Nostalgia
  {
    id: '37i9dQZF1DX4o1oenSJRJd',
    name: 'All Out 00s',
    category: 'Throwback',
    description: 'The defining pop, R&B, and rap hits from the 2000s.',
    color: '#eab308',
    icon: Clock,
    likes: '13M'
  },
  {
    id: '37i9dQZF1DX5Ejj0EkURtP',
    name: 'All Out 2010s',
    category: 'Throwback',
    description: 'The soundtrack of the 2010s: EDM, trap pop, and modern classics.',
    color: '#14b8a6',
    icon: Disc,
    likes: '11M'
  },
  {
    id: '37i9dQZF1DXbTxeAdrVG2l',
    name: 'All Out 90s',
    category: 'Throwback',
    description: 'Nostalgic 90s pop, boy bands, and Eurodance favorites.',
    color: '#ec4899',
    icon: Radio,
    likes: '8.1M'
  },

  // Global & Anime
  {
    id: '37i9dQZF1DX11gh2t2b2i0',
    name: 'Anime Hits & Openings',
    category: 'Anime',
    description: 'J-Rock, anime OPs, and epic soundtrack themes (Jujutsu Kaisen, AOT, Naruto).',
    color: '#ec4899',
    icon: Sparkles,
    likes: '2.7M'
  },
  {
    id: '37i9dQZF1DX9tPFwDMOaN1',
    name: 'K-Pop ON! (대박)',
    category: 'Global',
    description: 'The global pulse of K-Pop: BTS, BLACKPINK, NewJeans, Stray Kids.',
    color: '#8b5cf6',
    icon: Radio,
    likes: '6.2M'
  },
  {
    id: '37i9dQZF1DX10zKzsJ2jva',
    name: 'Viva Latino',
    category: 'Global',
    description: 'Hot Latin hits: Reggaeton, Latin Trap, and Pop.',
    color: '#ef4444',
    icon: Flame,
    likes: '14M'
  }
];

export const SpotifyPlayer = () => {
  const [activeTab, setActiveTab] = useState('playlists'); // 'playlists' | 'songs' | 'custom'
  const [activeEmbedUrl, setActiveEmbedUrl] = useState(
    'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M'
  );
  const [currentPlaylist, setCurrentPlaylist] = useState(SPOTIFY_PLAYLIST_CATALOG[0]);
  const [playlistCategory, setPlaylistCategory] = useState('All');

  // Playlist search state
  const [playlistSearchQuery, setPlaylistSearchQuery] = useState('');

  // Song search state
  const [songSearchQuery, setSongSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Audio preview playback state
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const [audioVolume, setAudioVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Custom link input
  const [customLinkInput, setCustomLinkInput] = useState('');
  const [linkSuccess, setLinkSuccess] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(SPOTIFY_PLAYLIST_CATALOG.map((p) => p.category))];
    return cats;
  }, []);

  // Filter playlists dynamically based on search query and category
  const filteredPlaylists = useMemo(() => {
    const q = playlistSearchQuery.trim().toLowerCase();
    return SPOTIFY_PLAYLIST_CATALOG.filter((p) => {
      const matchCat = playlistCategory === 'All' || p.category === playlistCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [playlistSearchQuery, playlistCategory]);

  // Load a playlist
  const handleSelectPlaylist = (playlist) => {
    setCurrentPlaylist(playlist);
    setActiveEmbedUrl(`https://open.spotify.com/embed/playlist/${playlist.id}`);
  };

  // Handle iTunes Song Search for 30s Audio Previews
  const handleSongSearch = async (queryToSearch) => {
    const term = queryToSearch || songSearchQuery;
    if (!term.trim()) return;

    setIsSearching(true);
    setSearchError('');
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          term.trim()
        )}&media=music&entity=song&limit=30`
      );
      if (!res.ok) throw new Error('Search request failed');
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setSearchError('Could not fetch song results. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Play audio preview
  const handlePlayPreview = (track) => {
    if (playingTrackId === track.trackId && isPlayingAudio) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlayingAudio(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const newAudio = new Audio(track.previewUrl);
    newAudio.volume = isMuted ? 0 : audioVolume;
    audioRef.current = newAudio;

    newAudio.onended = () => {
      setIsPlayingAudio(false);
      setPlayingTrackId(null);
    };

    newAudio
      .play()
      .then(() => {
        setIsPlayingAudio(true);
        setPlayingTrackId(track.trackId);
        setCurrentAudio(track);
      })
      .catch((err) => {
        console.warn('Playback error:', err);
      });
  };

  // Handle custom Spotify link / ID
  const handleLoadCustomLink = (e) => {
    e?.preventDefault();
    if (!customLinkInput.trim()) return;

    let input = customLinkInput.trim();
    let embedUrl = '';

    if (input.includes('spotify.com/')) {
      const parts = input.split('spotify.com/');
      if (parts[1]) {
        let cleanPath = parts[1].split('?')[0];
        embedUrl = `https://open.spotify.com/embed/${cleanPath}`;
      }
    } else if (input.startsWith('spotify:')) {
      const parts = input.split(':');
      if (parts.length >= 3) {
        embedUrl = `https://open.spotify.com/embed/${parts[1]}/${parts[2]}`;
      }
    } else if (/^[0-9A-Za-z]{22}$/.test(input)) {
      embedUrl = `https://open.spotify.com/embed/playlist/${input}`;
    }

    if (embedUrl) {
      setActiveEmbedUrl(embedUrl);
      setCurrentPlaylist({
        id: 'custom',
        name: 'Custom Loaded Playlist',
        category: 'Custom',
        description: 'User specified Spotify stream',
        color: '#1db954',
        icon: Disc
      });
      setLinkSuccess(true);
      setTimeout(() => setLinkSuccess(false), 3000);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 flex flex-col text-white select-none overflow-hidden">
      {/* Top Spotify Header & Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Brand & Current Playlist Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Music className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-100 truncate">
                {currentPlaylist ? currentPlaylist.name : 'Spotify Player'}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 border border-emerald-800 text-emerald-400 shrink-0">
                Active Embed
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate hidden md:block">
              {currentPlaylist?.description || 'Browse, search playlists, or stream audio'}
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('playlists')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'playlists'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>Search Playlists ({filteredPlaylists.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('songs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'songs'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Songs</span>
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'custom'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Paste Link</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Interactive Search & Directory Panels */}
        <div className="w-full md:w-[380px] lg:w-[420px] bg-slate-900/60 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0 h-[260px] md:h-full overflow-hidden">
          {/* TAB 1: PLAYLIST SEARCH & BROWSER */}
          {activeTab === 'playlists' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Playlist Search Bar */}
              <div className="p-3 border-b border-slate-800 space-y-2 shrink-0 bg-slate-900/80">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={playlistSearchQuery}
                    onChange={(e) => setPlaylistSearchQuery(e.target.value)}
                    placeholder="Search 40+ playlists (rap, lofi, rock, gym, hits)..."
                    className="w-full pl-9 pr-8 py-1.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {playlistSearchQuery && (
                    <button
                      onClick={() => setPlaylistSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Categories filter pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPlaylistCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                        playlistCategory === cat
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Playlists Results List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {filteredPlaylists.length === 0 ? (
                  <div className="text-center py-10 px-4">
                    <ListMusic className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 font-semibold">No playlists matched "{playlistSearchQuery}"</p>
                    <p className="text-[11px] text-slate-500 mt-1">Try searching for "hits", "chill", "workout", or clear the filter.</p>
                  </div>
                ) : (
                  filteredPlaylists.map((playlist) => {
                    const isSelected = currentPlaylist?.id === playlist.id;
                    const IconComp = playlist.icon || Music;
                    return (
                      <button
                        key={playlist.id}
                        onClick={() => handleSelectPlaylist(playlist)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 group ${
                          isSelected
                            ? 'bg-emerald-950/50 border-emerald-500/60 shadow-md shadow-emerald-950/50'
                            : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow"
                          style={{ backgroundColor: `${playlist.color}25`, color: playlist.color }}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-emerald-300' : 'text-slate-200'}`}>
                              {playlist.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0">
                              {playlist.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {playlist.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE SONG SEARCH & PREVIEWS */}
          {activeTab === 'songs' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-3 border-b border-slate-800 space-y-2 shrink-0 bg-slate-900/80">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSongSearch();
                  }}
                  className="flex gap-2"
                >
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={songSearchQuery}
                      onChange={(e) => setSongSearchQuery(e.target.value)}
                      placeholder="Search any song or artist..."
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shrink-0 disabled:opacity-50"
                  >
                    {isSearching ? '...' : 'Search'}
                  </button>
                </form>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {['Drake', 'Taylor Swift', 'Travis Scott', 'Billie Eilish', 'The Weeknd'].map((artist) => (
                    <button
                      key={artist}
                      onClick={() => {
                        setSongSearchQuery(artist);
                        handleSongSearch(artist);
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 text-[10px] whitespace-nowrap"
                    >
                      {artist}
                    </button>
                  ))}
                </div>
              </div>

              {/* Songs List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {isSearching ? (
                  <div className="text-center py-10">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Searching global song library...</p>
                  </div>
                ) : searchError ? (
                  <div className="text-center py-8 text-xs text-red-400">{searchError}</div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-10 px-4">
                    <Music className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 font-semibold">Search for any song, artist, or album</p>
                    <p className="text-[11px] text-slate-500 mt-1">Play live 30s previews or stream in Spotify.</p>
                  </div>
                ) : (
                  searchResults.map((track) => {
                    const isTrackPlaying = isPlayingAudio && playingTrackId === track.trackId;
                    return (
                      <div
                        key={track.trackId}
                        className={`p-2 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${
                          isTrackPlaying
                            ? 'bg-emerald-950/40 border-emerald-500/50'
                            : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={track.artworkUrl60 || track.artworkUrl100}
                            alt={track.trackName}
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-800"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-200 truncate">{track.trackName}</h4>
                            <p className="text-[11px] text-slate-400 truncate">{track.artistName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {track.previewUrl && (
                            <button
                              onClick={() => handlePlayPreview(track)}
                              className={`p-2 rounded-lg transition-all ${
                                isTrackPlaying
                                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                              }`}
                              title={isTrackPlaying ? 'Pause preview' : 'Play audio preview'}
                            >
                              {isTrackPlaying ? <Pause className="w-3.5 h-3.5 fill-slate-950" /> : <Play className="w-3.5 h-3.5 fill-slate-200" />}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM SPOTIFY LINK / ID */}
          {activeTab === 'custom' && (
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                  Load Any Spotify Link or Playlist
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Paste any Spotify playlist, album, artist, or track link to stream it directly inside the app.
                </p>
              </div>

              <form onSubmit={handleLoadCustomLink} className="space-y-3">
                <input
                  type="text"
                  value={customLinkInput}
                  onChange={(e) => setCustomLinkInput(e.target.value)}
                  placeholder="https://open.spotify.com/playlist/..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  Load into Player
                </button>
              </form>

              {linkSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Playlist successfully loaded into player!</span>
                </div>
              )}
            </div>
          )}

          {/* Active Track Audio Player Bar (if preview is playing) */}
          {currentAudio && (
            <div className="p-2.5 bg-slate-950 border-t border-slate-800 shrink-0 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-200 truncate">{currentAudio.trackName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{currentAudio.artistName}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-slate-200"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    if (audioRef.current) audioRef.current.pause();
                    setIsPlayingAudio(false);
                    setCurrentAudio(null);
                  }}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Stop
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Spotify Official Embed Frame */}
        <div className="flex-1 bg-black relative flex flex-col min-w-0 h-[300px] md:h-full">
          <iframe
            src={activeEmbedUrl}
            title="Spotify Stream Player"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full h-full flex-1 border-0"
          />
        </div>
      </div>
    </div>
  );
};
