import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/types/CartItem";

const CART_KEY = "cart-items";

describe("useCart Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with an empty cart", () => {
    expect(useCart.getState().items).toEqual([]);
  });

  it("adds an item to the cart", () => {
    const newItem: CartItem = {
      id: "1",
      title: "Tênis Esportivo",
      price: 299.99,
      quantity: 1,
      color: "Preto",
      size: "40",
      image: "https://example.com/shoe.jpg",
    };

    useCart.getState().addItem(newItem);

    expect(useCart.getState().items).toContainEqual(newItem);
    expect(JSON.parse(localStorage.getItem(CART_KEY)!)).toContainEqual(newItem);
  });

  it("removes an item from the cart", () => {
    const item1: CartItem = {
      id: "1",
      title: "Item 1",
      price: 100,
      quantity: 1,
      color: "Red",
      size: "M",
      image: "",
    };
    const item2: CartItem = {
      id: "2",
      title: "Item 2",
      price: 200,
      quantity: 1,
      color: "Blue",
      size: "L",
      image: "",
    };

    useCart.getState().addItem(item1);
    useCart.getState().addItem(item2);
    useCart.getState().removeItem("1");

    expect(useCart.getState().items).toEqual([item2]);
    expect(JSON.parse(localStorage.getItem(CART_KEY)!)).toEqual([item2]);
  });

  it("loads items from local storage", () => {
    const storedItems = [
      {
        id: "1",
        title: "Item 1",
        price: 100,
        quantity: 1,
        color: "Red",
        size: "M",
        image: "",
      },
    ];

    localStorage.setItem(CART_KEY, JSON.stringify(storedItems));
    useCart.getState().loadCart();

    expect(useCart.getState().items).toEqual(storedItems);
  });
});
