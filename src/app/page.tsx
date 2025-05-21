"use client";

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
        "/images/Preto-angle1.png",
        "/images/Preto-angle2.png",
        "/images/Preto-angle3.png",
      ],
    },
    Branco: {
      price: 279.99,
      images: [
        "/images/Branco-angle1.png",
        "/images/Branco-angle2.png",
        "/images/Branco-angle3.png",
      ],
    },
    Azul: {
      price: 289.99,
      images: [
        "/images/Azul-angle1.png",
        "/images/Azul-angle2.png",
        "/images/Azul-angle3.png",
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
