import { renderHook, act } from "@testing-library/react";
import { useProductPage } from "@/hooks/useProductPage";
import type { ProductData } from "@/types/ProductData";

const STORAGE_KEY = "product-page-state";

const mockProduct: ProductData = {
  title: "Tênis Esportivo",
  sizes: ["38", "39", "40"],
  colors: ["Preto", "Branco"],
  variants: {
    Preto: {
      price: 299.99,
      images: ["/preto1.jpg", "/preto2.jpg"],
    },
    Branco: {
      price: 279.99,
      images: ["/branco1.jpg", "/branco2.jpg"],
    },
  },
};

describe("useProductPage Hook", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear stored data before each test
  });

  it("initializes with default product values", () => {
    const { result } = renderHook(() =>
      useProductPage({ product: mockProduct })
    );

    expect(result.current.selectedColor).toBe("Preto");
    expect(result.current.selectedSize).toBe("38");
    expect(result.current.mainImage).toBe("/preto1.jpg");
  });

  it("persists selected state in local storage", () => {
    const { result } = renderHook(() =>
      useProductPage({ product: mockProduct })
    );

    act(() => {
      result.current.setSelectedColor("Branco");
      result.current.setSelectedSize("39");
      result.current.setMainImage("/branco2.jpg");
    });

    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)!).data;
    expect(storedData.selectedColor).toBe("Branco");
    expect(storedData.selectedSize).toBe("39");
    expect(storedData.mainImage).toBe("/branco2.jpg");
  });

  it("loads state from local storage if recent", () => {
    const mockState = {
      timestamp: Date.now(),
      data: {
        selectedColor: "Branco",
        mainImage: "/branco2.jpg",
        selectedSize: "39",
        cep: "12345-678",
        address: {
          logradouro: "Rua Teste",
          bairro: "Centro",
          localidade: "São Paulo",
          uf: "SP",
        },
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockState));

    const { result } = renderHook(() =>
      useProductPage({ product: mockProduct })
    );

    expect(result.current.selectedColor).toBe("Branco");
    expect(result.current.selectedSize).toBe("39");
    expect(result.current.mainImage).toBe("/branco2.jpg");
    expect(result.current.cep).toBe("12345-678");
    expect(result.current.address).toEqual(mockState.data.address);
  });

  it("resets main image when changing color", () => {
    const { result } = renderHook(() =>
      useProductPage({ product: mockProduct })
    );

    act(() => {
      result.current.setSelectedColor("Branco");
    });

    expect(result.current.mainImage).toBe("/branco1.jpg");
  });
});
