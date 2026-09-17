"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { t } = useLanguage();
  const ap = translations.aboutPage;

  const credentials = ap?.credentialsSection.list || [
    { en: "Certified Family & Couples Counselor", hi: "प्रमाणित पारिवारिक एवं दांपत्य परामर्शदाता", gu: "પ્રમાણિત ફેમિલી અને કપલ્સ કાઉન્સેલર" },
    { en: "6+ Years Active Clinical & Life Coaching Practice", hi: "६+ वर्षों का सक्रिय परामर्श एवं लाइफ कोचिंग अनुभव", gu: "૬+ વર્ષનો સક્રિય કાઉન્સેલિંગ અને લાઈફ કોચિંગ અનુભવ" },
    { en: "Specialist in Executive Stress & Burnout Management", hi: "कार्यस्थल तनाव एवं बर्नआउट प्रबंधन विशेषज्ञ", gu: "વર્કપ્લેસ તણાવ અને બર્નઆઉટ નિવારણ નિષ્ણાત" },
    { en: "Trauma-Informed & Evidence-Based Frameworks", hi: "संवेदनशील एवं वैज्ञानिक परामर्श पद्धतियां", gu: "સંવેદનશીલ અને પુરાવા-આધારિત વૈજ્ઞાનિક પદ્ધતિઓ" },
    { en: "Member of Professional Counseling Networks in India", hi: "भारत के प्रतिष्ठित व्यावसायिक परामर्श नेटवर्क के सदस्य", gu: "ભારતના અગ્રણી વ્યાવસાયિક કાઉન્સેલિંગ નેટવર્કના સભ્ય" },
    { en: "Languages: English, Hindi, Gujarati", hi: "परामर्श की भाषाएँ: अंग्रेजी, हिंदी, गुजराती", gu: "કાઉન્સેલિંગ ભાષાઓ: અંગ્રેજી, હિન્દી, ગુજરાતી" },
  ];

  const coreValues = [
    {
      title: ap?.coreValues.val1.title || { en: "Human-Centric Warmth", hi: "मानवीय आत्मीयता एवं स्नेह", gu: "માનવીય આત્મીયતા અને સ્નેહ" },
      desc: ap?.coreValues.val1.desc || { en: "You sit across from a real, empathetic human practitioner — not an algorithm or app interface.", hi: "", gu: "" },
    },
    {
      title: ap?.coreValues.val2.title || { en: "Evidence-Based Tools", hi: "वैज्ञानिक एवं व्यावहारिक टूल्स", gu: "વૈજ્ઞાનિક અને વ્યવહારુ પદ્ધતિઓ" },
      desc: ap?.coreValues.val2.desc || { en: "Combining cognitive-behavioral principles, somatic regulation, and practical active-listening scripts.", hi: "", gu: "" },
    },
    {
      title: ap?.coreValues.val3.title || { en: "Non-Judgmental Safety", hi: "पक्षपात-मुक्त सुरक्षित माहौल", gu: "નિષ્પક્ષ અને સુરક્ષિત વાતાવરણ" },
      desc: ap?.coreValues.val3.desc || { en: "A safe container where you can speak openly about family conflict, guilt, or personal struggles.", hi: "", gu: "" },
    },
    {
      title: ap?.coreValues.val4.title || { en: "Long-Term Autonomy", hi: "दीर्घकालिक आत्मनिर्भरता", gu: "દીર્ઘકાલીન આત્મનિર્ભરતા" },
      desc: ap?.coreValues.val4.desc || { en: "Equipping you with self-sustaining skills so you don't stay dependent on long-term therapy.", hi: "", gu: "" },
    },
  ];

  const milestones = ap?.milestonesSection.items || [
    {
      year: "2018",
      title: { en: "Practice Foundations", hi: "परामर्श सेवा की शुरुआत", gu: "કાઉન્સેલિંગ સેવાની શરૂઆત" },
      desc: { en: "Began dedicated 1-on-1 counseling practice focusing on youth and executive stress management.", hi: "", gu: "" },
    },
    {
      year: "2020",
      title: { en: "Nationwide Online Counseling", hi: "देशव्यापी ऑनलाइन परामर्श विस्तार", gu: "સમગ્ર દેશમાં ઓનલાઈન કાઉન્સેલિંગ" },
      desc: { en: "Expanded practice online to support over 80+ families and leaders across 25+ Indian cities.", hi: "", gu: "" },
    },
    {
      year: "2022",
      title: { en: "Corporate & Keynote Expansion", hi: "कॉरपोरेट व्याख्यान एवं वर्कशॉप", gu: "કોર્પોરેટ વક્તવ્યો અને સેમિનાર" },
      desc: { en: "Launched specialized keynote programs for organizations and schools on mental resilience.", hi: "", gu: "" },
    },
    {
      year: "Present",
      title: { en: "Evidence-Based Family Practice", hi: "समर्पित एवं निरंतर मार्गदर्शन", gu: "સમર્પિત અને સાતત્યપૂર્ણ માર્ગદર્શન" },
      desc: { en: "Continuing active 1-on-1 and couples counseling with a 4.9/5 client satisfaction rating.", hi: "", gu: "" },
    },
  ];

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <div className="relative w-44 h-44 mx-auto mb-4">
                <Image
                  src="/03.png"
                  alt="Nikunj Dhanani Counselor"
                  fill
                  sizes="176px"
                  className="rounded-full object-cover object-[center_20%] border-4 border-[#F8F4EE] shadow-xl hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <h1 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                Nikunj Dhanani
              </h1>
              <p className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider mt-1">
                {t(ap?.hero.role || { en: "Family Counselor & Speaker", hi: "पारिवारिक परामर्शदाता एवं वक्ता", gu: "ફેમિલી કાઉન્સેલર અને વક્તા" })}
              </p>
              <div className="mt-3 flex justify-center gap-2 text-[11px] text-[#0B3C2D]">
                <span className="px-2.5 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">English</span>
                <span className="px-2.5 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">Hindi</span>
                <span className="px-2.5 py-1 bg-[#F8F4EE] rounded-full border border-[#0B3C2D]/10">Gujarati</span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
                {t(ap?.hero.badge || { en: "About the Practitioner", hi: "परामर्शदाता परिचय", gu: "કાઉન્સેલર પરિચય" })}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#0B3C2D] leading-snug">
                {t(ap?.hero.title || { en: "Grounding families in calm through evidence-based, human care.", hi: "वैज्ञानिक पद्धतियों और मानवीय संवेदना के साथ परिवारों को मानसिक शांति की ओर ले जाना।", gu: "વૈજ્ઞાનિક પદ્ધતિઓ અને માનવીય સહાનુભૂતિ દ્વારા પરિવારોને માનસિક શાંતિ તરફ દોરવા." })}
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                {t(ap?.hero.bio1 || { en: "I am an independent family counselor, couples specialist, and public speaker. Unlike multi-therapist clinic platforms, I work with every client directly, establishing deep continuity, specificity, and trust.", hi: "", gu: "" })}
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">
                {t(ap?.hero.bio2 || { en: "My practice is rooted in the belief that emotional conflict is not a sign of failure — it is a signal that existing coping structures need updating.", hi: "", gu: "" })}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Philosophy Pull-Quote */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-[#0B3C2D] text-white rounded-3xl p-10 md:p-14 text-center space-y-4 shadow-xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/95 border border-white/20 shadow-xl flex items-center justify-center p-2 mx-auto">
              <Image
                src="/logo.png"
                alt="Nikunj Dhanani Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif-display italic leading-relaxed text-[#8CA899] max-w-3xl mx-auto">
              "{t(ap?.ethos.quote || { en: "You don't need to be fixed. You need to be heard, understood, and equipped with clear, practical tools for your daily life.", hi: "", gu: "" })}"
            </blockquote>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B] block pt-2">
              {t(ap?.ethos.authorBadge || { en: "— My Counseling Ethos", hi: "— मेरा परामर्श दृष्टिकोण", gu: "— મારો કાઉન્સેલિંગ અભિગમ" })}
            </span>
          </div>
        </ScrollReveal>

        {/* 4 Core Values */}
        <ScrollReveal direction="up" delay={250}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                {t(ap?.coreValues.badge || { en: "Practice Ethos", hi: "हमारे मार्गदर्शक मूल्य", gu: "અમારા માર્ગદર્શક મૂલ્યો" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t(ap?.coreValues.heading || { en: "Core Counseling Values", hi: "परामर्श के आधारभूत सिद्धांत", gu: "કાઉન્સેલિંગના મૂળભૂત સિદ્ધાંતો" })}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {coreValues.map((v, idx) => (
                <div key={idx} className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <h4 className="text-sm font-serif-display font-bold text-[#0B3C2D]">
                    {t(v.title)}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {t(v.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Credentials Grid */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                {t(ap?.credentialsSection.badge || { en: "Qualifications & Standards", hi: "योग्यताएं एवं व्यावसायिक मानक", gu: "લાયકાતો અને વ્યાવસાયિક ધોરણો" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t(ap?.credentialsSection.heading || { en: "Credentials & Practice Principles", hi: "योग्यता एवं परामर्श के सिद्धांत", gu: "લાયકાત અને કાઉન્સેલિંગના સિદ્ધાંતો" })}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credentials.map((cred, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10">
                  <CheckCircle2 className="w-5 h-5 text-[#0B3C2D] shrink-0" />
                  <span className="text-xs font-bold text-[#0B3C2D]">{t(cred)}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal direction="up" delay={350}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                {t(ap?.milestonesSection.badge || { en: "Practice Journey", hi: "अनुभव की यात्रा", gu: "અનુભવની સફર" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t(ap?.milestonesSection.heading || { en: "Milestones & Practice Timeline", hi: "प्रमुख मील के पत्थर एवं अनुभव यात्रा", gu: "મહત્વપૂર્ણ તબક્કાઓ અને અનુભવ યાત્રા" })}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {milestones.map((item, idx) => (
                <div key={idx} className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <span className="text-lg font-serif-display font-bold text-[#D98A2B] block">{item.year}</span>
                  <h3 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{t(item.title)}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">{t(item.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
            {t(ap?.cta.heading || { en: "Work directly with me", hi: "मुझसे सीधे संपर्क करें और जुड़ें", gu: "મારી સાથે સીધો સંપર્ક કરો અને જોડાવો" })}
          </h3>
          <Link
            href="/contact#booking"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-lg transition-all"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t(ap?.cta.button || { en: "Book a Confidential Session", hi: "गोपनीय सत्र बुक करें", gu: "ગોપનીય સત્ર બુક કરો" })}
          </Link>
        </div>

      </div>
    </div>
  );
}
