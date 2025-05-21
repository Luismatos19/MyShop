import axios from "axios";
import { Address } from "@/types/Address";

const BASE_URL = "https://viacep.com.br/ws";

export async function fetchAddressService(
  cep: string
): Promise<Address | null> {
  try {
    const formattedCep = cep.replace(/\D/g, "");
    const response = await axios.get(`${BASE_URL}/${formattedCep}/json/`);

    if (response.data.erro) {
      throw new Error("CEP not found");
    }
    return response.data;
  } catch {
    return null;
  }
}
