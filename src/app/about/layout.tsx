import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nikunj Dhanani | Family Counselor & Life Coach",
  description: "Learn about my 6+ years of evidence-based counseling practice, counseling philosophy, credentials, and trauma-informed care background.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
