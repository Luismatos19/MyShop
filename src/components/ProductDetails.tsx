import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import { Address } from "@/types/Address";
import { useCart } from "@/hooks/useCart";
import { fetchAddressService } from "@/services/addressService";
import { SelectionGroup } from "./SelectionGroup";
import { ShippingForm } from "./ShippingForm";
import { createCartItem } from "@/utils/cartUtils";

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
  const { addItem } = useCart();
  const router = useRouter();

  async function handleCepSearch() {
    const addr = await fetchAddressService(cep);
    if (addr) {
      setAddress(addr);
      setError(null);
    } else {
      setError("CEP não encontrado.");
      setAddress(null);
    }
  }

  function handleAddToCart() {
    if (!selectedSize || !selectedColor) {
      setError("POr favor selecione o tamanho.");
      return;
    }

    const item = createCartItem(title, price, selectedSize, selectedColor);
    addItem(item);
  }

  function handleGoToCart() {
    router.push("/cart");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-xl text-green-600 font-semibold mb-4">
        R$ {price.toFixed(2)}
      </p>

      <SelectionGroup
        title="Size"
        options={sizes}
        selected={selectedSize}
        onSelect={setSelectedSize}
      />

      <SelectionGroup
        title="Color"
        options={colors}
        selected={selectedColor}
        onSelect={setSelectedColor}
      />

      <ShippingForm
        cep={cep}
        setCep={setCep}
        error={error}
        address={address}
        handleCepSearch={handleCepSearch}
      />

      <Button
        onClick={handleAddToCart}
        className="w-full mt-4 bg-green-600 text-white"
      >
        Adicionar ao carrinho
      </Button>
      <Button
        onClick={handleGoToCart}
        className="w-full mt-4 bg-green-600 text-white"
      >
        Ir para o carrinho
      </Button>
    </div>
  );
}
