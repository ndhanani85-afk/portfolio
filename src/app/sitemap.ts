import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.nikunjdhanani.com";
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }> = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" },
    { path: "/services/counselling-life-coaching", priority: 0.85, changeFrequency: "monthly" },
    { path: "/services/parenting-coaching", priority: 0.85, changeFrequency: "monthly" },
    { path: "/services/relationship-repair", priority: 0.85, changeFrequency: "monthly" },
    { path: "/speaking", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.8, changeFrequency: "weekly" },
    { path: "/resources/family-guide", priority: 0.75, changeFrequency: "monthly" },
    { path: "/resources/parenting-book", priority: 0.75, changeFrequency: "monthly" },
    { path: "/resources/stress-toolkit", priority: 0.75, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.75, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.7, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
