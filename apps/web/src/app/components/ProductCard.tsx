"use client";

import React from 'react';

type Inventory = {
  id: string;
  price: number;
  pharmacy?: { id: string; name: string } | null;
};

type Product = {
  id: string;
  name: string;
  brand?: string | null;
  inventory?: Inventory[];
};

export default function ProductCard({ product }: { product: Product }) {
  const cheapest = product.inventory && product.inventory.length > 0
    ? product.inventory.reduce((low, cur) => (cur.price < low.price ? cur : low), product.inventory[0])
    : null;

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">{product.brand || 'Generic'}</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">{product.name}</div>
          {cheapest && (
            <div className="mt-2 text-sm text-gray-600">
              From <span className="font-medium text-gray-800">{cheapest.pharmacy?.name || 'Partner Pharmacy'}</span>
            </div>
          )}
        </div>

        <div className="ml-4 flex flex-col items-end">
          <div className="text-lg font-bold text-primary-600">
            {cheapest ? `₹${(cheapest.price / 100).toFixed(2)}` : 'N/A'}
          </div>
          <button
            className="mt-3 inline-flex items-center rounded-md bg-primary-600 px-3 py-1 text-sm font-semibold text-white hover:bg-primary-700"
            onClick={() => {
              // Basic add-to-cart placeholder: emit a custom event for cart provider
              const ev = new CustomEvent('pharmify:add-to-cart', { detail: { productId: product.id, price: cheapest?.price || 0, pharmacyId: cheapest?.pharmacy?.id } });
              window.dispatchEvent(ev);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
