import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Image as ImageIcon,
  Film,
  Laptop,
  Archive,
  Wrench,
  Trees
} from 'lucide-react';

// Path to high-res poster fallback generated for the journey
const POSTER_IMAGE_PATH = "/src/assets/images/hero_ewaste_poster_1792506010680.jpg";

interface SceneInfo {
  id: number;
  title: string;
  subtitle: string;
  timeRange: [number, number]; // in seconds
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const SCENES: SceneInfo[] = [
  {
    id: 1,
    title: "Digital Life",
    subtitle: "A person works with a vibrant laptop and smartphone in a sunlit modern workspace.",
    timeRange: [0, 5],
    icon: Laptop,
    tag: "01 · DAILY USAGE"
  },
  {
    id: 2,
    title: "Forgotten Electronics",
    subtitle: "Devices become outdated and end up dormant in drawers with tangled cables and chargers.",
    timeRange: [5, 10],
    icon: Archive,
    tag: "02 · THE STORAGE GAP"
  },
  {
    id: 3,
    title: "Responsible Action",
    subtitle: "Repairable devices are refurbished; obsolete units undergo certified circular e-waste recycling.",
    timeRange: [10, 15],
    icon: Wrench,
    tag: "03 · REPAIR & RECYCLE"
  },
  {
    id: 4,
    title: "A Greener Future",
    subtitle: "Recovered precious metals and plastics nurture a thriving green ecosystem.",
    timeRange: [15, 20],
    icon: Trees,
    tag: "04 · REGENERATION"
  }
];

const TOTAL_DURATION = 20; // 20 seconds loop

export const EWasteJourneyVideo: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'animated' | 'poster'>('animated');
  const [showPosterFallbackOnError, setShowPosterFallbackOnError] = useState<boolean>(false);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Determine current active scene based on time
  const currentSceneIndex = Math.min(
    Math.floor((currentTime % TOTAL_DURATION) / 5),
    SCENES.length - 1
  );
  const activeScene = SCENES[currentSceneIndex];
  const sceneProgress = ((currentTime % 5) / 5) * 100;

