"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('pharmify_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pharmify_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  // Listen for global add-to-cart events from ProductCard
  useEffect(() => {
    function handler(e: any) {
      try {
        const detail = e.detail;
        if (!detail || !detail.productId) return;
        // Minimal product shape: id, price, quantity
        const item: CartItem = {
          id: detail.productId,
          name: detail.name || 'Product',
          price: detail.price || 0,
          quantity: detail.quantity || 1,
        };
        add(item);
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener('pharmify:add-to-cart', handler as EventListener);
    return () => window.removeEventListener('pharmify:add-to-cart', handler as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function add(item: CartItem) {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p));
      }
      return [...prev, item];
    });
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function clear() {
    setItems([]);
  }

  return <CartContext.Provider value={{ items, add, remove, clear }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
