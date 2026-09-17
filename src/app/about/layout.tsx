import type { Metadata } from "next";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "About Nikunj Dhanani | Certified Counselor & Family Life Coach Surat",
  description:
    "Meet Nikunj Dhanani, dedicated counseling practitioner with 6+ years experience in Surat, Gujarat. Specialized in family dynamics, parenting challenges, relationship repair, and holistic emotional wellness.",
  keywords: [
    "About Nikunj Dhanani",
    "counselor Surat Gujarat",
    "family life coach profile",
    "marriage counselor credentials",
    "parenting expert Surat",
    "mental wellness practitioner India",
  ],
  alternates: {
    canonical: "https://www.nikunjdhanani.com/about",
  },
  openGraph: {
    title: "About Nikunj Dhanani | Family Counselor & Life Coach",
    description:
      "Learn about Nikunj Dhanani's counseling philosophy, credentials, and compassionate approach to family transformation in Surat and across India.",
    url: "https://www.nikunjdhanani.com/about",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "About Nikunj Dhanani Counseling Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nikunj Dhanani | Family Counselor",
    description:
      "Dedicated counselor with 6+ years experience empowering families, couples, and individuals in Surat and online across India.",
    images: ["/logo.png"],
  },
};

export default function AboutLayout({
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
        name: "About",
        item: "https://www.nikunjdhanani.com/about",
      },
    ],
  };

  return (
    <>
      <JsonLdSchema id="about-breadcrumbs" schema={breadcrumbs} />
      {children}
    </>
  );
}
