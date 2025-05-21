"use client";

import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, removeItem } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Carrinho de Compras</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 border-b pb-4">
            <img
              src={`images/${item.color}-angle1.png`}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">
                Cor: {item.color} | Tamanho: {item.size}
              </p>
              <p className="text-sm text-gray-600">
                Quantidade: {item.quantity}
              </p>
              <p className="font-semibold text-green-600 mt-1">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:underline"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-right">
        <p className="text-xl font-semibold">Total: R$ {total.toFixed(2)}</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
