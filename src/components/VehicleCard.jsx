import React from 'react';
import { Calendar, Gauge, Fuel, Cog, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function VehicleCard({ vehicle, onSelect }) {
  const isSold = vehicle.isSold || vehicle.status === 'Vendido';

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className="group relative bg-[#0F1017] rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 overflow-hidden cursor-pointer flex flex-col card-hover-effect"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0D]">
        <img
          src={vehicle.mainImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1017] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {isSold ? (
            <span className="px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-red-600 text-white shadow-lg">
              VENDIDO
            </span>
          ) : vehicle.badge ? (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 shadow-md">
              {vehicle.badge}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
              Disponible
            </span>
          )}

          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-black/70 backdrop-blur-md border border-white/15">
            {vehicle.power}
          </span>
        </div>

        {/* Brand & Price Tag Overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              {vehicle.brand}
            </span>
            <div className="text-xl md:text-2xl font-extrabold font-display text-white drop-shadow-lg">
              {vehicle.priceFormatted}
            </div>
          </div>

          {vehicle.monthlyPrice && !isSold && (
            <div className="text-right bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/20">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-semibold">Desde</span>
              <span className="text-xs font-bold text-[#D4AF37]">{vehicle.monthlyPrice}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight line-clamp-1 font-display">
            {vehicle.model}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-1 mt-1 font-normal">
            {vehicle.version}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Año {vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{vehicle.mileageFormatted}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cog className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{vehicle.gearbox}</span>
          </div>
        </div>

        {/* Warranty Badge & Action Button */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
            <span className="flex items-center gap-1 text-[#C5A880] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Revisado en Taller Propio
            </span>
            <span>Gijón, Asturias</span>
          </div>

          <button
            type="button"
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 group-hover:bg-gold-gradient text-xs font-bold uppercase tracking-wider text-white group-hover:text-black transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-amber-500/20"
          >
            <span>Ver Ficha Completa</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

