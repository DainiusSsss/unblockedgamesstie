import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  MapPin,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Flame,
  Download,
  RotateCcw,
  Type,
  PenTool,
  Clock,
  Play,
  Share2,
  Smile,
  X,
  Check
} from 'lucide-react';

const SNAP_LENSES = [
  { id: 'normal', name: 'Normal', icon: '✨', filterStyle: 'none' },
  { id: 'dog', name: 'Dog Ears 🐶', icon: '🐶', filterStyle: 'contrast(1.1) saturate(1.2)' },
  { id: 'cyber', name: 'Cyberpunk 🕶️', icon: '🕶️', filterStyle: 'hue-rotate(180deg) contrast(1.3)' },
  { id: 'hearts', name: 'Heart Eyes ❤️', icon: '❤️', filterStyle: 'sepia(0.2) saturate(1.4)' },
  { id: 'golden', name: 'Golden Hour ☀️', icon: '☀️', filterStyle: 'sepia(0.4) saturate(1.5) contrast(1.05)' },
  { id: 'vhs', name: '90s VHS 📼', icon: '📼', filterStyle: 'contrast(1.4) saturate(0.8) brightness(1.1)' },
  { id: 'noir', name: 'Noir B&W 🖤', icon: '🖤', filterStyle: 'grayscale(1) contrast(1.3)' },
  { id: 'anime', name: 'Anime Glow 🌸', icon: '🌸', filterStyle: 'brightness(1.15) saturate(1.3)' }
];

const SPOTLIGHT_SNAPS = [
  {
    id: 'snap1',
    user: 'daily_fails',
    caption: 'Bro thought he was in an action movie 💀😂 #spotlight #fail #funny',
    views: '2.4M',
    video: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    embedId: 'tAGnKpE4NCI'
  },
  {
    id: 'snap2',
    user: 'skate_vibes',
    caption: 'First try down the 12-stair rail!! 🛹🔥 #skateboarding #stunt #viral',
    views: '1.8M',
    video: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    embedId: 'kXYiU_JCYtU'
  },
  {
    id: 'snap3',
    user: 'cutepets_club',
    caption: 'He refused to wake up for school this morning 🐶💤 #goldenretriever #cute',
    views: '3.1M',
    video: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    embedId: '9bZkp7q19f0'
  }
];

