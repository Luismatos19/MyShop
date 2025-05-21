import { CartItem } from "@/types/CartItem";

const CART_KEY = "cart_items";

export function getCartItems(): CartItem[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }
}
