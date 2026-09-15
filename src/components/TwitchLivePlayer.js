import React, { useState, useMemo } from 'react';
import {
  Radio,
  Tv,
  Gamepad2,
  Search,
  Sparkles,
  Flame,
  ShieldCheck,
  Check,
  ArrowLeft,
  Users,
  Eye,
  MessageSquare,
  Compass,
  Play,
  Share2,
  ExternalLink
} from 'lucide-react';

const TOP_TWITCH_CATEGORIES = [
  { id: 'all', name: 'All Categories', count: '2.4M viewers' },
  { id: 'Just Chatting', name: 'Just Chatting', count: '412K viewers' },
  { id: 'Valorant', name: 'Valorant', count: '185K viewers' },
  { id: 'Minecraft', name: 'Minecraft', count: '94K viewers' },
  { id: 'Fortnite', name: 'Fortnite', count: '142K viewers' },
  { id: 'League of Legends', name: 'League of Legends', count: '178K viewers' },
  { id: 'Counter-Strike 2', name: 'CS2', count: '110K viewers' },
  { id: 'Grand Theft Auto V', name: 'GTA V', count: '125K viewers' },
  { id: 'Music', name: 'Music & Creative', count: '38K viewers' }
];

const TWITCH_DIRECTORY = [
  {
    id: 'twitchgaming',
    channel: 'twitchgaming',
    streamer: 'Twitch Gaming Official',
    avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop',
    title: 'Twitch Gaming Weekly: Next-Gen Games, World Premieres & Exclusive Gameplay',
    category: 'Just Chatting',
    game: 'New Releases',
    viewers: '48,290',
    tags: ['English', 'Official', 'DropsEnabled'],
    unblockedId: '5qap5aO4i9A'
  },
  {
    id: 'tarik',
    channel: 'tarik',
    streamer: 'tarik',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop',
    title: 'VCT Champions Watch Party & Radiant Ranked Games with Friends!',
    category: 'Valorant',
    game: 'Valorant',
    viewers: '64,120',
    tags: ['English', 'Ranked', 'Radiant'],
    unblockedId: '5qap5aO4i9A'
  },
  {
    id: 'valorant',
    channel: 'valorant',
    streamer: 'VALORANT Esports',
    avatar: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100&h=100&fit=crop',
    title: 'VCT Grand Finals: Global Championship Trophy Match Live!',
    category: 'Valorant',
    game: 'Valorant',
    viewers: '124,900',
    tags: ['Esports', 'Championship', 'Live'],
    unblockedId: '5qap5aO4i9A'
  },
  {
    id: 'caseoh_',
    channel: 'caseoh_',
    streamer: 'CaseOh_',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    title: 'PLAYING SCARY HORROR GAMES AND MEDIA SHARE UNTIL I PASS OUT',
    category: 'Just Chatting',
    game: 'Horror',
    viewers: '82,450',
    tags: ['English', 'Funny', 'Horror'],
    unblockedId: 'jfKfPfyJRdk'
  },
  {
    id: 'kai_cenat',
    channel: 'kaicenat',
    streamer: 'Kai Cenat',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    title: '24HR MARATHON STREAM! SPECIAL GUESTS IN THE ROOM AND CRAZY EVENTS',
    category: 'Just Chatting',
    game: 'IRL',
    viewers: '115,200',
    tags: ['English', 'Marathon', 'IRL'],
    unblockedId: 'jfKfPfyJRdk'
  },
  {
    id: 'eslcs',
    channel: 'eslcs',
    streamer: 'ESL Counter-Strike',
    avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop',
    title: 'ESL Pro League Playoffs - NAVI vs FaZe Clan - Best of 5 Grand Final',
    category: 'Counter-Strike 2',
    game: 'CS2',
    viewers: '89,400',
    tags: ['Esports', 'Tournament', 'CS2'],
    unblockedId: 'CSvFpBOe8eY'
  },
  {
    id: 'rocketleague',
    channel: 'rocketleague',
    streamer: 'Rocket League',
    avatar: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop',
    title: 'RLCS Major Championship Sunday: Finals Bracket Live with Fan Rewards',
    category: 'Rocket League',
    game: 'Rocket League',
    viewers: '43,800',
    tags: ['Esports', 'RLCS', 'Drops'],
    unblockedId: 'fJ9rUzIMcZQ'
  },
  {
    id: 'monstercat',
    channel: 'monstercat',
    streamer: 'Monstercat',
    avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop',
    title: '24/7 Live Electronic Dance Music Radio - EDM, House, Drum & Bass',
    category: 'Music',
    game: 'Electronic',
    viewers: '14,300',
    tags: ['Music', '24/7', 'EDM'],
    unblockedId: 'jfKfPfyJRdk'
  },
  {
    id: 'minecraft_smp',
    channel: 'minecraft',
    streamer: 'Minecraft Community SMP',
    avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=100&h=100&fit=crop',
    title: 'Hardcore 100 Days Survival in Minecraft 1.21 Tricky Trials Update',
    category: 'Minecraft',
    game: 'Minecraft',
    viewers: '37,900',
    tags: ['Hardcore', 'SMP', 'Survival'],
    unblockedId: 'jfKfPfyJRdk'
  },
  {
    id: 'shroud',
    channel: 'shroud',
    streamer: 'shroud',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    title: 'Testing new updates and ranked tactical shooters with the boys',
    category: 'Valorant',
    game: 'Tactical Shooter',
    viewers: '29,400',
    tags: ['Ranked', 'English', 'FPS'],
    unblockedId: '5qap5aO4i9A'
  },
  {
    id: 'xqc',
    channel: 'xqc',
    streamer: 'xQc',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    title: 'REACTING TO CRAZIEST TIKTOKS AND DAILY NEWS THEN GAMING WITH JUICERS',
    category: 'Just Chatting',
    game: 'Variety',
    viewers: '55,300',
    tags: ['Variety', 'React', 'Juice'],
    unblockedId: 'jfKfPfyJRdk'
  },
  {
    id: 'jynxzi',
    channel: 'jynxzi',
    streamer: 'Jynxzi',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop',
    title: 'CHAMPION 1V1 TOURNAMENT AND SUNDAY WAGERS! FULL VOLUME!',
    category: 'Just Chatting',
    game: 'Rainbow Six',
    viewers: '71,600',
    tags: ['Competitive', '1v1', 'Hype'],
    unblockedId: '5qap5aO4i9A'
  }
];

