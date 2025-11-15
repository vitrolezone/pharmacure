"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = { id: string; name: string; description?: string; inventory?: any[] };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(data?.data || data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <Link href="/cart" className="text-sm text-primary-600">
            Go to cart
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="rounded border bg-white p-4">
                <h3 className="mb-2 text-lg font-semibold">{p.name}</h3>
                <p className="mb-4 text-sm text-gray-600">{p.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-700">
                    ₹{(p.inventory && p.inventory.length ? Math.min(...p.inventory.map((i: any) => i.price)) : 0).toFixed(2)}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/products/${p.id}`} className="text-primary-600 hover:underline">
                      View
                    </Link>
                    <Link href={`/products/${p.id}`} className="rounded bg-primary-600 px-3 py-1 text-white">
                      Buy
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
