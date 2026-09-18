import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock, Sparkles, Car } from 'lucide-react';
import { motion } from 'motion/react';
import { CarItem } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  car: CarItem | null;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  car,
  onClose,
}) => {
  if (!isOpen || !car) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const reservationDeposit = 2500; // $2,500 deposit to hold the unit

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#041d10] via-[#02130a] to-[#010905] border border-emerald-500/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(103,235,52,0.2)] my-6"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#67eb34]/20 border-2 border-[#67eb34] flex items-center justify-center mx-auto text-[#67eb34]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">
              ¡Unidad Reservada en Exclusiva!
            </h3>
            <p className="text-sm text-slate-300">
              Hemos bloqueado el número de chasis (VIN) de tu <strong>{car.name}</strong> durante 7 días hábiles a nombre de <strong>{name}</strong>.
            </p>

            <div className="p-4 rounded-xl bg-[#020e07] border border-emerald-500/30 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Modelo:</span>
                <span className="font-bold text-white">{car.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Precio de Venta:</span>
                <span className="font-mono text-[#67eb34] font-bold">${car.priceUSD.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Depósito en Garantía (Reembolsable):</span>
                <span className="font-mono text-white">${reservationDeposit.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ciudad de Entrega VIP:</span>
                <span className="text-white">{deliveryCity}</span>
              </div>
            </div>

            <p className="text-xs text-emerald-400 font-medium">
              Tu Asesor Privado Concierge te llamará en breve al {phone} para coordinar la inspección técnica o entrega a domicilio.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#67eb34] text-black font-bold text-xs uppercase cursor-pointer"
            >
              Entendido, Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-[11px] font-bold text-[#67eb34] uppercase tracking-wider border border-emerald-500/30 mb-2">
                <Lock className="w-3.5 h-3.5" />
                Bloqueo Oficial de Chasis
              </div>
              <h3 className="text-2xl font-black text-white">
                Reservar {car.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Asegura esta unidad exclusiva antes de que sea adquirida por otro coleccionista. Depósito 100% reembolsable en 14 días.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#020e07] border border-emerald-950 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#67eb34]" />
                <span className="font-bold text-white">{car.name}</span>
              </div>
              <span className="font-mono font-bold text-[#67eb34]">${car.priceUSD.toLocaleString()} USD</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nombre Completo del Titular</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Santiago De La Torre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#67eb34]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="santiago@invest.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#67eb34]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Teléfono Directo</label>
                  <input
                    type="tel"
                    required
                    placeholder="+34 650 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#67eb34]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Ciudad para Entrega en Remolque Cerrado</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Madrid, Barcelona, Miami, Ciudad de México..."
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#67eb34]"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center gap-2.5 text-xs text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-[#67eb34] shrink-0" />
              <span>Garantía de Satisfacción Velox: Si tras inspeccionar el vehículo no es de tu agrado, se reembolsa el 100% de inmediato.</span>
            </div>

            <motion.button
              type="submit"
              whileHover={{ 
                scale: 1.04, 
                y: -3, 
                boxShadow: "0 0 35px rgba(103,235,52,0.9)",
                transition: { type: "spring", stiffness: 450, damping: 12 }
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#67eb34] via-[#4ade80] to-[#22c55e] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(103,235,52,0.4)] cursor-pointer"
            >
              Completar Solicitud de Reserva VIP →
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
