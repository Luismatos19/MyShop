import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useCart } from "@/hooks/useCart";
import CartPage from "@/app/cart/page";

// Mock useCart hook
jest.mock("@/hooks/useCart", () => ({
  useCart: jest.fn(),
}));

describe("CartPage Component", () => {
  const mockRemoveItem = jest.fn();

  const mockItems = [
    {
      id: "1",
      title: "Tênis Esportivo",
      price: 299.99,
      quantity: 1,
      color: "Preto",
      size: "40",
      image: "https://example.com/shoe1.jpg",
    },
    {
      id: "2",
      title: "Camiseta Dry Fit",
      price: 79.99,
      quantity: 2,
      color: "Azul",
      size: "M",
      image: "https://example.com/shirt1.jpg",
    },
  ];

  beforeEach(() => {
    (useCart as unknown as jest.Mock).mockReturnValue({
      items: mockItems,
      removeItem: mockRemoveItem,
    });
  });

  it("displays empty cart message when there are no items", () => {
    (useCart as unknown as jest.Mock).mockReturnValue({
      items: [],
      removeItem: mockRemoveItem,
    });
    render(<CartPage />);
    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
  });

  it("renders cart items correctly", () => {
    render(<CartPage />);

    expect(screen.getByText("Tênis Esportivo")).toBeInTheDocument();
    expect(screen.getByText("Camiseta Dry Fit")).toBeInTheDocument();
    expect(screen.getByText("Cor: Preto | Tamanho: 40")).toBeInTheDocument();
    expect(screen.getByText("Quantidade: 2")).toBeInTheDocument();
    expect(screen.getByText("R$ 299.99")).toBeInTheDocument();
    expect(screen.getByText("R$ 159.98")).toBeInTheDocument();
  });

  it("calculates total price correctly", () => {
    render(<CartPage />);

    expect(screen.getByText("Total: R$ 459.97")).toBeInTheDocument();
  });

  it("removes an item when clicking 'Remover'", () => {
    render(<CartPage />);

    fireEvent.click(screen.getAllByText("Remover")[0]);
    expect(mockRemoveItem).toHaveBeenCalledWith("1");
  });
});
