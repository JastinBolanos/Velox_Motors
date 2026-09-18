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
  length: number;
  speed: number;
  width: number;
  color: string;
  headColor: string;
  opacity: number;
  layer: number; // 0: background, 1: mid, 2: foreground
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
  color: string;
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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

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

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle density calculation based on intensity & screen size
    const getDropCount = () => {
      const isMobile = width < 768;
      if (!isEnabled) return 0;
      const screenRatio = Math.max(1, width / 1280);
      if (intensity === 'intense') return Math.round((isMobile ? 80 : 160) * screenRatio);
      if (intensity === 'elegant') return Math.round((isMobile ? 45 : 95) * screenRatio);
      return Math.round((isMobile ? 25 : 55) * screenRatio); // subtle
    };

    let drops: RainDrop[] = [];
    let splashes: Splash[] = [];
    let sparks: Spark[] = [];
    let orbs: AmbientOrb[] = [];

    const createDrop = (initialY?: number): RainDrop => {
      const palette = GREEN_PALETTE[Math.floor(Math.random() * GREEN_PALETTE.length)];
      const layer = Math.random() < 0.25 ? 2 : Math.random() < 0.6 ? 1 : 0; // 2 is closest/fastest

      let speed = 7 + Math.random() * 8;
      let length = 35 + Math.random() * 55;
      let dropLineWidth = 1.2 + Math.random() * 1.5;
      let opacity = 0.35 + Math.random() * 0.55;

      if (layer === 0) {
        // Distant background
        speed = 4 + Math.random() * 4;
        length = 20 + Math.random() * 30;
        dropLineWidth = 0.8 + Math.random() * 0.6;
        opacity = 0.15 + Math.random() * 0.25;
      } else if (layer === 2) {
        // Foreground luminous drop
        speed = 11 + Math.random() * 7;
        length = 60 + Math.random() * 45;
        dropLineWidth = 1.8 + Math.random() * 1.2;
        opacity = 0.65 + Math.random() * 0.35;
      }

      // Slightly lower intensity if 'elegant' or 'subtle'
      if (intensity === 'elegant') opacity *= 0.75;
      if (intensity === 'subtle') opacity *= 0.5;

      return {
        x: Math.random() * (width + 400) - 200,
        y: initialY !== undefined ? initialY : Math.random() * -height,
        length,
        speed,
        width: dropLineWidth,
        color: palette.main,
        headColor: palette.head,
        opacity,
        layer,
      };
    };

    const initParticles = () => {
      const count = getDropCount();
      drops = [];
      for (let i = 0; i < count; i++) {
        drops.push(createDrop(Math.random() * height));
      }

      // Ambient glowing orbs drifting
      const orbCount = intensity === 'intense' ? 35 : intensity === 'elegant' ? 20 : 10;
      orbs = [];
      for (let i = 0; i < orbCount; i++) {
        const palette = GREEN_PALETTE[Math.floor(Math.random() * GREEN_PALETTE.length)];
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 3.5,
          color: palette.main,
          baseOpacity: 0.1 + Math.random() * 0.3,
          vy: 0.2 + Math.random() * 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // Wind angle: sleek aerodynamic tilt (~12 degrees, like a wind tunnel)
    const angleX = 0.22; // horizontal drift per vertical step

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isEnabled) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // 1. Draw Ambient Floating Green Orbs / Glowing cyber dust
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.y += orb.vy;
        orb.x += orb.vx + Math.sin(orb.phase) * 0.2;
        orb.phase += 0.02;

        if (orb.y > height + 10) orb.y = -10;
        if (orb.x > width + 10) orb.x = -10;
        if (orb.x < -10) orb.x = width + 10;

        const currentOpacity = orb.baseOpacity * (0.8 + 0.3 * Math.sin(orb.phase));

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowColor = orb.color;
        ctx.shadowBlur = orb.radius * 4;
        ctx.fill();
        ctx.restore();
      }

      // 2. Draw Sleek Cyber Green Raindrops
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Move drop
        drop.y += drop.speed;
        drop.x += drop.speed * angleX;

        // Mouse displacement: slight aerodynamic push if near mouse
        if (mouseRef.current.active) {
          const dx = drop.x - mouseRef.current.x;
          const dy = drop.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const push = (120 - dist) * 0.03;
            drop.x += (dx / (dist || 1)) * push;
          }
        }

        // Draw luminous streak
        const startX = drop.x;
        const startY = drop.y;
        const endX = startX - drop.length * angleX;
        const endY = startY - drop.length;

        const gradient = ctx.createLinearGradient(endX, endY, startX, startY);
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0)');
        gradient.addColorStop(0.6, drop.color);
        gradient.addColorStop(1, drop.headColor);

        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(startX, startY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = drop.width;
        ctx.lineCap = 'round';
        ctx.globalAlpha = drop.opacity;

        // Glowing effect on foreground & midground streaks
        if (drop.layer >= 1) {
          ctx.shadowColor = drop.color;
          ctx.shadowBlur = drop.layer === 2 ? 14 : 7;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.stroke();

        // Glowing bright tip/droplet at the head
        if (drop.layer === 2) {
          ctx.beginPath();
          ctx.arc(startX, startY, drop.width * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = drop.headColor;
          ctx.globalAlpha = Math.min(drop.opacity * 1.3, 1);
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.fill();
        }

        // Check if drop reached bottom or off-screen laterally
        if (drop.y > height + 20 || drop.x > width + 200 || drop.x < -300) {
          // Trigger impact splash with small chance
          if (Math.random() < 0.35 && drop.y >= height - 40) {
            splashes.push({
              x: drop.x,
              y: height - Math.random() * 15,
              radius: 1,
              maxRadius: 8 + Math.random() * 14,
              opacity: drop.opacity * 0.8,
              color: drop.color,
              speed: 0.7 + Math.random() * 0.8,
            });

            // Create 1-2 kinetic sparks bouncing up
            if (drop.layer === 2 && Math.random() < 0.6) {
              for (let s = 0; s < 2; s++) {
                sparks.push({
                  x: drop.x,
                  y: height - 5,
                  vx: (Math.random() - 0.3) * 2.5,
                  vy: -(1.5 + Math.random() * 3.5),
                  life: 0,
                  maxLife: 15 + Math.random() * 15,
                  color: drop.color,
                  size: 1 + Math.random() * 1.5,
                });
              }
            }
          }

          // Reset drop at top
          drops[i] = createDrop(Math.random() * -120);
        }
      }

      ctx.restore();

      // 3. Draw Water/Laser Impact Splashes (Ripples)
      for (let i = splashes.length - 1; i >= 0; i--) {
        const splash = splashes[i];
        splash.radius += splash.speed;
        splash.opacity -= 0.025;

        if (splash.opacity <= 0 || splash.radius >= splash.maxRadius) {
          splashes.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        // Flattened ellipse for 3D floor perspective
        ctx.ellipse(splash.x, splash.y, splash.radius * 2, splash.radius * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = splash.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = splash.opacity;
        ctx.shadowColor = splash.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Draw Upward Bouncing Kinetic Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.15; // Gravity
        spark.life++;

        const currentOpacity = 1 - spark.life / spark.maxLife;

        if (spark.life >= spark.maxLife || spark.y > height) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = Math.max(0, currentOpacity);
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, isEnabled]);

  return (
    <>
      {/* 
        Fullscreen Canvas Layer:
        - z-index: 5 (above base dark background, behind interactive cards and modals)
        - pointer-events: none (will never block clicking any button or car)
        - mix-blend-mode: screen / lighter for sublime hypercar illumination
      */}
      <canvas
        ref={canvasRef}
        id="neon-rain-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-[5] select-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Floating Ambient Atmosphere Glows */}
      <div 
        className="fixed top-0 inset-x-0 h-40 pointer-events-none z-[6] bg-gradient-to-b from-[#67eb34]/10 via-[#00ff88]/5 to-transparent blur-3xl opacity-60 transition-opacity duration-700"
        style={{ opacity: isEnabled ? (intensity === 'intense' ? 0.7 : 0.4) : 0 }}
      />

      {/* 
        Subtle Luxury HUD Control Pill (Bottom-right corner)
        Allows client to appreciate and toggle the luxury neon rain intensity
      */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <div className="relative">
          {/* Main HUD Pill Trigger */}
          <motion.button
            type="button"
            onClick={() => setShowControls(!showControls)}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#031d10]/95 border-2 border-emerald-500/50 hover:border-[#67eb34] text-white shadow-[0_0_25px_rgba(103,235,52,0.4)] backdrop-blur-xl transition-all cursor-pointer group"
            title="Ajustar Lluvia Cyber Verde Velox"
          >
            <div className="relative flex items-center justify-center">
              <span className={`w-2.5 h-2.5 rounded-full ${isEnabled ? 'bg-[#67eb34] shadow-[0_0_10px_#67eb34]' : 'bg-slate-600'} transition-colors`} />
              {isEnabled && (
                <span className="absolute w-2.5 h-2.5 rounded-full bg-[#67eb34] animate-ping opacity-75" />
              )}
            </div>
            
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#67eb34] group-hover:rotate-12 transition-transform" />
              <span className="text-slate-200">LLUVIA VERDE:</span>
              <span className="text-[#67eb34] uppercase font-black">
                {!isEnabled ? 'OFF' : intensity === 'intense' ? 'INTENSA' : intensity === 'elegant' ? 'ELEGANTE' : 'SUAVE'}
              </span>
            </div>
            <Sliders className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 transition-colors" />
          </motion.button>

          {/* Expanded HUD Tuning Panel */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-full right-0 mb-3 w-72 p-4 rounded-2xl bg-[#02130b]/95 border-2 border-emerald-500/50 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(103,235,52,0.25)] backdrop-blur-2xl text-left"
              >
                <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60 mb-3">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#67eb34]" />
                    Atmósfera Cyber Neón
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      isEnabled 
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-[#67eb34]' 
                        : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{isEnabled ? 'Activa' : 'Pausa'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  Lluvia cinemática de haces luminosos verde esmeralda y lima neón, inspirada en túneles de viento de alta competición.
                </p>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Intensidad Visual
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['intense', 'elegant', 'subtle'] as RainIntensity[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          setIntensity(mode);
                          if (!isEnabled) setIsEnabled(true);
                        }}
                        className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-center ${
                          intensity === mode && isEnabled
                            ? 'bg-[#0f4425] border-[#67eb34] text-white shadow-[0_0_15px_rgba(103,235,52,0.5)]'
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
