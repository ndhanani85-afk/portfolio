import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keynote Speaking & Corporate Workshops | Nikunj Dhanani",
  description:
    "Book Nikunj Dhanani for keynotes, executive retreats, corporate burnout mitigation, and emotional resilience workshops across India.",
  alternates: {
    canonical: "https://www.nikunjdhanani.com/speaking",
  },
  openGraph: {
    title: "Keynote Speaking & Corporate Workshops | Nikunj Dhanani",
    description:
      "Transformative keynote talks and interactive workshops on workplace resilience, emotional mastery, and family dynamics.",
    url: "https://www.nikunjdhanani.com/speaking",
  },
};

export default function SpeakingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
