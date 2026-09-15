import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Tv,
  Play,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Flame,
  Globe,
  Radio,
  Sliders,
  Maximize2,
  HelpCircle,
  Zap,
  RotateCcw
} from 'lucide-react';

const INSTANT_CLOUD_GAMES = [
  {
    id: 'traffic-road',
    title: 'Traffic Road 3D',
    category: '3D Racing / Speed',
    embedUrl: 'https://trafficroad.github.io/',
    badge: 'Gamepad Ready',
    desc: 'High-speed first-person 3D motorcycle racing simulation with career mode, multiple bikes, and gamepad support.'
  },
  {
    id: 'escape-road',
    title: 'Escape Road 3D',
    category: '3D Action / Getaway',
    embedUrl: 'https://gamea.azgame.io/escape-road-3/',
    badge: '60 FPS Cloud',
    desc: 'High-adrenaline police getaway 3D chase. Drift through city streets, collect powerups, and escape the SWAT vehicles.'
  },
  {
    id: 'highway-traffic',
    title: 'Highway Traffic 3D',
    category: '3D Simulation',
    embedUrl: 'https://dnrweqffuwjtx.cloudfront.net/games/2022/unity/highway-traffic/index.html',
    badge: 'Full 3D Physics',
    desc: 'Realistic 3D highway simulation with day, night, and rainy weather conditions across multi-lane highways.'
  },
  {
    id: 'eaglercraft',
    title: 'Eaglercraft 3D (Minecraft)',
    category: '3D Sandbox / Survival',
    embedUrl: 'https://eaglercraft.q13x.com/1.8.8/wasm/',
    badge: 'Multiplayer 3D',
    desc: 'Full Minecraft 3D running directly in your browser with survival, creative mode, and multiplayer server lobbies.'
  },
  {
    id: 'basketball-stars',
    title: 'Basketball Stars 2026',
    category: '2-Player Sports',
    embedUrl: 'https://html5.gamedistribution.com/516d6908fbc848bdb89e65a58a43a7dc/?gd_sdk_referrer_url=https://basketball-stars.io/basketball-stars-2026',
    badge: 'Tournament Mode',
    desc: 'Head-to-head 3D cartoon basketball tournament with special power shots, blocks, and 2-player local mode.'
  }
];

const CLOUD_SERVICES = [
  {
    id: 'xbox',
    name: 'Xbox Cloud Gaming (xCloud)',
    provider: 'Microsoft',
    url: 'https://www.xbox.com/play',
    badge: 'Fortnite Free-to-Play',
    color: '#107c10',
    description: 'Stream hundreds of Xbox Series X games instantly. Free games like Fortnite require zero Game Pass subscription!',
    features: ['1080p 60FPS Cloud Stream', 'Full Controller Support', 'Cross-Save with Xbox Console/PC']
  },
  {
    id: 'geforce',
    name: 'NVIDIA GeForce NOW',
    provider: 'NVIDIA',
    url: 'https://play.geforcenow.com/',
    badge: 'RTX Cloud Gaming',
    color: '#76b900',
    description: 'Stream your own PC games from Steam, Epic Games Store, and Ubisoft Connect powered by RTX cloud servers.',
    features: ['RTX Ray Tracing Support', 'Steam & Epic Cloud Sync', 'Browser Native']
  },
  {
    id: 'luna',
    name: 'Amazon Luna',
    provider: 'Amazon',
    url: 'https://luna.amazon.com/',
    badge: 'Prime Gaming',
    color: '#9146ff',
    description: 'Amazon cloud gaming service with rotating free games for Prime members and Ubisoft+ integration.',
    features: ['Direct Cloud Connect', 'Instant Play in Chrome/Edge', 'No Downloads']
  }
];

