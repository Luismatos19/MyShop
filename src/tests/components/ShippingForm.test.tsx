import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ShippingForm } from "@/components/ShippingForm";

describe("ShippingForm Component", () => {
  const mockSetCep = jest.fn();
  const mockHandleCepSearch = jest.fn();
  const mockAddress = {
    logradouro: "Rua Teste",
    bairro: "Bairro Teste",
    localidade: "Cidade Teste",
    uf: "SP",
  };

  it("renders correctly", () => {
    render(
      <ShippingForm
        cep=""
        setCep={mockSetCep}
        error={null}
        address={null}
        handleCepSearch={mockHandleCepSearch}
      />
    );

    expect(screen.getByPlaceholderText("Digitar seu CEP")).toBeInTheDocument();
    expect(screen.getByText("Verificar")).toBeInTheDocument();
  });

  it("updates CEP input value", () => {
    render(
      <ShippingForm
        cep=""
        setCep={mockSetCep}
        error={null}
        address={null}
        handleCepSearch={mockHandleCepSearch}
      />
    );

    const input = screen.getByPlaceholderText("Digitar seu CEP");
    fireEvent.change(input, { target: { value: "12345-678" } });

    expect(mockSetCep).toHaveBeenCalledWith("12345-678");
  });

  it("calls handleCepSearch when clicking the verify button", () => {
    render(
      <ShippingForm
        cep=""
        setCep={mockSetCep}
        error={null}
        address={null}
        handleCepSearch={mockHandleCepSearch}
      />
    );

    fireEvent.click(screen.getByText("Verificar"));
    expect(mockHandleCepSearch).toHaveBeenCalled();
  });

  it("displays the address when available", () => {
    render(
      <ShippingForm
        cep="12345-678"
        setCep={mockSetCep}
        error={null}
        address={mockAddress}
        handleCepSearch={mockHandleCepSearch}
      />
    );

    expect(
      screen.getByText("Rua Teste, Bairro Teste, Cidade Teste - SP")
    ).toBeInTheDocument();
  });

  it("displays an error message when error is present", () => {
    render(
      <ShippingForm
        cep=""
        setCep={mockSetCep}
        error="CEP não encontrado"
        address={null}
        handleCepSearch={mockHandleCepSearch}
      />
    );

    expect(screen.getByText("CEP não encontrado")).toBeInTheDocument();
  });
});
