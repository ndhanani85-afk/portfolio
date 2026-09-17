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
    default: "Nikunj Dhanani | Family Counselor, Parenting Coach & Speaker in Surat & Online",
    template: "%s | Nikunj Dhanani",
  },
  description: "Guiding families through stress back to calm. 6+ years of evidence-based counseling for parenting overwhelm, marriage repair, executive burnout, and life coaching. In-person Surat clinic & private Zoom sessions worldwide.",
  keywords: [
    "Family Counselor Surat",
    "Marriage Counselor Surat",
    "Parenting Coach Surat",
    "Counselor in Mota Varachha",
    "Best Family Counselor Mumbai",
    "Marriage Relationship Repair",
    "Parenting Coach India",
    "Couples Counseling Near Me",
    "Stress Management Counselor",
    "Life Coach Gujarat",
    "Executive Burnout Recovery",
    "Nikunj Dhanani",
    "Nikunj Dhanani Counseling",
    "Online Counseling India NRI",
    "Gujarati Counselor Online",
    "Counselor Near Me"
  ],
  authors: [{ name: "Nikunj Dhanani", url: "https://www.nikunjdhanani.com" }],
  creator: "Nikunj Dhanani",
  publisher: "Nikunj Dhanani",
  category: "Health & Mental Wellness",
  alternates: {
    canonical: "https://www.nikunjdhanani.com",
    languages: {
      "en-IN": "https://www.nikunjdhanani.com",
      "hi-IN": "https://www.nikunjdhanani.com",
      "gu-IN": "https://www.nikunjdhanani.com",
    },
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
    title: "Nikunj Dhanani | Family Counselor, Parenting Coach & Speaker",
    description: "Guiding families through stress back to calm. Evidence-based counseling for parenting, marriage repair, and executive burnout in Surat & online worldwide.",
    url: "https://www.nikunjdhanani.com",
    siteName: "Nikunj Dhanani Counseling & Coaching",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/ndhanani.png",
        width: 1200,
        height: 630,
        alt: "Nikunj Dhanani - Professional Family Counselor & Life Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikunj Dhanani | Family Counselor & Life Coach",
    description: "Guiding families through stress back to calm. 6+ years of evidence-based counseling in Surat & online worldwide.",
    images: ["/ndhanani.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any", type: "image/png" },
    ],
    shortcut: ["/logo.png"],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Surat, Gujarat, India",
    "geo.position": "21.2266;72.8837",
    "ICBM": "21.2266, 72.8837",
    "format-detection": "telephone=no",
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
      "jobTitle": "Certified Family Counselor, Parenting Coach & Keynote Speaker",
      "url": "https://www.nikunjdhanani.com",
      "image": "https://www.nikunjdhanani.com/ndhanani.png",
      "telephone": "+91 99250 60609",
      "email": "ndhanani85@gmail.com",
      "description": "Professional counselor with 6+ years of experience guiding families, couples, and leaders from stress back to calm.",
      "knowsAbout": [
        "Family Counseling",
        "Parenting Coaching",
        "Marriage & Couples Counseling",
        "Cognitive Behavioral Therapy (CBT)",
        "Stress & Burnout Recovery",
        "Teenager Behavioral Guidance",
        "Emotional Regulation",
        "Conflict Resolution"
      ],
      "availableLanguage": ["English", "Hindi", "Gujarati"],
      "worksFor": {
        "@id": "https://www.nikunjdhanani.com/#organization",
      },
    },
    {
      "@type": ["CounselingService", "ProfessionalService", "LocalBusiness"],
      "@id": "https://www.nikunjdhanani.com/#organization",
      "name": "Nikunj Dhanani Counseling & Coaching",
      "url": "https://www.nikunjdhanani.com",
      "logo": "https://www.nikunjdhanani.com/logo.png",
      "image": "https://www.nikunjdhanani.com/ndhanani.png",
      "telephone": "+91 99250 60609",
      "email": "ndhanani85@gmail.com",
      "description": "Evidence-based counseling for parenting overwhelm, marriage relationship repair, executive stress, and personal life coaching in Surat and online worldwide.",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR, USD, GBP, EUR, AED",
      "paymentAccepted": "Cash, UPI, Credit Card, Net Banking",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mota Varachha",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "394101",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.2266,
        "longitude": 72.8837,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "20:00",
        },
      ],
      "areaServed": [
        { "@type": "City", "name": "Surat" },
        { "@type": "City", "name": "Mumbai" },
        { "@type": "City", "name": "Ahmedabad" },
        { "@type": "State", "name": "Gujarat" },
        { "@type": "Country", "name": "India" },
        { "@type": "AdministrativeArea", "name": "Online Worldwide (USA, UK, UAE, Canada, Australia)" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Counseling & Coaching Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Parenting Coaching & Youth Guidance",
              "url": "https://www.nikunjdhanani.com/services/parenting-coaching",
              "description": "Structured parenting frameworks to dissolve daily household power struggles, manage behavioral cycles, and build strong parent-child connection.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Marriage & Relationship Repair",
              "url": "https://www.nikunjdhanani.com/services/relationship-repair",
              "description": "Evidence-based couples counseling to halt circular arguments, heal past resentment, restore emotional warmth, and rebuild trust.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "1-on-1 Counselling & Life Coaching",
              "url": "https://www.nikunjdhanani.com/services/counselling-life-coaching",
              "description": "Confidential personal counseling for corporate burnout, anxiety overwhelm, mid-career transitions, and emotional clarity.",
            },
          },
        ],
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".speakable-summary"],
      },
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
