import React from 'react';
import { VEHICLES, COMPANY_INFO } from '../data/vehicles';
import VehicleCard from '../components/VehicleCard';
import { ArrowRight, Instagram, ShieldCheck, Sparkles, Phone, MessageCircle, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';

export default function HomePage({ navigate, onSelectVehicle }) {
  const featuredVehicles = VEHICLES.filter((v) => v.featured);
  const remainingVehicles = VEHICLES.filter((v) => !v.featured);
  const heroCar = VEHICLES[0]; // Honda Civic Sport Plus real

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cars/honda_civic_real.jpg"
            alt="Audax Motors Honda Civic Sport Plus en Gijón"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/75 to-[#08080A]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080A] via-[#08080A]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-[#C5A880]/15 via-transparent to-transparent opacity-70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Top Brand Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12131C]/90 border border-[#C5A880]/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#EAD5B5]">
                AUDAX MOTORS · GIJÓN, ASTURIAS
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.08]">
                Encuentra tu <br />
                <span className="text-gold-gradient">próximo coche.</span>
              </h1>
              <p className="text-base sm:text-xl text-[#A0A4B4] max-w-xl font-normal leading-relaxed pt-2">
                Impulsados por la pasión. Compraventa y selección rigurosa de vehículos con historial verificado y transparencia absoluta en La Pedrera, Gijón.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigate('/vehiculos')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C5A880] via-[#DFC49F] to-[#C5A880] text-black font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#C5A880]/25 hover:shadow-[#C5A880]/45 hover:scale-105 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Ver Vehículos Disponibles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/vende-tu-coche')}
                className="px-8 py-4 rounded-2xl bg-[#141620]/80 hover:bg-[#1C1E2A] text-white border border-[#272A3B] hover:border-[#C5A880]/40 font-semibold text-sm tracking-wider uppercase transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <span>Vende tu Coche</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-10 grid grid-cols-3 gap-4 border-t border-white/10 max-w-xl">
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg sm:text-xl">100%</span>
                <span className="text-[11px] text-[#8A8E9F]">Revisión Técnica</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg sm:text-xl">Gijón</span>
                <span className="text-[11px] text-[#8A8E9F]">La Pedrera Nave 6</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#C5A880] font-bold text-lg sm:text-xl">Directo</span>
                <span className="text-[11px] text-[#8A8E9F]">Sin Intermediarios</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED STOCK SECTION (Bento / Editorial Composition) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              Catálogo Seleccionado
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Nuestro Stock Destacado
            </h2>
          </div>

          <button
            onClick={() => navigate('/vehiculos')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:text-[#E2CDAD] transition-colors"
          >
            <span>Ver catálogo completo ({VEHICLES.length} unidades)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Card (Large feature on the left: Honda Civic Real) */}
          {heroCar && (
            <div
              onClick={() => onSelectVehicle(heroCar)}
              className="lg:col-span-7 group relative bg-[#101117] rounded-3xl border border-[#1E202B] hover:border-[#C5A880]/50 overflow-hidden cursor-pointer flex flex-col justify-end min-h-[460px] sm:min-h-[530px] transition-all duration-300 hover:shadow-2xl hover:shadow-black"
            >
              <img
                src={heroCar.mainImage}
                alt={heroCar.model}
                className="absolute inset-0 w-full h-full object-cover img-zoom group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-[#090A0D]/60 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0C0D12]/90 backdrop-blur-md text-[#EAD5B5] border border-[#C5A880]/50 shadow-md">
                  ★ {heroCar.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-black/60 backdrop-blur-md border border-white/10">
                  {heroCar.power}
                </span>
              </div>

              {/* Content overlay */}
              <div className="relative z-10 p-6 sm:p-8 space-y-3">
                <div className="text-xs font-bold tracking-widest text-[#C5A880] uppercase">
                  {heroCar.brand}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white group-hover:text-[#E2CDAD] transition-colors">
                  {heroCar.model}
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A4B4] max-w-md line-clamp-2">
                  {heroCar.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#CBD0DF] pt-2">
                  <span>{heroCar.year}</span>
                  <span>•</span>
                  <span>{heroCar.mileageFormatted}</span>
                  <span>•</span>
                  <span>{heroCar.fuel}</span>
                  <span>•</span>
                  <span>{heroCar.gearbox}</span>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <div>
                    <div className="text-xs text-[#828699]">Precio al contado</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-white">
                      {heroCar.priceFormatted}
                    </div>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#DFB76C] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A880]/20 flex items-center gap-2 group-hover:scale-105 transition-all">
                    <span>Ver coche</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Mercedes Clase A & Mercedes CLA */}
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

        {/* Second Row: additional real cars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {remainingVehicles.slice(0, 3).map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/vehiculos')}
            className="px-10 py-4 rounded-2xl bg-[#13151D] hover:bg-[#1A1D28] text-white border border-[#262837] hover:border-[#C5A880]/50 font-bold text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-xl inline-flex items-center gap-3"
          >
            <span>Explorar todos los vehículos en venta</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>
      </section>

      {/* SELL YOUR CAR BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#12131A] via-[#161722] to-[#12131A] border border-[#232534] p-8 sm:p-12 overflow-hidden">
          
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden md:block">
            <img
              src="/cars/mercedes_cla_real.jpg"
              alt="Vende tu coche"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#12131A] to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-5">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
              ¿Tienes un coche para vender?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-tight">
              Compramos tu vehículo o gestionamos su venta al mejor valor.
            </h2>
            <p className="text-sm text-[#8E92A4] leading-relaxed">
              Tasación inmediata, transparente y sin compromiso en nuestras instalaciones de Gijón. Nos encargamos de todo el papeleo y transferencia para tu total tranquilidad.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#CBD0DF]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span>Tasación justa y rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span>Pago y cambio de nombre</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => navigate('/vende-tu-coche')}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#DFB76C] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A880]/20 hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                <span>Solicitar Tasación Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW SECTION WITH REAL TEAM/DELIVERY PHOTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Real delivery photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#232635] shadow-2xl">
              <img
                src="/cars/entrega_clientes_real.jpg"
                alt="Entrega de llaves con clientes en Audax Motors"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
                  Confianza & Cercanía
                </div>
                <div className="text-xl font-bold font-display text-white">
                  Entregas reales con clientes satisfechos
                </div>
                <div className="text-xs text-[#A0A4B4] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>La Pedrera Nave 6, Gijón (Asturias)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              Quiénes Somos
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-tight">
              Una forma diferente y transparente de entender la compraventa.
            </h2>

            <div className="space-y-4 text-sm text-[#8E92A4] leading-relaxed">
              <p>
                En <strong className="text-white">Audax Motors</strong> compartimos el mismo entusiasmo por el motor que nuestros clientes. Nacemos con el propósito de ofrecer un catálogo de vehículos cuidados, seleccionados con criterio profesional y con total honestidad sobre cada detalle del automóvil.
              </p>
              <p>
                Ubicados en <strong className="text-white">Camino de las Escuelas 8, La Pedrera (Gijón)</strong>, brindamos un trato cercano, personalizado y directo. Desde la primera consulta hasta la entrega de llaves, nuestro objetivo es que disfrutes con total seguridad de tu próximo coche.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/quienes-somos')}
                className="px-6 py-3 rounded-xl bg-[#161822] hover:bg-[#1E202D] text-white border border-[#272939] text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>Conocer más sobre nosotros</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="px-6 py-3 rounded-xl bg-transparent hover:bg-white/5 text-[#C5A880] border border-[#C5A880]/30 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* INSTAGRAM & COMMUNITY SECTION WITH REAL POSTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0E0F15] border border-[#1F212C] p-8 sm:p-10 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2 mb-1.5">
                <Instagram className="w-4 h-4" />
                <span>Comunidad Oficial</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Síguenos en Instagram {COMPANY_INFO.instagramHandle}
              </h2>
              <p className="text-xs sm:text-sm text-[#8E92A4] mt-1">
                Conoce antes que nadie las nuevas entradas de stock, vídeos en detalle y el día a día en Gijón.
              </p>
            </div>

            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#DFB76C] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A880]/20 hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Ver Perfil de Instagram</span>
            </a>
          </div>

          {/* Visual gallery with REAL Audax Instagram photos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { img: "/cars/honda_civic_real.jpg", title: "Honda Civic Sport Plus" },
              { img: "/cars/mercedes_clase_a_red_real.jpg", title: "Mercedes Clase A AMG" },
              { img: "/cars/mercedes_cla_real.jpg", title: "Mercedes CLA Coupé" },
              { img: "/cars/fundador_mercedes_real.jpg", title: "Entrega Audax Motors" }
            ].map((post, idx) => (
              <a
                key={idx}
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#15161F] border border-[#232533]"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                  <Instagram className="w-6 h-6 text-[#C5A880] mb-2" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">{post.title}</span>
                  <span className="text-[9px] text-[#A0A4B4] mt-1">{COMPANY_INFO.instagramHandle}</span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
