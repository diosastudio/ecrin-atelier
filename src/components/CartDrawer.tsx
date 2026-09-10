import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Check, Gift, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    addItem,
    subtotal,
    discount,
    promoCode,
    applyPromo,
    removePromo,
    total,
    freeShippingThreshold,
    freeShippingRemaining
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [includeGiftNote, setIncludeGiftNote] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, ((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100);

  const crossSells = [
    {
      id: 'cross-oil-pen',
      name: 'Organic Cuticle Elixir Pen',
      price: 12,
      image: '/images/products/minimalist-vanilla-glaze.jpg',
      desc: 'Jojoba & Vitamin E nourishing roller'
    },
    {
      id: 'cross-tabs-48',
      name: '48× Mega-Hold Adhesive Tabs',
      price: 6,
      image: '/images/layers/layer-adhesive.jpg',
      desc: 'Extra 4 wears backup kit'
    }
  ];

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  const handleAddCrossSell = (cs: typeof crossSells[0]) => {
    addItem({
      productId: cs.id,
      name: cs.name,
      price: cs.price,
      image: cs.image,
      shape: 'Almond',
      length: 'Short',
      size: 'M',
      adhesive: 'tabs',
      quantity: 1
    });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      alert('Thank you for choosing ÉCRIN ATELIER! In a production deployment, this seamlessly forwards to Shopify / Stripe checkout.');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-[#1C1817]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#EADCD2] animate-slideLeft">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EADCD2] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1C1817]" />
              <h2 className="font-serif-luxury text-2xl text-[#1C1817] font-normal">
                Atelier Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#83766E] hover:text-[#1C1817] transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3.5 bg-[#FAF4F0] border-b border-[#EADCD2]">
            {freeShippingRemaining > 0 ? (
              <p className="text-xs text-[#665B54] mb-2 font-medium">
                Add <strong className="text-[#1C1817] font-mono">${freeShippingRemaining.toFixed(2)}</strong> more for <strong>Free Express Shipping</strong>
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5 mb-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You’ve unlocked <strong>Free Worldwide Express Shipping!</strong></span>
              </p>
            )}

            <div className="w-full h-1.5 bg-[#EADCD2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1C1817] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5F1EB] flex items-center justify-center text-[#83766E]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#1C1817]">Your bag is empty</h3>
                <p className="text-xs text-[#665B54] max-w-xs leading-relaxed">
                  Explore our handcrafted quad-layer collections or build your custom bespoke set.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#38302B]"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-2xl border border-[#EADCD2] shadow-sm flex gap-4 items-start"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-24 rounded-xl bg-[#F5F1EB] overflow-hidden shrink-0 border border-[#FAF4F0]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-luxury text-base font-medium text-[#1C1817] truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#83766E] hover:text-red-500 transition-colors p-1 -mr-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#83766E] space-y-0.5 mt-1 font-mono">
                        <p>Shape: {item.shape} • {item.length}</p>
                        <p>Size: {item.size} • Adhesive: {item.adhesive}</p>
                        {item.isCustom && item.customDetails && (
                          <p className="text-[#A9846E] text-[10px] truncate">
                            Art: {item.customDetails.artType}
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F5F1EB]">
                        <div className="flex items-center border border-[#EADCD2] rounded-full bg-[#FAF8F5]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-[#665B54] hover:text-[#1C1817]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-medium text-[#1C1817]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#665B54] hover:text-[#1C1817]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif-luxury text-base font-semibold text-[#1C1817]">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Popular Cross-Sells Bar */}
                <div className="pt-4 border-t border-[#EADCD2]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1817] block mb-3">
                    Recommended Atelier Essentials
                  </span>
                  <div className="space-y-2">
                    {crossSells.map((cs) => (
                      <div
                        key={cs.id}
                        className="bg-white p-3 rounded-xl border border-[#EADCD2] flex items-center justify-between gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#F5F1EB]">
                          <img src={cs.image} alt={cs.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-medium text-[#1C1817] truncate">{cs.name}</h5>
                          <span className="text-[10px] text-[#83766E] font-mono">${cs.price} USD</span>
                        </div>
                        <button
                          onClick={() => handleAddCrossSell(cs)}
                          className="px-3 py-1 rounded-full bg-[#FAF4F0] border border-[#EADCD2] text-[11px] font-semibold text-[#1C1817] hover:bg-[#1C1817] hover:text-white transition-colors shrink-0"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer / Summary / Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EADCD2] space-y-4 shadow-lg">
              
              {/* Promo Code Input & 1-Click Chips */}
              <div className="space-y-2">
                {!promoCode ? (
                  <>
                    <form onSubmit={handleApplyCode} className="flex gap-2">
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Promo code (e.g. ATELIER15)"
                        className="flex-1 px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EADCD2] text-xs uppercase placeholder-normal focus:outline-none focus:border-[#1C1817]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#1C1817] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#38302B]"
                      >
                        Apply
                      </button>
                    </form>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-[#83766E]">Try:</span>
                      <button
                        onClick={() => applyPromo('ATELIER15')}
                        className="px-2 py-0.5 rounded bg-[#FAF4F0] text-[10px] font-mono font-bold text-[#A9846E] border border-[#EADCD2] hover:border-[#1C1817]"
                      >
                        ATELIER15 (-15%)
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 px-3 py-2 rounded-xl text-xs text-emerald-800 border border-emerald-200">
                    <span className="font-mono font-semibold">Code {promoCode} (15% OFF)</span>
                    <button
                      onClick={removePromo}
                      className="text-emerald-900 hover:text-red-600 font-semibold text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Gift Note Checkbox */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-[#665B54] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftNote}
                    onChange={(e) => setIncludeGiftNote(e.target.checked)}
                    className="rounded border-[#DDC5B5] accent-[#1C1817]"
                  />
                  <Gift className="w-3.5 h-3.5 text-[#A9846E]" />
                  <span>Complimentary handwritten embossed gift card</span>
                </label>
                {includeGiftNote && (
                  <input
                    type="text"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Enter recipient's name or personal gift message..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EADCD2] text-xs text-[#1C1817] focus:outline-none focus:border-[#1C1817]"
                  />
                )}
              </div>

              {/* Subtotal & Totals */}
              <div className="space-y-1.5 text-xs text-[#665B54] pt-2 border-t border-[#F5F1EB]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#1C1817]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Atelier Privilege Discount</span>
                    <span className="font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-[#1C1817]">
                    {freeShippingRemaining === 0 ? 'FREE (Express)' : '$5.99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1C1817] pt-2 border-t border-[#EADCD2]">
                  <span>Estimated Total</span>
                  <span className="font-serif-luxury text-xl">
                    ${(total + (freeShippingRemaining === 0 ? 0 : 5.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Express Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 rounded-full bg-[#1C1817] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#38302B] transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01]"
              >
                {isCheckingOut ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Order...
                  </span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#83766E] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
