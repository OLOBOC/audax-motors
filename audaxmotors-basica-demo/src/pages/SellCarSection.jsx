import React, { useState } from "react";
import { COMPANY } from "../data/config";
import {
  Car, CheckCircle, UploadCloud, Clock, ArrowRight,
  MessageCircle, Phone, FileText, MapPin, Banknote,
  Sparkles, UserCheck, Wrench, ShieldCheck
} from "lucide-react";

const TRUST_ITEMS = [
  { icon: Clock, title: "Respuesta en menos de 24h", desc: "Sin esperas. Cuéntanos tu coche y te hacemos una oferta hoy mismo." },
  { icon: Banknote, title: "Pago inmediato", desc: "Cobras al cerrar el trato. Transferencia o efectivo en el momento." },
  { icon: FileText, title: "Papeleo incluido", desc: "Nos encargamos del cambio de titularidad en la DGT. Tu no haces nada." },
  { icon: MapPin, title: "Toda Asturias", desc: "Nos desplazamos a verlo donde estes. No tienes que mover el coche." },
];

export default function SellCarSection() {
  const [formData, setFormData] = useState({
    brand: "", model: "", year: "", mileage: "",
    fuel: "Gasolina", gearbox: "Manual", condition: "Bueno",
    desiredPrice: "", name: "", phone: "", email: "", comments: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) setUploadedFiles(Array.from(e.target.files).map((f) => f.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: document.getElementById("vende").offsetTop - 80, behavior: "smooth" });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ brand: "", model: "", year: "", mileage: "", fuel: "Gasolina", gearbox: "Manual", condition: "Bueno", desiredPrice: "", name: "", phone: "", email: "", comments: "" });
    setUploadedFiles([]);
  };

  const whatsappMsg = `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(`Hola Audax Motors! He enviado una solicitud de tasacion para mi ${formData.brand} ${formData.model} (${formData.year}, ${formData.mileage} km). Mi nombre es ${formData.name}.`)}`;

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880] transition-colors";
  const labelClass = "block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1";

  return (
    <section id="vende" className="py-0 space-y-0">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-[#07080A] border-b border-[#181A24]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080A]/60 via-[#07080A]/80 to-[#07080A]" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(197,168,128,0.06) 0%, transparent 60%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#C5A880]">Tasacion Gratuita · Toda Asturias</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-white leading-[1.05]">
              Quieres vender tu coche?{" "}
              <span className="text-gold-gradient">Te hacemos una oferta en 24h.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#A0A4B4] leading-relaxed">
              Sin esperas y sin desconocidos en casa. <strong className="text-white">Compramos tu coche directamente</strong> con oferta en 24h, o nos encargamos de venderlo por ti. Tu eliges.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Oferta en menos de 24h", "Pago inmediato", "Papeleo incluido", "Nos desplazamos"].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-[#101118] border border-[#262837] text-[11px] font-semibold text-[#C5A880]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-[#08090C] border-b border-[#181A24] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">Asi de facil</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">Vende tu coche sin complicaciones</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Cuentanos tu coche", desc: "Rellena el formulario o mandanos fotos por WhatsApp. Marca, modelo, ano, kilometros y estado general." },
              { step: "02", title: "Recibe tu oferta hoy", desc: "En menos de 24h te contactamos con una oferta real y directa. Sin rodeos ni falsas promesas." },
              { step: "03", title: "Cobras y listo", desc: "Cerramos el trato, gestionamos el papeleo completo y cobras al momento. Sin esperas." },
            ].map((s) => (
              <div key={s.step} className="relative bg-[#0E0F16] border border-[#1E202B] rounded-3xl p-7 space-y-3 hover:border-[#C5A880]/40 transition-colors">
                <div className="text-5xl font-black text-[#C5A880]/15 font-display leading-none select-none">{s.step}</div>
                <h4 className="text-base font-bold text-white">{s.title}</h4>
                <p className="text-xs text-[#8E92A4] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form + Sidebar */}
      <div className="bg-[#07080A] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="max-w-2xl mx-auto bg-[#0E0F16] border border-[#262837] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">Solicitud Registrada</div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Gracias, {formData.name}!</h3>
                <p className="text-sm text-[#8E92A4] max-w-md mx-auto leading-relaxed">
                  Hemos recibido los detalles de tu <strong className="text-white">{formData.brand} {formData.model} ({formData.year})</strong>. Christian te contactara en menos de 24 horas.
                </p>
              </div>
              <div className="bg-[#141620] border border-[#222432] rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="text-[#8E92A4] font-semibold text-[11px] uppercase tracking-wider mb-2">Resumen de tu solicitud:</div>
                <div className="grid grid-cols-2 gap-2 text-[#CBD0DF]">
                  <div>Vehiculo: <span className="text-white font-medium">{formData.brand} {formData.model}</span></div>
                  <div>Ano: <span className="text-white font-medium">{formData.year}</span></div>
                  <div>Kilometros: <span className="text-white font-medium">{formData.mileage} km</span></div>
                  <div>Combustible: <span className="text-white font-medium">{formData.fuel}</span></div>
                </div>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={whatsappMsg} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /><span>Acelerar por WhatsApp</span>
                </a>
                <button onClick={resetForm} className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1A1C28] hover:bg-[#252838] text-white border border-[#282B3B] text-xs font-semibold tracking-wider transition-colors">
                  Enviar otro vehiculo
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* FORM */}
              <div className="lg:col-span-7 bg-[#0E0F16] border border-[#1E202B] rounded-3xl p-6 sm:p-10 shadow-2xl">
                <div className="mb-7">
                  <h3 className="text-xl font-extrabold font-display text-white">Solicitar tasacion gratuita</h3>
                  <p className="text-xs text-[#8E92A4] mt-1">Rellena los datos y te contactamos hoy mismo con una oferta.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Datos del vehiculo */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider border-b border-[#1C1E2A] pb-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-xs flex items-center justify-center font-bold">1</span>
                      <span>Datos de tu Vehiculo</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Marca *</label><input type="text" required value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} placeholder="Ej. BMW, Audi..." className={inputClass} /></div>
                      <div><label className={labelClass}>Modelo *</label><input type="text" required value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} placeholder="Ej. Serie 3, A4..." className={inputClass} /></div>
                      <div><label className={labelClass}>Ano *</label><input type="number" required min="1990" max="2026" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="Ej. 2019" className={inputClass} /></div>
                      <div><label className={labelClass}>Kilometros *</label><input type="number" required value={formData.mileage} onChange={(e) => setFormData({ ...formData, mileage: e.target.value })} placeholder="Ej. 85000" className={inputClass} /></div>
                      <div>
                        <label className={labelClass}>Combustible *</label>
                        <select value={formData.fuel} onChange={(e) => setFormData({ ...formData, fuel: e.target.value })} className={inputClass}>
                          <option>Gasolina</option><option>Diesel</option><option>Hibrido</option><option>Electrico</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Cambio *</label>
                        <select value={formData.gearbox} onChange={(e) => setFormData({ ...formData, gearbox: e.target.value })} className={inputClass}>
                          <option>Manual</option><option>Automatico</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Estado del vehiculo</label>
                        <select value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })} className={inputClass}>
                          <option>Excelente</option><option>Bueno</option><option>Regular</option><option>Para reparar</option>
                        </select>
                      </div>
                      <div><label className={labelClass}>Precio orientativo deseado</label><input type="text" value={formData.desiredPrice} onChange={(e) => setFormData({ ...formData, desiredPrice: e.target.value })} placeholder="Ej. 8000 €" className={inputClass} /></div>
                    </div>
                  </div>

                  {/* Fotos */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider border-b border-[#1C1E2A] pb-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-xs flex items-center justify-center font-bold">2</span>
                      <span>Fotos del Vehiculo <span className="text-[#565A6E] font-normal normal-case">(opcional)</span></span>
                    </div>
                    <div className="border-2 border-dashed border-[#262837] hover:border-[#C5A880]/50 rounded-2xl p-6 text-center bg-[#141520] transition-colors cursor-pointer relative">
                      <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                      <UploadCloud className="w-8 h-8 text-[#C5A880] mx-auto mb-2" />
                      <div className="text-xs font-semibold text-white">
                        {uploadedFiles.length > 0 ? `${uploadedFiles.length} imagen(es) seleccionada(s)` : "Pulsa o arrastra fotos aqui"}
                      </div>
                      <div className="text-[11px] text-[#8E92A4] mt-1">Frontal, trasera, lateral e interior</div>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                          {uploadedFiles.map((name, i) => (<span key={i} className="px-2 py-0.5 rounded bg-[#1C1E2A] text-[10px] text-[#C5A880]">{name}</span>))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contacto */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider border-b border-[#1C1E2A] pb-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-xs flex items-center justify-center font-bold">3</span>
                      <span>Tus Datos de Contacto</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Nombre *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Tu nombre" className={inputClass} /></div>
                      <div><label className={labelClass}>Telefono / WhatsApp *</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="600 000 000" className={inputClass} /></div>
                      <div className="sm:col-span-2"><label className={labelClass}>Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="tu@email.com" className={inputClass} /></div>
                    </div>
                    <div>
                      <label className={labelClass}>Detalles adicionales</label>
                      <textarea rows="3" value={formData.comments} onChange={(e) => setFormData({ ...formData, comments: e.target.value })} placeholder="Estado del coche, extras, ITV, historial de revisiones..." className={`${inputClass} resize-none`} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D8BC94] to-[#C5A880] text-black font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#C5A880]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
                      <span>Solicitar Tasacion Gratuita</span><ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-center text-[10px] text-[#565A6E] mt-3">Sin compromiso · Respuesta garantizada en menos de 24 horas</p>
                  </div>
                </form>
              </div>

              {/* SIDEBAR */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-[#0E0F16] border border-[#1E202B] rounded-3xl p-6 space-y-5">
                  <h4 className="text-base font-bold font-display text-white flex items-center gap-2 border-b border-[#1C1E2A] pb-3">
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />Por que vendérnoslo a nosotros
                  </h4>
                  <p className="text-xs text-[#8E92A4] leading-relaxed">Nadie vende su coche a un particular por gusto. <strong className="text-white">Nosotros lo compramos directamente</strong>, con una oferta clara y el papeleo resuelto.</p>
                  <div className="space-y-3">
                    {TRUST_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <strong className="text-white text-xs block mb-0.5">{item.title}</strong>
                            <span className="text-[11px] text-[#8E92A4] leading-relaxed">{item.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#0E0F16] border border-[#1E202B] rounded-3xl p-6 space-y-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#C5A880]">Quien te compra el coche</div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C5A880]/30 to-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] font-black text-xl font-display flex-shrink-0">CR</div>
                    <div>
                      <div className="text-white font-bold text-sm">Christian Rey</div>
                      <div className="text-[11px] text-[#C5A880] font-semibold">Fundador de Audax Motors</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: MapPin, text: "Concesionario local en Gijon. Mas de 5 anos en toda Asturias." },
                      { icon: UserCheck, text: "Trato directo conmigo. Sin intermediarios ni comerciales." },
                      { icon: Wrench, text: "Taller propio. Valoracion real, no sobre el papel." },
                      { icon: ShieldCheck, text: "Si cerramos el trato, el pago es inmediato." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="flex items-start gap-2.5 text-[11px] text-[#8E92A4] leading-relaxed">
                          <Icon className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" /><span>{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#141622] border border-[#232637] rounded-3xl p-6 text-xs space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Prefieres hablar directamente?</div>
                  <p className="text-[#8E92A4] text-[11px] leading-relaxed">Mandanos fotos de tu coche al instante por WhatsApp y te damos una valoracion orientativa hoy mismo.</p>
                  <div className="pt-1 flex flex-col gap-2">
                    <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="py-2.5 px-4 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-semibold text-center hover:bg-emerald-600/30 transition-colors flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" /><span>WhatsApp: {COMPANY.phone}</span>
                    </a>
                    <a href={`tel:${COMPANY.phoneRaw}`} className="py-2.5 px-4 rounded-xl bg-[#1C1E2B] text-white border border-[#2A2D3E] font-semibold text-center hover:bg-[#252838] transition-colors flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4 text-[#C5A880]" /><span>Llamar ahora</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
