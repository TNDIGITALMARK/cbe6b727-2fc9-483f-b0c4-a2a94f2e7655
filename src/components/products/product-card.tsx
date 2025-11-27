import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded shadow hover-lift overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-base font-medium text-charcoal mb-1 group-hover:text-gold transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-medium-gray mb-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-charcoal">
              ${product.price.toLocaleString()}
            </span>

            {product.inStock ? (
              <span className="inline-block bg-gold text-white text-xs font-bold px-3 py-1 rounded">
                In Stock
              </span>
            ) : (
              <span className="inline-block bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded">
                Sold Out
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
