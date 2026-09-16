"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, PhoneCall, Search } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function FAQPage() {
  const { t } = useLanguage();
  const fp = translations.faqPage;

  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategoryKey, setActiveCategoryKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { key: "all", label: fp?.categories.all || { en: "All", hi: "सभी", gu: "બધા" } },
    { key: "General", label: fp?.categories.general || { en: "General", hi: "सामान्य", gu: "સામાન્ય" } },
    { key: "Format & Logistics", label: fp?.categories.formatLogistics || { en: "Format & Logistics", hi: "सत्र का स्वरूप", gu: "સત્રનું સ્વરૂપ" } },
    { key: "Confidentiality & Ethics", label: fp?.categories.confidentialityEthics || { en: "Confidentiality & Ethics", hi: "गोपनीयता एवं नैतिकता", gu: "ગોપનીયતા અને નૈતિકતા" } },
    { key: "Payments & Pricing", label: fp?.categories.paymentsPricing || { en: "Payments & Pricing", hi: "शुल्क एवं भुगतान", gu: "ફી અને ચૂકવણી" } },
  ];

  const faqItems = fp?.items || [];

  const filteredFaqs = faqItems.filter((faq) => {
    const matchesCat = activeCategoryKey === "all" || faq.category === activeCategoryKey;
    const qText = t(faq.question).toLowerCase();
    const aText = t(faq.answer).toLowerCase();
    const qLower = searchQuery.toLowerCase();
    const matchesSearch = qText.includes(qLower) || aText.includes(qLower);
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              {t(fp?.header.badge || { en: "Common Questions", hi: "महत्वपूर्ण प्रश्न", gu: "સામાન્ય પ્રશ્નોત્તરી" })}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              {t(fp?.header.title || { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले सवाल", gu: "વારંવાર પૂછાતા સવાલો (FAQ)" })}
            </h1>
            <p className="text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
              {t(fp?.header.subtitle || { en: "Clear, transparent answers about sessions, confidentiality, format, and booking.", hi: "", gu: "" })}
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter & Search */}
        <ScrollReveal direction="up" delay={150}>
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-[#0B3C2D]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategoryKey(cat.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategoryKey === cat.key
                      ? "bg-[#0B3C2D] text-white shadow-sm"
                      : "bg-[#F8F4EE] text-[#0B3C2D] hover:bg-[#8CA899]/20"
                  }`}
                >
                  {t(cat.label)}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder={t(fp?.header.searchPlaceholder || { en: "Search questions...", hi: "प्रश्न खोजें...", gu: "પ્રશ્નો શોધો..." })}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-[#0B3C2D]/15 text-xs text-deep-ink focus:outline-none focus:border-[#0B3C2D]"
              />
              <Search className="w-4 h-4 text-ink-light absolute left-3 top-2.5" />
            </div>
          </div>
        </ScrollReveal>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#0B3C2D]/10 p-8 text-center text-ink-muted text-sm">
              {t(fp?.header.noResults || { en: "No questions found matching your search.", hi: "आपकी खोज से मेल खाता कोई प्रश्न नहीं मिला।", gu: "તમારી શોધ મુજબ કોઈ પ્રશ્ન મળ્યો નથી." })}
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <ScrollReveal key={idx} direction="up" delay={150 + idx * 30}>
                  <div className="bg-white rounded-2xl border border-[#0B3C2D]/10 overflow-hidden shadow-sm transition-all">
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                    >
                      <div className="flex items-center space-x-3">
                        <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0" />
                        <span className="text-base font-serif-display font-bold text-[#0B3C2D]">
                          {t(faq.question)}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#0B3C2D] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 border-t border-[#0B3C2D]/5 text-xs sm:text-sm text-ink-muted leading-relaxed animate-fade-in bg-[#F8F4EE]/40">
                        <p className="pt-4">{t(faq.answer)}</p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })
          )}
        </div>

        {/* CTA Card */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 text-center space-y-4 shadow-md">
            <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
              {t({ en: "Have a specific question not listed here?", hi: "क्या आपके मन में कोई अन्य प्रश्न है?", gu: "શું તમારો કોઈ અન્ય પ્રશ્ન છે?" })}
            </h3>
            <p className="text-xs text-ink-muted">
              {t({ en: "I am happy to answer quick inquiries over WhatsApp or via our booking page.", hi: "मैं व्हाट्सएप या हमारे बुकिंग पेज के माध्यम से आपके प्रश्नों का उत्तर देने में प्रसन्न हूँ।", gu: "મને વોટ્સએપ અથવા અમારા બુકિંગ પેજ દ્વારા તમારા પ્રશ્નોના ઉત્તર આપવામાં આનંદ થશે." })}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/contact#booking"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                {t({ en: "Book a Session", hi: "सत्र बुक करें", gu: "સત્ર બુક કરો" })}
              </Link>
              <a
                href="https://wa.me/919925060609?text=Hi%20Nikunj,%20I%20have%20a%20question%20before%20booking."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full border border-[#0B3C2D]/20 text-[#0B3C2D] hover:bg-[#F8F4EE] text-xs font-bold transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#25D366] mr-2 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L.055 23.515l5.849-1.503A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.945 9.945 0 01-5.078-1.39l-.364-.216-3.465.89.916-3.376-.237-.377A9.947 9.947 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                {t({ en: "Ask on WhatsApp", hi: "व्हाट्सएप पर पूछें", gu: "વોટ્સએપ પર પૂછો" })}
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
