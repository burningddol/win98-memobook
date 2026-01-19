import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force Node.js runtime for all API routes (required for Mongoose)
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
