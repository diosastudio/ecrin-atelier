import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, Search, Sliders, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { itemCount, openCart, openSizingModal, searchQuery, setSearchQuery } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', href: '#collections' },
    { name: 'Craftsmanship', href: '#craftsmanship' },
    { name: 'Custom Studio', href: '#customizer' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Reviews', href: '#reviews' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (tag?: string) => {
    if (tag) {
      setSearchQuery(tag);
    }
    setIsSearchOpen(false);
    handleNavClick('#collections');
  };

  return (
    <>
      {/* Announcement Bar */}
      <aside aria-label="Announcement" className="bg-[#1C1817] text-[#FAF8F5] text-[11px] py-2 px-4 text-center tracking-[0.2em] uppercase font-light relative z-50 flex items-center justify-center gap-3">
        <span className="hidden sm:inline">✦ COMPLIMENTARY CUSTOM SIZING KIT WITH FIRST ORDER ✦</span>
        <span className="sm:hidden">COMPLIMENTARY SHIPPING OVER $65</span>
        <button
          onClick={openSizingModal}
          className="underline decoration-[#D4A392] underline-offset-4 hover:text-[#D4A392] transition-colors ml-2 font-medium"
        >
          Find Your Size
        </button>
      </aside>

      {/* Main Sticky Glass Header */}
      <header
        className={`sticky top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#EADCD2]/80 shadow-sm py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          {/* Left: Mobile Menu Toggle & Desktop Nav */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-[#1C1817] hover:text-[#A9846E] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-[12px] uppercase tracking-[0.22em] font-medium text-[#4E443E]">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="hover:text-[#1C1817] transition-colors relative group py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#1C1817] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group"
            >
              <span className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.18em] font-normal text-[#1C1817] block">
                ÉCRIN
              </span>
              <span className="text-[9px] uppercase tracking-[0.45em] text-[#83766E] font-medium block -mt-1 group-hover:text-[#1C1817] transition-colors">
                ATELIER
              </span>
            </a>
          </div>

          {/* Right: Search, Sizing Guide, Cart Trigger */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#665B54] hover:text-[#1C1817] transition-colors"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Search</span>
            </button>

            <button
              onClick={openSizingModal}
              className="hidden md:flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#665B54] hover:text-[#1C1817] transition-colors border-b border-dotted border-[#DDC5B5] pb-0.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Sizing</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-[#1C1817] text-[#FAF8F5] hover:bg-[#38302B] transition-all duration-300 flex items-center gap-2 shadow-sm"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-mono font-medium hidden sm:inline">
                Bag
              </span>
              {itemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#D4A392] text-[#1C1817] text-[10px] font-bold font-mono flex items-center justify-center -mr-1">
                  {itemCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col justify-between p-8 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-[#EADCD2]">
            <div>
              <span className="font-serif-luxury text-2xl tracking-[0.2em] font-normal text-[#1C1817]">
                ÉCRIN ATELIER
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#1C1817] hover:text-[#A9846E]"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="font-serif-luxury text-3xl text-left text-[#1C1817] hover:text-[#D4A392] transition-colors flex items-center justify-between group"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-5 h-5 text-[#83766E] group-hover:translate-x-2 transition-transform" />
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openSizingModal();
              }}
              className="font-serif-luxury text-3xl text-left text-[#83766E] hover:text-[#1C1817] transition-colors flex items-center justify-between"
            >
              <span>Interactive Sizing Guide</span>
              <ChevronRight className="w-5 h-5 text-[#83766E]" />
            </button>
          </nav>

          <div className="pt-6 border-t border-[#EADCD2] space-y-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openCart();
              }}
              className="w-full py-4 rounded-full bg-[#1C1817] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium"
            >
              View Atelier Bag ({itemCount})
            </button>
            <p className="text-[11px] text-center text-[#83766E] tracking-wider uppercase">
              Free Express Shipping on Orders $65+
            </p>
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#1C1817]/60 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EADCD2] animate-scaleUp">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#83766E]">
                Atelier Catalog Search
              </span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-[#83766E] hover:text-[#1C1817]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="w-5 h-5 text-[#83766E] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                placeholder="Search glazed chrome, almond sets, wedding styles..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#DDC5B5] text-sm text-[#1C1817] focus:outline-none focus:border-[#1C1817] transition-all"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-[#83766E] block font-medium">
                Popular Collections
              </span>
              <div className="flex flex-wrap gap-2">
                {['Glazed Donut Aurelia', 'Rose Quartz & 24K Flake', 'French Noir Couture', 'Bridal Silk Atelier', 'Almond', 'Coffin', 'Vanilla Milk'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSearchSubmit(tag)}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-[#EADCD2] text-xs text-[#4E443E] hover:border-[#1C1817] hover:text-[#1C1817] transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
