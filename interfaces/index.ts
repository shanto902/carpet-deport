export type TPageBlock = {
  date_created: string;
  last_updated: string;
  id: string;
  name: string;
  seo: Record<string, string>;
  permalink: string;
  date_updated: string;
  blocks: TBlock[];
};

export type TBlock =
  | THeroBlock
  | TCategoriesShowcaseBlock
  | TVideoBlock
  | TTwoColumnBlock
  | TStatisticBlock
  | TInspiredGalleryBlock
  | TTestimonialBlock
  | TBlogBlogs
  | TProductShowCaseBlock
  | TPartnerBlock;

export type THeroBlock = {
  collection: "block_hero";
  id: string;
  item: {
    background_image: string;
    button_text: string;
    button_link: string;
    body: string;
  };
};

export type TVideoBlock = {
  collection: "block_video";
  id: string;
  item: {
    header: string;
    youtube_video_link: string;
  };
};

export type TStatisticBlock = {
  collection: "block_statstics";
  id: string;
  item: {
    statstics: [{ label: string; value: string }];
  };
};
export type TCategoriesShowcaseBlock = {
  collection: "block_categories_showcase";
  id: string;
  item: {
    header: string;
    categories: [
      {
        categories_id: {
          id: number;
          name: string;
          image: string;
        };
      }
    ];
  };
};

export type TTwoColumnBlock = {
  collection: "block_two_columns";
  id: string;
  item: {
    id: number;
    body: string;
    button_text: string;
    button_link: string;
    media_type: "image" | "video";
    image?: string;
    video?: string;
    layout: "left" | "right";
    button_type: "arrow" | "location";
  };
};

export type TPartnerBlock = {
  collection: "block_partners";
  id: string;
  item: {
    id: number;
    partners: [
      {
        partners_id: {
          id: string;
          logo: string;
          link: string;
        };
      }
    ];
  };
};

export type TProductShowCaseBlock = {
  collection: "block_product_showcase";
  id: string;
  item: {
    id: number;
    products: [
      {
        products_id: TProduct;
      }
    ];
  };
};

export type TProduct = {
  id: string;
  category: {
    id: number;
    name: string;
  };
  name: string;
  brand: string;
  fiber_brand: string;
  application: string;
  color_tones: string;
  installation_method: string;
  water_protection: string;
  rating: number;
  look: string;
  material: string;
  textures: [{ id: number; product_id: string; directus_files_id: string }];
};
export type TTestimonialBlock = {
  collection: "block_testimonial";
  id: string;
  item: {
    id: number;
    testimonials: [
      {
        testimonials_id: {
          id: string;
          name: string;
          designation: string;
          rating: number;
          photo: string;
          review: string;
        };
      }
    ];
  };
};

export type TBlogBlogs = {
  collection: "block_blogs";
  id: string;
  item: {
    id: number;
    sort_by: "last_updated" | "manual";
  };
};

export type TInspiredGalleryBlock = {
  collection: "block_inspired_gallery";
  id: string;
  item: {
    id: number;
    image_1: string;
    image_2: string;
    image_3: string;
    image_4: string;
  };
};

export type TBlog = {
  id: string;
  title: string;
  slug: string;
  image: string;
  body: string;
  date_created: string;
  date_updated: string;
  category: {
    name: string;
  };
};
