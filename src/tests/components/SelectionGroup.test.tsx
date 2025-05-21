import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SelectionGroup } from "@/components/SelectionGroup";

describe("SelectionGroup Component", () => {
  const mockOnSelect = jest.fn();
  const mockOptions = ["Small", "Medium", "Large"];
  const mockSelected = "Medium";

  it("renders options correctly", () => {
    render(
      <SelectionGroup
        title="Size"
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText("Size")).toBeInTheDocument();
    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls onSelect when clicking an option", () => {
    render(
      <SelectionGroup
        title="Size"
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByText("Large"));
    expect(mockOnSelect).toHaveBeenCalledWith("Large");
  });
});
