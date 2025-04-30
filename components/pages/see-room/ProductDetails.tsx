"use client";

import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { TProduct } from "@/interfaces";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  product: TProduct;
};

const ProductDetails = ({ product }: Props) => {
  const searchParams = useSearchParams();
  const tileFromQuery = searchParams.get("tile");

  // ✅ useMemo to avoid textureUrls recalculating on every render
  const textureUrls = useMemo(() => {
    return (
      product?.textures?.map(
        (t) =>
          `${process.env.NEXT_PUBLIC_ASSETS_URL}${t.directus_files_id.id}?width=300&height=300`
      ) || []
    );
  }, [product?.textures]);

  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);

  useEffect(() => {
    if (tileFromQuery) {
      const decodedTile = decodeURIComponent(tileFromQuery);
      const foundTile = textureUrls.find((url) => url.includes(decodedTile));
      if (foundTile) {
        setSelectedTexture(foundTile);
        return;
      }
    }
    if (textureUrls.length > 0) {
      setSelectedTexture(textureUrls[0]);
    }
  }, [tileFromQuery, textureUrls]);

  return (
    <PaddingContainer className="py-10 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left content */}
        <div className="md:w-2/5 w-full space-y-4">
          <Link
            href={"/categories"}
            className="bg-gray-100 w-fit flex items-center gap-2 text-sm px-4 py-2 rounded-full font-bold hover:drop-shadow-md transition-all"
          >
            <ArrowLeft className="size-4" /> Back
          </Link>
          <h1 className="text-2xl font-bold leading-snug">
            {product?.name} <br /> By {product?.brand}
          </h1>
          <p className="text-gray-500">Carpet | SKU# {product?.sku}</p>
          <p className="text-sm text-gray-600">
            Color:{" "}
            <span className="font-semibold text-black">
              {product?.color_tones || product?.look}
            </span>
          </p>
          <div className="flex gap-4 mt-4">
            <CustomButton href={"/consultation"} button_type="arrow">
              Request More Info
            </CustomButton>
            <CustomButton href={"/locations"} button_type="location" inverted>
              Find In Store
            </CustomButton>
          </div>
        </div>

        {/* Right content */}
        <div className="md:w-3/5 w-full flex flex-col sm:flex-row gap-5 items-center">
          {selectedTexture && (
            <div className="aspect-[4/3] flex-3/5  bg-gray-100 rounded-xl overflow-hidden mb-6 w-full max-w-lg">
              <Image
                src={selectedTexture}
                alt="Selected Carpet"
                width={390}
                height={280}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Thumbnails */}
          <div className="flex flex-2/5 flex-wrap gap-4">
            {textureUrls.map((url, idx) => (
              <div key={idx} className="relative group">
                <button
                  onClick={() => setSelectedTexture(url)}
                  className={`w-14 h-14 cursor-pointer rounded overflow-hidden border transition-all ${
                    url === selectedTexture
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`Texture ${idx + 1}`}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </button>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  {product?.textures[idx]?.directus_files_id?.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PaddingContainer>
  );
};

export default ProductDetails;
