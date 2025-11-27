"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/products/product-card';
import { getProductBySlug, getRelatedProducts, getReviewsForProduct } from '@/lib/data/products';
import { useCart } from '@/lib/context/cart-context';
import { Star, Check, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link href="/" className="text-gold hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, 4);
  const reviews = getReviewsForProduct(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white">
        {/* Breadcrumb */}
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-medium-gray">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <Link href="/#featured" className="hover:text-gold">{product.category}</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>
        </div>

        {/* Product Detail */}
        <section className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-bold mb-4 text-charcoal" style={{ fontFamily: 'Playfair Display, serif' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-medium-gray">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-charcoal">
                  ${product.price.toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <p className="text-medium-gray leading-relaxed mb-6">
                {product.longDescription}
              </p>

              {/* Specifications */}
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <h3 className="font-semibold text-charcoal mb-4">Specifications</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-medium-gray">Material:</dt>
                    <dd className="font-medium text-charcoal">{product.specs.material}</dd>
                  </div>
                  {product.specs.gemstone && (
                    <div className="flex justify-between">
                      <dt className="text-medium-gray">Gemstone:</dt>
                      <dd className="font-medium text-charcoal">{product.specs.gemstone}</dd>
                    </div>
                  )}
                  {product.specs.caratWeight && (
                    <div className="flex justify-between">
                      <dt className="text-medium-gray">Carat Weight:</dt>
                      <dd className="font-medium text-charcoal">{product.specs.caratWeight}</dd>
                    </div>
                  )}
                  {product.specs.dimensions && (
                    <div className="flex justify-between">
                      <dt className="text-medium-gray">Dimensions:</dt>
                      <dd className="font-medium text-charcoal">{product.specs.dimensions}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded hover:border-gold transition-colors"
                  >
                    −
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded hover:border-gold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-gold text-white font-medium py-4 px-8 rounded hover:bg-gold/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mb-6"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-medium-gray">
                  <Truck className="w-5 h-5 text-gold" />
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-medium-gray">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span>Lifetime warranty included</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-medium-gray">
                  <Check className="w-5 h-5 text-gold" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        {reviews.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-6 py-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-8 text-charcoal" style={{ fontFamily: 'Playfair Display, serif' }}>
              Customer Reviews
            </h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-3 font-medium text-charcoal">{review.author}</span>
                    <span className="ml-3 text-sm text-medium-gray">{review.date}</span>
                  </div>
                  <p className="text-medium-gray">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-6 py-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-8 text-charcoal" style={{ fontFamily: 'Playfair Display, serif' }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
