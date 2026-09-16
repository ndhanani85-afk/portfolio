"use client";

import React from "react";
import Link from "next/link";
import { Users, Heart, Brain, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ServicesHubPage() {
  const { t } = useLanguage();
  const sp = translations.servicesPage;
  const hub = sp?.hub;

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              {t(hub?.badge || { en: "Practice Offerings Hub", hi: "परामर्श सेवाएं केंद्र", gu: "મુખ્ય કાઉન્સેલિંગ સેવાઓ" })}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              {t(hub?.title || { en: "Structured Counseling for Family, Relationship & Personal Calm", hi: "परिवार, दांपत्य और व्यक्तिगत शांति के लिए संरचित परामर्श", gu: "પરિવાર, દાંપત્ય અને માનસિક શાંતિ માટે વ્યવસ્થિત કાઉન્સેલિંગ" })}
            </h1>
            <p className="text-base text-ink-muted leading-relaxed">
              {t(hub?.subtitle || { en: "Every offering is conducted directly by me with personalized session notes, actionable coping frameworks, and complete confidentiality.", hi: "", gu: "" })}
            </p>
          </div>
        </ScrollReveal>

        {/* Alternating Service Cards */}
        <div className="space-y-12">
          
          {/* Card 1: Parenting Coaching */}
          <ScrollReveal direction="up" delay={150}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover-lift">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B3C2D]/10 text-[#0B3C2D] text-xs font-bold">
                  <Users className="w-4 h-4 text-[#D98A2B]" />
                  <span>{t(hub?.parenting.tag || { en: "Family & Parenting Guidance", hi: "परिवार एवं बाल-विकास मार्गदर्शन", gu: "પરિવાર અને બાળ ઉછેર માર્ગદર્શન" })}</span>
                </div>

                <h2 className="text-3xl font-serif-display font-bold text-[#0B3C2D]">
                  {t(hub?.parenting.title || { en: "Parenting Coaching & Youth Guidance", hi: "पेरेंटिंग कोचिंग एवं युवा मार्गदर्शन", gu: "પેરેન્ટિંગ કોચિંગ અને યુવા માર્ગદર્શન" })}
                </h2>

                <p className="text-sm text-ink-muted leading-relaxed">
                  {t(hub?.parenting.desc || { en: "Designed for parents facing daily household friction, behavioral triggers, academic anxiety, or teenage distance. We replace yelling and guilt with structured, calm communication frameworks.", hi: "", gu: "" })}
                </p>

                <div className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <h4 className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider">
                    {t(hub?.sessionLooksLikeLabel || { en: "What a session looks like:", hi: "सत्र का स्वरूप:", gu: "સત્રનું સ્વરૂપ:" })}
                  </h4>
                  <p className="text-xs text-ink-muted">
                    {t(hub?.parenting.format || { en: "60 minutes mapping family stress points, identifying behavioral triggers, and establishing practical routine agreements between parents and children.", hi: "", gu: "" })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/services/parenting-coaching"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                  >
                    {t(hub?.parenting.exploreBtn || { en: "Explore Full Parenting Page", hi: "विस्तृत पेरेंटिंग पेज देखें", gu: "વિસ્તૃત પેરેન્ટિંગ પેજ જુઓ" })}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/contact?service=Parenting%20Coaching#booking"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    {t(hub?.parenting.bookBtn || { en: "Book Parenting Session", hi: "पेरेंटिंग सत्र बुक करें", gu: "પેરેન્ટિંગ સેશન બુક કરો" })}
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F8F4EE]/80 p-6 rounded-2xl border border-[#0B3C2D]/10 space-y-4">
                <h3 className="text-sm font-bold text-[#0B3C2D] uppercase tracking-wider">
                  {t(hub?.keyTopicsLabel || { en: "Key Topics Covered:", hi: "मुख्य विषय और समाधान:", gu: "મુખ્ય વિષયો અને સમાધાન:" })}
                </h3>
                <ul className="space-y-3 text-xs text-deep-ink">
                  {(hub?.parenting.topics || [
                    { en: "De-escalating child tantrums and explosive emotional reactions", hi: "", gu: "" },
                    { en: "Navigating teen independence and digital boundaries", hi: "", gu: "" },
                    { en: "Establishing consistent co-parenting discipline standards", hi: "", gu: "" },
                    { en: "Reducing parental guilt and daily household fatigue", hi: "", gu: "" },
                  ]).map((topic, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                      <span>{t(topic)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Relationship Repair */}
          <ScrollReveal direction="up" delay={200}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover-lift">
              <div className="lg:col-span-5 lg:order-1 order-2 bg-[#F8F4EE]/80 p-6 rounded-2xl border border-[#0B3C2D]/10 space-y-4">
                <h3 className="text-sm font-bold text-[#0B3C2D] uppercase tracking-wider">
                  {t(hub?.keyTopicsLabel || { en: "Key Topics Covered:", hi: "मुख्य विषय और समाधान:", gu: "મુખ્ય વિષયો અને સમાધાન:" })}
                </h3>
                <ul className="space-y-3 text-xs text-deep-ink">
                  {(hub?.relationship.topics || [
                    { en: "Stopping circular argument cycles before escalation", hi: "", gu: "" },
                    { en: "Restoring intimacy, mutual warmth, and trust", hi: "", gu: "" },
                    { en: "Kids after marriage & relationship balance", hi: "शादी के बाद बच्चे और दांपत्य संतुलन", gu: "લગ્ન પછી બાળકો અને સંબંધોની સમતુલા" },
                    { en: "Fair boundary negotiation without blame or resentment", hi: "", gu: "" },
                  ]).map((topic, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <LeafMotif className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                      <span>{t(topic)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7 lg:order-2 order-1 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] text-xs font-bold">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>{t(hub?.relationship.tag || { en: "Couples & Marriage Support", hi: "दांपत्य एवं वैवाहिक सहयोग", gu: "દાંપત્ય જીવન અને લગ્ન સંબંધ સહયોગ" })}</span>
                </div>

                <h2 className="text-3xl font-serif-display font-bold text-[#0B3C2D]">
                  {t(hub?.relationship.title || { en: "Relationship Repair & Couples Counseling", hi: "रिलेशनशिप रिपेयर एवं दांपत्य परामर्श", gu: "સંબંધ સુધારણા અને દાંપત્ય કાઉન્સેલિંગ" })}
                </h2>

                <p className="text-sm text-ink-muted leading-relaxed">
                  {t(hub?.relationship.desc || { en: "For couples experiencing repetitive argument loops, emotional withdrawal, intimacy decline, or trust fractures. A non-judgmental container where both partners are heard equally.", hi: "", gu: "" })}
                </p>

                <div className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <h4 className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider">
                    {t(hub?.sessionLooksLikeLabel || { en: "What a session looks like:", hi: "सत्र का स्वरूप:", gu: "સત્રનું સ્વરૂપ:" })}
                  </h4>
                  <p className="text-xs text-ink-muted">
                    {t(hub?.relationship.format || { en: "60–75 minutes structured joint or alternating 1-on-1 sessions identifying defensive patterns and practicing active-listening scripts.", hi: "", gu: "" })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/services/relationship-repair"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                  >
                    {t(hub?.relationship.exploreBtn || { en: "Explore Full Relationship Page", hi: "विस्तृत रिलेशनशिप पेज देखें", gu: "વિસ્તૃત રિલેશનશિપ પેજ જુઓ" })}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/contact?service=Relationship%20Repair#booking"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    {t(hub?.relationship.bookBtn || { en: "Book Couples Session", hi: "दांपत्य सत्र बुक करें", gu: "દંપતી સેશન બુક કરો" })}
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Counselling & Life Coaching */}
          <ScrollReveal direction="up" delay={250}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover-lift">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8CA899]/20 text-[#0B3C2D] text-xs font-bold">
                  <Brain className="w-4 h-4 text-[#0B3C2D]" />
                  <span>{t(hub?.counselling.tag || { en: "Individual Wellness & Clarity", hi: "व्यक्तिगत मानसिक स्वास्थ्य एवं स्पष्टता", gu: "વ્યક્તિગત માનસિક શાંતિ અને સ્પષ્ટતા" })}</span>
                </div>

                <h2 className="text-3xl font-serif-display font-bold text-[#0B3C2D]">
                  {t(hub?.counselling.title || { en: "Individual Counseling & Life Coaching", hi: "व्यक्तिगत परामर्श एवं लाइफ कोचिंग", gu: "વ્યક્તિગત કાઉન્સેલિંગ અને લાઈફ કોચિંગ" })}
                </h2>

                <p className="text-sm text-ink-muted leading-relaxed">
                  {t(hub?.counselling.desc || { en: "For professionals, entrepreneurs, and individuals carrying heavy cognitive overload, career burnout, transition anxiety, or emotional exhaustion.", hi: "", gu: "" })}
                </p>

                <div className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <h4 className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider">
                    {t(hub?.sessionLooksLikeLabel || { en: "What a session looks like:", hi: "सत्र का स्वरूप:", gu: "સત્રનું સ્વરૂપ:" })}
                  </h4>
                  <p className="text-xs text-ink-muted">
                    {t(hub?.counselling.format || { en: "60 minutes 1-on-1 video or in-person consultation exploring root triggers, emotional regulation practices, and structured personal development goals.", hi: "", gu: "" })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/services/counselling-life-coaching"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                  >
                    {t(hub?.counselling.exploreBtn || { en: "Explore Full Individual Page", hi: "विस्तृत व्यक्तिगत पेज देखें", gu: "વિસ્તૃત વ્યક્તિગત પેજ જુઓ" })}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/contact?service=Counselling%20%26%20Life%20Coaching#booking"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    {t(hub?.counselling.bookBtn || { en: "Book Individual Session", hi: "व्यक्तिगत सत्र बुक करें", gu: "વ્યક્તિગત સેશન બુક કરો" })}
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F8F4EE]/80 p-6 rounded-2xl border border-[#0B3C2D]/10 space-y-4">
                <h3 className="text-sm font-bold text-[#0B3C2D] uppercase tracking-wider">
                  {t(hub?.keyTopicsLabel || { en: "Key Topics Covered:", hi: "मुख्य विषय और समाधान:", gu: "મુખ્ય વિષયો અને સમાધાન:" })}
                </h3>
                <ul className="space-y-3 text-xs text-deep-ink">
                  {(hub?.counselling.topics || [
                    { en: "Executive stress management & fatigue recovery", hi: "", gu: "" },
                    { en: "Overcoming imposter syndrome & career transition anxiety", hi: "", gu: "" },
                    { en: "Establishing personal emotional boundaries", hi: "", gu: "" },
                    { en: "Developing sustainable self-care and mental habits", hi: "", gu: "" },
                  ]).map((topic, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                      <span>{t(topic)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Extended Section: Session Preparation & Guarantees */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                {t(sp?.standards.badge || { en: "Practice Standards", hi: "हमारी विशेषताएं", gu: "અમારી વિશેષતાઓ" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t(sp?.standards.heading || { en: "What Makes My Counseling Unique", hi: "हमारे परामर्श की विशिष्ट पहचान", gu: "અમારા કાઉન્સેલિંગની વિશિષ્ટ ઓળખ" })}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                <Sparkles className="w-6 h-6 text-[#D98A2B]" />
                <h4 className="text-sm font-bold text-[#0B3C2D]">
                  {t(sp?.standards.card1.title || { en: "Direct Practitioner Connection", hi: "सीधा व्यक्तिगत परामर्श", gu: "સીધો વ્યક્તિગત સંવાદ" })}
                </h4>
                <p className="text-xs text-ink-muted">
                  {t(sp?.standards.card1.desc || { en: "You work directly with me in every session — no junior associates, rotating counselors, or automated app matching.", hi: "", gu: "" })}
                </p>
              </div>

              <div className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#8CA899]" />
                <h4 className="text-sm font-bold text-[#0B3C2D]">
                  {t(sp?.standards.card2.title || { en: "Strict Privacy Guarantee", hi: "१००% पूर्ण गोपनीयता", gu: "૧૦૦% સંપૂર્ણ ગોપનીયતા" })}
                </h4>
                <p className="text-xs text-ink-muted">
                  {t(sp?.standards.card2.desc || { en: "100% confidential sessions. Your records, conversation details, and personal data are never shared or sold.", hi: "", gu: "" })}
                </p>
              </div>

              <div className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                <Brain className="w-6 h-6 text-[#0B3C2D]" />
                <h4 className="text-sm font-bold text-[#0B3C2D]">
                  {t(sp?.standards.card3.title || { en: "Actionable Frameworks", hi: "व्यावहारिक एवं प्रभावी समाधान", gu: "વ્યવહારુ અને અસરકારક ઉકેલો" })}
                </h4>
                <p className="text-xs text-ink-muted">
                  {t(sp?.standards.card3.desc || { en: "Every session concludes with concrete takeaways, conversation scripts, or emotional exercises tailored to your daily routine.", hi: "", gu: "" })}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
