import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Maximize2,
  RotateCcw,
  ExternalLink,
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
  Globe
} from 'lucide-react';

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

  const isEaglercraft =
    game.id?.includes('eaglercraft') ||
    game.title?.toLowerCase().includes('eaglercraft') ||
    (game.iframe && game.iframe.includes('eaglercraft'));

  const isTikTok =
    game.id === 'tiktok' ||
    game.title?.toLowerCase().includes('tiktok') ||
    (game.iframe && game.iframe.includes('tiktok'));

  // Eaglercraft version switch: 'wasm' (direct, unblocked) | 'js' | 'proxy'
  const [eaglerVersion, setEaglerVersion] = useState('wasm');

  // TikTok mode: 'normal' (unblocked normal tiktok web) | 'croxy' | 'direct'
  const [tiktokMode, setTiktokMode] = useState('normal');

  // Generic app mode: 'default' | 'proxy' | 'croxy'
  const [appMode, setAppMode] = useState('default');

  // Parse iframe src and adapt to prevent "refused to connect"
  const getIframeSrc = () => {
    if (isEaglercraft) {
      if (eaglerVersion === 'js') return 'https://eaglercraft.q13x.com/1.8.8/js/';
      if (eaglerVersion === 'proxy') return '/api/proxy?url=https%3A%2F%2Fiframe.eaglercraft.org%2Fshell.html';
      return 'https://eaglercraft.q13x.com/1.8.8/wasm/';
    }

    if (isTikTok) {
      if (tiktokMode === 'croxy') {
        return 'https://www.croxyproxy.com/';
      }
      if (tiktokMode === 'direct') {
        return 'https://www.tiktok.com/';
      }
      return '/api/proxy?url=https%3A%2F%2Fwww.tiktok.com%2F';
    }

    if (game.isApp) {
      if (appMode === 'proxy' && (game.proxyUrl || game.webUrl)) {
        return game.proxyUrl || `/api/proxy?url=${encodeURIComponent(game.webUrl)}`;
      }
      if (appMode === 'croxy') {
        return 'https://www.croxyproxy.com/';
      }
      if (appMode === 'direct' && game.webUrl) {
        return game.webUrl;
      }
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

    // Handle legacy eaglercraft URLs that cause refused to connect
    if (src.includes('iframe.eaglercraft.org') || src.includes('eaglercraft.com')) {
      return 'https://eaglercraft.q13x.com/1.8.8/wasm/';
    }

    // Handle legacy raw tiktok.com URL
    if (src === 'https://www.tiktok.com/' || src === 'https://www.tiktok.com' || src === 'https://tiktok.com') {
      return '/api/proxy?url=https%3A%2F%2Fwww.tiktok.com%2F';
    }

    // If it's a relative traffic-road reference, resolve to official web host
    if (src === 'game/traffic-road/' || src === 'game/traffic-road' || src.endsWith('traffic-road/')) {
      return 'https://trafficroad.github.io/';
    }

    // If it's a local absolute path like /games/snake.html, resolve with BASE_URL
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
    return iframeSrc;
  };

  const getIframeSandbox = () => {
    if (isTikTok || isEaglercraft) return undefined; // Avoid sandbox restrictions for full functionality
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

  const handleLoadCustomVideo = (e) => {
    e.preventDefault();
    if (!customVideoInput.trim()) return;
    const input = customVideoInput.trim();
    // Try to extract video ID from URL or take raw numeric string
    const match = input.match(/\/video\/(\d+)/) || input.match(/(\d{15,22})/);
    if (match) {
      setTiktokVideoId(match[1]);
      setTiktokMode('player');
      setCustomVideoInput('');
    } else {
      // If user provided a raw id
      setTiktokVideoId(input);
      setTiktokMode('player');
      setCustomVideoInput('');
    }
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
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
              title="Restart / Reload"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsTheater(!isTheater)}
              className={`p-2 rounded-xl border transition-colors ${
                isTheater
                  ? 'bg-cyan-950 border-cyan-700 text-cyan-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/80'
              }`}
              title={isTheater ? 'Standard View' : 'Theater / Wide View'}
            >
              <Tv className="w-4 h-4" />
            </button>

            <button
              onClick={handleFullscreen}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
              title="Fullscreen Mode"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <a
              href={getExternalLink()}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-1"
              title="Open in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-semibold">New Tab</span>
            </a>
          </div>
        </div>

        {/* Dedicated TikTok Toolbar to prevent "Refused to Connect" */}
        {isTikTok && (
          <div className="bg-slate-900/95 border-x border-b border-slate-800 px-3 py-2.5 sm:px-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-950/80 border border-pink-800/60 text-pink-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Normal TikTok Active (Unblocked)
                </span>
                <span className="text-xs text-slate-400 hidden md:inline">
                  Streaming normal TikTok feed with anti-blocking proxy headers.
                </span>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setTiktokMode('normal')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    tiktokMode === 'normal'
                      ? 'bg-pink-500 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Normal TikTok Web
                </button>
                <button
                  onClick={() => setTiktokMode('croxy')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    tiktokMode === 'croxy'
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  CroxyProxy Mirror
                </button>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg font-medium text-slate-400 hover:text-pink-400 flex items-center gap-1 transition-colors"
                >
                  <span>Open Full TikTok</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Generic App Toolbar for Spotify, Snapchat, YouTube, etc. */}
        {game.isApp && !isTikTok && (
          <div className="bg-slate-900/95 border-x border-b border-slate-800 px-3 py-2 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                {game.title} Web Player
              </span>
              <span className="text-slate-400 hidden sm:inline">
                Switch modes if your network or browser requires alternate routing.
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setAppMode('default')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  appMode === 'default'
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Default Player
              </button>
              <button
                onClick={() => setAppMode('proxy')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  appMode === 'proxy'
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Unblock Proxy
              </button>
              <button
                onClick={() => setAppMode('croxy')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  appMode === 'croxy'
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CroxyProxy
              </button>
              <a
                href={game.webUrl || iframeSrc}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg font-medium text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <span>Full Web</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Dedicated Eaglercraft Toolbar to prevent "Refused to Connect" */}
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

            {/* Version Switcher */}
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
              <button
                onClick={() => setEaglerVersion('proxy')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  eaglerVersion === 'proxy'
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Proxy mirror for iframe.eaglercraft.org stripping X-Frame-Options"
              >
                Proxy Mirror
              </button>
            </div>
          </div>
        )}

        {/* Iframe Viewport Container */}
        <div
          className={`relative bg-black flex items-center justify-center overflow-hidden border-x border-slate-800 transition-all ${
            isTheater ? 'flex-1 min-h-[520px]' : 'h-[520px] sm:h-[600px] md:h-[650px]'
          }`}
        >
          {iframeSrc ? (
            <iframe
              key={`${reloadKey}-${iframeSrc}`}
              src={iframeSrc}
              title={game.title}
              className="w-full h-full border-0 outline-none"
              allow={iframeAllow}
              sandbox={iframeSandbox}
              allowFullScreen
            />
          ) : (
            <div
              key={reloadKey}
              className="w-full h-full flex items-center justify-center"
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
          <div className="pt-2 border-t border-slate-800/80 flex items-start justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{game.description}</p>
            </div>
            {isTikTok && (
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 rounded-lg text-xs font-semibold transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open TikTok App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
