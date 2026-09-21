import React from 'react';
import { Calendar, Gauge, Fuel, Cog, ArrowUpRight } from 'lucide-react';

export default function VehicleCard({ vehicle, onSelect }) {
  return (
    <div
      onClick={() => onSelect(vehicle)}
      className="group relative bg-[#101117] rounded-2xl border border-[#1E202B] hover:border-[#C5A880]/50 overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/70"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0C]">
        <img
          src={vehicle.mainImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover img-zoom group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101117] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {vehicle.badge ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#0C0D12]/80 backdrop-blur-md text-[#EAD5B5] border border-[#C5A880]/40 shadow-sm">
              {vehicle.badge}
            </span>
          ) : <span />}

          <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-white/90 bg-black/60 backdrop-blur-md border border-white/10">
            {vehicle.power}
          </span>
        </div>

        {/* Brand & Price on hover/bottom of image */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
            {vehicle.brand}
          </div>
          <div className="text-right">
            <div className="text-xl font-bold font-display text-white drop-shadow-md">
              {vehicle.priceFormatted}
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#E2CDAD] transition-colors leading-tight line-clamp-1">
            {vehicle.model}
          </h3>
          <p className="text-xs text-[#828699] line-clamp-1 mt-1 font-normal">
            {vehicle.version}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1C1E27] text-xs text-[#9FA3B5]">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{vehicle.mileageFormatted}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{vehicle.fuel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cog className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{vehicle.gearbox}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            className="w-full py-2.5 px-4 rounded-xl bg-[#181A23] group-hover:bg-gradient-to-r group-hover:from-[#C5A880] group-hover:to-[#D8BC94] text-xs font-semibold text-white group-hover:text-black transition-all duration-300 flex items-center justify-center gap-2 border border-[#242633] group-hover:border-transparent"
          >
            <span>Ver detalles y fotos</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
