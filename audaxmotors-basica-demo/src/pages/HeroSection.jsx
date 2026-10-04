import React from "react";
import { COMPANY } from "../data/config";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

export default function HeroSection({ onNavigate }) {
  return (
    <section id="inicio" className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/img/showroom_nanobana.jpg" alt="Concesionario Audax Motors en Gijon" className="w-full h-full object-cover object-center scale-105 filter brightness-[0.75]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/75 to-[#07080A]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080A] via-[#07080A]/80 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 border border-[#D4AF37]/40 backdrop-blur-md shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#F3E5C8]">
              INSTALACIONES OFICIALES · GIJON, ASTURIAS
            </span>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.08]">
              {COMPANY.heroHeadline} <br />
              <span className="text-gold-gradient">{COMPANY.heroHighlight}</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-300 max-w-xl font-normal leading-relaxed pt-1">
              {COMPANY.heroSubtitle}
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate("vende")}
              className="px-8 py-4 rounded-2xl bg-gold-gradient bg-gold-gradient-hover text-black font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-3 group"
            >
              <span>Tasar mi Coche Gratis</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("contacto")}
              className="px-8 py-4 rounded-2xl bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:border-[#D4AF37]/50 font-bold text-xs tracking-wider uppercase transition-all backdrop-blur-md flex items-center justify-center gap-2"
            >
              <span>Contactar con Nosotros</span>
            </button>
          </div>
          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/10 max-w-xl">
            {COMPANY.trustStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-white font-black text-xl sm:text-2xl font-display">{stat.value}</span>
                <span className="text-[11px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
