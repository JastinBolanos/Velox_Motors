import React from 'react';

interface VeloxLogoProps {
  variant?: 'full' | 'mark-only' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  tagline?: string;
  showTagline?: boolean;
}

export const VeloxEmblemMark: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({
  size = 40,
  className = '',
  animated = false,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 group ${className}`}
      style={{ width: size, height: size }}
      id="velox-emblem-badge"
    >
      {/* Ambient Cyber Emerald Aura / Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#67eb34]/30 via-emerald-500/10 to-transparent blur-md opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />

      {/* Main Vector SVG Emblem */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:scale-[1.03] transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Velox Motors Apex Emblem"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="shieldBg" x1="50" y1="4" x2="50" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0a2316" />
            <stop offset="45%" stopColor="#03130a" />
            <stop offset="100%" stopColor="#010703" />
          </linearGradient>

          <linearGradient id="shieldBorder" x1="20" y1="6" x2="80" y2="94" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#67eb34" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#064e3b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#67eb34" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="leftWingGrad" x1="24" y1="32" x2="50" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="30%" stopColor="#67eb34" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="rightWingGrad" x1="76" y1="32" x2="50" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#d1fae5" />
            <stop offset="70%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          <linearGradient id="coreApexGrad" x1="50" y1="18" x2="50" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="carbonPattern" x1="0" y1="0" x2="6" y2="6" gradientUnits="userSpaceOnUse">
            <pattern id="carbonMesh" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 3 L3 0 L6 3 L3 6 Z" fill="#04180d" opacity="0.6" />
              <path d="M3 3 L6 0 L6 6 Z" fill="#020d07" opacity="0.8" />
            </pattern>
          </linearGradient>

          {/* Glow filter */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Outer Aerodynamic Shield Base */}
        <polygon
          points="50,6 84,14 86,48 50,94 14,48 16,14"
          fill="url(#shieldBg)"
          stroke="url(#shieldBorder)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Carbon fiber texture layer */}
        <polygon
          points="50,8 82,15 84,47 50,91 16,47 18,15"
          fill="url(#carbonMesh)"
          opacity="0.85"
        />

        {/* Subtle inner shield rim for luxury depth */}
        <polygon
          points="50,11 79,18 80,45 50,87 20,45 21,18"
          fill="none"
          stroke="#10b981"
          strokeWidth="0.8"
          strokeOpacity="0.25"
          strokeLinejoin="round"
        />

        {/* 2. Aerodynamic Twin Vortex Strakes (Upper Aero Vents) */}
        <path
          d="M30 22 L40 20 L37 26 L27 28 Z"
          fill="#67eb34"
          fillOpacity="0.4"
        />
        <path
          d="M70 22 L60 20 L63 26 L73 28 Z"
          fill="#67eb34"
          fillOpacity="0.4"
        />

        {/* 3. The Sculpted Apex "V" Monogram Wings */}
        {/* Left Wing (Dynamic Emerald Flare) */}
        <path
          d="M50 82 L26 38 L38 32 L50 58 Z"
          fill="url(#leftWingGrad)"
          stroke="#4ade80"
          strokeWidth="0.5"
          filter="drop-shadow(0 0 4px rgba(103,235,52,0.4))"
        />

        {/* Right Wing (Platinum Chiseled Titanium Bevel) */}
        <path
          d="M50 82 L74 38 L62 32 L50 58 Z"
          fill="url(#rightWingGrad)"
          stroke="#ffffff"
          strokeWidth="0.5"
        />

        {/* Central Spine Chisel Highlight */}
        <line
          x1="50"
          y1="58"
          x2="50"
          y2="82"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 4. Central Supersonic Apex Diamond (The Precision Core) */}
        <polygon
          points="50,19 57,36 50,51 43,36"
          fill="url(#coreApexGrad)"
          stroke="#ffffff"
          strokeWidth="0.75"
          filter="url(#neonGlow)"
        />

        {/* Micro-dot Apex Specular Sparkle */}
        <circle cx="50" cy="35" r="1.8" fill="#ffffff" />

        {/* 5. Aerodynamic Base Winglets (Downforce Splitter Accents) */}
        <path
          d="M26 48 L22 46 L30 62 L35 59 Z"
          fill="#67eb34"
          fillOpacity="0.7"
        />
        <path
          d="M74 48 L78 46 L70 62 L65 59 Z"
          fill="#10b981"
          fillOpacity="0.7"
        />

        {/* Apex Crown Indicator Notch */}
        <polygon
          points="50,5 53,10 47,10"
          fill="#67eb34"
        />
      </svg>

      {/* Tiny live status or precision beacon */}
      {animated && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#67eb34] shadow-[0_0_10px_#67eb34] animate-pulse z-20" />
      )}
    </div>
  );
};

export const VeloxLogo: React.FC<VeloxLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  tagline = 'EXOTIC & HYPERCARS SHOWROOM',
  showTagline = true,
}) => {
  // Dimensions per size
  const emblemSizes = {
    sm: 34,
    md: 44,
    lg: 56,
    xl: 72,
  };

  const titleSizes = {
    sm: 'text-base tracking-[0.14em]',
    md: 'text-lg sm:text-xl tracking-[0.16em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.18em]',
    xl: 'text-3xl sm:text-4xl tracking-[0.2em]',
  };

  const taglineSizes = {
    sm: 'text-[8px] tracking-[0.24em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.28em]',
    lg: 'text-[11px] sm:text-xs tracking-[0.32em]',
    xl: 'text-xs sm:text-sm tracking-[0.36em]',
  };

  if (variant === 'mark-only') {
    return <VeloxEmblemMark size={emblemSizes[size]} className={className} animated={false} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 group ${className}`} id="velox-logo-stacked">
        <VeloxEmblemMark size={emblemSizes[size]} animated={true} />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 font-sans">
            <span className={`font-black text-white ${titleSizes[size]} drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
              VELOX
            </span>
            <span className={`font-black text-[#67eb34] ${titleSizes[size]} drop-shadow-[0_0_15px_rgba(103,235,52,0.4)]`}>
              MOTORS
            </span>
          </div>
          {showTagline && (
            <div className="flex items-center gap-2 mt-1">
              <span className="w-5 h-[1px] bg-gradient-to-r from-transparent to-emerald-500/80" />
              <span className={`font-bold text-emerald-400 uppercase font-mono ${taglineSizes[size]}`}>
                {tagline}
              </span>
              <span className="w-5 h-[1px] bg-gradient-to-l from-transparent to-emerald-500/80" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal 'full'
  return (
    <div className={`flex items-center gap-3 group cursor-pointer select-none ${className}`} id="velox-logo-full">
      <VeloxEmblemMark size={emblemSizes[size]} animated={true} />
      
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black text-white ${titleSizes[size]} drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-slate-100 transition-colors`}>
            VELOX
          </span>
          <span className={`font-black text-[#67eb34] ${titleSizes[size]} drop-shadow-[0_0_12px_rgba(103,235,52,0.5)] group-hover:text-[#7bf04c] group-hover:drop-shadow-[0_0_18px_rgba(103,235,52,0.8)] transition-all`}>
            MOTORS
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`font-bold text-emerald-400/90 uppercase font-mono leading-none ${taglineSizes[size]} group-hover:text-emerald-300 transition-colors`}>
              {tagline}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#67eb34] opacity-80 shadow-[0_0_5px_#67eb34] hidden sm:inline-block" />
          </div>
        )}
      </div>
    </div>
  );
};
