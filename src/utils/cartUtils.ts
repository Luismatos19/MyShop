import { CartItem } from "@/types/CartItem";

export function createCartItem(
  title: string,
  price: number,
  size: string,
  color: string
): CartItem {
  return {
    id: Math.random().toString(36).substring(2, 15),
    title,
    price,
    size,
    color,
    quantity: 1,
  };
}
