import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Counselling & Life Coaching | Nikunj Dhanani",
  description: "1-on-1 counseling for stress, burnout, and life transitions in Surat and online across India. Direct practitioner support with complete confidentiality.",
};

export default function CounsellingLifeCoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
