import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallowed = ["/admin", "/admin/*", "/api/*", "/review-generator"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowed,
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Google-InspectionTool",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Applebot",
          "Applebot-Extended",
          "Google-Extended",
          "cohere-ai",
        ],
        allow: "/",
        disallow: disallowed,
      },
    ],
    sitemap: "https://www.nikunjdhanani.com/sitemap.xml",
    host: "https://www.nikunjdhanani.com",
  };
}
