"use client";

import { useCart } from '../providers/cart-context';
import CheckoutForm from '../components/CheckoutForm';
import { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const { items, remove, clear } = useCart();
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  if (orderSuccess) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto max-w-md rounded-lg bg-white p-8">
            <div className="mb-4 text-5xl">✅</div>
            <h1 className="mb-2 text-2xl font-bold">Order Placed!</h1>
            <p className="mb-4 text-gray-600">Order ID: {orderSuccess.orderId}</p>
            <p className="mb-6 text-sm text-gray-500">Status: {orderSuccess.status}</p>
            <Link href="/" className="inline-block rounded bg-primary-600 px-6 py-2 text-white hover:bg-primary-700">
              Back Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const total = items.reduce((sum, it) => sum + (it.price || 0) * it.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">Cart</h1>

        {items.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center">
            <p className="text-gray-600">Your cart is empty</p>
            <Link href="/products" className="mt-4 inline-block rounded bg-primary-600 px-4 py-2 text-white">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-white p-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-semibold">₹{((item.price || 0) * item.quantity / 100).toFixed(2)}</div>
                      <button onClick={() => remove(item.id)} className="text-sm text-red-600 hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex justify-end">
                  <button onClick={clear} className="text-sm text-gray-600 hover:text-red-600">
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-lg border bg-white p-6 mb-6">
                <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{(total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm text-gray-600">
                  <span>Delivery</span>
                  <span>₹30.00</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{((total + 3000) / 100).toFixed(2)}</span>
                </div>
              </div>

              <CheckoutForm items={items} onSuccess={setOrderSuccess} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
