import type { Metadata } from "next";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "Book a Counseling Session | Contact Nikunj Dhanani in Surat & Online",
  description:
    "Schedule your confidential 1-on-1 counseling session with Nikunj Dhanani. In-person clinic appointments in Mota Varachha, Surat, and secure online video consultations worldwide.",
  keywords: [
    "book counseling session Surat",
    "contact Nikunj Dhanani",
    "counseling clinic Mota Varachha Surat",
    "online therapy consultation booking India",
    "WhatsApp counseling appointment Surat",
    "confidential therapy session booking",
  ],
  alternates: {
    canonical: "https://www.nikunjdhanani.com/contact",
  },
  openGraph: {
    title: "Book a Counseling Session | Contact Nikunj Dhanani",
    description:
      "Confidential counseling for parenting, marriage repair, and stress management in Surat and online across India. Instant appointment booking.",
    url: "https://www.nikunjdhanani.com/contact",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Book a Counseling Session with Nikunj Dhanani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Counseling Session | Nikunj Dhanani",
    description:
      "Schedule your confidential counseling appointment in Surat or online via Zoom.",
    images: ["/logo.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://www.nikunjdhanani.com/contact#webpage",
    name: "Book a Session & Contact Nikunj Dhanani",
    url: "https://www.nikunjdhanani.com/contact",
    description:
      "Direct booking channel for confidential counseling sessions with Nikunj Dhanani in Surat, Gujarat and worldwide online.",
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": "https://www.nikunjdhanani.com/#organization",
      name: "Nikunj Dhanani - Family & Life Counseling Practice",
      telephone: "+919925060609",
      email: "ndhanani85@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mota Varachha",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        postalCode: "394101",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+919925060609",
          contactType: "customer support & appointments",
          areaServed: ["IN", "Worldwide"],
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
      ],
    },
  };

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
        name: "Contact",
        item: "https://www.nikunjdhanani.com/contact",
      },
    ],
  };

  return (
    <>
      <JsonLdSchema id="contact-page-schema" schema={contactPageSchema} />
      <JsonLdSchema id="contact-breadcrumbs" schema={breadcrumbs} />
      {children}
    </>
  );
}
