import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relationship Repair & Couples Counseling | Nikunj Dhanani",
  description: "Couples counseling and relationship repair in Surat and online. Break circular argument cycles, restore emotional warmth, and rebuild trust.",
};

export default function RelationshipRepairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
