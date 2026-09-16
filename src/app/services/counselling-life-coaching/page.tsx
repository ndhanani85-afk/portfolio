"use client";

import React from "react";
import Link from "next/link";
import { Brain, CheckCircle2, ArrowRight, Calendar, HelpCircle } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function CounsellingLifeCoachingPage() {
  const { t } = useLanguage();
  const ds = translations.detailedServices?.counsellingLifeCoaching;

  const coveredTopics = ds?.coveredTopics || [
    { en: "Managing executive burnout, decision fatigue, and chronic workplace stress", hi: "", gu: "" },
    { en: "Developing emotional regulation strategies for anxiety and mood swings", hi: "", gu: "" },
    { en: "Setting healthy emotional boundaries with family, colleagues, and friends", hi: "", gu: "" },
    { en: "Navigating major life transitions (career change, marriage, relocation, loss)", hi: "", gu: "" },
    { en: "Building authentic self-confidence, purpose, and work-life balance", hi: "", gu: "" },
  ];

  const arcSteps = [
    {
      step: "Session 1",
      title: { en: "Personal Discovery & Stress Map", hi: "व्यक्तिगत मूल्यांकन एवं तनाव मैपिंग", gu: "વ્યક્તિગત મૂલ્યાંકન અને તણાવ ઓળખ" },
      desc: { en: "Understanding your current emotional landscape, triggers, and primary life goals.", hi: "आपकी वर्तमान मानसिक स्थिति, तनाव के कारणों और प्राथमिक लक्ष्यों को गहराई से समझना।", gu: "તમારી વર્તમાન માનસિક સ્થિતિ, તણાવના મૂળ કારણો અને મુખ્ય લક્ષ્યોને ઊંડાણપૂર્વક સમજવા." },
    },
    {
      step: "Session 2",
      title: { en: "Coping Frameworks & Regulation", hi: "तनाव नियंत्रण एवं भावनात्मक संतुलन", gu: "તણાવ નિયંત્રણ અને ભાવનાત્મક સમતુલા" },
      desc: { en: "Equipping you with practical tools to manage anxiety, overthinking, and fatigue.", hi: "चिंता, अत्यधिक सोचने की आदत और मानसिक थकावट से निपटने के व्यावहारिक उपाय सीखना।", gu: "ચિંતા, વધુ પડતા વિચારો અને માનસિક થાકમાંથી મુક્ત થવાના વ્યવહારુ ઉપાયો શીખવા." },
    },
    {
      step: "Session 3",
      title: { en: "Boundaries & Life Alignment", hi: "व्यक्तिगत सीमाएं एवं जीवन संतुलन", gu: "અંગત સીમાઓ અને જીવન સમતુલા" },
      desc: { en: "Establishing healthy personal boundaries and aligning daily choices with core values.", hi: "काम और परिवार के बीच स्वस्थ सीमाएं तय करना और अपने जीवन के प्राथमिक लक्ष्यों पर ध्यान देना।", gu: "કામ અને પરિવાર વચ્ચે સ્વસ્થ સીમાઓ નક્કી કરવી અને જીવનના સાચા ધ્યેયો પર ધ્યાન આપવું." },
    },
    {
      step: "Session 4",
      title: { en: "Sustained Resilience & Growth", hi: "स्थायी मानसिक शांति एवं आत्मविकास", gu: "કાયમી માનસિક શાંતિ અને આત્મવિકાસ" },
      desc: { en: "Embedding self-sustaining mental habits for long-term clarity and emotional calm.", hi: "दीर्घकालिक स्पष्टता और मानसिक सुकून के लिए आत्मनिर्भर आदतों को दिनचर्या में शामिल करना।", gu: "દીર્ઘકાલીન સ્પષ્ટતા અને માનસિક સુખાકારી માટે આત્મનિર્ભર આદતોને જીવનમાં વણી લેવી." },
    },
  ];

  const burnoutPillars = [
    {
      name: { en: "Somatic De-stress", hi: "मानसिक एवं शारीरिक विश्राम", gu: "માનસિક અને શારીરિક આરામ" },
      desc: { en: "Nervous system regulation tools to lower physical cortisol and racing thoughts.", hi: "शारीरिक तनाव और अत्यधिक उत्तेजित विचारों को तुरंत शांत करने की वैज्ञानिक तकनीकें।", gu: "શારીરિક તણાવ અને અનિયંત્રિત વિચારોને તુરંત શાંત કરવાની વૈજ્ઞાનિક પદ્ધતિઓ." },
    },
    {
      name: { en: "Decision Pruning", hi: "निर्णय के तनाव को कम करना", gu: "નિર્ણયોના ભારણમાં ઘટાડો" },
      desc: { en: "Frameworks for delegating micro-decisions to combat executive fatigue.", hi: "रोजमर्रा के अनावश्यक फैसलों के बोझ को कम करके मानसिक ऊर्जा बचाने की कार्ययोजना।", gu: "રોજબરોજના બિનજરૂરી નિર્ણયોનો બોજ ઘટાડી માનસિક ઊર્જા બચાવવાની યોજના." },
    },
    {
      name: { en: "Boundary Architecture", hi: "स्पष्ट एवं स्वस्थ सीमाएं", gu: "સ્પષ્ટ અને સ્વસ્થ સીમાઓ" },
      desc: { en: "Designing non-negotiable personal time blocks without guilt.", hi: "बिना किसी अपराधबोध के अपने और परिवार के लिए शांतिपूर्ण समय सुरक्षित रखना।", gu: "કોઈપણ અપરાધભાવ વિના પોતાના અને પરિવાર માટે શાંતિપૂર્ણ સમય અનામત રાખવો." },
    },
    {
      name: { en: "Identity Alignment", hi: "जीवन के मूल उद्देश्यों से जुड़ाव", gu: "જીવનના મૂળ ઉદ્દેશ્યો સાથે જોડાણ" },
      desc: { en: "Reconnecting your daily effort with core personal values and purpose.", hi: "अपनी दैनिक भागदौड़ को जीवन के वास्तविक मूल्यों और आत्मसंतुष्टि से जोड़ना।", gu: "પોતાની દિનચર્યાને જીવનના સાચા મૂલ્યો અને આંતરિક સંતોષ સાથે સાંકળવી." },
    },
  ];

  const individualFaqs = [
    {
      q: { en: "Is 1-on-1 counseling appropriate for work stress or only severe clinical issues?", hi: "क्या व्यक्तिगत परामर्श काम के तनाव के लिए भी उपयुक्त है या केवल गंभीर समस्याओं के लिए?", gu: "શું વ્યક્તિગત કાઉન્સેલિંગ કામના તણાવ માટે યોગ્ય છે કે માત્ર ગંભીર સમસ્યાઓ માટે?" },
      a: { en: "Individual counseling is designed for everyday stress, executive decision fatigue, life transitions, and emotional regulation, as well as deeper psychological clarity.", hi: "व्यक्तिगत परामर्श रोजमर्रा के तनाव, कार्यस्थल की थकावट, जीवन के बड़े फैसलों और मानसिक शांति के लिए अत्यंत प्रभावी और उपयोगी है।", gu: "વ્યક્તિગત કાઉન્સેલિંગ રોજિંદા તણાવ, ઓફિસના થાક, જીવનના મોટા નિર્ણયો અને માનસિક શાંતિ માટે અત્યંત અસરકારક અને ઉપયોગી છે." },
    },
    {
      q: { en: "How long are individual coaching sessions?", hi: "व्यक्तिगत काउंसलिंग सत्र की अवधि कितनी होती है?", gu: "વ્યક્તિગત કાઉન્સેલિંગ સત્રનો સમયગાળો કેટલો હોય છે?" },
      a: { en: "Each individual session runs for 60 minutes, conducted 1-on-1 either in Surat or via secure online video.", hi: "प्रत्येक व्यक्तिगत सत्र ६० मिनट का होता है, जो सूरत में क्लीनिक में या सुरक्षित ऑनलाइन वीडियो कॉल पर आयोजित किया जाता है।", gu: "દરેક વ્યક્તિગત સત્ર ૬૦ મિનિટનું હોય છે, જે સુરતમાં રૂબરૂ અથવા સુરક્ષિત ઓનલાઇન વિડિયો કૉલ દ્વારા લેવામાં આવે છે." },
    },
    {
      q: { en: "Can sessions be scheduled around busy work hours?", hi: "क्या व्यस्त कार्य समय के अनुसार सत्र का समय तय किया जा सकता है?", gu: "શું વ્યસ્ત સમયપત્રક મુજબ સત્રનો સમય નક્કી થઈ શકે છે?" },
      a: { en: "Yes, flexible morning, evening, and weekend time slots are available to accommodate professional schedules.", hi: "हाँ, आपके व्यस्त कामकाजी समय को ध्यान में रखते हुए सुबह, शाम और सप्ताहांत के लचीले स्लॉट उपलब्ध हैं।", gu: "હા, તમારા વ્યસ્ત સમયને ધ્યાનમાં રાખીને સવાર, સાંજ અને સપ્તાહાંતના અનુકૂળ સ્લોટ ઉપલબ્ધ છે." },
    },
  ];

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8CA899]/20 text-[#0B3C2D] text-xs font-bold">
              <Brain className="w-4 h-4 text-[#0B3C2D]" />
              <span>{t(ds?.hero.badge || { en: "Individual Wellness Program", hi: "व्यक्तिगत परामर्श कार्यक्रम", gu: "વ્યક્તિગત કાઉન્સેલિંગ કાર્યક્રમ" })}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              {t(ds?.hero.title || { en: "Break Chronic Overwhelm & Reclaim Personal Clarity", hi: "मानसिक दबाव से मुक्ति पाएं और जीवन में स्पष्टता प्राप्त करें", gu: "સતત માનસિક બોજમાંથી મુક્ત થાઓ અને જીવનમાં સ્પષ્ટતા મેળવો" })}
            </h1>

            <p className="text-base text-ink-muted leading-relaxed max-w-3xl">
              {t(ds?.hero.desc || { en: "High expectations, workplace pressure, and family obligations can leave even high achievers feeling drained and anxious. 1-on-1 counseling gives you a confidential, structured space to regain control and peace of mind.", hi: "", gu: "" })}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact?service=Counselling%20%26%20Life%20Coaching#booking"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t(ds?.hero.bookBtn || { en: "Book 1-on-1 Session", hi: "व्यक्तिगत सत्र बुक करें", gu: "વ્યક્તિગત સેશન બુક કરો" })}
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Who It's For & What's Covered */}
        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 space-y-4">
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "Who This Is For", hi: "यह सत्र किसके लिए है", gu: "આ સત્ર કોના માટે છે" })}
              </h2>
              <ul className="space-y-3 text-xs text-deep-ink">
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                  <span>{t({ en: "Executives, entrepreneurs, and professionals experiencing high stress or burnout", hi: "लीडर्स, प्रोफेशनल्स और उद्यमी जो अत्यधिक तनाव या बर्नआउट से जूझ रहे हैं", gu: "લીડર્સ, પ્રોફેશનલ્સ અને ઉદ્યોગસાહસિકો જે કામના ભારે તણાવ કે બર્નઆઉટનો સામનો કરી રહ્યા છે" })}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                  <span>{t({ en: "Individuals struggling with chronic anxiety, overthinking, or emotional fatigue", hi: "व्यक्ति जो लगातार चिंता, ओवरथिंकिंग और भावनात्मक थकावट महसूस करते हैं", gu: "વ્યક્તિઓ જે સતત ચિંતા, વધુ પડતા વિચારો અને માનસિક થાક અનુભવે છે" })}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#8CA899] shrink-0 mt-0.5" />
                  <span>{t({ en: "Anyone seeking clear direction during major career or personal life transitions", hi: "करियर या व्यक्तिगत जीवन के बड़े बदलावों में सही मार्गदर्शन चाहने वाले", gu: "કરિયર કે અંગત જીવનના મોટા નિર્ણયોમાં સ્પષ્ટ માર્ગદર્શન મેળવવા માંગતા લોકો" })}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 space-y-4">
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                {t(ds?.coveredTopicsHeading || { en: "Individual Care Focus Areas", hi: "व्यक्तिगत मार्गदर्शन के मुख्य क्षेत्र", gu: "વ્યક્તિગત માર્ગદર્શનના મુખ્ય ક્ષેત્રો" })}
              </h2>
              <ul className="space-y-3 text-xs text-deep-ink">
                {coveredTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>{t(topic)}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </ScrollReveal>

        {/* Burnout Recovery Pillars */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                {t({ en: "Core Framework", hi: "मार्गदर्शन के ४ आधारस्तंभ", gu: "માર્ગદર્શનના ૪ આધારસ્તંભ" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "Pillars of Sustainable Mental Resilience", hi: "स्थायी मानसिक शांति और मजबूती के उपाय", gu: "કાયમી માનસિક શાંતિ અને મનોબળના ઉપાયો" })}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {burnoutPillars.map((p, idx) => (
                <div key={idx} className="p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-1">
                  <h4 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{t(p.name)}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{t(p.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Typical Arc */}
        <ScrollReveal direction="up" delay={250}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                {t({ en: "Structured Roadmap", hi: "४ चरणों की यात्रा", gu: "૪ તબક્કાની સફર" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "What Your Individual Counseling Arc Looks Like", hi: "व्यक्तिगत मार्गदर्शन की व्यवस्थित रूपरेखा", gu: "વ્યક્તિગત કાઉન્સેલિંગની વ્યવસ્થિત રૂપરેખા" })}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {arcSteps.map((arc, idx) => (
                <div key={idx} className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <span className="text-xs font-bold text-[#D98A2B] block">{arc.step}</span>
                  <h3 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{t(arc.title)}</h3>
                  <p className="text-xs text-ink-muted">{t(arc.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Individual FAQs */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#D98A2B]" />
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "Individual Counseling FAQs", hi: "व्यक्तिगत परामर्श से जुड़े प्रश्न", gu: "વ્યક્તિગત કાઉન્સેલિંગ સંબંધિત પ્રશ્નો" })}
              </h2>
            </div>
            <div className="space-y-4">
              {individualFaqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-1">
                  <h4 className="text-xs font-bold text-[#0B3C2D]">Q: {t(faq.q)}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">A: {t(faq.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
            {t({ en: "Reclaim your mental calm and daily clarity", hi: "अपनी मानसिक शांति और स्पष्टता पुनः प्राप्त करें", gu: "તમારી માનસિક શાંતિ અને સ્પષ્ટતા પુનઃ પ્રાપ્ત કરો" })}
          </h3>
          <Link
            href="/contact?service=Counselling%20%26%20Life%20Coaching#booking"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-lg transition-all"
          >
            {t({ en: "Book Your 1-on-1 Session", hi: "अपना व्यक्तिगत सत्र बुक करें", gu: "તમારું વ્યક્તિગત સત્ર બુક કરો" })}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
