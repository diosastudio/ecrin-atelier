import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Check, Sparkles, Layers, ShieldCheck, RefreshCw, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { NailShape, NailLength, AdhesiveType } from '../types';

export const QuickViewModal: React.FC = () => {
  const { isQuickViewOpen, quickViewProduct, closeQuickView, addItem, openSizingModal } = useCart();

  const [selectedShape, setSelectedShape] = useState<NailShape>('Almond');
  const [selectedLength, setSelectedLength] = useState<NailLength>('Medium');
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L'>('M');
  const [selectedAdhesive, setSelectedAdhesive] = useState<AdhesiveType>('both');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedShape(quickViewProduct.shape);
      setSelectedLength(quickViewProduct.length);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const handleAddToCart = () => {
    addItem({
      productId: quickViewProduct.id,
      name: quickViewProduct.name,
      price: quickViewProduct.price,
      image: quickViewProduct.image,
      shape: selectedShape,
      length: selectedLength,
      size: selectedSize,
      adhesive: selectedAdhesive,
      quantity: quantity
    });
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-[#1C1817]/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Content */}
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-3xl overflow-hidden border border-[#EADCD2] shadow-2xl z-10 my-auto animate-scaleUp max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 text-[#1C1817] hover:bg-white transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image Stage */}
        <div className="md:w-1/2 bg-[#F5F1EB] relative p-8 flex items-center justify-center min-h-[320px] md:min-h-[500px]">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full max-h-[420px] object-contain drop-shadow-xl"
          />

          {quickViewProduct.badge && (
            <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white text-[#1C1817] text-[10px] uppercase font-bold tracking-[0.2em] shadow-sm">
              {quickViewProduct.badge}
            </span>
          )}
        </div>

        {/* Right: Product Customizer & Checkout */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between bg-[#FAF8F5]">
          <div>
            
            {/* Header / Rating / Price */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#83766E] font-medium">
                {quickViewProduct.finish}
              </span>
              <div className="flex items-center gap-1 text-[#1C1817] text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#1C1817] text-[#1C1817]" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-[#83766E] font-normal">({quickViewProduct.reviewCount} reviews)</span>
              </div>
            </div>

            <h3 className="font-serif-luxury text-3xl text-[#1C1817] font-normal leading-tight mb-2">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif-luxury text-2xl font-medium text-[#1C1817]">
                ${quickViewProduct.price} USD
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#83766E] line-through font-mono">
                  ${quickViewProduct.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-[#665B54] leading-relaxed mb-6">
              {quickViewProduct.description}
            </p>

            {/* Shape Selector */}
            <div className="space-y-2 mb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1817] block">
                Nail Silhouette
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['Almond', 'Coffin', 'Square', 'Stiletto', 'Squoval', 'Oval'] as NailShape[]).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setSelectedShape(shape)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                      selectedShape === shape
                        ? 'bg-[#1C1817] text-white'
                        : 'bg-white text-[#4E443E] border border-[#EADCD2] hover:border-[#1C1817]'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            {/* Length Selector */}
            <div className="space-y-2 mb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1817] block">
                Length
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['Short', 'Medium', 'Long'] as NailLength[]).map((len) => (
                  <button
                    key={len}
                    onClick={() => setSelectedLength(len)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                      selectedLength === len
                        ? 'bg-[#1C1817] text-white'
                        : 'bg-white text-[#4E443E] border border-[#EADCD2] hover:border-[#1C1817]'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Link & Preset */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1817]">
                  Box Sizing
                </span>
                <button
                  onClick={openSizingModal}
                  className="text-[11px] text-[#A9846E] underline flex items-center gap-1 font-medium"
                >
                  <Ruler className="w-3 h-3" /> Sizing Guide
                </button>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF4F0] border border-[#EADCD2] text-xs text-[#665B54]">
                Includes <strong>24 nails in 12 sizes</strong> — universal fit for every hand.
              </div>
            </div>

          </div>

          {/* Add to Bag Action */}
          <div className="space-y-3 pt-4 border-t border-[#EADCD2]">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#38302B] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Atelier Bag • ${quickViewProduct.price * quantity}</span>
            </button>
            <p className="text-[10px] text-center text-[#83766E] uppercase tracking-wider">
              Free Express Shipping on orders over $65
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
