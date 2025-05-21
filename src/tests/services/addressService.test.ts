import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchAddressService } from "@/services/addressService";
import { Address } from "@/types/Address";

const BASE_URL = "https://viacep.com.br/ws";

describe("fetchAddressService", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("fetches address successfully", async () => {
    const mockCep = "12345-678";
    const mockAddress: Address = {
      logradouro: "Rua Teste",
      bairro: "Centro",
      localidade: "São Paulo",
      uf: "SP",
    };

    mock
      .onGet(`${BASE_URL}/${mockCep.replace(/\D/g, "")}/json/`)
      .reply(200, mockAddress);

    const result = await fetchAddressService(mockCep);

    expect(result).toEqual(mockAddress);
  });

  it("returns null when CEP is not found", async () => {
    const mockCep = "00000-000";

    mock
      .onGet(`${BASE_URL}/${mockCep.replace(/\D/g, "")}/json/`)
      .reply(200, { erro: true });

    const result = await fetchAddressService(mockCep);

    expect(result).toBeNull();
  });

  it("handles API errors gracefully", async () => {
    const mockCep = "11111-111";

    mock
      .onGet(`${BASE_URL}/${mockCep.replace(/\D/g, "")}/json/`)
      .networkError();

    const result = await fetchAddressService(mockCep);

    expect(result).toBeNull();
  });

  it("correctly formats the CEP before fetching", async () => {
    const mockCep = "12.345-678";
    const formattedCep = mockCep.replace(/\D/g, "");
    const mockAddress: Address = {
      logradouro: "Rua Teste",
      bairro: "Centro",
      localidade: "São Paulo",
      uf: "SP",
    };

    mock.onGet(`${BASE_URL}/${formattedCep}/json/`).reply(200, mockAddress);

    const result = await fetchAddressService(mockCep);

    expect(result).toEqual(mockAddress);
  });
});
