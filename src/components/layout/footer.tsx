import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
                A<br />
                LUXURY JEWELS
              </span>
            </Link>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-light-gray">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-light-gray hover:text-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/craftmanship" className="text-sm text-light-gray hover:text-gold transition-colors">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-sm text-light-gray hover:text-gold transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-light-gray">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-light-gray hover:text-gold transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-light-gray hover:text-gold transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-light-gray hover:text-gold transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-light-gray">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-light-gray hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/sizing" className="text-sm text-light-gray hover:text-gold transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-sm text-light-gray hover:text-gold transition-colors">
                  Jewelry Care
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Payment */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-light-gray mr-2">Follow Us</span>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-light-gray">Secure Payment</span>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-xs">
                  VISA
                </div>
                <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-xs">
                  MC
                </div>
                <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-xs">
                  AMEX
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-light-gray">
              © 2024-2025 A Luxury Jewels. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
