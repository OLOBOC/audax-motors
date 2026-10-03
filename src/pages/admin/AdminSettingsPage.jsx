import React, { useState } from 'react';
import { 
  Key, Sparkles, CheckCircle2, AlertCircle, RotateCcw, 
  ShieldCheck, Loader2, Save, ExternalLink, HelpCircle 
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { aiService } from '../../services/aiService';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(() => storageService.getSettings());
  const [apiKey, setApiKey] = useState(settings.geminiApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [testingApi, setTestingApi] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    const updated = {
      ...settings,
      geminiApiKey: apiKey.trim()
    };
    storageService.saveSettings(updated);
    setSettings(updated);
    showNotification('Clave de API de Gemini guardada correctamente.');
  };

  const handleTestApiKey = async () => {
    setTestingApi(true);
    setTestResult(null);

    // Temporarily save to test with it
    const updated = { ...settings, geminiApiKey: apiKey.trim() };
    storageService.saveSettings(updated);

    try {
      const res = await aiService.generateVehicleListing(
        {
          brand: 'BMW',
          model: '320d Touring',
          version: 'M Sport',
          year: 2019,
          mileage: 85000,
          fuel: 'Diésel',
          gearbox: 'Automático',
          power: '190 CV',
          price: 23500
        },
        'Prueba de conexión oficial desde panel Audax'
      );

      if (res.isRealApi) {
        setTestResult({
          success: true,
          message: '¡Conexión verificada con éxito con la API oficial de Google Gemini 1.5 Flash!',
          source: res.source
        });
      } else {
        setTestResult({
          success: false,
          message: 'No se pudo conectar con la API externa o la clave no es válida. El sistema está operando en modo local seguro de respaldo.',
          source: res.source
        });
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: 'Error al contactar con la API de Google Gemini. Revisa la conexión o la clave introducida.'
      });
    } finally {
      setTestingApi(false);
    }
  };

  const handleResetDemo = () => {
    if (window.confirm('¿Deseas restablecer todos los vehículos, solicitudes y contactos al estado inicial de la demo? Esta acción restaurará el catálogo original.')) {
      storageService.resetToDefaults();
      showNotification('Datos de la demo restablecidos al estado inicial con éxito.');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black font-display text-white">
          Configuración del Sistema & Conexión con IA
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Ajustes técnicos de la plataforma, integración con la API de Inteligencia Artificial y mantenimiento de la base de datos.
        </p>
      </div>

      {/* ─── GOOGLE GEMINI API CONFIG ──────────────────────────────────── */}
      <div className="bg-[#0E0F16] border border-[#1E202E] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1C1E2A] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-white">
                Integración API de Inteligencia Artificial (Google Gemini)
              </h2>
              <p className="text-xs text-gray-400">
                Permite a Cristian redactar anuncios comerciales completos y posts para Instagram en 2 segundos.
              </p>
            </div>
          </div>

          <a
            href="https://aistudio.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#C5A880] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Obtener API Key gratuita</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <form onSubmit={handleSaveApiKey} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Clave de API de Google Gemini (VITE_GEMINI_API_KEY)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-[#141622] border border-[#232637] text-white text-xs font-mono placeholder-gray-600 focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-white"
                >
                  {showKey ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#D8BC94] text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Guardar</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-[11px] text-gray-400 leading-relaxed max-w-md">
              💡 También puedes definir <code className="text-[#C5A880]">VITE_GEMINI_API_KEY</code> en tu archivo <code className="text-[#C5A880]">.env</code> para que se cargue automáticamente sin tocar la interfaz.
            </p>

            <button
              type="button"
              disabled={testingApi}
              onClick={handleTestApiKey}
              className="px-4 py-2 rounded-xl bg-[#181A28] hover:bg-[#222538] text-white text-xs font-bold transition-colors flex items-center gap-2 border border-[#282B3E] disabled:opacity-50"
            >
              {testingApi ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Comprobando conexión...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Probar Conexión en Vivo</span>
                </>
              )}
            </button>
          </div>

          {/* Test Result Message */}
          {testResult && (
            <div
              className={`p-4 rounded-2xl border text-xs flex items-start gap-3 animate-in fade-in ${
                testResult.success
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <strong className="block text-white font-bold">{testResult.message}</strong>
                {testResult.source && (
                  <span className="text-[11px] opacity-80 block">Motor activo: {testResult.source}</span>
                )}
              </div>
            </div>
          )}
        </form>
      </div>

      {/* ─── FACTORY RESET & DEMO UTILITIES ────────────────────────────── */}
      <div className="bg-[#0E0F16] border border-[#1E202E] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3 border-b border-[#1C1E2A] pb-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/40 text-red-400 border border-red-500/20 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold font-display text-white">
              Restablecer Datos de la Demostración
            </h2>
            <p className="text-xs text-gray-400">
              Vuelve a cargar el stock oficial de Audax (Civic Sport Plus, Mercedes CLA AMG, Ateca FR, Camper Ducato, Opel Insignia, Chevrolet Aveo Vendido) y limpia pruebas.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-300">
            Útil para reiniciar la web antes de presentársela a Cristian.
          </span>
          <button
            type="button"
            onClick={handleResetDemo}
            className="px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restablecer Demo de Fábrica</span>
          </button>
        </div>
      </div>

    </div>
  );
}
