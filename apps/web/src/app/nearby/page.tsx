"use client";

import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function NearbyPage() {
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({ mode: 'nearby' })
      .then((data) => {
        setPharmacies(data.pharmacies || []);
        setProducts((data.products || []).slice(0, 6));
      })
      .catch(() => {
        setPharmacies([]);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Order from Nearby Store</h1>
        <p className="mb-8 text-lg text-gray-600">
          We show a sample of nearby partner pharmacies and some available medicines.
        </p>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-semibold">Nearby Pharmacies</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pharmacies.map((p) => (
                  <div key={p.id} className="rounded-lg border bg-white p-4">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-600">{p.distanceKm}km away</div>
                    <div className="mt-2 text-sm text-gray-600">Est: {p.estimatedDeliveryMin} min</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Popular medicines nearby</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

