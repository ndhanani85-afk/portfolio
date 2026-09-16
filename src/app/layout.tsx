import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Fraunces, Caveat, Alex_Brush } from "next/font/google";
import "./globals.css";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nikunjdhanani.com"),
  title: {
    default: "Nikunj Dhanani | Professional Family Counselor & Life Coach in Mumbai",
    template: "%s | Nikunj Dhanani",
  },
  description: "Guiding families through stress back to calm. 6+ years of evidence-based counseling for parenting overwhelm, marriage repair, corporate burnout, and life coaching.",
  keywords: [
    "Family Counselor Mumbai",
    "Parenting Coach Mumbai",
    "Marriage Relationship Repair",
    "Stress Management",
    "Nikunj Dhanani",
    "Life Coaching Mumbai",
    "Couples Counseling India",
    "Counselor Near Me"
  ],
  authors: [{ name: "Nikunj Dhanani", url: "https://www.nikunjdhanani.com" }],
  creator: "Nikunj Dhanani",
  publisher: "Nikunj Dhanani",
  alternates: {
    canonical: "https://www.nikunjdhanani.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nikunj Dhanani | Family Counselor & Life Coach",
    description: "Guiding families through stress, back to calm. 6+ years of evidence-based counseling for parenting, marriage repair, and executive burnout.",
    url: "https://www.nikunjdhanani.com",
    siteName: "Nikunj Dhanani Counseling & Coaching",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/ndhanani.png",
        width: 1200,
        height: 630,
        alt: "Nikunj Dhanani - Professional Counselor & Life Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikunj Dhanani | Family Counselor & Life Coach",
    description: "Guiding families through stress, back to calm. 6+ years of evidence-based counseling in Mumbai & online.",
    images: ["/ndhanani.png"],
  },
  verification: {
    google: "5lN0At3gecy-sD7PjTVXdN83IVD55Gq6hBZAM8MO4jE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.nikunjdhanani.com/#person",
      "name": "Nikunj Dhanani",
      "jobTitle": "Family Counselor & Life Coach",
      "url": "https://www.nikunjdhanani.com",
      "image": "https://www.nikunjdhanani.com/ndhanani.png",
      "description": "Professional counselor with 6+ years of experience guiding families, couples, and leaders from stress back to calm.",
      "worksFor": {
        "@id": "https://www.nikunjdhanani.com/#organization",
      },
    },
    {
      "@type": ["CounselingService", "ProfessionalService", "LocalBusiness"],
      "@id": "https://www.nikunjdhanani.com/#organization",
      "name": "Nikunj Dhanani Counseling & Coaching",
      "url": "https://www.nikunjdhanani.com",
      "logo": "https://www.nikunjdhanani.com/tesca_logo.png",
      "image": "https://www.nikunjdhanani.com/ndhanani.png",
      "description": "Evidence-based counseling for parenting overwhelm, marriage relationship repair, executive stress, and personal life coaching in Mumbai and online.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN",
      },
      "areaServed": [
        { "@type": "City", "name": "Mumbai" },
        { "@type": "Country", "name": "India" },
        { "@type": "AdministrativeArea", "name": "Online Worldwide" },
      ],
      "priceRange": "₹₹",
      "founder": {
        "@id": "https://www.nikunjdhanani.com/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-T5SZ0YGCLH";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${caveat.variable} ${alexBrush.variable} scroll-smooth bg-[#F8F4EE] overflow-x-hidden`}
    >
      <head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </head>
      <body className="flex flex-col min-h-screen bg-[#F8F4EE] text-ink-navy selection:bg-dusty-sky/30 overflow-x-hidden w-full max-w-full">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
