import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Disc,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Gamepad2,
  Laugh,
  Music2,
  Check,
  X,
  Play,
  RotateCcw,
  LogIn,
  Search,
  ExternalLink,
  ShieldCheck,
  User,
  Smartphone,
  Globe,
  Send,
  Plus
} from 'lucide-react';

// Real viral TikTok style vertical shorts & videos
const VIRAL_TIKTOKS = [
  {
    id: 'subway-surfers',
    embedId: 'kXYiU_JCYtU',
    creator: 'satisfying_gaming',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    verified: true,
    caption: 'POV: Listening to Reddit stories while watching satisfying Subway Surfers gameplay 🏃‍♂️💨 wait for the twist at the end! #fyp #subwaysurfers #satisfying #viral #storytime',
    sound: '♫ original sound - Daily Reddit Stories',
    likes: '1.4M',
    comments: '18.9K',
    shares: '124K',
    bookmarks: '89K',
    category: 'Gaming',
    commentsList: [
      { user: 'gamer_boy99', text: 'Bro that dodge at 0:15 was insane 💀', time: '2h ago', likes: '1.2K' },
      { user: 'chloe_vibes', text: 'I stayed for the story not gonna lie 😂', time: '5h ago', likes: '840' },
      { user: 'kai_edits', text: 'Part 2 please!!', time: '1d ago', likes: '450' }
    ]
  },
  {
    id: 'minecraft-parkour',
    embedId: 'tAGnKpE4NCI',
    creator: 'minecraft_tales',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    verified: true,
    caption: 'The craziest school lunch trade in history 💀😭 Would you have made this trade?! #fyp #minecraft #parkour #storytime #nostalgia',
    sound: '♫ Original Audio - Minecraft Chill Lofi',
    likes: '2.1M',
    comments: '34.2K',
    shares: '210K',
    bookmarks: '145K',
    category: 'Trending',
    commentsList: [
      { user: 'alex_blocks', text: 'Trading a gushers for a holographic charizard was a crime 😭', time: '1h ago', likes: '3.4K' },
      { user: 'noah_runs', text: 'How does he make these jumps look so easy??', time: '3h ago', likes: '1.1K' }
    ]
  },
  {
    id: 'khaby-reaction',
    embedId: '9bZkp7q19f0',
    creator: 'khaby.lame',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&auto=format&fit=crop&q=80',
    verified: true,
    caption: 'It really is that simple 🤷‍♂️👐 Why do people overcomplicate peeling bananas?! #learnfromkhaby #comedy #viral #fyp #humor',
    sound: '♫ Original Sound - Khaby Lame Official',
    likes: '4.8M',
    comments: '82.5K',
    shares: '512K',
    bookmarks: '320K',
    category: 'Comedy',
    commentsList: [
      { user: 'dan_the_man', text: 'The hands gesture gets me EVERY SINGLE TIME 👐😂', time: '30m ago', likes: '9.8K' },
      { user: 'sara_rose', text: 'King of simplicity 👑', time: '2h ago', likes: '4.2K' }
    ]
  },
  {
    id: 'mrbeast-challenge',
    embedId: '0e3GPea1Tyg',
    creator: 'mrbeast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    verified: true,
    caption: 'I gave $100,000 to the last person to leave this circle! ⭕💰 Who do you think won?! #mrbeast #challenge #money #viral #crazy',
    sound: '♫ Beast Mode Sound - Jimmy Donaldson',
    likes: '5.2M',
    comments: '110K',
    shares: '890K',
    bookmarks: '450K',
    category: 'Trending',
    commentsList: [
      { user: 'chandler_fan', text: 'Chandler probably stepped out first round haha', time: '15m ago', likes: '12K' },
      { user: 'karl_jacobs_alt', text: 'W video Jimmy as always 🔥🔥', time: '1h ago', likes: '8.4K' }
    ]
  },
  {
    id: 'soap-cutting-asmr',
    embedId: 'y6120QOlsfU',
    creator: 'asmr_satisfying_lab',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    verified: false,
    caption: 'Rainbow cube soap cutting 🧼🌈 headphone users rejoice with this satisfying crunch! #asmr #soapcutting #satisfying #crunch #relax',
    sound: '♫ Pure ASMR Crunchy Sounds - ASMR Lab',
    likes: '1.8M',
    comments: '15.3K',
    shares: '95K',
    bookmarks: '180K',
    category: 'ASMR',
    commentsList: [
      { user: 'sleepy_vibes', text: 'This cured my insomnia in 10 seconds 😴', time: '4h ago', likes: '2.1K' },
      { user: 'crafty_kate', text: 'The sound of the rainbow cubes falling!!', time: '6h ago', likes: '950' }
    ]
  },
  {
    id: 'gta-mega-ramp',
    embedId: 'kJQP7kiw5Fk',
    creator: 'gta_stunts_daily',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    verified: true,
    caption: 'Can a bus survive the 10,000 foot Mega Ramp?! 🚌💥 99% of people fail this jump! #gta5 #gaming #stunt #megaramp #fail',
    sound: '♫ Phonk Drift Audio - Night Killa',
    likes: '2.4M',
    comments: '29.7K',
    shares: '175K',
    bookmarks: '112K',
    category: 'Gaming',
    commentsList: [
      { user: 'drift_king', text: 'That landing was cleaner than my kitchen floor', time: '3h ago', likes: '3.1K' },
      { user: 'franklin_gta', text: 'The physics in this game never fail to amaze me lol', time: '5h ago', likes: '1.4K' }
    ]
  }
];

