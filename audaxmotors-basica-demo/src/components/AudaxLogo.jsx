import React, { useState } from "react";

export default function AudaxLogo({ className = "h-10", showSlogan = false }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {!imgError ? (
        <img
          src="/img/logo_audax.png"
          alt="Audax Motors Logo"
          onError={() => setImgError(true)}
          className="h-9 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(197,168,128,0.3)] transition-transform hover:scale-105"
        />
      ) : (
        <div className="relative flex-shrink-0 w-9 h-9 rounded-lg bg-[#0E0F14] border border-[#C5A880]/30 p-1 flex items-center justify-center shadow-lg overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <path d="M50 15 L78 82 L65 82 L50 44 L35 82 L22 82 Z" fill="url(#goldGrad)" />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5E3C3" />
                <stop offset="50%" stopColor="#C5A880" />
                <stop offset="100%" stopColor="#8E6F40" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center tracking-[0.25em] font-extrabold text-white text-base sm:text-lg uppercase font-display">
          AUDAX
        </div>
        <div className="text-[9px] tracking-[0.45em] text-[#C5A880] uppercase font-bold mt-0.5">
          MOTORS
        </div>
        {showSlogan && (
          <div className="text-[7.5px] tracking-[0.25em] text-gray-400 uppercase mt-1">
            Impulsados por la pasion
          </div>
        )}
      </div>
    </div>
  );
}
