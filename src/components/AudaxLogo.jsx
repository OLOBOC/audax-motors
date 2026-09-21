import React from 'react';

export default function AudaxLogo({ className = "h-10", showSlogan = false, variant = "full" }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Emblem */}
      <div className="relative flex-shrink-0 w-9 h-9 rounded-lg bg-[#0E0F14] border border-[#C5A880]/30 p-1 flex items-center justify-center shadow-lg shadow-black/60 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C5A880]/20 via-transparent to-transparent opacity-80" />
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A880] relative z-10" fill="none">
          {/* Stylized geometric 'A' chevron from Audax Motors logo */}
          <path
            d="M50 15 L78 82 L65 82 L50 44 L35 82 L22 82 Z"
            fill="url(#goldGrad)"
          />
          <path
            d="M30 64 L50 64 L46 54 L34 54 Z"
            fill="#EAD5B5"
          />
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E3C3" />
              <stop offset="50%" stopColor="#C5A880" />
              <stop offset="100%" stopColor="#8E6F40" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center tracking-[0.25em] font-extrabold text-white text-base sm:text-lg uppercase">
          AUDAX
        </div>
        <div className="text-[9px] tracking-[0.45em] text-[#C5A880] uppercase font-semibold mt-0.5">
          MOTORS
        </div>
        {showSlogan && (
          <div className="text-[7.5px] tracking-[0.2em] text-[#8E92A4] uppercase mt-1">
            Impulsados por la pasión
          </div>
        )}
      </div>
    </div>
  );
}
