import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parenting Coaching & Youth Guidance | Nikunj Dhanani",
  description: "Evidence-based parenting coaching in Surat and online across India. Transform daily household stress and nurture emotional balance in children.",
};

export default function ParentingCoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
