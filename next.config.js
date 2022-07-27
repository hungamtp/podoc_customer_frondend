/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "printify.com",
      "images.printify.com",
    ],
  },
};

module.exports = nextConfig;
