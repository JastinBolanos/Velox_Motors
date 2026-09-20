import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Car, Sparkles, User, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CARS_DATA } from '../data/carsData';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCarId?: string;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  preselectedCarId,
}) => {
  if (!isOpen) return null;

  const [carId, setCarId] = useState<string>(preselectedCarId || CARS_DATA[0].id);
  const [location, setLocation] = useState<string>('madrid');
  const [date, setDate] = useState<string>('2026-09-25');
  const [timeSlot, setTimeSlot] = useState<string>('11:30 AM - Private Circuit Session');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [licenseConfirmed, setLicenseConfirmed] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const selectedCar = CARS_DATA.find((c) => c.id === carId) || CARS_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#041d10] via-[#02130a] to-[#010a05] border border-emerald-500/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(103,235,52,0.2)] my-6"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation Success Screen */
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#67eb34]/20 border-2 border-[#67eb34] flex items-center justify-center mx-auto text-[#67eb34] shadow-[0_0_25px_rgba(103,235,52,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-500/30">
                Test Drive Pass Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Private Track Session Booked!
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Dear <strong>{name}</strong>, your private test drive session has been reserved for:
              </p>
            </div>

            {/* Appointment Ticket Badge */}
            <div className="p-4 rounded-2xl bg-[#020e07] border border-emerald-500/30 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-emerald-950">
                <span className="text-slate-400">Vehicle:</span>
                <span className="font-bold text-white text-sm">{selectedCar.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-semibold text-[#67eb34]">{date} • {timeSlot}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Experience Center:</span>
                <span className="font-semibold text-white capitalize">{location} Experience Center</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Booking ID:</span>
                <span className="font-mono text-emerald-400">VX-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              Confirmation details and access credentials have been sent to <strong>{email}</strong>. A Velox Motors certified test driver will welcome you upon arrival.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-full bg-[#67eb34] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:bg-[#7bf04c] transition-all cursor-pointer"
            >
              Return to Showroom
            </button>
          </div>
        ) : (
          /* Test Drive Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-[#67eb34] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Track & Road VIP Experience
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Schedule Your Private Test Drive
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Experience visceral acceleration and chassis precision guided by certified factory test drivers.
              </p>
            </div>

            {/* Car Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Vehicle to Test
              </label>
              <select
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs font-semibold text-white focus:outline-none focus:border-[#67eb34] cursor-pointer"
              >
                {CARS_DATA.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name} ({car.specs.horsepower} HP • 0-100 in {car.specs.acceleration0to100}s)
                  </option>
                ))}
              </select>
            </div>

            {/* Center / Location Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'madrid', label: 'Madrid Experience Center', desc: 'Jarama Private Circuit' },
                { id: 'miami', label: 'Miami Flagship Showroom', desc: 'Waterfront Highway Run' },
                { id: 'cdmx', label: 'CDMX Polanco Lounge', desc: 'Autódromo Track Course' },
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setLocation(loc.id)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    location === loc.id
                      ? 'bg-[#154728] border-[#67eb34] text-white shadow-[0_0_12px_rgba(103,235,52,0.3)]'
                      : 'bg-[#020e07] border-emerald-950 text-slate-300 hover:bg-[#062413]'
                  }`}
                >
                  <span className="text-xs font-bold block">{loc.label}</span>
                  <span className="text-[10px] text-emerald-400/80 block mt-0.5">{loc.desc}</span>
                </button>
              ))}
            </div>

            {/* Date and Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Preferred Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs text-white focus:outline-none focus:border-[#67eb34]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Time & Experience Mode</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs text-white focus:outline-none focus:border-[#67eb34] cursor-pointer"
                  >
                    <option value="10:00 AM - VIP Urban Run">10:00 AM - VIP Urban Run</option>
                    <option value="11:30 AM - Private Circuit Session">11:30 AM - Private Circuit Session</option>
                    <option value="03:00 PM - Highway Dynamic Test">03:00 PM - Highway Dynamic Test</option>
                    <option value="05:30 PM - Golden Hour Track Run">05:30 PM - Golden Hour Track Run</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander Wright"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#67eb34]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#67eb34]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Phone / Mobile</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#67eb34]"
                />
              </div>
            </div>

            {/* License confirmation check */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="license-check"
                checked={licenseConfirmed}
                onChange={(e) => setLicenseConfirmed(e.target.checked)}
                className="w-4 h-4 rounded accent-[#67eb34] cursor-pointer"
              />
              <label htmlFor="license-check" className="text-xs text-slate-300 cursor-pointer">
                I confirm that I hold a valid driver's license and meet the age requirements (21+) for track driving.
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!licenseConfirmed}
              whileHover={licenseConfirmed ? { 
                scale: 1.04, 
                y: -3, 
                boxShadow: "0 0 35px rgba(103,235,52,0.9)",
                transition: { type: "spring", stiffness: 450, damping: 12 }
              } : {}}
              whileTap={licenseConfirmed ? { scale: 0.95 } : {}}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#67eb34] via-[#4ade80] to-[#22c55e] disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(103,235,52,0.4)] cursor-pointer"
            >
              Confirm Private Test Drive Reservation →
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
