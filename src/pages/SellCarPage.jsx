import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/vehicles';
import { 
  Car, CheckCircle, UploadCloud, ShieldCheck, Clock, 
  Sparkles, ArrowRight, MessageCircle, Phone, FileText, CheckCircle2 
} from 'lucide-react';

export default function SellCarPage() {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    fuel: 'Gasolina',
    name: '',
    phone: '',
    email: '',
    comments: '',
    photosCount: 0
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(filesArray);
      setFormData(prev => ({ ...prev, photosCount: filesArray.length }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      brand: '',
      model: '',
      year: '',
      mileage: '',
      fuel: 'Gasolina',
      name: '',
      phone: '',
      email: '',
      comments: '',
      photosCount: 0
    });
    setUploadedFiles([]);
  };

  const whatsappMessage = `https://wa.me/34672944379?text=${encodeURIComponent(
    `Hola Audax Motors! He enviado una solicitud de tasación para mi ${formData.brand} ${formData.model} (${formData.year}, ${formData.mileage} km). Mi nombre es ${formData.name}.`
  )}`;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#101118] border border-[#1F212E] p-8 sm:p-12">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80"
            alt="Vende tu coche Audax"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101118] via-[#101118]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            Tasación Profesional
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            ¿Quieres vender tu coche?
          </h1>
          <p className="text-sm sm:text-base text-[#A0A4B4] leading-relaxed">
            Te ofrecemos una valoración transparente y directa, sin rodeos ni intermediarios. Completa los datos de tu vehículo y nos pondremos en contacto contigo con una propuesta en menos de 24 horas.
          </p>
        </div>
      </div>

      {/* Confirmation State */}
      {submitted ? (
        <div className="max-w-2xl mx-auto bg-[#0E0F16] border border-[#262837] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Solicitud Registrada
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              ¡Gracias, {formData.name}!
            </h2>
            <p className="text-sm text-[#8E92A4] max-w-md mx-auto leading-relaxed">
              Hemos recibido los detalles de tu <strong className="text-white">{formData.brand} {formData.model} ({formData.year})</strong>. Analizaremos las características y te contactaremos en breve.
            </p>
          </div>

          {/* Summary Box */}
          <div className="bg-[#141620] border border-[#222432] rounded-2xl p-4 text-left text-xs space-y-2">
            <div className="text-[#8E92A4] font-semibold text-[11px] uppercase tracking-wider mb-2">
              Resumen de la valoración solicitada:
            </div>
            <div className="grid grid-cols-2 gap-2 text-[#CBD0DF]">
              <div>Vehículo: <span className="text-white font-medium">{formData.brand} {formData.model}</span></div>
              <div>Año: <span className="text-white font-medium">{formData.year}</span></div>
              <div>Kilometraje: <span className="text-white font-medium">{formData.mileage} km</span></div>
              <div>Combustible: <span className="text-white font-medium">{formData.fuel}</span></div>
              <div>Teléfono: <span className="text-white font-medium">{formData.phone}</span></div>
              <div>Email: <span className="text-white font-medium">{formData.email || 'No indicado'}</span></div>
            </div>
          </div>

          {/* Quick WhatsApp Link */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Acelerar por WhatsApp</span>
            </a>

            <button
              onClick={resetForm}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1A1C28] hover:bg-[#252838] text-white border border-[#282B3B] text-xs font-semibold tracking-wider transition-colors"
            >
              Enviar otro vehículo
            </button>
          </div>
        </div>
      ) : (
        /* Form Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Interactive Form (8 cols) */}
          <div className="lg:col-span-8 bg-[#101118] border border-[#1E202B] rounded-3xl p-6 sm:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Vehicle Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider border-b border-[#1C1E2A] pb-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-xs flex items-center justify-center font-bold">1</span>
                  <span>Datos de tu Vehículo</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                      Marca *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Ej. BMW, Audi, Mercedes, Porsche..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                      Modelo y Versión *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="Ej. M4 Competition, RS3, Clase A 45 AMG..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                      Año de Matriculación *
                    </label>
                    <input
                      type="number"
                      required
                      min="1990"
                      max="2026"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="Ej. 2021"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                      Kilómetros Actuales *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                      placeholder="Ej. 45000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                      Combustible *
                    </label>
                    <select
                      value={formData.fuel}
                      onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Gasolina">Gasolina</option>
                      <option value="Diésel">Diésel</option>
                      <option value="Híbrido">Híbrido / Híbrido Enchufable</option>
                      <option value="Eléctrico">Eléctrico 100%</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Photos Upload Simulation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider border-b border-[#1C1E2A] pb-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-xs flex items-center justify-center font-bold">2</span>
                  <span>Fotografías del Vehículo (Opcional)</span>
                </div>

                <div className="border-2 border-dashed border-[#262837] hover:border-[#C5A880]/50 rounded-2xl p-6 text-center bg-[#141520] transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-8 h-8 text-[#C5A880] mx-auto mb-2" />
                  <div className="text-xs font-semibold text-white">
                    {uploadedFiles.length > 0 
                      ? `${uploadedFiles.length} imagen(es) seleccionada(s)` 
                      : 'Pulsa o arrastra fotos de tu vehículo aquí'}
                  </div>
                  <div className="text-[11px] text-[#8E92A4] mt-1">
                    Frontal, trasera, lateral e interior (JPG, PNG)
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                      {uploadedFiles.map((name, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#1C1E2A] text-[10px] text-[#C5A880]">
                          {name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider border-b border-[#1C1E2A] pb-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-xs flex items-center justify-center font-bold">3</span>
                  <span>Tus Datos de Contacto</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="600 000 000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                    Comentarios o Detalles Relevantes
                  </label>
                  <textarea
                    rows="3"
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    placeholder="Mantenimiento oficial, extras destacados, estado de neumáticos o cualquier detalle de interés..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D8BC94] to-[#C5A880] text-black font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#C5A880]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <span>Solicitar Valoración Gratuita</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>

          {/* Right: Informational Trust Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#101118] border border-[#1E202B] rounded-3xl p-6 space-y-6">
              <h3 className="text-base font-bold font-display text-white border-b border-[#1C1E2A] pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span>¿Por qué tasar con Audax Motors?</span>
              </h3>

              <div className="space-y-4 text-xs text-[#8E92A4]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Tasación real y justa</strong>
                    Basada en los valores de mercado actuales y el estado genuino del coche.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Respuesta en 24 horas</strong>
                    Sin pérdidas de tiempo ni esperas innecesarias.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Gestión documental íntegra</strong>
                    Nos encargamos del cambio de titularidad en la DGT con total seguridad jurídica.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Pago seguro e inmediato</strong>
                    Liquidez sin sobresaltos ni intermediarios dudosos.
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone / Contact Box */}
            <div className="bg-[#141622] border border-[#232637] rounded-3xl p-6 text-xs space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                ¿Prefieres hablar directamente?
              </div>
              <p className="text-[#8E92A4] text-[11px] leading-relaxed">
                Puedes llamarnos o enviarnos fotos de tu coche al instante por WhatsApp al equipo de atención al cliente.
              </p>
              <div className="pt-1 flex flex-col gap-2">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-semibold text-center hover:bg-emerald-600/30 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {COMPANY_INFO.phone}</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="py-2.5 px-4 rounded-xl bg-[#1C1E2B] text-white border border-[#2A2D3E] font-semibold text-center hover:bg-[#252838] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span>Llamar ahora</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
