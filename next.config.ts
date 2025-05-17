import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // compiler: {
  //   removeConsole: true, // Removes unnecessary console logs
  // },
  /* config options here */
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.wealthwisedesignatlanta.com",
      },
      {
        protocol: "https",
        hostname: "admin.carpetdepotatlanta.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
