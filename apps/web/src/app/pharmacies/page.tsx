"use client";

import { useEffect, useState } from 'react';

type Pharmacy = { id: string; name: string; address?: string };

export default function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  useEffect(() => {
    fetch('/api/pharmacies')
      .then((r) => r.json())
      .then((data) => setPharmacies(data || []))
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">Pharmacies</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pharmacies.map((p) => (
            <div key={p.id} className="rounded border bg-white p-4">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">{p.address}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
