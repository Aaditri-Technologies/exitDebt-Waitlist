import type { MetadataRoute } from "next";

/**
 * robots.txt configuration.
 * Allows search engines to crawl public pages,
 * blocks /admin and /api paths.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
  };
}
