"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Users,
  Heart,
  Brain,
  ShieldCheck,
  Globe,
  Award,
  ChevronRight,
  MessageCircle,
  Clock,
  ChevronLeft,
  Calendar
} from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import WaveDivider from "@/components/WaveDivider";
import StressQuizModal from "@/components/StressQuizModal";
import DirectBookingModal from "@/components/DirectBookingModal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function HomePage() {
  const { t } = useLanguage();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState("Couples Relationship Repair");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const openDirectBooking = (serviceName: string) => {
    setBookingService(serviceName);
    setIsBookingOpen(true);
  };

  const realAvatars = [
    { name: "Priya R.", url: "/avatar1.png" },
    { name: "Siddharth M.", url: "/avatar2.png" },
    { name: "Ananya K.", url: "/avatar3.png" },
    { name: "Rahul S.", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80" },
  ];

  const concernCards = [
    {
      title: t(translations.concernCardsSection.card1.title),
      description: t(translations.concernCardsSection.card1.description),
      serviceHref: "/services/parenting-coaching",
      tag: t(translations.concernCardsSection.card1.tag),
    },
    {
      title: t(translations.concernCardsSection.card2.title),
      description: t(translations.concernCardsSection.card2.description),
      serviceHref: "/services/relationship-repair",
      tag: t(translations.concernCardsSection.card2.tag),
    },
    {
      title: t(translations.concernCardsSection.card3.title),
      description: t(translations.concernCardsSection.card3.description),
      serviceHref: "/services/counselling-life-coaching",
      tag: t(translations.concernCardsSection.card3.tag),
    },
    {
      title: t(translations.concernCardsSection.card4.title),
      description: t(translations.concernCardsSection.card4.description),
      serviceHref: "/services/relationship-repair",
      tag: t(translations.concernCardsSection.card4.tag),
    },
    {
      title: t(translations.concernCardsSection.card5.title),
      description: t(translations.concernCardsSection.card5.description),
      serviceHref: "/services/parenting-coaching",
      tag: t(translations.concernCardsSection.card5.tag),
    },
    {
      title: t(translations.concernCardsSection.card6.title),
      description: t(translations.concernCardsSection.card6.description),
      serviceHref: "/services/counselling-life-coaching",
      tag: t(translations.concernCardsSection.card6.tag),
    },
  ];

  const processSteps = [
    {
      step: translations.home?.processStepsSection.step1.step || "01",
      title: t(translations.home?.processStepsSection.step1.title || { en: "Discover", hi: "प्रारंभिक परिचय", gu: "પ્રારંભિક સંવાદ" }),
      subtitle: t(translations.home?.processStepsSection.step1.subtitle || { en: "Free Initial Call", hi: "निःशुल्क परिचय कॉल", gu: "નિઃશુલ્ક પરિચય કોલ" }),
      description: t(translations.home?.processStepsSection.step1.description || { en: "A 15-minute introductory conversation to understand your context, concerns, and primary goals.", hi: "", gu: "" }),
    },
    {
      step: translations.home?.processStepsSection.step2.step || "02",
      title: t(translations.home?.processStepsSection.step2.title || { en: "Define", hi: "मूल कारणों की पहचान", gu: "મૂળ કારણોની ઓળખ" }),
      subtitle: t(translations.home?.processStepsSection.step2.subtitle || { en: "Root Cause Mapping", hi: "रूट कॉज़ मैपिंग", gu: "રૂટ કોઝ મેપિંગ" }),
      description: t(translations.home?.processStepsSection.step2.description || { en: "We map underlying behavioral patterns, emotional triggers, and relational friction points.", hi: "", gu: "" }),
    },
    {
      step: translations.home?.processStepsSection.step3.step || "03",
      title: t(translations.home?.processStepsSection.step3.title || { en: "Strategy", hi: "व्यक्तिगत योजना", gu: "વ્યક્તિગત યોજના" }),
      subtitle: t(translations.home?.processStepsSection.step3.subtitle || { en: "Custom Action Plan", hi: "कस्टम एक्शन प्लान", gu: "કસ્ટમ એક્શન પ્લાન" }),
      description: t(translations.home?.processStepsSection.step3.description || { en: "Co-creating practical, evidence-based coping tools and communication frameworks for daily life.", hi: "", gu: "" }),
    },
    {
      step: translations.home?.processStepsSection.step4.step || "04",
      title: t(translations.home?.processStepsSection.step4.title || { en: "Sessions", hi: "मार्गदर्शित सत्र", gu: "માર્ગદર્શિત સત્રો" }),
      subtitle: t(translations.home?.processStepsSection.step4.subtitle || { en: "Guided 1-on-1 Work", hi: "निर्देशित १-ऑन-१ कार्य", gu: "નિર્દેશિત ૧-ઓન-૧ કાર્ય" }),
      description: t(translations.home?.processStepsSection.step4.description || { en: "Dedicated structured sessions (online or in Mumbai) to practice strategies and navigate real scenarios.", hi: "", gu: "" }),
    },
    {
      step: translations.home?.processStepsSection.step5.step || "05",
      title: t(translations.home?.processStepsSection.step5.title || { en: "Growth", hi: "स्थायी सुकून", gu: "કાયમી સુખાકારી" }),
      subtitle: t(translations.home?.processStepsSection.step5.subtitle || { en: "Sustainable Calm", hi: "शाश्वत मानसिक शांति", gu: "શાશ્વત માનસિક શાંતિ" }),
      description: t(translations.home?.processStepsSection.step5.description || { en: "Achieving lasting emotional balance, renewed relationship warmth, and self-sustaining clarity.", hi: "", gu: "" }),
    },
  ];

  const testimonials = [
    {
      quote: t(translations.home?.testimonialsSection.item1.quote || { en: "Nikunj helped us transform our evening routine with our teenagers from screaming matches into calm, open conversations. His practical frameworks gave our family back peace.", hi: "", gu: "" }),
      author: t(translations.home?.testimonialsSection.item1.author || { en: "P. R. & Family", hi: "पी. आर. और परिवार", gu: "પી. આર. અને પરિવાર" }),
      role: t(translations.home?.testimonialsSection.item1.role || { en: "Parenting Coaching Clients", hi: "पेरेंटिंग कोचिंग क्लाइंट्स", gu: "પેરેન્ટિંગ કોચિંગ ક્લાયન્ટ્સ" }),
      location: t(translations.home?.testimonialsSection.item1.location || { en: "Mumbai", hi: "मुंबई", gu: "મુંબઈ" }),
      avatar: "/avatar1.png",
      stars: 5,
    },
    {
      quote: t(translations.home?.testimonialsSection.item2.quote || { en: "My husband and I were trapped in the same argument for 2 years after our second child. In just 4 sessions, Nikunj helped us break down defenses and rebuild trust.", hi: "", gu: "" }),
      author: t(translations.home?.testimonialsSection.item2.author || { en: "S. & A. Mehta", hi: "एस. और ए. मेहता", gu: "એસ. અને એ. મહેતા" }),
      role: t(translations.home?.testimonialsSection.item2.role || { en: "Relationship Repair", hi: "दांपत्य सुधार क्लाइंट्स", gu: "રિલેશનશિપ રિપેર ક્લાયન્ટ્સ" }),
      location: t(translations.home?.testimonialsSection.item2.location || { en: "Pune / Online", hi: "पुणे / ऑनलाइन", gu: "પુણે / ઓનલાઈન" }),
      avatar: "/avatar2.png",
      stars: 5,
    },
    {
      quote: t(translations.home?.testimonialsSection.item3.quote || { en: "As a senior manager, my anxiety was leaking into both my leadership and my home life. Nikunj's evidence-based approach is grounded, practical, and deeply supportive.", hi: "", gu: "" }),
      author: t(translations.home?.testimonialsSection.item3.author || { en: "R. Sharma", hi: "आर. शर्मा", gu: "આર. શર્મા" }),
      role: t(translations.home?.testimonialsSection.item3.role || { en: "Corporate Executive", hi: "कॉरपोरेट एग्जीक्यूटिव", gu: "કોર્પોરેટ એક્ઝિક્યુટિવ" }),
      location: t(translations.home?.testimonialsSection.item3.location || { en: "Bengaluru", hi: "बेंगलुरु", gu: "બેંગલુરુ" }),
      avatar: "/avatar3.png",
      stars: 5,
    },
  ];

  return (
    <div className="space-y-0 bg-[#F8F4EE]">
      
      {/* ── SECTION 1: HERO (Redesigned matching mockup & page color palette) ── */}
      <section className="relative bg-[#F8F4EE] pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content (ORDER 1 on Mobile & Desktop) */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
              
              {/* Top Tag Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#0B3C2D]/10 text-[#0B3C2D] text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D98A2B]" />
                <span>{t(translations.hero.tagPill)}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-[#0B3C2D] leading-[1.15] tracking-tight max-w-3xl">
                {t(translations.hero.headlinePart1)}{" "}
                <span className="italic text-[#D98A2B] font-normal inline-block">
                  {t(translations.hero.headlinePart2)}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl">
                {t(translations.hero.subheadline)}
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => openDirectBooking("Couples Relationship Repair")}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-md hover-lift transition-all cursor-pointer"
                >
                  <Calendar className="w-4.5 h-4.5 mr-2 text-[#D98A2B]" />
                  {t(translations.hero.bookSessionBtn)}
                </button>
                
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-[#0B3C2D]/15 text-[#0B3C2D] hover:bg-[#0B3C2D] hover:text-white font-semibold text-sm shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
                >
                  <Sparkles className="w-4.5 h-4.5 mr-2 text-[#D98A2B] group-hover:text-white transition-colors" />
                  {t(translations.hero.takeStressCheckBtn)}
                </button>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/90 p-3.5 rounded-2xl border border-[#0B3C2D]/10 flex items-center space-x-3 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#0B3C2D]/10 text-[#0B3C2D] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-[#0B3C2D]" />
                  </div>
                  <div>
                    <span className="block font-serif-display font-bold text-base text-[#0B3C2D] leading-none">80+</span>
                    <span className="block text-[11px] text-ink-muted leading-tight mt-0.5">{t(translations.hero.familiesGuided)}</span>
                  </div>
                </div>

                <div className="bg-white/90 p-3.5 rounded-2xl border border-[#0B3C2D]/10 flex items-center space-x-3 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#D98A2B]/15 text-[#D98A2B] flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="block font-serif-display font-bold text-base text-[#0B3C2D] leading-none">4.9/5</span>
                    <span className="block text-[11px] text-ink-muted leading-tight mt-0.5">{t(translations.hero.clientRating)}</span>
                  </div>
                </div>

                <div className="bg-white/90 p-3.5 rounded-2xl border border-[#0B3C2D]/10 flex items-center space-x-3 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#8CA899]/20 text-[#0B3C2D] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#0B3C2D]" />
                  </div>
                  <div>
                    <span className="block font-serif-display font-bold text-base text-[#0B3C2D] leading-none">100%</span>
                    <span className="block text-[11px] text-ink-muted leading-tight mt-0.5">{t(translations.hero.confidential)}</span>
                  </div>
                </div>
              </div>

              {/* Avatars Trust Row */}
              <div className="flex items-center space-x-3 pt-1">
                <div className="flex -space-x-2">
                  {realAvatars.map((person, idx) => (
                    <div key={idx} className="relative w-8 h-8">
                      <Image
                        src={person.url}
                        alt={person.name}
                        fill
                        sizes="32px"
                        className="rounded-full object-cover border-2 border-[#F8F4EE] shadow-2xs"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-ink-muted">
                  {t(translations.hero.trustedBy)}
                </span>
              </div>

            </div>

            {/* Person Photo Card (Right Side) */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-[32px] p-2.5 bg-white/80 shadow-2xl border border-[#0B3C2D]/10 overflow-hidden space-y-2.5">
                
                {/* Person portrait photo /03.png kept as requested */}
                <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm group">
                  <Image
                    src="/03.png"
                    alt="Nikunj Dhanani Counselor"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-[center_20%] group-hover:scale-103 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* Floating Bottom Card Badge */}
                <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#0B3C2D]/10 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#0B3C2D] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#0B3C2D] truncate">
                        {t(translations.hero.safeSpaceTitle)}
                      </h4>
                      <p className="text-[11px] text-ink-muted leading-tight line-clamp-1">
                        {t(translations.hero.safeSpaceDesc)}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/about"
                    className="w-8 h-8 rounded-full border border-[#0B3C2D]/20 text-[#0B3C2D] hover:bg-[#0B3C2D] hover:text-white flex items-center justify-center shrink-0 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>

          </div>

          {/* WORKED WITH INDIVIDUALS & LEADERS FROM Logos Bar */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 border border-[#0B3C2D]/10 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-ink-muted uppercase tracking-widest text-center block mb-5 font-sans">
              {t(translations.hero.workedWith)}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75">
              <span className="text-xl md:text-2xl font-bold font-sans tracking-tight text-[#0B3C2D]/80">Google</span>
              <span className="text-xl md:text-2xl font-semibold font-sans tracking-tight text-[#0B3C2D]/80 flex items-center">
                <span className="grid grid-cols-2 gap-0.5 w-4 h-4 mr-2">
                  <span className="bg-[#F25022]"></span>
                  <span className="bg-[#7FBA00]"></span>
                  <span className="bg-[#00A4EF]"></span>
                  <span className="bg-[#FFB900]"></span>
                </span>
                Microsoft
              </span>
              <span className="text-xl md:text-2xl font-bold font-sans tracking-tight text-[#0B3C2D]/80">airbnb</span>
              <span className="text-xl md:text-2xl font-bold font-sans tracking-tighter text-[#0B3C2D]/80 italic">amazon</span>
              <span className="text-xl md:text-2xl font-black font-sans tracking-tight text-[#0B3C2D]/80">Deloitte.</span>
              <span className="text-xl md:text-2xl font-medium font-sans tracking-tight text-[#0B3C2D]/80">Infosys</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 1.5: RELATABLE PROBLEM-HOOK & DIRECT COUNSELING SOLUTION ── */}
      <section className="bg-white py-14 sm:py-20 md:py-24 border-y border-[#0B3C2D]/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Hook Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D98A2B]/10 border border-[#D98A2B]/20 text-[#D98A2B] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t(translations.problemHook.badge)}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#0B3C2D] leading-[1.2]">
              {t(translations.problemHook.headlinePart1)}{" "}
              <span className="italic text-[#D98A2B] font-normal block sm:inline">
                {t(translations.problemHook.headlinePart2)}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto">
              {t(translations.problemHook.intro)}
            </p>
          </div>

          {/* 3 Relatable Problem-to-Solution Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* CARD 1: Couple / Marriage Relationship Repair */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#0B3C2D]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group hover:border-[#D98A2B]/50">
              <div className="space-y-5">
                {/* Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#D98A2B]/15 text-[#D98A2B] flex items-center justify-center shadow-xs">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#D98A2B]/10 text-[#D98A2B]">
                    {t(translations.problemHook.couples.tag)}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D] group-hover:text-[#D98A2B] transition-colors">
                    {t(translations.problemHook.couples.title)}
                  </h3>
                  <p className="text-xs text-ink-muted font-medium mt-1">
                    {t(translations.problemHook.couples.subtitle)}
                  </p>
                </div>

                {/* Relatable Problem Checklist */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B3C2D] block">
                    {t(translations.problemHook.couples.realityCheck)}
                  </span>
                  <ul className="space-y-2.5 text-xs text-ink-navy leading-relaxed">
                    <li className="flex items-start">
                      <span className="w-4 h-4 rounded-full bg-[#D98A2B]/20 text-[#D98A2B] flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0 mt-0.5">•</span>
                      <span>{t(translations.problemHook.couples.point1)}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-4 h-4 rounded-full bg-[#D98A2B]/20 text-[#D98A2B] flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0 mt-0.5">•</span>
                      <span>{t(translations.problemHook.couples.point2)}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-4 h-4 rounded-full bg-[#D98A2B]/20 text-[#D98A2B] flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0 mt-0.5">•</span>
                      <span>{t(translations.problemHook.couples.point3)}</span>
                    </li>
                  </ul>
                </div>

                {/* The Counseling Solution */}
                <div className="p-4 rounded-2xl bg-white border border-[#0B3C2D]/10 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B3C2D] block">
                    {t(translations.problemHook.couples.solutionLabel)}
                  </span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {t(translations.problemHook.couples.solution)}
                  </p>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openDirectBooking("Couples Relationship Repair")}
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs shadow-md hover-lift transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 mr-2 text-[#D98A2B]" />
                  {t(translations.problemHook.couples.button)}
                </button>
              </div>
            </div>

            {/* CARD 2: Family & Parenting Guidance */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#0B3C2D]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group hover:border-[#0B3C2D]/50">
              <div className="space-y-5">
                {/* Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B3C2D]/15 text-[#0B3C2D] flex items-center justify-center shadow-xs">
                    <Users className="w-6 h-6 text-[#0B3C2D]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#0B3C2D]/10 text-[#0B3C2D]">
                    {t(translations.problemHook.family.tag)}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D] group-hover:text-[#0B3C2D] transition-colors">
                    {t(translations.problemHook.family.title)}
                  </h3>
                  <p className="text-xs text-ink-muted font-medium mt-1">
                    {t(translations.problemHook.family.subtitle)}
                  </p>
                </div>

                {/* Relatable Problem Checklist */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B3C2D] block">
                    {t(translations.problemHook.family.realityCheck)}
                  </span>
                  <ul className="space-y-2.5 text-xs text-ink-navy leading-relaxed">
                    <li className="flex items-start">
                      <span className="w-4 h-4 rounded-full bg-[#0B3C2D]/20 text-[#0B3C2D] flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0 mt-0.5">•</span>
                      <span>{t(translations.problemHook.family.point1)}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-4 h-4 rounded-full bg-[#0B3C2D]/20 text-[#0B3C2D] flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0 mt-0.5">•</span>
                      <span>{t(translations.problemHook.family.point2)}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-4 h-4 rounded-full bg-[#0B3C2D]/20 text-[#0B3C2D] flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0 mt-0.5">•</span>
                      <span>{t(translations.problemHook.family.point3)}</span>
                    </li>
                  </ul>
                </div>

                {/* The Counseling Solution */}
                <div className="p-4 rounded-2xl bg-white border border-[#0B3C2D]/10 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B3C2D] block">
                    {t(translations.problemHook.family.solutionLabel)}
                  </span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {t(translations.problemHook.family.solution)}
                  </p>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openDirectBooking("Parenting & Family Coaching")}
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs shadow-md hover-lift transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 mr-2 text-[#D98A2B]" />
                  {t(translations.problemHook.family.button)}
                </button>
              </div>
            </div>

            {/* CARD 3: 1-on-1 Life & Executive Mentorship */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#0B3C2D]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group hover:border-[#2C6E49]/50">
              <div className="space-y-5">
                {/* Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#2C6E49]/15 text-[#2C6E49] flex items-center justify-center shadow-xs">
                    <Brain className="w-6 h-6 text-[#2C6E49]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#2C6E49]/10 text-[#2C6E49]">
                    {t(translations.problemHook.burnout.tag)}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D] group-hover:text-[#2C6E49] transition-colors">
                    {t(translations.problemHook.burnout.title)}
                  </h3>
                  <p className="text-xs text-ink-muted font-medium mt-1">
                    {t(translations.problemHook.burnout.subtitle)}
                  </p>
                </div>

                {/* Relatable Problem Checklist */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B3C2D] block">
                    {t(translations.problemHook.burnout.realityCheck)}
                  </span>
                  <ul className="space-y-2.5 text-xs text-ink-navy leading-relaxed">
                    <li className="flex items-start">
                      <span className="w-4 h-4 rounded-full bg-[#2C6E49]/20 text-[#2C6E49] flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0 mt-0.5">•</span>
                      <span>{t(translations.problemHook.burnout.point1)}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-4 h-4 rounded-full bg-[#2C6E49]/20 text-[#2C6E49] flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0 mt-0.5">•</span>
                      <span>{t(translations.problemHook.burnout.point2)}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-4 h-4 rounded-full bg-[#2C6E49]/20 text-[#2C6E49] flex items-center justify-center text-[10px] font-bold mr-2.5 shrink-0 mt-0.5">•</span>
                      <span>{t(translations.problemHook.burnout.point3)}</span>
                    </li>
                  </ul>
                </div>

                {/* The Counseling Solution */}
                <div className="p-4 rounded-2xl bg-white border border-[#0B3C2D]/10 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B3C2D] block">
                    {t(translations.problemHook.burnout.solutionLabel)}
                  </span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {t(translations.problemHook.burnout.solution)}
                  </p>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openDirectBooking("Individual Counseling & Mentorship")}
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs shadow-md hover-lift transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 mr-2 text-[#D98A2B]" />
                  {t(translations.problemHook.burnout.button)}
                </button>
              </div>
            </div>

          </div>

          {/* Reassurance Bar */}
          <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-[#0B3C2D]/10 flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-[#0B3C2D]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#D98A2B]" />
              <span>{t(translations.problemHook.reassurance.confidentialCare)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#0B3C2D]" />
              <span>{t(translations.problemHook.reassurance.directCalendar)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D98A2B]" />
              <span>{t(translations.problemHook.reassurance.evidenceBased)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#0B3C2D]" />
              <span>{t(translations.problemHook.reassurance.dedicatedSessions)}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="wave" fillColor="#FFFFFF" className="-mt-1 z-10 relative" />

      {/* ── SECTION 2: EMOTIONAL CONNECTOR BLOCK ── */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-[#0B3C2D] leading-snug">
            {t(translations.emotionalConnector.quote)}
          </h2>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed">
            {t(translations.emotionalConnector.subquote)}
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center text-sm font-bold text-[#0B3C2D] hover:text-[#D98A2B] transition-colors group"
            >
              {t(translations.emotionalConnector.philosophyBtn)}
              <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="curve-dip" fillColor="#F8F4EE" className="-mt-1 z-10 relative" />

      {/* ── SECTION 3: WHO THIS IS FOR — CONCERN CARDS ── */}
      <section className="bg-[#F8F4EE] py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              {t(translations.concernCardsSection.badge)}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
              {t(translations.concernCardsSection.heading)}
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              {t(translations.concernCardsSection.subheading)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concernCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#0B3C2D]/10 hover:border-[#0B3C2D] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover-lift"
              >
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#8CA899]/20 text-[#0B3C2D] text-[11px] font-bold">
                    {card.tag}
                  </span>
                  <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D] group-hover:text-[#D98A2B] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#0B3C2D]/5 flex items-center justify-between">
                  <Link
                    href={card.serviceHref}
                    className="text-xs font-bold text-[#0B3C2D] group-hover:text-[#D98A2B] inline-flex items-center transition-colors"
                  >
                    {t(translations.concernCardsSection.exploreBtn)}
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <LeafMotif className="w-4 h-4 text-[#8CA899]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="asymmetric" fillColor="#FFFFFF" className="-mt-1 z-10 relative" />

      {/* ── SECTION 4: SERVICES OVERVIEW CARDS ── */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              {t(translations.home?.coreServices.badge || { en: "Core Practice Offerings", hi: "मुख्य परामर्श सेवाएं", gu: "મુખ્ય કાઉન્સેલિંગ સેવાઓ" })}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
              {t(translations.home?.coreServices.heading || { en: "Structured Offerings & Counseling Services", hi: "व्यवस्थित परामर्श एवं व्यक्तिगत मार्गदर्शन", gu: "સુવ્યવસ્થિત કાઉન્સેલિંગ અને માર્ગદર્શન સેવાઓ" })}
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              {t(translations.home?.coreServices.subheading || { en: "Choose the dedicated format that aligns with your present needs.", hi: "अपनी वर्तमान स्थिति और आवश्यकता के अनुसार उपयुक्त परामर्श सत्र चुनें।", gu: "તમારી વર્તમાન સ્થિતિ અને જરૂરિયાત મુજબ યોગ્ય સત્ર પસંદ કરો." })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Service 1: Parenting Coaching */}
            <div className="bg-[#F8F4EE] rounded-3xl p-8 border border-[#0B3C2D]/15 flex flex-col justify-between hover-lift">
              <div className="space-y-6">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="/service_parenting.png"
                    alt="Parenting Coaching"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block mb-1">
                    {t(translations.home?.coreServices.parenting.tag || { en: "Family & Youth", hi: "परिवार एवं बाल-विकास", gu: "પરિવાર અને બાળ ઉછેર" })}
                  </span>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    {t(translations.home?.coreServices.parenting.title || { en: "Parenting Coaching", hi: "पेरेंटिंग कोचिंग व मार्गदर्शन", gu: "પેરેન્ટિંગ કોચિંગ અને માર્ગદર્શન" })}
                  </h3>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t(translations.home?.coreServices.parenting.description || { en: "Transform household stress, manage child behavior cycles, and restore warmth between parents and children with structured guidance.", hi: "", gu: "" })}
                </p>
                <ul className="space-y-2 text-xs text-[#13221C]">
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>{t(translations.home?.coreServices.parenting.point1 || { en: "Behavioral triggers & routine structure", hi: "", gu: "" })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>{t(translations.home?.coreServices.parenting.point2 || { en: "Teenager independence & emotional regulation", hi: "", gu: "" })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>{t(translations.home?.coreServices.parenting.point3 || { en: "Co-parenting alignment", hi: "", gu: "" })}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-[#0B3C2D]/10">
                <Link
                  href="/services/parenting-coaching"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                >
                  {t(translations.home?.coreServices.parenting.button || { en: "View Parenting Program", hi: "पेरेंटिंग प्रोग्राम देखें", gu: "પેરેન્ટિંગ પ્રોગ્રામ જુઓ" })}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Service 2: Relationship Repair */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#D98A2B] flex flex-col justify-between shadow-lg relative hover-lift">
              <span className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-[#D98A2B] text-white text-[10px] font-bold uppercase tracking-wider">
                {t(translations.home?.coreServices.relationship.badge || { en: "Most Requested", hi: "सर्वाधिक लोकप्रिय", gu: "સૌથી વધુ પસંદ કરાયેલ" })}
              </span>
              <div className="space-y-6">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="/service_relationship.png"
                    alt="Relationship Repair"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider block mb-1">
                    {t(translations.home?.coreServices.relationship.tag || { en: "Couples Support", hi: "दांपत्य सहयोग", gu: "દંપતી સહયોગ" })}
                  </span>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    {t(translations.home?.coreServices.relationship.title || { en: "Relationship Repair", hi: "रिलेशनशिप व दांपत्य सुधार", gu: "સંબંધ સુધારણા અને દાંપત્ય જીવન" })}
                  </h3>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t(translations.home?.coreServices.relationship.description || { en: "Break repetitive argument cycles, heal past misunderstandings, and rebuild intimate communication with your partner.", hi: "", gu: "" })}
                </p>
                <ul className="space-y-2 text-xs text-[#13221C]">
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D]" />
                    <span>{t(translations.home?.coreServices.relationship.point1 || { en: "De-escalation & conflict resolution", hi: "", gu: "" })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D]" />
                    <span>{t(translations.home?.coreServices.relationship.point2 || { en: "Emotional intimacy & trust renewal", hi: "", gu: "" })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#0B3C2D]" />
                    <span>{t(translations.home?.coreServices.relationship.point3 || { en: "Kids after marriage & relationship balance", hi: "शादी के बाद बच्चे और दांपत्य संतुलन", gu: "લગ્ન પછી બાળકો અને સંબંધોની સમતુલા" })}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-[#0B3C2D]/10">
                <Link
                  href="/services/relationship-repair"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                >
                  {t(translations.home?.coreServices.relationship.button || { en: "View Relationship Program", hi: "रिलेशनशिप प्रोग्राम देखें", gu: "સંબંધ સુધારણા પ્રોગ્રામ જુઓ" })}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Service 3: Counselling & Life Coaching */}
            <div className="bg-[#F8F4EE] rounded-3xl p-8 border border-[#0B3C2D]/15 flex flex-col justify-between hover-lift">
              <div className="space-y-6">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="/service_counselling.png"
                    alt="Counselling & Life Coaching"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider block mb-1">
                    {t(translations.home?.coreServices.counselling.tag || { en: "Individual Care", hi: "व्यक्तिगत परामर्श", gu: "વ્યક્તિગત કાઉન્સેલિંગ" })}
                  </span>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    {t(translations.home?.coreServices.counselling.title || { en: "Counselling & Life Coaching", hi: "काउंसलिंग और लाइफ कोचिंग", gu: "કાઉન્સેલિંગ અને લાઈફ કોચિંગ" })}
                  </h3>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t(translations.home?.coreServices.counselling.description || { en: "Tailored 1-on-1 counseling for stress management, executive burnout, life transitions, and self-confidence.", hi: "", gu: "" })}
                </p>
                <ul className="space-y-2 text-xs text-[#13221C]">
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>{t(translations.home?.coreServices.counselling.point1 || { en: "Stress & executive burnout relief", hi: "", gu: "" })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>{t(translations.home?.coreServices.counselling.point2 || { en: "Emotional resilience & boundaries", hi: "", gu: "" })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <LeafMotif className="w-4 h-4 text-[#D98A2B]" />
                    <span>{t(translations.home?.coreServices.counselling.point3 || { en: "Career & life transition clarity", hi: "", gu: "" })}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-[#0B3C2D]/10">
                <Link
                  href="/services/counselling-life-coaching"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                >
                  {t(translations.home?.coreServices.counselling.button || { en: "View Individual Program", hi: "व्यक्तिगत प्रोग्राम देखें", gu: "વ્યક્તિગત પ્રોગ્રામ જુઓ" })}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="gentle-arc" fillColor="#F8F4EE" className="-mt-1 z-10 relative" />

      {/* ── SECTION 5: HOW IT WORKS — PROCESS STEPPER ── */}
      <section className="bg-[#F8F4EE] py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              {t(translations.home?.processStepsSection.badge || { en: "Clear, Transparent Process", hi: "स्पष्ट और पारदर्शी प्रक्रिया", gu: "સ્પષ્ટ અને પારદર્શક પ્રક્રિયા" })}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
              {t(translations.home?.processStepsSection.heading || { en: "How We Work Together", hi: "हमारी कार्यप्रणाली", gu: "આપણી કાર્યપદ્ધતિ" })}
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              {t(translations.home?.processStepsSection.subheading || { en: "A 5-step structured journey designed to move you from stress to emotional calm.", hi: "तनाव से मानसिक शांति और स्पष्टता की ओर ले जाने वाली ५ चरणों की सुव्यवस्थित यात्रा।", gu: "તણાવમાંથી માનસિક શાંતિ અને સ્પષ્ટતા તરફ લઈ જતી ૫ તબક્કાની સુવ્યવસ્થિત યાત્રા." })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#0B3C2D]/10 shadow-sm relative flex flex-col justify-between hover-lift"
              >
                <div className="space-y-3">
                  <span className="text-3xl font-serif-display font-bold text-[#D98A2B] block">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-serif-display font-bold text-[#0B3C2D]">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-bold uppercase text-[#8CA899] block">
                    {step.subtitle}
                  </span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="curve-dip" fillColor="#0B3C2D" className="-mt-1 z-10 relative" />

      {/* ── SECTION 6: STATS BAR ── */}
      <section className="bg-[#0B3C2D] text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#8CA899]/20">
            
            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-serif-display font-bold text-[#D98A2B]">
                120+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8CA899]">
                {t(translations.home?.stats.stat1Label || { en: "Sessions Conducted", hi: "सफलतापूर्वक पूर्ण सत्र", gu: "સફળતાપૂર્વક પૂર્ણ સત્રો" })}
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-serif-display font-bold text-[#D98A2B]">
                80+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8CA899]">
                {t(translations.home?.stats.stat2Label || { en: "Families & Leaders", hi: "मार्गदर्शित परिवार एवं प्रोफेशनल्स", gu: "માર્ગદર્શન મેળવેલ પરિવારો અને લીડર્સ" })}
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-serif-display font-bold text-[#D98A2B]">
                6+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8CA899]">
                {t(translations.home?.stats.stat3Label || { en: "Years Practice", hi: "वर्षों का समर्पित अनुभव", gu: "વર્ષોનો સમર્પિત અનુભવ" })}
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-serif-display font-bold text-[#D98A2B]">
                98%
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8CA899]">
                {t(translations.home?.stats.stat4Label || { en: "Positive Feedback", hi: "सकारात्मक संतुष्टि दर", gu: "સંતોષકારક પ્રતિસાદ" })}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="asymmetric" fillColor="#FFFFFF" className="-mt-1 z-10 relative" />

      {/* ── SECTION 7: TESTIMONIALS CAROUSEL / GRID WITH REAL AVATARS ── */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              {t(translations.home?.testimonialsSection.badge || { en: "Client Experiences", hi: "संतुष्ट परिवारों के अनुभव", gu: "માર્ગદર્શન મેળવનારના વાસ્તવિક અનુભવો" })}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
              {t(translations.home?.testimonialsSection.heading || { en: "What Families Say", hi: "तनाव से शांति की सच्ची यात्राएं", gu: "પરિવારો શું કહે છે" })}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-[#F8F4EE] rounded-3xl p-8 sm:p-12 border border-[#0B3C2D]/10 relative shadow-md">
            <div className="flex items-center space-x-1 text-[#D98A2B] mb-6">
              {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <blockquote className="text-lg sm:text-xl font-serif-display italic text-[#0B3C2D] leading-relaxed mb-8">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>

            <div className="flex items-center justify-between pt-6 border-t border-[#0B3C2D]/10">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 shrink-0">
                  <Image
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].author}
                    fill
                    sizes="48px"
                    className="rounded-full object-cover border-2 border-[#0B3C2D]/20 shadow-sm"
                  />
                </div>
                <div>
                  <span className="text-base font-bold text-[#0B3C2D] block">
                    {testimonials[activeTestimonial].author}
                  </span>
                  <span className="text-xs text-ink-muted">
                    {testimonials[activeTestimonial].role} · {testimonials[activeTestimonial].location}
                  </span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-white border border-[#0B3C2D]/15 hover:bg-[#0B3C2D] hover:text-white transition-colors flex items-center justify-center text-[#0B3C2D]"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-white border border-[#0B3C2D]/15 hover:bg-[#0B3C2D] hover:text-white transition-colors flex items-center justify-center text-[#0B3C2D]"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="wave" fillColor="#F8F4EE" className="-mt-1 z-10 relative" />

      {/* ── SECTION 8: ABOUT PREVIEW WITH ndhanani_2nd.png ── */}
      <section className="bg-[#F8F4EE] py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 shadow-lg text-center space-y-4">
                <div className="relative w-36 h-36 mx-auto">
                  <Image
                    src="/03.png"
                    alt="Nikunj Dhanani Counselor"
                    fill
                    sizes="144px"
                    className="rounded-full object-cover object-[center_20%] border-4 border-[#F8F4EE] shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    Nikunj Dhanani
                  </h3>
                  <p className="text-xs text-[#D98A2B] font-bold uppercase tracking-wider">
                    {t(translations.home?.aboutPreview.role || { en: "Family Counselor & Life Coach", hi: "पारिवारिक परामर्शदाता एवं लाइफ कोच", gu: "પારિવારિક કાઉન્સેલર અને લાઈફ કોચ" })}
                  </p>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t(translations.home?.aboutPreview.bioShort || { en: "Based in Surat. Specializing in family stress dynamics, relationship repair, and executive mental wellness.", hi: "सूरत स्थित। पारिवारिक तनाव समाधान, दांपत्य सुधार और मानसिक स्वास्थ्य में विशेषज्ञ।", gu: "સુરત સ્થિત. પારિવારિક તણાવ નિવારણ, દાંપત્ય સુધારણા અને માનસિક સુખાકારીમાં વિશેષજ્ઞ." })}
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-2 text-[11px] text-[#0B3C2D]">
                  <span className="px-3 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">English</span>
                  <span className="px-3 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">Hindi</span>
                  <span className="px-3 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">Gujarati</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
                {t(translations.home?.aboutPreview.badge || { en: "Meet Your Counselor", hi: "काउंसलर परिचय", gu: "કાઉન્સેલર પરિચય" })}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
                {t(translations.home?.aboutPreview.quote || { en: "\"Every family holds the capacity for calm — sometimes it just takes an outside lens.\"", hi: "\"प्रत्येक परिवार में शांति और सामंजस्य की पूरी क्षमता होती है — कभी-कभी केवल एक नए नजरिए की जरूरत होती है।\"", gu: "\"દરેક પરિવારમાં શાંતિ અને સંવાદની ક્ષમતા હોય જ છે — ક્યારેક માત્ર એક તટસ્થ દ્રષ્ટિકોણની જરૂર હોય છે.\"" })}
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                {t(translations.home?.aboutPreview.desc || { en: "Over the past 6 years, I have sat across hundreds of parents, couples, and corporate leaders navigating high-stakes emotional challenges. My approach combines evidence-based behavioral coaching with warmth, specificity, and absolute confidentiality.", hi: "पिछले ६ वर्षों में, मैंने सैकड़ों माता-पिता, दंपतियों और कॉरपोरेट लीडर्स के साथ बैठकर उनकी भावनात्मक चुनौतियों का समाधान किया है। मेरा दृष्टिकोण वैज्ञानिक पद्धतियों, आत्मीयता और पूर्ण गोपनीयता का संगम है।", gu: "છેલ્લા ૬ વર્ષોમાં, મેં સેંકડો વાલીઓ, દંપતીઓ અને કોર્પોરેટ અગ્રણીઓ સાથે રૂબરૂ બેસીને તેમના મનોભાવો અને વિખવાદો ઉકેલ્યા છે. મારો અભિગમ વૈજ્ઞાનિક પદ્ધતિઓ, આત્મીયતા અને સંપૂર્ણ ગોપનીયતા પર આધારિત છે." })}
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm transition-colors"
                >
                  {t(translations.home?.aboutPreview.readStoryBtn || { en: "Read My Story & Background", hi: "मेरी यात्रा और अनुभव जानें", gu: "મારી સફર અને અનુભવ જાણો" })}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="curve-dip" fillColor="#FFFFFF" className="-mt-1 z-10 relative" />

      {/* ── SECTION 9: SPEAKING TEASER WITH WORK IMAGES ── */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
                {t(translations.home?.speakingTeaser.badge || { en: "Keynotes & Workshops", hi: "व्याख्यान एवं वर्कशॉप", gu: "વ્યાખ્યાન અને વર્કશોપ" })}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D]">
                {t(translations.home?.speakingTeaser.heading || { en: "Speaking for Corporate & School Audiences", hi: "कॉरपोरेट और शिक्षण संस्थानों के लिए प्रेरणादायक व्याख्यान", gu: "કોર્પોરેટ અને શૈક્ષણિક સંસ્થાઓ માટે પ્રેરણાદાયી વક્તવ્ય" })}
              </h2>
            </div>
            <Link
              href="/speaking"
              className="inline-flex items-center text-sm font-bold text-[#0B3C2D] hover:text-[#D98A2B] transition-colors"
            >
              {t(translations.home?.speakingTeaser.viewTopicsBtn || { en: "View Keynote Topics & Request Talk", hi: "विषय देखें एवं व्याख्यान आमंत्रित करें", gu: "વિષયો જુઓ અને વક્તવ્ય માટે આમંત્રણ આપો" })}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8F4EE] rounded-2xl overflow-hidden border border-[#0B3C2D]/10 space-y-4 hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/1st_work.png"
                  alt="Leading Through Uncertainty"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 pt-0 space-y-3">
                <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">
                  {t(translations.home?.speakingTeaser.card1?.tag || { en: "Corporate Leadership", hi: "कॉरपोरेट लीडरशिप", gu: "કોર્પોરેટ લીડરશિપ" })}
                </span>
                <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                  {t(translations.home?.speakingTeaser.card1?.title || { en: "Leading Through Uncertainty", hi: "अनिश्चितता में मजबूत नेतृत्व", gu: "અનિશ્ચિતતા વચ્ચે મજબૂત નેતૃત્વ" })}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t(translations.home?.speakingTeaser.card1?.desc || { en: "Practical strategies for leaders to manage decision fatigue, support team wellbeing, and maintain personal resilience.", hi: "लीडर्स के लिए निर्णय के तनाव को कम करने, टीम के कल्याण और व्यक्तिगत मानसिक संतुलन की व्यावहारिक रणनीतियां।", gu: "લીડર્સ માટે નિર્ણયોના થાકમાંથી મુક્તિ, ટીમની સુખાકારી અને આંતરિક મનોબળ જાળવવાની વ્યવહારુ રીતો." })}
                </p>
              </div>
            </div>

            <div className="bg-[#F8F4EE] rounded-2xl overflow-hidden border border-[#0B3C2D]/10 space-y-4 hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/2nd_work.png"
                  alt="Modern Parenting & Teen Anxiety"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 pt-0 space-y-3">
                <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">
                  {t(translations.home?.speakingTeaser.card2?.tag || { en: "Schools & Parents", hi: "स्कूल एवं अभिभावक", gu: "શાળાઓ અને વાલીઓ" })}
                </span>
                <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                  {t(translations.home?.speakingTeaser.card2?.title || { en: "Modern Parenting & Teen Anxiety", hi: "आधुनिक पेरेंटिंग और टीनएजर्स", gu: "આધુનિક પેરેન્ટિંગ અને ટીનેજર્સ" })}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t(translations.home?.speakingTeaser.card2?.desc || { en: "Helping parents build emotional safety and effective boundaries in the digital age.", hi: "डिजिटल युग में बच्चों के साथ भावनात्मक सुरक्षा और शांत सीमाओं का निर्माण करने में सहायता।", gu: "ડિજિટલ યુગમાં બાળકો સાથે સ્નેહપૂર્ણ સુરક્ષા અને શાંત શિસ્તની રચના કરવામાં સહાય." })}
                </p>
              </div>
            </div>

            <div className="bg-[#F8F4EE] rounded-2xl overflow-hidden border border-[#0B3C2D]/10 space-y-4 hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/3rd_work.png"
                  alt="Building Emotional Balance"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 pt-0 space-y-3">
                <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">
                  {t(translations.home?.speakingTeaser.card3?.tag || { en: "Institutions & Retreats", hi: "संस्थाएं एवं रिट्रीट्स", gu: "સંસ્થાઓ અને રિટ્રીટ્સ" })}
                </span>
                <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                  {t(translations.home?.speakingTeaser.card3?.title || { en: "Building Emotional Balance", hi: "भावनात्मक संतुलन का निर्माण", gu: "લાગણીશીલ સમતુલાનું નિર્માણ" })}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t(translations.home?.speakingTeaser.card3?.desc || { en: "Interactive workshops on stress regulation, active listening, and relationship longevity.", hi: "तनाव नियंत्रण, ध्यानपूर्वक सुनने की कला और स्थायी संबंधों पर संवादात्मक वर्कशॉप।", gu: "તણાવ નિયંત્રણ, સક્રિય સાંભળવાની કળા અને મજબૂત સંબંધો પર ઇન્ટરેક્ટિવ વર્કશોપ." })}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="asymmetric" fillColor="#F8F4EE" className="-mt-1 z-10 relative" />

      {/* ── SECTION 10: TRUST & CREDENTIALS STRIP ── */}
      <section className="bg-[#F8F4EE] py-14 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-[#0B3C2D]/10">
              <ShieldCheck className="w-6 h-6 text-[#8CA899]" />
              <div className="text-left">
                <span className="text-xs font-bold text-[#0B3C2D] block">
                  {t(translations.home?.trustStrip.confidentialTitle || { en: "100% Confidential Care", hi: "१००% पूर्णतः गोपनीय सेवा", gu: "૧૦૦% સંપૂર્ણ ગોપનીય સેવા" })}
                </span>
                <span className="text-[11px] text-ink-muted">
                  {t(translations.home?.trustStrip.confidentialSub || { en: "Strict privacy standards enforced", hi: "कड़े गोपनीयता मानकों का पालन", gu: "કડક પ્રાઈવસી નિયમોનું પાલન" })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-[#0B3C2D]/10">
              <Globe className="w-6 h-6 text-[#8CA899]" />
              <div className="text-left">
                <span className="text-xs font-bold text-[#0B3C2D] block">
                  {t(translations.home?.trustStrip.languagesTitle || { en: "3 Languages Spoken", hi: "३ भाषाओं में परामर्श", gu: "૩ ભાષાઓમાં કાઉન્સેલિંગ" })}
                </span>
                <span className="text-[11px] text-ink-muted">
                  {t(translations.home?.trustStrip.languagesSub || { en: "English, Hindi, & Gujarati", hi: "अंग्रेजी, हिंदी और गुजराती", gu: "અંગ્રેજી, હિન્દી અને ગુજરાતી" })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-[#0B3C2D]/10">
              <Award className="w-6 h-6 text-[#D98A2B]" />
              <div className="text-left">
                <span className="text-xs font-bold text-[#0B3C2D] block">
                  {t(translations.home?.trustStrip.experienceTitle || { en: "6+ Years Credibility", hi: "६+ वर्षों का अनुभव", gu: "૬+ વર્ષનો સક્રિય અનુભવ" })}
                </span>
                <span className="text-[11px] text-ink-muted">
                  {t(translations.home?.trustStrip.experienceSub || { en: "Surat Practice & Online Nationwide", hi: "सूरत क्लीनिक एवं पूरे भारत में ऑनलाइन", gu: "સુરત ક્લિનિક અને દેશભરમાં ઓનલાઇન" })}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <WaveDivider type="wave" fillColor="#0B3C2D" className="-mt-1 z-10 relative" />

      {/* ── SECTION 11: FINAL CTA BAND ── */}
      <section className="bg-[#0B3C2D] text-white py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <LeafMotif className="w-10 h-10 text-[#D98A2B] mx-auto" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold leading-tight">
            {t(translations.home?.finalCTA.heading || { en: "Get the support you deserve today.", hi: "आज ही मानसिक शांति और सुकून की ओर कदम बढ़ाएं।", gu: "આજે જ માનસિક શાંતિ અને સહયોગ તરફ ડગલું માંડો." })}
          </h2>
          <p className="text-base sm:text-lg text-[#8CA899] max-w-2xl mx-auto">
            {t(translations.home?.finalCTA.subheading || { en: "Take the first step toward family calm, relationship repair, or personal stress relief with direct 1-on-1 counseling.", hi: "व्यक्तिगत 1-ऑन-1 परामर्श के साथ पारिवारिक शांति, दांपत्य सुधार और तनाव मुक्ति की शुरुआत करें।", gu: "વ્યક્તિગત 1-ઓન-1 કાઉન્સેલિંગ સાથે પારિવારિક સુમેળ, સંબંધ સુધારણા અને તણાવ મુક્તિની શરૂઆત કરો." })}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact#booking"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-base shadow-xl transition-all"
            >
              <PhoneCall className="w-5 h-5 mr-2" />
              {t(translations.home?.finalCTA.bookBtn || { en: "Book a Confidential Session", hi: "गोपनीय सत्र बुक करें", gu: "ગોપનીય સત્ર બુક કરો" })}
            </Link>

            <a
              href="https://wa.me/919925060609?text=Hi%20Nikunj,%20I'd%20like%20to%20inquire%20about%20a%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full border border-[#8CA899]/40 text-white hover:bg-white/10 font-semibold text-base transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#25D366] mr-2 shrink-0"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L.055 23.515l5.849-1.503A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.945 9.945 0 01-5.078-1.39l-.364-.216-3.465.89.916-3.376-.237-.377A9.947 9.947 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {t(translations.home?.finalCTA.whatsappBtn || { en: "Chat on WhatsApp", hi: "व्हाट्सएप पर संपर्क करें", gu: "વોટ્સએપ પર વાત કરો" })}
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Quiz Modal Component */}
      <StressQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* Interactive Direct Calendar Booking Modal */}
      <DirectBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={bookingService}
      />
    </div>
  );
}
