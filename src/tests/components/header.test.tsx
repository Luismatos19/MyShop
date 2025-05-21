import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Header from "@/components/Header";

jest.mock("@/hooks/useCart", () => ({
  useCart: () => ({
    items: [{ id: "1" }, { id: "2" }],
  }),
}));

describe("Header Component", () => {
  it("should display the correct number of cart items", () => {
    render(<Header />);
    const cartBadge = screen.getByText("2");
    expect(cartBadge).toBeInTheDocument();
  });

  it("should render the main UI elements", () => {
    render(<Header />);
    expect(screen.getByText("MyShop")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Buscar produtos...")
    ).toBeInTheDocument();
  });
});
