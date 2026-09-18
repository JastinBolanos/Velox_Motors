import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InventorySection } from './components/InventorySection';
import { FinancingCalculator } from './components/FinancingCalculator';
import { DealershipServicesSection } from './components/DealershipServicesSection';
import { ClientReviewsSection } from './components/ClientReviewsSection';
import { Footer } from './components/Footer';
import { CarDetailModal } from './components/CarDetailModal';
import { TestDriveModal } from './components/TestDriveModal';
import { ReservationModal } from './components/ReservationModal';
import { CarItem } from './types';
import { CARS_DATA } from './data/carsData';
import { NeonRainEffect } from './components/NeonRainEffect';

export default function App() {
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<CarItem | null>(null);
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState<boolean>(false);
  const [testDriveCarId, setTestDriveCarId] = useState<string | undefined>(undefined);
  const [reservationCar, setReservationCar] = useState<CarItem | null>(null);

  // Quick action helpers
  const handleOpenTestDrive = (carId?: string) => {
    setTestDriveCarId(carId || CARS_DATA[0].id);
    setIsTestDriveModalOpen(true);
  };

  const handleOpenReservation = (car: CarItem) => {
    setReservationCar(car);
  };

  const handleScrollToInventory = () => {
    const el = document.getElementById('inventory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToFinancing = () => {
    const el = document.getElementById('financing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020a06] text-slate-100 flex flex-col font-sans selection:bg-[#67eb34] selection:text-black relative">
      
      {/* Intense Premium Cyber Green Rain Atmospheric Canvas */}
      <NeonRainEffect defaultIntensity="intense" />

      {/* 1. Global Luxury Dealership Navigation */}
      <Navbar
        onOpenTestDriveModal={handleOpenTestDrive}
        onOpenFinancingModal={handleScrollToFinancing}
        onScrollToInventory={handleScrollToInventory}
      />

      {/* 2. Cinematic Hero Section with HUD Telemetry & Dynamic Vehicle Selector */}
      <HeroSection
        onOpenTestDriveModal={handleOpenTestDrive}
        onOpenCarDetailModal={(car) => setSelectedCarForDetail(car)}
        onScrollToInventory={handleScrollToInventory}
        onScrollToFinancing={handleScrollToFinancing}
      />

      {/* 3. Main Car Showroom & Inventory */}
      <main className="flex-1 w-full space-y-12">
        
        {/* Car Inventory Grid (with Filters, Search & Sort) */}
        <InventorySection
          onOpenCarDetailModal={(car) => setSelectedCarForDetail(car)}
          onOpenTestDriveModal={handleOpenTestDrive}
          onOpenFinancingForCar={(car) => {
            handleScrollToFinancing();
          }}
        />

        {/* Interactive Financing & Leasing Calculator */}
        <FinancingCalculator
          preselectedCar={selectedCarForDetail}
          onOpenTestDriveModal={handleOpenTestDrive}
        />

        {/* VIP Ownership Services (Warranty, Delivery, Bespoke, Fiscal) */}
        <DealershipServicesSection
          onOpenTestDriveModal={() => handleOpenTestDrive()}
        />

        {/* Collector Reviews & Real Client Testimonials */}
        <ClientReviewsSection />

      </main>

      {/* 4. Luxury Dealership Footer */}
      <Footer
        onOpenTestDriveModal={() => handleOpenTestDrive()}
        onScrollToInventory={handleScrollToInventory}
      />

      {/* Interactive Modals */}
      <CarDetailModal
        car={selectedCarForDetail}
        onClose={() => setSelectedCarForDetail(null)}
        onOpenTestDrive={(carId) => handleOpenTestDrive(carId)}
        onOpenReservation={(car) => handleOpenReservation(car)}
      />

      <TestDriveModal
        isOpen={isTestDriveModalOpen}
        onClose={() => setIsTestDriveModalOpen(false)}
        preselectedCarId={testDriveCarId}
      />

      <ReservationModal
        isOpen={!!reservationCar}
        car={reservationCar}
        onClose={() => setReservationCar(null)}
      />

    </div>
  );
}
