import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import ProductDetails from "@/components/pages/see-room/ProductDetails";
import ProductSpecification from "@/components/pages/see-room/ProductSpecification";
import SeeInRoom from "@/components/pages/see-room/SeeInRoom";
import { getProductData } from "@/helper/fetchFromDirectus";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";

import React, { Suspense } from "react";
interface PageProps {
  params: Promise<{
    permalink: string;
    id: string;
  }>;
}

//   export async function generateMetadata(
//     { params }: PageProps,
//     parent: ResolvingMetadata
//   ): Promise<Metadata> {
//     try {
//       const { id } = await params;
//       const donation = await getDonationData(id);
//       const bodyText = donation?.body
//         ? parse(donation.body.toString().slice(0, 200))
//         : "";
//       const previousImages = (await parent).openGraph?.images || [];

//       if (donation !== null) {
//         return {
//           title: donation.title,
//           description: `${bodyText}` || "",
//           openGraph: {
//             images: donation.image
//               ? [
//                   {
//                     url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${donation.image}`,
//                   },
//                 ]
//               : [...previousImages],
//           },
//         };
//       }

//       // Default metadata if the page is not found
//       return {
//         title: "Donation not Found",
//         description: "This page does not exist.",
//       };
//     } catch (error) {
//       console.error("Error fetching page metadata:", error);

//       // Return default metadata in case of error
//       return {
//         title: "Error",
//         description: "Failed to fetch page metadata.",
//       };
//     }
//   }

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

  const product = await getProductData(id);
  if (!product) {
    return notFound();
  }

  return (
    <>
      <BreadcrumbBanner
        title="See in my room"
        breadcrumb={["Product Categories", product.name]}
      />
      <ProductDetails product={product} />
      <Suspense>
        <SeeInRoom product={product} />
      </Suspense>
      <ProductSpecification product={product} />
    </>
  );
};

export default page;
