import React, { useState } from 'react';
import { Phone, ChevronDown, ArrowRight, Menu, X, Shield, Sparkles, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VeloxLogo } from './VeloxLogo';

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
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/40 bg-[#020e07]/90 backdrop-blur-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)]" id="main-navigation">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand Logo - Bespoke Apex Hypercar Crest & Typography */}
        <a href="#home" className="group cursor-pointer" id="brand-logo" aria-label="Velox Motors Home">
          <VeloxLogo size="md" variant="full" tagline="EXOTIC & HYPERCARS SHOWROOM" />
        </a>

        {/* Center Desktop Navigation Links - Compact font and spacing */}
        <nav className="hidden xl:flex items-center gap-6 lg:gap-7 text-xs sm:text-sm font-semibold text-slate-200" aria-label="Main Navigation">
          
          {/* Home Link */}
          <div className="relative py-1.5">
            <a 
              href="#home" 
              className="text-[#67eb34] font-bold transition-colors hover:text-[#7bf04c]"
              id="nav-link-home"
            >
              Inicio
            </a>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#67eb34] shadow-[0_0_8px_#67eb34] rounded-full" />
          </div>

          {/* Inventario with Hover Dropdown */}
          <div 
            className="relative py-1.5"
            onMouseEnter={() => setInventoryDropdownOpen(true)}
            onMouseLeave={() => setInventoryDropdownOpen(false)}
          >
            <button 
              type="button"
              onClick={onScrollToInventory}
              className="flex items-center gap-1.5 hover:text-[#67eb34] transition-colors cursor-pointer font-semibold"
              id="nav-dropdown-inventory"
              aria-expanded={inventoryDropdownOpen}
            >
              <span>Inventario Exclusivo</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${inventoryDropdownOpen ? 'rotate-180 text-[#67eb34]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {inventoryDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-64 pt-2 z-50"
                >
                  <div className="bg-[#04190e] border border-emerald-500/40 rounded-xl p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(103,235,52,0.15)] backdrop-blur-2xl">
                    <button
                      onClick={() => { onScrollToInventory(); setInventoryDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm text-white hover:text-[#67eb34] hover:bg-emerald-950/70 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#67eb34]" />
                        <span className="font-bold">Ver Todo el Stock</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-[#67eb34] border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold">8 Autos</span>
                    </button>

                    <button
                      onClick={() => { onScrollToInventory(); setInventoryDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-[#67eb34] hover:bg-emerald-950/70 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Hypercars & V10</span>
                      <span className="text-[10px] text-slate-400 font-mono">+600 HP</span>
                    </button>

                    <button
                      onClick={() => { onScrollToInventory(); setInventoryDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-[#67eb34] hover:bg-emerald-950/70 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Superdeportivos Eléctricos</span>
                      <span className="text-[10px] text-emerald-400 font-mono">800V Ultra</span>
                    </button>

                    <button
                      onClick={() => { onScrollToInventory(); setInventoryDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-[#67eb34] hover:bg-emerald-950/70 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Prototipos Futuristas</span>
                      <span className="text-[10px] text-amber-400 font-mono">Limitada</span>
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
        <div className="hidden sm:flex items-center gap-4">
          {/* VIP Concierge Phone */}
          <div className="flex items-center gap-2.5" id="concierge-phone-badge">
            <div className="w-8 h-8 rounded-full bg-[#072917] border border-[#22c55e]/40 flex items-center justify-center text-[#52e32a] shadow-[0_0_10px_rgba(34,197,94,0.25)]">
              <Phone className="w-3.5 h-3.5 text-[#52e32a]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-emerald-300 font-bold tracking-wider uppercase leading-none">
                Concierge Privado 24/7
              </span>
              <a 
                href="tel:18008356968" 
                className="text-xs font-bold text-white tracking-wide hover:text-[#67eb34] transition-colors mt-0.5 leading-tight font-mono"
              >
                +1 (800) VELOX-AUTO
              </a>
            </div>
          </div>

          {/* Test Drive CTA Button with Compact Bounce */}
          <motion.button
            type="button"
            onClick={() => onOpenTestDriveModal()}
            id="btn-nav-test-drive"
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
            whileHover={{ 
              scale: 1.05, 
              y: -3, 
              boxShadow: "0 0 30px rgba(103,235,52,0.85), 0 0 10px rgba(255,255,255,0.3)",
              transition: { type: "spring", stiffness: 400, damping: 12 }
            }}
            whileTap={{ 
              scale: 0.94, 
              y: 0,
              transition: { type: "spring", stiffness: 500, damping: 15 }
            }}
            className="group relative overflow-hidden inline-flex items-center gap-2 px-4.5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#67eb34] via-[#4ade80] to-[#22c55e] text-black font-extrabold text-xs tracking-wide uppercase transition-all duration-200 shadow-[0_0_20px_rgba(103,235,52,0.5)] cursor-pointer"
          >
            {/* Luminous sheen wave */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-sheen pointer-events-none" />

            <Calendar className="w-3.5 h-3.5 text-black stroke-[2.5] relative z-10" />
            <span className="relative z-10">Agendar Test Drive</span>
            <div className="relative z-10 w-4.5 h-4.5 rounded-full bg-black/15 flex items-center justify-center group-hover:bg-black/25 group-hover:scale-105 transition-transform">
              <ArrowRight className="w-2.5 h-2.5 text-black stroke-[3] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="xl:hidden flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => onOpenTestDriveModal()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 rounded-full bg-[#67eb34] text-black font-extrabold text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(103,235,52,0.5)] cursor-pointer"
          >
            Test Drive
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-[#072917] border border-emerald-500/40 text-white hover:text-[#67eb34] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
