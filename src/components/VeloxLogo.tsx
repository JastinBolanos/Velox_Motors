import React from 'react';

interface VeloxLogoProps {
  variant?: 'full' | 'mark-only' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  tagline?: string;
  showTagline?: boolean;
}

/**
 * VeloxEmblemMark:
 * A serious, authoritative automotive emblem inspired by Tesla's minimalist design language.
 * Featuring a floating aerodynamic upper wing arch and a chiseled, monolithic 'V' core
 * sculpted in aerospace titanium and liquid platinum with precision laser accents.
 */
export const VeloxEmblemMark: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({
  size = 42,
  className = '',
  animated = false,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 group ${className}`}
      style={{ width: size, height: size }}
      id="velox-tesla-emblem-badge"
    >
      {/* Subtle Refined Specular Aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-[#67eb34]/15 to-transparent blur-md opacity-40 group-hover:opacity-90 group-hover:scale-115 transition-all duration-500 pointer-events-none" />

      {/* Main Tesla-Style Precision Vector Emblem */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)] transform group-hover:scale-[1.04] transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Velox Automotive Tesla-Style Apex Monogram"
      >
        <defs>
          {/* Floating Wing Bar: Titanium Platinum Metallic Gradient */}
          <linearGradient id="vxWingTitanium" x1="14" y1="20" x2="86" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="20%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="80%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Floating Wing Bevel Depth */}
          <linearGradient id="vxWingDepth" x1="50" y1="16" x2="50" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Left V Blade: Polished Platinum & Aerospace Alloy */}
          <linearGradient id="vxBladeLeft" x1="18" y1="34" x2="49" y2="89" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Right V Blade: Chiseled Contrast Shadow Titanium */}
          <linearGradient id="vxBladeRight" x1="82" y1="34" x2="51" y2="89" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="40%" stopColor="#94a3b8" />
            <stop offset="75%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Inner Supersonic Keel Specular */}
          <linearGradient id="vxDartGrad" x1="50" y1="34" x2="50" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Precision Emerald Laser Accent Gradient */}
          <linearGradient id="vxLaserGrad" x1="18" y1="50" x2="82" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#67eb34" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#67eb34" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#67eb34" stopOpacity="0.4" />
          </linearGradient>

          {/* Subtle Glow Filter for the laser core */}
          <filter id="vxLaserGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. TOP FLOATING AERODYNAMIC WING BAR (Tesla Heritage Architecture) */}
        {/* Deep drop shadow underlying wing */}
        <path
          d="M 15 25 C 32 17 68 17 85 25 L 82.5 29 C 68 22.5 32 22.5 17.5 29 Z"
          fill="#010603"
          opacity="0.9"
          transform="translate(0, 1)"
        />

        {/* Floating Wing Structure */}
        <path
          d="M 15 25 C 32 17 68 17 85 25 L 82.5 29 C 68 22.5 32 22.5 17.5 29 Z"
          fill="url(#vxWingTitanium)"
          stroke="#ffffff"
          strokeWidth="0.6"
        />

        {/* Upper Razor Leading Edge Highlight */}
        <path
          d="M 16 24.8 C 32.5 17.4 67.5 17.4 84 24.8"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Underside Precision Laser Reflex (Subtle Electric Green Line) */}
        <path
          d="M 21 28.3 C 33 23 67 23 79 28.3"
          stroke="#67eb34"
          strokeWidth="0.75"
          strokeOpacity="0.9"
        />

        {/* 2. THE MONOLITHIC CHISELED "V" BODY (Serious, Sculpted Hypercar Architecture) */}
        {/* Left Aerodynamic Wing Blade (Illuminated Facet) */}
        <polygon
          points="20,34.5 36,34.5 49,67 49,88.5"
          fill="url(#vxBladeLeft)"
        />
        {/* Left Blade Chamfer Edge */}
        <polygon
          points="20,34.5 23.5,34.5 49,88.5 46.5,88.5"
          fill="#ffffff"
          opacity="0.95"
        />
        {/* Left Top Bevel */}
        <polygon
          points="20,34.5 36,34.5 34,36.5 22,36.5"
          fill="#ffffff"
        />

        {/* Right Aerodynamic Wing Blade (Shadowed Facet) */}
        <polygon
          points="80,34.5 64,34.5 51,67 51,88.5"
          fill="url(#vxBladeRight)"
        />
        {/* Right Blade Chamfer Edge */}
        <polygon
          points="80,34.5 76.5,34.5 51,88.5 53.5,88.5"
          fill="#334155"
        />
        {/* Right Top Bevel */}
        <polygon
          points="80,34.5 64,34.5 66,36.5 78,36.5"
          fill="#94a3b8"
        />

        {/* Surgical Center Split Channel (Mechanical Precision Gap) */}
        <line
          x1="50"
          y1="67"
          x2="50"
          y2="88.5"
          stroke="#020a06"
          strokeWidth="2"
        />

        {/* 3. SUPERSONIC DORSAL STABILIZER (Central Precision Keel Dart) */}
        <polygon
          points="50,33.5 53.5,43 50,56 46.5,43"
          fill="url(#vxDartGrad)"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        {/* Specular Center Spine of the Dart */}
        <line
          x1="50"
          y1="34"
          x2="50"
          y2="55.5"
          stroke="#ffffff"
          strokeWidth="0.8"
        />

        {/* Laser Precision Optic Pinpoint */}
        <circle cx="50" cy="45" r="1.3" fill="#67eb34" filter="url(#vxLaserGlow)" />

        {/* Bottom Keel Anchor */}
        <polygon
          points="50,89 47.5,84.5 52.5,84.5"
          fill="#67eb34"
        />
      </svg>

      {/* High-Tech Pulse Beacon (Optional) */}
      {animated && (
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#67eb34] shadow-[0_0_8px_#67eb34] animate-pulse z-20" />
      )}
    </div>
  );
};

export const VeloxLogo: React.FC<VeloxLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  tagline = 'EXOTIC & HYPERCARS ATELIER',
  showTagline = true,
}) => {
  // Dimensions per size
  const emblemSizes = {
    sm: 32,
    md: 42,
    lg: 54,
    xl: 68,
  };

  const titleSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-lg sm:text-xl tracking-[0.22em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.24em]',
    xl: 'text-3xl sm:text-4xl tracking-[0.26em]',
  };

  const taglineSizes = {
    sm: 'text-[7.5px] tracking-[0.3em]',
    md: 'text-[8.5px] sm:text-[9.5px] tracking-[0.32em]',
    lg: 'text-[10px] sm:text-[11px] tracking-[0.36em]',
    xl: 'text-xs sm:text-sm tracking-[0.4em]',
  };

  if (variant === 'mark-only') {
    return <VeloxEmblemMark size={emblemSizes[size]} className={className} animated={false} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2.5 group ${className}`} id="velox-logo-stacked">
        <VeloxEmblemMark size={emblemSizes[size]} animated={true} />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 font-sans">
            <span className={`font-black text-white ${titleSizes[size]} drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]`}>
              VELOX
            </span>
            <span className={`font-black text-slate-200 border-b border-[#67eb34] pb-0.5 ${titleSizes[size]} drop-shadow-[0_0_12px_rgba(103,235,52,0.3)]`}>
              MOTORS
            </span>
          </div>
          {showTagline && (
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-4 h-[1px] bg-gradient-to-r from-transparent to-[#67eb34]/70" />
              <span className={`font-bold text-slate-400 uppercase font-mono ${taglineSizes[size]}`}>
                {tagline}
              </span>
              <span className="w-4 h-[1px] bg-gradient-to-l from-transparent to-[#67eb34]/70" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal 'full'
  return (
    <div className={`flex items-center gap-3.5 group cursor-pointer select-none ${className}`} id="velox-logo-full">
      <VeloxEmblemMark size={emblemSizes[size]} animated={true} />
      
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 leading-none">
          <span className={`font-extrabold text-white ${titleSizes[size]} tracking-[0.24em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] group-hover:text-slate-100 transition-colors`}>
            VELOX
          </span>
          <span className={`font-extrabold text-slate-200 ${titleSizes[size]} tracking-[0.22em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:text-white transition-colors relative`}>
            MOTORS
            <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#67eb34] via-[#86efac] to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`font-semibold text-emerald-400/90 uppercase font-mono leading-none ${taglineSizes[size]} group-hover:text-emerald-300 transition-colors`}>
              {tagline}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#67eb34] opacity-90 shadow-[0_0_6px_#67eb34] hidden sm:inline-block" />
          </div>
        )}
      </div>
    </div>
  );
};
