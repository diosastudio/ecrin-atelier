import { Product, LayerSpec, Testimonial } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'ecrin-glazed-donut',
    name: 'Glazed Donut Aurelia',
    tagline: 'Hailey-inspired iridescent pearlescent mirror finish with micro-chrome sheen',
    price: 38,
    originalPrice: 46,
    rating: 4.95,
    reviewCount: 342,
    category: 'Chrome & Metallic',
    shape: 'Almond',
    length: 'Medium',
    finish: 'Pearl Chrome Gel',
    badge: 'Bestseller',
    image: '/images/products/glazed-donut-chrome.jpg',
    hoverImage: '/images/products/glazed-donut-chrome.jpg',
    description: 'The definitive editorial look. A high-luster pearlescent chrome powder buffed over milky nude gel, finished with our diamond-strength glass top coat. Reflects champagne and soft rose highlights in every angle of light.',
    details: [
      'Quad-layer shatterproof flexible polymer core',
      'Infused with micronized metallic aurora pigment',
      'Includes 24 nails in 12 calibrated sizes (0-11)',
      'Dual adhesive kit: 48 mega-hold tabs + salon glue',
      'Pre-etched contact surface for instant 30-second bond'
    ],
    inStock: true,
    bestseller: true
  },
  {
    id: 'ecrin-rose-quartz-gold',
    name: 'Rose Quartz & 24K Flake',
    tagline: 'Hand-blended milky blush ombré with genuine 24-karat gold leaf fragments',
    price: 42,
    rating: 4.98,
    reviewCount: 289,
    category: 'Minimalist',
    shape: 'Almond',
    length: 'Medium',
    finish: 'Gloss Gel Ombré',
    badge: 'Atelier Favorite',
    image: '/images/products/rose-quartz-ombre.jpg',
    hoverImage: '/images/products/rose-quartz-ombre.jpg',
    description: 'A harmonious study in delicate luxury. Hand-diffused rose quartz pink transitioning into translucent crystal, accented with floating suspended gold leaf flakes.',
    details: [
      'Each set is individually hand-finished by master nail technicians',
      'Natural apex curve mimics high-end salon sculpted overlays',
      'Resistant to scratching, dulling, and chipping for 14+ days',
      'Waterproof barrier allows hot baths, typing, and daily tasks',
      'Includes luxury prep buffer, rosewood cuticle stick, and prep pads'
    ],
    inStock: true,
    bestseller: true
  },
  {
    id: 'ecrin-french-noir',
    name: 'French Noir Couture',
    tagline: 'Deep velvet noir micro-french smile lines with 24K gold foil trim',
    price: 40,
    rating: 4.91,
    reviewCount: 178,
    category: '3D Art',
    shape: 'Stiletto',
    length: 'Long',
    finish: 'High-Gloss Contrast',
    badge: 'New Drop',
    image: '/images/products/french-noir-couture.jpg',
    hoverImage: '/images/products/french-noir-couture.jpg',
    description: 'High-contrast Parisian elegance. Crisp obsidian-black French smile line detailed with fine gold foil leafing over an ultra-clean bare pink nail bed.',
    details: [
      'Precision razor-edge micro smile line geometry',
      'Ergonomically contoured 0.08mm ultra-thin cuticle zone',
      'Reinforced tip architecture prevents bending and chipping',
      'Vegan and cruelty-free formulation',
      'Reusable up to 5 times with proper tab removal'
    ],
    inStock: true,
    bestseller: false
  },
  {
    id: 'ecrin-champagne-dew',
    name: 'Champagne Dew & Pearls',
    tagline: 'Subtle warm champagne nude with 3D crystal dewdrops and freshwater pearls',
    price: 45,
    originalPrice: 52,
    rating: 4.97,
    reviewCount: 215,
    category: '3D Art',
    shape: 'Almond',
    length: 'Medium',
    finish: '3D Embellished Gel',
    badge: 'Limited Edition',
    image: '/images/products/champagne-dew-drop.jpg',
    hoverImage: '/images/products/champagne-dew-drop.jpg',
    description: 'Sculptural beauty in miniature. Hand-placed miniature freshwater cabochon pearls flanked by high-refractive crystal dewdrops on a warm spun-silk champagne base.',
    details: [
      'Securely embedded 3D jewels sealed under double gel armor',
      'Zero snagging on knitwear or delicate fabrics',
      'Ultra-natural tapered cuticle fit eliminates lift lines',
      'Full application kit with professional dual-sided file',
      'Includes velvet storage pouch for keepsakes'
    ],
    inStock: true,
    bestseller: true
  },
  {
    id: 'ecrin-celestial-silver',
    name: 'Celestial Silver Aurora',
    tagline: 'Velvet magnetic cat-eye effect with liquid silver chrome reflections',
    price: 39,
    rating: 4.89,
    reviewCount: 142,
    category: 'Chrome & Metallic',
    shape: 'Oval',
    length: 'Short',
    finish: 'Velvet Cat-Eye Chrome',
    badge: 'Trending',
    image: '/images/products/celestial-silver-aura.jpg',
    hoverImage: '/images/products/celestial-silver-aura.jpg',
    description: 'Mesmerizing multi-dimensional velvet sheen that shifts with every gesture. Created with rare earth magnetic pigments captured in crystal clear optical resin.',
    details: [
      'Deep 3D velvet magnetic light path',
      'Soft oval silhouette ideal for everyday computer and tactile work',
      'Scratch-resistant ceramic top layer',
      'Comfortable lightweight feel — 40% lighter than acrylics',
      '10-minute application time'
    ],
    inStock: true,
    bestseller: false
  },
  {
    id: 'ecrin-bridal-silk',
    name: 'Bridal Silk Atelier',
    tagline: 'Ethereal sheer ivory lace aura with delicate micro-pearl crown embellishment',
    price: 48,
    rating: 5.0,
    reviewCount: 312,
    category: 'Bridal',
    shape: 'Squoval',
    length: 'Short',
    finish: 'Bridal Satin Glow',
    badge: 'Bridal Pick',
    image: '/images/products/bridal-silk-pearl.jpg',
    hoverImage: '/images/products/bridal-silk-pearl.jpg',
    description: 'Designed for unforgettable moments. Translucent sheer bridal ivory with micro-pearl constellation accents that photograph flawlessly without glare.',
    details: [
      'Curated for high-definition photography and bridal editorial',
      'Zero lifting guarantee with our dual-cure adhesive tabs',
      'Gentle warm-water soak removal preserves natural nails intact',
      'Presented in our keepsake embossed atelier gift box',
      'Includes complimentary emergency touch-up travel vial'
    ],
    inStock: true,
    bestseller: true
  },
  {
    id: 'ecrin-velvet-burgundy',
    name: 'Velvet Burgundy & Gold',
    tagline: 'Deep Bordeaux wine velvet with 24K molten gold leaf edges',
    price: 42,
    rating: 4.93,
    reviewCount: 184,
    category: 'Seasonal',
    shape: 'Coffin',
    length: 'Long',
    finish: 'Velvet Wine Gel',
    badge: 'Autumn Drop',
    image: '/images/products/velvet-burgundy-gold.jpg',
    hoverImage: '/images/products/velvet-burgundy-gold.jpg',
    description: 'Opulent, moody, and undeniably striking. Deep Cabernet red infused with magnetic velvet particles and trimmed with distressed 24K gold foil edging.',
    details: [
      'Rich pigmented deep red that will never fade or yellow',
      'Reinforced coffin apex structure prevents corner snapping',
      '100% soak-off removal friendly',
      '24 precision tips included for bespoke finger mapping',
      'Includes luxury wooden application tools'
    ],
    inStock: true,
    bestseller: false
  },
  {
    id: 'ecrin-vanilla-glaze',
    name: 'Minimalist Vanilla Milk',
    tagline: 'Ultra-clean vanilla jelly base with subtle glazed mirror sheen',
    price: 36,
    rating: 4.96,
    reviewCount: 420,
    category: 'Minimalist',
    shape: 'Square',
    length: 'Short',
    finish: 'High-Gloss Jelly Glaze',
    badge: 'Essential',
    image: '/images/products/minimalist-vanilla-glaze.jpg',
    hoverImage: '/images/products/minimalist-vanilla-glaze.jpg',
    description: 'The elevated everyday uniform. A sheer, juicy vanilla milky base with an ultra-reflective high-gloss gel finish that looks like freshly manicured Russian gel.',
    details: [
      'Ultra-thin 0.08mm cuticle zone for invisible seam line',
      'Short square silhouette designed for effortless typing and active living',
      'Formulated with non-toxic, 10-free vegan resin',
      'Waterproof and heat-resistant up to 14 days',
      'Zero damage, zero filing of natural nail bed required'
    ],
    inStock: true,
    bestseller: true
  }
];

