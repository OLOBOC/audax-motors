import React, { useState } from 'react';
import { X, Send, MessageCircle, Phone, CheckCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/vehicles';
import { storageService } from '../services/storageService';

export default function ContactModal({ vehicle, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: vehicle ? `Hola, me interesa recibir más información sobre el ${vehicle.brand} ${vehicle.model} (${vehicle.priceFormatted}).` : ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    storageService.addContact({
      ...formData,
      subject: vehicle ? `Interés en ${vehicle.brand} ${vehicle.model}` : 'Consulta desde modal de vehículo',
      vehicle: vehicle ? {
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        price: vehicle.priceFormatted,
        slug: vehicle.slug
      } : null
    });
    setSubmitted(true);
  };

  const whatsappDirectMessage = vehicle
    ? `https://wa.me/34672944379?text=${encodeURIComponent(
        `Hola Audax Motors! Estoy interesado en el ${vehicle.brand} ${vehicle.model} (${vehicle.year} - ${vehicle.priceFormatted}). ¿Sigue disponible para verlo?`
      )}`
    : COMPANY_INFO.whatsappUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0E0F15] border border-[#262837] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#8A8E9F] hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              ¡Mensaje Recibido!
            </h3>
            <p className="text-sm text-[#8E92A4] max-w-sm mx-auto leading-relaxed">
              Gracias <span className="text-white font-semibold">{formData.name || 'por tu interés'}</span>. El equipo de Audax Motors se pondrá en contacto contigo con la mayor brevedad.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappDirectMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Continuar por WhatsApp
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-[#1A1C26] text-[#A0A4B4] hover:text-white font-semibold text-xs tracking-wider transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#C5A880] mb-1">
                Contacto Directo
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {vehicle ? `Consultar ${vehicle.brand} ${vehicle.model}` : 'Contactar con Audax Motors'}
              </h3>
              {vehicle && (
                <div className="flex items-center gap-3 mt-2 text-xs text-[#8E92A4]">
                  <span className="text-[#C5A880] font-semibold">{vehicle.priceFormatted}</span>
                  <span>•</span>
                  <span>{vehicle.year}</span>
                  <span>•</span>
                  <span>{vehicle.mileageFormatted}</span>
                </div>
              )}
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href={whatsappDirectMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-6 p-3.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 flex items-center justify-between text-emerald-300 hover:text-emerald-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-wider">Respuesta rápida WhatsApp</div>
                  <div className="text-[11px] text-emerald-400/80">Habla con nosotros al {COMPANY_INFO.phone}</div>
                </div>
              </div>
              <span className="text-xs font-bold group-hover:translate-x-1 transition-transform">Abrir chat →</span>
            </a>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#1F212E]"></div>
              <span className="flex-shrink mx-4 text-[10px] text-[#63677A] uppercase tracking-widest">o déjanos tus datos</span>
              <div className="flex-grow border-t border-[#1F212E]"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8E9F] mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tu nombre"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14161F] border border-[#232635] text-white text-xs placeholder-[#505466] focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8E9F] mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="600 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14161F] border border-[#232635] text-white text-xs placeholder-[#505466] focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8E9F] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@correo.es"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14161F] border border-[#232635] text-white text-xs placeholder-[#505466] focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8E9F] mb-1">
                  Mensaje o consulta
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14161F] border border-[#232635] text-white text-xs placeholder-[#505466] focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#DFB76C] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#C5A880]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Solicitud</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#63677A] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Trato confidencial y sin compromiso</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
