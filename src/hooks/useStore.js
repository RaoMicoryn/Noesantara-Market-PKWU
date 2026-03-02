import { useState } from "react";

/**
 * useCart — manage cart state
 */
export function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, delta) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return { cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal };
}

/**
 * useWishlist — manage wishlist state
 */
export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const isWishlisted = (id) => wishlist.includes(id);

  return { wishlist, toggleWishlist, isWishlisted };
}

/**
 * useToast — show temporary toast messages
 */
export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast };
}
