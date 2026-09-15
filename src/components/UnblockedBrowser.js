import React, { useState } from 'react';
import {
  Globe,
  Search,
  RotateCcw,
  ShieldCheck,
  Bookmark,
  ExternalLink,
  BookOpen,
  Archive,
  Calculator,
  Languages
} from 'lucide-react';

const BOOKMARKS = [
  { name: 'Bing Search', url: 'https://www.bing.com/search?q=unblocked+games', icon: Globe },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Main_Page', icon: BookOpen },
  { name: 'Internet Archive', url: 'https://archive.org/', icon: Archive },
  { name: 'Scientific Calc', url: 'https://www.desmos.com/scientific', icon: Calculator },
  { name: 'Translator', url: 'https://www.bing.com/translator', icon: Languages }
];

export const UnblockedBrowser = () => {
  const [targetUrl, setTargetUrl] = useState('https://www.bing.com/search?q=unblocked+games');
  const [inputUrl, setInputUrl] = useState('https://www.bing.com/search?q=unblocked+games');
  const [reloadKey, setReloadKey] = useState(0);

  const handleNavigate = (e) => {
    e?.preventDefault();
    if (!inputUrl.trim()) return;
    let url = inputUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // If it looks like a domain, prepend https://, else search on Bing
      if (url.includes('.') && !url.includes(' ')) {
        url = 'https://' + url;
      } else {
        url = `https://www.bing.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    setTargetUrl(url);
    setInputUrl(url);
  };

  const handleBookmarkClick = (url) => {
    setInputUrl(url);
    setTargetUrl(url);
  };

  return (
    <div className="w-full h-full bg-slate-950 flex flex-col text-white select-none overflow-hidden">
      {/* Top Browser Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors"
            title="Reload Page"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secure Unblocked Browser</span>
          </div>
        </div>

        {/* Address / Search Input Form */}
        <form onSubmit={handleNavigate} className="flex-1 max-w-xl flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Search or enter web address..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
          >
            Go
          </button>
        </form>

        {/* Bookmarks bar */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full">
          {BOOKMARKS.map((bm) => {
            const Icon = bm.icon;
            const isActive = targetUrl === bm.url;
            return (
              <button
                key={bm.name}
                onClick={() => handleBookmarkClick(bm.url)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs shrink-0 transition-colors border ${
                  isActive
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-semibold'
                    : 'bg-slate-800 border-slate-700/60 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3 h-3 text-cyan-400" />
                <span className="hidden md:inline">{bm.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Browser Viewport */}
      <div className="flex-1 w-full bg-white relative">
        <iframe
          key={`${reloadKey}-${targetUrl}`}
          src={targetUrl}
          title="Unblocked Web Browser"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate max-w-md">{targetUrl}</span>
        <span className="text-cyan-400 font-medium">Bypasses Firewall Filter Restrictions</span>
      </div>
    </div>
  );
};
