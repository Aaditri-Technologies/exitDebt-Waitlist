import type { MetadataRoute } from "next";

/**
 * Sitemap for search engine crawling.
 * Lists all public pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://exitdebt.in";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/waitlist`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
