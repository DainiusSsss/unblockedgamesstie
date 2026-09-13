import React, { useState, useEffect } from 'react';
import { X, Plus, Gamepad2, Smartphone } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
  defaultSection = 'games',
}) => {
  const [entryType, setEntryType] = useState(defaultSection === 'apps' ? 'app' : 'game');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(defaultSection === 'apps' ? 'Social' : 'Action');
  const [iframeInput, setIframeInput] = useState('');
  const [description, setDescription] = useState('');
  const [controls, setControls] = useState('');
  const [accentColor, setAccentColor] = useState(defaultSection === 'apps' ? '#ec4899' : '#06b6d4');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const isApp = defaultSection === 'apps';
      setEntryType(isApp ? 'app' : 'game');
      setCategory(isApp ? 'Social' : 'Action');
      setAccentColor(isApp ? '#ec4899' : '#06b6d4');
    }
  }, [isOpen, defaultSection]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError(`Please enter a ${entryType === 'app' ? 'web app' : 'game'} title`);
      return;
    }
    if (!iframeInput.trim()) {
      setError('Please enter an iframe embed code or URL');
      return;
    }

    let finalIframe = iframeInput.trim();
    let finalSrc = '';

    // If the user entered a raw URL instead of an <iframe> tag, wrap it in a proper iframe tag
    if (finalIframe.startsWith('http://') || finalIframe.startsWith('https://') || finalIframe.startsWith('/')) {
      finalSrc = finalIframe;
      finalIframe = `<iframe src="${finalSrc}" title="${title}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`;
    } else {
      // Extract src attribute if present
      const match = finalIframe.match(/src=["']([^"']+)["']/i);
      if (match) {
        finalSrc = match[1];
      }
    }

    const isApp = entryType === 'app';
    const newEntry = {
      id: `${isApp ? 'app' : 'custom'}-${Date.now()}`,
      title: title.trim(),
      category: category,
      isApp: isApp,
      description: description.trim() || (isApp ? 'Custom added web application.' : 'Custom added unblocked iframe game.'),
      controls: controls.trim() || (isApp ? 'Scroll and click to interact with the web app.' : 'Standard keyboard and mouse controls.'),
      badge: isApp ? 'Custom App' : 'Custom',
      rating: 5.0,
      plays: '1',
      isFeatured: false,
      iframe: finalIframe,
      iframeSrc: finalSrc,
      accentColor: accentColor,
      icon: isApp ? 'Smartphone' : 'Gamepad2',
      isCustom: true,
    };

    onAddGame(newEntry);
    onClose();
    // Reset fields
    setTitle('');
    setIframeInput('');
    setDescription('');
    setControls('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
              entryType === 'app'
                ? 'bg-pink-500/10 border-pink-500/20 text-pink-400'
                : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
            }`}>
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base">
                Add {entryType === 'app' ? 'Web App' : 'Game'} to Portal
              </h2>
              <p className="text-xs text-slate-400">Stores as an iframe embed in the JSON catalog</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type selector */}
        <div className="px-4 sm:px-5 pt-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setEntryType('game');
                setCategory('Action');
                setAccentColor('#06b6d4');
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                entryType === 'game'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Game</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEntryType('app');
                setCategory('Social');
                setAccentColor('#ec4899');
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                entryType === 'app'
                  ? 'bg-pink-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Web App</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
          {error && (
            <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-800/60 text-xs text-rose-300">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {entryType === 'app' ? 'App Name *' : 'Game Title *'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={entryType === 'app' ? 'e.g. TikTok, Spotify, Discord' : 'e.g. Escape Road 3, Traffic Road'}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
              {entryType === 'app' ? (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="Social">Social</option>
                  <option value="Media">Media & Video</option>
                  <option value="Web">Web Portal</option>
                  <option value="Tools">Tools</option>
                </select>
              ) : (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Action">Action</option>
                  <option value="Sports">Sports</option>
                  <option value="Arcade">Arcade</option>
                  <option value="Retro">Retro</option>
                  <option value="Casual">Casual</option>
                  <option value="Puzzle">Puzzle</option>
                </select>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-9 h-9 rounded-lg border border-slate-800 bg-transparent cursor-pointer"
                />
                <span className="text-xs text-slate-400 font-mono uppercase">{accentColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Iframe Embed Code or URL *
            </label>
            <textarea
              required
              rows={3}
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              placeholder={`Paste <iframe ...> or direct https:// URL\nExample: <iframe src="https://..." allowfullscreen></iframe>`}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Supports full &lt;iframe&gt; strings or raw HTTPS URLs.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short summary of the app or game"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Controls / Usage Hint (Optional)</label>
            <input
              type="text"
              value={controls}
              onChange={(e) => setControls(e.target.value)}
              placeholder="e.g. WASD to move, Arrow keys to steer, Mouse to scroll"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                entryType === 'app'
                  ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-pink-600/20'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/20'
              }`}
            >
              Add {entryType === 'app' ? 'Web App' : 'Game'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
