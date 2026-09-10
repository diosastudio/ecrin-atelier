import React, { createContext, useContext, useState } from 'react';
import { CartItem, CrossSellItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  discountPercentage: number;
  promoCode: string;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  toast: string | null;
  showToast: (msg: string) => void;
  isSizingModalOpen: boolean;
  openSizingModal: () => void;
  closeSizingModal: () => void;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      productId: 'ecrin-glazed-donut',
      name: 'Glazed Donut Aurelia',
      price: 38,
      image: '/images/products/glazed-donut-chrome.jpg',
      shape: 'Almond',
      length: 'Medium',
      size: 'M',
      adhesive: 'both',
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const freeShippingThreshold = 65;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((current) => (current === msg ? null : current));
    }, 4000);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openSizingModal = () => setIsSizingModalOpen(true);
  const closeSizingModal = () => setIsSizingModalOpen(false);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    const existingIndex = items.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.shape === newItem.shape &&
        item.length === newItem.length &&
        item.size === newItem.size &&
        item.adhesive === newItem.adhesive &&
        !item.isCustom
    );

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += newItem.quantity;
      setItems(updated);
    } else {
      const id = 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
      setItems([...items, { ...newItem, id }]);
    }
    
    showToast(`Added "${newItem.name}" to your atelier bag.`);
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const applyPromo = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'ATELIER15' || trimmed === 'WELCOME15' || trimmed === 'LUXE15') {
      setPromoCode(trimmed);
      setDiscountPercentage(15);
      showToast('15% Atelier Privilege discount applied!');
      return true;
    } else if (trimmed === 'VIP20') {
      setPromoCode(trimmed);
      setDiscountPercentage(20);
      showToast('20% VIP Atelier discount applied!');
      return true;
    } else {
      showToast('Invalid promo code. Use code ATELIER15 for 15% off.');
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountPercentage(0);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * (discountPercentage / 100)) * 100) / 100;
  const total = Math.max(0, subtotal - discount);
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - total);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        discount,
        discountPercentage,
        promoCode,
        applyPromo,
        removePromo,
        total,
        freeShippingThreshold,
        freeShippingRemaining,
        toast,
        showToast,
        isSizingModalOpen,
        openSizingModal,
        closeSizingModal,
        isQuickViewOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