export interface ExtendedLayerSpec extends LayerSpec {
  image: string;
}

export const LAYERS_DATA: ExtendedLayerSpec[] = [
  {
    number: '04',
    name: 'Diamond Gel Top Coat',
    tagline: 'Scratch-Proof Mirror Shield',
    description: 'An ultra-dense UV-cured glass polymer layer that repels micro-scratches, household chemicals, and UV yellowing. Provides an unyielding high-gloss mirror shine that endures for up to 14 consecutive days.',
    thickness: '0.04 mm',
    material: 'Optical-Grade UV Ceramic Glass Polymer',
    benefit: '14-Day Scratch Defense & Glass Mirror Reflection',
    colorHex: '#FAF8F5',
    image: '/images/layers/layer-topcoat.jpg'
  },
  {
    number: '03',
    name: 'Artisan Art & 24K Pigment Layer',
    tagline: 'Bespoke Hand-Painted Details',
    description: 'Where haute couture meets micro-artistry. Layered hand-painted ombré pigments, micronized chrome powders, genuine 24-karat gold leaf fragments, and individually set freshwater pearls sealed permanently.',
    thickness: '0.06 mm',
    material: 'Artisan Gel Enamel & 24K Gold Foil Leaf',
    benefit: 'Deep Dimensional Luster & Snag-Free Charms',
    colorHex: '#D4A392',
    image: '/images/layers/layer-art.jpg'
  },
  {
    number: '02',
    name: '9-Ply Flex-Polymer Core',
    tagline: 'Structural Apex Architecture',
    description: 'Our proprietary multi-layered acrylic-polygel blend. Engineered with a calibrated C-curve apex that delivers salon-sculpted strength where stress is highest, while maintaining a razor-thin, flexible cuticle contour.',
    thickness: '0.35 mm',
    material: '9-Ply Molecular Shape-Memory Polymer',
    benefit: 'Unbreakable Apex & Zero-Pressure Cuticle Comfort',
    colorHex: '#EADCD2',
    image: '/images/layers/layer-core.jpg'
  },
  {
    number: '01',
    name: 'Medical-Grade Adhesive Matrix',
    tagline: 'Zero-Trauma Breathable Bond',
    description: 'A biocompatible micro-suction silicone polymer matrix that grips the natural nail plate securely without suffocating or stripping keratin layers. Pairs seamlessly with our dual adhesive tabs or salon resin glue.',
    thickness: '0.08 mm',
    material: 'Breathable Biocompatible Silicone-Polymer',
    benefit: '100% Zero Natural Nail Damage & Effortless Removal',
    colorHex: '#DFD5C7',
    image: '/images/layers/layer-adhesive.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Camille Laurent',
    location: 'Paris & New York',
    rating: 5,
    date: '2 days ago',
    title: 'Indistinguishable from a $220 Manhattan Russian manicure',
    comment: 'I am notoriously particular about my nails. Écrin’s Glazed Donut set has the most realistic C-curve apex I have ever seen on a press-on. Even my manicurist thought I cheated on her! Wore them for 13 days through fashion week with zero lifting.',
    verified: true,
    productName: 'Glazed Donut Aurelia',
    nailShape: 'Almond (Medium)',
    image: '/images/ugc/ugc-1.jpg'
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    location: 'London, UK',
    rating: 5,
    date: '5 days ago',
    title: 'Saved my wedding day hands!',
    comment: 'My salon ruined my appointment 2 days before my wedding. I ordered the Bridal Silk set with express shipping. The application took 8 minutes and the photos turned out immaculate. The subtle pearl details caught the light in every close-up ring shot.',
    verified: true,
    productName: 'Bridal Silk Atelier',
    nailShape: 'Squoval (Short)',
    image: '/images/ugc/ugc-2.jpg'
  },
  {
    id: 'rev-3',
    name: 'Sienna Zhao',
    location: 'San Francisco, CA',
    rating: 5,
    date: '1 week ago',
    title: 'Reused 4 times already — paying for itself 10x over',
    comment: 'As a software engineer typing 8 hours a day, traditional acrylics always destroyed my nail beds. Écrin nails are lightweight, durable, and don’t click loudly on my mechanical keyboard. The gold flake detail is breathtaking.',
    verified: true,
    productName: 'Rose Quartz & 24K Flake',
    nailShape: 'Almond (Medium)',
    image: '/images/ugc/ugc-3.jpg'
  },
  {
    id: 'rev-4',
    name: 'Margot Vane',
    location: 'Milan, Italy',
    rating: 5,
    date: '2 weeks ago',
    title: 'The French Noir set is pure couture',
    comment: 'The razor-sharp French smile line and gold foil trim look so opulent. I’ve received compliments from strangers at coffee shops and galas alike. The removal with warm water and oil was so gentle on my natural nails.',
    verified: true,
    productName: 'French Noir Couture',
    nailShape: 'Stiletto (Long)',
    image: '/images/ugc/ugc-4.jpg'
  }
];

