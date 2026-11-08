import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.flowz.dk",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.flowz.dk/ai",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: "https://www.flowz.dk/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
