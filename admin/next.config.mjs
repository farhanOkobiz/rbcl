/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rbcl-production.up.railway.app",
        pathname: "/api/v1/public/uploads/**",
      },
    ],
  },
};

export default nextConfig;
