import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import AudaxLogo from '../../components/AudaxLogo';
import { storageService } from '../../services/storageService';

export default function AdminLoginPage({ onLoginSuccess, onBackToPublic }) {
  const [email, setEmail] = useState('cristian@audaxmotors.es');
  const [password, setPassword] = useState('audax2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = storageService.login(email, password);
      setLoading(false);
      if (res.success) {
        onLoginSuccess(res.session);
      } else {
        setError(res.error || 'Credenciales incorrectas');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#060709] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glowing ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C5A880]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <AudaxLogo className="w-16 h-16 drop-shadow-xl" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide">
              AUDAX <span className="text-gold-gradient">MOTORS</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold mt-1">
              Panel de Control Privado
            </p>
          </div>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Acceso exclusivo para la gestión de vehículos, solicitudes de tasación y contactos.
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#0E0F16] border border-[#222536] rounded-3xl p-7 sm:p-8 shadow-2xl shadow-black/80 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Usuario / Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cristian@audaxmotors.es"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141622] border border-[#232637] text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141622] border border-[#232637] text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D8BC94] to-[#C5A880] text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#C5A880]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Iniciando sesión...</span>
              ) : (
                <>
                  <span>Entrar al Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Pill */}
          <div className="pt-2 border-t border-[#1C1E2A] text-center">
            <div className="text-[11px] text-[#A0A4B4] space-y-1">
              <span className="font-semibold text-gray-300 block">Credenciales preconfiguradas para la demo:</span>
              <span className="text-[10px] text-[#C5A880] font-mono bg-[#141622] px-2.5 py-1 rounded-md inline-block border border-[#25283A]">
                cristian@audaxmotors.es &nbsp;|&nbsp; audax2026
              </span>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center">
          <button
            type="button"
            onClick={onBackToPublic}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Volver a la web pública de Audax Motors
          </button>
        </div>
      </div>
    </div>
  );
}
