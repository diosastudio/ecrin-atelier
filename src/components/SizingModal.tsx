import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const SizingModal: React.FC = () => {
  const { isSizingModalOpen, closeSizingModal, showToast } = useCart();
  const [activeTab, setActiveTab] = useState<'chart' | 'how-to' | 'shapes'>('chart');

  if (!isSizingModalOpen) return null;

  const sizePresets = [
    { size: 'XS (Extra Small)', thumb: '14mm', index: '11mm', middle: '12mm', ring: '11mm', pinky: '8mm', ideal: 'Petite or very narrow nail beds' },
    { size: 'S (Small)', thumb: '15mm', index: '12mm', middle: '13mm', ring: '12mm', pinky: '9mm', ideal: 'Most popular for slender fingers' },
    { size: 'M (Medium)', thumb: '16mm', index: '13mm', middle: '14mm', ring: '13mm', pinky: '10mm', ideal: 'Standard natural nail bed width' },
    { size: 'L (Large)', thumb: '18mm', index: '14mm', middle: '15mm', ring: '14mm', pinky: '11mm', ideal: 'Wider or flatter nail beds' }
  ];

  const handleOrderFreeKit = () => {
    showToast('Complimentary Sizing Kit added to your next order!');
    closeSizingModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeSizingModal}
        className="fixed inset-0 bg-[#1C1817]/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-[#FAF8F5] w-full max-w-3xl rounded-3xl p-6 sm:p-10 border border-[#EADCD2] shadow-2xl z-10 my-auto animate-scaleUp max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#EADCD2] mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4F0] border border-[#EADCD2] mb-2">
              <Ruler className="w-3.5 h-3.5 text-[#D4A392]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#665B54]">
                Precision Fit Guide
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1817] font-normal">
              Atelier Sizing Masterclass
            </h2>
          </div>

          <button
            onClick={closeSizingModal}
            className="p-2 text-[#83766E] hover:text-[#1C1817] transition-colors rounded-full hover:bg-[#F5F1EB]"
            aria-label="Close Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1.5 bg-[#F5F1EB] rounded-full border border-[#EADCD2] mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('chart')}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'chart'
                ? 'bg-[#1C1817] text-white shadow-sm'
                : 'text-[#665B54] hover:text-[#1C1817]'
            }`}
          >
            Sizing Chart (mm)
          </button>
          <button
            onClick={() => setActiveTab('how-to')}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'how-to'
                ? 'bg-[#1C1817] text-white shadow-sm'
                : 'text-[#665B54] hover:text-[#1C1817]'
            }`}
          >
            How To Measure at Home
          </button>
          <button
            onClick={() => setActiveTab('shapes')}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'shapes'
                ? 'bg-[#1C1817] text-white shadow-sm'
                : 'text-[#665B54] hover:text-[#1C1817]'
            }`}
          >
            Silhouette Profiles
          </button>
        </div>

        {/* TAB 1: SIZING CHART */}
        {activeTab === 'chart' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-[#EADCD2] text-[11px] font-semibold uppercase tracking-wider text-[#665B54]">
                    <th className="py-3 px-3">Size Preset</th>
                    <th className="py-3 px-3">Thumb</th>
                    <th className="py-3 px-3">Index</th>
                    <th className="py-3 px-3">Middle</th>
                    <th className="py-3 px-3">Ring</th>
                    <th className="py-3 px-3">Pinky</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F1EB] text-xs font-mono">
                  {sizePresets.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FAF4F0]/60">
                      <td className="py-3.5 px-3 font-sans font-semibold text-[#1C1817]">{row.size}</td>
                      <td className="py-3.5 px-3 text-[#4E443E]">{row.thumb}</td>
                      <td className="py-3.5 px-3 text-[#4E443E]">{row.index}</td>
                      <td className="py-3.5 px-3 text-[#4E443E]">{row.middle}</td>
                      <td className="py-3.5 px-3 text-[#4E443E]">{row.ring}</td>
                      <td className="py-3.5 px-3 text-[#4E443E]">{row.pinky}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note about 24-piece full sets */}
            <div className="bg-white p-5 rounded-2xl border border-[#EADCD2] flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#FAF4F0] flex items-center justify-center text-[#A9846E] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs text-[#665B54] leading-relaxed">
                <strong className="text-[#1C1817] block font-semibold mb-0.5">
                  Ordering a Ready-to-Wear Collection?
                </strong>
                Every catalog box includes <strong>24 nails in 12 calibrated sizes (0-11)</strong>. You do not need to know your exact millimeter size; you will easily find your 10 matching sizes right out of the box!
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOW TO MEASURE */}
        {activeTab === 'how-to' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#EADCD2]">
                <span className="font-serif-luxury text-2xl text-[#D4A392] font-light block mb-2">01</span>
                <h4 className="font-semibold text-sm text-[#1C1817] mb-1">Clear Tape Method</h4>
                <p className="text-xs text-[#665B54] leading-relaxed">
                  Place a piece of clear adhesive tape across the widest part of your natural nail bed.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EADCD2]">
                <span className="font-serif-luxury text-2xl text-[#D4A392] font-light block mb-2">02</span>
                <h4 className="font-semibold text-sm text-[#1C1817] mb-1">Mark Sidewalls</h4>
                <p className="text-xs text-[#665B54] leading-relaxed">
                  Use a fine pen to mark the left and right edges where your nail meets the skin.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EADCD2]">
                <span className="font-serif-luxury text-2xl text-[#D4A392] font-light block mb-2">03</span>
                <h4 className="font-semibold text-sm text-[#1C1817] mb-1">Measure on Ruler</h4>
                <p className="text-xs text-[#665B54] leading-relaxed">
                  Peel tape off, place flat against a millimeter ruler, and count millimeters between marks.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF4F0] p-4 rounded-2xl border border-[#EADCD2] text-xs text-[#665B54] flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#A9846E] shrink-0" />
              <span>Between sizes? Always size up and gently file down the flexible 0.08mm side edges.</span>
            </div>
          </div>
        )}

        {/* TAB 3: SHAPE PROFILES */}
        {activeTab === 'shapes' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'Almond', desc: 'Soft tapered tip, elongates fingers, universally flattering.' },
                { name: 'Coffin', desc: 'Edgy flat-top ballerina silhouette, sleek and modern.' },
                { name: 'Square', desc: 'Straight 90° edge, crisp architectural lines.' },
                { name: 'Stiletto', desc: 'Dramatic sharp pointed tip, maximum impact.' },
                { name: 'Squoval', desc: 'Softened square corners, effortless everyday look.' },
                { name: 'Oval', desc: 'Classic rounded edge, elegant and natural.' }
              ].map((s) => (
                <div key={s.name} className="bg-white p-4 rounded-xl border border-[#EADCD2]">
                  <h4 className="font-serif-luxury text-base font-semibold text-[#1C1817]">{s.name}</h4>
                  <p className="text-[11px] text-[#665B54] mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complimentary Sizing Kit Card */}
        <div className="mt-8 pt-6 border-t border-[#EADCD2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1817] block">
              Still Unsure? Request a Free Sizing Kit
            </span>
            <span className="text-xs text-[#83766E]">
              Includes all 12 physical sample sizes to test on your fingers before ordering bespoke sets.
            </span>
          </div>

          <button
            onClick={handleOrderFreeKit}
            className="px-6 py-3 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#38302B] transition-colors shrink-0"
          >
            Claim Free Kit
          </button>
        </div>

      </div>
    </div>
  );
};
