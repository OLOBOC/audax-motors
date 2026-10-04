import React from "react";
import { SERVICES } from "../data/config";
import { Car, Calculator, FileText, MapPin, ArrowRight } from "lucide-react";

const iconMap = { Car, Calculator, FileText, MapPin };

export default function ServicesSection({ onNavigate }) {
  return (
    <section id="servicios" className="py-24 bg-[#08090C] border-y border-[#181A24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />Lo que hacemos
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Servicios pensados para ti
          </h2>
          <p className="text-sm text-[#A0A4B4] leading-relaxed">
            Todo lo que necesitas para comprar, vender o gestionar tu vehiculo. Trato directo, sin complicaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Car;
            return (
              <div key={service.id} className="group relative bg-[#0E0F16] border border-[#1E202B] hover:border-[#C5A880]/40 rounded-3xl p-7 space-y-4 card-hover-effect flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C5A880]/20 transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 rounded-full">
                    {service.highlight}
                  </span>
                  <h3 className="text-lg font-bold font-display text-white">{service.title}</h3>
                  <p className="text-xs text-[#8E92A4] leading-relaxed">{service.description}</p>
                </div>
                {service.id === "tasacion" && (
                  <button
                    onClick={() => onNavigate("vende")}
                    className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:text-white transition-colors group-hover:gap-2.5"
                  >
                    <span>Solicitar tasacion</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 border border-amber-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Por que elegirnos</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Mas de 5 anos de experiencia en Asturias.</h3>
              <p className="text-sm text-gray-300 leading-relaxed">Compramos tu coche directamente con oferta en 24h, o nos encargamos de venderlo por ti gestionando todo y cobrando solo una comision. Papeleo incluido.</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <button
                onClick={() => onNavigate("vende")}
                className="px-8 py-4 rounded-2xl bg-gold-gradient bg-gold-gradient-hover text-black font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Tasar mi Coche</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("contacto")}
                className="text-xs font-semibold text-[#C5A880] hover:text-white transition-colors"
              >
                O contactar directamente →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
