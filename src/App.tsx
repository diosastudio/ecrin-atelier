import React from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { ScrollSequenceHero } from './components/ScrollSequenceHero';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { CollectionsGrid } from './components/CollectionsGrid';
import { CustomizationSection } from './components/CustomizationSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SocialProofSection } from './components/SocialProofSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SizingModal } from './components/SizingModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast } from './components/Toast';

export function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] flex flex-col font-sans selection:bg-[#EADCD2] selection:text-[#1C1817]">
        {/* Global Navigation */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Scroll-Controlled Hero Animation: Assembled → Exploded Quad-Layer */}
          <ScrollSequenceHero
            framesPath="/frames"
            totalFrames={40}
            framePrefix="frame_"
            frameExtension=".jpg"
          />

          {/* 1. Craftsmanship & Quad-Layer Anatomy */}
          <CraftsmanshipSection />

          {/* 2. Collections Grid Showcase */}
          <CollectionsGrid />

          {/* 3. Bespoke Customization Studio */}
          <CustomizationSection />

          {/* 4. How It Works (8-Min Application & Dual Wear Options) */}
          <HowItWorksSection />

          {/* 5. Social Proof & Editorial Reviews */}
          <SocialProofSection />

          {/* 6. Final Statement & VIP Atelier */}
          <FinalCTASection />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Interactive Drawers & Modals */}
        <CartDrawer />
        <SizingModal />
        <QuickViewModal />
        <Toast />
      </div>
    </CartProvider>
  );
}

export default App;
