import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.flowz.dk",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.flowz.dk/services",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.flowz.dk/services/cost-optimisation",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.flowz.dk/services/software-strategy",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.flowz.dk/services/ai-strategy",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.flowz.dk/services/workflow-automation",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.flowz.dk/services/saas-management",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.flowz.dk/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
