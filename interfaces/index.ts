export type TPageBlock = {
  date_created: string;
  last_updated: string;
  id: string;
  name: string;
  seo: TSeo;
  permalink: string;
  date_updated: string;
  blocks: TBlock[];
};

export type TSeo = {
  title: string;
  meta_description: string;
  og_image: string;
  sitemap: {
    change_frequency: string;
    priority: string;
  };
};

export type TBlock =
  | THeroBlock
  | TCategoriesShowcaseBlock
  | TVideoBlock
  | TTwoColumnBlock
  | TStatisticBlock
  | TBreadcrumbBlock
  | TInspiredGalleryBlock
  | TTestimonialBlock
  | TBlogBlogs
  | TProductShowCaseBlock
  | TOneColumnBlock
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
    youtube_video_links: { link: string }[];
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
  sort: number;
  item: {
    button: "yes" | "no";
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

export type TOneColumnBlock = {
  collection: "block_one_cloumn";
  id: string;
  sort: number;
  item: {
    id: number;
    body: string;
    images: [{ id: number; product_id: string; directus_files_id: string }];
    add_card: "yes" | "no";
    cards: {
      steps_id: {
        image: string;
        body: string;
      };
    }[];
  };
};

export type TBreadcrumbBlock = {
  collection: "block_breadcrumb";
  id: string;
  item: {
    id: number;
    title: string;
    image: string;
    breadcrumb: [
      {
        label: string;
      }
    ];
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
  date_updated: string;
  date_created: string;
  id: string;
  category: {
    id: number;
    name: string;
  };
  sku: string;
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
  textures: TTexture[];
};
export type TTexture = {
  id: number;
  directus_files_id: {
    id: string;
    title: string;
    filename_download: string;
  };
};
export type TSettings = {
  nav_links: {
    label: string;
    link: string;
    children?: {
      label: string;
      link: string;
    }[];
  }[];
  footer_links: {
    label: string;
    link: string;
  }[];
  social_links: {
    icon: string;
    link: string;
  }[];
  product_categories: string;
  see_in_room: string;
  blog: string;
  locations: string;
  consultation: string;
  copyright_text: string;
};

export type TCategory = {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  blogs: TBlog[];
};

export type TLocation = {
  breadcrumb_image: string;
  date_updated: string;
  date_created: string;
  id: string;
  status: string;
  seo: TSeo;
  contact_no: string;
  thumbnail_image: string;
  place_id: string;
  google_map: {
    geometry: {
      coordinates: number[];
      type: string;
    };
    properties: {
      administrativeArea: string;
      country: string;
      displayName: string;
      formated: string;
      postalCode: string;
      raw: Record<string, string>;
      viewport: {
        south: number;
        north: number;
        east: number;
        west: number;
      };
    };
    type: string;
  };
  image: string;
  name: string;
  slug: string;
  service_areas: {
    name: string;
  }[];
};
export type TTestimonial = {
  id: string;
  name: string;
  designation: string;
  rating: number;
  photo: string;
  review: string;
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
  author: {
    id: string;
    name: string;
    photo: string;
  };
  id: string;
  title: string;
  slug: string;
  image: string;
  body: string;
  date_created: string;
  date_updated: string;

  category: TCategory;
};
