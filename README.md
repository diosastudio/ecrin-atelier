# ÉCRIN ATELIER — Luxury Press-On Nail Brand Experience

An Apple-style, high-end beauty editorial web experience built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Features a **scroll-controlled image sequence hero animation** showing the transition from an assembled press-on nail set to an exploded quad-layer architectural view.

---

## ✦ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will be live at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## ✦ Core Feature: Scroll-Controlled Hero Animation

The hero section uses `<ScrollSequenceHero />` (`src/components/ScrollSequenceHero.tsx`) to scrub smoothly through sequential image frames as the user scrolls down and up.

```tsx
<ScrollSequenceHero
  framesPath="/frames"
  totalFrames={40}
  framePrefix="frame_"
  frameExtension=".jpg"
/>
```

### How to Swap In Your Real Animation Frames:
1. Place your ordered frame files into `/public/frames/`.
2. Ensure they are named sequentially:
   - `frame_0001.jpg` (Assembled luxury set)
   - `frame_0002.jpg`
   - ...
   - `frame_0040.jpg` (Exploded quad-layer view)
3. If you have more or fewer frames, simply adjust the `totalFrames` prop in `src/App.tsx`.
4. The component automatically handles:
   - Progressive preloading (first 10 priority frames load immediately).
   - High-DPI / Retina canvas scaling.
   - Preserves original aspect ratio (`object-fit: contain`).
   - Smooth lerp interpolation for 60fps/120fps display performance.
   - Interactive manual scrub controller and auto-play preview mode.

---

## ✦ Asset Directory Structure

```
public/
├── frames/
│   ├── frame_0001.jpg      # Frame 1: Assembled nail set
│   ├── ...
│   └── frame_0040.jpg      # Frame 40: Exploded quad-layer view
├── images/
│   ├── hero-assembled.jpg  # Static assembled hero fallback
│   ├── hero-exploded.jpg   # Static exploded hero fallback
│   ├── products/           # 8 Curated Best-Selling Sets
│   │   ├── glazed-donut-chrome.jpg
│   │   ├── rose-quartz-ombre.jpg
│   │   ├── french-noir-couture.jpg
│   │   ├── champagne-dew-drop.jpg
│   │   ├── celestial-silver-aura.jpg
│   │   ├── bridal-silk-pearl.jpg
│   │   ├── velvet-burgundy-gold.jpg
│   │   └── minimalist-vanilla-glaze.jpg
│   └── ugc/                # Customer photo reviews & editorial models
│       ├── ugc-1.jpg ... ugc-6.jpg
```

---

## ✦ How to Customize Copy, Colors & Fonts

### 1. Brand Copy & Product Catalog
- **Products & Specs**: Edit `src/data/products.ts`. You can modify names, descriptions, prices, shapes, lengths, review scores, and specs.
- **Quad-Layer Science**: In `src/data/products.ts`, edit `LAYERS_DATA` to update technical copy for Top Coat, Art Layer, Polymer Core, and Adhesive Matrix.
- **Customer Reviews**: In `src/data/products.ts`, edit `TESTIMONIALS` to add real customer quotes and photos.

### 2. Colors & Styling
Edit `tailwind.config.js` to change the luxury palette:
- `cream`: Soft warm base whites (`#FAF8F5`, `#F5F1EB`)
- `nude`: Warm taupes and blush undertones (`#F4ECE6`, `#EADCD2`, `#DDC5B5`)
- `taupe`: Muted neutral accents (`#83766E`, `#4E443E`)
- `charcoal`: High-contrast luxury typography (`#1C1817`, `#120F0E`)
- `rosegold` / `champagne`: Warm metallic highlights

### 3. Typography
- Defined in `index.html` and `tailwind.config.js`:
  - Headings: `Cormorant Garamond` (high-contrast luxury serif)
  - Body & UI: `Plus Jakarta Sans` (clean geometric modern sans)

---

## ✦ Key Site Components

| Component | Description |
|---|---|
| `Header.tsx` | Sticky glassmorphic navbar with announcement bar, search, and cart indicator. |
| `ScrollSequenceHero.tsx` | Flagship scroll-controlled canvas sequence with Apple-style HUD annotations. |
| `CraftsmanshipSection.tsx` | Quad-layer deconstructed inspector and comparison matrix vs salon acrylics. |
| `CollectionsGrid.tsx` | Filterable product catalog (All, Minimalist, 3D Art, Chrome, Bridal, Seasonal). |
| `CustomizationSection.tsx` | Bespoke builder (Shape, Length, Base Color, 3D Embellishments, Sizing). |
| `HowItWorksSection.tsx` | 3-step 8-min application guide and Tabs vs Glue comparison. |
| `SocialProofSection.tsx` | Vogue/Harper's Bazaar press bar, verified reviews, and UGC gallery. |
| `FinalCTASection.tsx` | Atelier VIP Club newsletter with instant 15% discount code (`ATELIER15`). |
| `CartDrawer.tsx` | Slide-over drawer with free shipping calculator and express checkout. |
| `SizingModal.tsx` | Interactive millimeter sizing chart, tape measurement method, and free kit request. |
| `QuickViewModal.tsx` | Detailed product inspector with shape/length customization and instant add to bag. |

---

© 2026 ÉCRIN ATELIER. All rights reserved.
