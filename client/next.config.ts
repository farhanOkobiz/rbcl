import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbcl-bd.com",
      },
      {
        protocol: "https",
        hostname: "server.rbcl-bd.com",
      },
      {
        protocol: "http", 
        hostname: "server.rbcl-bd.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
