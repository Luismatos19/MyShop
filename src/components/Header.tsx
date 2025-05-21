"use client";

import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/hooks/useCart";

export default function Header() {
  const { items } = useCart();

  return (
    <header className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MyShop
        </Link>

        <div className="flex flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-600 px-4 text-white rounded-r-md">
            <Search size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-600 hover:text-blue-600">
            Entrar
          </button>
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {items.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
