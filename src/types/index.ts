export type NailShape = 'Almond' | 'Coffin' | 'Stiletto' | 'Square' | 'Squoval' | 'Oval';
export type NailLength = 'Short' | 'Medium' | 'Long' | 'Extra Long';
export type NailCategory = 'All' | 'Minimalist' | '3D Art' | 'Chrome & Metallic' | 'Seasonal' | 'Bridal';
export type AdhesiveType = 'tabs' | 'glue' | 'both';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: NailCategory;
  shape: NailShape;
  length: NailLength;
  finish: string;
  badge?: string;
  image: string;
  hoverImage?: string;
  description: string;
  details: string[];
  inStock: boolean;
  bestseller?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  shape: NailShape;
  length: NailLength;
  size: 'XS' | 'S' | 'M' | 'L' | 'Custom';
  adhesive: AdhesiveType;
  quantity: number;
  isCustom?: boolean;
  customDetails?: {
    baseColor: string;
    artType: string;
    customMeasurements?: string;
  };
}

export interface LayerSpec {
  number: string;
  name: string;
  tagline: string;
  description: string;
  thickness: string;
  material: string;
  benefit: string;
  colorHex: string;
  image: string;
}

export interface CustomSetState {
  shape: NailShape;
  length: NailLength;
  baseColor: {
    id: string;
    name: string;
    hex: string;
    gradient: string;
    image: string;
    price: number;
  };
  artType: {
    id: string;
    name: string;
    desc: string;
    price: number;
    icon: string;
  };
  size: 'XS' | 'S' | 'M' | 'L' | 'Custom';
  customMeasurements: {
    thumb: number;
    index: number;
    middle: number;
    ring: number;
    pinky: number;
  };
  adhesive: AdhesiveType;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
  nailShape: string;
  image: string;
}

export interface CrossSellItem {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
}
