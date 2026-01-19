import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // External packages for server components (required for Mongoose)
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
