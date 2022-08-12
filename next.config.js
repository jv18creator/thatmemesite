/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "www.pngfind.com",
      "lh3.googleusercontent.com",
      "graph.facebook.com",
    ],
  },
};
