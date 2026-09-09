"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppBubble from "@/components/WhatsAppBubble";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoHeaderFooter =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/review-generator") ||
    pathname?.startsWith("/reviews");

  if (isNoHeaderFooter) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
      <WhatsAppBubble />
      <MobileStickyCTA />
    </>
  );
}
