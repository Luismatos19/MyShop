import { getCartItems, saveCartItems } from "@/services/cartService";
import { CartItem } from "@/types/CartItem";

const CART_KEY = "cart_items";

describe("Cart Storage Functions", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty array when no items are stored", () => {
    expect(getCartItems()).toEqual([]);
  });

  it("saves and retrieves cart items correctly", () => {
    const mockItems: CartItem[] = [
      {
        id: "1",
        title: "Tênis",
        price: 299.99,
        quantity: 1,
        color: "Preto",
        size: "40",
        image: "",
      },
      {
        id: "2",
        title: "Camiseta",
        price: 79.99,
        quantity: 2,
        color: "Azul",
        size: "M",
        image: "",
      },
    ];

    saveCartItems(mockItems);
    expect(JSON.parse(localStorage.getItem(CART_KEY)!)).toEqual(mockItems);

    const retrievedItems = getCartItems();
    expect(retrievedItems).toEqual(mockItems);
  });

  it("does not crash in non-browser environments", () => {
    const originalWindow = global.window;
    delete (global as any).window;

    expect(getCartItems()).toEqual([]);

    global.window = originalWindow;
  });
});