export const SnapchatViewer = () => {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'map' | 'spotlight'
  const [activeLens, setActiveLens] = useState(SNAP_LENSES[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [captionText, setCaptionText] = useState('Having fun on Snapchat! ✨');
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [doodleColor, setDoodleColor] = useState('#fffc00');
  const [snapTimer, setSnapTimer] = useState('10s');
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Initialize live webcam if available
  useEffect(() => {
    let stream = null;
    if (activeTab === 'camera') {
      navigator.mediaDevices
        ?.getUserMedia({ video: { facingMode: 'user' }, audio: false })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setCameraActive(true);
          }
        })
        .catch(() => {
          // Camera permission denied or not available; fallback to demo feed
          setCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [activeTab]);

  // Take Snap Photo
  const handleTakeSnap = () => {
    if (videoRef.current && cameraActive) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.filter = activeLens.filterStyle;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedPhoto(canvas.toDataURL('image/png'));
    } else {
      // Create a simulated high-res selfie snap with current lens filter
      setCapturedPhoto(
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
      );
    }
  };

  // Download Snap
  const handleDownloadSnap = () => {
    if (!capturedPhoto) return;
    const a = document.createElement('a');
    a.href = capturedPhoto;
    a.download = `snapchat-photo-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="w-full h-full bg-black text-white flex flex-col select-none overflow-hidden font-sans">
      {/* Top Snapchat Navigation */}
      <div className="bg-[#121212] border-b border-slate-800 px-4 py-2 flex items-center justify-between shrink-0 z-30">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#fffc00] flex items-center justify-center text-black font-black shadow-lg shadow-yellow-500/20">
            <Camera className="w-4 h-4" />
          </div>
          <span className="font-black text-sm tracking-wide text-white">
            SNAPCHAT <span className="text-[#fffc00] text-xs font-bold">STUDIO</span>
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'camera'
                ? 'bg-[#fffc00] text-black shadow-md shadow-yellow-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Snap Camera & Lenses</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'map'
                ? 'bg-[#fffc00] text-black shadow-md shadow-yellow-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive Snap Map</span>
          </button>

          <button
            onClick={() => setActiveTab('spotlight')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'spotlight'
                ? 'bg-[#fffc00] text-black shadow-md shadow-yellow-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Spotlight Feed</span>
          </button>
        </div>

        {/* Official Web Login */}
        <a
          href="https://web.snapchat.com/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-all"
        >
          <span>Web Login</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      {/* TAB 1: SNAPCHAT CAMERA & LENS STUDIO */}
      {activeTab === 'camera' && (
        <div className="flex-1 w-full flex items-center justify-center p-2 sm:p-4 overflow-hidden relative bg-slate-950">
          {/* Snapchat Phone Bezel */}
          <div className="w-[340px] sm:w-[375px] h-[95%] max-h-[720px] bg-black rounded-[42px] border-[10px] border-slate-800 shadow-2xl relative flex flex-col overflow-hidden ring-1 ring-slate-700">
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-900/60" />
            </div>

            {/* Camera Viewfinder */}
            <div className="flex-1 relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
              {capturedPhoto ? (
                /* PREVIEW OF CAPTURED SNAP */
                <div className="w-full h-full relative">
                  <img
                    src={capturedPhoto}
                    alt="Captured Snap"
                    className="w-full h-full object-cover"
                    style={{ filter: activeLens.filterStyle }}
                  />

                  {/* Snapchat Caption Bar */}
                  <div
                    onClick={() => setIsEditingCaption(true)}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-xs py-3 px-4 text-center cursor-pointer"
                  >
                    {isEditingCaption ? (
                      <input
                        type="text"
                        value={captionText}
                        onChange={(e) => setCaptionText(e.target.value)}
                        onBlur={() => setIsEditingCaption(false)}
                        autoFocus
                        className="w-full bg-transparent text-center font-bold text-sm text-white focus:outline-none"
                      />
                    ) : (
                      <p className="font-bold text-sm text-white tracking-wide">
                        {captionText || 'Tap to add caption...'}
                      </p>
                    )}
                  </div>

                  {/* Preview Action Tools */}
                  <div className="absolute top-10 right-4 flex flex-col gap-3 z-30">
                    <button
                      onClick={() => setCapturedPhoto(null)}
                      title="Retake Snap"
                      className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDownloadSnap}
                      title="Save Snap"
                      className="w-10 h-10 rounded-full bg-[#fffc00] text-black font-bold flex items-center justify-center shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* LIVE CAMERA VIEW */
                <div className="w-full h-full relative">
                  {cameraActive ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ filter: activeLens.filterStyle }}
                    />
                  ) : (
                    <div className="w-full h-full relative">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                        alt="Snapchat Camera Demo"
                        className="w-full h-full object-cover"
                        style={{ filter: activeLens.filterStyle }}
                      />
                      <div className="absolute top-12 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-[#fffc00] border border-yellow-500/30">
                        Camera Ready • {activeLens.name}
                      </div>
                    </div>
                  )}

                  {/* AR Lens Filter Carousel (Bottom) */}
                  <div className="absolute inset-x-0 bottom-24 flex items-center justify-center gap-2 overflow-x-auto px-4 py-2 z-20 no-scrollbar">
                    {SNAP_LENSES.map((lens) => (
                      <button
                        key={lens.id}
                        onClick={() => setActiveLens(lens)}
                        className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-base shrink-0 transition-all border-2 ${
                          activeLens.id === lens.id
                            ? 'bg-[#fffc00] text-black border-white scale-110 shadow-lg shadow-yellow-500/50'
                            : 'bg-black/60 text-white border-white/30 hover:border-white'
                        }`}
                      >
                        <span>{lens.icon}</span>
                      </button>
                    ))}
                  </div>

                  {/* Shutter Button (Center Bottom) */}
                  <div className="absolute inset-x-0 bottom-6 flex items-center justify-center z-20">
                    <button
                      onClick={handleTakeSnap}
                      className="w-18 h-18 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    >
                      <div className="w-14 h-14 rounded-full bg-white shadow" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Home Indicator */}
            <div className="w-full py-1.5 flex items-center justify-center bg-black shrink-0">
              <div className="w-32 h-1 bg-white/70 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE SNAP MAP */}
      {activeTab === 'map' && (
        <div className="flex-1 w-full bg-[#0e1626] relative flex flex-col overflow-hidden">
          {/* Map Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#fffc00]" />
              <span>
                <strong>Live Snap Map:</strong> Explore global hotspots and public snaps around the world.
              </span>
            </div>
            <a
              href="https://map.snapchat.com/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-lg bg-[#fffc00] hover:bg-yellow-400 text-black font-extrabold text-xs flex items-center gap-1 shadow"
            >
              <span>Full Screen Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Interactive World Map Canvas & Stories */}
          <div className="flex-1 relative flex items-center justify-center bg-[#0a1120] overflow-hidden">
            {/* Proxied Snap Map */}
            <iframe
              src="/api/proxy?url=https://map.snapchat.com/"
              title="Snapchat Map"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="geolocation; camera; autoplay; fullscreen"
              className="w-full h-full border-0 absolute inset-0"
            />
          </div>
        </div>
      )}

      {/* TAB 3: SPOTLIGHT SHORTS FEED */}
      {activeTab === 'spotlight' && (
        <div className="flex-1 w-full bg-slate-950 flex items-center justify-center p-4">
          <div className="w-[340px] sm:w-[375px] h-[95%] max-h-[720px] bg-black rounded-[42px] border-[10px] border-slate-800 shadow-2xl relative flex flex-col overflow-hidden">
            {/* Spotlight Video Embed */}
            <div className="flex-1 relative w-full h-full bg-black flex items-center justify-center">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${SPOTLIGHT_SNAPS[spotlightIndex].embedId}?autoplay=1&controls=0&loop=1&playlist=${SPOTLIGHT_SNAPS[spotlightIndex].embedId}`}
                title="Spotlight Video"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope"
                className="w-full h-full object-cover scale-[1.35] pointer-events-none"
              />

              {/* Spotlight Overlay */}
              <div className="absolute inset-x-3 bottom-6 z-20 flex flex-col gap-1.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-white drop-shadow">
                    @{SPOTLIGHT_SNAPS[spotlightIndex].user}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fffc00] text-black font-bold">
                    Spotlight
                  </span>
                </div>
                <p className="text-xs text-white/90 drop-shadow">
                  {SPOTLIGHT_SNAPS[spotlightIndex].caption}
                </p>
                <span className="text-[11px] text-yellow-400 font-bold">
                  🔥 {SPOTLIGHT_SNAPS[spotlightIndex].views} Views
                </span>
              </div>

              {/* Next Spotlight Button */}
              <button
                onClick={() =>
                  setSpotlightIndex((i) => (i + 1) % SPOTLIGHT_SNAPS.length)
                }
                className="absolute right-4 bottom-24 w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center z-30 shadow-lg hover:scale-110 transition-all"
              >
                <Flame className="w-5 h-5 text-[#fffc00]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
