import React, { useState, useMemo } from 'react';
import { Sparkles, Eye, ShoppingBag, Star, SlidersHorizontal, ArrowUpDown, X, Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, NailCategory, NailShape } from '../types';
import { useCart } from '../context/CartContext';

export const CollectionsGrid: React.FC = () => {
  const { addItem, openQuickView, searchQuery, setSearchQuery } = useCart();

  const [activeCategory, setActiveCategory] = useState<NailCategory>('All');
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: NailCategory[] = [
    'All',
    'Minimalist',
    '3D Art',
    'Chrome & Metallic',
    'Seasonal',
    'Bridal'
  ];

  const shapes = [
    { id: 'All', label: 'All Shapes' },
    { id: 'Almond', label: 'Almond' },
    { id: 'Coffin', label: 'Coffin' },
    { id: 'Stiletto', label: 'Stiletto' },
    { id: 'Square', label: 'Square' },
    { id: 'Squoval', label: 'Squoval' },
    { id: 'Oval', label: 'Oval' }
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesShape = selectedShape === 'All' || product.shape === selectedShape;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shape.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.finish.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesShape && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [activeCategory, selectedShape, sortBy, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      shape: product.shape,
      length: product.length,
      size: 'M',
      adhesive: 'both',
      quantity: 1
    });
  };

  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4F0] border border-[#EADCD2] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A392]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#665B54]">
                Atelier Catalog
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1C1817]">
              Shop the Collection
            </h2>
            <p className="text-sm sm:text-base text-[#665B54] font-light mt-2 max-w-lg">
              Limited handcrafted sets curated with salon-grade pigment and 24K precious metal accents.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#83766E] flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-full bg-white border border-[#EADCD2] text-xs font-medium text-[#1C1817] focus:outline-none focus:border-[#1C1817] cursor-pointer shadow-sm"
            >
              <option value="featured">Curated Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (5.0★)</option>
            </select>
          </div>
        </div>

        {/* Active Search Notification */}
        {searchQuery && (
          <div className="mb-6 px-4 py-2.5 rounded-2xl bg-[#FAF4F0] border border-[#EADCD2] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#4E443E]">
              <Search className="w-3.5 h-3.5 text-[#A9846E]" />
              <span>Showing results for "<strong className="text-[#1C1817]">{searchQuery}</strong>"</span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#83766E] hover:text-[#1C1817] flex items-center gap-1"
            >
              <span>Clear Search</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter Controls: Category Tabs & Shape Filters */}
        <div className="space-y-4 mb-12">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#1C1817] text-white shadow-md'
                    : 'bg-white/80 text-[#665B54] hover:bg-white border border-[#EADCD2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Shape filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 text-xs text-[#83766E]">
            <span className="text-[11px] uppercase tracking-wider text-[#A9846E] font-medium mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Shape:
            </span>
            {shapes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedShape(s.id)}
                className={`px-3 py-1 rounded-full transition-all text-xs flex items-center gap-1.5 ${
                  selectedShape === s.id
                    ? 'bg-[#EADCD2] text-[#1C1817] font-semibold'
                    : 'bg-white/70 text-[#665B54] hover:text-[#1C1817] border border-[#EADCD2]'
                }`}
              >
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EADCD2]">
            <p className="text-sm text-[#665B54] mb-4">No matching press-on sets found.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSelectedShape('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#1C1817] text-white text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => openQuickView(product)}
                className="group bg-white rounded-2xl overflow-hidden border border-[#EADCD2] shadow-sm hover:border-[#1C1817]/40 hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[4/5] bg-[#F5F1EB] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1817] text-[10px] uppercase font-bold tracking-[0.2em] border border-[#EADCD2]/80 shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Shape Tag */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#1C1817]/75 backdrop-blur-md text-[#FAF8F5] text-[10px] font-mono">
                      {product.shape} • {product.length}
                    </span>
                  </div>

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1817]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-2">
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="flex-1 py-3 rounded-full bg-white text-[#1C1817] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF8F5] transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Quick Add</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className="p-3 rounded-full bg-white/90 text-[#1C1817] hover:bg-white transition-all shadow-lg"
                      aria-label="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#83766E] font-medium">
                        {product.finish}
                      </span>
                      <div className="flex items-center gap-1 text-[#1C1817] text-xs font-semibold">
                        <Star className="w-3 h-3 fill-[#1C1817] text-[#1C1817]" />
                        <span>{product.rating}</span>
                        <span className="text-[#83766E] font-normal text-[10px]">({product.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif-luxury text-xl font-normal text-[#1C1817] group-hover:text-[#A9846E] transition-colors leading-snug mb-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#665B54] line-clamp-2 leading-relaxed mb-4">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#F5F1EB]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-medium text-[#1C1817] font-serif-luxury">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#83766E] line-through font-mono">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A9846E] group-hover:translate-x-1 transition-transform">
                      Configure →
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
