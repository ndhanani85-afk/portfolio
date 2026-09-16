"use client";

import React from "react";
import Link from "next/link";
import { Heart, CheckCircle2, ArrowRight, Star, Calendar, HelpCircle } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function RelationshipRepairPage() {
  const { t } = useLanguage();
  const ds = translations.detailedServices?.relationshipRepair;

  const coveredTopics = ds?.coveredTopics || [
    { en: "De-escalating defensive reactions during argument cycles", hi: "", gu: "" },
    { en: "Restoring emotional intimacy and physical warmth after marital strain", hi: "", gu: "" },
    { en: "Communicating personal emotional needs clearly without blame or guilt", hi: "", gu: "" },
    { en: "Kids after marriage & relationship balance", hi: "शादी के बाद बच्चे और दांपत्य संतुलन", gu: "લગ્ન પછી બાળકો અને સંબંધોની સમતુલા" },
    { en: "Rebuilding trust, honesty, and mutual respect after deep misunderstandings", hi: "", gu: "" },
  ];

  const arcSteps = [
    {
      step: "Session 1",
      title: { en: "Joint Assessment & Pattern Mapping", hi: "संयुक्त मूल्यांकन एवं पैटर्न मैपिंग", gu: "સંયુક્ત મૂલ્યાંકન અને પદ્ધતિ ઓળખ" },
      desc: { en: "Understanding recurring conflict loops and communication barriers without taking sides.", hi: "बिना किसी का पक्ष लिए बार-बार होने वाले विवादों और संवाद की बाधाओं को समझना।", gu: "કોઈનો પક્ષ લીધા વગર વારંવાર થતા વિવાદો અને સંવાદના અંતરાયોને સમજવા." },
    },
    {
      step: "Session 2",
      title: { en: "De-escalation & Trigger Awareness", hi: "विवाद शांति एवं ट्रिगर जागरूकता", gu: "વિવાદ નિવારણ અને ટ્રિગર જાગૃતિ" },
      desc: { en: "Learning how to pause defensive responses and communicate real emotional needs.", hi: "रक्षात्मक प्रतिक्रियाओं को रोकना और वास्तविक भावनात्मक आवश्यकताओं को स्पष्ट व्यक्त करना।", gu: "સામસામે બોલવાને બદલે શાંતિ જાળવવી અને સાચી લાગણીઓ વ્યક્ત કરવી શીખવું." },
    },
    {
      step: "Session 3",
      title: { en: "Intimacy & Trust Calibration", hi: "स्नेહ एवं विश्वास की पुनर्स्थापना", gu: "સ્નેહ અને વિશ્વાસની પુનઃસ્થાપના" },
      desc: { en: "Co-creating practical habits that rebuild warmth, affection, and shared purpose.", hi: "ऐसी व्यावहारिक आदतें विकसित करना जो आपसी स्नेह, लगाव और साझा लक्ष्यों को मजबूत करें।", gu: "એવી વ્યવહારુ આદતો કેળવવી જે પરસ્પર સ્નેહ, હૂંફ અને એકતાને મજબૂત બનાવે." },
    },
    {
      step: "Session 4",
      title: { en: "Long-Term Partnership Plan", hi: "दीर्घकालिक दांपत्य कार्ययोजना", gu: "દીર્ઘકાલીન દાંપત્ય કાર્યયોજના" },
      desc: { en: "Establishing tools for self-correcting arguments before they become toxic.", hi: "विवादों को कड़वाहट में बदलने से पहले स्वयं सुधारने के लिए स्थायी टूल्स और तरीके तय करना।", gu: "ઝઘડા વધુ વણસે તે પહેલાં જાતે જ સુધારી લેવા માટેની કાયમી પદ્ધતિઓ નક્કી કરવી." },
    },
  ];

  const deescalationSteps = [
    {
      num: "01",
      name: { en: "Pattern Recognition", hi: "पैटर्न की पहचान", gu: "પદ્ધતિની ઓળખ" },
      detail: { en: "Identifying the precise moment an argument shifts from productive to defensive.", hi: "उस सटीक क्षण की पहचान करना जब बातचीत विवाद में बदल जाती है।", gu: "એ ચોક્કસ ક્ષણને ઓળખવી જ્યારે સામાન્ય વાત વિવાદમાં ફેરવાય છે." },
    },
    {
      num: "02",
      name: { en: "The Safe Pause", hi: "सुरक्षित ठहराव (पॉज़)", gu: "સુરક્ષિત વિરામ (પોઝ)" },
      detail: { en: "Agreeing on a neutral phrase to pause discussions for 15 minutes before escalation.", hi: "विवाद बढ़ने से पहले १५ मिनट का ब्रेक लेने के लिए एक तटस्थ संकेत पर सहमत होना।", gu: "બોલાચાલી વધે તે પહેલાં ૧૫ મિનિટનો વિરામ લેવા માટે એક સંકેત નક્કી કરવો." },
    },
    {
      num: "03",
      name: { en: "Need Translation", hi: "आवश्यकता की सही अभिव्यक्ति", gu: "લાગણીઓની સાચી અભિવ્યક્તિ" },
      detail: { en: "Translating accusations ('You don't care') into emotional requests ('I miss your support').", hi: "आरोपों को भावनात्मक अनुरोध में बदलना (उदा. 'आपको परवाह नहीं' की जगह 'मुझे आपके सहयोग की आवश्यकता है')।", gu: "આક્ષેપોને લાગણીશીલ વિનંતીમાં ફેરવવા (દા.ત. 'તમને કદર નથી' ને બદલે 'મને તમારા સાથની જરૂર છે')." },
    },
    {
      num: "04",
      name: { en: "Re-engagement Agreement", hi: "पुनः संवाद की सहमति", gu: "ફરી સંવાદની સહમતી" },
      detail: { en: "Returning to discussions with structured active-listening guidelines.", hi: "सहानुभूति और ध्यानपूर्वक सुनने के नियमों के साथ दोबारा शांत बातचीत शुरू करना।", gu: "સહાનુભૂતિ અને ધ્યાનપૂર્વક સાંભળવાના નિયમો સાથે ફરીથી શાંતિપૂર્ણ વાતચીત શરૂ કરવી." },
    },
  ];

  const couplesFaqs = [
    {
      q: { en: "What if my spouse is reluctant to join counseling?", hi: "यदि मेरा जीवनसाथी परामर्श में शामिल होने में झिझक रहा हो तो क्या करें?", gu: "જો મારા જીવનસાથી કાઉન્સેલિંગમાં જોડાવા તૈયાર ન હોય તો શું કરવું?" },
      a: { en: "I offer initial 1-on-1 prep sessions for one partner to learn communication tools that often positively shift the relationship dynamic.", hi: "मैं शुरुआत में एक पार्टनर के साथ व्यक्तिगत सत्र आयोजित करता हूँ, जिससे संवाद के ऐसे तरीके सीखे जा सकते हैं जो रिश्ते को सकारात्मक दिशा में मोड़ देते हैं।", gu: "હું શરૂઆતમાં એક પાર્ટનર સાથે વ્યક્તિગત સત્ર લઉં છું, જેથી સંવાદની એવી પદ્ધતિ શીખી શકાય જે સંબંધને આપમેળે સકારાત્મક વળાંક આપે છે." },
    },
    {
      q: { en: "Does the counselor take sides during arguments?", hi: "क्या काउंसलर बहस के दौरान किसी एक का पक्ष लेते हैं?", gu: "શું કાઉન્સેલર મતભેદ દરમિયાન કોઈ એકનો પક્ષ લે છે?" },
      a: { en: "Never. I remain completely neutral, focusing entirely on diagnosing and repairing the interaction pattern between partners.", hi: "बिल्कुल नहीं। मैं पूरी तरह निष्पक्ष रहता हूँ और मेरा पूरा ध्यान केवल दोनों के बीच के संवाद पैटर्न को समझने और सुधारने पर होता है।", gu: "ક્યારેય નહીં. હું સંપૂર્ણપણે તટસ્થ રહું છું અને મારું સમગ્ર ધ્યાન માત્ર બંને વચ્ચેના સંવાદને સુધારવા પર કેન્દ્રિત હોય છે." },
    },
    {
      q: { en: "Are sessions online or in-person for couples?", hi: "क्या जोड़ों के लिए सत्र ऑनलाइन उपलब्ध हैं या व्यक्तिगत?", gu: "શું દંપતીઓ માટે સત્રો ઓનલાઈન છે કે રૂબરૂ?" },
      a: { en: "Both options are available. Online sessions are conducted via secure private video links, allowing flexible scheduling for busy couples.", hi: "दोनों विकल्प उपलब्ध हैं। ऑनलाइन सत्र सुरक्षित निजी वीडियो लिंक के माध्यम से आयोजित होते हैं, जिससे व्यस्त जोड़ों के लिए समय निकालना आसान होता है।", gu: "બંને વિકલ્પો ઉપલબ્ધ છે. ઓનલાઈન સત્રો સુરક્ષિત પ્રાઈવેટ વિડિયો લિંક દ્વારા લેવાય છે, જેથી વ્યસ્ત દંપતીઓ માટે સમય અનુકૂળ રહે છે." },
    },
  ];

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] text-xs font-bold">
              <Heart className="w-4 h-4 fill-current" />
              <span>{t(ds?.hero.badge || { en: "Couples Relationship Program", hi: "दांपत्य संबंध सुधार कार्यक्रम", gu: "દાંપત્ય સંબંધ સુધારણા કાર્યક્રમ" })}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              {t(ds?.hero.title || { en: "Restore Intimacy, Heal Communication & Rebuild Trust", hi: "आपसी स्नेह लौटाएं, संवाद सुधारें और विश्वास पुनः स्थापित करें", gu: "પરસ્પર સ્નેહ પુનર્જીવિત કરો, સંવાદ સુધારો અને વિશ્વાસ પાછો મેળવો" })}
            </h1>

            <p className="text-base text-ink-muted leading-relaxed max-w-3xl">
              {t(ds?.hero.desc || { en: "A structured, non-judgmental counseling container for married and committed couples. We diagnose repetitive argument patterns, heal unresolved resentment, and co-create practical communication habits for everyday life.", hi: "", gu: "" })}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact?service=Relationship%20Repair#booking"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t(ds?.hero.bookBtn || { en: "Book Couples Session", hi: "दांपत्य सत्र बुक करें", gu: "દંપતી સેશન બુક કરો" })}
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
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>{t({ en: "Couples trapped in repeating arguments about household, finances, or family", hi: "जोड़े जो घर के कामों, पैसों या पारिवारिक मामलों पर बार-बार झगड़ते हैं", gu: "દંપતીઓ જે ઘરકામ, આર્થિક કે પારિવારિક બાબતો પર વારંવાર વિવાદમાં ફસાય છે" })}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>{t({ en: "Kids after marriage & relationship balance", hi: "शादी के बाद बच्चे और दांपत्य संतुलन", gu: "લગ્ન પછી બાળકો અને સંબંધોની સમતુલા" })}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>{t({ en: "Couples seeking to repair trust and rebuild open dialogue", hi: "जोड़े जो आपसी विश्वास बहाल करना और खुला संवाद स्थापित करना चाहते हैं", gu: "દંપતીઓ જે પરસ્પર વિશ્વાસ પાછો મેળવવા અને મુક્ત સંવાદ સાધવા માંગે છે" })}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 space-y-4">
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                {t(ds?.coveredTopicsHeading || { en: "Core Relationship Focus Areas", hi: "मुख्य परामर्श क्षेत्र", gu: "મુખ્ય કાઉન્સેલિંગ ક્ષેત્રો" })}
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

        {/* De-escalation Protocol */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                {t({ en: "Methodology", hi: "हमारी कार्यपद्धति", gu: "અમારી કાર્યપદ્ધતિ" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "Our De-escalation Protocol", hi: "मतभेद शांति एवं समाधान प्रोटोकॉल", gu: "વિવાદ નિવારણ અને સમાધાન પદ્ધતિ" })}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {deescalationSteps.map((step, idx) => (
                <div key={idx} className="p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-1">
                  <span className="text-xs font-bold text-[#D98A2B] block">{step.num}</span>
                  <h4 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{t(step.name)}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{t(step.detail)}</p>
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
                {t({ en: "Structured Roadmap", hi: "संरचित रूपरेखा", gu: "વ્યવસ્થિત રોડમેપ" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "What Your Relationship Repair Arc Looks Like", hi: "दांपत्य सुधार की ४ चरणों की यात्रा", gu: "દાંપત્ય સુધારણાની ૪ તબક્કાની સફર" })}
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

        {/* Couples FAQs */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#D98A2B]" />
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "Couples Session FAQs", hi: "दांपत्य सत्र से जुड़े सामान्य प्रश्न", gu: "દંપતી સત્ર સંબંધિત સામાન્ય પ્રશ્નો" })}
              </h2>
            </div>
            <div className="space-y-4">
              {couplesFaqs.map((faq, idx) => (
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
            {t({ en: "Ready to reconnect with your partner?", hi: "अपने जीवनसाथी के साथ नए स्नेह की शुरुआत करें", gu: "તમારા જીવનસાથી સાથે નવા સ્નેહની શરૂઆત કરો" })}
          </h3>
          <Link
            href="/contact?service=Relationship%20Repair#booking"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-lg transition-all"
          >
            {t({ en: "Book Your Relationship Session", hi: "अपना दांपत्य सत्र बुक करें", gu: "તમારું દંપતી સત્ર બુક કરો" })}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