export const TwitchLivePlayer = () => {
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'player'
  const [selectedChannel, setSelectedChannel] = useState(TWITCH_DIRECTORY[0]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [streamSource, setStreamSource] = useState('twitch'); // 'twitch' | 'unblocked'
  const [showChat, setShowChat] = useState(false);
  const [customChannelInput, setCustomChannelInput] = useState('');

  // Generate parent domains for Twitch embed
  const currentHost =
    typeof window !== 'undefined' && window.location.hostname
      ? window.location.hostname
      : 'localhost';

  const twitchEmbedUrl = useMemo(() => {
    return `https://player.twitch.tv/?channel=${selectedChannel.channel}&parent=${currentHost}&parent=ai.studio&parent=aistudio.google.com&parent=localhost&parent=127.0.0.1&muted=false&autoplay=true`;
  }, [selectedChannel, currentHost]);

  const twitchChatUrl = useMemo(() => {
    return `https://www.twitch.tv/embed/${selectedChannel.channel}/chat?parent=${currentHost}&parent=ai.studio&parent=aistudio.google.com&parent=localhost&parent=127.0.0.1&darkpopout`;
  }, [selectedChannel, currentHost]);

  // Filter channels for directory
  const filteredChannels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TWITCH_DIRECTORY.filter((ch) => {
      const matchCat = activeCategory === 'all' || ch.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        ch.streamer.toLowerCase().includes(q) ||
        ch.channel.toLowerCase().includes(q) ||
        ch.title.toLowerCase().includes(q) ||
        ch.game.toLowerCase().includes(q) ||
        ch.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeCategory]);

  const handleOpenStream = (channel) => {
    setSelectedChannel(channel);
    setViewMode('player');
  };

  const handleCustomChannelSubmit = (e) => {
    e?.preventDefault();
    if (!customChannelInput.trim()) return;
    const clean = customChannelInput.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    const newChan = {
      id: clean,
      channel: clean,
      streamer: clean,
      avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop',
      title: `Live Broadcast on twitch.tv/${clean}`,
      category: 'Custom Stream',
      game: 'Live Stream',
      viewers: 'Live',
      tags: ['Live', 'Custom'],
      unblockedId: 'jfKfPfyJRdk'
    };
    setSelectedChannel(newChan);
    setViewMode('player');
    setCustomChannelInput('');
  };

  return (
    <div className="w-full h-full bg-[#0e0e10] flex flex-col text-slate-100 select-none overflow-hidden">
      {/* Top Twitch Navigation Bar */}
      <div className="bg-[#18181b] border-b border-slate-800/80 px-3 py-2.5 sm:px-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Left: Brand / Home link */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('home')}
            className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <Tv className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                TWITCH <span className="text-purple-400 font-bold text-xs">HOME</span>
              </span>
              <p className="text-[10px] text-slate-400 hidden sm:block">Live Gaming, Esports & IRL</p>
            </div>
          </button>

          {viewMode === 'player' && (
            <button
              onClick={() => setViewMode('home')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-purple-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Twitch Home Screen</span>
            </button>
          )}
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-xs sm:max-w-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (filteredChannels.length > 0) {
                handleOpenStream(filteredChannels[0]);
              } else if (searchQuery.trim()) {
                handleCustomChannelSubmit();
              }
            }}
            className="relative"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search streamer, game, category..."
              className="w-full pl-8 pr-7 py-1.5 bg-[#0e0e10] border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ×
              </button>
            )}
          </form>
        </div>

        {/* Right: Custom Channel Direct Input */}
        <form onSubmit={handleCustomChannelSubmit} className="hidden md:flex items-center gap-1.5">
          <input
            type="text"
            value={customChannelInput}
            onChange={(e) => setCustomChannelInput(e.target.value)}
            placeholder="Go to channel (e.g. tarik)..."
            className="w-40 px-2.5 py-1.5 bg-[#0e0e10] border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
          >
            Watch
          </button>
        </form>
      </div>

      {/* VIEW 1: AUTHENTIC TWITCH HOME SCREEN */}
      {viewMode === 'home' && (
        <div className="flex-1 overflow-y-auto">
          {/* Featured Hero Carousel Banner */}
          <div className="p-4 sm:p-6 bg-gradient-to-b from-purple-950/40 via-[#18181b]/50 to-[#0e0e10] border-b border-slate-800">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-5">
              {/* Hero Video Preview */}
              <div
                onClick={() => handleOpenStream(TWITCH_DIRECTORY[0])}
                className="w-full md:w-3/5 aspect-video bg-black rounded-2xl overflow-hidden relative shadow-2xl shadow-purple-950/60 border border-purple-900/40 group cursor-pointer"
              >
                <iframe
                  src={`https://player.twitch.tv/?channel=twitchgaming&parent=${currentHost}&parent=ai.studio&parent=localhost&muted=true&autoplay=true`}
                  title="Twitch Hero Stream"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  className="w-full h-full pointer-events-none"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-purple-600/10 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl shadow-purple-600/50 scale-90 group-hover:scale-100 transition-transform opacity-90 group-hover:opacity-100">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  FEATURED LIVE
                </div>
              </div>

              {/* Hero Streamer Details */}
              <div className="w-full md:w-2/5 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={TWITCH_DIRECTORY[0].avatar}
                    alt={TWITCH_DIRECTORY[0].streamer}
                    className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
                  />
                  <div>
                    <h3 className="font-extrabold text-lg text-white leading-tight">
                      {TWITCH_DIRECTORY[0].streamer}
                    </h3>
                    <p className="text-xs text-purple-400 font-semibold">{TWITCH_DIRECTORY[0].game}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {TWITCH_DIRECTORY[0].title}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded-full bg-red-950/80 border border-red-800 text-red-400 text-[10px] font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {TWITCH_DIRECTORY[0].viewers} viewers
                  </span>
                  {TWITCH_DIRECTORY[0].tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full bg-[#18181b] border border-slate-700 text-slate-400 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenStream(TWITCH_DIRECTORY[0])}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Featured Stream</span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories Filter Tabs */}
          <div className="px-4 sm:px-6 py-3 border-b border-slate-800/80 bg-[#18181b]/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              Categories:
            </span>
            {TOP_TWITCH_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-[#0e0e10] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Live Channels Grid */}
          <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                Live Channels You Might Like ({filteredChannels.length})
              </h2>
              <span className="text-xs text-slate-400">Click any channel to watch</span>
            </div>

            {filteredChannels.length === 0 ? (
              <div className="text-center py-16">
                <Radio className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-300 font-bold">No live channels matched "{searchQuery}"</p>
                <p className="text-xs text-slate-500 mt-1">Try another streamer, game, or select All Categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredChannels.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => handleOpenStream(ch)}
                    className="group bg-[#18181b] border border-slate-800/80 hover:border-purple-600/80 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-purple-950/30 cursor-pointer flex flex-col"
                  >
                    {/* Channel Thumbnail Preview */}
                    <div className="aspect-video bg-slate-900 relative overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop`}
                        alt={ch.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-white font-black text-[9px] uppercase tracking-wider flex items-center gap-1 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        LIVE
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-slate-200 text-[10px] font-semibold flex items-center gap-1">
                        <Users className="w-3 h-3 text-red-400" />
                        {ch.viewers}
                      </div>
                    </div>

                    {/* Channel Info */}
                    <div className="p-3 flex items-start gap-2.5 flex-1">
                      <img
                        src={ch.avatar}
                        alt={ch.streamer}
                        className="w-9 h-9 rounded-full border border-purple-500/50 object-cover shrink-0 mt-0.5"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                          {ch.streamer}
                        </h3>
                        <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight mt-0.5">
                          {ch.title}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1 font-medium truncate">
                          {ch.game}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {ch.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] bg-slate-900 text-slate-400 border border-slate-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: FULL LIVE STREAM PLAYER WITH CHAT & CONTROLS */}
      {viewMode === 'player' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Stream Toolbar */}
          <div className="bg-[#18181b] border-b border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={() => setViewMode('home')}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white transition-colors"
                title="Return to Twitch Home Screen"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <img
                src={selectedChannel.avatar}
                alt={selectedChannel.streamer}
                className="w-7 h-7 rounded-full border border-purple-500 object-cover"
              />
              <div className="min-w-0">
                <span className="font-extrabold text-xs text-white truncate block">
                  {selectedChannel.streamer}
                </span>
                <span className="text-[10px] text-slate-400 truncate block">
                  {selectedChannel.game} • {selectedChannel.viewers} viewers
                </span>
              </div>
            </div>

            {/* Stream source and chat controls */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-[#0e0e10] p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setStreamSource('twitch')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    streamSource === 'twitch'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Official Stream
                </button>
                <button
                  onClick={() => setStreamSource('unblocked')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    streamSource === 'unblocked'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Bypasses school firewall restrictions"
                >
                  Unblocked Mirror
                </button>
              </div>

              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-1.5 rounded-xl border transition-colors ${
                  showChat
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Toggle Twitch Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Stream Player & Chat Split View */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-black">
            {/* Stream Player Area */}
            <div className="flex-1 relative h-full flex flex-col">
              {streamSource === 'twitch' ? (
                <iframe
                  src={twitchEmbedUrl}
                  title={`${selectedChannel.streamer} Live Stream`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  className="w-full h-full flex-1 border-0"
                />
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedChannel.unblockedId}?autoplay=1&mute=0`}
                  title={`${selectedChannel.streamer} Unblocked Mirror`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full flex-1 border-0"
                />
              )}
            </div>

            {/* Live Chat Panel (optional toggle) */}
            {showChat && (
              <div className="w-full md:w-[320px] bg-[#18181b] border-t md:border-t-0 md:border-l border-slate-800 flex flex-col shrink-0 h-[260px] md:h-full">
                <div className="p-2 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Stream Chat</span>
                  <button onClick={() => setShowChat(false)} className="text-slate-400 hover:text-white">
                    ×
                  </button>
                </div>
                <iframe
                  src={twitchChatUrl}
                  title="Twitch Chat"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="flex-1 border-0"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
