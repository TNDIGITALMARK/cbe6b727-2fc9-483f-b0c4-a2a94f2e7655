"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useCart } from '@/lib/context/cart-context';
import { Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const shippingCost = totalPrice > 500 ? 0 : 25;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order placed successfully! Thank you for your purchase.');
    setIsCheckout(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md px-6">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-charcoal" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your Cart is Empty
            </h1>
            <p className="text-medium-gray mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-gold text-white font-medium px-8 py-3 rounded hover:bg-gold/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8 text-charcoal" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isCheckout ? 'Checkout' : 'Shopping Cart'}
          </h1>

          {!isCheckout ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-32 h-32 bg-gray-50 rounded flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="text-lg font-semibold text-charcoal hover:text-gold"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-medium-gray mt-1">
                          {item.product.description}
                        </p>
                        <p className="text-xl font-bold text-charcoal mt-2">
                          ${item.product.price.toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded hover:border-gold transition-colors"
                            >
                              −
                            </button>
                            <span className="text-base font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded hover:border-gold transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              removeFromCart(item.product.id);
                              toast.success('Item removed from cart');
                            }}
                            className="text-red-500 hover:text-red-600 transition-colors flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-charcoal">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4 text-charcoal">Order Summary</h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-medium-gray">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-medium-gray">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-medium-gray">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-charcoal">
                      <span>Total</span>
                      <span>${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  {totalPrice < 500 && (
                    <p className="text-sm text-medium-gray mb-4 text-center p-2 bg-gold/10 rounded">
                      Add ${(500 - totalPrice).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  <button
                    onClick={() => setIsCheckout(true)}
                    className="w-full bg-gold text-white font-medium py-4 rounded hover:bg-gold/90 transition-colors"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/"
                    className="block text-center text-gold hover:underline mt-4"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
                  {/* Contact Information */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-charcoal">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-charcoal">Shipping Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Address</label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                          placeholder="123 Main St"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">City</label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">ZIP Code</label>
                          <input
                            type="text"
                            required
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="10001"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-charcoal flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Card Number</label>
                        <input
                          type="text"
                          required
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">CVV</label>
                          <input
                            type="text"
                            required
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsCheckout(false)}
                      className="flex-1 border-2 border-gray-300 text-charcoal font-medium py-4 rounded hover:border-gold transition-colors"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gold text-white font-medium py-4 rounded hover:bg-gold/90 transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4 text-charcoal">Order Summary</h2>

                  <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-medium-gray">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-charcoal">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-medium-gray">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-medium-gray">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-medium-gray">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-charcoal">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
