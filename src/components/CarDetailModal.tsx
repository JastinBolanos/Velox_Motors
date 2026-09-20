import React, { useState } from 'react';
import { X, Zap, Gauge, Sparkles, Check, Calendar, ArrowRight, Shield, Flame, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CarItem, CarColorOption } from '../types';

interface CarDetailModalProps {
  car: CarItem | null;
  onClose: () => void;
  onOpenTestDrive: (carId: string) => void;
  onOpenReservation: (car: CarItem) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  onOpenTestDrive,
  onOpenReservation,
}) => {
  if (!car) return null;

  const [activeImage, setActiveImage] = useState<string>(car.featuredImage);
  const [selectedColor, setSelectedColor] = useState<CarColorOption>(car.colors[0]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/85 backdrop-blur-md">
        
        {/* Backdrop Click */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-6xl rounded-3xl bg-gradient-to-b from-[#041a10] via-[#02120a] to-[#010804] border-2 border-emerald-500/50 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(103,235,52,0.2)] overflow-hidden my-6"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-emerald-900/50 bg-[#020e07]/90">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-[#0b331c] text-[#67eb34] border border-[#67eb34]/40">
                {car.badge}
              </span>
              <span className="text-sm text-slate-300 font-semibold font-mono">
                Year {car.specs.year} • {car.brand}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto space-y-8">
            
            {/* Top Showcase: Main Image + Gallery */}
            <div className="space-y-4">
              <div className="relative w-full h-72 sm:h-[440px] rounded-2xl overflow-hidden bg-black border-2 border-emerald-900/50">
                <img
                  src={activeImage}
                  alt={car.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.92] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02120a] via-transparent to-black/30 pointer-events-none" />

                {/* Color Glow Overlay Indicator */}
                <div 
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs text-white"
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-white/50" 
                    style={{ backgroundColor: selectedColor.hex }} 
                  />
                  <span>Selected Finish: <strong>{selectedColor.name}</strong></span>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-[#67eb34]">
                  ${car.priceUSD.toLocaleString()} USD
                </div>
              </div>

              {/* Gallery Thumbnails + Color Picker Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                
                {/* Thumbnails */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold mr-1">Views:</span>
                  {car.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === imgUrl ? 'border-[#67eb34] scale-105 shadow-[0_0_10px_rgba(103,235,52,0.5)]' : 'border-emerald-950 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Exterior Color Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-300 font-semibold">Select Colorway:</span>
                  <div className="flex items-center gap-2">
                    {car.colors.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setSelectedColor(col)}
                        title={col.name}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                          selectedColor.id === col.id ? 'scale-125 border-[#67eb34] shadow-[0_0_12px_#67eb34]' : 'border-slate-600 hover:scale-110'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      >
                        {selectedColor.id === col.id && (
                          <Check className="w-3 h-3 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Car Name, Tagline & Full Description */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {car.name}
              </h2>
              <p className="text-emerald-400 font-medium text-sm mt-0.5">
                {car.tagline}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mt-3">
                {car.description}
              </p>
            </div>

            {/* Detailed Technical Specifications Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#67eb34]" />
                Factory Certified Technical Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#03150b] border border-emerald-900/50">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Power Output</span>
                  <span className="text-xl font-extrabold text-white font-mono">{car.specs.horsepower} HP</span>
                  <span className="text-[10px] text-emerald-400/80 block mt-0.5">{car.specs.drivetrain}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#03150b] border border-emerald-900/50">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">0-100 km/h (0-62 mph)</span>
                  <span className="text-xl font-extrabold text-[#67eb34] font-mono">{car.specs.acceleration0to100}s</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">With Launch Control</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#03150b] border border-emerald-900/50">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Top Speed</span>
                  <span className="text-xl font-extrabold text-white font-mono">{car.specs.topSpeed} km/h</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Electronically limited</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#03150b] border border-emerald-900/50">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Powertrain</span>
                  <span className="text-sm font-bold text-white leading-tight block mt-1">{car.specs.rangeOrEngine}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#03150b] border border-emerald-900/50">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Transmission</span>
                  <span className="text-xs font-semibold text-white block mt-1">{car.specs.transmission}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#03150b] border border-emerald-900/50">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Curb Weight</span>
                  <span className="text-sm font-extrabold text-white font-mono mt-1">{car.specs.weight}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#03150b] border border-emerald-900/50">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Factory Warranty</span>
                  <span className="text-xs font-semibold text-[#67eb34] block mt-1">5 Years or 100,000 km</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#03150b] border border-emerald-900/50">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Stock Status</span>
                  <span className="text-xs font-semibold text-emerald-300 block mt-1">{car.status}</span>
                </div>
              </div>
            </div>

            {/* Highlights Checklist */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#67eb34]" />
                Key Engineering Highlights & Technology
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {car.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#03140a] border border-emerald-950 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-[#67eb34] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Total Price (Taxes & Duties Included)</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  ${car.priceUSD.toLocaleString()} USD
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <motion.button
                  type="button"
                  onClick={() => { onClose(); onOpenTestDrive(car.id); }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#0a351d] hover:bg-[#114b29] border border-emerald-500/40 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#67eb34] animate-icon-bob" />
                  <span>Book Test Drive</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => { onClose(); onOpenReservation(car); }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                  whileHover={{ 
                    scale: 1.06, 
                    y: -5,
                    boxShadow: "0 0 35px rgba(103,235,52,0.9)",
                    transition: { type: "spring", stiffness: 450, damping: 12 }
                  }}
                  whileTap={{ scale: 0.94 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#67eb34] via-[#4ade80] to-[#22c55e] text-black font-extrabold text-xs uppercase tracking-wide transition-all shadow-[0_0_25px_rgba(103,235,52,0.5)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Reserve Vehicle</span>
                  <ArrowRight className="w-4 h-4 text-black animate-arrow-bounce" />
                </motion.button>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
