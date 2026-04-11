'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@/lib/scraper';

export interface CartItem {
  product: Product;
  quantity: number;
  finalArs: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, conversionRate: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalArs: number;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart JSON');
      }
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, conversionRate: number) => {
    if (!product.slug) return;
    
    setItems(prev => {
      const existing = prev.find(item => item.product.slug === product.slug);
      
      const rawArs = (product.usdPrice || 0) * conversionRate + 15000;
      const finalArs = Math.ceil(rawArs / 1000) * 1000;

      if (existing) {
        return prev.map(item => 
          item.product.slug === product.slug 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { product, quantity: 1, finalArs }];
    });
  };

  const removeFromCart = (slug: string) => {
    setItems(prev => prev.filter(item => item.product.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item => 
      item.product.slug === slug ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalArs = items.reduce((sum, item) => sum + (item.finalArs * item.quantity), 0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Disappears after 3 seconds
  };

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalArs, showToast
    }}>
      {children}
      {toastMessage && (
        <div className="global-toast">
          {toastMessage}
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
