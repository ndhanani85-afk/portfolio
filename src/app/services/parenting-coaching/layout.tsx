import type { Metadata } from "next";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "Parenting Coaching & Child Behavioral Guidance | Surat & Online India",
  description:
    "Empowering parenting counseling in Surat and online worldwide with Nikunj Dhanani. Master child screen addiction, teen communication, behavioral meltdowns, and emotional bonding.",
  keywords: [
    "parenting coaching Surat",
    "child counselor Surat",
    "teen behavioral counseling India",
    "screen addiction therapy kids",
    "gentle parenting coach Gujarat",
    "parent child relationship counselor",
    "online parenting consultation Zoom",
    "Nikunj Dhanani parenting",
  ],
  alternates: {
    canonical: "https://www.nikunjdhanani.com/services/parenting-coaching",
  },
  openGraph: {
    title: "Parenting Coaching & Child Behavioral Guidance | Nikunj Dhanani",
    description:
      "Transform household tension into peaceful connection. Evidence-backed parenting coaching available in-person in Surat and online across India.",
    url: "https://www.nikunjdhanani.com/services/parenting-coaching",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Parenting Coaching with Nikunj Dhanani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parenting Coaching & Guidance | Nikunj Dhanani",
    description:
      "Transform household tension into peaceful connection with Nikunj Dhanani. In-person Surat & Online Zoom.",
    images: ["/logo.png"],
  },
};

export default function ParentingCoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.nikunjdhanani.com/services/parenting-coaching#service",
    name: "Parenting Coaching & Youth Guidance",
    serviceType: "Parenting Coaching & Child Psychology Consultation",
    description:
      "Specialized parenting guidance and youth counseling in Surat and online across India. Practical solutions for screen addiction, exam stress, adolescent emotional regulation, and peaceful family dynamics.",
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
      name: "Parenting Coaching Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Initial Parenting Diagnostic Assessment (60 Mins)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "4-Week Comprehensive Family Transformation Program",
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
        name: "Parenting Coaching",
        item: "https://www.nikunjdhanani.com/services/parenting-coaching",
      },
    ],
  };

  return (
    <>
      <JsonLdSchema id="service-parenting-schema" schema={serviceSchema} />
      <JsonLdSchema id="service-parenting-breadcrumbs" schema={breadcrumbSchema} />
      {children}
    </>
  );
}
