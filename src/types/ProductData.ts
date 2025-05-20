
export interface Variant {
    price: number;
    images: string[];
  }

export interface ProductData {
    title: string;
    sizes: string[];
    colors: string[];
    variants: Record<string, Variant>;
}
