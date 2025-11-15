"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../providers/cart-context';

type Product = { id: string; name: string; description?: string; inventory?: any[] };

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => setProduct(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!product) return <p className="p-8">Product not found</p>;

  function handleAdd() {
    const price = product.inventory && product.inventory.length > 0 ? product.inventory[0].price || 0 : 0;
    add({ id: product.id, name: product.name, price, quantity: 1 });
    router.push('/cart');
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
        <p className="mb-6 text-gray-700">{product.description}</p>
        <div className="flex gap-4">
          <button onClick={handleAdd} className="rounded bg-primary-600 px-4 py-2 text-white">
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
