import React from 'react';
import AudaxLogo from './AudaxLogo';
import { COMPANY_INFO } from '../data/vehicles';
import { Instagram, Phone, MapPin, Clock, Mail, ArrowUpRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Footer({ navigate }) {
  return (
    <footer className="bg-[#0A0B0E] border-t border-[#1C1E26] text-[#A0A4B4] relative overflow-hidden">
      {/* Subtle top gold accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <AudaxLogo showSlogan={true} />
            <p className="text-xs text-[#828699] leading-relaxed pt-2">
              Especialistas en compraventa y gestión integral de vehículos seleccionados en Gijón, Asturias. Pasión automovilística, transparencia y rigor en cada operación.
            </p>
            <div className="pt-2">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#14161F] hover:bg-[#1A1C28] border border-[#232634] text-xs text-white hover:text-[#C5A880] transition-all"
              >
                <Instagram className="w-4 h-4 text-[#C5A880]" />
                <span className="font-semibold">{COMPANY_INFO.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#6D7184]" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-[#E2CDAD] hover:translate-x-1 transition-transform"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/vehiculos')}
                  className="hover:text-[#E2CDAD] hover:translate-x-1 transition-transform"
                >
                  Stock de Vehículos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/vende-tu-coche')}
                  className="hover:text-[#E2CDAD] hover:translate-x-1 transition-transform"
                >
                  Vende tu Coche (Tasación Gratuita)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/quienes-somos')}
                  className="hover:text-[#E2CDAD] hover:translate-x-1 transition-transform"
                >
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contacto')}
                  className="hover:text-[#E2CDAD] hover:translate-x-1 transition-transform"
                >
                  Contacto y Localización
                </button>
              </li>
            </ul>
          </div>

          {/* Direct contact info */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              Atención Directa
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#6D7184] text-[11px]">Teléfono y WhatsApp:</div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-white hover:text-[#C5A880] font-semibold text-sm transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#6D7184] text-[11px]">Ubicación:</div>
                  <span className="text-white font-medium">{COMPANY_INFO.address}</span>
                  <div className="text-[11px] text-[#828699]">Atención con cita previa</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#6D7184] text-[11px]">Horario comercial:</div>
                  <span className="text-white">L-V: 09:30 a 20:00</span>
                  <div className="text-[11px] text-[#828699]">Sábados con cita concertada</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Commitment box */}
          <div className="bg-[#12131A] p-5 rounded-2xl border border-[#20222D] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#C5A880] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Garantía & Confianza</span>
              </div>
              <p className="text-xs text-[#8E92A4] leading-relaxed">
                Cada automóvil pasa por un riguroso control mecánico y estético. Sin intermediarios opacos, con máxima claridad en todo el proceso.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#1C1E26] flex items-center justify-between text-[11px]">
              <span className="text-[#8E92A4]">¿Quieres vender tu coche?</span>
              <button
                onClick={() => navigate('/vende-tu-coche')}
                className="text-[#C5A880] hover:underline font-bold"
              >
                Tasar ahora →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#181A22] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6F80]">
          <div>
            © {new Date().getFullYear()} Audax Motors. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Gijón · Asturias</span>
            <span>•</span>
            <span className="text-[#C5A880]">Impulsados por la pasión</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
