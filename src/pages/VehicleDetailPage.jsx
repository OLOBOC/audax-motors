import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/vehicles';
import { 
  ArrowLeft, MessageCircle, Phone, Mail, Calendar, Gauge, Fuel, Cog, 
  Zap, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Share2, 
  MapPin, Clock, FileCheck 
} from 'lucide-react';

export default function VehicleDetailPage({ vehicle, onBack, onOpenContactModal }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!vehicle) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Vehículo no encontrado</h2>
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl bg-[#C5A880] text-black font-bold text-xs uppercase tracking-wider"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  const galleryImages = vehicle.gallery && vehicle.gallery.length > 0 
    ? vehicle.gallery 
    : [vehicle.mainImage];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappLink = `https://wa.me/34672944379?text=${encodeURIComponent(
    `Hola Audax Motors! Me gustaría recibir más información o concertar una cita para ver el ${vehicle.brand} ${vehicle.model} (${vehicle.priceFormatted}).`
  )}`;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Bar: Back & Share */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A0A4B4] hover:text-[#C5A880] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Stock</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141620] border border-[#232534] text-xs text-[#CBD0DF] hover:text-white transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? '¡Enlace copiado!' : 'Compartir ficha'}</span>
        </button>
      </div>

      {/* Main Layout: Left Gallery + Right Sticky Action Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Gallery & Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Gallery Main Container */}
          <div className="space-y-4">
            <div className="relative aspect-[16/10] bg-[#0A0B0E] rounded-3xl overflow-hidden border border-[#222432] shadow-2xl group">
              <img
                src={galleryImages[selectedImageIndex]}
                alt={`${vehicle.brand} ${vehicle.model} - foto ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 border border-white/10"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 border border-white/10"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Bottom Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-white font-medium">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>

              {/* Vehicle Badge */}
              {vehicle.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0C0D12]/90 backdrop-blur-md text-[#EAD5B5] border border-[#C5A880]/50 shadow-md">
                    {vehicle.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails Row */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#C5A880] scale-95 shadow-md shadow-[#C5A880]/30'
                        : 'border-[#1E202B] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="bg-[#101118] border border-[#1E202B] rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold font-display text-white border-b border-[#1C1E2A] pb-3">
              Ficha Técnica Destacada
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="bg-[#151620] p-3.5 rounded-2xl border border-[#222432]">
                <div className="flex items-center gap-2 text-[#C5A880] mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#828699]">Año</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.year}</div>
              </div>

              <div className="bg-[#151620] p-3.5 rounded-2xl border border-[#222432]">
                <div className="flex items-center gap-2 text-[#C5A880] mb-1">
                  <Gauge className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#828699]">Kilometraje</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.mileageFormatted}</div>
              </div>

              <div className="bg-[#151620] p-3.5 rounded-2xl border border-[#222432]">
                <div className="flex items-center gap-2 text-[#C5A880] mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#828699]">Potencia</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.power}</div>
              </div>

              <div className="bg-[#151620] p-3.5 rounded-2xl border border-[#222432]">
                <div className="flex items-center gap-2 text-[#C5A880] mb-1">
                  <Fuel className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#828699]">Combustible</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.fuel}</div>
              </div>

              <div className="bg-[#151620] p-3.5 rounded-2xl border border-[#222432]">
                <div className="flex items-center gap-2 text-[#C5A880] mb-1">
                  <Cog className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#828699]">Cambio</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.gearbox}</div>
              </div>

              <div className="bg-[#151620] p-3.5 rounded-2xl border border-[#222432]">
                <div className="flex items-center gap-2 text-[#C5A880] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#828699]">Tracción</span>
                </div>
                <div className="text-xs font-bold text-white truncate">{vehicle.traction}</div>
              </div>

              <div className="bg-[#151620] p-3.5 rounded-2xl border border-[#222432]">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#828699] mb-1">Color Ext.</div>
                <div className="text-xs font-bold text-white truncate">{vehicle.color}</div>
              </div>

              <div className="bg-[#151620] p-3.5 rounded-2xl border border-[#222432]">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#828699] mb-1">Puertas / Plazas</div>
                <div className="text-xs font-bold text-white">{vehicle.doors}p · {vehicle.seats} plazas</div>
              </div>

            </div>
          </div>

          {/* Equipment List */}
          {vehicle.equipment && (
            <div className="bg-[#101118] border border-[#1E202B] rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold font-display text-white border-b border-[#1C1E2A] pb-3">
                Equipamiento y Extras Destacados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {vehicle.equipment.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD0DF]">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-[#101118] border border-[#1E202B] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold font-display text-white border-b border-[#1C1E2A] pb-3">
              Descripción del Vehículo
            </h3>
            <p className="text-sm text-[#A0A4B4] leading-relaxed">
              {vehicle.description}
            </p>

            <div className="pt-4 border-t border-[#1C1E2A] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#CBD0DF]">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Kilometraje Certificado</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Libre de Cargas y Siniestros</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>Disponible en Gijón</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Action & Contact Card (4 Cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          
          <div className="bg-[#101118] border border-[#222432] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
            
            {/* Header / Brand */}
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880]">
                {vehicle.brand}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                {vehicle.model}
              </h1>
              <p className="text-xs text-[#828699] mt-1">
                {vehicle.version}
              </p>
            </div>

            {/* Price section */}
            <div className="py-4 border-y border-[#1E202B]">
              <div className="text-[11px] uppercase tracking-wider text-[#828699]">
                Precio al contado
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-white mt-0.5">
                {vehicle.priceFormatted}
              </div>
              <div className="text-[11px] text-[#A0A4B4] mt-1 flex items-center gap-1.5">
                <span>Financiación disponible desde</span>
                <span className="text-[#C5A880] font-semibold">{vehicle.monthlyPrice}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar por WhatsApp</span>
              </a>

              <button
                onClick={() => onOpenContactModal(vehicle)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#DFB76C] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A880]/20 hover:opacity-95 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4" />
                <span>Solicitar Información o Cita</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full py-3 px-4 rounded-xl bg-[#161722] hover:bg-[#1E202E] text-white border border-[#272938] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>Llamar: {COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Dealer info banner */}
            <div className="bg-[#151620] p-4 rounded-2xl border border-[#222431] space-y-2.5 text-xs text-[#8E92A4]">
              <div className="flex items-center gap-2 text-white font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Atención con cita previa. Revisión completa del coche y prueba dinámica para interesados cualificados.
              </p>
            </div>

          </div>

          {/* Trade-in banner */}
          <div className="bg-gradient-to-br from-[#14151E] to-[#0D0E13] border border-[#232534] rounded-3xl p-5 text-xs space-y-2">
            <div className="text-white font-bold flex items-center gap-1.5">
              <span className="text-[#C5A880]">¿Tienes un coche para entregar?</span>
            </div>
            <p className="text-[#8E92A4] text-[11px] leading-relaxed">
              Aceptamos tu vehículo actual como parte de pago. Tasación inmediata y sin compromiso.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
