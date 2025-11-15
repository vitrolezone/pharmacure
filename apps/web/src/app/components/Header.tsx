"use client";

import Link from 'next/link';
import { useCart } from '../providers/cart-context';

export default function Header() {
  const { items } = useCart();

  return (
    <header className="w-full border-b bg-white/50 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div>
          <Link href="/" className="text-lg font-bold">
            Pharmify
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/products" className="text-sm hover:underline">
            Products
          </Link>
          <Link href="/pharmacies" className="text-sm hover:underline">
            Pharmacies
          </Link>
          <Link href="/nearby" className="text-sm hover:underline">
            Nearby
          </Link>
          <Link href="/cheapest" className="text-sm hover:underline">
            Cheapest
          </Link>
          <Link href="/cart" className="ml-4 inline-flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-white">
            Cart <span className="rounded bg-white/20 px-2 py-0.5 text-sm">{items.length}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
