/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

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

module.exports = withPWA(nextConfig);
