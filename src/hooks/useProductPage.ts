import { useEffect, useState } from "react";
import type { Address } from "@/types/Address";
import type { ProductData } from "@/types/ProductData";

const STORAGE_KEY = "product-page-state";

interface UseProductPageParams {
  product: ProductData;
}

export function useProductPage({ product }: UseProductPageParams) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [mainImage, setMainImage] = useState(product.variants[selectedColor].images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { timestamp, data } = JSON.parse(saved);
      if (Date.now() - timestamp < 15 * 60 * 1000) {
        setSelectedColor(data.selectedColor);
        setMainImage(data.mainImage);
        setSelectedSize(data.selectedSize);
        setCep(data.cep);
        setAddress(data.address);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return; 
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: { selectedColor, mainImage, selectedSize, cep, address },
      })
    );
  }, [selectedColor, mainImage, selectedSize, cep, address, isHydrated]);

  useEffect(() => {
    setMainImage(product.variants[selectedColor].images[0]);
  }, [selectedColor, product.variants]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: { selectedColor, mainImage, selectedSize, cep, address },
      })
    );
  }, [selectedColor, mainImage, selectedSize, cep, address]);

  return {
    selectedColor,
    setSelectedColor,
    mainImage,
    setMainImage,
    selectedSize,
    setSelectedSize,
    cep,
    setCep,
    address,
    setAddress,
    error,
    setError,
    price: product.variants[selectedColor].price,
    isHydrated,
  };
}