export const CUSTOMIZER_COLORS = [
  { id: 'glazed-chrome', name: 'Hailey Glazed Pearl', hex: '#FAF3EB', gradient: 'linear-gradient(135deg, #FFF9F5 0%, #F5E6DC 50%, #E8D3CE 100%)', image: '/images/products/glazed-donut-chrome.jpg', price: 0 },
  { id: 'rose-quartz', name: 'Milky Rose Quartz', hex: '#F0D4CE', gradient: 'linear-gradient(135deg, #F8E5E1 0%, #E8BFB8 50%, #D8A59E 100%)', image: '/images/products/rose-quartz-ombre.jpg', price: 0 },
  { id: 'french-noir', name: 'French Noir Couture', hex: '#262224', gradient: 'linear-gradient(135deg, #383134 0%, #1E1A1B 50%, #120F10 100%)', image: '/images/products/french-noir-couture.jpg', price: 4 },
  { id: 'champagne-silk', name: 'Champagne Dew Drops', hex: '#EEDCBE', gradient: 'linear-gradient(135deg, #FBF2DE 0%, #E8D0AA 50%, #CEB185 100%)', image: '/images/products/champagne-dew-drop.jpg', price: 4 },
  { id: 'celestial-silver', name: 'Celestial Silver Aurora', hex: '#D6DEE6', gradient: 'linear-gradient(135deg, #E8EEF5 0%, #C4CFDB 50%, #A8B5C4 100%)', image: '/images/products/celestial-silver-aura.jpg', price: 4 },
  { id: 'burgundy-wine', name: 'Bordeaux Velvet & Gold', hex: '#63212C', gradient: 'linear-gradient(135deg, #872F3E 0%, #541B24 50%, #3B1218 100%)', image: '/images/products/velvet-burgundy-gold.jpg', price: 4 }
];

