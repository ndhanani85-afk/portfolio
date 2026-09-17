import type { Metadata } from "next";
import JsonLdSchema from "@/components/JsonLdSchema";
import { faqPageTranslations } from "@/lib/translations/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Counseling Formats, Fees & Confidentiality",
  description:
    "Get clear, honest answers on family counseling, parenting coaching, couples therapy, confidentiality, fees, session duration, and online Zoom booking with Nikunj Dhanani.",
  keywords: [
    "counseling FAQ Surat",
    "therapy fees India",
    "confidential family counseling",
    "online life coaching Zoom India",
    "parenting consultation process",
    "couples therapy duration",
    "Nikunj Dhanani FAQ",
  ],
  alternates: {
    canonical: "https://www.nikunjdhanani.com/faq",
  },
  openGraph: {
    title: "FAQ | Counseling Formats, Fees & Confidentiality - Nikunj Dhanani",
    description:
      "Everything you need to know about starting counseling: privacy, formats (in-person Surat & online worldwide), fees, and session structure.",
    url: "https://www.nikunjdhanani.com/faq",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Nikunj Dhanani Counseling FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Nikunj Dhanani Counseling",
    description:
      "Clear, transparent answers about counseling formats, confidentiality, session durations, and online booking.",
    images: ["/logo.png"],
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.nikunjdhanani.com/faq#faqpage",
    name: "Frequently Asked Questions About Counseling with Nikunj Dhanani",
    description:
      "Find transparent answers about counseling formats, confidentiality, session duration, and booking with Nikunj Dhanani.",
    mainEntity: faqPageTranslations.items.map((item) => ({
      "@type": "Question",
      name: item.question.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.en,
      },
    })),
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
        name: "FAQ",
        item: "https://www.nikunjdhanani.com/faq",
      },
    ],
  };

  return (
    <>
      <JsonLdSchema id="faq-schema" schema={faqSchema} />
      <JsonLdSchema id="faq-breadcrumbs" schema={breadcrumbSchema} />
      {children}
    </>
  );
}
