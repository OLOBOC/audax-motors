import React, { useState } from "react";
import { COMPANY, TESTIMONIALS } from "../data/config";
import {
  Phone, MessageCircle, Mail, MapPin, Clock,
  Instagram, Send, CheckCircle, ShieldCheck, ArrowUpRight, Star
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "Consulta general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880] transition-colors";
  const labelClass = "block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1";

  return (
    <section id="contacto" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      {/* Testimonios */}
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Experiencias Reales
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">Opiniones de quienes ya confian en Audax</h2>
          </div>
          <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#10121A] border border-[#D4AF37]/30 shadow-xl self-start md:self-auto">
            <div className="text-3xl font-black font-display text-[#D4AF37]">4.9</div>
            <div>
              <div className="flex items-center gap-1 text-[#D4AF37]">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-[#D4AF37]" />))}</div>
              <span className="text-[11px] text-gray-400 font-medium block mt-0.5">Google Reviews</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <div key={idx} className="relative p-6 sm:p-7 rounded-3xl bg-[#0F1118] border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D4AF37]">{[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-[#D4AF37]" />))}</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">{review.tag}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed italic">"{review.comment}"</p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{review.name} <span className="text-xs text-gray-400 font-normal">({review.location})</span></h4>
                </div>
                <span className="text-[10px] text-gray-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacto */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />Canales Oficiales
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">Contacto y Ubicacion</h2>
          <p className="text-sm text-[#8E92A4]">Estamos a tu disposicion para cualquier consulta o para concertar cita previa en nuestras instalaciones de Gijon.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp */}
            <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-[#101319] to-[#0D0F15] border border-emerald-500/30 hover:border-emerald-500/60 transition-all shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><MessageCircle className="w-6 h-6" /></div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 inline-flex items-center gap-1"><span>Abrir chat</span><ArrowUpRight className="w-3.5 h-3.5" /></span>
              </div>
              <div className="mt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">Atencion Inmediata WhatsApp</div>
                <div className="text-lg font-bold font-display text-white mt-0.5">{COMPANY.phone}</div>
                <p className="text-xs text-[#8E92A4] mt-1">La via mas agil para consultas, fotos o pedir tasacion de tu vehiculo.</p>
              </div>
            </a>
            {/* Telefono */}
            <div className="p-6 rounded-3xl bg-[#101118] border border-[#1E202B] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center"><Phone className="w-5 h-5" /></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">Llamada Telefonica</div>
                <a href={`tel:${COMPANY.phoneRaw}`} className="text-lg font-bold font-display text-white hover:text-[#C5A880] transition-colors">{COMPANY.phone}</a>
                <div className="text-xs text-[#8E92A4] mt-0.5">Atencion comercial directa</div>
              </div>
            </div>
            {/* Ubicacion + horario */}
            <div className="p-6 rounded-3xl bg-[#101118] border border-[#1E202B] space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5" /></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">Ubicacion Exacta</div>
                  <div className="text-sm font-bold text-white mt-0.5">{COMPANY.address}</div>
                  <div className="text-xs text-[#8E92A4] mt-1">Atencion personalizada con cita previa</div>
                </div>
              </div>
              <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-xl bg-[#C5A880]/15 hover:bg-[#C5A880]/25 border border-[#C5A880]/30 text-[#C5A880] hover:text-white transition-all text-xs font-bold inline-flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /><span>Abrir en Google Maps</span><ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <div className="pt-3 border-t border-[#1C1E2A] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5" /></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">Horario de Atencion</div>
                  <div className="text-xs font-semibold text-white">{COMPANY.schedule}</div>
                </div>
              </div>
            </div>
            {/* Redes */}
            <div className="p-6 rounded-3xl bg-[#101118] border border-[#1E202B] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center"><Instagram className="w-5 h-5" /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">Instagram Oficial</div>
                    <div className="text-xs font-bold text-white">{COMPANY.instagramHandle}</div>
                  </div>
                </div>
                <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#C5A880] hover:underline inline-flex items-center gap-1">
                  <span>Visitar</span><ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="pt-3 border-t border-[#1C1E2A] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">Email</div>
                  <a href={`mailto:${COMPANY.email}`} className="text-xs font-semibold text-white hover:text-[#C5A880] transition-colors">{COMPANY.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#101118] border border-[#1E202B] rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto"><CheckCircle className="w-8 h-8" /></div>
                <h3 className="text-2xl font-bold font-display text-white">Mensaje Enviado con Exito!</h3>
                <p className="text-xs sm:text-sm text-[#8E92A4] max-w-md mx-auto leading-relaxed">Gracias por ponerte en contacto. Nos pondremos en contacto contigo a la mayor brevedad.</p>
                <div className="pt-4">
                  <button onClick={() => setSubmitted(false)} className="px-6 py-2.5 rounded-xl bg-[#1A1C28] hover:bg-[#242636] text-white text-xs font-semibold tracking-wider transition-colors">Enviar otro mensaje</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#1C1E2A] pb-3 mb-4">
                  <h3 className="text-lg font-bold font-display text-white">Envianos tu Consulta</h3>
                  <p className="text-xs text-[#8E92A4] mt-0.5">Rellena este formulario y nos pondremos en contacto contigo.</p>
                </div>
                <div><label className={labelClass}>Nombre completo *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Tu nombre y apellidos" className={inputClass} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Telefono *</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="600 000 000" className={inputClass} /></div>
                  <div><label className={labelClass}>Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="ejemplo@email.com" className={inputClass} /></div>
                </div>
                <div>
                  <label className={labelClass}>Motivo de la consulta</label>
                  <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={inputClass}>
                    <option>Consulta general</option>
                    <option>Tasar o vender mi vehiculo</option>
                    <option>Concertar cita en Gijon</option>
                    <option>Otra consulta</option>
                  </select>
                </div>
                <div><label className={labelClass}>Mensaje *</label><textarea rows="4" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="En que te podemos ayudar?" className={`${inputClass} resize-none`} /></div>
                <div className="pt-2">
                  <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D8BC94] to-[#C5A880] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A880]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
                    <Send className="w-3.5 h-3.5" /><span>Enviar Consulta</span>
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] text-[#6B6F80] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /><span>Tus datos son tratados de forma confidencial y directa.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mapa embed */}
      <div className="rounded-3xl overflow-hidden border border-[#1E202B] shadow-2xl">
        <div className="bg-[#0E0F16] px-6 py-4 flex items-center justify-between border-b border-[#1E202B]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C5A880]" />
            <span className="text-sm font-bold text-white">{COMPANY.addressShort}</span>
          </div>
          <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#C5A880] hover:underline inline-flex items-center gap-1">
            <span>Como llegar</span><ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206.32!2d-5.6930552!3d43.4923465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd36635193e5f735%3A0x5670ced443439b69!2sNaves%20Gij%C3%B3n!5e0!3m2!1ses!2ses!4v1699000000000!5m2!1ses!2ses"
          width="100%"
          height="360"
          style={{ border: 0, display: "block" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicacion Audax Motors en Gijon"
        />
      </div>
    </section>
  );
}
