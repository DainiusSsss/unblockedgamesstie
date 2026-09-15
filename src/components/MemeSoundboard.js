import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Search, Sparkles, Play, Flame } from 'lucide-react';

const MEME_SOUNDS = [
  { id: 'vine-boom', name: 'Vine Boom', category: 'Classic', color: '#ef4444', freq: [150, 40], type: 'boom' },
  { id: 'bruh', name: 'Bruh Sound', category: 'Classic', color: '#f97316', freq: [220, 110], type: 'bruh' },
  { id: 'airhorn', name: 'Airhorn', category: 'Hype', color: '#eab308', freq: [466, 466, 466], type: 'airhorn' },
  { id: 'fbi-open-up', name: 'FBI Open Up', category: 'Memes', color: '#3b82f6', freq: [300, 500], type: 'fbi' },
  { id: 'metal-pipe', name: 'Metal Pipe', category: 'Chaos', color: '#64748b', freq: [800, 1200, 400], type: 'pipe' },
  { id: 'sheesh', name: 'Sheesh!', category: 'Hype', color: '#ec4899', freq: [400, 800], type: 'sheesh' },
  { id: 'emotional-damage', name: 'Emotional Damage', category: 'Memes', color: '#a855f7', freq: [260, 200], type: 'voice' },
  { id: 'roblox-oof', name: 'Roblox Oof', category: 'Gaming', color: '#10b981', freq: [350, 250], type: 'oof' },
  { id: 'among-us', name: 'Among Us Report', category: 'Gaming', color: '#dc2626', freq: [523, 659, 783], type: 'synth' },
  { id: 'windows-xp', name: 'Windows Startup', category: 'Nostalgia', color: '#0284c7', freq: [330, 440, 554, 659], type: 'chime' },
  { id: 'sad-violin', name: 'Sad Violin', category: 'Dramatic', color: '#6366f1', freq: [440, 415, 392], type: 'violin' },
  { id: 'rickroll', name: 'Never Gonna Give You Up', category: 'Music', color: '#f43f5e', freq: [392, 440, 523, 587], type: 'melody' },
  { id: 'ding', name: 'Correct Ding', category: 'SFX', color: '#22c55e', freq: [880, 1760], type: 'bell' },
  { id: 'wrong-buzzer', name: 'Wrong Buzzer', category: 'SFX', color: '#b91c1c', freq: [120, 100], type: 'buzz' },
  { id: 'anime-wow', name: 'Anime Wow', category: 'Anime', color: '#d946ef', freq: [300, 600, 450], type: 'wow' },
  { id: 'what-da-dog-doin', name: 'What Da Dog Doin', category: 'Memes', color: '#84cc16', freq: [280, 320], type: 'voice' },
  { id: 'run-meme', name: 'AWOLNATION Run', category: 'Hype', color: '#f59e0b', freq: [200, 400, 600], type: 'bass' },
  { id: 'level-up', name: 'Level Up', category: 'Gaming', color: '#06b6d4', freq: [330, 392, 659, 784], type: 'arpeggio' }
];

export const MemeSoundboard = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [playingId, setPlayingId] = useState(null);
  const [volume, setVolume] = useState(0.8);
  const audioCtxRef = useRef(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Synthesize rich recognizable sound effects using Web Audio API
  const playSound = (sound) => {
    setPlayingId(sound.id);
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, now);
    masterGain.connect(ctx.destination);

    if (sound.type === 'boom') {
      // Vine Boom: deep sub-bass drop with punch
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);
      gain.gain.setValueAtTime(1.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.9);
    } else if (sound.type === 'airhorn') {
      // Reggae Airhorn pattern
      const beeps = [0, 0.12, 0.24, 0.4, 0.52];
      beeps.forEach((t) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(466.16, now + t); // Bb4
        gain.gain.setValueAtTime(0.4, now + t);
        gain.gain.linearRampToValueAtTime(0, now + t + 0.1);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now + t);
        osc.stop(now + t + 0.11);
      });
    } else if (sound.type === 'bell' || sound.type === 'chime' || sound.type === 'arpeggio' || sound.type === 'melody') {
      // Melodic notes
      sound.freq.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const startTime = now + idx * 0.12;
        osc.frequency.setValueAtTime(f, startTime);
        gain.gain.setValueAtTime(0.6, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } else if (sound.type === 'pipe') {
      // Metal Pipe Clatter
      for (let i = 0; i < 5; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i % 2 === 0 ? 'sawtooth' : 'square';
        const t = now + i * 0.04;
        osc.frequency.setValueAtTime(600 + i * 250, t);
        gain.gain.setValueAtTime(0.3 / (i + 1), t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.35);
      }
    } else {
      // Dynamic pitch drop/rise
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(sound.freq[0], now);
      osc.frequency.exponentialRampToValueAtTime(sound.freq[1] || sound.freq[0] * 0.5, now + 0.35);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.45);
    }

    setTimeout(() => {
      setPlayingId(null);
    }, 600);
  };

  const categories = ['All', ...new Set(MEME_SOUNDS.map((s) => s.category))];

  const filtered = MEME_SOUNDS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full h-full bg-slate-950 flex flex-col text-white select-none overflow-hidden">
      {/* Top Header & Search */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            🔊
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Meme Soundboard</h3>
            <p className="text-[11px] text-slate-400">
              100% unblocked instant audio buttons • Zero lag
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sound effects..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-slate-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
              activeCategory === c
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Sounds Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.map((sound) => {
          const isPlaying = playingId === sound.id;
          return (
            <button
              key={sound.id}
              onClick={() => playSound(sound)}
              className={`relative p-4 rounded-2xl border flex flex-col items-center justify-between text-center gap-3 transition-all duration-150 active:scale-95 shadow-md ${
                isPlaying
                  ? 'scale-105 border-white shadow-xl shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
              style={{
                background: isPlaying
                  ? `radial-gradient(circle at center, ${sound.color}40 0%, #030712 100%)`
                  : undefined
              }}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform ${
                  isPlaying ? 'scale-110 animate-pulse' : ''
                }`}
                style={{ backgroundColor: sound.color }}
              >
                <Play className="w-5 h-5 fill-white" />
              </div>

              <div>
                <h4 className="font-bold text-xs text-white leading-tight">{sound.name}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{sound.category}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
