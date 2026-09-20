import React, { useState } from 'react';
import { ArrowRight, Gauge, Zap, Sparkles, Shield, Calendar, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CARS_DATA } from '../data/carsData';
import { CarItem } from '../types';

interface HeroSectionProps {
  onOpenTestDriveModal: (carId?: string) => void;
  onOpenCarDetailModal: (car: CarItem) => void;
  onScrollToInventory: () => void;
  onScrollToFinancing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTestDriveModal,
  onOpenCarDetailModal,
  onScrollToInventory,
  onScrollToFinancing,
}) => {
  const heroCars = CARS_DATA.slice(0, 4);
  const [activeCarIndex, setActiveCarIndex] = useState<number>(0);
  const currentCar = heroCars[activeCarIndex];

  return (
    <section 
      className="relative w-full min-h-[720px] lg:min-h-[820px] xl:min-h-[880px] flex items-center overflow-hidden bg-[#020a06]" 
      id="home"
    >
      {/* ========================================================================= */}
      {/* 1. PHOTOREALISTIC CAR HERO BACKGROUND (FULL BLEED COVER)                  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentCar.id}
            src={currentCar.featuredImage}
            alt={currentCar.name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[80%_center] lg:object-[86%_center] xl:object-[90%_center] filter brightness-[0.82] contrast-[1.18] saturate-[1.15]"
          />
        </AnimatePresence>

        {/* Extended Ambient Gradient for High Contrast on Larger Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b06] via-[#020b06]/90 via-45% md:via-50% to-transparent w-full lg:w-[70%] xl:w-[62%]" />
        
        {/* Feathering into Canvas */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020a06] via-[#020a06]/90 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020e07]/90 to-transparent" />

        {/* Dynamic Glow */}
        <div className="absolute right-[8%] top-[20%] w-[600px] h-[500px] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. FOREGROUND CONTENT & PROMINENT HERO DISPLAY (VERTICALLY CENTERED)      */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
        <div className="w-full flex flex-col items-start text-left">

          {/* Tag Pill with Text & Availability (without brand logo) */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#052815]/95 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-[0_0_20px_rgba(103,235,52,0.28)] backdrop-blur-xl"
            id="hero-atelier-pill"
          >
            <span className="tracking-widest font-mono text-xs sm:text-sm text-white font-bold">VELOX OFFICIAL ATELIER</span>
            <span className="text-emerald-400 font-bold">•</span>
            <span className="text-[#67eb34] font-black tracking-wide">{currentCar.badge}</span>
          </motion.div>

          {/* Main Hero Headline - Extra Large & High Impact */}
          <motion.h1 
            key={currentCar.id + '-title'}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.04] mb-4 max-w-4xl lg:max-w-5xl drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
          >
            {currentCar.brand}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67eb34] via-[#86efac] to-emerald-400">
              {currentCar.name.replace(currentCar.brand, '').trim()}
            </span>
          </motion.h1>

          {/* Subtitle / Tagline - Larger, High Readability */}
          <motion.p 
            key={currentCar.id + '-desc'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-2xl lg:max-w-4xl font-normal leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            {currentCar.description}
          </motion.p>

          {/* ========================================================================= */}
          {/* 3. LIVE HUD TELEMETRY SPECS (ENLARGED HIGH-CONTRAST BOX & STATS)          */}
          {/* ========================================================================= */}
          <motion.div 
            key={currentCar.id + '-hud'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-2xl sm:max-w-3xl lg:max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-[#031c10]/95 border border-emerald-500/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(103,235,52,0.18)] mb-8"
          >
            {/* Stat 1: 0-100 km/h */}
            <div className="flex flex-col px-3 sm:px-4 py-2 sm:py-3 border-r border-emerald-900/60 last:border-r-0">
              <span className="text-xs sm:text-sm text-slate-300 uppercase font-bold tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#67eb34]" /> 0-100 km/h
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white font-mono mt-1.5 sm:mt-2">
                {currentCar.specs.acceleration0to100}s
              </span>
              <span className="text-xs sm:text-sm text-emerald-400 font-bold mt-1">Launch Control</span>
            </div>

            {/* Stat 2: Potencia HP */}
            <div className="flex flex-col px-3 sm:px-4 py-2 sm:py-3 sm:border-r border-emerald-900/60">
              <span className="text-xs sm:text-sm text-slate-300 uppercase font-bold tracking-wider flex items-center gap-2">
                <Gauge className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#67eb34]" /> Power
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white font-mono mt-1.5 sm:mt-2">
                {currentCar.specs.horsepower} <span className="text-sm sm:text-base font-bold text-emerald-400">HP</span>
              </span>
              <span className="text-xs text-slate-300 mt-1 truncate font-medium">{currentCar.specs.drivetrain}</span>
            </div>

            {/* Stat 3: Velocidad Máx */}
            <div className="flex flex-col px-3 sm:px-4 py-2 sm:py-3 border-r border-emerald-900/60">
              <span className="text-xs sm:text-sm text-slate-300 uppercase font-bold tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#67eb34]" /> Top Speed
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white font-mono mt-1.5 sm:mt-2">
                {currentCar.specs.topSpeed} <span className="text-sm sm:text-base font-normal text-slate-300">km/h</span>
              </span>
              <span className="text-xs text-slate-300 mt-1 font-medium">Track / Autobahn</span>
            </div>

            {/* Stat 4: Precio USD */}
            <div className="flex flex-col px-3.5 sm:px-4 py-2 sm:py-3 bg-emerald-950/80 rounded-xl sm:rounded-2xl border border-emerald-500/40">
              <span className="text-xs sm:text-sm text-emerald-300 font-bold uppercase tracking-wider">
                Delivered Price
              </span>
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-[#67eb34] font-mono mt-1.5 sm:mt-2 drop-shadow-[0_0_12px_rgba(103,235,52,0.35)]">
                ${currentCar.priceUSD.toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm text-slate-200 mt-1 font-semibold truncate">
                or ${currentCar.monthlyLeaseEst.toLocaleString()}/mo lease
              </span>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* 4. PRIMARY CALL TO ACTIONS (LARGER, HIGH-PRESENCE ACTION BUTTONS)        */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full">
            {/* CTA 1: Agendar Test Drive */}
            <motion.button
              type="button"
              onClick={() => onOpenTestDriveModal(currentCar.id)}
              id="hero-btn-test-drive"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.05, 
                y: -6, 
                boxShadow: "0 0 45px rgba(103,235,52,0.95), 0 0 20px rgba(255,255,255,0.4)",
                transition: { type: "spring", stiffness: 400, damping: 12 }
              }}
              whileTap={{ 
                scale: 0.94, 
                y: 0,
                transition: { type: "spring", stiffness: 500, damping: 15 }
              }}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#67eb34] via-[#4ade80] to-[#22c55e] text-black font-black text-sm sm:text-base tracking-wider uppercase transition-all duration-200 shadow-[0_0_30px_rgba(103,235,52,0.7)] cursor-pointer"
            >
              {/* Periodic diagonal light sheen sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-sheen pointer-events-none" />

              <Calendar className="w-5 h-5 text-black stroke-[2.5]" />
              <span className="relative z-10">Book VIP Test Drive</span>
              <div className="relative z-10 w-6 h-6 rounded-full bg-black/15 flex items-center justify-center group-hover:bg-black/25 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-black stroke-[3] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.button>

            {/* CTA 2: Ver Ficha & Personalizar */}
            <motion.button
              type="button"
              onClick={() => onOpenCarDetailModal(currentCar)}
              id="hero-btn-view-details"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, delay: 0.4, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.04, 
                y: -5, 
                borderColor: "#67eb34",
                boxShadow: "0 0 30px rgba(103,235,52,0.55)",
                transition: { type: "spring", stiffness: 400, damping: 14 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { type: "spring", stiffness: 500, damping: 15 }
              }}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#072d17]/95 hover:bg-[#0e4b26] border border-emerald-500/70 text-white font-bold text-sm sm:text-base transition-colors duration-200 cursor-pointer backdrop-blur-xl shadow-lg"
            >
              <Eye className="w-5 h-5 text-[#67eb34]" />
              <span>Technical Specs & Paint</span>
            </motion.button>

            {/* CTA 3: Ver Todo el Inventario */}
            <motion.button
              type="button"
              onClick={onScrollToInventory}
              id="hero-btn-explore-inventory"
              whileHover={{ x: 5, scale: 1.05, color: "#67eb34" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              className="text-sm sm:text-base font-bold text-slate-100 hover:text-[#67eb34] transition-colors inline-flex items-center gap-2 py-3 px-3.5 rounded-full hover:bg-emerald-950/50 cursor-pointer"
            >
              <span>Explore all 8 cars in stock</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* ========================================================================= */}
          {/* 5. INTERACTIVE CAR SELECTOR PILLS (LARGER CARDS & CLEARER TYPOGRAPHY)     */}
          {/* ========================================================================= */}
          <div className="mt-9 pt-6 border-t border-emerald-900/60 w-full max-w-2xl sm:max-w-3xl lg:max-w-5xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm sm:text-base font-black text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#67eb34]" />
                Select Featured Flagship:
              </span>
              <span className="text-xs sm:text-sm text-emerald-400 font-mono font-bold">
                {activeCarIndex + 1} of {heroCars.length} flagship units
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
              {heroCars.map((car, idx) => {
                const isActive = idx === activeCarIndex;
                return (
                  <motion.button
                    key={car.id}
                    type="button"
                    onClick={() => setActiveCarIndex(idx)}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -3, 
                      transition: { type: "spring", stiffness: 450, damping: 14 }
                    }}
                    whileTap={{ 
                      scale: 0.96,
                      transition: { type: "spring", stiffness: 500, damping: 15 }
                    }}
                    className={`flex flex-col text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#0e3b20] border-2 border-[#67eb34] text-white shadow-[0_0_25px_rgba(103,235,52,0.5)] ring-2 ring-[#67eb34]/40'
                        : 'bg-[#031a0e]/90 hover:bg-[#072917] border border-emerald-900/70 text-slate-200 hover:text-white hover:border-emerald-500'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5 gap-1.5">
                      <span className="font-black text-sm sm:text-base truncate text-slate-100">{car.name}</span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/50 text-emerald-300 border border-emerald-500/40 shrink-0">{car.specs.acceleration0to100}s</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold mt-1">
                      <span className={isActive ? 'text-[#67eb34] text-sm sm:text-base' : 'text-emerald-400 text-sm sm:text-base'}>
                        ${car.priceUSD.toLocaleString()} USD
                      </span>
                      <span className="text-xs text-slate-300 font-sans font-semibold">{car.specs.horsepower} HP</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
