import React, { useState } from 'react';
import { Sparkles, Check, ChevronRight, Sliders, ShoppingBag, RotateCcw, Info, ZoomIn } from 'lucide-react';
import { SHAPES_DATA, LENGTHS_DATA, CUSTOMIZER_COLORS, CUSTOMIZER_ARTS } from '../data/products';
import { NailShape, NailLength, CustomSetState } from '../types';
import { useCart } from '../context/CartContext';

export const CustomizationSection: React.FC = () => {
  const { addItem, openSizingModal } = useCart();

  const [customSet, setCustomSet] = useState<CustomSetState>({
    shape: 'Almond',
    length: 'Medium',
    baseColor: CUSTOMIZER_COLORS[0],
    artType: CUSTOMIZER_ARTS[1],
    size: 'M',
    customMeasurements: {
      thumb: 15,
      index: 12,
      middle: 13,
      ring: 12,
      pinky: 9
    },
    adhesive: 'both'
  });

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Dynamic price calculation
  const basePrice = 38;
  const totalPrice = basePrice + customSet.baseColor.price + customSet.artType.price;

  const handleAddCustomToBag = () => {
    addItem({
      productId: 'bespoke-set-' + Date.now(),
      name: `Bespoke ${customSet.shape} Set (${customSet.baseColor.name})`,
      price: totalPrice,
      image: customSet.baseColor.image || '/images/products/glazed-donut-chrome.jpg',
      shape: customSet.shape,
      length: customSet.length,
      size: customSet.size,
      adhesive: customSet.adhesive,
      quantity: 1,
      isCustom: true,
      customDetails: {
        baseColor: customSet.baseColor.name,
        artType: customSet.artType.name,
        customMeasurements: customSet.size === 'Custom' 
          ? `T:${customSet.customMeasurements.thumb}mm, I:${customSet.customMeasurements.index}mm, M:${customSet.customMeasurements.middle}mm, R:${customSet.customMeasurements.ring}mm, P:${customSet.customMeasurements.pinky}mm`
          : undefined
      }
    });
  };

  return (
    <section id="customizer" className="py-24 sm:py-32 bg-[#F5F1EB] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EADCD2] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A392]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#665B54]">
              Haute Manicure Studio
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1C1817]">
            Build Your Bespoke Set
          </h2>
          <p className="text-base text-[#665B54] font-light mt-3 max-w-xl mx-auto">
            Tailor your silhouette, length, artisan pigmentation, and 3D embellishments to match your personal signature style.
          </p>
        </div>

        {/* 2-Column Customizer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Live Visual Nail Preview Studio with Real Photography */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EADCD2] shadow-xl sticky top-28 flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between pb-4 border-b border-[#F5F1EB] mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A9846E]">
                Live Atelier Studio Preview
              </span>
              <span className="text-xs font-mono font-medium text-[#4E443E]">
                {customSet.shape} • {customSet.length}
              </span>
            </div>

            {/* Real Photographic Render Display */}
            <div className="relative w-full aspect-[4/5] bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#FAF4F0] shadow-inner group">
              <img
                src={customSet.baseColor.image || '/images/products/glazed-donut-chrome.jpg'}
                alt={customSet.baseColor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dynamic Overlay HUD */}
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1817] text-[10px] font-mono uppercase font-bold border border-[#EADCD2]">
                {customSet.shape} Silhouette
              </div>

              <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#1C1817]/80 backdrop-blur-md text-white text-[10px] font-mono">
                {customSet.length} Length
              </div>

              {/* Floating Price Tag */}
              <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-[#1C1817] text-[#FAF8F5] text-xs font-serif-luxury font-medium shadow-lg">
                ${totalPrice} USD
              </div>

              {/* Artisan Art Badge */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1C1817] text-[11px] font-medium border border-[#EADCD2] flex items-center gap-1.5 shadow-sm">
                <span className="text-[#A9846E]">{customSet.artType.icon}</span>
                <span>{customSet.artType.name}</span>
              </div>
            </div>

            {/* Customizer Specs Summary */}
            <div className="w-full mt-6 space-y-2 text-xs">
              <div className="flex justify-between text-[#665B54]">
                <span>Silhouette & Length:</span>
                <span className="font-medium text-[#1C1817]">{customSet.shape} ({customSet.length})</span>
              </div>
              <div className="flex justify-between text-[#665B54]">
                <span>Base Pigment:</span>
                <span className="font-medium text-[#1C1817]">{customSet.baseColor.name}</span>
              </div>
              <div className="flex justify-between text-[#665B54]">
                <span>Artisan Embellishment:</span>
                <span className="font-medium text-[#1C1817]">{customSet.artType.name}</span>
              </div>
              <div className="flex justify-between text-[#665B54]">
                <span>Sizing Preset:</span>
                <span className="font-medium text-[#1C1817]">{customSet.size} Size</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleAddCustomToBag}
              className="w-full mt-6 py-4 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#38302B] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Bespoke Set to Bag (${totalPrice})</span>
            </button>
          </div>

          {/* Right Column: Guided Step-by-Step Customization Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EADCD2] shadow-lg">
            
            {/* Step Navigation Tabs */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar pb-6 border-b border-[#F5F1EB] mb-8">
              {[
                { step: 1, label: '1. Shape' },
                { step: 2, label: '2. Length' },
                { step: 3, label: '3. Base Color' },
                { step: 4, label: '4. 3D Art' },
                { step: 5, label: '5. Sizing' }
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all uppercase whitespace-nowrap ${
                    activeStep === s.step
                      ? 'bg-[#1C1817] text-white'
                      : 'bg-[#F5F1EB] text-[#665B54] hover:bg-[#EADCD2]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* STEP 1: CHOOSE SHAPE */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#1C1817] font-medium mb-1">
                    Select Your Nail Silhouette
                  </h3>
                  <p className="text-xs sm:text-sm text-[#665B54]">
                    Choose the architectural contour that flatters your fingers and fits your daily lifestyle.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SHAPES_DATA.map((shape) => {
                    const isSelected = customSet.shape === shape.id;
                    return (
                      <div
                        key={shape.id}
                        onClick={() => setCustomSet({ ...customSet, shape: shape.id as NailShape })}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative ${
                          isSelected
                            ? 'bg-[#FAF4F0] border-[#1C1817] ring-1 ring-[#1C1817]'
                            : 'bg-white border-[#EADCD2] hover:border-[#DDC5B5]'
                        }`}
                      >
                        {shape.popular && (
                          <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest font-bold text-[#A9846E] bg-white px-2 py-0.5 rounded-full border border-[#EADCD2]">
                            Popular
                          </span>
                        )}
                        <h4 className="font-serif-luxury text-lg font-medium text-[#1C1817] mb-1">
                          {shape.name}
                        </h4>
                        <p className="text-xs text-[#665B54] leading-relaxed">
                          {shape.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-3 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-widest font-medium flex items-center gap-2 hover:bg-[#38302B]"
                  >
                    <span>Next: Length</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE LENGTH */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#1C1817] font-medium mb-1">
                    Select Nail Length
                  </h3>
                  <p className="text-xs sm:text-sm text-[#665B54]">
                    Measured from cuticle base to tip in millimeters.
                  </p>
                </div>

                <div className="space-y-3">
                  {LENGTHS_DATA.map((len) => {
                    const isSelected = customSet.length === len.id;
                    return (
                      <div
                        key={len.id}
                        onClick={() => setCustomSet({ ...customSet, length: len.id as NailLength })}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#FAF4F0] border-[#1C1817] ring-1 ring-[#1C1817]'
                            : 'bg-white border-[#EADCD2] hover:border-[#DDC5B5]'
                        }`}
                      >
                        <div>
                          <h4 className="font-serif-luxury text-lg font-medium text-[#1C1817]">
                            {len.name}
                          </h4>
                          <p className="text-xs text-[#665B54]">{len.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-[#1C1817] border-[#1C1817] text-white' : 'border-[#DDC5B5]'}`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-6 py-3 rounded-full border border-[#DDC5B5] text-xs uppercase tracking-widest text-[#4E443E]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-3 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-widest font-medium flex items-center gap-2 hover:bg-[#38302B]"
                  >
                    <span>Next: Color</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CHOOSE BASE COLOR */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#1C1817] font-medium mb-1">
                    Select Base Gel & Pigment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#665B54]">
                    Hand-mixed salon formulas with optical chrome and high-clarity luster.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CUSTOMIZER_COLORS.map((color) => {
                    const isSelected = customSet.baseColor.id === color.id;
                    return (
                      <div
                        key={color.id}
                        onClick={() => setCustomSet({ ...customSet, baseColor: color })}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-[#FAF4F0] border-[#1C1817] ring-1 ring-[#1C1817]'
                            : 'bg-white border-[#EADCD2] hover:border-[#DDC5B5]'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/10 shrink-0 bg-[#F5F1EB]">
                          <img
                            src={color.image}
                            alt={color.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-[#1C1817] truncate">
                            {color.name}
                          </h4>
                          <span className="text-xs text-[#83766E]">
                            {color.price === 0 ? 'Included' : `+$${color.price}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-3 rounded-full border border-[#DDC5B5] text-xs uppercase tracking-widest text-[#4E443E]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-3 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-widest font-medium flex items-center gap-2 hover:bg-[#38302B]"
                  >
                    <span>Next: 3D Art</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CHOOSE 3D ART & EMBELLISHMENTS */}
            {activeStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#1C1817] font-medium mb-1">
                    Select Artisan Embellishment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#665B54]">
                    Individually set jewels, molten metals, and genuine 24-karat gold leafing.
                  </p>
                </div>

                <div className="space-y-3">
                  {CUSTOMIZER_ARTS.map((art) => {
                    const isSelected = customSet.artType.id === art.id;
                    return (
                      <div
                        key={art.id}
                        onClick={() => setCustomSet({ ...customSet, artType: art })}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#FAF4F0] border-[#1C1817] ring-1 ring-[#1C1817]'
                            : 'bg-white border-[#EADCD2] hover:border-[#DDC5B5]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-serif text-[#A9846E] w-8 text-center">{art.icon}</span>
                          <div>
                            <h4 className="text-sm font-semibold text-[#1C1817]">{art.name}</h4>
                            <p className="text-xs text-[#665B54]">{art.desc}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium text-[#1C1817]">
                          {art.price === 0 ? 'Included' : `+$${art.price}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-3 rounded-full border border-[#DDC5B5] text-xs uppercase tracking-widest text-[#4E443E]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(5)}
                    className="px-6 py-3 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-widest font-medium flex items-center gap-2 hover:bg-[#38302B]"
                  >
                    <span>Next: Sizing</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: SIZING & ADHESIVE KIT */}
            {activeStep === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#1C1817] font-medium mb-1">
                    Select Sizing & Adhesive
                  </h3>
                  <p className="text-xs sm:text-sm text-[#665B54]">
                    Choose a preset or enter your custom millimeter finger mapping.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {(['XS', 'S', 'M', 'L', 'Custom'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setCustomSet({ ...customSet, size: sz })}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        customSet.size === sz
                          ? 'bg-[#1C1817] text-white border-[#1C1817]'
                          : 'bg-[#F5F1EB] text-[#4E443E] border-[#EADCD2]'
                      }`}
                    >
                      <span className="block font-bold text-sm">{sz}</span>
                      <span className="text-[10px] opacity-80 block">
                        {sz === 'XS' ? '14/11/12/11/8' :
                         sz === 'S' ? '15/12/13/12/9' :
                         sz === 'M' ? '16/13/14/13/10' : 
                         sz === 'L' ? '18/14/15/14/11' : 'Bespoke mm'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom Millimeter Interactive Sliders if Custom Size is chosen */}
                {customSet.size === 'Custom' && (
                  <div className="p-4 bg-[#FAF4F0] rounded-2xl border border-[#EADCD2] space-y-3 animate-fadeIn">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1817] block">
                      Custom Millimeter Measurement per Finger
                    </span>
                    <div className="grid grid-cols-5 gap-2 text-center text-xs">
                      {(['thumb', 'index', 'middle', 'ring', 'pinky'] as const).map((finger) => (
                        <div key={finger} className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-[#665B54] block capitalize">
                            {finger}
                          </label>
                          <input
                            type="number"
                            min="6"
                            max="22"
                            value={customSet.customMeasurements[finger]}
                            onChange={(e) =>
                              setCustomSet({
                                ...customSet,
                                customMeasurements: {
                                  ...customSet.customMeasurements,
                                  [finger]: parseInt(e.target.value) || 12
                                }
                              })
                            }
                            className="w-full text-center py-1.5 px-1 rounded-lg border border-[#DDC5B5] bg-white font-mono font-bold text-xs"
                          />
                          <span className="text-[9px] text-[#83766E]">mm</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={openSizingModal}
                    className="text-xs text-[#A9846E] underline underline-offset-4 flex items-center gap-1.5 font-medium"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>How to measure my finger sizes with a coin</span>
                  </button>
                </div>

                {/* Adhesive Selection */}
                <div className="pt-4 border-t border-[#F5F1EB]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1817] block mb-3">
                    Complimentary Adhesive Kit Included
                  </span>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    {[
                      { id: 'tabs', label: 'Mega-Hold Tabs (1-3 Days Wear)' },
                      { id: 'glue', label: 'Resin Glue (2-3 Weeks Wear)' },
                      { id: 'both', label: 'Both (Recommended)' }
                    ].map((adh) => (
                      <button
                        key={adh.id}
                        onClick={() => setCustomSet({ ...customSet, adhesive: adh.id as any })}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          customSet.adhesive === adh.id
                            ? 'bg-[#FAF4F0] border-[#1C1817] text-[#1C1817] font-semibold'
                            : 'bg-white border-[#EADCD2] text-[#665B54]'
                        }`}
                      >
                        {adh.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-3 rounded-full border border-[#DDC5B5] text-xs uppercase tracking-widest text-[#4E443E]"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleAddCustomToBag}
                    className="px-8 py-3.5 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-[#38302B] shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag (${totalPrice})</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
