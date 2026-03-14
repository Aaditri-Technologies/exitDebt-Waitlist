import type { MetadataRoute } from "next";

/**
 * robots.txt configuration.
 * Allows search engines to crawl public pages,
 * blocks /api, /_next, /admin, and /dashboard paths.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/admin/", "/dashboard/"],
    },
    sitemap: "https://exitdebt.in/sitemap.xml",
  };
}
