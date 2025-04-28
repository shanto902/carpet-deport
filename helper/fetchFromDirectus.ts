import {
  TBlog,
  TCategory,
  TLocation,
  TPageBlock,
  TProduct,
  TTestimonial,
} from "@/interfaces";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

import { cache } from "react";

export const fetchPage = async (
  permalink: string
): Promise<TPageBlock | null> => {
  try {
    const result = await directus.request(
      readItems("pages", {
        filter: {
          permalink: {
            _eq: permalink,
          },
        },
        sort: ["blocks.sort"],
        fields: [
          {
            blocks: [
              "*",
              {
                item: {
                  block_hero: ["*"],

                  block_categories_showcase: [
                    "*",
                    "categories.categories_id.*",
                  ],
                  block_video: ["*"],
                  block_statstics: ["*"],
                  block_two_columns: ["*"],
                  block_partners: ["*", "partners.partners_id.*"],
                  block_inspired_gallery: ["*"],
                  block_testimonial: ["*", "testimonials.testimonials_id.*"],
                  block_blogs: ["*"],
                  block_product_showcase: [
                    "*",
                    "products.products_id.*",
                    "products.products_id.textures.*",
                    "products.products_id.textures.directus_files_id.*",
                    "products.products_id.category.name",
                  ],
                  block_breadcrumb: ["*"],
                  block_one_cloumn: ["*", "images.*", "cards.steps_id.*"],
                },
              },
            ],
          },
        ],
      })
    );

    return result[0] as TPageBlock; // Changed from `TPageBlock[]`
  } catch (error) {
    console.error("Failed to fetch about page data:", error);
    return null;
  }
};

export const fetchPages = async (): Promise<TPageBlock[]> => {
  try {
    const result = await directus.request(
      readItems("pages", {
        fields: ["permalink", "date_updated", "date_created"],
      })
    );
    return result as TPageBlock[];
  } catch (error) {
    console.error("Error generating sitemaps:", error);
    throw new Error("Failed to fetch all pages for sitemaps.");
  }
};

export const fetchProducts = async (): Promise<TProduct[]> => {
  try {
    const result = await directus.request(
      readItems("products", {
        fields: [
          "*",
          "category.name",
          "category.id",
          "textures.*",
          "textures.directus_files_id.*",
        ],
      })
    );

    return result as TProduct[];
  } catch (error) {
    console.error("Error fetch Product", error);
    throw new Error("Failed to fetch all products");
  }
};

export const fetchLocations = async (): Promise<TLocation[]> => {
  try {
    const result = await directus.request(
      readItems("locations", {
        fields: ["*"],
      })
    );
    return result as TLocation[];
  } catch (error) {
    console.error("Error fetch locations", error);
    throw new Error("Failed to fetch all locations");
  }
};

export const fetchCategories = async (): Promise<TCategory[]> => {
  try {
    const result = await directus.request(
      readItems("categories", {
        fields: ["*"],
      })
    );
    return result as TCategory[];
  } catch (error) {
    console.error("Error fetch locations", error);
    throw new Error("Failed to fetch all locations");
  }
};

export const fetchLocation = async (slug: string): Promise<TLocation> => {
  try {
    const result = await directus.request(
      readItems("locations", {
        filter: {
          slug: { _eq: slug },
        },
        fields: ["*"],
      })
    );
    return result[0] as TLocation;
  } catch (error) {
    console.error("Error fetch location", error);
    throw new Error("Failed to fetch all location");
  }
};

export const getAllBlogs = cache(
  async (
    page: number,
    limit: number
  ): Promise<{
    results: TBlog[];
    totalPages: number;
  }> => {
    try {
      const results = (await directus.request(
        readItems("blogs", {
          filter: {
            status: {
              _eq: "published",
            },
          },
          page: page,
          limit: limit,
          sort: ["sort"],
          fields: [
            "id",
            "date_created",
            "date_updated",
            "title",
            "slug",
            "image",
            "category.*",
          ],
        })
      )) as TBlog[];

      // ✅ Fetch total count for pagination
      const totalCount = await directus.request(
        readItems("blogs", {
          aggregate: { count: ["id"] },
          filter: { status: { _eq: "published" } },
        })
      );

      const totalPages = Math.ceil(totalCount[0].count.id / limit);

      return { results: results, totalPages };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw new Error("Error fetching blogs");
    }
  }
);

export const getRelatedBlogs = cache(
  async (
    id: number
  ): Promise<{
    results: TBlog[];
    totalPages: number;
  }> => {
    try {
      const results = (await directus.request(
        readItems("blogs", {
          filter: {
            status: {
              _eq: "published",
            },
            category: {
              id: {
                _eq: Number(id),
              },
            },
          },
          sort: ["sort"],
          fields: [
            "id",
            "date_created",
            "date_updated",
            "title",
            "slug",
            "image",
            "category.name",
            "category.*",
            "blogs.*",
          ],
        })
      )) as TBlog[];

      return { results: results, totalPages: 1 };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw new Error("Error fetching blogs");
    }
  }
);

export const getBlogData = cache(async (slug: string): Promise<TBlog> => {
  try {
    const result = await directus.request(
      readItems("blogs", {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        sort: ["sort"],
        fields: ["*", "category.id"],
      })
    );

    return result[0] as TBlog;
  } catch (error) {
    console.error("Error fetching member data:", error);
    throw new Error("Error fetching post");
  }
});

export const getTestimonials = cache(async (): Promise<TTestimonial[]> => {
  try {
    const result = await directus.request(
      readItems("testimonials", {
        sort: ["sort"],
        fields: ["*"],
      })
    );

    return result[0] as TTestimonial[];
  } catch (error) {
    console.error("Error fetching member data:", error);
    throw new Error("Error fetching post");
  }
});

export const getProductData = cache(async (id: string): Promise<TProduct> => {
  try {
    const results = await directus.request(
      readItems("products", {
        filter: {
          id,
        },
        sort: ["sort"],
        fields: [
          "*",
          "category.name",
          "category.id",
          "textures.*",
          "textures.directus_files_id.*",
        ],
      })
    );

    return results[0] as TProduct;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Error fetching product ");
  }
});
