import React, { useState } from 'react';
import { Star, CheckCircle, Sparkles, Heart, Shield, Award, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const SocialProofSection: React.FC = () => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const pressQuotes = [
    { outlet: 'VOGUE', quote: 'The Apple of press-on nails. Flawless apex curvature that looks unmistakably bespoke.' },
    { outlet: "HARPER'S BAZAAR", quote: 'Revolutionizing the luxury manicure. Zero appointment, zero damage, pure haute couture.' },
    { outlet: 'ELLE', quote: 'Indistinguishable from a 3-hour celebrity nail artist sculpted set.' },
    { outlet: 'ALLURE', quote: 'The 14-day wear claim is real. Our beauty editors are officially obsessed.' }
  ];

  const ugcGallery = [
    { img: '/images/ugc/ugc-1.jpg', name: '@camille.nyc', style: 'Glazed Donut Aurelia' },
    { img: '/images/ugc/ugc-2.jpg', name: '@elena_rostova', style: 'Bridal Silk Atelier' },
    { img: '/images/ugc/ugc-3.jpg', name: '@sienna.zhao', style: 'Rose Quartz & 24K Flake' },
    { img: '/images/ugc/ugc-4.jpg', name: '@margot.milan', style: 'French Noir Couture' },
    { img: '/images/ugc/ugc-5.jpg', name: '@chloe.atelier', style: 'Champagne Dew & Pearls' },
    { img: '/images/ugc/ugc-6.jpg', name: '@jules.editorial', style: 'Minimalist Vanilla Milk' }
  ];

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Luxury Press Recognition Bar */}
        <div className="pb-16 mb-16 border-b border-[#EADCD2]">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#83766E]">
              As Celebrated In Haute Editorial
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center text-center">
            {pressQuotes.map((press, i) => (
              <div key={i} className="flex flex-col items-center group">
                <span className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.25em] font-normal text-[#1C1817] group-hover:text-[#A9846E] transition-colors mb-2">
                  {press.outlet}
                </span>
                <p className="text-xs text-[#665B54] font-light italic leading-relaxed max-w-[220px]">
                  "{press.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4F0] border border-[#EADCD2] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A392]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#665B54]">
              45,000+ Verified Tastemakers
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1C1817]">
            Loved by Thousands.
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-[#1C1817]">
            <div className="flex text-[#1C1817]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#1C1817]" />
              ))}
            </div>
            <span className="text-sm font-semibold">4.97 / 5.0 Global Rating</span>
          </div>
        </div>

        {/* Featured Testimonial Spotlight with Real UGC Photo */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EADCD2] shadow-xl max-w-4xl mx-auto mb-20 relative">
          <Quote className="w-16 h-16 text-[#FAF4F0] absolute top-8 right-8 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Photo Thumbnail */}
            <div className="md:col-span-4 aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F1EB] border border-[#EADCD2]">
              <img
                src={TESTIMONIALS[activeTestimonialIdx].image}
                alt={TESTIMONIALS[activeTestimonialIdx].name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Review Content */}
            <div className="md:col-span-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-1 text-[#1C1817] mb-3">
                  {[...Array(TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#1C1817]" />
                  ))}
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1817] font-medium leading-snug mb-3">
                  "{TESTIMONIALS[activeTestimonialIdx].title}"
                </h3>

                <p className="text-xs sm:text-sm text-[#4E443E] font-light leading-relaxed mb-6">
                  {TESTIMONIALS[activeTestimonialIdx].comment}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F5F1EB]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif-luxury text-lg font-medium text-[#1C1817]">
                      {TESTIMONIALS[activeTestimonialIdx].name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified Buyer
                    </span>
                  </div>
                  <span className="text-xs text-[#83766E]">
                    {TESTIMONIALS[activeTestimonialIdx].location} • {TESTIMONIALS[activeTestimonialIdx].productName}
                  </span>
                </div>

                {/* Review Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveTestimonialIdx((prev) =>
                        prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                      )
                    }
                    className="w-9 h-9 rounded-full border border-[#EADCD2] hover:bg-[#1C1817] hover:text-white transition-colors flex items-center justify-center text-[#1C1817]"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveTestimonialIdx((prev) =>
                        prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="w-9 h-9 rounded-full border border-[#EADCD2] hover:bg-[#1C1817] hover:text-white transition-colors flex items-center justify-center text-[#1C1817]"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UGC Customer Photo Grid with Real Editorial Photography */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1817] font-light">
                Seen in the Wild
              </h3>
              <p className="text-xs sm:text-sm text-[#665B54]">
                Tag @EcrinAtelier #EcrinNails to be featured on our editorial gallery.
              </p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-[#1C1817] hover:text-[#A9846E] transition-colors"
            >
              Follow @EcrinAtelier →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ugcGallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F1EB] border border-[#EADCD2] shadow-sm cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.style}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                  <span className="text-[11px] font-mono font-medium">{item.name}</span>
                  <span className="text-[9px] text-[#FAF8F5]/80 line-clamp-1">{item.style}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges & Guarantee Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-[#EADCD2]">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#FAF4F0] flex items-center justify-center text-[#A9846E] mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <span className="font-serif-luxury text-base font-medium text-[#1C1817]">100% Leaping Bunny</span>
            <span className="text-xs text-[#83766E]">Cruelty-Free & Vegan</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#FAF4F0] flex items-center justify-center text-[#A9846E] mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-serif-luxury text-base font-medium text-[#1C1817]">Hand-Finished</span>
            <span className="text-xs text-[#83766E]">Individually Inspected</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#FAF4F0] flex items-center justify-center text-[#A9846E] mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-serif-luxury text-base font-medium text-[#1C1817]">Zero Keratin Trauma</span>
            <span className="text-xs text-[#83766E]">Dermatologist Approved</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#FAF4F0] flex items-center justify-center text-[#A9846E] mb-3">
              <Award className="w-5 h-5" />
            </div>
            <span className="font-serif-luxury text-base font-medium text-[#1C1817]">14-Day Guarantee</span>
            <span className="text-xs text-[#83766E]">Free Exchanges & Returns</span>
          </div>
        </div>

      </div>
    </section>
  );
};
