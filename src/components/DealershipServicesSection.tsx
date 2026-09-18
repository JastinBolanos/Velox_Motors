import React from 'react';
import { Shield, Truck, Sparkles, CircleDollarSign, CheckCircle2 } from 'lucide-react';
import { DEALERSHIP_SERVICES } from '../data/carsData';

interface DealershipServicesSectionProps {
  onOpenTestDriveModal: () => void;
}

export const DealershipServicesSection: React.FC<DealershipServicesSectionProps> = ({
  onOpenTestDriveModal,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'warranty':
        return <Shield className="w-7 h-7 text-[#67eb34]" />;
      case 'delivery':
        return <Truck className="w-7 h-7 text-[#67eb34]" />;
      case 'customization':
        return <Sparkles className="w-7 h-7 text-[#67eb34]" />;
      case 'financing':
        return <CircleDollarSign className="w-7 h-7 text-[#67eb34]" />;
      default:
        return <Sparkles className="w-7 h-7 text-[#67eb34]" />;
    }
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1920px] mx-auto" id="services">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs sm:text-sm font-bold text-[#67eb34] uppercase tracking-wider mb-4">
          <Shield className="w-4 h-4" />
          Excelencia y Atención Concierge
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Servicios VIP para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67eb34] via-[#86efac] to-emerald-400">Propietarios Velox</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl mt-3 leading-relaxed">
          Comprar un automóvil en Velox Motors es el inicio de una experiencia de propiedad exclusiva, sin fricciones y con soporte 24/7 en cualquier país.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {DEALERSHIP_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="group relative p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#041a0f] to-[#020e07] border-2 border-emerald-900/50 hover:border-[#67eb34]/60 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(103,235,52,0.2)] hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-[#062916] border-2 border-emerald-500/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#67eb34] transition-all duration-300 shadow-[0_0_20px_rgba(103,235,52,0.25)]">
                {getIcon(srv.id)}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#67eb34] transition-colors mb-3">
                {srv.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {srv.description}
              </p>
            </div>

            <div className="pt-5 border-t border-emerald-950/80 space-y-2.5">
              {srv.features?.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#67eb34] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
