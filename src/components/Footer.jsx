import React from 'react';
import AudaxLogo from './AudaxLogo';
import { COMPANY_INFO } from '../data/vehicles';
import { Instagram, Phone, MapPin, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer({ navigate }) {
  return (
    <footer className="bg-[#07080A] border-t border-white/10 text-gray-400 relative overflow-hidden">
      {/* Top Gold Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <AudaxLogo showSlogan={true} />
            <p className="text-xs text-gray-400 leading-relaxed pt-2">
              Especialistas en compraventa y gestión integral de vehículos seleccionados en Gijón, Asturias. Pasión automovilística, transparencia y rigor en cada operación.
            </p>
            <div className="pt-2">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white hover:text-[#D4AF37] transition-all"
              >
                <Instagram className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold">{COMPANY_INFO.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/vehiculos')}
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all"
                >
                  Stock de Vehículos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/vende-tu-coche')}
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all"
                >
                  Vende tu Coche (Tasación Gratuita)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/quienes-somos')}
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all"
                >
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contacto')}
                  className="hover:text-[#D4AF37] hover:translate-x-1 transition-all"
                >
                  Contacto y Localización
                </button>
              </li>
            </ul>
          </div>

          {/* Direct contact info */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Atención Directa
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 text-[11px] block">Teléfono y WhatsApp:</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-white hover:text-[#D4AF37] font-semibold text-sm transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 text-[11px] block">Ubicación:</span>
                  <span className="text-white font-medium">{COMPANY_INFO.address}</span>
                  <span className="text-[11px] text-gray-400 block">Atención con cita previa</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 text-[11px] block">Horario comercial:</span>
                  <span className="text-white">L-V: 09:30 a 20:00</span>
                  <span className="text-[11px] text-gray-400 block">Sábados con cita concertada</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Commitment box */}
          <div className="glass-panel-gold p-5 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Revisión y Papeleo Incluido</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Compramos tu coche directamente o gestionamos su venta. Trato directo con Christian, sin intermediarios.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">¿Quieres vender tu coche?</span>
              <button
                type="button"
                onClick={() => navigate('/vende-tu-coche')}
                className="text-[#D4AF37] hover:underline font-extrabold"
              >
                Tasar ahora →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Audax Motors. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Gijón · Asturias</span>
            <span>•</span>
            <span className="text-[#D4AF37]">Impulsados por la pasión</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
