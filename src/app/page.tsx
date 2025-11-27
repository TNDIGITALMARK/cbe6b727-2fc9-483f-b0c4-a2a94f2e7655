import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/products/product-card';
import { getFeaturedProducts } from '@/lib/data/products';
import { ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[400px]">
            {/* Left Panel - Rings */}
            <div className="relative bg-black">
              <Image
                src="/generated/hero-rings-black-bg.png"
                alt="Luxury Engagement Rings"
                fill
                className="object-cover opacity-90"
                priority
              />
            </div>

            {/* Center Panel - Brand Message */}
            <div className="relative bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="mb-4">
                  <span className="text-5xl font-bold tracking-widest text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    A
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2 uppercase tracking-wider text-charcoal" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Timeless Elegance
                </h1>
                <p className="text-sm text-medium-gray mb-6 leading-relaxed">
                  Discover jewelry pieces that capture the essence of luxury and meaning
                </p>
                <Link
                  href="/#featured"
                  className="inline-block bg-gold text-white font-medium px-8 py-3 rounded hover:bg-gold/90 transition-colors uppercase text-sm tracking-wide"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Right Panel - Earrings */}
            <div className="relative bg-black">
              <Image
                src="/generated/hero-earrings-black-bg.png"
                alt="Luxury Earrings"
                fill
                className="object-cover opacity-90"
              />
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="featured" className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="mb-4">
                <span className="text-4xl text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  A
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-charcoal" style={{ fontFamily: 'Playfair Display, serif' }}>
                Featured Products
              </h2>
              <p className="text-medium-gray max-w-2xl mx-auto">
                Explore our carefully curated collection of exquisite jewelry pieces
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link
                href="/#featured"
                className="inline-block border-2 border-gold text-gold font-medium px-8 py-3 rounded hover:bg-gold hover:text-white transition-colors uppercase text-sm tracking-wide"
              >
                View All Collection
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Badge 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                  <ShieldCheck className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-charcoal">
                  Trusted By Our Customers
                </h3>
                <p className="text-sm text-medium-gray">
                  Thousands trust us for our ethical sourcing and exceptional quality
                </p>
              </div>

              {/* Badge 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-charcoal">
                  Premium Craftsmanship
                </h3>
                <p className="text-sm text-medium-gray">
                  Each piece is meticulously crafted by master artisans
                </p>
              </div>

              {/* Badge 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-charcoal">
                  Lifetime Value
                </h3>
                <p className="text-sm text-medium-gray">
                  Timeless designs that retain their beauty and value
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}