import React, { useState } from 'react';
import { Calculator, CheckCircle2, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/vehicles';

export default function FinanceCalculator({ initialPrice = 24500, vehicleName = "" }) {
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.2));
  const [months, setMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(7.99); // APR %

  // Calculate monthly payment using standard loan formula
  const financedAmount = Math.max(0, vehiclePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const calculatedMonthly = financedAmount > 0 && months > 0
    ? (financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1)
    : 0;

  const monthlyFormatted = Math.round(calculatedMonthly);

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hola Audax Motors! He estado calculando la financiación ${vehicleName ? `para el ${vehicleName}` : 'de un vehículo'} en la web:` +
      `\n- Precio total: ${vehiclePrice.toLocaleString('es-ES')} €` +
      `\n- Entrada inicial: ${downPayment.toLocaleString('es-ES')} €` +
      `\n- Plazo: ${months} meses` +
      `\n- Cuota aproximada: ${monthlyFormatted} €/mes*` +
      `\n\n¿Me podéis enviar un estudio formal de financiación sin compromiso?`
    );
    window.open(`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="glass-panel-gold rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl border border-amber-500/20">
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#D4AF37]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#C5A880] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Financiación a Medida 100%
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-white">
              Simulador de Cuota Mensual
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Vehicle Price */}
            {!initialPrice || initialPrice === 24500 ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                    Precio del vehículo
                  </label>
                  <span className="text-base font-bold text-white font-mono">
                    {vehiclePrice.toLocaleString('es-ES')} €
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="120000"
                  step="500"
                  value={vehiclePrice}
                  onChange={(e) => {
                    const newPrice = Number(e.target.value);
                    setVehiclePrice(newPrice);
                    if (downPayment > newPrice) setDownPayment(newPrice);
                  }}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>
            ) : null}

            {/* Down Payment (Entrada) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Entrada inicial
                </label>
                <span className="text-base font-bold text-[#D4AF37] font-mono">
                  {downPayment.toLocaleString('es-ES')} € ({Math.round((downPayment / vehiclePrice) * 100)}%)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={vehiclePrice}
                step="500"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>0 € (Sin entrada)</span>
                <span>{Math.round(vehiclePrice * 0.5).toLocaleString('es-ES')} € (50%)</span>
              </div>
            </div>

            {/* Months Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Plazo de devolución
                </label>
                <span className="text-base font-bold text-white font-mono">
                  {months} meses ({Math.round(months / 12)} años)
                </span>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {[24, 36, 48, 60, 84, 120].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      months === m
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-amber-500/20'
                        : 'bg-black/40 text-gray-300 border-white/10 hover:border-amber-500/40'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Sin entrada previa obligatoria</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Respuesta en menos de 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Cancelación total o parcial</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Garantía Audax incluida</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 bg-black/60 border border-amber-500/30 rounded-xl p-6 text-center space-y-4 shadow-xl">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Cuota Estimada Desde
            </span>
            <div className="py-2">
              <span className="text-4xl md:text-5xl font-extrabold text-gold-gradient font-display tracking-tight">
                {monthlyFormatted} €
              </span>
              <span className="text-sm font-semibold text-gray-400"> / mes*</span>
            </div>

            <div className="text-xs text-gray-400 space-y-1.5 border-t border-white/10 pt-3">
              <div className="flex justify-between">
                <span>Importe a financiar:</span>
                <span className="font-semibold text-gray-200">{financedAmount.toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between">
                <span>Entrada elegida:</span>
                <span className="font-semibold text-gray-200">{downPayment.toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between">
                <span>Plazo seleccionado:</span>
                <span className="font-semibold text-gray-200">{months} meses</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppQuote}
              className="w-full py-3.5 px-4 rounded-xl bg-gold-gradient bg-gold-gradient-hover text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 group"
            >
              <span>Solicitar Financiación por WhatsApp</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] text-gray-500 italic">
              *Ejemplo orientativo de financiación sujeto a aprobación por entidad financiera colab. TIN 6,99% TAE 7,99%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
