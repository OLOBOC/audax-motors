import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/vehicles';
import FinanceCalculator from '../components/FinanceCalculator';
import { 
  ArrowLeft, MessageCircle, Phone, Mail, Calendar, Gauge, Fuel, Cog, 
  Zap, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Share2, 
  MapPin, FileCheck, Sparkles, AlertCircle
} from 'lucide-react';

export default function VehicleDetailPage({ vehicle, onBack, onOpenContactModal }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const isSold = vehicle?.isSold || vehicle?.status === 'Vendido';
  const isReserved = vehicle?.isReserved || vehicle?.status === 'Reservado';

  if (!vehicle) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white font-display">Vehículo no encontrado</h2>
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider"
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

  const whatsappLink = `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(
    `Hola Audax Motors! Me gustaría recibir más información o concertar una cita para ver el ${vehicle.brand} ${vehicle.model} (${vehicle.priceFormatted}).`
  )}`;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Bar: Back & Share */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? '¡Enlace copiado!' : 'Compartir vehículo'}</span>
        </button>
      </div>

      {/* Main Layout: Left Gallery + Right Sticky Action Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Gallery & Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Gallery Main Container */}
          <div className="space-y-4">
            <div className="relative aspect-[16/10] bg-[#0A0B0E] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={galleryImages[selectedImageIndex]}
                alt={`${vehicle.brand} ${vehicle.model} - foto ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/15 shadow-xl"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/15 shadow-xl"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Bottom Image Counter */}
              <div className="absolute bottom-4 right-4 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs text-white font-mono font-bold">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>

              {/* Vehicle Badge */}
              {vehicle.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 shadow-lg">
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
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#D4AF37] scale-95 shadow-lg shadow-amber-500/20'
                        : 'border-white/10 opacity-60 hover:opacity-100'
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
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10">
            <h3 className="text-xl font-bold font-display text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Ficha Técnica Oficial
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Año</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.year}</div>
              </div>

              <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                  <Gauge className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Kilometraje</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.mileageFormatted}</div>
              </div>

              <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Potencia</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.power}</div>
              </div>

              <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                  <Fuel className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Combustible</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.fuel}</div>
              </div>

              <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                  <Cog className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Cambio</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.gearbox}</div>
              </div>

              <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Tracción</span>
                </div>
                <div className="text-xs font-bold text-white truncate">{vehicle.traction}</div>
              </div>

              <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Color Ext.</div>
                <div className="text-xs font-bold text-white truncate">{vehicle.color}</div>
              </div>

              <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Puertas / Plazas</div>
                <div className="text-xs font-bold text-white">{vehicle.doors}p · {vehicle.seats} plazas</div>
              </div>

            </div>
          </div>

          {/* Embedded Finance Calculator */}
          <FinanceCalculator initialPrice={vehicle.price} vehicleName={`${vehicle.brand} ${vehicle.model}`} />

          {/* Equipment List */}
          {vehicle.equipment && (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-white/10">
              <h3 className="text-xl font-bold font-display text-white border-b border-white/10 pb-3">
                Equipamiento y Extras Destacados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {vehicle.equipment.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-white/10">
            <h3 className="text-xl font-bold font-display text-white border-b border-white/10 pb-3">
              Descripción del Vehículo
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {vehicle.description}
            </p>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Historial Verificado</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Revisado en Taller Propio</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Exposición en Gijón</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Action & Contact Card (4 Cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 border border-amber-500/20">
            
            {/* Header / Brand */}
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {vehicle.brand}
                </span>
                {isSold ? (
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-red-600 text-white">
                    Vendido
                  </span>
                ) : isReserved ? (
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-black">
                    Reservado
                  </span>
                ) : null}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                {vehicle.model}
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                {vehicle.version}
              </p>
            </div>

            {/* Status Warning Banner if Sold or Reserved */}
            {isReserved && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="block text-white font-bold">Vehículo Actualmente Reservado</strong>
                  <span className="text-[11px] leading-relaxed text-amber-200/80">
                    Esta unidad cuenta con una reserva activa. Si te interesa, puedes ponerte en contacto con nosotros para entrar en lista preferente por si la operación no llega a concretarse.
                  </span>
                </div>
              </div>
            )}

            {isSold && (
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="block text-white font-bold">Unidad Vendida</strong>
                  <span className="text-[11px] leading-relaxed text-red-200/80">
                    Este automóvil ya ha sido entregado a su nuevo propietario. Puedes pedirnos que busquemos una unidad similar para ti en nuestro taller propio.
                  </span>
                </div>
              </div>
            )}

            {/* Price section */}
            <div className="py-4 border-y border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 block">
                {isSold ? 'Precio de venta' : 'Precio al contado'}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-display text-white mt-0.5">
                {vehicle.priceFormatted}
              </div>
              {vehicle.monthlyPrice && !isSold && (
                <div className="text-xs text-gray-300 mt-2 flex items-center gap-1.5">
                  <span>Financiación orientativa desde</span>
                  <span className="text-[#D4AF37] font-bold">{vehicle.monthlyPrice}</span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isSold ? 'Consultar similares por WhatsApp' : isReserved ? 'Consultar lista de espera por WhatsApp' : 'Consultar por WhatsApp'}</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenContactModal(vehicle)}
                className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] ${
                  isSold
                    ? 'bg-white/10 text-white hover:bg-white/15'
                    : 'bg-gold-gradient bg-gold-gradient-hover text-black shadow-amber-500/20'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>{isSold ? 'Solicitar Coche a la Carta' : isReserved ? 'Avisarme si se libera' : 'Reservar Cita Previa'}</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Llamar: {COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Dealer info banner */}
            <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2 text-white font-semibold">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-400">
                Atención personalizada con cita previa en Nave 6, La Pedrera. Entrega nacional disponible.
              </p>
            </div>

          </div>

          {/* Trade-in banner */}
          <div className="glass-panel border border-white/10 rounded-3xl p-5 text-xs space-y-2">
            <div className="text-white font-bold flex items-center gap-1.5">
              <span className="text-[#D4AF37]">¿Entregas tu coche a cambio?</span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Tasamos tu vehículo actual como parte de pago con valoración máxima garantizada.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

