import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Instagram, Mail, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FinalCTASection: React.FC = () => {
  const { applyPromo, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    applyPromo('ATELIER15');
    showToast('Welcome to the Atelier Club! Code ATELIER15 applied.');
  };

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Main Banner Box */}
        <div className="relative rounded-3xl bg-[#1C1817] text-[#FAF8F5] p-10 sm:p-16 lg:p-20 overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4A392]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C8BAA6]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A392]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FAF8F5]/90">
                The Luxury Manicure Standard
              </span>
            </div>

            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-white">
              Your Nails,
              <br />
              <span className="italic font-normal text-[#D4A392]">Your Statement.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#FAF8F5]/80 font-light max-w-xl mx-auto leading-relaxed">
              Join over 45,000 tastemakers wearing haute couture manicures at their fingertips. Zero appointment wait. Zero salon damage.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={scrollToCollections}
                className="px-8 py-4 rounded-full bg-white text-[#1C1817] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#FAF8F5] transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2"
              >
                <span>Shop All Collections</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-md flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
              </a>
            </div>

            {/* VIP Club Newsletter Box */}
            <div className="pt-12 mt-12 border-t border-white/10 max-w-md mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4A392] font-semibold block mb-2">
                Join The Atelier VIP List
              </span>
              <p className="text-xs text-[#FAF8F5]/70 mb-4">
                Unlock 15% off your first bespoke order and receive private access to new limited drops.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#83766E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#FAF8F5] text-[#1C1817] text-xs uppercase tracking-wider font-semibold hover:bg-[#D4A392] transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-white/10 border border-emerald-400/30 text-emerald-300 text-xs flex items-center justify-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the Atelier! Use code <strong className="text-white font-mono">ATELIER15</strong> at checkout.</span>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#FAF8F5]/50 mt-3">
                <Lock className="w-3 h-3" />
                <span>We respect your privacy. Unsubscribe anytime with 1-click.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
