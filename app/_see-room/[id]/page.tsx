import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import ProductDetails from "@/components/pages/see-room/ProductDetails";
import ProductSpecification from "@/components/pages/see-room/ProductSpecification";
import SeeInRoom from "@/components/pages/see-room/SeeInRoom";
import { getProductData } from "@/helper/fetchFromDirectus";
import { TSettings } from "@/interfaces";
import directus from "@/lib/directus";
import { readItems, readSingleton } from "@directus/sdk";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import React, { Suspense } from "react";
interface PageProps {
  params: Promise<{
    permalink: string;
    id: string;
  }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProductData(id);
    const previousImages = (await parent).openGraph?.images || [];

    if (product !== null) {
      return {
        title:
          `${product?.name} | ${product.category.name} | Carpet Depot` ||
          "No description available",
        description: `${product.brand} - ${product.look}` || "",
        openGraph: {
          images: product.textures
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${product.textures[0].directus_files_id.id}`,
                },
              ]
            : [...previousImages],
        },
      };
    }

    // Default metadata if the page is not found
    return {
      title: "product not Found",
      description: "This page does not exist.",
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);

    // Return default metadata in case of error
    return {
      title: "Error",
      description: "Failed to fetch page metadata.",
    };
  }
}

export const generateStaticParams = async () => {
  try {
    const result = await directus.request(
      readItems("products", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["id"],
      })
    );

    const allParams =
      (
        result as {
          id: string;
        }[]
      ).map((item) => ({
        id: item.id,
        permalink: "see-room",
      })) || [];

    return allParams;
  } catch (error) {
    console.error("Error fetching career:", error);
    throw new Error("Error fetching Career");
  }
};
const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const settings = (await directus.request(
    readSingleton("settings")
  )) as TSettings;
  const product = await getProductData(id);
  if (!product) {
    return notFound();
  }

  return (
    <>
      <BreadcrumbBanner
        title="See in my room"
        breadcrumb={["Product Categories", product.name]}
        image={settings.see_in_room}
      />
      <Suspense>
        <ProductDetails product={product} />
      </Suspense>
      <Suspense>
        <SeeInRoom product={product} />
      </Suspense>
      <ProductSpecification product={product} />
    </>
  );
};

export default page;
