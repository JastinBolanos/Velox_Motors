<div align="center">

# 🏎️ Velox Motors
### Luxury & Futuristic Hypercar Digital Showroom

An interactive, high-performance client-side web application crafted to showcase exotic sports cars, track-focused hypercars, and next-generation electric vehicles.

<br/>

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=feather&logoColor=white)](https://lucide.dev/)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5_Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

<br/>

</div>

---

## 🌟 Key Features & Accomplishments

Developed with meticulous attention to detail, performance, and user experience, Velox Motors delivers a full-featured client-side showroom experience:

### 1. 🌌 Atmospheric Visuals & Real-Time Neon Rain (`NeonRainEffect`)
* **Cyber-Green Canvas Particle Engine**: Built directly on the native HTML5 Canvas API, rendering illuminated rainfall, luminescent light trails, ambient floating orbs, and dynamic impact splashes at a silky-smooth 60 FPS with minimal GPU overhead.
* **User Intensity Controls**: Visitors can toggle intensity profiles between *Intense*, *Elegant*, *Subtle*, or pause the animation entirely according to personal preference or hardware performance.
* **Distinctive Color Palette**: Rich, deep blacks (`#020a06`) layered with emerald undertones and high-contrast laser lime neons (`#67eb34`).

### 2. ⚡ Cinematic Hero Section
* **Dynamic Flagship Vehicle Switcher**: Interactive browsing of the dealership's highlighted halo models in real time.
* **Instant Live Telemetry**: Dynamic performance metrics including 0–100 km/h acceleration, engine horsepower (HP), top speed (km/h), and drivetrain layout.
* **High-Impact Quick Actions**: Direct entry points to book a private track test drive, inspect the full inventory, or jump into the financing simulator.

### 3. 🔍 Interactive Showroom Inventory
* **Category Filtering**: Seamlessly filter between Hypercars, Pure Electric, Performance Sports Cars, Prototypes/Concepts, and the entire catalog.
* **Real-Time Instant Search**: Live query filtering across model names, manufacturers, or key technical specifications.
* **Multi-Criteria Sorting**: Sort by price (low-to-high or high-to-low), raw horsepower, or fastest acceleration times.
* **Informative Vehicle Cards**: Real-time availability badges (*Available Immediately*, *Limited Edition*, *Custom Order*), estimated monthly leasing figures, and rapid access to full technical sheets.

### 4. 📋 Comprehensive Vehicle Detail Modal (`CarDetailModal`)
* **Interactive Media Gallery**: High-resolution exterior and interior angles with responsive thumbnail switching.
* **Bespoke Color & Finish Selector**: Real-time exterior paint configurator previewing bespoke tones and contrasting accents.
* **Full Specification Sheet**: Model year, curb weight, transmission architecture, powertrain/battery capacity (kWh), and performance ratings.
* **Highlighted Equipment & Tech**: Detailed breakdown of driver assist systems, active aerodynamics, telemetry hardware, and handcrafted interior appointments.

### 5. 🧮 Interactive Financing & Lease Calculator (`FinancingCalculator`)
* **Flexible Parametric Simulation**: Custom sliders for down payment percentages (10% to 60%), loan terms (24, 36, 48, 60, and 72 months), and annual interest rates.
* **Transparent Breakdown**: Automatic real-time recalculation of estimated monthly payments, projected interest costs, and total vehicle investment.
* **Direct Inventory Integration**: Select "Calculate Financing" from any vehicle card or technical modal to automatically load that vehicle's pricing into the calculator.

### 6. 📅 VIP Booking & Reservation Suite
* **VIP Test Drive Agendament (`TestDriveModal`)**: Multi-step booking form allowing clients to choose a private track location, preferred date, time slot, and personal contact details, with instant visual confirmation and pass generation.
* **Online Unit Reservation (`ReservationModal`)**: Exclusive reservation flow to secure allocated units with generated security confirmation tokens.

### 7. 🛡️ White-Glove Services & Verified Client Testimonials
* **VIP Ownership Experience**: Highlighted services including enclosed door-to-door carrier transport, bespoke personalization programs, global concierge warranty, and private wealth advisory.
* **Collector Reviews**: Authentic community feedback featuring verified buyer roles, 5-star ratings, timestamps, and ownership impressions.

---

## 🛠️ Technology Stack & Tools

* **React 19**: Modern declarative UI framework utilizing functional components, custom hooks, and optimized state handling.
* **TypeScript**: Strict type definitions and interfaces for all vehicle specifications, financing parameters, and booking records.
* **Vite 8**: Ultra-fast development server with optimized production bundling.
* **Tailwind CSS v4**: Modern, utility-first CSS styling enabling rapid, responsive layout composition without bloated style sheets.
* **Motion (`motion/react`)**: Hardware-accelerated transitions and interactive micro-animations.
* **Lucide React**: Clean, lightweight, and scalable SVG iconography.
* **HTML5 Canvas API**: Native 2D canvas context for rendering high-frame-rate particle effects efficiently.

---

## 📁 Project Architecture

```text
├── index.html                  # HTML entry point with Plus Jakarta Sans & Outfit typography
├── package.json                # Dependencies and build scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite configuration and Tailwind plugins
├── src/
│   ├── main.tsx                # React application bootstrap
│   ├── App.tsx                 # Root layout and global state orchestration
│   ├── index.css               # Global Tailwind directives & custom keyframe animations
│   ├── types.ts                # Shared TypeScript interfaces (CarItem, CarSpecs, etc.)
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navigation bar with backdrop blur
│   │   ├── HeroSection.tsx     # Cinematic hero banner with HUD telemetry
│   │   ├── InventorySection.tsx # Vehicle catalog grid with search, filter, and sort
│   │   ├── CarDetailModal.tsx  # Detailed technical specifications, gallery & color picker
│   │   ├── FinancingCalculator.tsx # Dynamic lease & financing calculator
│   │   ├── TestDriveModal.tsx  # VIP test drive appointment modal
│   │   ├── ReservationModal.tsx# Unit reservation modal
│   │   ├── DealershipServicesSection.tsx # Concierge and ownership services
│   │   ├── ClientReviewsSection.tsx # Verified buyer and collector testimonials
│   │   ├── Footer.tsx          # Dealership branding, contacts, and legal notices
│   │   ├── NeonRainEffect.tsx  # Canvas-based cyber-green ambient particle rain
│   │   └── ServiceIcons.tsx    # Icon rendering helper
│   └── data/
│       └── carsData.ts         # Vehicle inventory database and specifications
```

---

## 🚀 Getting Started & Local Development

To run this project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JastinBolanos/Velox_Motors.git
   cd Velox_Motors
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Type check & lint**:
   ```bash
   npm run lint
   ```

---

## 🤝 Acknowledgments & Closing Thoughts

Velox Motors is a passion project focused on pushing the boundaries of what a modern, aesthetic, and responsive frontend can feel like. Every layout choice, spacing calculation, color harmony, and micro-animation was tuned with care to create an interface that is as exhilarating as the hypercars it represents, while keeping the user experience simple, accessible, and fast.

Thank you for exploring **Velox Motors**!
