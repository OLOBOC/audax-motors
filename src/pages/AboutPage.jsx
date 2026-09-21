import React from 'react';
import { COMPANY_INFO } from '../data/vehicles';
import { ShieldCheck, Heart, Eye, MapPin, Instagram, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage({ navigate }) {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
          Quiénes Somos
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-tight">
          Impulsados por la pasión. <br />
          <span className="text-gold-gradient">Criterio y cercanía en Gijón.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#A0A4B4] leading-relaxed pt-2">
          En Audax Motors nos dedicamos a la compraventa y selección de automóviles con una premisa clara: honestidad técnica, transparencia en cada detalle y trato directo de tú a tú.
        </p>
      </div>

      {/* Main Photographic Feature with Real Founder & Delivery Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Photo 1: Client delivery */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#0F1017] border border-[#222432] shadow-2xl group">
          <img
            src="/cars/entrega_clientes_real.jpg"
            alt="Audax Motors entrega de vehículos con clientes"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#C5A880]">
              Entregas Reales
            </div>
            <div className="text-xl font-bold font-display text-white mt-1">
              Confianza de nuestros clientes
            </div>
            <div className="text-xs text-[#A0A4B4] mt-0.5">
              Experiencias de compraventa transparentes y satisfactorias.
            </div>
          </div>
        </div>

        {/* Photo 2: Founder with Mercedes CLA */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#0F1017] border border-[#222432] shadow-2xl group">
          <img
            src="/cars/fundador_mercedes_real.jpg"
            alt="Audax Motors equipo y presentación"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#C5A880]">
              Compromiso & Pasión
            </div>
            <div className="text-xl font-bold font-display text-white mt-1">
              Atención personalizada en cada coche
            </div>
            <div className="text-xs text-[#A0A4B4] mt-0.5">
              {COMPANY_INFO.address}
            </div>
          </div>
        </div>

      </div>

      {/* Values & Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#101118] border border-[#1E202B] rounded-3xl p-7 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Pasión por el Automóvil
          </h3>
          <p className="text-xs sm:text-sm text-[#8E92A4] leading-relaxed">
            No tratamos los coches como simples números de catálogo. Nos apasiona la mecánica, las sensaciones al volante y cuidar cada unidad hasta el último detalle.
          </p>
        </div>

        <div className="bg-[#101118] border border-[#1E202B] rounded-3xl p-7 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Transparencia Documental
          </h3>
          <p className="text-xs sm:text-sm text-[#8E92A4] leading-relaxed">
            Informamos con total claridad del estado real de cada vehículo: historial de revisiones, kilometraje certificado, ITV y estado de neumáticos y frenos.
          </p>
        </div>

        <div className="bg-[#101118] border border-[#1E202B] rounded-3xl p-7 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Trato Directo y Cercano
          </h3>
          <p className="text-xs sm:text-sm text-[#8E92A4] leading-relaxed">
            Atención personalizada de tú a tú en nuestras instalaciones de Gijón. Sin presiones comerciales ni intermediarios que encarezcan la operación.
          </p>
        </div>

      </div>

      {/* Location / Local connection */}
      <div className="bg-[#0E0F16] border border-[#232534] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Nuestras Instalaciones</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Visítanos en La Pedrera, Gijón.
          </h2>
          <p className="text-xs sm:text-sm text-[#8E92A4] leading-relaxed">
            {COMPANY_INFO.addressDetail}. Concertamos cita previa para dedicarte todo el tiempo que necesitas para examinar y probar el vehículo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => navigate('/contacto')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#DFB76C] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A880]/20 hover:scale-105 transition-all text-center"
          >
            Contactar o Pedir Cita
          </button>
          <button
            onClick={() => navigate('/vehiculos')}
            className="px-6 py-3.5 rounded-xl bg-[#161722] hover:bg-[#1F212D] text-white border border-[#272A3B] text-xs font-semibold uppercase tracking-wider transition-colors text-center"
          >
            Ver Stock
          </button>
        </div>
      </div>

    </div>
  );
}
