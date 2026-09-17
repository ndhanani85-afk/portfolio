import type { Metadata } from "next";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "1-on-1 Personal Counseling & Life Coaching | Surat & Online India",
  description:
    "Confidential 1-on-1 counseling for anxiety, stress, decision fatigue, and career burnout in Surat and online across India with counselor Nikunj Dhanani.",
  keywords: [
    "life coach Surat",
    "personal counseling Surat",
    "stress management counselor Gujarat",
    "burnout therapy India",
    "anxiety counseling Surat",
    "executive mental wellness coaching",
    "online counseling Zoom India",
    "Nikunj Dhanani life coach",
  ],
  alternates: {
    canonical: "https://www.nikunjdhanani.com/services/counselling-life-coaching",
  },
  openGraph: {
    title: "1-on-1 Counseling & Life Coaching | Nikunj Dhanani",
    description:
      "Restore clarity and emotional strength with structured 1-on-1 counseling. In-person in Surat and online worldwide via secure video.",
    url: "https://www.nikunjdhanani.com/services/counselling-life-coaching",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Personal Counseling & Life Coaching with Nikunj Dhanani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "1-on-1 Counseling & Life Coaching | Nikunj Dhanani",
    description:
      "Overcome stress, anxiety, and decision fatigue with personalized life coaching. In-person Surat & Online Zoom.",
    images: ["/logo.png"],
  },
};

export default function CounsellingLifeCoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.nikunjdhanani.com/services/counselling-life-coaching#service",
    name: "1-on-1 Personal Counseling & Life Coaching",
    serviceType: "Personal Counseling & Executive Life Coaching",
    description:
      "Private 1-on-1 counseling addressing chronic anxiety, executive burnout, life transitions, and personal emotional balance in Surat and online across India.",
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
      name: "Personal Counseling Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Individual Intake & Clarity Session (60 Mins)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Multi-Session Life Balance & Resilience Pathway",
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
        name: "Counselling & Life Coaching",
        item: "https://www.nikunjdhanani.com/services/counselling-life-coaching",
      },
    ],
  };

  return (
    <>
      <JsonLdSchema id="service-coaching-schema" schema={serviceSchema} />
      <JsonLdSchema id="service-coaching-breadcrumbs" schema={breadcrumbSchema} />
      {children}
    </>
  );
}
