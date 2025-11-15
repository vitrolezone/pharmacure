"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getProductPrices } from '../lib/api';

export default function ProductDetailModal({ id, open, onClose }: { id: string | null; open: boolean; onClose: () => void }) {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !id) return;
    setLoading(true);
    getProductPrices(id)
      .then((data) => setPrices(data.prices || []))
      .catch(() => setPrices([]))
      .finally(() => setLoading(false));
  }, [open, id]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div className="relative z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Product details</h3>
              <button onClick={onClose} className="text-gray-500">Close</button>
            </div>

            {loading ? (
              <div className="mt-6">Loading prices...</div>
            ) : (
              <div className="mt-4 grid gap-3">
                {prices.length === 0 && <div className="text-sm text-gray-600">No pricing available.</div>}
                {prices.map((p) => (
                  <div key={p.pharmacyId} className="flex items-center justify-between rounded border p-3">
                    <div>
                      <div className="font-medium">{p.pharmacyName}</div>
                      <div className="text-sm text-gray-600">Est: {p.deliveryEstimateMin} min</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">₹{(p.price / 100).toFixed(2)}</div>
                      <div className="text-sm text-gray-500">Delivery ₹{(p.deliveryFee || 0)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
