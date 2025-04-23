"use client";
import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { TProductShowCaseBlock } from "@/interfaces";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { TiHeartOutline } from "react-icons/ti";
import { useState } from "react";
import Link from "next/link";

export default function ProductShowcaseBlock({
  block,
}: {
  block: TProductShowCaseBlock;
}) {
  const [activeImages, setActiveImages] = useState<{ [key: string]: string }>(
    {}
  );

  return (
    <section className="py-16 bg-white">
      <PaddingContainer className="mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Our All Products</h2>
          <CustomButton>View All Products</CustomButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {block?.item?.products?.map((product, idx) => {
            const productId = product?.products_id?.id;
            const textures = product?.products_id?.textures;
            const defaultImage = textures[0]?.directus_files_id;
            const currentImage = activeImages[productId] || defaultImage;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 drop-shadow-sm hover:drop-shadow-lg transition"
              >
                {/* Main Image */}
                <div className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${currentImage}`}
                    height={300}
                    width={400}
                    alt={product.products_id.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                    <TiHeartOutline className="text-gray-500 hover:text-red-500 h-5 w-5" />
                  </button>
                </div>

                {/* Texture Thumbnails */}
                <div className="flex items-center gap-2 mt-4 overflow-x-auto">
                  {textures.map((texture, i) => (
                    <Image
                      key={i}
                      alt={product.products_id.name}
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${texture.directus_files_id}`}
                      width={32}
                      height={32}
                      className={`w-8 h-8 m-1 rounded-full border cursor-pointer ${
                        currentImage === texture.directus_files_id
                          ? "border-red-500 ring-2 ring-primary"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        setActiveImages((prev) => ({
                          ...prev,
                          [productId]: texture.directus_files_id,
                        }))
                      }
                    />
                  ))}
                </div>

                {/* Category and Name */}
                <p className="text-sm text-gray-600 my-3">
                  {product.products_id.category.name}
                </p>
                <h3 className="font-medium text-lg">
                  {product.products_id.name}
                </h3>

                {/* Ratings */}
                <div className="flex items-center my-3 gap-1 text-yellow-500">
                  {[...Array(product.products_id.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  <Link
                    href={`/locations`}
                    className="bg-primary text-white text-sm  border transition-all duration-300 text-nowrap py-1  px-2 rounded-full hover:drop-shadow-md drop-shadow-none "
                  >
                    Find In Store
                  </Link>
                  <Link
                    href={`/see-room/${product.products_id.id}`}
                    className="border transition-all duration-300 text-nowrap border-primary text-primary hover:drop-shadow-md drop-shadow-none bg-white text-sm px-2 py-1 rounded-full"
                  >
                    See In My Room
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </PaddingContainer>
    </section>
  );
}
