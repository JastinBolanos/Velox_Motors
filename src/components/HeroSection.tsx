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
      className="relative w-full min-h-[750px] lg:min-h-[850px] xl:min-h-[900px] flex items-center overflow-hidden bg-[#020a06]" 
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

        {/* Extended Ambient Gradient for High Contrast on Text, allowing car to breathe on right side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b06] via-[#020b06]/85 via-40% md:via-45% to-transparent w-full lg:w-[65%] xl:w-[55%]" />
        
        {/* Feathering into Canvas */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020a06] via-[#020a06]/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020e07]/90 to-transparent" />

        {/* Dynamic Glow */}
        <div className="absolute right-[8%] top-[20%] w-[650px] h-[550px] bg-emerald-500/18 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. FOREGROUND CONTENT & EXPANDED ULTRA-WIDE HUD TELEMETRY                 */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12 lg:py-20">
        <div className="w-full flex flex-col items-start text-left">
          
          {/* Tag Pill with Badge - Prominent Sizing */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#052815]/95 border-2 border-emerald-500/40 text-emerald-300 text-sm font-bold uppercase tracking-wider mb-6 shadow-[0_0_25px_rgba(103,235,52,0.25)] backdrop-blur-xl"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#67eb34] shadow-[0_0_10px_#67eb34] animate-ping" />
            <span>Showroom Exclusivo Velox Motors</span>
            <span className="text-emerald-500/70">•</span>
            <span className="text-[#67eb34] font-black">{currentCar.badge}</span>
          </motion.div>

          {/* Main Hero Headline - Extra Large & High Impact, Expanded Width */}
          <motion.h1 
            key={currentCar.id + '-title'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black tracking-tight text-white leading-[1.02] mb-6 max-w-4xl lg:max-w-5xl xl:max-w-6xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            {currentCar.brand}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67eb34] via-[#86efac] to-emerald-400">
              {currentCar.name.replace(currentCar.brand, '').trim()}
            </span>
          </motion.h1>

          {/* Subtitle / Tagline - Expanded readable font */}
          <motion.p 
            key={currentCar.id + '-desc'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-4xl xl:max-w-5xl font-normal leading-relaxed mb-10 drop-shadow"
          >
            {currentCar.description}
          </motion.p>

          {/* ========================================================================= */}
          {/* 3. LIVE HUD TELEMETRY SPECS (EXPANDED ACROSS SCREEN)                      */}
          {/* ========================================================================= */}
          <motion.div 
            key={currentCar.id + '-hud'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 rounded-3xl bg-[#031c10]/90 border-2 border-emerald-500/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(103,235,52,0.15)] mb-10"
          >
            {/* Stat 1: 0-100 km/h */}
            <div className="flex flex-col px-4 py-3 border-r border-emerald-900/50 last:border-r-0">
              <span className="text-xs sm:text-sm text-slate-400 uppercase font-bold tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#67eb34]" /> 0-100 km/h
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono mt-1.5">
                {currentCar.specs.acceleration0to100}s
              </span>
              <span className="text-xs text-emerald-400 font-semibold mt-1">Launch Control</span>
            </div>

            {/* Stat 2: Potencia HP */}
            <div className="flex flex-col px-4 py-3 sm:border-r border-emerald-900/50">
              <span className="text-xs sm:text-sm text-slate-400 uppercase font-bold tracking-wider flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#67eb34]" /> Potencia
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono mt-1.5">
                {currentCar.specs.horsepower} <span className="text-base sm:text-lg font-normal text-emerald-400">HP</span>
              </span>
              <span className="text-xs text-slate-400 mt-1">{currentCar.specs.drivetrain}</span>
            </div>

            {/* Stat 3: Velocidad Máx */}
            <div className="flex flex-col px-4 py-3 border-r border-emerald-900/50">
              <span className="text-xs sm:text-sm text-slate-400 uppercase font-bold tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#67eb34]" /> V. Máxima
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono mt-1.5">
                {currentCar.specs.topSpeed} <span className="text-sm font-normal text-slate-400">km/h</span>
              </span>
              <span className="text-xs text-slate-400 mt-1">Pista / Autovía</span>
            </div>

            {/* Stat 4: Precio USD */}
            <div className="flex flex-col px-4 py-3 bg-emerald-950/60 rounded-2xl border-2 border-emerald-500/30">
              <span className="text-xs sm:text-sm text-emerald-300 font-bold uppercase tracking-wider">
                Precio Entrega
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#67eb34] font-mono mt-1.5">
                ${currentCar.priceUSD.toLocaleString()}
              </span>
              <span className="text-xs text-slate-300 mt-1 font-medium">
                o ${currentCar.monthlyLeaseEst.toLocaleString()}/mes
              </span>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* 4. PRIMARY CALL TO ACTIONS (EXTRA LARGE BOUNCING & MOVING BUTTONS)         */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center gap-5 w-full">
            {/* CTA 1: Agendar Test Drive with Premium Float & Spring Bounce */}
            <motion.button
              type="button"
              onClick={() => onOpenTestDriveModal(currentCar.id)}
              id="hero-btn-test-drive"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.07, 
                y: -9, 
                boxShadow: "0 0 55px rgba(103,235,52,0.95), 0 0 20px rgba(255,255,255,0.4)",
                transition: { type: "spring", stiffness: 400, damping: 12 }
              }}
              whileTap={{ 
                scale: 0.93, 
                y: 1,
                transition: { type: "spring", stiffness: 500, damping: 15 }
              }}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3.5 px-9 py-5 rounded-full bg-gradient-to-r from-[#67eb34] via-[#4ade80] to-[#22c55e] text-black font-black text-base sm:text-lg tracking-wide uppercase transition-all duration-200 shadow-[0_0_35px_rgba(103,235,52,0.7)] cursor-pointer"
            >
              {/* Periodic diagonal light sheen sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-sheen pointer-events-none" />

              <Calendar className="w-5 h-5 text-black stroke-[2.5] animate-icon-bob" />
              <span className="relative z-10">Agendar Prueba de Manejo</span>
              <div className="relative z-10 w-7 h-7 rounded-full bg-black/15 flex items-center justify-center group-hover:bg-black/25 transition-colors">
                <ArrowRight className="w-4 h-4 text-black stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {/* CTA 2: Ver Ficha & Personalizar with Alternating Float & Spring Bounce */}
            <motion.button
              type="button"
              onClick={() => onOpenCarDetailModal(currentCar)}
              id="hero-btn-view-details"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, delay: 0.4, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.05, 
                y: -7, 
                borderColor: "#67eb34",
                boxShadow: "0 0 35px rgba(103,235,52,0.55)",
                transition: { type: "spring", stiffness: 400, damping: 14 }
              }}
              whileTap={{ 
                scale: 0.94,
                transition: { type: "spring", stiffness: 500, damping: 15 }
              }}
              className="relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#072d17]/95 hover:bg-[#0e4b26] border-2 border-emerald-500/60 text-white font-bold text-base sm:text-lg transition-colors duration-200 cursor-pointer backdrop-blur-xl shadow-lg"
            >
              <Eye className="w-5 h-5 text-[#67eb34] animate-pulse" />
              <span>Ficha Técnica & Colores</span>
            </motion.button>

            {/* CTA 3: Ver Todo el Inventario */}
            <motion.button
              type="button"
              onClick={onScrollToInventory}
              id="hero-btn-explore-inventory"
              whileHover={{ x: 6, scale: 1.05, color: "#67eb34" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              className="text-sm sm:text-base font-bold text-slate-200 hover:text-[#67eb34] transition-colors inline-flex items-center gap-2 py-3 px-3 rounded-full hover:bg-emerald-950/40 cursor-pointer"
            >
              <span>Ver los 8 autos en stock</span>
              <ChevronRight className="w-4 h-4 animate-arrow-bounce" />
            </motion.button>
          </div>

          {/* ========================================================================= */}
          {/* 5. INTERACTIVE CAR SELECTOR PILLS (EXPANDED ACROSS SCREEN & BOUNCY)       */}
          {/* ========================================================================= */}
          <div className="mt-12 pt-8 border-t border-emerald-900/50 w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm sm:text-base font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#67eb34] animate-spin" style={{ animationDuration: '6s' }} />
                Selecciona Modelo Destacado:
              </span>
              <span className="text-sm text-emerald-400 font-mono font-bold">
                {activeCarIndex + 1} de {heroCars.length} unidades insignia
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
                      scale: 1.04, 
                      y: -4,
                      transition: { type: "spring", stiffness: 450, damping: 14 }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { type: "spring", stiffness: 500, damping: 15 }
                    }}
                    className={`flex flex-col text-left p-4 sm:p-4.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#0e3b20] border-2 border-[#67eb34] text-white shadow-[0_0_25px_rgba(103,235,52,0.5)] ring-2 ring-[#67eb34]/40'
                        : 'bg-[#031a0e]/80 hover:bg-[#072917] border-2 border-emerald-900/60 text-slate-300 hover:text-white hover:border-emerald-600'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-extrabold text-sm sm:text-base truncate text-slate-100">{car.name}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 text-emerald-300 border border-emerald-500/30">{car.specs.acceleration0to100}s</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold mt-1">
                      <span className={isActive ? 'text-[#67eb34]' : 'text-emerald-400'}>
                        ${car.priceUSD.toLocaleString()} USD
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans font-medium">{car.specs.horsepower} HP</span>
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
