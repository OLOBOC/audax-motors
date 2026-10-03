import { COMPANY_INFO } from '../data/vehicles';
import { storageService } from '../services/storageService';
import { 
  Phone, MessageCircle, Mail, MapPin, Clock, 
  Instagram, Send, CheckCircle, ShieldCheck, ArrowUpRight 
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Consulta general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    storageService.addContact(formData);
    setSubmitted(true);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Camino de las Escuelas 8 La Pedrera Nave 6, 33390 Gijón Asturias'
  )}`;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
          Canales Oficiales
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Contacto & Ubicación
        </h1>
        <p className="text-sm text-[#8E92A4]">
          Estamos a tu disposición para cualquier consulta sobre nuestro stock, tasación de tu vehículo o para concertar cita previa en nuestras instalaciones de Gijón.
        </p>
      </div>

      {/* Main Grid: Info Cards (5 Cols) + Contact Form (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Contact Info cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* WhatsApp Card (High Priority) */}
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-[#101319] to-[#0D0F15] border border-emerald-500/30 hover:border-emerald-500/60 transition-all shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span>Abrir chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Atención Inmediata WhatsApp
              </div>
              <div className="text-lg font-bold font-display text-white mt-0.5">
                {COMPANY_INFO.phone}
              </div>
              <p className="text-xs text-[#8E92A4] mt-1">
                La vía más ágil para pedir fotos, vídeos en detalle o consultar disponibilidad de un coche.
              </p>
            </div>
          </a>

          {/* Telephone Card */}
          <div className="p-6 rounded-3xl bg-[#101118] border border-[#1E202B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">
                Llamada Telefónica
              </div>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="text-lg font-bold font-display text-white hover:text-[#C5A880] transition-colors"
              >
                {COMPANY_INFO.phone}
              </a>
              <div className="text-xs text-[#8E92A4] mt-0.5">
                Atención comercial directa y cercana
              </div>
            </div>
          </div>

          {/* Location & Schedule Card with Exact Address */}
          <div className="p-6 rounded-3xl bg-[#101118] border border-[#1E202B] space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">
                    Ubicación Exacta
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {COMPANY_INFO.address}
                  </div>
                  <div className="text-xs text-[#8E92A4] mt-1">
                    Atención personalizada con cita previa
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] hover:underline font-semibold"
              >
                <span>Cómo llegar en Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-3 border-t border-[#1C1E2A] flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">
                  Horario de Atención
                </div>
                <div className="text-xs font-semibold text-white">
                  {COMPANY_INFO.schedule}
                </div>
              </div>
            </div>
          </div>

          {/* Social & Email */}
          <div className="p-6 rounded-3xl bg-[#101118] border border-[#1E202B] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">
                    Instagram Oficial
                  </div>
                  <div className="text-xs font-bold text-white">
                    {COMPANY_INFO.instagramHandle}
                  </div>
                </div>
              </div>
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#C5A880] hover:underline inline-flex items-center gap-1"
              >
                <span>Visitar</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="pt-3 border-t border-[#1C1E2A] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E8295]">
                  Correo Electrónico
                </div>
                <div className="text-xs font-semibold text-white">
                  {COMPANY_INFO.email}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7 bg-[#101118] border border-[#1E202B] rounded-3xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                ¡Mensaje Enviado con Éxito!
              </h3>
              <p className="text-xs sm:text-sm text-[#8E92A4] max-w-md mx-auto leading-relaxed">
                Gracias por ponerte en contacto con Audax Motors. Nos pondremos en contacto contigo a la mayor brevedad.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#1A1C28] hover:bg-[#242636] text-white text-xs font-semibold tracking-wider transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-[#1C1E2A] pb-3 mb-4">
                <h3 className="text-lg font-bold font-display text-white">
                  Envíanos tu Consulta
                </h3>
                <p className="text-xs text-[#8E92A4] mt-0.5">
                  Rellena este formulario y nos pondremos en contacto contigo.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tu nombre y apellidos"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="ejemplo@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                  Motivo de la consulta
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Consulta general">Consulta general</option>
                  <option value="Interés en un vehículo del catálogo">Interés en un vehículo del catálogo</option>
                  <option value="Tasar o vender mi vehículo">Tasar o vender mi vehículo</option>
                  <option value="Concertar cita en Gijón">Concertar cita en Gijón</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8E9F] mb-1">
                  Mensaje *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="¿En qué te podemos ayudar?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D8BC94] to-[#C5A880] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A880]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Consulta</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#6B6F80] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Tus datos son tratados de forma confidencial y directa.</span>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
