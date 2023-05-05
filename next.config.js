/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  env: {
    API: process.env.API,
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.akamai.steamstatic.com",
        port: "",
        pathname: "/**/**",
      },
    ],
  },
};

module.exports = nextConfig;
