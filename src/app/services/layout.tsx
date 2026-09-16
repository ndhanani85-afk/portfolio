import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Counseling Services | Nikunj Dhanani",
  description: "Explore individual counseling, couples relationship repair, and parenting coaching sessions guided directly by Nikunj Dhanani in Surat and online across India.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
