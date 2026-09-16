"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, PhoneCall, Download } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ResourcesPage() {
  const { language, t } = useLanguage();
  const rp = translations.resourcesPage;

  const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { key: "all", label: rp?.filter.categories.all ? t(rp.filter.categories.all) : "All" },
    { key: "parenting", label: rp?.filter.categories.parenting ? t(rp.filter.categories.parenting) : "Parenting" },
    { key: "relationships", label: rp?.filter.categories.relationships ? t(rp.filter.categories.relationships) : "Relationships" },
    { key: "stress", label: rp?.filter.categories.stress ? t(rp.filter.categories.stress) : "Stress Management" },
  ];

  const articlesList = rp?.articles.items || [];

  const filteredArticles = articlesList.filter((art) => {
    const matchesCategory = selectedCategoryKey === "all" || art.categoryKey === selectedCategoryKey;
    const titleText = t(art.title).toLowerCase();
    const snippetText = t(art.snippet).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = titleText.includes(query) || snippetText.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              {rp?.header.badge ? t(rp.header.badge) : "Insights & Guides"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              {rp?.header.title ? t(rp.header.title) : "Articles & Guides on Family Calm & Stress Relief"}
            </h1>
            <p className="text-base text-ink-muted leading-relaxed">
              {rp?.header.subtitle ? t(rp.header.subtitle) : "Practical, evidence-based insights and downloadable resource booklets created by counselor Nikunj Dhanani."}
            </p>
          </div>
        </ScrollReveal>

        {/* Downloadable Guides Feature Showcase */}
        <ScrollReveal direction="up" delay={150}>
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
                {rp?.guides.badge ? t(rp.guides.badge) : "Featured E-Books"}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D] mt-1">
                {rp?.guides.heading ? t(rp.guides.heading) : "Downloadable Practice Booklets"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(rp?.guides.items || []).map((guide, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-[#0B3C2D]/10 shadow-md hover-lift flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="relative h-52 rounded-2xl overflow-hidden shadow-sm">
                      <Image src={guide.image} alt={t(guide.title)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] text-[11px] font-bold">
                      {t(guide.tag)} · {t(guide.pages)}
                    </span>
                    <h3 className="text-lg font-serif-display font-bold text-[#0B3C2D]">{t(guide.title)}</h3>
                  </div>
                  <Link
                    href="/contact#booking"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    {rp?.guides.requestCopyBtn ? t(rp.guides.requestCopyBtn) : "Request Copy in Session"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-[#0B3C2D]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategoryKey(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategoryKey === cat.key
                      ? "bg-[#0B3C2D] text-white shadow-sm"
                      : "bg-[#F8F4EE] text-[#0B3C2D] hover:bg-[#8CA899]/20"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder={rp?.filter.searchPlaceholder ? t(rp.filter.searchPlaceholder) : "Search articles..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-[#0B3C2D]/15 text-xs text-deep-ink focus:outline-none focus:border-[#0B3C2D] bg-white"
              />
              <Search className="w-4 h-4 text-ink-light absolute left-3 top-2.5" />
            </div>
          </div>
        </ScrollReveal>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art, idx) => {
            const categoryObj = categories.find((c) => c.key === art.categoryKey);
            return (
              <ScrollReveal key={art.id} direction="up" delay={150 + idx * 40}>
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#0B3C2D]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover-lift group h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] text-[11px] font-bold">
                        {categoryObj?.label || art.categoryKey}
                      </span>
                      <span className="text-[11px] text-ink-light flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {t(art.readTime)}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D] group-hover:text-[#D98A2B] transition-colors leading-snug">
                      {t(art.title)}
                    </h3>

                    <p className="text-xs text-ink-muted leading-relaxed">
                      {t(art.snippet)}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#0B3C2D]/5 space-y-3">
                    <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#0B3C2D]/10 text-xs text-deep-ink leading-relaxed whitespace-pre-line">
                      {t(art.fullContent)}
                    </div>

                    <Link
                      href="/contact#booking"
                      className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white text-xs font-bold transition-colors mt-2"
                    >
                      <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                      {rp?.articles.discussBtn ? t(rp.articles.discussBtn) : "Discuss This in Session"}
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </div>
  );
}
