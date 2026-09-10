import React, { useState } from 'react';
import { Ruler, Sparkles, RefreshCw, Clock, ShieldCheck, CheckCircle2, ChevronRight, Check, HelpCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const HowItWorksSection: React.FC = () => {
  const { openSizingModal, addItem } = useCart();
  const [activeTab, setActiveTab] = useState<'tabs' | 'glue'>('tabs');
  const [quizStep, setQuizStep] = useState<number>(0); // 0 = not started, 1, 2, 3, 4 = result
  const [quizAnswers, setQuizAnswers] = useState({
    lifestyle: '',
    duration: '',
    vibe: ''
  });

  const steps = [
    {
      num: '01',
      image: '/images/steps/step-1.jpg',
      title: 'Prep & Size',
      time: '2 Minutes',
      desc: 'Push cuticles back with the included rosewood wand and buff lightly. Match each nail against your natural nail bed for a seamless flush fit.',
      tip: 'Included: 24 nails across 12 sizes guarantees your exact fit.'
    },
    {
      num: '02',
      image: '/images/steps/step-2.jpg',
      title: 'Bond in 60s',
      time: '60 Seconds',
      desc: 'Apply your choice of ultra-hold adhesive tabs for weekend wear or salon resin glue for 2+ weeks of unbreakable salon strength.',
      tip: 'Hold firm pressure at a 45° angle for 20 seconds for bubble-free adhesion.'
    },
    {
      num: '03',
      image: '/images/steps/step-3.jpg',
      title: 'Wear, Remove, Reuse',
      time: 'Zero Damage',
      desc: 'Soak hands in warm water with olive oil for 5 minutes. The bond releases gently with zero trauma, leaving your press-on ready to wear again.',
      tip: 'Retains apex structure and gloss for up to 5 complete re-applications.'
    }
  ];

  // Quiz recommended product logic
  const getQuizRecommendation = () => {
    if (quizAnswers.vibe === 'minimalist' || quizAnswers.lifestyle === 'heavy-typing') {
      return PRODUCTS[7] || PRODUCTS[0]; // Minimalist Vanilla or Glazed Donut
    } else if (quizAnswers.vibe === 'bridal') {
      return PRODUCTS[5]; // Bridal Silk
    } else if (quizAnswers.vibe === 'edgy') {
      return PRODUCTS[2]; // French Noir
    }
    return PRODUCTS[0]; // Glazed Donut Aurelia
  };

  const handleAddQuizResult = () => {
    const rec = getQuizRecommendation();
    addItem({
      productId: rec.id,
      name: rec.name,
      price: rec.price,
      image: rec.image,
      shape: rec.shape,
      length: rec.length,
      size: 'M',
      adhesive: quizAnswers.duration === 'long' ? 'glue' : 'tabs',
      quantity: 1
    });
  };

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4F0] border border-[#EADCD2] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A392]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#665B54]">
              Foolproof Application
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1C1817]">
            From Box to Flawless in 8 Minutes.
          </h2>
          <p className="text-base text-[#665B54] font-light mt-3 max-w-xl mx-auto">
            Zero appointment delays. Zero chemical drilling fumes. Just pure salon-grade luxury from the comfort of your vanity.
          </p>
        </div>

        {/* 3 Step Process Cards with Real Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-3xl overflow-hidden border border-[#EADCD2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Step Card Photographic Top */}
              <div className="relative aspect-[16/10] bg-[#F5F1EB] overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 font-serif-luxury text-2xl font-medium px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1817] shadow-sm">
                  {step.num}
                </div>
                <div className="absolute top-4 right-4 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#1C1817]/80 backdrop-blur-md text-white">
                  {step.time}
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#1C1817] font-medium mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#665B54] leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F5F1EB] text-[11px] text-[#83766E] flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A9846E] shrink-0" />
                  <span>{step.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Adhesive Comparison Studio */}
        <div className="bg-[#F5F1EB] rounded-3xl p-8 sm:p-12 border border-[#EADCD2] shadow-md mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#DDC5B5] mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A9846E] block mb-1">
                Included in Every Box
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1817] font-normal">
                Choose Your Wear Duration
              </h3>
            </div>

            {/* Switch Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-white rounded-full border border-[#EADCD2]">
              <button
                onClick={() => setActiveTab('tabs')}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'tabs'
                    ? 'bg-[#1C1817] text-white shadow-sm'
                    : 'text-[#665B54] hover:text-[#1C1817]'
                }`}
              >
                Mega-Hold Tabs (1–3 Days)
              </button>
              <button
                onClick={() => setActiveTab('glue')}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'glue'
                    ? 'bg-[#1C1817] text-white shadow-sm'
                    : 'text-[#665B54] hover:text-[#1C1817]'
                }`}
              >
                Salon Resin Glue (14 Days)
              </button>
            </div>
          </div>

          {activeTab === 'tabs' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="bg-white p-6 rounded-2xl border border-[#EADCD2]">
                <h4 className="font-serif-luxury text-lg font-medium text-[#1C1817] mb-2">Weekend & Event Wear</h4>
                <p className="text-xs text-[#665B54] leading-relaxed">
                  Ideal for photoshoots, weddings, dates, or weekend getaways where you want instant transformation without long commitment.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#EADCD2]">
                <h4 className="font-serif-luxury text-lg font-medium text-[#1C1817] mb-2">Instant Peel Removal</h4>
                <p className="text-xs text-[#665B54] leading-relaxed">
                  Gently peel off starting from the cuticle line in under 30 seconds. Zero residue left on your natural nail plate.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#EADCD2]">
                <h4 className="font-serif-luxury text-lg font-medium text-[#1C1817] mb-2">Maximum Reusability</h4>
                <p className="text-xs text-[#665B54] leading-relaxed">
                  Nails stay in factory-mint condition. Simply store them in the included velvet pouch and re-wear anytime.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="bg-white p-6 rounded-2xl border border-[#EADCD2]">
                <h4 className="font-serif-luxury text-lg font-medium text-[#1C1817] mb-2">14+ Day Endurance</h4>
                <p className="text-xs text-[#665B54] leading-relaxed">
                  Our medical-grade cyanoacrylate resin forms a waterproof molecular bond that withstands swimming, showers, and typing.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#EADCD2]">
                <h4 className="font-serif-luxury text-lg font-medium text-[#1C1817] mb-2">Gentle Warm-Water Soak</h4>
                <p className="text-xs text-[#665B54] leading-relaxed">
                  Remove after 10–14 days with warm soapy water and cuticle oil. Zero filing, zero harsh acetone damage.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#EADCD2]">
                <h4 className="font-serif-luxury text-lg font-medium text-[#1C1817] mb-2">Flush Cuticle Seam</h4>
                <p className="text-xs text-[#665B54] leading-relaxed">
                  The resin fills the microscopic 0.08mm edge gap perfectly, eliminating any hair-snagging or edge lifting.
                </p>
              </div>
            </div>
          )}

          {/* Sizing Link */}
          <div className="mt-8 pt-6 border-t border-[#DDC5B5]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#665B54]">
              Unsure of your measurements? Use our interactive sizing chart with coin calibration.
            </span>
            <button
              onClick={openSizingModal}
              className="px-6 py-2.5 rounded-full bg-white text-[#1C1817] border border-[#1C1817] text-xs font-semibold uppercase tracking-wider hover:bg-[#1C1817] hover:text-white transition-all flex items-center gap-2 shrink-0"
            >
              <span>Launch Sizing Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ✦ STRATEGIC IMPROVEMENT: Interactive 3-Question Fit Diagnostic Quiz ✦ */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EADCD2] shadow-xl">
          <div className="max-w-3xl mx-auto">
            
            {quizStep === 0 && (
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4F0] text-[#A9846E] text-[10px] font-bold uppercase tracking-[0.25em]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>30-Second Atelier Diagnostic</span>
                </div>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1817] font-normal">
                  Find Your Exact Silhouette & Adhesive
                </h3>
                <p className="text-xs sm:text-sm text-[#665B54] max-w-md mx-auto">
                  Answer 3 quick questions about your daily routine to receive a bespoke fit recommendation tailored to your hands.
                </p>
                <button
                  onClick={() => setQuizStep(1)}
                  className="mt-2 px-8 py-3.5 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#38302B] transition-all"
                >
                  Start Diagnostic Quiz →
                </button>
              </div>
            )}

            {quizStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-[#83766E]">
                  <span className="uppercase tracking-wider font-semibold">Question 1 of 3</span>
                  <span>Step 1/3</span>
                </div>
                <h4 className="font-serif-luxury text-2xl text-[#1C1817]">What is your daily lifestyle & keyboard usage?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'heavy-typing', title: 'Heavy Typing / Office', sub: 'Typing 6+ hours daily, keyboard work' },
                    { id: 'moderate', title: 'Balanced Daily Life', sub: 'Mix of tactile work and events' },
                    { id: 'glamour', title: 'Runway / Special Events', sub: 'Maximum aesthetic presence' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, lifestyle: opt.id });
                        setQuizStep(2);
                      }}
                      className="p-5 rounded-2xl border border-[#EADCD2] text-left hover:border-[#1C1817] hover:bg-[#FAF4F0] transition-all"
                    >
                      <span className="font-semibold text-sm text-[#1C1817] block mb-1">{opt.title}</span>
                      <span className="text-xs text-[#665B54]">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-[#83766E]">
                  <span className="uppercase tracking-wider font-semibold">Question 2 of 3</span>
                  <span>Step 2/3</span>
                </div>
                <h4 className="font-serif-luxury text-2xl text-[#1C1817]">How long do you want to wear your set?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'weekend', title: '1–3 Days (Weekend / Event)', sub: 'Fast peel removal, 100% infinite reusability' },
                    { id: 'long', title: '14+ Days (Full Salon Endurance)', sub: 'Waterproof bond that endures showers and gym' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, duration: opt.id });
                        setQuizStep(3);
                      }}
                      className="p-5 rounded-2xl border border-[#EADCD2] text-left hover:border-[#1C1817] hover:bg-[#FAF4F0] transition-all"
                    >
                      <span className="font-semibold text-sm text-[#1C1817] block mb-1">{opt.title}</span>
                      <span className="text-xs text-[#665B54]">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-[#83766E]">
                  <span className="uppercase tracking-wider font-semibold">Question 3 of 3</span>
                  <span>Step 3/3</span>
                </div>
                <h4 className="font-serif-luxury text-2xl text-[#1C1817]">Which aesthetic resonates most with you?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'minimalist', title: 'Clean Girl Minimalist', sub: 'Glazed chrome, milky vanilla, sheer pinks' },
                    { id: 'bridal', title: 'Ethereal Bridal & Pearls', sub: 'Translucent ivory, freshwater pearls' },
                    { id: 'edgy', title: 'High-Contrast Couture', sub: 'French noir, 24K gold foil, velvet cat-eye' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, vibe: opt.id });
                        setQuizStep(4);
                      }}
                      className="p-5 rounded-2xl border border-[#EADCD2] text-left hover:border-[#1C1817] hover:bg-[#FAF4F0] transition-all"
                    >
                      <span className="font-semibold text-sm text-[#1C1817] block mb-1">{opt.title}</span>
                      <span className="text-xs text-[#665B54]">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center pb-4 border-b border-[#F5F1EB]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-2">
                    Diagnostic Complete
                  </span>
                  <h4 className="font-serif-luxury text-3xl text-[#1C1817]">Your Ideal Atelier Match</h4>
                </div>

                {(() => {
                  const rec = getQuizRecommendation();
                  return (
                    <div className="bg-[#FAF4F0] p-6 rounded-2xl border border-[#EADCD2] flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-28 h-32 rounded-xl overflow-hidden shrink-0 border border-[#EADCD2] bg-white">
                        <img src={rec.image} alt={rec.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-[#A9846E]">{rec.shape} • {rec.length}</span>
                          <span className="text-xs text-[#665B54]">• {quizAnswers.duration === 'long' ? 'Resin Glue Protocol' : 'Mega-Hold Tabs Protocol'}</span>
                        </div>
                        <h5 className="font-serif-luxury text-2xl text-[#1C1817] font-medium mb-1">{rec.name}</h5>
                        <p className="text-xs text-[#665B54] leading-relaxed mb-4">{rec.tagline}</p>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleAddQuizResult}
                            className="px-6 py-2.5 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#38302B] flex items-center gap-2 shadow-md"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add Recommended Set to Bag (${rec.price})</span>
                          </button>
                          <button
                            onClick={() => setQuizStep(0)}
                            className="text-xs text-[#83766E] hover:text-[#1C1817] underline"
                          >
                            Retake Quiz
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
