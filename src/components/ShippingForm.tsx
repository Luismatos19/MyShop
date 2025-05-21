import Button from "@/components/ui/Button";
import { Address } from "@/types/Address";

interface ShippingFormProps {
  cep: string;
  setCep: (cep: string) => void;
  error: string | null;
  address: Address | null;
  handleCepSearch: () => void;
}

export function ShippingForm({
  cep,
  setCep,
  error,
  address,
  handleCepSearch,
}: ShippingFormProps) {
  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-1">Consultar Frete </h2>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digitar seu CEP"
          className="border p-2 rounded-lg w-48"
        />
        <Button onClick={handleCepSearch}>Verificar</Button>
      </div>
      {error && <p className="text-red-500 mt-1">{error}</p>}
      {address && (
        <p className="mt-2 text-sm text-gray-700">
          {address.logradouro}, {address.bairro}, {address.localidade} -{" "}
          {address.uf}
        </p>
      )}
    </div>
  );
}
