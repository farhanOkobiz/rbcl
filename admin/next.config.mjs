/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbcl-bd.com",
      },
      {
        protocol: "http",
        hostname: "server.rbcl-bd.com", // <-- add this
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
