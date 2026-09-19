import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Sliders, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type RainIntensity = 'intense' | 'elegant' | 'subtle';

interface NeonRainEffectProps {
  defaultIntensity?: RainIntensity;
}

interface RainDrop {
  x: number;
  y: number;
  speed: number;
  layer: number; // 0: background, 1: mid, 2: foreground
  paletteIndex: number;
  scale: number;
  opacity: number;
}

interface Splash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
  speed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface AmbientOrb {
  x: number;
  y: number;
  radius: number;
  paletteIndex: number;
  baseOpacity: number;
  vy: number;
  vx: number;
  phase: number;
}

const GREEN_PALETTE = [
  { main: '#67eb34', head: '#c5ff8f' }, // Velox Neon Lime (Brand)
  { main: '#00ff88', head: '#a8ffd8' }, // Electric Cyber Emerald
  { main: '#22c55e', head: '#86efac' }, // Vivid Luxury Emerald
  { main: '#39ff14', head: '#ffffff' }, // Laser Hyper Green
  { main: '#10b981', head: '#6ee7b7' }, // Deep Jade Neon
  { main: '#a3e635', head: '#ecfccb' }, // Chartreuse Gold-Green
  { main: '#4ade80', head: '#bbf7d0' }, // Mint Gloss Green
];

// Aerodynamic rain slant angle
const ANGLE_X = 0.22; // horizontal shift per vertical step (~12.5 deg)

