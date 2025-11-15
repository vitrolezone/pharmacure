"use client";

import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function CheapestPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({ mode: 'cheapest' })
      .then((data) => {
        setProducts((data.products || []).slice(0, 12));
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Order from Cheapest Pharmacy</h1>
        <p className="mb-8 text-lg text-gray-600">Price comparisons across partner pharmacies — showing the lowest prices first.</p>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 rounded border bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600">No products available.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

