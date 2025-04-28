"use client";

import { TProduct } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
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
    <div className="bg-white hover:z-40 p-3 overflow-visible rounded-lg drop-shadow-[#E1E1E140] drop-shadow-2xl hover:drop-shadow-lg transition">
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
      <div className="flex items-center gap-2 mt-4 ">
        {product.textures.slice(0, 5).map((texture, i) => {
          const textureId = texture.directus_files_id?.id;
          const textureTitle = texture.directus_files_id?.title || product.name;

          return (
            <div key={i} className="relative group">
              <Image
                alt={textureTitle}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${textureId}`}
                width={32}
                height={32}
                className={`w-7 h-7 m-1 rounded-full border cursor-pointer ${
                  currentImage === textureId
                    ? "border-primary ring-2 ring-primary"
                    : "border-gray-300"
                }`}
                onClick={() => onTextureClick(textureId)}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {textureTitle}
              </div>
            </div>
          );
        })}

        {product.textures.length > 5 && (
          <Link
            href={`/see-room/${product.id}?tile=${currentImage}           `}
            className="rounded-full flex items-center justify-center text-sm"
          >
            +{product.textures.length - 5}
          </Link>
        )}
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
      <div className="flex gap-2 mt-4 justify-between flex-wrap">
        <Link
          href={`/locations`}
          className="bg-primary hover:drop-shadow-md drop-shadow-none text-nowrap text-white text-sm px-2 py-1 rounded-full"
        >
          Find In Store
        </Link>
        <Link
          href={`/see-room/${product.id}?tile=${currentImage}`}
          className="border transition-all duration-300 text-nowrap border-primary text-primary hover:drop-shadow-md drop-shadow-none bg-white text-sm px-2 py-1 rounded-full"
        >
          See In My Room
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
