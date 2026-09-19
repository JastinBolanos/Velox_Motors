import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Calendar, Percent, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CARS_DATA } from '../data/carsData';
import { CarItem } from '../types';

interface FinancingCalculatorProps {
  preselectedCar?: CarItem | null;
  onOpenTestDriveModal: (carId: string) => void;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  preselectedCar,
  onOpenTestDriveModal,
}) => {
  const [selectedCarId, setSelectedCarId] = useState<string>(preselectedCar?.id || CARS_DATA[0].id);
  const currentCar = CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];

  const [customPrice, setCustomPrice] = useState<number>(currentCar.priceUSD);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [termMonths, setTermMonths] = useState<number>(48); // 48 months
  const interestRate = 4.9; // 4.9% annual APR

  const handleCarChange = (id: string) => {
    setSelectedCarId(id);
    const found = CARS_DATA.find((c) => c.id === id);
    if (found) {
      setCustomPrice(found.priceUSD);
    }
  };

  const calculations = useMemo(() => {
    const downPaymentAmount = Math.round(customPrice * (downPaymentPercent / 100));
    const principal = customPrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = Math.round(
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
    );
    const totalPayments = monthlyPayment * termMonths;
    const totalInterest = totalPayments - principal;

    return {
      downPaymentAmount,
      principal,
      monthlyPayment,
      totalInterest,
      totalPayments,
    };
  }, [customPrice, downPaymentPercent, termMonths, interestRate]);

  const [isPreApprovedSubmitted, setIsPreApprovedSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  const handlePreApproveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreApprovedSubmitted(true);
  };

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1920px] mx-auto" id="financing">
      <div className="rounded-2xl bg-gradient-to-b from-[#041c10] via-[#02140a] to-[#010905] border border-emerald-500/35 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Background Subtle Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-emerald-500/12 rounded-full blur-[140px] pointer-events-none" />

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs font-bold text-[#67eb34] uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Financiamiento & Leasing VIP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Simulador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67eb34] via-[#86efac] to-emerald-400">Cuotas a Medida</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
            Configura tu plan de adquisición personalizado con tasas de interés exclusivas desde 4.9% TAE, aprobación exprés en 24 horas y sin penalización por liquidación anticipada.
          </p>
        </div>

        {/* Two-Column Grid: Controls on Left, Results HUD on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Vehicle Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-200 uppercase tracking-wider block">
                Selecciona Vehículo del Inventario
              </label>
              <select
                value={selectedCarId}
                onChange={(e) => handleCarChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#020d07] border border-emerald-900/80 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-[#67eb34] cursor-pointer shadow-sm"
              >
                {CARS_DATA.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name} — ${car.priceUSD.toLocaleString()} USD ({car.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div className="space-y-2.5 bg-[#021008] p-4 sm:p-4.5 rounded-xl border border-emerald-950">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200 text-xs sm:text-sm">Valor Total del Auto</span>
                <span className="font-mono text-base sm:text-lg font-black text-white">
                  ${customPrice.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min={100000}
                max={900000}
                step={5000}
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-full h-2.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#67eb34]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono font-semibold">
                <span>$100,000</span>
                <span>$500,000</span>
                <span>$900,000</span>
              </div>
            </div>

            {/* Down Payment % Slider */}
            <div className="space-y-2.5 bg-[#021008] p-4 sm:p-4.5 rounded-xl border border-emerald-950">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200 text-xs sm:text-sm">Enganche / Pago Inicial ({downPaymentPercent}%)</span>
                <span className="font-mono text-sm sm:text-base font-black text-[#67eb34]">
                  ${calculations.downPaymentAmount.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#67eb34]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono font-semibold">
                <span>10% (Mínimo)</span>
                <span>30% (Recomendado)</span>
                <span>60%</span>
              </div>
            </div>

            {/* Term Months Selector Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-200 uppercase tracking-wider block">
                Plazo de Financiamiento
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[24, 36, 48, 60].map((months) => (
                  <motion.button
                    key={months}
                    type="button"
                    onClick={() => setTermMonths(months)}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      termMonths === months
                        ? 'bg-[#154728] border border-[#67eb34] text-[#67eb34] shadow-[0_0_15px_rgba(103,235,52,0.35)]'
                        : 'bg-[#020e07] hover:bg-[#062413] border border-emerald-900/60 text-slate-200'
                    }`}
                  >
                    {months} Meses
                  </motion.button>
                ))}
              </div>
            </div>

            {/* VIP Financing Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#67eb34] shrink-0 mt-0.5" />
                <span>Tasa fija preferencial 4.9% anual congelada</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#67eb34] shrink-0 mt-0.5" />
                <span>0% de comisión por apertura en unidades stock</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#67eb34] shrink-0 mt-0.5" />
                <span>Seguro a todo riesgo bonificado primer año</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#67eb34] shrink-0 mt-0.5" />
                <span>Posibilidad de canje por modelo nuevo a los 24 meses</span>
              </div>
            </div>

          </div>

          {/* Results Summary Card - Compact and Clean */}
          <div className="lg:col-span-5 flex flex-col p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#062916] to-[#03150b] border border-[#67eb34]/40 shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
            
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/50">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                Cuota Mensual Estimada
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#67eb34]/25 text-[#67eb34] border border-[#67eb34]/40">
                Aprobación en 24h
              </span>
            </div>

            {/* Monthly Payment Number */}
            <div className="my-4 text-center sm:text-left">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono tracking-tight">
                  ${calculations.monthlyPayment.toLocaleString()}
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-400">USD/mes</span>
              </div>
              <span className="text-xs text-slate-300 mt-1 block">
                Durante {termMonths} cuotas fijas mensuales
              </span>
            </div>

            {/* Breakdown Table */}
            <div className="space-y-2 py-3.5 border-y border-emerald-800/50 text-xs font-medium">
              <div className="flex justify-between text-slate-200">
                <span>Vehículo seleccionado:</span>
                <span className="font-bold text-white truncate max-w-[200px]">{currentCar.name}</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>Precio del vehículo:</span>
                <span className="font-mono text-white font-bold">${customPrice.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>Enganche inicial ({downPaymentPercent}%):</span>
                <span className="font-mono text-[#67eb34] font-black">${calculations.downPaymentAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>Monto a financiar:</span>
                <span className="font-mono text-white font-bold">${calculations.principal.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>Tasa anual (APR fija):</span>
                <span className="font-mono text-emerald-300 font-bold">{interestRate}% TAE</span>
              </div>
            </div>

            {/* Pre-approval form */}
            <div className="mt-4">
              {isPreApprovedSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-center space-y-2 animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-[#67eb34] text-black flex items-center justify-center mx-auto font-black text-sm">
                    ✓
                  </div>
                  <h4 className="text-sm font-black text-white">¡Solicitud Recibida con Éxito!</h4>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    Un asesor financiero senior de Velox Motors se comunicará a <strong>{applicantEmail}</strong> en menos de 2 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePreApproveSubmit} className="space-y-2.5">
                  <span className="text-xs font-black text-slate-100 block">
                    Solicita Pre-Aprobación Sin Compromiso
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#67eb34]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Correo electrónico corporativo / personal"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#67eb34]"
                  />
                  <motion.button
                    type="submit"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -2,
                      boxShadow: "0 0 25px rgba(103,235,52,0.8)",
                      transition: { type: "spring", stiffness: 450, damping: 12 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#67eb34] via-[#4ade80] to-[#22c55e] text-black font-black text-xs uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(103,235,52,0.4)] cursor-pointer"
                  >
                    Obtener Pre-Aprobación Express →
                  </motion.button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
