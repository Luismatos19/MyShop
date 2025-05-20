'use client'

import ProductGallery from "@/components/ProductGallery";
import ProductDetails from "@/components/ProductDetails";
import { useProductPage } from "@/hooks/useProductPage";
import type { ProductData } from "@/types/ProductData";
import { LoadingOverlay } from "@/components/LoadingOverlay";

const PRODUCT_DATA: ProductData = {
  title: "Tênis Esportivo Confortável",
  sizes: ["38", "39", "40", "41", "42"],
  colors: ["Preto", "Branco", "Azul"],
  variants: {
    Preto: {
      price: 299.99,
      images: [
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590080877777-36eb05b08d4c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1528701800489-564d1f8b3959?auto=format&fit=crop&w=800&q=80",
      ],
    },
    Branco: {
      price: 279.99,
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      ],
    },
    Azul: {
      price: 289.99,
      images: [
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1520975927815-7df96d23b9ec?auto=format&fit=crop&w=800&q=80",
      ],
    },
  },
};

export default function ProductPage() {
  const productState = useProductPage({ product: PRODUCT_DATA });

  if (!productState.isHydrated) {
    return <LoadingOverlay />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProductGallery
        images={PRODUCT_DATA.variants[productState.selectedColor].images}
        mainImage={productState.mainImage}
        setMainImage={productState.setMainImage}
      />
      <ProductDetails
        title={PRODUCT_DATA.title}
        price={productState.price}
        sizes={PRODUCT_DATA.sizes}
        colors={PRODUCT_DATA.colors}
        selectedSize={productState.selectedSize}
        setSelectedSize={productState.setSelectedSize}
        selectedColor={productState.selectedColor}
        setSelectedColor={productState.setSelectedColor}
        cep={productState.cep}
        setCep={productState.setCep}
        address={productState.address}
        setAddress={productState.setAddress}
        error={productState.error}
        setError={productState.setError}
      />
    </div>
  );
}