export const CUSTOMIZER_ARTS = [
  { id: 'clean', name: 'Minimalist Clean High-Gloss', desc: 'No embellishments, mirror glass diamond gel top coat', price: 0, icon: '✦' },
  { id: 'french-gold', name: 'Micro-French + 24K Gold Leaf', desc: 'Crisp smile line detailed with genuine gold foil fragments', price: 8, icon: '❖' },
  { id: 'pearls-dew', name: '3D Pearls & Crystal Dew Drops', desc: 'Hand-set mini freshwater pearls and high-refractive crystal dew', price: 12, icon: '●' },
  { id: 'chrome-swirl', name: 'Liquid Silver Chrome Swirls', desc: 'Sculpted 3D molten silver liquid chrome accents', price: 10, icon: '༄' },
  { id: 'aura-ombre', name: 'Aurora Velvet Ombré Aura', desc: 'Diffused center aura glow with velvet magnetic cat-eye', price: 8, icon: '✹' }
];

export const SHAPES_DATA = [
  { id: 'Almond', name: 'Almond', desc: 'Timeless, elongating & feminine. Soft tapered tip.', popular: true },
  { id: 'Coffin', name: 'Coffin / Ballerina', desc: 'Modern high-fashion tapered silhouette with flat tip.', popular: true },
  { id: 'Square', name: 'Square', desc: 'Classic crisp 90° straight edge. Sleek & clean.', popular: false },
  { id: 'Stiletto', name: 'Stiletto', desc: 'Dramatic sharp pointed apex. Bold statement.', popular: false },
  { id: 'Squoval', name: 'Squoval', desc: 'Square with soft rounded corners. Universally flattering.', popular: true },
  { id: 'Oval', name: 'Oval', desc: 'Softly rounded curve. Natural everyday elegance.', popular: false }
];

export const LENGTHS_DATA = [
  { id: 'Short', name: 'Short (14–16mm)', desc: 'Natural nail bed length. Ideal for effortless typing & active days.' },
  { id: 'Medium', name: 'Medium (18–20mm)', desc: 'Our signature editorial length. Elongating yet practical.' },
  { id: 'Long', name: 'Long (23–25mm)', desc: 'Dramatic statement length for high-glamour impact.' },
  { id: 'Extra Long', name: 'Extra Long (28–30mm)', desc: 'Runway-level couture length for maximum visual presence.' }
];
