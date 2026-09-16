import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nikunj Dhanani | Family Counselor & Life Coach",
    short_name: "Nikunj Dhanani",
    description: "Guiding families through stress back to calm. 6+ years of evidence-based counseling in Mumbai and online.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F4EE",
    theme_color: "#0B3C2D",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