export const XboxCloudHub = () => {
  // Default to instant-cloud games so there is NEVER a "refused to connect" error
  const [activeTab, setActiveTab] = useState('instant-cloud'); // 'instant-cloud' | 'services' | 'tester'
  const [selectedGame, setSelectedGame] = useState(INSTANT_CLOUD_GAMES[0]);
  const [selectedService, setSelectedService] = useState(CLOUD_SERVICES[0]);
  const [reloadKey, setReloadKey] = useState(0);

  // Live Gamepad Diagnostics State
  const [gamepads, setGamepads] = useState([]);
  const [activeGamepadIndex, setActiveGamepadIndex] = useState(0);
  const [controllerState, setControllerState] = useState({
    buttons: [],
    axes: [0, 0, 0, 0]
  });

  // Gamepad Polling Loop
  useEffect(() => {
    let animationFrameId;

    const pollGamepads = () => {
      const detected = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : [];
      setGamepads(detected);

      if (detected.length > 0) {
        const gp = detected[activeGamepadIndex] || detected[0];
        setControllerState({
          buttons: gp.buttons.map((b) => ({
            pressed: b.pressed,
            value: b.value
          })),
          axes: gp.axes ? Array.from(gp.axes) : [0, 0, 0, 0]
        });
      }

      animationFrameId = requestAnimationFrame(pollGamepads);
    };

    animationFrameId = requestAnimationFrame(pollGamepads);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeGamepadIndex]);

  return (
    <div className="w-full h-full bg-[#080d16] text-white flex flex-col select-none overflow-hidden font-sans">
      {/* Top Cloud Gaming Header */}
      <div className="bg-[#0b1322] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0 z-30">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-600/30">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm tracking-wide text-white">
                CLOUD GAMING <span className="text-emerald-400 text-xs">ONLINE</span>
              </h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Live 60 FPS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Zero-install 3D cloud gaming with native controller support
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('instant-cloud')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'instant-cloud'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Play 3D Games</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'services'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>xCloud & GeForce NOW</span>
          </button>

          <button
            onClick={() => setActiveTab('tester')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tester'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Controller Tester</span>
          </button>
        </div>

        {/* Gamepad Status Indicator */}
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
              gamepads.length > 0
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {gamepads.length > 0 ? `${gamepads.length} Gamepad Connected` : 'Connect Controller'}
            </span>
          </span>
        </div>
      </div>

      {/* VIEW 1: PLAYABLE INSTANT 3D CLOUD GAMES (ZERO REFUSED TO CONNECT) */}
      {activeTab === 'instant-cloud' && (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Game Selection Rail */}
          <div className="w-full md:w-[320px] bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-800 p-3.5 flex flex-col justify-between shrink-0 space-y-3 overflow-y-auto">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select 3D Cloud Game
              </span>

              {INSTANT_CLOUD_GAMES.map((game) => {
                const isSelected = selectedGame.id === game.id;
                return (
                  <button
                    key={game.id}
                    onClick={() => {
                      setSelectedGame(game);
                      setReloadKey((k) => k + 1);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md shadow-emerald-950/50 ring-1 ring-emerald-500/30'
                        : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{game.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                        {game.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {game.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Reload and Game Controls Guide */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Controls:
                </span>
                <button
                  onClick={() => setReloadKey((k) => k + 1)}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Reload Game"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Supports WASD, Arrow keys, mouse, and connected USB/Bluetooth controllers. Click inside the canvas to lock controls.
              </p>
            </div>
          </div>

          {/* Right Active Game Stage */}
          <div className="flex-1 bg-black relative flex flex-col">
            <iframe
              key={`${selectedGame.id}-${reloadKey}`}
              src={selectedGame.embedUrl}
              title={selectedGame.title}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="gamepad; autoplay; fullscreen; keyboard-map"
              className="w-full h-full flex-1 border-0"
            />
          </div>
        </div>
      )}

      {/* VIEW 2: XBOX CLOUD GAMING & GEFORCE NOW HUB */}
      {activeTab === 'services' && (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-950">
          {/* Left Service Selector */}
          <div className="w-full md:w-[340px] bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 p-5 flex flex-col justify-between shrink-0 space-y-4 overflow-y-auto">
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Cloud Provider
              </span>

              {CLOUD_SERVICES.map((svc) => {
                const isSelected = selectedService.id === svc.id;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedService(svc)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-500 shadow-lg shadow-emerald-950/30'
                        : 'bg-slate-950/40 hover:bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-white">{svc.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                        {svc.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{svc.description}</p>
                  </button>
                );
              })}

              {/* Service Info Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Provider Features:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                  {selectedService.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Launch Cloud Service Button */}
            <div className="space-y-2 pt-2">
              <a
                href={selectedService.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Launch {selectedService.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[10px] text-slate-500 text-center">
                Requires Microsoft or NVIDIA account login. Free games (e.g. Fortnite) require no subscription.
              </p>
            </div>
          </div>

          {/* Right Info & Stream Launcher Panel */}
          <div className="flex-1 bg-black p-6 flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-20 h-20 rounded-3xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-2xl">
              <Gamepad2 className="w-10 h-10" />
            </div>

            <div className="max-w-md space-y-2">
              <h3 className="text-xl font-black text-white">
                {selectedService.name} Cloud Portal
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Due to Microsoft and NVIDIA cross-origin security protocols, cloud game streams run in their dedicated hardware-accelerated session for direct gamepad pointer lock and lowest input latency.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <a
                href={selectedService.url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>Open {selectedService.name} Direct Player</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setActiveTab('instant-cloud')}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Play In-Browser 3D Games Instead</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: LIVE GAMEPAD CONTROLLER TESTER & CALIBRATION */}
      {activeTab === 'tester' && (
        <div className="flex-1 bg-slate-950 p-6 flex flex-col items-center justify-center overflow-y-auto">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-white">
                  Controller Input & Stick Drift Tester
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                {gamepads.length > 0 ? 'Gamepad Active' : 'Waiting for Input'}
              </span>
            </div>

            {gamepads.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
                <p className="text-sm font-bold text-slate-300">
                  No Gamepad Detected
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Plug in your Xbox, PlayStation, or generic controller via USB, or connect via Bluetooth, then press any button to activate.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Thumbsticks Visualizer */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Stick */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                    <span className="text-xs font-bold text-slate-400">Left Stick (LS)</span>
                    <div className="w-24 h-24 rounded-full border-2 border-slate-700 bg-slate-900 mx-auto relative flex items-center justify-center">
                      <div
                        className="w-8 h-8 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50 absolute"
                        style={{
                          transform: `translate(${controllerState.axes[0] * 32}px, ${controllerState.axes[1] * 32}px)`
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      X: {controllerState.axes[0]?.toFixed(2)} | Y: {controllerState.axes[1]?.toFixed(2)}
                    </span>
                  </div>

                  {/* Right Stick */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                    <span className="text-xs font-bold text-slate-400">Right Stick (RS)</span>
                    <div className="w-24 h-24 rounded-full border-2 border-slate-700 bg-slate-900 mx-auto relative flex items-center justify-center">
                      <div
                        className="w-8 h-8 rounded-full bg-cyan-500 shadow-md shadow-cyan-500/50 absolute"
                        style={{
                          transform: `translate(${controllerState.axes[2] * 32}px, ${controllerState.axes[3] * 32}px)`
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      X: {controllerState.axes[2]?.toFixed(2)} | Y: {controllerState.axes[3]?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Face Buttons (A, B, X, Y) */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 block mb-3 text-center">
                    Action Buttons & Bumpers
                  </span>
                  <div className="flex flex-wrap justify-center gap-3">
                    {['A / ✕', 'B / ○', 'X / □', 'Y / △', 'LB / L1', 'RB / R1', 'LT / L2', 'RT / R2'].map(
                      (btnName, idx) => {
                        const isPressed = controllerState.buttons[idx]?.pressed;
                        return (
                          <div
                            key={btnName}
                            className={`w-16 h-12 rounded-xl border flex flex-col items-center justify-center transition-all ${
                              isPressed
                                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/50 scale-105'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className="text-xs font-bold">{btnName}</span>
                            <span className="text-[9px] text-slate-500">
                              {isPressed ? 'PRESS' : 'IDLE'}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
