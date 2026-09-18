import React, { useState } from 'react';
import { Phone, ChevronDown, ArrowRight, Menu, X, Car, Shield, Sparkles, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenTestDriveModal: (carId?: string) => void;
  onOpenFinancingModal?: () => void;
  onScrollToInventory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTestDriveModal,
  onOpenFinancingModal,
  onScrollToInventory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inventoryDropdownOpen, setInventoryDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/40 bg-[#020e07]/90 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6)]" id="main-navigation">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 h-24 flex items-center justify-between">
        
        {/* Brand Logo - Bigger and bolder */}
        <a href="#home" className="flex items-center gap-4 group cursor-pointer" id="brand-logo">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500/25 via-[#062916] to-[#021008] border-2 border-emerald-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(103,235,52,0.35)] group-hover:border-[#67eb34] group-hover:shadow-[0_0_30px_rgba(103,235,52,0.6)] transition-all duration-300">
            <Car className="w-6 h-6 sm:w-7 sm:h-7 text-[#67eb34] transform group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#67eb34] shadow-[0_0_10px_#67eb34] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wider text-2xl sm:text-3xl text-white font-sans">
                VELOX
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#67eb34] tracking-widest">
                MOTORS
              </span>
            </div>
            <span className="text-xs tracking-[0.3em] text-emerald-400 font-bold uppercase">
              Exotic & Hypercars Showroom
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation Links - Larger text and spacing */}
        <nav className="hidden xl:flex items-center gap-10 text-base lg:text-lg font-semibold text-slate-200" aria-label="Main Navigation">
          
          {/* Home Link */}
          <div className="relative py-2">
            <a 
              href="#home" 
              className="text-[#67eb34] font-bold transition-colors hover:text-[#7bf04c]"
              id="nav-link-home"
            >
              Inicio
            </a>
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#67eb34] shadow-[0_0_10px_#67eb34] rounded-full" />
          </div>

          {/* Inventario with Hover Dropdown */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setInventoryDropdownOpen(true)}
            onMouseLeave={() => setInventoryDropdownOpen(false)}
          >
            <button 
              type="button"
              onClick={onScrollToInventory}
              className="flex items-center gap-2 hover:text-[#67eb34] transition-colors cursor-pointer font-semibold"
              id="nav-dropdown-inventory"
              aria-expanded={inventoryDropdownOpen}
            >
              <span>Inventario Exclusivo</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-slate-400 ${inventoryDropdownOpen ? 'rotate-180 text-[#67eb34]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {inventoryDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-72 pt-3 z-50"
                >
                  <div className="bg-[#04190e] border-2 border-emerald-500/40 rounded-2xl p-3 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(103,235,52,0.2)] backdrop-blur-2xl">
                    <button
                      onClick={() => { onScrollToInventory(); setInventoryDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-xl text-base text-white hover:text-[#67eb34] hover:bg-emerald-950/70 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-5 h-5 text-[#67eb34]" />
                        <span className="font-bold">Ver Todo el Stock</span>
                      </div>
                      <span className="text-xs bg-emerald-500/20 text-[#67eb34] border border-emerald-500/40 px-2.5 py-1 rounded-full font-mono font-bold">8 Autos</span>
                    </button>

                    <button
                      onClick={() => { onScrollToInventory(); setInventoryDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-200 hover:text-[#67eb34] hover:bg-emerald-950/70 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Hypercars & V10</span>
                      <span className="text-xs text-slate-400 font-mono">+600 HP</span>
                    </button>

                    <button
                      onClick={() => { onScrollToInventory(); setInventoryDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-200 hover:text-[#67eb34] hover:bg-emerald-950/70 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Superdeportivos Eléctricos</span>
                      <span className="text-xs text-emerald-400 font-mono">800V Ultra</span>
                    </button>

                    <button
                      onClick={() => { onScrollToInventory(); setInventoryDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-200 hover:text-[#67eb34] hover:bg-emerald-950/70 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Prototipos Futuristas</span>
                      <span className="text-xs text-amber-400 font-mono">Edición Limitada</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Financiamiento */}
          <a href="#financing" className="hover:text-[#67eb34] transition-colors" id="nav-link-financing">
            Simulador de Cuotas
          </a>

          {/* Servicios VIP */}
          <a href="#services" className="hover:text-[#67eb34] transition-colors" id="nav-link-services">
            Servicios VIP
          </a>

          {/* Reseñas / Clientes */}
          <a href="#reviews" className="hover:text-[#67eb34] transition-colors" id="nav-link-reviews">
            Opiniones de Clientes
          </a>
        </nav>

        {/* Right Section: Concierge Phone + Agendar Test Drive Button */}
        <div className="hidden sm:flex items-center gap-6">
          {/* VIP Concierge Phone */}
          <div className="flex items-center gap-3.5" id="concierge-phone-badge">
            <div className="w-12 h-12 rounded-full bg-[#072917] border border-[#22c55e]/50 flex items-center justify-center text-[#52e32a] shadow-[0_0_15px_rgba(34,197,94,0.35)]">
              <Phone className="w-5 h-5 text-[#52e32a]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-emerald-300 font-bold tracking-wider uppercase leading-none">
                Concierge Privado 24/7
              </span>
              <a 
                href="tel:18008356968" 
                className="text-base font-black text-white tracking-wide hover:text-[#67eb34] transition-colors mt-1 leading-tight font-mono"
              >
                +1 (800) VELOX-AUTO
              </a>
            </div>
          </div>

          {/* Test Drive CTA Button with Bounce & Movement */}
          <motion.button
            type="button"
            onClick={() => onOpenTestDriveModal()}
            id="btn-nav-test-drive"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
            whileHover={{ 
              scale: 1.08, 
              y: -6, 
              boxShadow: "0 0 45px rgba(103,235,52,0.95), 0 0 15px rgba(255,255,255,0.4)",
              transition: { type: "spring", stiffness: 400, damping: 12 }
            }}
            whileTap={{ 
              scale: 0.93, 
              y: 1,
              transition: { type: "spring", stiffness: 500, damping: 15 }
            }}
            className="group relative overflow-hidden inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-[#67eb34] via-[#4ade80] to-[#22c55e] text-black font-black text-sm tracking-wide uppercase transition-all duration-200 shadow-[0_0_30px_rgba(103,235,52,0.6)] cursor-pointer"
          >
            {/* Luminous sheen wave */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-sheen pointer-events-none" />

            <Calendar className="w-4 h-4 text-black stroke-[2.5] animate-icon-bob relative z-10" />
            <span className="relative z-10">Agendar Test Drive</span>
            <div className="relative z-10 w-6 h-6 rounded-full bg-black/15 flex items-center justify-center group-hover:bg-black/25 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-black stroke-[3] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="xl:hidden flex items-center gap-3">
          <motion.button
            type="button"
            onClick={() => onOpenTestDriveModal()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="px-4 py-2.5 rounded-full bg-[#67eb34] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(103,235,52,0.6)] cursor-pointer"
          >
            Test Drive
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="p-3 rounded-2xl bg-[#072917] border border-emerald-500/40 text-white hover:text-[#67eb34] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </motion.button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-emerald-900/50 bg-[#021008]/98 backdrop-blur-2xl px-8 py-6 space-y-5 overflow-hidden"
          >
            <div className="space-y-4 text-lg">
              <a 
                href="#home" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-[#67eb34] font-bold py-1"
              >
                Inicio
              </a>
              <button 
                onClick={() => { setMobileMenuOpen(false); onScrollToInventory(); }} 
                className="w-full text-left text-slate-100 hover:text-[#67eb34] font-semibold py-1"
              >
                Inventario de Autos (8 Modelos en Stock)
              </button>
              <a 
                href="#financing" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-slate-100 hover:text-[#67eb34] font-semibold py-1"
              >
                Calculadora Financiera
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-slate-100 hover:text-[#67eb34] font-semibold py-1"
              >
                Servicios & Garantía VIP
              </a>
              <a 
                href="#reviews" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-slate-100 hover:text-[#67eb34] font-semibold py-1"
              >
                Opiniones de Clientes
              </a>
            </div>

            <div className="pt-6 border-t border-emerald-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm text-emerald-300 font-mono">
                <Phone className="w-4 h-4 text-[#67eb34]" />
                <span className="font-bold">+1 (800) VELOX-AUTO</span>
              </div>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTestDriveModal(); }}
                className="px-6 py-3 rounded-full bg-[#67eb34] text-black font-black text-xs shadow-lg uppercase tracking-wider"
              >
                Agendar Cita VIP
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
