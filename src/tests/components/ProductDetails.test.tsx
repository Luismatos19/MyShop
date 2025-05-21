import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import ProductDetails from "@/components/ProductDetails";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useCart", () => ({
  useCart: jest.fn(),
}));

describe("ProductDetails Component", () => {
  const mockAddItem = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useCart as unknown as jest.Mock).mockReturnValue({ addItem: mockAddItem });
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("renders product details correctly", () => {
    render(
      <ProductDetails
        title="Cool Sneakers"
        price={129.99}
        sizes={["39", "40", "41"]}
        colors={["Red", "Blue", "Black"]}
        selectedSize={null}
        setSelectedSize={jest.fn()}
        selectedColor={null}
        setSelectedColor={jest.fn()}
        cep=""
        setCep={jest.fn()}
        address={null}
        setAddress={jest.fn()}
        error={null}
        setError={jest.fn()}
      />
    );

    expect(screen.getByText("Cool Sneakers")).toBeInTheDocument();
    expect(screen.getByText("R$ 129.99")).toBeInTheDocument();
  });

  it("adds product to the cart when clicking 'Adicionar ao carrinho'", () => {
    render(
      <ProductDetails
        title="Cool Sneakers"
        price={129.99}
        sizes={["39", "40"]}
        colors={["Red", "Blue"]}
        selectedSize="40"
        setSelectedSize={jest.fn()}
        selectedColor="Red"
        setSelectedColor={jest.fn()}
        cep=""
        setCep={jest.fn()}
        address={null}
        setAddress={jest.fn()}
        error={null}
        setError={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Adicionar ao carrinho"));
    expect(mockAddItem).toHaveBeenCalled();
  });

  it("navigates to cart page when clicking 'Ir para o carrinho'", () => {
    render(
      <ProductDetails
        title="Cool Sneakers"
        price={129.99}
        sizes={["39", "40"]}
        colors={["Red", "Blue"]}
        selectedSize="40"
        setSelectedSize={jest.fn()}
        selectedColor="Red"
        setSelectedColor={jest.fn()}
        cep=""
        setCep={jest.fn()}
        address={null}
        setAddress={jest.fn()}
        error={null}
        setError={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Ir para o carrinho"));
    expect(mockRouterPush).toHaveBeenCalledWith("/cart");
  });
});
