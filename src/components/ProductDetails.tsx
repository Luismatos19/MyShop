import axios from "axios";

import { Address } from "@/types/Address";

interface ProductDetailsProps {
  title: string;
  price: number;
  sizes: string[];
  colors: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
  cep: string;
  setCep: (cep: string) => void;
  address: Address | null;
  setAddress: (addr: Address | null) => void;
  error: string | null;
  setError: (msg: string | null) => void;
}

export default function ProductDetails({
  title,
  price,
  sizes,
  colors,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  cep,
  setCep,
  address,
  setAddress,
  error,
  setError,
}: ProductDetailsProps) {
  const handleCepSearch = async () => {
    try {
      const formattedCep = cep.replace(/\\D/g, "");
      const res = await axios.get(
        `https://viacep.com.br/ws/${formattedCep}/json/`
      );
      if (res.data.erro) {
        setError("CEP não encontrado");
        setAddress(null);
      } else {
        setAddress(res.data);
        setError(null);
      }
    } catch (err) {
      setError("Erro ao consultar o CEP");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-xl text-green-600 font-semibold mb-4">
        R$ {price.toFixed(2)}
      </p>

      <div className="mb-4">
        <h2 className="font-semibold mb-1">Tamanho</h2>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded-full ${
                selectedSize === size
                  ? "bg-blue-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-1">Cor</h2>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded-full ${
                selectedColor === color
                  ? "bg-blue-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-1">Consultar Frete</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite seu CEP"
            className="border p-2 rounded-lg w-48"
          />
          <button
            onClick={handleCepSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Verificar
          </button>
        </div>
        {error && <p className="text-red-500 mt-1">{error}</p>}
        {address && (
          <p className="mt-2 text-sm text-gray-700">
            {address.logradouro}, {address.bairro}, {address.localidade} -{" "}
            {address.uf}
          </p>
        )}
      </div>
    </div>
  );
}