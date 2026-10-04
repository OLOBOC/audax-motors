import React from "react";
import { COMPANY } from "../data/config";
import { Heart, Eye, ShieldCheck, MapPin, CheckCircle2, MessageCircle } from "lucide-react";

export default function AboutSection() {
  const values = [
    { icon: Heart, title: "Pasion por el Automovil", desc: "No tratamos los coches como simples numeros. Nos apasiona la mecanica y cuidar cada unidad hasta el ultimo detalle." },
    { icon: Eye, title: "Transparencia Total", desc: "Informamos con total claridad del estado real: historial de revisiones, kilometraje certificado, ITV y estado mecanico." },
    { icon: ShieldCheck, title: "Trato Directo y Cercano", desc: "Atencion personalizada de tu a tu en Gijon. Sin presiones comerciales ni intermediarios que encarezcan la operacion." },
  ];

  return (
    <section id="nosotros" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A880]" />Quienes Somos
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white leading-tight">
          Impulsados por la pasion. <br /><span className="text-gold-gradient">Criterio y cercania en Gijon.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#A0A4B4] leading-relaxed pt-2">
          En Audax Motors nos dedicamos a la compraventa y seleccion de automoviles con una premisa clara: honestidad tecnica, transparencia en cada detalle y trato directo de tu a tu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#0F1017] border border-[#222432] shadow-2xl group">
          <img src="/img/showroom_nanobana.jpg" alt="Exposicion Audax Motors" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#C5A880]">Nuestras Instalaciones</div>
            <div className="text-xl font-bold font-display text-white mt-1">Exposicion en La Pedrera, Gijon</div>
            <div className="text-xs text-[#A0A4B4] mt-0.5">{COMPANY.address}</div>
          </div>
        </div>
        <div className="bg-[#0E0F16] border border-[#1E202B] rounded-3xl p-8 space-y-6">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />El fundador
          </div>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C5A880]/30 to-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] font-black text-2xl font-display flex-shrink-0">CR</div>
              <div>
                <div className="text-white font-bold text-lg font-display">Christian Rey</div>
                <div className="text-[11px] text-[#C5A880] font-semibold">Fundador de Audax Motors</div>
              </div>
            </div>
            <p className="text-sm text-[#A0A4B4] leading-relaxed">Con mas de 5 anos de experiencia en el sector automotriz en Asturias. Cada vehiculo pasa por una exhaustiva revision tecnica en taller propio antes de su venta.</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Trato directo", desc: "Sin intermediarios ni comerciales. Hablas con Christian, punto." },
              { label: "Taller propio", desc: "Pruebas mecanicas reales. Sabe lo que vale tu coche." },
              { label: "Su palabra es su reputacion", desc: "Si cerramos el trato, el pago es inmediato." },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-xs block">{item.label}</strong>
                  <span className="text-[11px] text-[#8E92A4]">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30 transition-colors">
            <MessageCircle className="w-4 h-4" /><span>Hablar con Christian</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <div key={v.title} className="bg-[#101118] border border-[#1E202B] rounded-3xl p-7 space-y-4 card-hover-effect">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">{v.title}</h3>
              <p className="text-xs sm:text-sm text-[#8E92A4] leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
