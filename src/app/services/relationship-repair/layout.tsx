import type { Metadata } from "next";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "Couples Counseling & Marriage Relationship Repair | Surat & Online India",
  description:
    "Confidential marriage & relationship counseling in Surat and online worldwide by Nikunj Dhanani. Break toxic argument cycles, restore emotional intimacy, and rebuild mutual trust.",
  keywords: [
    "couples counseling Surat",
    "marriage counselor Surat",
    "relationship therapist Gujarat",
    "pre-marital counseling India",
    "marriage repair therapy",
    "resolve marriage conflict",
    "online couples therapy Zoom",
    "Nikunj Dhanani marriage counseling",
  ],
  alternates: {
    canonical: "https://www.nikunjdhanani.com/services/relationship-repair",
  },
  openGraph: {
    title: "Couples Counseling & Marriage Repair | Nikunj Dhanani",
    description:
      "Break repetitive argument patterns and rediscover mutual affection. Private couples counseling in-person in Surat and online nationwide.",
    url: "https://www.nikunjdhanani.com/services/relationship-repair",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Relationship Repair Counseling with Nikunj Dhanani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Couples Counseling & Marriage Repair | Nikunj Dhanani",
    description:
      "Break repetitive argument cycles and rebuild emotional warmth. In-person Surat & Online Zoom.",
    images: ["/logo.png"],
  },
};

export default function RelationshipRepairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.nikunjdhanani.com/services/relationship-repair#service",
    name: "Relationship Repair & Couples Counseling",
    serviceType: "Marriage & Relationship Therapy",
    description:
      "Evidence-based relationship repair and couples counseling in Surat and online across India. Specialized interventions for recurring conflict, communication breakdowns, and trust restoration.",
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://www.nikunjdhanani.com/#organization",
      name: "Nikunj Dhanani - Family & Life Counseling Practice",
    },
    areaServed: [
      { "@type": "City", name: "Surat" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "Country", name: "India" },
      { "@type": "AdministrativeArea", name: "Worldwide (Online / NRI Community)" },
    ],
    availableChannel: [
      {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.nikunjdhanani.com/contact",
        serviceLocation: {
          "@type": "Place",
          name: "Nikunj Dhanani Practice",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Mota Varachha",
            addressLocality: "Surat",
            addressRegion: "Gujarat",
            postalCode: "394101",
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.nikunjdhanani.com/contact",
        name: "Online Video Consultation (Zoom / Google Meet)",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Couples Therapy Options",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Couples Initial Alignment Session (75 Mins)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Intensive 6-Week Marriage Reconnection Pathway",
          },
        },
      ],
    },
  };

  const breadcrumbSchema = {
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Relationship Repair",
        item: "https://www.nikunjdhanani.com/services/relationship-repair",
      },
    ],
  };

  return (
    <>
      <JsonLdSchema id="service-relationship-schema" schema={serviceSchema} />
      <JsonLdSchema id="service-relationship-breadcrumbs" schema={breadcrumbSchema} />
      {children}
    </>
  );
}
