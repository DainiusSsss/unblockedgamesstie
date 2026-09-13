import React, { useState } from 'react';
import { X, Copy, Check, Download, RotateCcw, FileJson } from 'lucide-react';

export const JsonModal = ({
  games,
  isOpen,
  onClose,
  onResetDefaults,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('raw');

  if (!isOpen) return null;

  const jsonString = JSON.stringify(games, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base sm:text-lg">games.json Database</h2>
              <p className="text-xs text-slate-400">All games with embedded &lt;iframe&gt; records</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1 rounded-xl flex items-center gap-1 border border-slate-700">
              <button
                onClick={() => setActiveTab('raw')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'raw' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Raw JSON
              </button>
              <button
                onClick={() => setActiveTab('parsed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'parsed' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Iframe List ({games.length})
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === 'raw' ? (
            <div className="relative">
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300/90 leading-relaxed overflow-x-auto select-all max-h-[58vh]">
                {jsonString}
              </pre>
            </div>
          ) : (
            <div className="space-y-3">
              {games.map((g, idx) => (
                <div key={g.id || idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-100">{g.title}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {g.category}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">ID: {g.id}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs font-mono text-amber-300/90 overflow-x-auto">
                    {g.iframe}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download games.json</span>
            </button>
          </div>

          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
