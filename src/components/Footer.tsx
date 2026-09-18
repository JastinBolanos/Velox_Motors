import React, { useState } from 'react';
import { Car, Phone, Mail, MapPin, ArrowRight, Shield, Check, Globe } from 'lucide-react';

interface FooterProps {
  onOpenTestDriveModal: () => void;
  onScrollToInventory: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTestDriveModal,
  onScrollToInventory,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer className="w-full bg-[#010905] border-t-2 border-emerald-950 text-slate-300 text-sm">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-20">
        
        {/* Top Newsletter CTA Banner - Wider & Bigger */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#031c10] via-[#02130a] to-[#010a05] border-2 border-emerald-500/40 mb-16 flex flex-col xl:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <div className="space-y-2 text-center xl:text-left max-w-3xl">
            <span className="text-xs sm:text-sm font-black text-[#67eb34] uppercase tracking-wider">
              Club Privado Velox Motors
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              Recibe Avisos de Unidades Exclusivas Antes del Lanzamiento Público
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">
              Acceso prioritario a hiperdeportivos de edición limitada y eventos privados en circuito.
            </p>
          </div>

          <div className="w-full xl:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-emerald-950/90 border-2 border-emerald-500/60 text-[#67eb34] font-bold text-sm sm:text-base animate-fadeIn shadow-lg">
                <Check className="w-5 h-5" />
                <span>¡Suscrito con éxito al boletín para coleccionistas!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-[480px]">
                <input
                  type="email"
                  required
                  placeholder="Tu correo de contacto..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-full bg-[#020d07] border-2 border-emerald-900/80 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-[#67eb34]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#67eb34] hover:bg-[#7bf04c] text-black font-black text-sm uppercase tracking-wider shrink-0 transition-colors cursor-pointer shadow-lg"
                >
                  Unirme
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Directory Grid - Expanded */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-[#021008] border-2 border-emerald-500/50 flex items-center justify-center shadow-md">
                <Car className="w-6 h-6 text-[#67eb34]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl text-white tracking-wider">
                  VELOX <span className="text-[#67eb34]">MOTORS</span>
                </span>
                <span className="text-[10px] tracking-widest text-emerald-400 font-bold uppercase">
                  Exotic & Hypercars
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              El concesionario boutique de referencia mundial para la adquisición de hiperdeportivos, superautos eléctricos y prototipos de colección.
            </p>

            <div className="flex items-center gap-2.5 text-emerald-400 font-mono text-sm font-semibold">
              <Globe className="w-5 h-5" />
              <span>Entregas Globales en Contenedor Seguro</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-white">Navegación Rápida</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={onScrollToInventory} className="hover:text-[#67eb34] transition-colors cursor-pointer text-left font-medium">
                  Catálogo de Vehículos en Stock
                </button>
              </li>
              <li>
                <a href="#financing" className="hover:text-[#67eb34] transition-colors font-medium">
                  Calculadora y Leasing VIP
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#67eb34] transition-colors font-medium">
                  Garantía 5 Años y Entrega a Domicilio
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#67eb34] transition-colors font-medium">
                  Reseñas de Propietarios
                </a>
              </li>
              <li>
                <button onClick={onOpenTestDriveModal} className="text-[#67eb34] font-bold hover:underline cursor-pointer">
                  Agendar Test Drive en Circuito →
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Locations */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-white">Showrooms & Lounges</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#67eb34] shrink-0 mt-0.5" />
                <span><strong>Madrid:</strong> Paseo de la Castellana 180, Experiencia Jarama.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#67eb34] shrink-0 mt-0.5" />
                <span><strong>Miami:</strong> Brickell Avenue 1200, Biscayne Bay Lounge.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#67eb34] shrink-0 mt-0.5" />
                <span><strong>CDMX:</strong> Campos Elíseos 204, Polanco Private VIP.</span>
              </div>
            </div>
          </div>

          {/* Concierge Contact */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-white">Atención Concierge 24/7</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#67eb34]" />
                <a href="tel:18008356968" className="hover:text-white font-mono text-white font-bold text-base">
                  +1 (800) VELOX-AUTO
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#67eb34]" />
                <a href="mailto:vip@veloxmotors.com" className="hover:text-white font-medium">
                  concierge@veloxmotors.com
                </a>
              </div>
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                Horario de atención física en salones: Lunes a Sábado de 09:00 a 20:00 (Cita previa recomendada).
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Velox Motors International S.L. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-slate-200">Aviso Legal</a>
            <a href="#home" className="hover:text-slate-200">Política de Privacidad</a>
            <a href="#home" className="hover:text-slate-200">Certificación de Emisiones</a>
            <a href="#home" className="hover:text-slate-200">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
