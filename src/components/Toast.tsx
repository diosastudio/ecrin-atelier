import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className="bg-[#1C1817] text-[#FAF8F5] px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 backdrop-blur-xl">
        <div className="w-6 h-6 rounded-full bg-[#D4A392] flex items-center justify-center text-[#1C1817] shrink-0">
          <Check className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-medium tracking-wide">
          {toast}
        </span>
      </div>
    </div>
  );
};