export const TikTokPlayer = () => {
  // Navigation Mode
  const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'web' | 'search'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(VIRAL_TIKTOKS[0].commentsList);
  const [isMuted, setIsMuted] = useState(false);
  const [searchCreator, setSearchCreator] = useState('');
  const [activeTab, setActiveTab] = useState('foryou'); // 'following' | 'foryou'
  const [doubleTapHeart, setDoubleTapHeart] = useState(false);

  const currentVideo = VIRAL_TIKTOKS[currentIndex];

  // When video changes, reset likes/comments
  useEffect(() => {
    setIsLiked(false);
    setIsBookmarked(false);
    setComments(currentVideo.commentsList || []);
  }, [currentIndex]);

  // Handle Swipe Up / Down
  const handleNext = () => {
    if (currentIndex < VIRAL_TIKTOKS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(VIRAL_TIKTOKS.length - 1);
    }
  };

  // Double tap to like
  const handleDoubleTap = () => {
    setIsLiked(true);
    setDoubleTapHeart(true);
    setTimeout(() => setDoubleTapHeart(false), 800);
  };

  // Add Comment
  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      {
        user: 'you',
        text: commentText.trim(),
        time: 'Just now',
        likes: '1'
      },
      ...comments
    ]);
    setCommentText('');
  };

  return (
    <div className="w-full h-full bg-[#09090b] text-white flex flex-col items-center justify-between select-none overflow-hidden font-sans">
      {/* Top Universal App Navigation Bar */}
      <div className="w-full bg-[#121216] border-b border-slate-800 px-4 py-2 flex items-center justify-between shrink-0 z-30">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#fe2c55] via-black to-[#25f4ee] flex items-center justify-center p-1 shadow-md shadow-pink-500/20">
            <Music2 className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-black text-sm tracking-wide text-white">
            TikTok <span className="text-[#25f4ee] text-xs">Mobile</span>
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('phone')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'phone'
                ? 'bg-[#fe2c55] text-white shadow-md shadow-pink-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone FYP</span>
          </button>

          <button
            onClick={() => setViewMode('web')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'web'
                ? 'bg-[#fe2c55] text-white shadow-md shadow-pink-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Web Login / FYP</span>
          </button>

          <button
            onClick={() => setViewMode('search')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'search'
                ? 'bg-[#fe2c55] text-white shadow-md shadow-pink-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search @User</span>
          </button>
        </div>

        {/* Mute & Help */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* VIEW 1: AUTHENTIC PHONE SIMULATOR (9:16 VERTICAL FYP) */}
      {viewMode === 'phone' && (
        <div className="flex-1 w-full flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
          {/* Desktop Up / Down Controls */}
          <div className="hidden md:flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handlePrev}
              title="Previous Video (Up Arrow)"
              className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              title="Next Video (Down Arrow)"
              className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          {/* Smartphone Frame */}
          <div className="w-[340px] sm:w-[375px] h-[95%] max-h-[720px] bg-black rounded-[42px] border-[10px] border-slate-800 shadow-2xl relative flex flex-col overflow-hidden ring-1 ring-slate-700">
            {/* Phone Dynamic Island / Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
            </div>

            {/* Phone Status Bar */}
            <div className="w-full px-6 pt-2 pb-1 flex items-center justify-between text-[11px] font-bold text-white z-20 shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px]">5G</span>
                <div className="w-4 h-2 rounded-sm border border-white p-0.5 flex items-center">
                  <div className="w-full h-full bg-white rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Video Stage with Double Tap Event */}
            <div
              onDoubleClick={handleDoubleTap}
              className="flex-1 relative w-full h-full bg-black flex items-center justify-center overflow-hidden"
            >
              {/* Responsive Video Embed */}
              <iframe
                key={`${currentVideo.id}-${currentIndex}`}
                src={`https://www.youtube-nocookie.com/embed/${currentVideo.embedId}?autoplay=1&controls=0&loop=1&playlist=${currentVideo.embedId}&modestbranding=1&rel=0&mute=${isMuted ? 1 : 0}`}
                title={currentVideo.caption}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full object-cover scale-[1.35] pointer-events-none"
              />

              {/* Double Tap Floating Heart Animation */}
              {doubleTapHeart && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
                  <Heart className="w-24 h-24 text-[#fe2c55] fill-[#fe2c55] drop-shadow-2xl" />
                </div>
              )}

              {/* TikTok Top Tab Switcher ("Following | For You") */}
              <div className="absolute top-8 inset-x-0 flex items-center justify-center gap-4 z-20 text-sm font-black text-white/80 drop-shadow-md">
                <button
                  onClick={() => setActiveTab('following')}
                  className={`relative transition-all ${activeTab === 'following' ? 'text-white font-extrabold text-base' : 'text-white/60'}`}
                >
                  Following
                  {activeTab === 'following' && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />
                  )}
                </button>
                <span className="text-white/40">|</span>
                <button
                  onClick={() => setActiveTab('foryou')}
                  className={`relative transition-all ${activeTab === 'foryou' ? 'text-white font-extrabold text-base' : 'text-white/60'}`}
                >
                  For You
                  {activeTab === 'foryou' && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />
                  )}
                </button>
              </div>

              {/* RIGHT ACTION BAR: Avatar, Like, Comment, Bookmark, Share, Vinyl */}
              <div className="absolute right-3 bottom-16 flex flex-col items-center gap-4 z-20">
                {/* Creator Avatar with Follow Button */}
                <div className="relative mb-2">
                  <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-lg">
                    <img
                      src={currentVideo.avatar}
                      alt={currentVideo.creator}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!isFollowed && (
                    <button
                      onClick={() => setIsFollowed(true)}
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#fe2c55] text-white flex items-center justify-center shadow"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                  )}
                </div>

                {/* Like Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex flex-col items-center gap-0.5 group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-125">
                    <Heart
                      className={`w-7 h-7 drop-shadow-md transition-all ${
                        isLiked
                          ? 'text-[#fe2c55] fill-[#fe2c55] scale-110'
                          : 'text-white fill-white/10 group-hover:scale-105'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow">
                    {isLiked ? '1.5M' : currentVideo.likes}
                  </span>
                </button>

                {/* Comment Button */}
                <button
                  onClick={() => setShowComments(true)}
                  className="flex flex-col items-center gap-0.5 group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-125">
                    <MessageCircle className="w-7 h-7 text-white fill-white/10 drop-shadow-md group-hover:scale-105" />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow">
                    {currentVideo.comments}
                  </span>
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex flex-col items-center gap-0.5 group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-125">
                    <Bookmark
                      className={`w-7 h-7 drop-shadow-md transition-all ${
                        isBookmarked
                          ? 'text-amber-400 fill-amber-400 scale-110'
                          : 'text-white fill-white/10 group-hover:scale-105'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow">
                    {currentVideo.bookmarks}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => alert('Link copied to clipboard!')}
                  className="flex flex-col items-center gap-0.5 group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-125">
                    <Share2 className="w-7 h-7 text-white drop-shadow-md group-hover:scale-105" />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow">
                    {currentVideo.shares}
                  </span>
                </button>

                {/* Spinning Vinyl Record */}
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center animate-spin">
                  <Disc className="w-6 h-6 text-white/90" />
                </div>
              </div>

              {/* BOTTOM INFO OVERLAY: Creator, Caption & Audio */}
              <div className="absolute left-3 right-16 bottom-4 flex flex-col gap-1.5 z-20 text-left">
                {/* Username */}
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-white drop-shadow-md">
                    @{currentVideo.creator}
                  </span>
                  {currentVideo.verified && (
                    <span className="w-3.5 h-3.5 rounded-full bg-[#20d5ec] text-black text-[9px] flex items-center justify-center font-bold">
                      ✓
                    </span>
                  )}
                </div>

                {/* Caption */}
                <p className="text-xs text-white/95 leading-snug drop-shadow-md line-clamp-2">
                  {currentVideo.caption}
                </p>

                {/* Sound Ticker */}
                <div className="flex items-center gap-1.5 text-[11px] text-white/90 drop-shadow">
                  <Music2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">{currentVideo.sound}</span>
                </div>
              </div>

              {/* Comments Slide-Up Tray */}
              {showComments && (
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-slate-950/95 backdrop-blur-md rounded-t-3xl border-t border-slate-800 z-40 flex flex-col p-3 shadow-2xl">
                  {/* Tray Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-xs text-white">
                      {comments.length} Comments
                    </span>
                    <button
                      onClick={() => setShowComments(false)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comments List */}
                  <div className="flex-1 overflow-y-auto py-2 space-y-3">
                    {comments.map((c, i) => (
                      <div key={i} className="flex gap-2.5 text-left text-xs">
                        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {c.user[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-300">@{c.user}</span>
                            <span className="text-[10px] text-slate-500">{c.time}</span>
                          </div>
                          <p className="text-slate-200 mt-0.5">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comment Form */}
                  <form onSubmit={handlePostComment} className="pt-2 border-t border-slate-800 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 text-xs text-white focus:outline-none focus:border-[#fe2c55]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-full bg-[#fe2c55] text-white font-bold text-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom Phone Gesture Bar */}
            <div className="w-full py-1.5 flex items-center justify-center bg-black shrink-0">
              <div className="w-32 h-1 bg-white/70 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TIKTOK WEB & LOGIN PORTAL */}
      {viewMode === 'web' && (
        <div className="flex-1 w-full bg-slate-950 flex flex-col overflow-hidden">
          {/* Web Instructions Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#25f4ee]" />
              <span>
                <strong>TikTok Web Live:</strong> Log into your account or browse your personalized FYP algorithm.
              </span>
            </div>
            <a
              href="https://www.tiktok.com/login"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#fe2c55] hover:bg-pink-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow"
            >
              <span>Launch Official Login</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Web Frame via Proxy */}
          <div className="flex-1 w-full h-full bg-black relative">
            <iframe
              src="/api/proxy?url=https://www.tiktok.com/"
              title="TikTok Web"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}

      {/* VIEW 3: SEARCH ANY TIKTOK CREATOR / USER */}
      {viewMode === 'search' && (
        <div className="flex-1 w-full bg-slate-950 p-6 flex flex-col items-center justify-center overflow-y-auto">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-[#fe2c55] flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white">
                Search Any TikTok Creator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your TikTok username or any creator handle to view profile feeds.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. khaby.lame or mrbeast"
                value={searchCreator}
                onChange={(e) => setSearchCreator(e.target.value)}
                className="flex-1 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-[#fe2c55]"
              />
              <button
                onClick={() => {
                  if (searchCreator.trim()) {
                    window.open(`https://www.tiktok.com/@${searchCreator.trim().replace('@', '')}`, '_blank');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#fe2c55] hover:bg-pink-600 text-white font-extrabold text-xs transition-all"
              >
                Go
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-wrap justify-center gap-1.5">
              {['@mrbeast', '@khaby.lame', '@charlidamelio', '@bellapoarch', '@zachking'].map((creator) => (
                <button
                  key={creator}
                  onClick={() => setSearchCreator(creator)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  {creator}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