  // Gentle synthesized audio simulation when unmuted
  const playGentleTone = (freq: number) => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio playback blocked or unsupported, silently ignore
    }
  };

  // Continuous animation loop using requestAnimationFrame
  useEffect(() => {
    if (!isPlaying || viewMode === 'poster') {
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (timestamp - lastTimeRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta * playbackSpeed;
          // Scene change audio chime
          const prevScene = Math.floor(prev / 5);
          const nextScene = Math.floor(next / 5);
          if (prevScene !== nextScene && !isMuted) {
            playGentleTone(440 + (nextScene % 4) * 88);
          }
          return next >= TOTAL_DURATION ? 0 : next;
        });
      }
      lastTimeRef.current = timestamp;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, playbackSpeed, isMuted, viewMode]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const jumpToScene = (index: number) => {
    setCurrentTime(index * 5 + 0.1);
    setIsPlaying(true);
    setViewMode('animated');
  };

  const toggleSpeed = () => {
    setPlaybackSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full rounded-2xl bg-white border border-[#2E8B57]/20 shadow-[0_12px_40px_-12px_rgba(46,139,87,0.18)] overflow-hidden transition-all duration-300">
      
      {/* Top Video Header & Scene Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#E8F7E8]/70 border-b border-[#2E8B57]/15 text-xs text-[#263D32]">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2E8B57] text-white">
            <Film className="w-3.5 h-3.5" />
          </span>
          <span className="font-semibold tracking-wide">E-Waste Journey</span>
          <span className="text-[#647568] hidden sm:inline">· 20s Environmental Cycle</span>
        </div>

        {/* Scene Navigation Tabs with live progress */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          {SCENES.map((scene, idx) => {
            const isActive = currentSceneIndex === idx && viewMode === 'animated';
            const Icon = scene.icon;
            return (
              <button
                key={scene.id}
                onClick={() => jumpToScene(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2E8B57] text-white shadow-xs'
                    : 'bg-white/80 text-[#263D32] hover:bg-white hover:text-[#2E8B57]'
                }`}
                title={`Jump to Scene ${idx + 1}: ${scene.title}`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden md:inline">{scene.title}</span>
                <span className="md:hidden">{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Poster / Live Toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode(viewMode === 'animated' ? 'poster' : 'animated')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border cursor-pointer transition-colors ${
              viewMode === 'poster'
                ? 'bg-[#3A9DCC] text-white border-[#3A9DCC]'
                : 'bg-white text-[#263D32] border-[#2E8B57]/20 hover:border-[#2E8B57]'
            }`}
            title="Toggle high-resolution artwork poster vs. animated interactive video"
          >
            {viewMode === 'poster' ? (
              <>
                <Film className="w-3 h-3" />
                <span className="hidden sm:inline">Play Animation</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3 h-3" />
                <span className="hidden sm:inline">View Poster</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Video Screen Container (Responsive 16:9) */}
      <div className="relative aspect-[16/9] w-full bg-[#FFFDF5] overflow-hidden select-none">
        {viewMode === 'poster' || showPosterFallbackOnError ? (
          /* High-Resolution Artistic Fallback Poster */
          <div className="relative w-full h-full">
            <img
              src={POSTER_IMAGE_PATH}
              alt="E-Waste Environmental Transformation Poster: electronic circuits transforming into lush green forest and clean river"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => setShowPosterFallbackOnError(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-widest text-[#68C96B] font-semibold">Cinematic Journey Artwork</span>
              <h3 className="text-xl md:text-2xl font-bold font-display">Give E-Waste a Second Life</h3>
              <p className="text-sm text-gray-200 mt-1 max-w-lg">
                Illustrating the complete circular journey from digital consumption to responsible recycling and environmental renewal.
              </p>
              <button
                onClick={() => setViewMode('animated')}
                className="mt-3 self-start flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#2E8B57] text-white text-xs font-semibold hover:bg-[#247045] transition-all cursor-pointer shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Resume Interactive Animation
              </button>
            </div>
          </div>
        ) : (
          /* Animated Vector Canvas Scenes */
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              {currentSceneIndex === 0 && (
                <motion.div
                  key="scene-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <SceneOneDigitalLife time={currentTime % 5} />
                </motion.div>
              )}

              {currentSceneIndex === 1 && (
                <motion.div
                  key="scene-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <SceneTwoForgottenElectronics time={currentTime % 5} />
                </motion.div>
              )}

              {currentSceneIndex === 2 && (
                <motion.div
                  key="scene-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <SceneThreeResponsibleAction time={currentTime % 5} />
                </motion.div>
              )}

              {currentSceneIndex === 3 && (
                <motion.div
                  key="scene-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <SceneFourGreenerFuture time={currentTime % 5} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* In-Video Educational Subtitle Pill Banner */}
            <div className="absolute bottom-3 left-4 right-4 z-20 pointer-events-none">
              <div className="max-w-xl mx-auto backdrop-blur-md bg-[#263D32]/85 text-white px-4 py-2 rounded-xl shadow-lg border border-white/20 flex items-center gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#68C96B] animate-pulse" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#FFD166] font-bold">
                      {activeScene.tag}
                    </span>
                    <span className="text-white/40 text-[10px]">·</span>
                    <span className="text-[11px] font-semibold text-white truncate">
                      {activeScene.title}
                    </span>
                  </div>
                  <p className="text-xs text-white/90 truncate sm:text-clip">
                    {activeScene.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle Rotating Environmental Watermark Emblem (Top-Right) */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-[#2E8B57]/20 text-[11px] font-semibold text-[#2E8B57] shadow-xs">
              <svg className="w-3.5 h-3.5 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
                <path d="M11 19h8.2a1.8 1.8 0 0 0 1.5-2.6l-3.9-6.9" />
                <path d="m14.5 4.5 3.7 6.4" />
                <path d="m9.5 4.5-3.7 6.4" />
                <path d="M4 12h8" />
              </svg>
              <span>E-Cycle Loop</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Video Controller Bar */}
      <div className="px-4 py-3 bg-[#FFFDF5] border-t border-[#2E8B57]/15 flex flex-col gap-2">
        
        {/* Progress Bar with Scene Segments */}
        <div className="relative w-full flex items-center">
          <input
            type="range"
            min={0}
            max={TOTAL_DURATION}
            step={0.05}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 rounded-lg bg-[#E8F7E8] appearance-none cursor-pointer accent-[#2E8B57]"
            aria-label="Seek environmental animation time"
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between text-xs text-[#263D32]">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                if (viewMode === 'poster') setViewMode('animated');
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2E8B57] text-white hover:bg-[#247045] transition-colors cursor-pointer shadow-xs"
              title={isPlaying ? "Pause Video" : "Play Video"}
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying && viewMode === 'animated' ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Restart Button */}
            <button
              onClick={() => {
                setCurrentTime(0);
                setIsPlaying(true);
                setViewMode('animated');
              }}
              className="p-1.5 rounded-lg text-[#647568] hover:text-[#263D32] hover:bg-[#E8F7E8] transition-colors cursor-pointer"
              title="Restart from beginning"
              aria-label="Restart Video"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Sound Toggle (Synthesized Chime Simulation) */}
            <button
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (!nextMuted) playGentleTone(520);
              }}
              className="flex items-center gap-1 p-1.5 rounded-lg text-[#647568] hover:text-[#263D32] hover:bg-[#E8F7E8] transition-colors cursor-pointer"
              title={isMuted ? "Unmute Ambient Chimes" : "Mute Sound"}
              aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="text-[11px] font-medium hidden sm:inline">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#2E8B57]" />
                  <span className="text-[11px] font-medium text-[#2E8B57] hidden sm:inline">Sound On</span>
                </>
              )}
            </button>

            {/* Time Stamp */}
            <span className="text-[11px] font-mono text-[#647568]">
              {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Selector */}
            <button
              onClick={toggleSpeed}
              className="px-2 py-1 rounded bg-[#E8F7E8] text-[#2E8B57] font-semibold text-[11px] hover:bg-[#d5eed5] transition-colors cursor-pointer"
              title="Change playback speed"
            >
              {playbackSpeed}x Speed
            </button>

            <span className="text-[11px] text-[#647568] hidden md:inline">
              Scene {currentSceneIndex + 1} of 4: <span className="font-medium text-[#263D32]">{activeScene.title}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * SCENE 1 — DIGITAL LIFE
 * A person uses a laptop and smartphone in a bright, modern environment.
 * ============================================================================ */
const SceneOneDigitalLife: React.FC<{ time: number }> = ({ time }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#DDF2FF] via-[#FFFDF5] to-[#E8F7E8] flex items-center justify-center p-6 overflow-hidden">
      {/* Sunlight window in background */}
      <div className="absolute top-4 left-8 w-48 h-36 rounded-xl border-4 border-white bg-gradient-to-br from-[#FFFDF5] to-[#DDF2FF] shadow-inner overflow-hidden opacity-90">
        {/* Drifting Clouds */}
        <motion.div
          animate={{ x: [-20, 60] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="absolute top-4 left-2 w-16 h-6 rounded-full bg-white/70 blur-xs"
        />
        {/* Soft Sun in Window */}
        <div className="absolute top-2 right-4 w-10 h-10 rounded-full bg-[#FFD166]/60 blur-xs" />
        {/* Tree branches visible outside */}
        <div className="absolute bottom-0 right-0 w-24 h-16 text-[#68C96B]/50">
          <svg viewBox="0 0 100 60" fill="currentColor">
            <path d="M0 60 Q40 30, 80 50 Q100 20, 100 60 Z" />
          </svg>
        </div>
      </div>

      {/* Modern Work Desk Setup */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        
        {/* Typing Person & Sleek Laptop */}
        <div className="relative flex items-end justify-center w-full">
          {/* Laptop display */}
          <div className="relative w-72 h-44 rounded-t-xl bg-slate-800 border-4 border-slate-700 shadow-xl overflow-hidden flex flex-col">
            {/* Screen bezel camera */}
            <div className="w-full h-3 bg-slate-900 flex justify-center items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            {/* Active glowing screen with code and environmental diagrams */}
            <div className="flex-1 bg-[#1A2E26] p-3 flex flex-col justify-between text-white font-mono text-[9px]">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-1">
                <span className="text-[#68C96B] flex items-center gap-1 font-sans font-semibold">
                  <Sparkles className="w-3 h-3 text-[#FFD166]" /> Student Research Dashboard
                </span>
                <span className="text-gray-400">100% Charged</span>
              </div>
              
              {/* Dynamic Animated Chart Bars */}
              <div className="grid grid-cols-4 gap-2 items-end h-16 pt-2">
                <div className="w-full bg-[#68C96B] rounded-t" style={{ height: `${50 + Math.sin(time * 3) * 20}%` }} />
                <div className="w-full bg-[#3A9DCC] rounded-t" style={{ height: `${70 + Math.cos(time * 2) * 15}%` }} />
                <div className="w-full bg-[#FFD166] rounded-t" style={{ height: `${40 + Math.sin(time * 4) * 25}%` }} />
                <div className="w-full bg-[#FF8A65] rounded-t" style={{ height: `${85 + Math.cos(time * 3) * 10}%` }} />
              </div>

              <div className="flex items-center justify-between text-[8px] text-gray-300">
                <span>Status: Active Consumption</span>
                <span className="text-[#68C96B]">● Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Keyboard Base */}
        <div className="w-80 h-3.5 rounded-b-lg bg-slate-300 shadow-md border-t border-slate-400 relative">
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-16 h-2 rounded-xs bg-slate-400" />
        </div>

        {/* Desk Surface with Smartphone and Accessories */}
        <div className="w-full max-w-lg h-12 bg-amber-100/90 rounded-b-2xl border-t-4 border-amber-200/80 shadow-md flex items-center justify-between px-8 relative">
          {/* Active smartphone with notification waves */}
          <div className="relative -top-6 flex items-center">
            <div className="w-12 h-20 rounded-xl bg-slate-900 border-2 border-slate-700 p-1 shadow-lg flex flex-col justify-between">
              <div className="w-4 h-1 mx-auto bg-slate-700 rounded-full" />
              <div className="flex-1 bg-[#2E8B57]/30 rounded-lg p-0.5 flex flex-col justify-center items-center">
                <div className="w-6 h-1 bg-[#68C96B] rounded-full my-0.5" />
                <div className="w-8 h-1 bg-[#FFD166] rounded-full my-0.5" />
              </div>
              <div className="w-2 h-2 rounded-full border border-slate-600 mx-auto" />
            </div>

            {/* Notification Waves */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF8A65]/50 border border-[#FF8A65]"
            />
          </div>

          {/* Steaming Coffee Mug */}
          <div className="relative -top-3">
            <div className="w-6 h-8 rounded-b-md bg-[#FFD166] border border-amber-300 shadow-xs relative">
              <div className="absolute top-1.5 -right-2 w-2 h-4 rounded-r-md border border-amber-300" />
            </div>
            {/* Steam animation */}
            <motion.div
              animate={{ y: [-4, -14], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
              className="absolute -top-2 left-2 w-1.5 h-3 rounded-full bg-slate-400/50"
            />
          </div>

          {/* Healthy Monstera Desk Plant */}
          <div className="relative -top-6 text-[#2E8B57]">
            <svg viewBox="0 0 50 60" className="w-10 h-12">
              <path d="M15 45 C10 25, 25 15, 30 10 C35 15, 40 25, 35 45 Z" fill="#2E8B57" />
              <path d="M5 40 C0 25, 15 20, 20 18" stroke="#68C96B" strokeWidth="2" strokeLinecap="round" />
              <path d="M45 40 C50 25, 35 20, 30 18" stroke="#68C96B" strokeWidth="2" strokeLinecap="round" />
              <rect x="18" y="42" width="14" height="14" rx="2" fill="#FF8A65" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * SCENE 2 — FORGOTTEN ELECTRONICS
 * Outdated devices placed in a dark drawer with tangled chargers and cords.
 * ============================================================================ */
const SceneTwoForgottenElectronics: React.FC<{ time: number }> = ({ time }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#FFFDF5] via-[#F3ECE0] to-[#E2D8C7] flex items-center justify-center p-6 overflow-hidden">
      
      {/* Time Passage Indicators (Spinning clock & floating calendar sheets) */}
      <div className="absolute top-4 left-6 flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full border-2 border-[#647568]/40 bg-white shadow-xs flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="w-0.5 h-4 bg-[#263D32] origin-bottom rounded-full"
          />
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF8A65] absolute" />
        </div>
        <div className="text-left">
          <span className="text-[10px] uppercase font-bold text-[#FF8A65] tracking-wider block">Years Pass</span>
          <span className="text-xs text-[#647568] font-medium">New Models Released</span>
        </div>
      </div>

      {/* The Open Wooden Storage Drawer (Cross Section / Top-Down View) */}
      <motion.div
        initial={{ y: 20, opacity: 0.9 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-[#C89D74] p-3 shadow-2xl border-4 border-[#9F7249]"
      >
        {/* Drawer Handle */}
        <div className="w-20 h-3 mx-auto -mt-6 mb-2 rounded-full bg-[#E5BA88] border-2 border-[#9F7249] shadow-md" />

        {/* Drawer Interior Box (Darker shadow filled with neglected gadgets) */}
        <div className="relative w-full h-48 rounded-xl bg-[#5C4533] p-4 shadow-inner overflow-hidden border border-[#483526]">
          {/* Subtle dust particles floating in forgotten darkness */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-4 left-12 w-1.5 h-1.5 rounded-full bg-white animate-float-subtle" />
            <div className="absolute top-12 right-20 w-1 h-1 rounded-full bg-white animate-float-gentle" />
            <div className="absolute bottom-6 left-1/3 w-1.5 h-1.5 rounded-full bg-white animate-float-subtle" />
          </div>

          {/* Tangled Electronic Gadgets & Chargers */}
          <div className="relative w-full h-full">
            {/* Old Outdated Smartphone with Black Screen */}
            <motion.div
              animate={{ rotate: [-6, -4, -6] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-4 left-6 w-16 h-28 rounded-xl bg-slate-800 border-2 border-slate-600 shadow-lg p-1.5"
            >
              <div className="w-full h-full rounded bg-slate-900 flex flex-col items-center justify-center">
                {/* Outdated low battery icon */}
                <div className="w-6 h-3 rounded-xs border border-red-400 p-0.5">
                  <div className="w-1.5 h-full bg-red-400 rounded-xs" />
                </div>
                <span className="text-[7px] text-gray-400 mt-1">Obsolete</span>
              </div>
            </motion.div>

            {/* Vintage Flip Phone */}
            <div className="absolute top-8 right-10 w-12 h-20 rounded-lg bg-pink-900/60 border-2 border-pink-700/80 shadow-md transform rotate-12 flex flex-col justify-between p-1">
              <div className="w-full h-7 rounded bg-slate-900 border border-slate-700" />
              <div className="grid grid-cols-3 gap-0.5 p-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-1 bg-gray-400 rounded-xs" />
                ))}
              </div>
            </div>

            {/* Old Laptop Keyboard & Closed Shell */}
            <div className="absolute bottom-2 left-16 right-16 h-12 rounded bg-slate-700 border-2 border-slate-500 shadow-md transform -rotate-2 flex items-center justify-between px-3">
              <span className="text-[9px] font-mono text-gray-400">Old Model Core-2</span>
              <span className="text-[8px] text-amber-400 font-bold">Unused</span>
            </div>

            {/* Tangled Mess of Charger Cables & USB Plugs (SVG) */}
            <svg viewBox="0 0 300 150" className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M30 40 Q80 120, 140 40 T260 110"
                stroke="#E2E8F0"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M50 120 C100 20, 180 140, 240 60"
                stroke="#1E293B"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M120 10 Q160 80, 200 20"
                stroke="#FFD166"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* USB-A Plug */}
              <rect x="250" y="105" width="16" height="10" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
              {/* Power Adapter Brick */}
              <rect x="15" y="100" width="24" height="24" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ============================================================================
 * SCENE 3 — RESPONSIBLE ACTION
 * Electronics collected: repair/reuse for working units, certified recycling for rest.
 * ============================================================================ */
const SceneThreeResponsibleAction: React.FC<{ time: number }> = ({ time }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#E8F7E8] via-[#FFFDF5] to-[#DDF2FF] flex items-center justify-center p-6 overflow-hidden">
      
      {/* Conveyor / Action Process Split Grid */}
      <div className="relative z-10 w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        
        {/* Stream 1: Repair & Reuse */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl bg-white border-2 border-[#2E8B57]/30 p-3 shadow-md relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-[#2E8B57]/15 pb-1 mb-2">
            <span className="text-xs font-bold text-[#2E8B57] flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" /> Stream A: Repair & Reuse
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8F7E8] text-[#2E8B57] font-semibold">
              Modular Fix
            </span>
          </div>

          <div className="relative h-28 bg-[#FFFDF5] rounded-lg border border-slate-200 p-2 flex flex-col justify-between">
            {/* Device with opened chassis getting repaired */}
            <div className="flex items-center justify-between">
              <div className="w-24 h-16 rounded bg-slate-800 border-2 border-slate-600 p-1 relative">
                {/* Circuit board interior */}
                <div className="w-full h-full bg-[#1A3326] rounded flex flex-col justify-around p-1">
                  <div className="w-8 h-2 rounded bg-amber-400" />
                  <div className="w-12 h-1.5 rounded bg-[#68C96B]" />
                </div>
                {/* Screwdriver / Repair Tool Animation */}
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-3 -right-2 text-[#3A9DCC]"
                >
                  <Wrench className="w-5 h-5 fill-current" />
                </motion.div>
              </div>

              {/* Arrow to Refurbished Success */}
              <div className="flex flex-col items-center text-[#2E8B57]">
                <span className="text-[10px] font-bold">Refurbished</span>
                <span className="text-xl">➔</span>
                <span className="text-[9px] text-[#647568]">Second Life</span>
              </div>
            </div>

            <p className="text-[10px] text-[#263D32] bg-[#E8F7E8]/60 rounded p-1">
              ✓ Battery replaced · Memory upgraded · Extends device life by 3+ years
            </p>
          </div>
        </motion.div>

        {/* Stream 2: Certified Material Recycling */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl bg-white border-2 border-[#3A9DCC]/30 p-3 shadow-md relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-[#3A9DCC]/15 pb-1 mb-2">
            <span className="text-xs font-bold text-[#3A9DCC] flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> Stream B: Eco Recycling
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#DDF2FF] text-[#3A9DCC] font-semibold">
              Closed Loop
            </span>
          </div>

          <div className="relative h-28 bg-[#FFFDF5] rounded-lg border border-slate-200 p-2 flex flex-col justify-between">
            {/* Sorting bins for Gold, Copper & Clean Silicon */}
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="rounded bg-amber-50 border border-amber-200 p-1">
                <span className="text-[12px] font-bold text-amber-600 block">Au</span>
                <span className="text-[8px] text-gray-500">Gold 99%</span>
              </div>
              <div className="rounded bg-orange-50 border border-orange-200 p-1">
                <span className="text-[12px] font-bold text-orange-600 block">Cu</span>
                <span className="text-[8px] text-gray-500">Copper 95%</span>
              </div>
              <div className="rounded bg-sky-50 border border-sky-200 p-1">
                <span className="text-[12px] font-bold text-sky-600 block">Si</span>
                <span className="text-[8px] text-gray-500">Silicon</span>
              </div>
            </div>

            {/* Rotating Sorting Gears */}
            <div className="flex items-center justify-between text-[10px] text-[#263D32] bg-[#DDF2FF]/60 rounded p-1 mt-1">
              <span>Hydrometallurgical extraction</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="w-4 h-4 text-[#3A9DCC]"
              >
                <RotateCcw className="w-full h-full" />
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

/* ============================================================================
 * SCENE 4 — A GREENER FUTURE
 * Lush nature, blooming flowers, trees, sunlight, rotating recycling symbol,
 * and prominent message: "GIVE E-WASTE A SECOND LIFE"
 * ============================================================================ */
const SceneFourGreenerFuture: React.FC<{ time: number }> = ({ time }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#DDF2FF] via-[#E8F7E8] to-[#FFFDF5] flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Radiant Golden Sunlight Rays in background */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#FFD166]/40 via-[#FFD166]/10 to-transparent blur-xl pointer-events-none" />

      {/* Soaring Eco Birds in sky */}
      <motion.div
        animate={{ x: [-40, 240], y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-6 left-12 text-[#2E8B57]/50"
      >
        <svg viewBox="0 0 40 20" className="w-6 h-3 fill-currentColor">
          <path d="M0 10 Q10 0, 20 10 Q30 0, 40 10 Q25 5, 20 15 Q15 5, 0 10 Z" />
        </svg>
      </motion.div>

      {/* Centerpiece: Glowing Rotating Emerald Recycling Symbol */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        <div className="relative mb-2">
          {/* Pulsing Sun Aura */}
          <div className="absolute -inset-4 rounded-full bg-[#FFD166]/30 blur-lg animate-pulse" />
          
          {/* Rotating Emerald Recycling Crest */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#2E8B57] to-[#68C96B] p-3 shadow-xl flex items-center justify-center text-white border-2 border-white">
            <svg
              className="w-12 h-12 animate-spin-slow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
              <path d="M11 19h8.2a1.8 1.8 0 0 0 1.5-2.6l-3.9-6.9" />
              <path d="m14.5 4.5 3.7 6.4" />
              <path d="m9.5 4.5-3.7 6.4" />
              <path d="M4 12h8" />
            </svg>
          </div>
        </div>

        {/* The Exact Mandated Message: “GIVE E-WASTE A SECOND LIFE” */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl border-2 border-[#2E8B57]/30 shadow-lg mt-1"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2E8B57] block">
            Environmental Impact
          </span>
          <h2 className="text-xl md:text-2xl font-black font-display text-[#263D32] tracking-tight">
            GIVE E-WASTE A SECOND LIFE
          </h2>
        </motion.div>

        <p className="text-xs text-[#263D32] font-medium mt-2 max-w-sm">
          Turning electronic surplus into sustainable habitats, clean waterways & circular innovation.
        </p>
      </div>

      {/* Flourishing Landscape: Blooming Flowers, River, and Verdant Trees at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none flex items-end justify-between px-4">
        {/* Left Thriving Oak / Pine Trees */}
        <div className="w-24 h-20 text-[#2E8B57] flex items-end gap-1">
          <svg viewBox="0 0 60 70" className="w-14 h-16 fill-currentColor">
            <path d="M30 0 L55 45 H40 L50 65 H10 L20 45 H5 Z" />
            <rect x="26" y="65" width="8" height="5" fill="#5C4533" />
          </svg>
          <svg viewBox="0 0 50 60" className="w-10 h-12 fill-[#68C96B]">
            <path d="M25 0 L45 40 H32 L40 55 H10 L18 40 H5 Z" />
          </svg>
        </div>

        {/* Winding Blue River through center */}
        <div className="flex-1 h-12 mx-2">
          <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0 40 Q50 15, 100 25 T200 20 L200 40 L0 40 Z"
              fill="#3A9DCC"
              opacity="0.75"
            />
            <path
              d="M0 40 Q60 25, 110 32 T200 30"
              stroke="#DDF2FF"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Right Blooming Wildflowers (Sunshine yellow, Coral, Bright Green) */}
        <div className="flex items-end gap-2 text-[#FFD166] h-16">
          {/* Flower 1: Sunshine Yellow */}
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-8 h-12 flex flex-col items-center"
          >
            <div className="w-5 h-5 rounded-full bg-[#FFD166] border-2 border-white shadow-xs" />
            <div className="w-1 h-7 bg-[#2E8B57]" />
          </motion.div>

          {/* Flower 2: Coral */}
          <motion.div
            animate={{ rotate: [3, -3, 3] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-7 h-10 flex flex-col items-center"
          >
            <div className="w-4 h-4 rounded-full bg-[#FF8A65] border-2 border-white shadow-xs" />
            <div className="w-1 h-6 bg-[#2E8B57]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
