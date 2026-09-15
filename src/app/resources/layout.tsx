import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Counseling Guides & Stress Toolkits | Nikunj Dhanani",
  description:
    "Free actionable parenting guides, marriage communication worksheets, and stress resilience toolkits by counselor Nikunj Dhanani.",
  alternates: {
    canonical: "https://www.nikunjdhanani.com/resources",
  },
  openGraph: {
    title: "Counseling Resources, Toolkits & Guides | Nikunj Dhanani",
    description:
      "Actionable mental wellness guides, parenting strategies, and relationship exercises available to download.",
    url: "https://www.nikunjdhanani.com/resources",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
