import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialOffers } from './components/SpecialOffers';
import { ComboZone } from './components/ComboZone';
import { MenuSection } from './components/MenuSection';
import { DrinksSection } from './components/DrinksSection';
import { CustomBuilder } from './components/CustomBuilder';
import { BektemirMapDelivery } from './components/BektemirMapDelivery';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Toast } from './components/Toast';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section with 25-min delivery in Bektemir badges & photography */}
        <Hero />

        {/* 2. Special Offers & Promo Codes */}
        <SpecialOffers />

        {/* 3. Multi-Tiered Combo Deals Section (Rich Food Bundles with Slot Customizer) */}
        <ComboZone />

        {/* 4. Interactive Menu & Food Filtering (Without drinks) */}
        <MenuSection />

        {/* 5. Custom Food Builder (DIY Burger, Hamburger, Lavash, Doner, Club Sandwich) */}
        <CustomBuilder />

        {/* 6. Bektemir District Interactive Map & Delivery Zone Calculator */}
        <BektemirMapDelivery />

        {/* 7. Dedicated "Drinks & Coffeehouse" Section (Placed at the bottom of the page) */}
        <DrinksSection />

        {/* 8. Customer Testimonials & Social Proof */}
        <ReviewsSection />

        {/* 9. Location & Contact Section (Bektemir district focus, opening hours, phones) */}
        <LocationContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
