import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Counseling Session | Contact Nikunj Dhanani",
  description:
    "Schedule a confidential 1-on-1 counseling session with Nikunj Dhanani. In-person Surat clinic appointments and secure online consultations across India.",
  alternates: {
    canonical: "https://www.nikunjdhanani.com/contact",
  },
  openGraph: {
    title: "Book a Counseling Session | Nikunj Dhanani",
    description:
      "Confidential 1-on-1 counseling for parenting, marriage repair, and stress management in Surat and online.",
    url: "https://www.nikunjdhanani.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
