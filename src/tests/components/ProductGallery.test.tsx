import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductGallery from "@/components/ProductGallery";

describe("ProductGallery Component", () => {
  const mockSetMainImage = jest.fn();
  const mockImages = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];
  const mockMainImage = mockImages[0];

  it("renders correctly", () => {
    render(
      <ProductGallery
        images={mockImages}
        mainImage={mockMainImage}
        setMainImage={mockSetMainImage}
      />
    );

    expect(screen.getByAltText("Produto")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(mockImages.length);
  });

  it("changes main image when clicking a thumbnail", () => {
    render(
      <ProductGallery
        images={mockImages}
        mainImage={mockMainImage}
        setMainImage={mockSetMainImage}
      />
    );

    fireEvent.click(screen.getByAltText("Miniatura 2"));
    expect(mockSetMainImage).toHaveBeenCalledWith("/img2.jpg");
  });
});
