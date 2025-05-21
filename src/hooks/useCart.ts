"use client";

import { create } from "zustand";
import { CartItem } from "@/types/CartItem";

const CART_KEY = "cart-items";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  loadCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(CART_KEY) || "[]")
      : [],

  addItem: (item) =>
    set((state) => {
      const updatedItems = [...state.items, item];
      localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),

  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),

  loadCart: () =>
    set(() => ({
      items: JSON.parse(localStorage.getItem(CART_KEY) || "[]"),
    })),
}));
