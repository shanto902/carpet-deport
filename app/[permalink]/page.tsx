import BlogBlock from "@/components/blocks/BlogBlock";
import BreadcrumbBlock from "@/components/blocks/BreadcrumbBlock";
import CategoriesShowcaseBlock from "@/components/blocks/CategoriesShowcaseBlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import InspiredGalleryBlock from "@/components/blocks/InspiredGalleryBlock";
import OneColumnBlock from "@/components/blocks/OneColumnBlock";
import PartnerBlock from "@/components/blocks/PartnerBlock";
import ProductShowcaseBlock from "@/components/blocks/ProductShowcaseBlock";
import StatisticBlock from "@/components/blocks/StatisticBlock";
import TestimonialBlock from "@/components/blocks/TestimonialBlock";
import TwoColumnBlock from "@/components/blocks/TwoColumnBlock";
import VideoBlock from "@/components/blocks/VideoBlock";
import { fetchPage, fetchPages } from "@/helper/fetchFromDirectus";
import {
  TBlock,
  TBlogBlogs,
  TBreadcrumbBlock,
  TCategoriesShowcaseBlock,
  THeroBlock,
  TInspiredGalleryBlock,
  TOneColumnBlock,
  TPartnerBlock,
  TProductShowCaseBlock,
  TStatisticBlock,
  TTestimonialBlock,
  TTwoColumnBlock,
  TVideoBlock,
} from "@/interfaces";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense } from "react";

interface PageProps {
  params: Promise<{
    permalink: string;
  }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { permalink } = await params;
    const result = await directus.request(
      readItems("pages", {
        filter: {
          permalink: {
            _eq: permalink,
          },
        },
        limit: 1,
        fields: ["permalink", "seo", "name"],
      })
    );

    const previousImages = (await parent).openGraph?.images || [];
    if (result && result.length > 0) {
      const page = result[0];
      return {
        title: page.seo.title || page.name || "Page not found",
        description: page.seo.meta_description || "",
        openGraph: {
          images: page.seo.og_image
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${page.seo.og_image}`,
                },
              ]
            : [...previousImages],
        },
        twitter: {
          card: "summary_large_image",
        },
      };
    }

    return {
      title: "Page not found",
      description: "This page does not exist.",
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);
    return {
      title: "Error",
      description: "Failed to fetch page metadata.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const pages = await fetchPages();
    return pages.map((page) => ({
      permalink: page.permalink,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    throw new Error("Error fetching categories");
  }
}

const renderBlock = (block: TBlock) => {
  switch (block.collection) {
    case "block_hero":
      return (
        <Suspense key={block.id}>
          <HeroBlock key={block.id} block={block as THeroBlock} />
        </Suspense>
      );
    case "block_categories_showcase":
      return (
        <Suspense key={block.id}>
          <CategoriesShowcaseBlock
            key={block.id}
            block={block as TCategoriesShowcaseBlock}
          />
        </Suspense>
      );
    case "block_video":
      return (
        <Suspense key={block.id}>
          <VideoBlock key={block.id} block={block as TVideoBlock} />
        </Suspense>
      );
    case "block_statstics":
      return (
        <Suspense key={block.id}>
          <StatisticBlock key={block.id} block={block as TStatisticBlock} />
        </Suspense>
      );
    case "block_two_columns":
      return (
        <Suspense key={block.id}>
          <TwoColumnBlock key={block.id} block={block as TTwoColumnBlock} />
        </Suspense>
      );
    case "block_two_columns":
      return (
        <Suspense key={block.id}>
          <TwoColumnBlock key={block.id} block={block as TTwoColumnBlock} />
        </Suspense>
      );
    case "block_partners":
      return (
        <Suspense key={block.id}>
          <PartnerBlock key={block.id} block={block as TPartnerBlock} />
        </Suspense>
      );

    case "block_inspired_gallery":
      return (
        <Suspense key={block.id}>
          <InspiredGalleryBlock
            key={block.id}
            block={block as TInspiredGalleryBlock}
          />
        </Suspense>
      );
    case "block_testimonial":
      return (
        <Suspense key={block.id}>
          <TestimonialBlock key={block.id} block={block as TTestimonialBlock} />
        </Suspense>
      );
    case "block_blogs":
      return (
        <Suspense key={block.id}>
          <BlogBlock key={block.id} block={block as TBlogBlogs} />
        </Suspense>
      );
    case "block_product_showcase":
      return (
        <Suspense key={block.id}>
          <ProductShowcaseBlock
            key={block.id}
            block={block as TProductShowCaseBlock}
          />
        </Suspense>
      );
    case "block_breadcrumb":
      return (
        <Suspense key={block.id}>
          <BreadcrumbBlock key={block.id} block={block as TBreadcrumbBlock} />
        </Suspense>
      );
    case "block_one_cloumn":
      return (
        <Suspense key={block.id}>
          <OneColumnBlock key={block.id} block={block as TOneColumnBlock} />
        </Suspense>
      );
    default:
      return <h2 key={(block as TBlock).id}>Unknown Block Type</h2>;
  }
};

const page = async ({ params }: PageProps) => {
  const { permalink } = await params;
  const pageData = await fetchPage(permalink);

  if (!pageData) {
    return <div>Page not found</div>;
  }
  return (
    <div key={pageData.id}>
      {pageData.blocks?.map((block) => renderBlock(block))}
    </div>
  );
};

export default page;
