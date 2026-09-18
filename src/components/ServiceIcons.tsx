import React from 'react';

interface IconProps {
  className?: string;
}

export const FTLTruckIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-[#52e32a] drop-shadow-[0_0_10px_rgba(82,227,42,0.8)]`}
  >
    {/* Trailer */}
    <rect x="4" y="10" width="26" height="22" rx="2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="10" x2="12" y2="32" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    <line x1="20" y1="10" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    {/* Cab */}
    <path d="M30 18H38L44 24V32H30V18Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Windshield */}
    <path d="M32 20H37L41 24H32V20Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
    {/* Wheels */}
    <circle cx="11" cy="34" r="3.5" stroke="currentColor" strokeWidth="2.5" fill="#041a0e" />
    <circle cx="11" cy="34" r="1" fill="currentColor" />
    <circle cx="23" cy="34" r="3.5" stroke="currentColor" strokeWidth="2.5" fill="#041a0e" />
    <circle cx="23" cy="34" r="1" fill="currentColor" />
    <circle cx="37" cy="34" r="3.5" stroke="currentColor" strokeWidth="2.5" fill="#041a0e" />
    <circle cx="37" cy="34" r="1" fill="currentColor" />
    {/* Underbody line */}
    <line x1="15" y1="32" x2="19" y2="32" stroke="currentColor" strokeWidth="2" />
    <line x1="27" y1="32" x2="33" y2="32" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const LTLBoxesIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-[#52e32a] drop-shadow-[0_0_10px_rgba(82,227,42,0.8)]`}
  >
    {/* Top Cube */}
    <g transform="translate(14, 4)">
      <path d="M10 0 L20 5 L10 10 L0 5 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
      <path d="M0 5 L10 10 L10 20 L0 15 Z" stroke="currentColor" strokeWidth="2" />
      <path d="M20 5 L10 10 L10 20 L20 15 Z" stroke="currentColor" strokeWidth="2" />
    </g>
    {/* Bottom Left Cube */}
    <g transform="translate(4, 18)">
      <path d="M10 0 L20 5 L10 10 L0 5 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
      <path d="M0 5 L10 10 L10 20 L0 15 Z" stroke="currentColor" strokeWidth="2" />
      <path d="M20 5 L10 10 L10 20 L20 15 Z" stroke="currentColor" strokeWidth="2" />
    </g>
    {/* Bottom Right Cube */}
    <g transform="translate(24, 18)">
      <path d="M10 0 L20 5 L10 10 L0 5 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
      <path d="M0 5 L10 10 L10 20 L0 15 Z" stroke="currentColor" strokeWidth="2" />
      <path d="M20 5 L10 10 L10 20 L20 15 Z" stroke="currentColor" strokeWidth="2" />
    </g>
  </svg>
);

export const OceanShipIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-[#52e32a] drop-shadow-[0_0_10px_rgba(82,227,42,0.8)]`}
  >
    {/* Hull */}
    <path
      d="M6 30 L10 38 H38 L42 30 H6 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    {/* Water Waves */}
    <path
      d="M3 41 C7 43 11 41 15 41 C19 41 23 43 27 41 C31 41 35 43 39 41 C42 41 44 42 45 42"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
    {/* Bridge / Cabin */}
    <rect x="30" y="16" width="8" height="14" stroke="currentColor" strokeWidth="2" fill="#041a0e" />
    <line x1="32" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.5" />
    {/* Cargo Containers Stacks */}
    <rect x="10" y="22" width="8" height="8" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
    <rect x="19" y="22" width="8" height="8" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
    <rect x="14" y="14" width="8" height="8" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.25" />
    {/* Radar Mast */}
    <line x1="34" y1="16" x2="34" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AirPlaneIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-[#52e32a] drop-shadow-[0_0_10px_rgba(82,227,42,0.8)]`}
  >
    {/* Angled Ascending Jet Aircraft */}
    <g transform="translate(4, 4) rotate(-15 20 20)">
      {/* Fuselage */}
      <path
        d="M20 4 C22 4 23 7 23 14 L36 24 V27 L23 23 V33 L27 36 V38 L20 36 L13 38 V36 L17 33 V23 L4 27 V24 L17 14 C17 7 18 4 20 4 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* Jet engines */}
      <rect x="11" y="21" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="26" y="21" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3" />
    </g>
  </svg>
);

export const CustomsIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-[#52e32a] drop-shadow-[0_0_10px_rgba(82,227,42,0.8)]`}
  >
    {/* Document Board */}
    <rect x="8" y="10" width="22" height="30" rx="3" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
    {/* Clip top */}
    <path d="M15 10 V7 C15 5.9 15.9 5 17 5 H21 C22.1 5 23 5.9 23 7 V10" stroke="currentColor" strokeWidth="2" />
    {/* Document lines */}
    <line x1="13" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="13" y1="24" x2="25" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="13" y1="30" x2="19" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    
    {/* Official Customs Parcel / Stamp in bottom right */}
    <g transform="translate(24, 22)">
      {/* Small Box */}
      <rect x="2" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="#041a0e" />
      {/* Tape */}
      <line x1="2" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="10" y1="4" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" />
      {/* Checkmark stamp badge */}
      <circle cx="16" cy="4" r="5" fill="#67eb34" stroke="#041a0e" strokeWidth="1.5" />
      <path d="M14 4 L15.5 5.5 L18 3" stroke="#041a0e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);
