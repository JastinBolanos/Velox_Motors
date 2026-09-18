import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { CLIENT_REVIEWS } from '../data/carsData';

export const ClientReviewsSection: React.FC = () => {
  return (
    <section className="w-full py-20 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1920px] mx-auto" id="reviews">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs sm:text-sm font-bold text-[#67eb34] uppercase tracking-wider mb-4">
          <Star className="w-4 h-4 fill-[#67eb34]" />
          Experiencias de Coleccionistas
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          La Confianza de Quienes Conducen el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67eb34] via-[#86efac] to-emerald-400">Futuro</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl mt-3 leading-relaxed">
          Más de 450 superdeportivos entregados en 18 países con un índice de recomendación del 99.4%.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CLIENT_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-8 sm:p-9 rounded-3xl bg-gradient-to-b from-[#041a10] to-[#020e07] border-2 border-emerald-900/50 relative shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between hover:border-[#67eb34]/40 transition-all"
          >
            <Quote className="w-10 h-10 text-emerald-500/20 absolute top-6 right-6" />

            <div>
              {/* Rating stars */}
              <div className="flex items-center gap-1.5 mb-5">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#67eb34] text-[#67eb34]" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed mb-8">
                "{rev.comment}"
              </p>
            </div>

            {/* Client Profile */}
            <div className="flex items-center gap-4 pt-5 border-t border-emerald-950/80">
              <img
                src={rev.avatar}
                alt={rev.author}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/50 shadow-md"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black text-white">{rev.author}</span>
                  <ShieldCheck className="w-4 h-4 text-[#67eb34]" />
                </div>
                <span className="text-xs sm:text-sm text-emerald-400 font-semibold mt-0.5">
                  {rev.carBought}
                </span>
                <span className="text-xs text-slate-400 mt-0.5">
                  {rev.location} • {rev.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
