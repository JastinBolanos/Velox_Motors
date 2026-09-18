export type CarCategory = 'all' | 'hypercars' | 'electric' | 'sports' | 'concepts';

export interface CarSpecs {
  horsepower: number; // e.g. 1020 HP
  acceleration0to100: number; // e.g. 2.1 s
  topSpeed: number; // km/h e.g. 350
  rangeOrEngine: string; // e.g. '680 km (Batería 110 kWh)' or 'V10 Twin-Turbo 5.2L'
  drivetrain: 'AWD Dual Motor' | 'AWD Tri-Motor' | 'RWD Performance' | 'Quattro AWD';
  transmission: string;
  weight: string;
  year: number;
}

export interface CarColorOption {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
}

export interface CarItem {
  id: string;
  name: string;
  tagline: string;
  brand: string;
  category: CarCategory;
  priceUSD: number;
  monthlyLeaseEst: number;
  badge: string;
  status: 'Disponible Inmediato' | 'Unidad Exclusiva' | 'Edición Limitada' | 'Bajo Pedido';
  featuredImage: string;
  gallery: string[];
  specs: CarSpecs;
  description: string;
  highlights: string[];
  colors: CarColorOption[];
}

export interface TestDriveBooking {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredLocation: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  confirmedAt: string;
}

export interface FinancingParams {
  vehiclePrice: number;
  downPaymentPercent: number; // 10 to 60
  termMonths: number; // 24, 36, 48, 60, 72
  interestRateAnnual: number; // e.g. 4.9%
}

export interface DealershipService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  iconName: 'shield' | 'truck' | 'sparkles' | 'credit-card';
}

export interface ClientReview {
  id: string;
  author: string;
  title: string;
  role: string;
  location: string;
  carBought: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}
