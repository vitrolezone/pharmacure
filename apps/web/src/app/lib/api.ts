export async function getProducts(params: { mode?: string; q?: string; lat?: number; lng?: number }) {
  const url = new URL('/api/products', location.origin);
  if (params.mode) url.searchParams.set('mode', params.mode);
  if (params.q) url.searchParams.set('q', params.q);
  if (params.lat) url.searchParams.set('lat', String(params.lat));
  if (params.lng) url.searchParams.set('lng', String(params.lng));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductPrices(productId: string) {
  const res = await fetch(`/api/products/${productId}/prices`);
  if (!res.ok) throw new Error('Failed to fetch prices');
  return res.json();
}

export async function createOrder(payload: any) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Order creation failed');
  }
  return res.json();
}

export async function payStripe(orderId: string, card: any) {
  const res = await fetch('/api/payments/stripe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, card }),
  });
  if (!res.ok) throw new Error('Stripe payment failed');
  return res.json();
}

export async function payUpi(orderId: string) {
  const res = await fetch('/api/payments/upi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId }),
  });
  if (!res.ok) throw new Error('UPI payment failed');
  return res.json();
}
