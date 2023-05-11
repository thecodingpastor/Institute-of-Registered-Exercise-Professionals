// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// module.exports = (phase) => {
//   console.log("NODE_ENV PROD", process.env.NODE_ENV);
//   return {
//     images: {
//       domains: ["res.cloudinary.com"],
//     },
//     eslint: {
//       ignoreDuringBuilds: true,
//     },
//     reactStrictMode: true,
//   };
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
