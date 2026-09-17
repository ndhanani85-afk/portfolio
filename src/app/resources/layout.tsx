import type { Metadata } from "next";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "Free Counseling Guides & Stress Toolkits | Nikunj Dhanani Surat",
  description:
    "Free actionable parenting guides, marriage communication worksheets, and stress resilience toolkits by counselor Nikunj Dhanani.",
  alternates: {
    canonical: "https://www.nikunjdhanani.com/resources",
  },
  openGraph: {
    title: "Counseling Resources, Toolkits & Guides | Nikunj Dhanani",
    description:
      "Actionable mental wellness guides, parenting strategies, and relationship exercises available to download.",
    url: "https://www.nikunjdhanani.com/resources",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Free Counseling Resources by Nikunj Dhanani",
      },
    ],
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.nikunjdhanani.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://www.nikunjdhanani.com/resources",
      },
    ],
  };

  return (
    <>
      <JsonLdSchema id="resources-breadcrumbs" schema={breadcrumbs} />
      {children}
    </>
  );
}
