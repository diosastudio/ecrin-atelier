import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Layers, ShieldCheck, Clock, ArrowDown, Play, Pause, ChevronRight, Sliders, Info, Eye, Check } from 'lucide-react';

interface ScrollSequenceHeroProps {
  framesPath?: string;
  totalFrames?: number;
  framePrefix?: string;
  frameExtension?: string;
}

export const ScrollSequenceHero: React.FC<ScrollSequenceHeroProps> = ({
  framesPath = '/frames',
  totalFrames = 40,
  framePrefix = 'frame_',
  frameExtension = '.jpg'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [activeLayerInfo, setActiveLayerInfo] = useState<number | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'scroll' | 'assembled' | 'exploded'>('scroll');
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);

  const targetFrameRef = useRef(0);
  const currentLerpFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<number | null>(null);

  const getFrameUrl = useCallback(
    (index: number) => {
      const paddedIndex = String(index + 1).padStart(4, '0');
      return `${framesPath}/${framePrefix}${paddedIndex}${frameExtension}`;
    },
    [framesPath, framePrefix, frameExtension]
  );

  // Progressive Preloading of Frames
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    const initialPriorityCount = Math.min(8, totalFrames);
    let loaded = 0;

    const handleImageLoad = () => {
      if (isCancelled) return;
      loaded += 1;
      setLoadedCount(loaded);
      if (loaded >= initialPriorityCount && !isInitialLoaded) {
        setIsInitialLoaded(true);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = handleImageLoad;
      img.onerror = () => handleImageLoad();
      images.push(img);
    }

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, getFrameUrl]);

  // Draw current frame to canvas preserving aspect ratio
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetIdx = Math.max(0, Math.min(totalFrames - 1, Math.round(frameIdx)));
    const img = imagesRef.current[targetIdx];

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < totalFrames; offset++) {
        const candidate = imagesRef.current[targetIdx - offset] || imagesRef.current[targetIdx + offset];
        if (candidate?.complete && candidate.naturalWidth > 0) {
          renderImageToCanvas(ctx, canvas, candidate);
          return;
        }
      }
      return;
    }

    renderImageToCanvas(ctx, canvas, img);
  }, [totalFrames]);

  const renderImageToCanvas = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement
  ) => {
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    drawFrame(currentLerpFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Smooth continuous lerp loop for liquid responsiveness
  useEffect(() => {
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetFrameRef.current - currentLerpFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentLerpFrameRef.current += diff * 0.18;
        setCurrentFrameIndex(Math.round(currentLerpFrameRef.current));
        drawFrame(currentLerpFrameRef.current);
      }

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (isPlayingAuto || activeViewMode !== 'scroll') return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, -containerTop / totalScrollableDistance));
      setScrollProgress(progress);

      const frameTarget = progress * (totalFrames - 1);
      targetFrameRef.current = frameTarget;

      if (progress > 0.75) {
        setActiveLayerInfo(1);
      } else if (progress > 0.55) {
        setActiveLayerInfo(2);
      } else if (progress > 0.35) {
        setActiveLayerInfo(3);
      } else if (progress > 0.15) {
        setActiveLayerInfo(4);
      } else {
        setActiveLayerInfo(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalFrames, isPlayingAuto, activeViewMode]);

  const toggleAutoPlay = () => {
    if (isPlayingAuto) {
      setIsPlayingAuto(false);
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    } else {
      setIsPlayingAuto(true);
      setActiveViewMode('scroll');
      let step = scrollProgress;
      let forward = true;
      autoPlayTimerRef.current = window.setInterval(() => {
        if (forward) {
          step += 0.015;
          if (step >= 1) {
            forward = false;
            step = 1;
          }
        } else {
          step -= 0.015;
          if (step <= 0) {
            forward = true;
            step = 0;
          }
        }
        setScrollProgress(step);
        targetFrameRef.current = step * (totalFrames - 1);
      }, 30);
    }
  };

  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, []);

  const handleManualScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPlayingAuto) setIsPlayingAuto(false);
    const val = parseFloat(e.target.value);
    setScrollProgress(val);
    targetFrameRef.current = val * (totalFrames - 1);
  };

  const setView = (mode: 'assembled' | 'exploded' | 'scroll') => {
    setActiveViewMode(mode);
    if (mode === 'assembled') {
      setScrollProgress(0);
      targetFrameRef.current = 0;
    } else if (mode === 'exploded') {
      setScrollProgress(1);
      targetFrameRef.current = totalFrames - 1;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const heroTextOpacity = Math.max(0, 1 - scrollProgress * 2.8);
  const explodedTextOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.28) * 3));

  const hotspots = [
    { id: 4, top: '24%', left: '56%', title: '04. Diamond Top Coat', spec: '0.04mm UV Shield', desc: '14-day scratch defense & glass reflection' },
    { id: 3, top: '40%', left: '44%', title: '03. 24K Gold & Pigment', spec: '0.06mm Enamel', desc: 'Hand-blended ombré & genuine gold leaf' },
    { id: 2, top: '58%', left: '56%', title: '02. 9-Ply Flex Polymer', spec: '0.35mm Shape Memory', desc: 'Salon apex curve & unbreakable core' },
    { id: 1, top: '76%', left: '44%', title: '01. Silicone Matrix', spec: '0.08mm Micro-Grip', desc: 'Zero natural nail damage & breathable seal' }
  ];

  return (
    <div
      ref={containerRef}
      id="hero-sequence-container"
      className="relative w-full h-[320vh] bg-[#FAF8F5]"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F4ECE6] rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Instant Poster Image Fallback (Guarantees zero blank flash) */}
        {!isInitialLoaded && (
          <img
            src="/images/hero-assembled.jpg"
            alt="Écrin Assembled Press-On"
            className="absolute max-h-[82vh] object-contain drop-shadow-2xl opacity-60 pointer-events-none"
          />
        )}

        {/* Loading Pill */}
        {!isInitialLoaded && (
          <div className="absolute top-24 z-30 px-5 py-2.5 rounded-full glass-card text-xs tracking-wider uppercase text-[#423833] flex items-center gap-3 shadow-sm animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#D4A392] animate-ping" />
            Loading Photorealistic Sequence ({Math.min(100, Math.round((loadedCount / totalFrames) * 100))}%)
          </div>
        )}

        {/* Photorealistic Canvas Render Stage */}
        <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-h-[82vh] object-contain drop-shadow-2xl transition-transform duration-300"
          />

          {/* Interactive Hotspot Callout Pins (Visible in Exploded View) */}
          {scrollProgress > 0.45 && (
            <div className="absolute inset-0 max-w-3xl mx-auto pointer-events-none">
              {hotspots.map((spot) => {
                const isSelected = selectedHotspot === spot.id || activeLayerInfo === spot.id;
                return (
                  <div
                    key={spot.id}
                    style={{ top: spot.top, left: spot.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group"
                  >
                    {/* Pulsing Pin Button */}
                    <button
                      onClick={() => setSelectedHotspot(isSelected ? null : spot.id)}
                      className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                        isSelected
                          ? 'bg-[#1C1817] text-white scale-110 ring-4 ring-[#D4A392]/50'
                          : 'bg-white/90 text-[#1C1817] hover:bg-[#1C1817] hover:text-white border border-[#EADCD2]'
                      }`}
                      aria-label={spot.title}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#D4A392] animate-ping absolute" />
                      <span className="font-mono text-[10px] font-bold z-10">{spot.id}</span>
                    </button>

                    {/* Floating Tooltip Detail Card */}
                    <div
                      className={`absolute left-9 top-1/2 -translate-y-1/2 w-56 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#EADCD2] shadow-xl transition-all duration-300 z-30 ${
                        isSelected
                          ? 'opacity-100 translate-x-0 pointer-events-auto'
                          : 'opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#A9846E] uppercase mb-0.5">
                        <span>{spot.title}</span>
                        <span>{spot.spec}</span>
                      </div>
                      <p className="text-[11px] text-[#4E443E] leading-tight">
                        {spot.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* STAGE 1: Hero Text & Call-to-Actions (0% - 35% Scroll) */}
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 pointer-events-none flex flex-col justify-between py-24 sm:py-28 transition-opacity duration-300"
          style={{
            opacity: heroTextOpacity,
            transform: `translateY(-${scrollProgress * 60}px)`
          }}
        >
          {/* Top Pill */}
          <div className="pt-4 sm:pt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#EADCD2] shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A392]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#665B54]">
                The Quad-Layer Architecture
              </span>
            </div>
          </div>

          {/* Main Hero Headline & CTAs */}
          <div className="max-w-2xl pointer-events-auto">
            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1C1817] leading-[1.08] mb-4">
              Salon-Quality Nails.
              <br />
              <span className="italic font-normal shimmer-text">Zero Appointment.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#665B54] font-light max-w-lg mb-8 leading-relaxed">
              Handcrafted press-ons engineered with calibrated C-curve structure. Flawless 14-day wear, infinitely reusable, and zero natural nail trauma.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('collections')}
                className="px-8 py-4 rounded-full bg-[#1C1817] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#38302B] hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Shop Collections</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('customizer')}
                className="px-8 py-4 rounded-full bg-white/90 text-[#1C1817] border border-[#DDC5B5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#F5F1EB] hover:border-[#1C1817] transition-all duration-300 backdrop-blur-md shadow-sm"
              >
                Customize Your Set
              </button>
            </div>

            {/* Micro Feature Badges */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-6 border-t border-[#EADCD2]/70">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#A9846E]" />
                <span className="text-xs font-medium text-[#4E443E]">14-Day Wear</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#A9846E]" />
                <span className="text-xs font-medium text-[#4E443E]">8-Min Application</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#A9846E]" />
                <span className="text-xs font-medium text-[#4E443E]">5× Reusable</span>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Prompt */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2 text-xs tracking-widest text-[#83766E] uppercase">
              <span>Scroll to deconstruct layers</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#A9846E]" />
            </div>
          </div>
        </div>

        {/* STAGE 2: Exploded Architecture Callouts (30% - 100% Scroll) */}
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 pointer-events-none flex flex-col justify-between py-20 transition-all duration-500"
          style={{
            opacity: explodedTextOpacity,
            pointerEvents: explodedTextOpacity > 0.4 ? 'auto' : 'none'
          }}
        >
          {/* Top Section Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs uppercase tracking-[0.2em] text-[#4E443E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4A392]" />
              Exploded Quad-Layer Anatomy
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#83766E] uppercase tracking-widest font-mono">
              <span>Scrub Progress: {Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>

          {/* Side Exploded Info HUD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#EADCD2] shadow-xl max-w-md">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#A9846E] uppercase block mb-1">
                Precision Engineering
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1817] font-light mb-3">
                Deconstructed for Supreme Durability
              </h3>
              <p className="text-xs sm:text-sm text-[#665B54] leading-relaxed mb-4">
                Unlike mass-molded plastic press-ons, every Écrin nail is built like a micro-sculpture: 4 distinct calibrated layers bonded under UV heat for ultimate comfort and resilience.
              </p>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollToSection('craftsmanship')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#1C1817] hover:text-[#A9846E] flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Layer Tech</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Layer Quick Highlights */}
            <div className="hidden md:flex flex-col gap-2.5 max-w-xs ml-auto">
              {[
                { num: '04', name: 'Diamond Gel Top Coat', desc: 'UV scratch shield' },
                { num: '03', name: 'Artisan Art & 24K Gold', desc: 'Hand-painted details' },
                { num: '02', name: '9-Ply Polymer Core', desc: 'C-curve apex strength' },
                { num: '01', name: 'Medical Adhesive Matrix', desc: 'Zero nail damage' }
              ].map((layer, idx) => {
                const isActive = activeLayerInfo === 4 - idx || selectedHotspot === 4 - idx;
                return (
                  <button
                    key={layer.num}
                    onClick={() => setSelectedHotspot(4 - idx)}
                    className={`px-4 py-2.5 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#1C1817] text-white border-[#1C1817] shadow-md translate-x-1'
                        : 'bg-white/70 text-[#4E443E] border-[#EADCD2]/80 backdrop-blur-sm hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[11px] opacity-70">{layer.num}</span>
                      <span className="font-medium">{layer.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM FLOATING CONTROLLER DOCK */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2.5 rounded-full glass-card border border-[#EADCD2] shadow-xl flex items-center gap-3 sm:gap-4 text-xs">
          
          {/* Direct View Mode Switchers */}
          <div className="flex items-center gap-1 p-0.5 bg-[#FAF8F5] rounded-full border border-[#EADCD2]/80">
            <button
              onClick={() => setView('assembled')}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all ${
                scrollProgress < 0.15 ? 'bg-[#1C1817] text-white' : 'text-[#665B54] hover:text-[#1C1817]'
              }`}
            >
              Assembled
            </button>
            <button
              onClick={() => setView('exploded')}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all ${
                scrollProgress > 0.85 ? 'bg-[#1C1817] text-white' : 'text-[#665B54] hover:text-[#1C1817]'
              }`}
            >
              Exploded
            </button>
          </div>

          {/* Play/Pause Auto-Scrub */}
          <button
            onClick={toggleAutoPlay}
            className="w-7 h-7 rounded-full bg-[#1C1817] text-white flex items-center justify-center hover:bg-[#38302B] transition-colors"
            title={isPlayingAuto ? "Pause Auto Transition" : "Play Transition"}
            aria-label="Toggle Auto Animation"
          >
            {isPlayingAuto ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 translate-x-0.5" />}
          </button>

          {/* Interactive Scrub Slider */}
          <div className="hidden sm:flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={scrollProgress}
              onChange={handleManualScrub}
              className="w-20 md:w-32 h-1.5 bg-[#EADCD2] rounded-lg appearance-none cursor-pointer accent-[#1C1817]"
              aria-label="Scrub Nail Animation"
            />
          </div>

          {/* Frame Counter Tag */}
          <div className="border-l border-[#DDC5B5] pl-3 flex items-center gap-1 text-[11px] font-mono text-[#665B54]">
            <span className="text-[#1C1817] font-semibold">{String(currentFrameIndex + 1).padStart(2, '0')}</span>
            <span className="opacity-40">/</span>
            <span className="opacity-60">{totalFrames}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
