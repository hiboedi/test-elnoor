import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Config Opsi Gambar External */
  images: {
    dangerouslyAllowLocalIP: true, // Wajib di Next.js 16 agar localhost:3000 diizinkan
    unoptimized: true, // Bypass optimasi proxy agar gambar lokal langsung tampil instan
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
  },

  /* Config Opsi Lainnya */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;