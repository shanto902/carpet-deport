"use client";

import { TProduct } from "@/interfaces";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { TiHeartOutline } from "react-icons/ti";

interface ProductCardProps {
  product: TProduct;
  currentImage: string;
  onTextureClick: (textureId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currentImage,
  onTextureClick,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 drop-shadow-sm hover:drop-shadow-lg transition">
      {/* Main Image */}
      <div className="relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${currentImage}`}
          height={300}
          width={400}
          alt={product.name}
          className="w-full h-32 object-cover rounded-lg"
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
          <TiHeartOutline className="text-gray-500 hover:text-red-500 h-5 w-5" />
        </button>
      </div>

      {/* Texture Thumbnails */}
      <div className="flex items-center gap-2 mt-4 overflow-x-auto">
        {product.textures.map((texture, i) => (
          <Image
            key={i}
            alt={product.name}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${texture.directus_files_id}`}
            width={32}
            height={32}
            className={`w-8 h-8 m-1 rounded-full border cursor-pointer ${
              currentImage === texture.directus_files_id
                ? "border-red-500 ring-2 ring-red-400"
                : "border-gray-300"
            }`}
            onClick={() => onTextureClick(texture.directus_files_id)}
          />
        ))}
      </div>

      {/* Category and Name */}
      <p className="text-sm text-gray-600 my-3">{product.category?.name}</p>
      <h3 className="font-medium text-lg">{product.name}</h3>

      {/* Ratings */}
      <div className="flex items-center my-3 gap-1 text-yellow-500">
        {[...Array(product.rating)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <button className="bg-red-500 text-nowrap text-white text-sm px-3 py-1 rounded-full">
          Find In Store
        </button>
        <button className="border text-nowrap border-red-500 text-red-500 text-sm px-4 py-1 rounded-full">
          See In My Room
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
