import axios from "axios";
import type { Address } from "@/types/Address";

export interface CepService {
  lookupCep(cep: string): Promise<Address>;
}

export class ViaCepService implements CepService {
  async lookupCep(cep: string): Promise<Address> {
    const formattedCep = cep.replace(/\D/g, "");
    const res = await axios.get(`https://viacep.com.br/ws/${formattedCep}/json/`);
    if (res.data.erro) throw new Error("CEP não encontrado");
    return res.data;
  }
}