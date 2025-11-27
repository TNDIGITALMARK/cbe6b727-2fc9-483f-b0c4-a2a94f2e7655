"use client";

import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { categories } from '@/lib/data/products';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-bold tracking-wider text-charcoal" style={{ fontFamily: 'Playfair Display, serif' }}>
              A
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gold transition-colors uppercase tracking-wide"
            >
              Shop
            </Link>
            <Link
              href="/#necklaces"
              className="text-sm font-medium text-gray-700 hover:text-gold transition-colors uppercase tracking-wide"
            >
              Necklaces
            </Link>
            <Link
              href="/#earrings"
              className="text-sm font-medium text-gray-700 hover:text-gold transition-colors uppercase tracking-wide"
            >
              Earrings
            </Link>
            <Link
              href="/#earrings"
              className="text-sm font-medium text-gray-700 hover:text-gold transition-colors uppercase tracking-wide"
            >
              Earrings
            </Link>
            <Link
              href="/#bracelets"
              className="text-sm font-medium text-gray-700 hover:text-gold transition-colors uppercase tracking-wide"
            >
              Bracelets
            </Link>
            <Link
              href="/#bracelets"
              className="text-sm font-medium text-gray-700 hover:text-gold transition-colors uppercase tracking-wide"
            >
              Bracelets
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:text-gold transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              className="relative p-2 hover:text-gold transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
