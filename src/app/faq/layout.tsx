import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Family & Life Counseling",
  description:
    "Find answers about counseling session formats, confidentiality, fees, duration, and what to expect during sessions with Nikunj Dhanani.",
  alternates: {
    canonical: "https://www.nikunjdhanani.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Nikunj Dhanani Counseling",
    description:
      "Everything you need to know about starting counseling: privacy, formats, fees, and session structure.",
    url: "https://www.nikunjdhanani.com/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
