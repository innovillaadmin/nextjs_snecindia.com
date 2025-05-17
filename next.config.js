// // /** @type {import('next').NextConfig} */
// // const nextConfig = {}

// module.exports = nextConfig
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  // disable: process.env.NODE_ENV === "development", // remove from production
});

module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // Supports any hostname
        port: "", // Leave empty to support any port
        pathname: "**", // Supports any pathname
      },
      {
        protocol: "https",
        hostname: "**", // Supports any hostname
        port: "", // Leave empty to support any port
        pathname: "**", // Supports any pathname
      },
    ],
  },

  // other Next.js config options here
});
