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
  Tv
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

  // Parse iframe src from game.iframe string if iframeSrc is not provided and adapt base path
  const getIframeSrc = () => {
    let src = game.iframeSrc;
    if (!src && game.iframe) {
      const match = game.iframe.match(/src=["']([^"']+)["']/i);
      src = match ? match[1] : '';
    }
    if (!src) return '';
    // If it's a local absolute path like /games/snake.html, resolve with BASE_URL
    if (src.startsWith('/') && !src.startsWith('//')) {
      const base = (import.meta.env.BASE_URL || './').replace(/\/$/, '');
      return `${base}/${src.replace(/^\//, '')}`;
    }
    return src;
  };

  const iframeSrc = getIframeSrc();

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
      <div className={`mx-auto w-full flex flex-col flex-1 ${isTheater ? 'max-w-full h-full' : 'max-w-6xl'}`}>
        {/* Top Control Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-t-2xl px-4 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Back to games catalog (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-100 text-base sm:text-lg">{game.title}</h2>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {game.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">JSON-embedded iframe player</p>
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
              title="Restart Game"
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

            {iframeSrc && (
              <a
                href={iframeSrc}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                title="Open Game in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Iframe Viewport Container */}
        <div
          className={`relative bg-black flex items-center justify-center overflow-hidden border-x border-slate-800 transition-all ${
            isTheater ? 'flex-1 min-h-[500px]' : 'h-[520px] sm:h-[600px] md:h-[650px]'
          }`}
        >
          {iframeSrc ? (
            <iframe
              key={reloadKey}
              src={iframeSrc}
              title={game.title}
              className="w-full h-full border-0 outline-none"
              allow="autoplay; fullscreen; gamepad; focus-without-user-activation *"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
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
                <span>JSON Iframe Tag</span>
                {showCode ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Expandable JSON Iframe Code viewer */}
          {showCode && (
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Stored Iframe Markup in games.json</span>
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
          <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{game.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
