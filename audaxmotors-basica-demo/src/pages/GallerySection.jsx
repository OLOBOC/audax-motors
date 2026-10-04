import React, { useState } from "react";
import { GALLERY_IMAGES, COMPANY } from "../data/config";
import { Instagram, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox((l) => (l > 0 ? l - 1 : GALLERY_IMAGES.length - 1));
  const next = () => setLightbox((l) => (l < GALLERY_IMAGES.length - 1 ? l + 1 : 0));

  return (
    <section id="galeria" className="py-24 bg-[#08090C] border-y border-[#181A24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Galeria del Negocio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">Nuestras instalaciones y vehiculos</h2>
            <p className="text-sm text-gray-400 max-w-xl">Una muestra de nuestro trabajo, instalaciones y algunos de los vehiculos que han pasado por Audax Motors.</p>
          </div>
          <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="self-start sm:self-center px-6 py-3 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2">
            <Instagram className="w-4 h-4" /><span>Ver Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightbox(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 hover:border-[#D4AF37]/40 cursor-pointer card-hover-effect"
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover img-zoom" />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                <ArrowUpRight className="w-6 h-6 text-[#D4AF37] mb-2" />
                <span className="text-[11px] font-extrabold text-white uppercase tracking-wider">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-white/10 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            <Instagram className="w-4 h-4" /><span>Siguenos en Instagram {COMPANY.instagramHandle}</span>
          </div>
          <p className="text-sm text-gray-300">Enterate antes que nadie de los nuevos vehiculos disponibles, videos y entregas.</p>
          <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider hover:scale-105 transition-all">
            <Instagram className="w-4 h-4" /><span>Ver perfil de Instagram</span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={GALLERY_IMAGES[lightbox].src} alt={GALLERY_IMAGES[lightbox].alt} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            <p className="text-center text-sm text-gray-400 mt-4">{GALLERY_IMAGES[lightbox].caption}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10">
            <ChevronRight className="w-6 h-6" />
          </button>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}
