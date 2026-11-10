import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/ai", destination: "/services/ai-strategy", permanent: true },
      { source: "/services/ai-implementation", destination: "/services/ai-strategy", permanent: true },
      { source: "/services/vendor-negotiation", destination: "/services/cost-optimisation", permanent: true },
      { source: "/services/workflows", destination: "/services/workflow-automation", permanent: true },
      { source: "/services/saas-audit", destination: "/services/saas-management", permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