export const NeonRainEffect: React.FC<NeonRainEffectProps> = ({ defaultIntensity = 'intense' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [intensity, setIntensity] = useState<RainIntensity>(defaultIntensity);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Mouse interaction coordinates
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Scroll state tracking to prioritize 60/120fps browser scroll rendering
    let isScrolling = false;
    let scrollDebounceTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      isScrolling = true;
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      scrollDebounceTimer = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- PRE-RENDERED GPU CACHED SPRITES ---
    // Pre-rendering streaks & glowing orbs into small offscreen canvases completely
    // eliminates real-time shadowBlur and gradient allocations on every frame.
    const streakSprites: HTMLCanvasElement[][] = []; // [paletteIndex][layerIndex]
    const orbSprites: HTMLCanvasElement[] = []; // [paletteIndex]

    const initSprites = () => {
      streakSprites.length = 0;
      orbSprites.length = 0;

      GREEN_PALETTE.forEach((palette) => {
        const layerSprites: HTMLCanvasElement[] = [];

        // 3 Layers: 0 (background faint), 1 (midground), 2 (foreground glowing)
        const layerConfigs = [
          { length: 32, width: 1.0, glowWidth: 0, opacity: 0.35, headRadius: 0 },
          { length: 54, width: 1.5, glowWidth: 3.0, opacity: 0.85, headRadius: 1.2 },
          { length: 78, width: 2.2, glowWidth: 5.0, opacity: 1.0, headRadius: 2.0 },
        ];

        layerConfigs.forEach((cfg) => {
          const offCanvas = document.createElement('canvas');
          const dx = cfg.length * ANGLE_X;
          const dy = cfg.length;
          const padding = 8;
          offCanvas.width = Math.ceil(dx + padding * 2);
          offCanvas.height = Math.ceil(dy + padding * 2);

          const oCtx = offCanvas.getContext('2d');
          if (oCtx) {
            const headX = offCanvas.width - padding;
            const headY = offCanvas.height - padding;
            const tailX = headX - dx;
            const tailY = headY - dy;

            // Optional subtle ambient glow stroke behind the streak
            if (cfg.glowWidth > 0) {
              oCtx.beginPath();
              oCtx.moveTo(tailX, tailY);
              oCtx.lineTo(headX, headY);
              oCtx.strokeStyle = palette.main;
              oCtx.lineWidth = cfg.glowWidth;
              oCtx.lineCap = 'round';
              oCtx.globalAlpha = 0.22;
              oCtx.stroke();
            }

            // Core laser beam streak
            const grad = oCtx.createLinearGradient(tailX, tailY, headX, headY);
            grad.addColorStop(0, 'rgba(0, 255, 136, 0)');
            grad.addColorStop(0.65, palette.main);
            grad.addColorStop(1, palette.head);

            oCtx.beginPath();
            oCtx.moveTo(tailX, tailY);
            oCtx.lineTo(headX, headY);
            oCtx.strokeStyle = grad;
            oCtx.lineWidth = cfg.width;
            oCtx.lineCap = 'round';
            oCtx.globalAlpha = cfg.opacity;
            oCtx.stroke();

            // Luminous aerodynamic head droplet
            if (cfg.headRadius > 0) {
              oCtx.beginPath();
              oCtx.arc(headX, headY, cfg.headRadius, 0, Math.PI * 2);
              oCtx.fillStyle = '#ffffff';
              oCtx.globalAlpha = 1.0;
              oCtx.fill();

              oCtx.beginPath();
              oCtx.arc(headX, headY, cfg.headRadius * 1.5, 0, Math.PI * 2);
              oCtx.fillStyle = palette.head;
              oCtx.globalAlpha = 0.6;
              oCtx.fill();
            }
          }

          layerSprites.push(offCanvas);
        });

        streakSprites.push(layerSprites);

        // Pre-render soft glowing orb (32x32 offscreen)
        const orbCanvas = document.createElement('canvas');
        orbCanvas.width = 32;
        orbCanvas.height = 32;
        const orbCtx = orbCanvas.getContext('2d');
        if (orbCtx) {
          const radial = orbCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
          radial.addColorStop(0, '#ffffff');
          radial.addColorStop(0.3, palette.head);
          radial.addColorStop(0.65, palette.main);
          radial.addColorStop(1, 'rgba(0,0,0,0)');

          orbCtx.fillStyle = radial;
          orbCtx.beginPath();
          orbCtx.arc(16, 16, 16, 0, Math.PI * 2);
          orbCtx.fill();
        }
        orbSprites.push(orbCanvas);
      });
    };

    initSprites();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Optimized particle density calculation (high visual impact, low CPU footprint)
    const getDropCount = () => {
      const isMobile = width < 768;
      if (!isEnabled) return 0;
      if (intensity === 'intense') return isMobile ? 45 : 85;
      if (intensity === 'elegant') return isMobile ? 28 : 52;
      return isMobile ? 16 : 28; // subtle
    };

    let drops: RainDrop[] = [];
    let splashes: Splash[] = [];
    let sparks: Spark[] = [];
    let orbs: AmbientOrb[] = [];

    const createDrop = (initialY?: number): RainDrop => {
      const paletteIndex = Math.floor(Math.random() * GREEN_PALETTE.length);
      const layerRand = Math.random();
      const layer = layerRand < 0.28 ? 2 : layerRand < 0.65 ? 1 : 0;

      let speed = 9 + Math.random() * 8;
      let opacity = 0.5 + Math.random() * 0.5;

      if (layer === 0) {
        speed = 5 + Math.random() * 4;
        opacity = 0.25 + Math.random() * 0.25;
      } else if (layer === 2) {
        speed = 13 + Math.random() * 8;
        opacity = 0.8 + Math.random() * 0.2;
      }

      if (intensity === 'elegant') opacity *= 0.8;
      if (intensity === 'subtle') opacity *= 0.55;

      return {
        x: Math.random() * (width + 300) - 150,
        y: initialY !== undefined ? initialY : Math.random() * -150,
        speed,
        layer,
        paletteIndex,
        scale: layer === 0 ? 0.8 : layer === 1 ? 1.0 : 1.15,
        opacity,
      };
    };

    const initParticles = () => {
      const count = getDropCount();
      drops = [];
      for (let i = 0; i < count; i++) {
        drops.push(createDrop(Math.random() * height));
      }

      // Floating ambient cyber orbs
      const orbCount = intensity === 'intense' ? 16 : intensity === 'elegant' ? 10 : 6;
      orbs = [];
      for (let i = 0; i < orbCount; i++) {
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 3.0,
          paletteIndex: Math.floor(Math.random() * GREEN_PALETTE.length),
          baseOpacity: 0.15 + Math.random() * 0.25,
          vy: 0.25 + Math.random() * 0.45,
          vx: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // High performance render loop with delta-time calculation
    let lastTime = performance.now();

    const render = (now: number) => {
      const elapsed = Math.min((now - lastTime) / 16.67, 2.0); // normalize around 60fps
      lastTime = now;

      // Fast clear
      ctx.clearRect(0, 0, width, height);

      if (!isEnabled) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Set blend mode once per frame
      ctx.globalCompositeOperation = 'lighter';

      // 1. Draw Ambient Floating Orbs via Cached Sprites
      if (!isScrolling) {
        for (let i = 0; i < orbs.length; i++) {
          const orb = orbs[i];
          orb.y += orb.vy * elapsed;
          orb.x += (orb.vx + Math.sin(orb.phase) * 0.25) * elapsed;
          orb.phase += 0.02 * elapsed;

          if (orb.y > height + 20) orb.y = -20;
          if (orb.x > width + 20) orb.x = -20;
          if (orb.x < -20) orb.x = width + 20;

          const currentOpacity = orb.baseOpacity * (0.8 + 0.3 * Math.sin(orb.phase));
          const orbSprite = orbSprites[orb.paletteIndex];
          if (orbSprite) {
            ctx.globalAlpha = currentOpacity;
            const size = orb.radius * 6;
            ctx.drawImage(orbSprite, orb.x - size / 2, orb.y - size / 2, size, size);
          }
        }
      }

      // 2. Draw Sleek Cyber Raindrops via GPU-cached Sprites
      const mouse = mouseRef.current;
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Advance position
        drop.y += drop.speed * elapsed;
        drop.x += drop.speed * ANGLE_X * elapsed;

        // Subtle mouse deflection
        if (mouse.active) {
          const dx = drop.x - mouse.x;
          const dy = drop.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000) { // 100px radius
            const dist = Math.sqrt(distSq) || 1;
            const push = (100 - dist) * 0.04;
            drop.x += (dx / dist) * push;
          }
        }

        // Draw cached streak
        const sprite = streakSprites[drop.paletteIndex]?.[drop.layer];
        if (sprite) {
          ctx.globalAlpha = drop.opacity;
          const w = sprite.width * drop.scale;
          const h = sprite.height * drop.scale;
          ctx.drawImage(sprite, drop.x - w + 8, drop.y - h + 8, w, h);
        }

        // Drop reached floor or screen boundary
        if (drop.y > height + 30 || drop.x > width + 150 || drop.x < -200) {
          // Trigger impact splash (sparingly, skip during active scroll for max FPS)
          if (!isScrolling && drop.layer >= 1 && Math.random() < 0.28 && splashes.length < 8) {
            splashes.push({
              x: drop.x,
              y: height - Math.random() * 12,
              radius: 1,
              maxRadius: 6 + Math.random() * 10,
              opacity: drop.opacity * 0.75,
              color: GREEN_PALETTE[drop.paletteIndex].main,
              speed: 0.8 + Math.random() * 0.6,
            });

            // 1 tiny kinetic spark
            if (drop.layer === 2 && sparks.length < 10 && Math.random() < 0.5) {
              sparks.push({
                x: drop.x,
                y: height - 4,
                vx: (Math.random() - 0.3) * 2.0,
                vy: -(1.2 + Math.random() * 2.5),
                life: 0,
                maxLife: 14 + Math.random() * 10,
                color: GREEN_PALETTE[drop.paletteIndex].head,
                size: 1 + Math.random() * 1.2,
              });
            }
          }

          // Respawn at top
          drops[i] = createDrop(Math.random() * -100);
        }
      }

      // 3. Draw Water Impact Ripples (Splashes)
      if (splashes.length > 0) {
        for (let i = splashes.length - 1; i >= 0; i--) {
          const splash = splashes[i];
          splash.radius += splash.speed * elapsed;
          splash.opacity -= 0.03 * elapsed;

          if (splash.opacity <= 0 || splash.radius >= splash.maxRadius) {
            splashes.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = splash.opacity;
          ctx.strokeStyle = splash.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(splash.x, splash.y, splash.radius * 2, splash.radius * 0.55, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 4. Draw Upward Bouncing Kinetic Sparks
      if (sparks.length > 0) {
        for (let i = sparks.length - 1; i >= 0; i--) {
          const spark = sparks[i];
          spark.x += spark.vx * elapsed;
          spark.y += spark.vy * elapsed;
          spark.vy += 0.18 * elapsed; // Gravity
          spark.life += elapsed;

          const currentOpacity = 1 - spark.life / spark.maxLife;

          if (spark.life >= spark.maxLife || spark.y > height) {
            sparks.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = Math.max(0, currentOpacity);
          ctx.fillStyle = spark.color;
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, isEnabled]);

  return (
    <>
      {/* 
        Hardware-Accelerated Fullscreen Canvas Layer:
        - Promoted to GPU compositor layer (transform: translateZ(0))
        - Removed expensive CSS mixBlendMode: 'screen' to eliminate full-viewport repaint on scroll
        - pointer-events: none (will never block clicking any button or car)
      */}
      <canvas
        ref={canvasRef}
        id="neon-rain-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-[5] select-none transform-gpu"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Floating Ambient Atmosphere Glow (GPU-Accelerated) */}
      <div 
        className="fixed top-0 inset-x-0 h-32 pointer-events-none z-[6] bg-gradient-to-b from-[#67eb34]/10 via-[#00ff88]/5 to-transparent blur-2xl transition-opacity duration-500 transform-gpu"
        style={{ 
          opacity: isEnabled ? (intensity === 'intense' ? 0.6 : 0.35) : 0,
          transform: 'translateZ(0)'
        }}
      />

      {/* Subtle Luxury HUD Control Pill (Bottom-right corner) */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <div className="relative">
          {/* Main HUD Pill Trigger */}
          <motion.button
            type="button"
            onClick={() => setShowControls(!showControls)}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#031d10]/95 border border-emerald-500/50 hover:border-[#67eb34] text-white shadow-[0_0_20px_rgba(103,235,52,0.35)] backdrop-blur-xl transition-all cursor-pointer group"
            title="Ajustar Lluvia Cyber Verde Velox"
          >
            <div className="relative flex items-center justify-center">
              <span className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-[#67eb34] shadow-[0_0_8px_#67eb34]' : 'bg-slate-600'} transition-colors`} />
              {isEnabled && (
                <span className="absolute w-2 h-2 rounded-full bg-[#67eb34] animate-ping opacity-75" />
              )}
            </div>
            
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono tracking-wider">
              <Sparkles className="w-3 h-3 text-[#67eb34] group-hover:rotate-12 transition-transform" />
              <span className="text-slate-300 hidden sm:inline">LLUVIA:</span>
              <span className="text-[#67eb34] uppercase font-extrabold">
                {!isEnabled ? 'OFF' : intensity === 'intense' ? 'INTENSA' : intensity === 'elegant' ? 'ELEGANTE' : 'SUAVE'}
              </span>
            </div>
            <Sliders className="w-3 h-3 text-slate-400 group-hover:text-emerald-300 transition-colors" />
          </motion.button>

          {/* Expanded HUD Tuning Panel */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.16 }}
                className="absolute bottom-full right-0 mb-2.5 w-68 p-3.5 rounded-2xl bg-[#02130b]/95 border border-emerald-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(103,235,52,0.25)] backdrop-blur-2xl text-left"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-emerald-900/60 mb-2.5">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#67eb34]" />
                    Atmósfera Cyber Neón
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`px-2 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      isEnabled 
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-[#67eb34]' 
                        : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    {isEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{isEnabled ? 'Activa' : 'Pausa'}</span>
                  </button>
                </div>

                <p className="text-[10px] text-slate-300 leading-relaxed mb-2.5">
                  Haces cinemáticos esmeralda y lima neón optimizados por GPU a 60/120 FPS sin caída de rendimiento.
                </p>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Intensidad Visual
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['intense', 'elegant', 'subtle'] as RainIntensity[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          setIntensity(mode);
                          if (!isEnabled) setIsEnabled(true);
                        }}
                        className={`py-1.5 px-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer text-center ${
                          intensity === mode && isEnabled
                            ? 'bg-[#0f4425] border-[#67eb34] text-white shadow-[0_0_12px_rgba(103,235,52,0.45)]'
                            : 'bg-[#041d10] border-emerald-950 text-slate-400 hover:text-white hover:border-emerald-700'
                        }`}
                      >
                        {mode === 'intense' ? '⚡ Intensa' : mode === 'elegant' ? '✨ Elegante' : '🍃 Suave'}
                      </button>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

