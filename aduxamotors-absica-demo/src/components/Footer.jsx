import React from "react";
import AudaxLogo from "./AudaxLogo";
import { COMPANY } from "../data/config";
import { Instagram, Phone, MapPin, Clock, Mail, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#07080A] border-t border-white/10 text-gray-400 relative overflow-hidden">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <AudaxLogo showSlogan={true} />
            <p className="text-xs text-gray-400 leading-relaxed pt-2">{COMPANY.description}</p>
            <div className="pt-2">
              <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white hover:text-[#D4AF37] transition-all">
                <Instagram className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold">{COMPANY.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />Navegacion
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[["inicio","Inicio"],["nosotros","Quienes Somos"],["servicios","Servicios"],["vende","Vende tu Coche"],["galeria","Galeria"],["contacto","Contacto"]].map(([id,label]) => (
                <li key={id}>
                  <button type="button" onClick={() => onNavigate(id)} className="hover:text-[#D4AF37] hover:translate-x-1 transition-all">{label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />Atencion Directa
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 text-[11px] block">Telefono y WhatsApp:</span>
                  <a href={`tel:${COMPANY.phoneRaw}`} className="text-white hover:text-[#D4AF37] font-semibold text-sm transition-colors">{COMPANY.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 text-[11px] block">Email:</span>
                  <a href={`mailto:${COMPANY.email}`} className="text-white hover:text-[#D4AF37] transition-colors">{COMPANY.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 text-[11px] block">Ubicacion:</span>
                  <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] transition-colors font-medium block">{COMPANY.address}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 text-[11px] block">Horario:</span>
                  <span className="text-white">{COMPANY.schedule}</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="glass-panel-gold p-5 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /><span>Tasacion Gratuita</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">Compramos tu coche directamente o gestionamos su venta. Oferta real en menos de 24h.</p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Quieres vender tu coche?</span>
              <button type="button" onClick={() => onNavigate("vende")} className="text-[#D4AF37] hover:underline font-extrabold">Tasar ahora</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>c {year} Audax Motors. Todos los derechos reservados.</div>
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] flex-wrap">
            <span>Gijon · Asturias</span>
            <span>•</span>
            <span className="text-[#D4AF37]">Impulsados por la pasion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
