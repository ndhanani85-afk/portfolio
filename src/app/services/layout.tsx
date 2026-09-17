import type { Metadata } from "next";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "Counseling & Coaching Services | Surat & Online India - Nikunj Dhanani",
  description:
    "Explore individual personal counseling, couples relationship repair, and parenting coaching sessions guided directly by Nikunj Dhanani in Surat, Gujarat, and online worldwide via Zoom.",
  alternates: {
    canonical: "https://www.nikunjdhanani.com/services",
  },
  openGraph: {
    title: "Counseling Services in Surat & Online India | Nikunj Dhanani",
    description:
      "Compassionate, structured guidance for individuals, married couples, and parents. Discover our tailored pathways to emotional resilience.",
    url: "https://www.nikunjdhanani.com/services",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Nikunj Dhanani Counseling Services",
      },
    ],
  },
};

export default function ServicesLayout({
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
        name: "Services",
        item: "https://www.nikunjdhanani.com/services",
      },
    ],
  };

  return (
    <>
      <JsonLdSchema id="services-root-breadcrumbs" schema={breadcrumbs} />
      {children}
    </>
  );
}
