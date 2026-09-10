import React from 'react';
import { Instagram, Sparkles, ArrowUp, Heart, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { openSizingModal } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#120F0E] text-[#FAF8F5] pt-20 pb-12 border-t border-[#2A2523]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#2A2523]">
          
          {/* Brand Manifesto Col (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-serif-luxury text-3xl tracking-[0.2em] font-normal text-white block">
                ÉCRIN
              </span>
              <span className="text-[10px] uppercase tracking-[0.45em] text-[#83766E] font-medium block -mt-1">
                ATELIER DE MANUCURE
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#9E928B] leading-relaxed max-w-sm font-light">
              Crafting haute couture press-on nails with multi-ply architectural strength and salon-grade pigment. Designed in Paris & New York.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#C8BAA6]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Worldwide Express Shipping Available</span>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4A392] block">
              Shop Collections
            </span>
            <ul className="space-y-2.5 text-xs text-[#9E928B]">
              <li>
                <button onClick={() => scrollToSection('collections')} className="hover:text-white transition-colors">
                  All Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('collections')} className="hover:text-white transition-colors">
                  Glazed & Chrome
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('collections')} className="hover:text-white transition-colors">
                  3D Artisan Charms
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('collections')} className="hover:text-white transition-colors">
                  Bridal Atelier
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('customizer')} className="hover:text-white transition-colors">
                  Bespoke Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Care & Guidance */}
          <div className="space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4A392] block">
              Care & Help
            </span>
            <ul className="space-y-2.5 text-xs text-[#9E928B]">
              <li>
                <button onClick={openSizingModal} className="hover:text-white transition-colors">
                  Interactive Sizing Guide
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">
                  How To Apply (8-Min)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">
                  Removal & Reusability
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Shipping & Returns (Free 14-Day)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: The Maison */}
          <div className="space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4A392] block">
              The Maison
            </span>
            <ul className="space-y-2.5 text-xs text-[#9E928B]">
              <li>
                <button onClick={() => scrollToSection('craftsmanship')} className="hover:text-white transition-colors">
                  Quad-Layer Engineering
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('reviews')} className="hover:text-white transition-colors">
                  Editorial & Press
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Sustainability & Leaping Bunny
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Salon Wholesale Partnering
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Concierge: care@ecrin-atelier.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#83766E]">
          <div className="flex items-center gap-6">
            <span>© 2026 ÉCRIN ATELIER. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-white transition-colors text-xs uppercase tracking-wider"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
