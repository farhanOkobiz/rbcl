import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "rbcl-production.up.railway.app", "server.rbcl-bd.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbcl-production.up.railway.app",
      },
      {
        protocol: "https",
        hostname: "rbcl-client.vercel.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
