import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  mainImage: string;
  setMainImage: (img: string) => void;
}

export default function ProductGallery({
  images,
  mainImage,
  setMainImage,
}: ProductGalleryProps) {
  return (
    <div>
      <div className="w-full aspect-square relative">
        <Image
          src={mainImage}
          alt="Produto"
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="flex gap-2 mt-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setMainImage(img)}
            className={`w-20 h-20 border rounded-lg overflow-hidden ${
              mainImage === img ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`Miniatura ${i + 1}`}
              width={80}
              height={80}
              objectFit="cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}