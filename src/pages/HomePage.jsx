import React from 'react';
import { VEHICLES, COMPANY_INFO } from '../data/vehicles';
import VehicleCard from '../components/VehicleCard';
import FinanceCalculator from '../components/FinanceCalculator';
import { ArrowRight, Instagram, ShieldCheck, Sparkles, Phone, MessageCircle, CheckCircle2, ChevronRight, MapPin, Award, Car, Clock } from 'lucide-react';

export default function HomePage({ navigate, onSelectVehicle }) {
  const featuredVehicles = VEHICLES.filter((v) => v.featured);
  const remainingVehicles = VEHICLES.filter((v) => !v.featured);
  const heroCar = VEHICLES[0]; // Honda Civic Sport Plus real

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION WITH REAL SHOWROOM PHOTO */}
      <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Image with Cinematic Luxury Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img/showroom_nanobana.jpg"
            alt="Concesionario Audax Motors en Gijón"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.75]"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/75 to-[#07080A]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080A] via-[#07080A]/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent opacity-80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6">
          <div className="max-w-3xl space-y-6">
            
            {/* Top Brand Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 border border-[#D4AF37]/40 backdrop-blur-md shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#F3E5C8]">
                INSTALACIONES OFICIALES · GIJÓN, ASTURIAS
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.08]">
                Tu concesionario de <br />
                <span className="text-gold-gradient">confianza y selección.</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-300 max-w-xl font-normal leading-relaxed pt-1">
                Impulsados por la pasión. Compraventa de vehículos seminuevos y de ocasión revisados en 150 puntos, con garantía europea y atención personalizada en La Pedrera, Gijón.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/vehiculos')}
                className="px-8 py-4 rounded-2xl bg-gold-gradient bg-gold-gradient-hover text-black font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Explorar Stock Disponible</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/vende-tu-coche')}
                className="px-8 py-4 rounded-2xl bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:border-[#D4AF37]/50 font-bold text-xs tracking-wider uppercase transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <span>Tasación Gratuita de tu Coche</span>
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/10 max-w-xl">
              <div className="flex flex-col">
                <span className="text-white font-black text-xl sm:text-2xl font-display">150 Puntos</span>
                <span className="text-[11px] text-gray-400">Revisión Certificada</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#D4AF37] font-black text-xl sm:text-2xl font-display">12 Meses</span>
                <span className="text-[11px] text-gray-400">Garantía Incluida</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xl sm:text-2xl font-display">100%</span>
                <span className="text-[11px] text-gray-400">Financiación a Medida</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SHOWROOM & FACILITIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-amber-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Showroom Visual */}
            <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/img/showroom_nanobana.jpg"
                alt="Exposición Audax Motors en Gijón"
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] bg-black/80 px-2.5 py-1 rounded-md">
                    Exposición Oficial Audax Motors
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    Nuestra Nave en La Pedrera (Gijón)
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Showroom Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Instalaciones de Exposición
                </span>
                <h2 className="text-3xl font-extrabold font-display text-white leading-tight">
                  Ven a conocer nuestras unidades en persona.
                </h2>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">
                Contamos con una amplia exposición donde podrás inspeccionar cada detalle de nuestros vehículos con total comodidad, transparencia e información detallada de su historial.
              </p>

              <div className="space-y-3 pt-2 text-xs text-gray-200">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                  <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Dirección Física:</strong>
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                  <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Horario de Atención:</strong>
                    <span>{COMPANY_INFO.schedule}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reservar Cita Previa</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/15 flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Llamar: {COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED STOCK SECTION (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              Catálogo Seleccionado Audax
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Nuestros Vehículos Destacados
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate('/vehiculos')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#F3E5C8] transition-colors"
          >
            <span>Ver catálogo completo ({VEHICLES.length} unidades)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Card (Honda Civic) */}
          {heroCar && (
            <div
              onClick={() => onSelectVehicle(heroCar)}
              className="lg:col-span-7 group relative bg-[#0F1017] rounded-3xl border border-white/10 hover:border-[#D4AF37]/50 overflow-hidden cursor-pointer flex flex-col justify-end min-h-[460px] sm:min-h-[520px] transition-all duration-300 card-hover-effect"
            >
              <img
                src={heroCar.mainImage}
                alt={heroCar.model}
                className="absolute inset-0 w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/60 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 shadow-lg">
                  ★ {heroCar.badge}
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-black/70 backdrop-blur-md border border-white/15">
                  {heroCar.power}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-6 sm:p-8 space-y-3">
                <div className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                  {heroCar.brand}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white group-hover:text-[#D4AF37] transition-colors">
                  {heroCar.model}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md line-clamp-2">
                  {heroCar.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 pt-2">
                  <span>Año {heroCar.year}</span>
                  <span>•</span>
                  <span>{heroCar.mileageFormatted}</span>
                  <span>•</span>
                  <span>{heroCar.fuel}</span>
                  <span>•</span>
                  <span>{heroCar.gearbox}</span>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <div>
                    <span className="text-[11px] text-gray-400 block">Precio al contado</span>
                    <span className="text-2xl sm:text-3xl font-black font-display text-white">
                      {heroCar.priceFormatted}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-6 py-3 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center gap-2 group-hover:scale-105 transition-all"
                  >
                    <span>Ver detalles</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Featured vehicles */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {featuredVehicles.slice(1, 3).map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
              />
            ))}
          </div>
        </div>

        {/* Second Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {remainingVehicles.slice(0, 3).map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>

      </section>

      {/* FINANCE CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FinanceCalculator initialPrice={24500} vehicleName="Mercedes-Benz CLA Coupé" />
      </section>

      {/* SELL YOUR CAR BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0F1118] via-[#151722] to-[#0F1118] border border-amber-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl">
          
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 hidden md:block">
            <img
              src="/cars/mercedes_cla_real.jpg"
              alt="Tasación Audax Motors"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1118] to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-5">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              ¿Quieres vender tu coche actual?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-tight">
              Compramos tu vehículo o gestionamos su venta con total garantía.
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Tasación profesional inmediata y transparente en Gijón. Gestionamos la transferencia completa para tu tranquilidad.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Tasación justa y rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Pago e inicio de cambio de nombre</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => navigate('/vende-tu-coche')}
                className="px-8 py-3.5 rounded-xl bg-gold-gradient bg-gold-gradient-hover text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                <span>Solicitar Tasación Inmediata</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY & INSTAGRAM FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 space-y-8 border border-white/10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] flex items-center gap-2 mb-1.5">
                <Instagram className="w-4 h-4" />
                <span>Comunidad Audax Motors</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Síguenos en Instagram {COMPANY_INFO.instagramHandle}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Entérate antes que nadie de los nuevos vehículos en stock, vídeos en detalle y entregas a clientes.
              </p>
            </div>

            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-center px-6 py-3 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Ver Perfil de Instagram</span>
            </a>
          </div>

          {/* Visual Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { img: "/img/showroom_nanobana.jpg", title: "Nuestra Exposición" },
              { img: "/cars/honda_civic_real.jpg", title: "Honda Civic Sport Plus" },
              { img: "/cars/mercedes_clase_a_red_real.jpg", title: "Mercedes Clase A AMG" },
              { img: "/cars/mercedes_cla_real.jpg", title: "Mercedes CLA Coupé" }
            ].map((post, idx) => (
              <a
                key={idx}
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden bg-black/60 border border-white/10"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                  <Instagram className="w-6 h-6 text-[#D4AF37] mb-2" />
                  <span className="text-[11px] font-extrabold text-white uppercase tracking-wider">{post.title}</span>
                  <span className="text-[9px] text-gray-400 mt-1">{COMPANY_INFO.instagramHandle}</span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

