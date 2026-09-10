import React, { useState } from 'react';
import { Layers, ShieldCheck, RefreshCw, Feather, Heart, Sparkles, Check, X, ArrowRight, Eye, ZoomIn } from 'lucide-react';
import { LAYERS_DATA } from '../data/products';

export const CraftsmanshipSection: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  const pillars = [
    {
      icon: ShieldCheck,
      title: '14-Day Wear Guarantee',
      desc: 'Tested under high-heat water, typing, and fitness routines with zero edge lifting.'
    },
    {
      icon: RefreshCw,
      title: '5× Infinitely Reusable',
      desc: 'Our shape-memory polymer retains flawless C-curve structure through multiple wears.'
    },
    {
      icon: Feather,
      title: '40% Lighter Weight',
      desc: 'Sculpted with a tapered 0.08mm cuticle zone for undetectable natural comfort.'
    },
    {
      icon: Heart,
      title: '100% Vegan & Non-Toxic',
      desc: 'Cruelty-free, 10-free non-toxic acrylic resin formulation that preserves natural keratin.'
    }
  ];

  return (
    <section id="craftsmanship" className="py-24 sm:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4F0] border border-[#EADCD2] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A392]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#665B54]">
              Material Science & Artistry
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1C1817] leading-tight mb-6">
            Engineered for Elegance.
            <br />
            <span className="italic font-normal">The Quad-Layer Architecture.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#665B54] font-light leading-relaxed">
            Every Écrin nail set is a fusion of precision ergonomics and master artisan painting. Deconstructed into four microscopic layers designed to eliminate salon damage forever.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#EADCD2] shadow-sm hover:border-[#1C1817] hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5F1EB] flex items-center justify-center text-[#1C1817] mb-5 group-hover:bg-[#1C1817] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#1C1817] font-medium mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#665B54] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Layer Inspector Studio with Real Macro Photography */}
        <div className="bg-[#F5F1EB] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EADCD2] shadow-xl mb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-[#DDC5B5]/60 mb-8">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#A9846E] uppercase block mb-1">
                Interactive Layer Anatomy
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1817] font-light">
                Inspect The 4 Micro-Layers
              </h3>
            </div>

            {/* Layer Selection Tabs */}
            <div className="flex flex-wrap gap-2">
              {LAYERS_DATA.map((layer, idx) => (
                <button
                  key={layer.number}
                  onClick={() => setSelectedLayer(idx)}
                  className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedLayer === idx
                      ? 'bg-[#1C1817] text-white shadow-md'
                      : 'bg-white/70 text-[#4E443E] hover:bg-white border border-[#EADCD2]'
                  }`}
                >
                  <span className="font-mono text-[11px] opacity-70">{layer.number}</span>
                  <span>{layer.name.split(' ')[0]} Layer</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Layer Deep Dive Visual Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Real Macro Photographic Stage */}
            <div className="lg:col-span-6 bg-white rounded-2xl overflow-hidden border border-[#EADCD2] shadow-md relative group">
              <div className="aspect-[4/3] bg-[#FAF8F5] relative overflow-hidden">
                <img
                  src={LAYERS_DATA[selectedLayer].image}
                  alt={LAYERS_DATA[selectedLayer].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold tracking-widest text-[#1C1817] uppercase border border-[#EADCD2]">
                  Layer {LAYERS_DATA[selectedLayer].number} / 04 • Macro 10×
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#1C1817]/80 backdrop-blur-md text-white text-[10px] font-mono flex items-center gap-1.5">
                  <ZoomIn className="w-3 h-3 text-[#D4A392]" />
                  <span>Real Texture Zoom</span>
                </div>
              </div>
            </div>

            {/* Layer Detail Info Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#EADCD2] text-[#4E443E] text-[10px] font-mono uppercase tracking-widest mb-3">
                  {LAYERS_DATA[selectedLayer].tagline}
                </div>
                <h4 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1817] font-normal mb-3">
                  {LAYERS_DATA[selectedLayer].name}
                </h4>
                <p className="text-sm sm:text-base text-[#4E443E] font-light leading-relaxed mb-6">
                  {LAYERS_DATA[selectedLayer].description}
                </p>
              </div>

              {/* Spec Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#DDC5B5]/60">
                <div className="bg-white p-4 rounded-xl border border-[#EADCD2]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#83766E] block mb-1">
                    Layer Caliber
                  </span>
                  <span className="font-serif-luxury text-xl font-medium text-[#1C1817]">
                    {LAYERS_DATA[selectedLayer].thickness}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#EADCD2]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#83766E] block mb-1">
                    Composition
                  </span>
                  <span className="text-xs font-medium text-[#1C1817] leading-tight block">
                    {LAYERS_DATA[selectedLayer].material}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#EADCD2]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#83766E] block mb-1">
                    Primary Advantage
                  </span>
                  <span className="text-xs font-medium text-[#1C1817] leading-tight block">
                    {LAYERS_DATA[selectedLayer].benefit}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* COMPARISON MATRIX: Écrin Press-Ons vs Salon Acrylics vs Drugstore Press-Ons */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EADCD2] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1817] font-light mb-3">
              The Standard of Comparison
            </h3>
            <p className="text-xs sm:text-sm text-[#665B54]">
              Why fashion editors and dermatologists choose Écrin quad-layer press-on architecture over traditional salon methods.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#EADCD2]">
                  <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[#665B54]">Feature / Metric</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1C1817] bg-[#FAF4F0] rounded-t-xl">
                    ÉCRIN ATELIER
                  </th>
                  <th className="py-4 px-4 text-xs font-medium uppercase tracking-wider text-[#83766E]">Traditional Salon Acrylics</th>
                  <th className="py-4 px-4 text-xs font-medium uppercase tracking-wider text-[#83766E]">Drugstore Plastic Nails</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F1EB] text-xs sm:text-sm">
                <tr>
                  <td className="py-4 px-4 font-medium text-[#1C1817]">Natural Nail Damage</td>
                  <td className="py-4 px-4 font-bold text-[#1C1817] bg-[#FAF4F0] flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> Zero damage (Soak-off)
                  </td>
                  <td className="py-4 px-4 text-[#83766E] flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" /> High (Drilling & Acetone)
                  </td>
                  <td className="py-4 px-4 text-[#83766E]">Moderate (Harsh glue residue)</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-medium text-[#1C1817]">Application Time</td>
                  <td className="py-4 px-4 font-bold text-[#1C1817] bg-[#FAF4F0]">8–10 Minutes</td>
                  <td className="py-4 px-4 text-[#83766E]">90–150 Minutes</td>
                  <td className="py-4 px-4 text-[#83766E]">15–20 Minutes</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-medium text-[#1C1817]">Reusability</td>
                  <td className="py-4 px-4 font-bold text-[#1C1817] bg-[#FAF4F0] flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> 5+ Times with Tabs
                  </td>
                  <td className="py-4 px-4 text-[#83766E] flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" /> Single use only
                  </td>
                  <td className="py-4 px-4 text-[#83766E]">1 time (Snaps easily)</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-medium text-[#1C1817]">Apex & Silhouette Shape</td>
                  <td className="py-4 px-4 font-bold text-[#1C1817] bg-[#FAF4F0]">Sculpted Salon C-Curve</td>
                  <td className="py-4 px-4 text-[#83766E]">Varies by technician skill</td>
                  <td className="py-4 px-4 text-[#83766E]">Flat, unnatural plastic curve</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-medium text-[#1C1817]">Average Cost per Wear</td>
                  <td className="py-4 px-4 font-bold text-[#1C1817] bg-[#FAF4F0]">$7 – $9 per wear</td>
                  <td className="py-4 px-4 text-[#83766E]">$120 – $220 per set</td>
                  <td className="py-4 px-4 text-[#83766E]">$12 – $15 (1 wear)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
