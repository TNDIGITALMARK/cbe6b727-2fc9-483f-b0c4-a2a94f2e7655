// Mock product data for jewelry ecommerce store

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  material: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  specs: {
    material: string;
    weight?: string;
    dimensions?: string;
    gemstone?: string;
    caratWeight?: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const categories = [
  'Rings',
  'Necklaces',
  'Earrings',
  'Bracelets',
  'Brooches'
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Solitaire Ring',
    slug: 'classic-solitaire-ring',
    price: 2499,
    description: '14k white gold with 1 carat diamond',
    longDescription: 'This timeless classic solitaire engagement ring features a brilliant 1 carat round diamond set in 14k white gold. The elegant four-prong setting allows maximum light to enter the diamond, creating exceptional sparkle and fire. Perfect for celebrating your special moment.',
    category: 'Rings',
    material: '14k White Gold',
    images: ['/generated/ring-diamond-solitaire.png'],
    inStock: true,
    rating: 5,
    reviewCount: 127,
    specs: {
      material: '14k White Gold',
      caratWeight: '1.0 ct',
      gemstone: 'Natural Diamond',
      dimensions: 'Band width: 2mm'
    }
  },
  {
    id: '2',
    name: 'Celestial Pendant Necklace',
    slug: 'celestial-pendant-necklace',
    price: 899,
    description: 'Freshwater pearls with sterling silver clasp',
    longDescription: 'Elegant freshwater pearl pendant suspended from a delicate 18-inch gold chain. The lustrous pearl is carefully selected for its exceptional quality and radiance. A timeless piece that adds sophistication to any outfit.',
    category: 'Necklaces',
    material: 'Gold',
    images: ['/generated/necklace-pearl-pendant.png'],
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
    specs: {
      material: '14k Yellow Gold Chain',
      gemstone: 'Freshwater Pearl',
      dimensions: 'Chain length: 18 inches, Pearl: 10mm'
    }
  },
  {
    id: '3',
    name: 'Rose Gold Stud Earrings',
    slug: 'rose-gold-stud-earrings',
    price: 349,
    description: '18k rose gold with cubic zirconia',
    longDescription: 'Simple yet stunning, these rose gold stud earrings feature brilliant cubic zirconia stones that capture and reflect light beautifully. The warm rose gold setting complements all skin tones and adds a touch of modern elegance.',
    category: 'Earrings',
    material: '18k Rose Gold',
    images: ['/generated/earrings-rose-gold-studs.png'],
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
    specs: {
      material: '18k Rose Gold',
      gemstone: 'Cubic Zirconia',
      dimensions: '6mm diameter'
    }
  },
  {
    id: '4',
    name: 'Tennis Bracelet Deluxe',
    slug: 'tennis-bracelet-deluxe',
    price: 1299,
    description: 'Sterling silver with lab-created diamonds',
    longDescription: 'A stunning tennis bracelet featuring a continuous row of brilliant lab-created diamonds set in sterling silver. This classic design offers timeless elegance and exceptional sparkle for any occasion.',
    category: 'Bracelets',
    material: 'Sterling Silver',
    images: ['/generated/bracelet-diamond-tennis.png'],
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
    specs: {
      material: 'Sterling Silver',
      gemstone: 'Lab-Created Diamonds',
      caratWeight: 'Total 5.0 ct',
      dimensions: 'Length: 7 inches'
    }
  },
  {
    id: '5',
    name: 'Emerald Teardrop Earrings',
    slug: 'emerald-teardrop-earrings',
    price: 1899,
    description: 'White gold with natural emeralds and diamonds',
    longDescription: 'Exquisite teardrop-shaped emerald earrings surrounded by brilliant diamonds. The rich green emeralds are complemented by sparkling diamond accents, creating a stunning combination of color and brilliance.',
    category: 'Earrings',
    material: '18k White Gold',
    images: ['/generated/earrings-emerald-teardrop.png'],
    inStock: true,
    rating: 5,
    reviewCount: 94,
    specs: {
      material: '18k White Gold',
      gemstone: 'Natural Emerald & Diamonds',
      caratWeight: 'Emerald: 2.5 ct each, Diamonds: 0.75 ct total',
      dimensions: 'Length: 25mm'
    }
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    author: 'Sarah M.',
    rating: 5,
    comment: 'Absolutely stunning! The diamond sparkles beautifully and the quality exceeded my expectations. Perfect engagement ring.',
    date: '2024-10-15'
  },
  {
    id: '2',
    productId: '2',
    author: 'Jessica T.',
    rating: 5,
    comment: 'Beautiful quality and fast shipping. The pearl has a gorgeous luster. I wear it every day!',
    date: '2024-10-10'
  },
  {
    id: '3',
    productId: '3',
    author: 'Emily R.',
    rating: 5,
    comment: 'Love these earrings! They are elegant yet simple enough for everyday wear. Great value for the price.',
    date: '2024-10-05'
  }
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(count: number = 4): Product[] {
  return products.slice(0, count);
}

export function getRelatedProducts(productId: string, count: number = 4): Product[] {
  const product = products.find(p => p.id === productId);
  if (!product) return [];

  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, count);
}

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId);
}
