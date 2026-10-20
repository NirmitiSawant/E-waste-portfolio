import React from 'react';

/**
 * Botanical & E-Waste Ambient Background
 * Layered illustrations featuring:
 * - Sage-green and mint-green leaves swaying gently
 * - Floating circuit board traces, microchips, and electronic silhouettes
 * - Soft sunlight rays and floating environmental light motes
 * - Respects the user's specific environmental warm cream color palette
 */
export const AmbientBackground: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Soft warm cream ambient base gradient with sunlight diffusion */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF5] via-[#FFFDF5]/90 to-[#F7FAF4]" />

      {/* Radiant Sunbeam Effect from top-left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#FFD166]/20 via-[#E8F7E8]/40 to-transparent blur-3xl animate-sunbeam" />
      <div className="absolute top-1/4 -right-32 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-[#DDF2FF]/30 via-[#E8F7E8]/20 to-transparent blur-3xl animate-pulse-soft" />

      {/* Floating Botanical Leaf 1 (Top Left) */}
      <div className="absolute -top-6 -left-6 w-56 h-56 text-[#2E8B57]/15 animate-sway-slow">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M20 180 C40 100, 100 40, 180 20 C140 80, 100 140, 20 180 Z"
            fill="currentColor"
          />
          <path
            d="M30 170 C70 120, 110 80, 160 35"
            stroke="#68C96B"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path d="M70 130 C90 120, 110 125, 120 115" stroke="#68C96B" strokeWidth="1.5" opacity="0.4" />
          <path d="M100 100 C120 90, 135 95, 145 85" stroke="#68C96B" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>

      {/* Floating Botanical Monstera/Palm Leaf 2 (Top Right) */}
      <div className="absolute top-12 -right-12 w-64 h-64 text-[#68C96B]/15 animate-sway-reverse">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M180 20 C120 40, 40 100, 20 180 C80 140, 140 100, 180 20 Z"
            fill="currentColor"
          />
          <path
            d="M165 35 C120 75, 75 125, 35 165"
            stroke="#2E8B57"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path d="M130 70 C120 90, 125 110, 115 120" stroke="#2E8B57" strokeWidth="1.5" opacity="0.4" />
          <path d="M100 100 C90 120, 95 135, 85 145" stroke="#2E8B57" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>

      {/* Subtle Floating Circuit Board Nodes (Left Middle) */}
      <div className="absolute top-[38%] left-8 w-44 h-44 text-[#3A9DCC]/15 animate-float-gentle">
        <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Circuit bus lines */}
          <path d="M10 20 H50 L80 50 H130" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
          <path d="M20 70 H60 L90 100 H140" stroke="currentColor" strokeWidth="2" />
          <path d="M40 130 H80 L110 100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Solder solder points */}
          <circle cx="10" cy="20" r="4" fill="currentColor" />
          <circle cx="50" cy="20" r="3" fill="#68C96B" fillOpacity="0.4" />
          <circle cx="130" cy="50" r="5" fill="currentColor" />
          <circle cx="20" cy="70" r="4" fill="#FFD166" fillOpacity="0.4" />
          <circle cx="140" cy="100" r="4" fill="currentColor" />
          {/* IC Chip Silhouette */}
          <rect x="55" y="38" width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="44" x2="55" y2="44" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="55" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="56" x2="55" y2="56" stroke="currentColor" strokeWidth="1.5" />
          <line x1="79" y1="44" x2="84" y2="44" stroke="currentColor" strokeWidth="1.5" />
          <line x1="79" y1="50" x2="84" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="79" y1="56" x2="84" y2="56" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Floating Retro Smartphone & Cable Silhouette (Right Middle) */}
      <div className="absolute top-[48%] right-6 w-36 h-36 text-[#FF8A65]/15 animate-float-subtle">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Tangled cable coil */}
          <path
            d="M20 90 C30 110, 70 110, 80 90 C90 70, 50 60, 60 40 C70 20, 100 30, 105 15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* USB-A connector */}
          <rect x="98" y="10" width="16" height="12" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="102" y1="14" x2="105" y2="14" stroke="currentColor" strokeWidth="1" />
          <line x1="102" y1="18" x2="105" y2="18" stroke="currentColor" strokeWidth="1" />
          {/* Small feature phone body */}
          <rect x="15" y="18" width="34" height="60" rx="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="20" y="24" width="24" height="20" rx="2" fill="currentColor" fillOpacity="0.3" />
          <circle cx="32" cy="54" r="3" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Gentle Floating Light Motes / Spores */}
      <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-[#FFD166]/40 blur-xs animate-float-gentle" />
      <div className="absolute top-2/3 left-1/3 w-2.5 h-2.5 rounded-full bg-[#68C96B]/35 blur-xs animate-float-subtle" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-1/4 w-3.5 h-3.5 rounded-full bg-[#2E8B57]/25 blur-xs animate-float-gentle" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-[#3A9DCC]/30 blur-xs animate-float-subtle" style={{ animationDelay: '2s' }} />

      {/* Bottom Botanical Vines / Grass Border Overlay (Soft green footer fringe) */}
      <div className="absolute -bottom-10 left-0 right-0 h-40 opacity-20 pointer-events-none flex justify-between">
        <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0 120 C100 80, 200 90, 300 110 C400 70, 500 85, 600 115 C700 80, 800 95, 900 110 C1000 75, 1100 85, 1200 120 V120 H0 Z"
            fill="#2E8B57"
          />
          <path
            d="M50 120 Q120 50, 180 120 Q240 60, 320 120 Q420 40, 500 120 Q620 55, 720 120 Q820 45, 920 120 Q1040 50, 1150 120"
            stroke="#68C96B"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
