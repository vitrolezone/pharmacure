"use client";

import { useCart } from '../providers/cart-context';
import Link from 'next/link';

export default function CartPage() {
  const { items, remove, clear } = useCart();

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
        {items.length === 0 ? (
          <div>
            <p className="mb-4">Your cart is empty.</p>
            <Link href="/products" className="text-primary-600">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-center justify-between rounded border bg-white p-4">
                <div>
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium">₹{(it.price || 0).toFixed(2)}</div>
                  <button onClick={() => remove(it.id)} className="text-sm text-red-600">
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Total</div>
              <div className="text-lg font-semibold">₹{total.toFixed(2)}</div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => clear()} className="rounded border px-4 py-2">
                Clear
              </button>
              <Link href="/checkout" className="rounded bg-primary-600 px-4 py-2 text-white">
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
