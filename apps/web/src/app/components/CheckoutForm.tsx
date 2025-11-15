"use client";

import React, { useState } from 'react';
import { createOrder, payStripe, payUpi } from '../lib/api';

export default function CheckoutForm({ items, onSuccess }: { items: any[]; onSuccess: (order: any) => void }) {
  const [name, setName] = useState('Test User');
  const [phone, setPhone] = useState('9999999999');
  const [address, setAddress] = useState('1 Main St');
  const [pincode, setPincode] = useState('560001');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'upi' | 'cod'>('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((s, it) => s + (it.price || 0) * it.quantity, 0);

  async function handlePlaceOrder() {
    setError(null);
    if (!name || !phone || !address || !pincode) {
      setError('Please fill required billing and delivery fields');
      return;
    }

    const payload = {
      userId: 'u_test',
      items: items.map((i) => ({ productId: i.id, quantity: i.quantity, pharmacyId: i.pharmacyId || null })),
      billing: { name, phone, address, pincode },
      deliveryOption: { type: 'ASAP', slot: null },
      paymentMethod: { type: paymentMethod },
    };

    setLoading(true);
    try {
      const order = await createOrder(payload);
      if (paymentMethod === 'stripe') {
        // Use mock card
        const card = { number: '4242424242424242', exp: '12/34', cvc: '123' };
        const payRes = await payStripe(order.orderId, card);
        onSuccess(payRes);
      } else if (paymentMethod === 'upi') {
        const payRes = await payUpi(order.orderId);
        onSuccess(payRes);
      } else {
        onSuccess(order);
      }
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">Billing & Delivery</h3>
      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
      <div className="grid gap-3">
        <input className="rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        <input className="rounded border px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <input className="rounded border px-3 py-2" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        <input className="rounded border px-3 py-2" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" />
      </div>

      <h4 className="mt-6 mb-2 text-md font-semibold">Payment</h4>
      <div className="flex gap-2">
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="pm" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} /> Stripe
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="pm" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} /> UPI
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="pm" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> COD
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">Total</div>
        <div className="text-lg font-bold">₹{(total / 100).toFixed(2)}</div>
      </div>

      <button disabled={loading} onClick={handlePlaceOrder} className="mt-4 w-full rounded bg-primary-600 px-4 py-2 text-white">
        {loading ? 'Placing order...' : 'Place Order'}
      </button>
    </div>
  );
}
