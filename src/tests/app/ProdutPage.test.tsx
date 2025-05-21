import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useProductPage } from "@/hooks/useProductPage";
import ProductPage from "@/app/page";

jest.mock("@/hooks/useProductPage", () => ({
  useProductPage: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ProductPage Component", () => {
  const mockProductState = {
    isHydrated: true,
    selectedColor: "Preto",
    selectedSize: "40",
    mainImage: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
    price: 299.99,
    setSelectedColor: jest.fn(),
    setSelectedSize: jest.fn(),
    setMainImage: jest.fn(),
    cep: "",
    setCep: jest.fn(),
    address: null,
    setAddress: jest.fn(),
    error: null,
    setError: jest.fn(),
  };

  beforeEach(() => {
    (useProductPage as jest.Mock).mockReturnValue(mockProductState);
  });

  it("renders loading state when not hydrated", () => {
    (useProductPage as jest.Mock).mockReturnValue({ isHydrated: false });
    render(<ProductPage />);
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
  });

  it("renders product gallery and product details when hydrated", () => {
    render(<ProductPage />);
    expect(screen.getByText("Tênis Esportivo Confortável")).toBeInTheDocument();
    expect(screen.getByText("R$ 299.99")).toBeInTheDocument();
  });

  it("updates main image when changing product variant", () => {
    render(<ProductPage />);
    expect(screen.getByAltText("Produto")).toHaveAttribute(
      "src",
      expect.stringContaining("photo-1519744792095-2f2205e87b6f")
    );
  });
});
