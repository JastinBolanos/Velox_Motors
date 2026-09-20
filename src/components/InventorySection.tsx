import React, { useState, useMemo } from 'react';
import { Search, Filter, Zap, Gauge, ArrowRight, Eye, Calendar, Sparkles, Check, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CARS_DATA } from '../data/carsData';
import { CarItem, CarCategory } from '../types';

interface InventorySectionProps {
  onOpenCarDetailModal: (car: CarItem) => void;
  onOpenTestDriveModal: (carId: string) => void;
  onOpenFinancingForCar: (car: CarItem) => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  onOpenCarDetailModal,
  onOpenTestDriveModal,
  onOpenFinancingForCar,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'power-desc' | 'accel-asc'>('featured');

  const categories: { id: CarCategory; label: string }[] = [
    { id: 'all', label: 'All Models' },
    { id: 'hypercars', label: 'Hypercars & V10' },
    { id: 'electric', label: '100% Electric EV' },
    { id: 'sports', label: 'GT Sports' },
    { id: 'concepts', label: 'Concepts & Prototypes' },
  ];

  const filteredCars = useMemo(() => {
    let result = CARS_DATA.filter((car) => {
      const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.tagline.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'power-desc':
        result.sort((a, b) => b.specs.horsepower - a.specs.horsepower);
        break;
      case 'accel-asc':
        result.sort((a, b) => a.specs.acceleration0to100 - b.specs.acceleration0to100);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1920px] mx-auto" id="inventory">
      
      {/* Section Header with Refined Typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs font-bold text-[#67eb34] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Available Showroom Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67eb34] via-[#86efac] to-emerald-400">Exclusive Inventory</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Every vehicle is rigorously curated according to elite motorsport and luxury standards. Ready for immediate delivery with an official 5-year warranty.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-[#041d10] border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#67eb34] animate-pulse" />
            <span className="font-bold">{filteredCars.length} of {CARS_DATA.length} Vehicles Available</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls Bar - Compact & Balanced */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#03170e]/90 border border-emerald-950/80 backdrop-blur-2xl mb-8 flex flex-col xl:flex-row items-center justify-between gap-4 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ 
                  scale: 1.04, 
                  y: -1,
                  transition: { type: "spring", stiffness: 450, damping: 14 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#154728] border border-[#67eb34] text-[#67eb34] shadow-[0_0_15px_rgba(103,235,52,0.4)]'
                    : 'bg-[#020e07] hover:bg-[#062413] border border-emerald-900/60 text-slate-200 hover:text-white'
                }`}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Search Input & Sorter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-emerald-500/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by make, model, or spec..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#67eb34] focus:ring-1 focus:ring-[#67eb34]"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-52 px-3 py-2 rounded-xl bg-[#020d07] border border-emerald-900/70 text-xs sm:text-sm font-semibold text-slate-200 focus:outline-none focus:border-[#67eb34] cursor-pointer"
            >
              <option value="featured">Velox Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="power-desc">Power: Highest HP</option>
              <option value="accel-asc">Acceleration: Fastest 0-100</option>
            </select>
          </div>
        </div>

      </div>

      {/* Grid of Car Cards - Extended Across Screen */}
      {filteredCars.length === 0 ? (
        <div className="py-24 text-center rounded-3xl bg-[#03150d] border-2 border-emerald-950/80">
          <p className="text-slate-300 text-lg">No vehicles found matching your search criteria.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-6 px-6 py-3 rounded-2xl bg-emerald-500/20 text-[#67eb34] border border-emerald-500/40 text-sm font-bold hover:bg-emerald-500/30 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative flex flex-col rounded-2xl bg-gradient-to-b from-[#041a0f] to-[#020e07] border border-emerald-900/50 hover:border-[#67eb34]/70 transition-all duration-300 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_35px_rgba(103,235,52,0.2)] hover:-translate-y-1"
              >
                {/* Car Image with Zoom Effect */}
                <div className="relative w-full h-48 sm:h-52 xl:h-56 overflow-hidden bg-black cursor-pointer" onClick={() => onOpenCarDetailModal(car)}>
                  <img
                    src={car.featuredImage}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.9] group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041a0f] via-transparent to-black/40" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#67eb34] border border-[#67eb34]/50 shadow-md">
                      {car.badge}
                    </span>
                  </div>

                  {/* Brand Tag Top Right */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-950/90 text-slate-200 border border-emerald-800/50 backdrop-blur-md">
                      {car.brand}
                    </span>
                  </div>

                  {/* Quick Peek Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/45 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#67eb34] text-black font-extrabold text-xs shadow-xl transform translate-y-1 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                      <span>View Specs & Colors</span>
                    </span>
                  </div>
                </div>

                {/* Car Information Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      className="text-base sm:text-lg font-black text-white group-hover:text-[#67eb34] transition-colors line-clamp-1 cursor-pointer"
                      onClick={() => onOpenCarDetailModal(car)}
                    >
                      {car.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {car.tagline}
                    </p>

                    {/* Specs Pills */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-950/80 text-center">
                      <div className="bg-[#021008] p-2 rounded-lg border border-emerald-950/80">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">0-100</span>
                        <span className="text-xs sm:text-sm font-black text-white font-mono">{car.specs.acceleration0to100}s</span>
                      </div>
                      <div className="bg-[#021008] p-2 rounded-lg border border-emerald-950/80">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Power</span>
                        <span className="text-xs sm:text-sm font-black text-[#67eb34] font-mono">{car.specs.horsepower} HP</span>
                      </div>
                      <div className="bg-[#021008] p-2 rounded-lg border border-emerald-950/80">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Top Speed</span>
                        <span className="text-xs sm:text-sm font-black text-white font-mono">{car.specs.topSpeed} km/h</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Primary Action Buttons */}
                  <div className="mt-4 pt-3.5 border-t border-emerald-950/80">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                          Vehicle Price
                        </span>
                        <span className="text-lg sm:text-xl font-black text-white font-mono">
                          ${car.priceUSD.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-medium">Lease estimate</span>
                        <span className="text-xs sm:text-sm font-bold text-[#67eb34] font-mono">
                          ${car.monthlyLeaseEst.toLocaleString()}/mo
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        type="button"
                        onClick={() => onOpenTestDriveModal(car.id)}
                        whileHover={{ 
                          scale: 1.03, 
                          y: -2, 
                          borderColor: "#67eb34",
                          boxShadow: "0 0 15px rgba(103,235,52,0.35)",
                          transition: { type: "spring", stiffness: 400, damping: 14 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0a351d] hover:bg-[#124d2c] border border-emerald-500/40 text-emerald-200 hover:text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#67eb34]" />
                        <span>Test Drive</span>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => onOpenCarDetailModal(car)}
                        whileHover={{ 
                          scale: 1.04, 
                          y: -2, 
                          boxShadow: "0 0 20px rgba(103,235,52,0.75)",
                          transition: { type: "spring", stiffness: 450, damping: 12 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full relative overflow-hidden inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-[#67eb34] via-[#4ade80] to-[#22c55e] text-black text-xs font-extrabold tracking-wide uppercase shadow-[0_0_15px_rgba(103,235,52,0.35)] cursor-pointer"
                      >
                        <span className="relative z-10">Details</span>
                        <ArrowRight className="w-3 h-3 text-black stroke-[2.5] relative z-10" />
                      </motion.button>
                    </div>

                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

    </section>
  );
};
