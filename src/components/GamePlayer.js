import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Maximize2,
  RotateCcw,
  Heart,
  Gamepad,
  Code,
  Check,
  Copy,
  Info,
  ChevronDown,
  ChevronUp,
  Tv,
  Play,
  Layers,
  Sparkles,
  ShieldCheck,
  Globe,
  Music,
  Radio,
  Send,
  Bot,
  User,
  Film,
  AlertCircle,
  Search
} from 'lucide-react';
import { SpotifyPlayer } from './SpotifyPlayer.js';
import { TikTokPlayer } from './TikTokPlayer.js';
import { SnapchatViewer } from './SnapchatViewer.js';
import { TwitchLivePlayer } from './TwitchLivePlayer.js';
import { MemeSoundboard } from './MemeSoundboard.js';
import { UnblockedBrowser } from './UnblockedBrowser.js';
import { XboxCloudHub } from './XboxCloudHub.js';
import { EntertainmentHub } from './EntertainmentHub.js';

export const GamePlayer = ({
  game,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [reloadKey, setReloadKey] = useState(0);
  const [isTheater, setIsTheater] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const playerRef = useRef(null);

  // App-specific identifiers
  const isEaglercraft =
    game.id?.includes('eaglercraft') ||
    game.title?.toLowerCase().includes('eaglercraft') ||
    (game.iframe && game.iframe.includes('eaglercraft'));

  const isKickTheBuddy =
    game.id === 'kick-the-buddy' ||
    game.title?.toLowerCase().includes('kick the buddy');

  const isTikTok =
    game.id === 'tiktok' ||
    game.title?.toLowerCase().includes('tiktok');

  const isSpotify =
    game.id === 'spotify' ||
    game.title?.toLowerCase().includes('spotify');

  const isSnapchat =
    game.id === 'snapchat' ||
    game.title?.toLowerCase().includes('snapchat');

  const isYouTube =
    game.id === 'youtube' ||
    game.title?.toLowerCase().includes('youtube');

  const isTwitch =
    game.id === 'twitch' ||
    game.title?.toLowerCase().includes('twitch');

  const isChatGPT =
    game.id === 'chatgpt' ||
    game.title?.toLowerCase().includes('chatgpt');

  const isXbox =
    game.id === 'xbox-cloud-gaming' ||
    game.title?.toLowerCase().includes('xbox');

  const isEntertainment =
    game.id === 'disney-plus' ||
    game.id === 'netflix' ||
    game.id === 'hulu' ||
    game.id === 'cineby' ||
    game.id === 'lumelo-tv' ||
    game.id === 'espn' ||
    game.title?.toLowerCase().includes('disney') ||
    game.title?.toLowerCase().includes('netflix') ||
    game.title?.toLowerCase().includes('hulu') ||
    game.title?.toLowerCase().includes('cineby') ||
    game.title?.toLowerCase().includes('lumelo') ||
    game.title?.toLowerCase().includes('espn');

  const isWebBrowser =
    game.id === 'croxyproxy' ||
    game.title?.toLowerCase().includes('browser') ||
    game.title?.toLowerCase().includes('croxy');

  // Modes & State for specific apps
  const [eaglerVersion, setEaglerVersion] = useState('wasm');
  const [appMode, setAppMode] = useState('default');

  // YouTube presets
  const [youtubeVideoId, setYoutubeVideoId] = useState('PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj'); // Top Music Hits

  // ChatGPT state
  const [chatGptView, setChatGptView] = useState('assistant');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I'm your AI Assistant. What can I help you with today? Ask questions, brainstorm creative ideas, write code, solve problems, or explore any topic.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Controller state for Xbox
  const [gamepadConnected, setGamepadConnected] = useState(false);

  useEffect(() => {
    const updateGamepads = () => {
      const gp = navigator.getGamepads ? navigator.getGamepads() : [];
      const hasGp = Array.from(gp).some((g) => g && g.connected);
      setGamepadConnected(hasGp);
    };
    window.addEventListener('gamepadconnected', updateGamepads);
    window.addEventListener('gamepaddisconnected', updateGamepads);
    updateGamepads();
    return () => {
      window.removeEventListener('gamepadconnected', updateGamepads);
      window.removeEventListener('gamepaddisconnected', updateGamepads);
    };
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  // Handle ChatGPT interactive questions
  const handleSendMessage = (textToSend) => {
    const query = textToSend || userInput;
    if (!query.trim()) return;

    const userMsg = {
      role: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        reply = "Hey there! How's your day going? What are you curious about today?";
      } else if (lower.includes('code') || lower.includes('python') || lower.includes('javascript')) {
        reply = `Here is a clean code example to help you out:\n\`\`\`javascript\n// Quick helper function\nfunction calculateFactorial(n) {\n  if (n <= 1) return 1;\n  return n * calculateFactorial(n - 1);\n}\nconsole.log("5! =", calculateFactorial(5)); // Output: 120\n\`\`\`\nLet me know if you want me to explain this or write code in Python, C++, or React!`;
      } else if (lower.includes('quantum')) {
        reply = "Quantum computing relies on qubits instead of classical bits. While regular bits are strictly 0 or 1, qubits can exist in a **superposition** of both states simultaneously. Combined with **entanglement**, this lets quantum computers solve specific massive computational problems (like cryptography and molecular simulation) exponentially faster!";
      } else if (lower.includes('essay') || lower.includes('topics')) {
        reply = "Here are 4 compelling essay topics for research or writing:\n1. **Artificial Intelligence Ethics**: How should societies regulate algorithmic autonomy in healthcare and defense?\n2. **The Space Economy**: Will reusable rocketry make lunar colonization economically viable by 2035?\n3. **Privacy in the Age of Ubiquitous Computing**: Balancing cybersecurity with personal civil liberties.\n4. **Renewable Energy Infrastructure**: Overcoming grid energy storage hurdles for 100% clean power.";
      } else if (lower.includes('game') || lower.includes('joke')) {
        reply = "Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 😄\n\nNeed any game recommendations or strategies for unblocked games?";
      } else {
        reply = `Great question regarding "${query.trim()}".\n\nHere are the key takeaways:\n• **Core Concept**: Analyzing the primary factors and identifying high-impact solutions.\n• **Practical Application**: Breaking down the challenge into smaller actionable steps.\n• **Optimization**: Continuously testing and refining your methodology.\n\nWould you like me to elaborate on any particular aspect of this?`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  // Parse iframe src and adapt to prevent "refused to connect"
  const getIframeSrc = () => {
    // 1. Kick The Buddy - use clean GamePix embed
    if (isKickTheBuddy) {
      return 'https://play.gamepix.com/kick-the-buddy/embed';
    }

    // 2. Eaglercraft
    if (isEaglercraft) {
      if (eaglerVersion === 'js') return 'https://eaglercraft.q13x.com/1.8.8/js/';
      return 'https://eaglercraft.q13x.com/1.8.8/wasm/';
    }

    // 3. YouTube with playlist presets
    if (isYouTube) {
      if (youtubeVideoId.startsWith('PL')) {
        return `https://www.youtube-nocookie.com/embed/videoseries?list=${youtubeVideoId}`;
      }
      return `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`;
    }

    let src = game.iframeSrc;
    if (!src && game.iframe) {
      const match = game.iframe.match(/src=["']([^"']+)["']/i);
      src = match ? match[1].replace(/&amp;/g, '&') : '';
    }
    if (!src) return '';

    if (src.includes('&amp;')) {
      src = src.replace(/&amp;/g, '&');
    }

    // Handle legacy eaglercraft URLs
    if (src.includes('iframe.eaglercraft.org') || src.includes('eaglercraft.com')) {
      return 'https://eaglercraft.q13x.com/1.8.8/wasm/';
    }

    // If it's a relative traffic-road reference
    if (src === 'game/traffic-road/' || src === 'game/traffic-road' || src.endsWith('traffic-road/')) {
      return 'https://trafficroad.github.io/';
    }

    // If it's a local absolute path like /games/snake.html
    if (src.startsWith('/') && !src.startsWith('//') && !src.startsWith('/api/')) {
      const base = (import.meta.env.BASE_URL || './').replace(/\/$/, '');
      return `${base}/${src.replace(/^\//, '')}`;
    }

    return src;
  };

  const iframeSrc = getIframeSrc();

  const getExternalLink = () => {
    if (game.webUrl) return game.webUrl;
    if (isTikTok) return 'https://www.tiktok.com/';
    if (isEaglercraft) return 'https://eaglercraft.q13x.com/1.8.8/wasm/';
    if (isKickTheBuddy) return 'https://play.gamepix.com/kick-the-buddy/embed';
    return iframeSrc;
  };

  const getIframeSandbox = () => {
    // Avoid sandbox restrictions for full functionality on apps, Eaglercraft, and Kick The Buddy
    if (game.isApp || isTikTok || isEaglercraft || isKickTheBuddy) return undefined;
    if (game.sandbox !== undefined) return game.sandbox || undefined;
    if (game.iframe) {
      const match = game.iframe.match(/sandbox=["']([^"']*)["']/i);
      if (match) return match[1];
    }
    return undefined;
  };

  const getIframeAllow = () => {
    if (game.allow) return game.allow;
    if (game.iframe) {
      const match = game.iframe.match(/allow=["']([^"']*)["']/i);
      if (match && match[1]) return match[1];
    }
    return "autoplay; fullscreen; gamepad; clipboard-write; clipboard-read; focus-without-user-activation; screen-wake-lock; accelerometer; gyroscope; magnetometer; camera; picture-in-picture; web-share";
  };

  const iframeSandbox = getIframeSandbox();
  const iframeAllow = getIframeAllow();

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting fullscreen:", err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleCopyIframe = () => {
    navigator.clipboard.writeText(game.iframe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard shortcut ESC to close if not fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={playerRef}
      className={`fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-y-auto ${
        isTheater ? 'p-0' : 'p-2 sm:p-4 md:p-6'
      }`}
    >
      <div className={`mx-auto w-full transition-all flex flex-col ${isTheater ? 'max-w-none h-full' : 'max-w-6xl'}`}>
        {/* Top Header Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-t-2xl p-3 sm:p-4 flex items-center justify-between gap-2">
          {/* Title & Badge */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Close Player (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white truncate">{game.title}</h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  {game.category || (game.isApp ? 'Web App' : 'Game')}
                </span>
                {game.badge && (
                  <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {game.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate hidden sm:block">
                {game.isApp ? 'Connected Web Application' : 'HTML5 Embedded Game'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={(e) => onToggleFavorite(e, game.id)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isFavorite
                  ? 'bg-rose-950/50 border-rose-800/60 text-rose-400'
                  : 'bg-slate-800 border-slate-700/80 text-slate-300 hover:text-rose-400'
              }`}
              title={isFavorite ? 'Remove Favorite' : 'Add Favorite'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
              <span className="hidden md:inline">{isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              onClick={handleReload}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-cyan-400 border border-slate-700 text-xs font-semibold transition-colors"
              title="Reload Frame"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsTheater(!isTheater)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
                isTheater
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-600/30'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isTheater ? "Exit Theater Mode" : "Theater Mode"}
            >
              <Layers className="w-4 h-4" />
            </button>

            <button
              onClick={handleFullscreen}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-cyan-400 border border-slate-700 text-xs font-semibold transition-colors"
              title="Full Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= SPECIALIZED TOOLBARS ================= */}

        {/* 1. ChatGPT Toolbar */}
        {isChatGPT && (
          <div className="bg-slate-900/95 border-x border-b border-slate-800 px-3 py-2 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
                <Bot className="w-3.5 h-3.5" />
                AI Assistant Engine Ready
              </span>
              <span className="text-slate-400 hidden md:inline">
                Ask questions, generate ideas, analyze text, or write code.
              </span>
            </div>
          </div>
        )}

        {/* 2. YouTube Toolbar */}
        {isYouTube && (
          <div className="bg-slate-900/95 border-x border-b border-slate-800 px-3 py-2 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950/80 border border-red-800/60 text-red-400">
                <Play className="w-3.5 h-3.5" />
                YouTube Player
              </span>
              <span className="text-slate-400 hidden sm:inline">Active Unblocked Stream:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setYoutubeVideoId('PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  youtubeVideoId === 'PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj'
                    ? 'bg-red-500 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Top Hits
              </button>
              <button
                onClick={() => setYoutubeVideoId('jfKfPfyJRdk')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  youtubeVideoId === 'jfKfPfyJRdk'
                    ? 'bg-red-500 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                24/7 Lofi Live
              </button>
              <button
                onClick={() => setYoutubeVideoId('PL4fGSI1pDJn6jXS_PEoN9PBiiPr6V9Qez')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  youtubeVideoId === 'PL4fGSI1pDJn6jXS_PEoN9PBiiPr6V9Qez'
                    ? 'bg-red-500 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Gaming Series
              </button>
            </div>
          </div>
        )}

        {/* 3. Dedicated Eaglercraft Toolbar */}
        {isEaglercraft && (
          <div className="bg-slate-900/95 border-x border-b border-slate-800 px-3 py-2.5 sm:px-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                EaglercraftX 1.8.8 WASM Connected
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Click game canvas to lock cursor • Press Esc to unlock
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setEaglerVersion('wasm')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  eaglerVersion === 'wasm'
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Direct WebAssembly Minecraft 1.8.8 engine (Fastest & Unblocked)"
              >
                WASM (High FPS)
              </button>
              <button
                onClick={() => setEaglerVersion('js')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  eaglerVersion === 'js'
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="JavaScript Minecraft 1.8.8 fallback"
              >
                JS Engine
              </button>
            </div>
          </div>
        )}

        {/* ================= VIEWPORT / FRAME ================= */}
        <div
          className={`relative bg-black flex items-center justify-center overflow-hidden border-x border-slate-800 transition-all ${
            isTheater ? 'flex-1 min-h-[520px]' : 'h-[520px] sm:h-[600px] md:h-[650px]'
          }`}
        >
          {/* Custom dedicated apps */}
          {isSpotify ? (
            <SpotifyPlayer />
          ) : isTikTok ? (
            <TikTokPlayer />
          ) : isSnapchat ? (
            <SnapchatViewer />
          ) : isTwitch ? (
            <TwitchLivePlayer />
          ) : isXbox ? (
            <XboxCloudHub />
          ) : isEntertainment ? (
            <EntertainmentHub app={game} />
          ) : isWebBrowser ? (
            <UnblockedBrowser />
          ) : isChatGPT && chatGptView === 'assistant' ? (
            <div className="w-full h-full bg-slate-950 flex flex-col">
              {/* Chat Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 max-w-2xl ${
                      msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`rounded-2xl p-3.5 sm:p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-cyan-600 text-white rounded-tr-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                      }`}
                    >
                      {msg.text}
                      <span className="block mt-1 text-[10px] opacity-60 text-right">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start gap-3 max-w-2xl">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 text-slate-400 text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-semibold text-slate-500 shrink-0">Suggested:</span>
                {[
                  "Explain quantum computing simply",
                  "Write a Python factorial script",
                  "Give me 4 great essay topics",
                  "Tell me a clever programming joke"
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask the AI Assistant anything..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim() || isTyping}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          ) : iframeSrc ? (
            <iframe
              key={`${reloadKey}-${iframeSrc}`}
              src={iframeSrc}
              title={game.title}
              className="w-full h-full border-0 outline-none bg-black"
              allow={iframeAllow}
              sandbox={iframeSandbox}
              allowFullScreen
            />
          ) : (
            <div
              key={reloadKey}
              className="w-full h-full flex items-center justify-center bg-black"
              dangerouslySetInnerHTML={{ __html: game.iframe }}
            />
          )}
        </div>

        {/* Bottom Details Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-b-2xl p-4 sm:p-5 space-y-4">
          {/* Controls & Quick description */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Gamepad className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-medium">Controls: </span>
                <span className="text-xs font-semibold text-slate-200">{game.controls}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                <Code className="w-3.5 h-3.5 text-amber-400" />
                <span>Iframe Markup</span>
                {showCode ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Expandable JSON Iframe Code viewer */}
          {showCode && (
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Stored Iframe Markup in Portal</span>
                <button
                  onClick={handleCopyIframe}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Iframe'}</span>
                </button>
              </div>
              <pre className="p-2.5 bg-slate-900 text-slate-300 text-xs font-mono rounded-lg overflow-x-auto border border-slate-800 select-all">
                {game.iframe}
              </pre>
            </div>
          )}

          {/* Description */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-slate-500 shrink-0" />
            <p className="leading-relaxed">{game.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
