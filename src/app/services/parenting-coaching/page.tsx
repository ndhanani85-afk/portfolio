"use client";

import React from "react";
import Link from "next/link";
import { Users, CheckCircle2, ArrowRight, Calendar, HelpCircle } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ParentingCoachingPage() {
  const { t } = useLanguage();
  const ds = translations.detailedServices?.parentingCoaching;

  const coveredTopics = ds?.coveredTopics || [
    { en: "Managing extreme temper tantrums, stubbornness, and screen-time refusal", hi: "", gu: "" },
    { en: "Supporting teenagers through peer pressure, academic anxiety, and emotional isolation", hi: "", gu: "" },
    { en: "Aligning parenting styles between mother, father, and extended family", hi: "", gu: "" },
    { en: "Ending the repetitive yelling-and-guilt cycle in everyday household routines", hi: "", gu: "" },
  ];

  const arcSteps = [
    {
      step: "Session 1",
      title: { en: "Family Intake & Trigger Mapping", hi: "पारिवारिक मूल्यांकन एवं ट्रिगर मैपिंग", gu: "પારિવારિક મૂલ્યાંકન અને ટ્રિગર ઓળખ" },
      desc: { en: "Understanding child dynamics, parent stress patterns, and household triggers.", hi: "बच्चों के स्वभाव, माता-पिता के तनाव और घर के झगड़ों के मुख्य कारणों को समझना।", gu: "બાળકના સ્વભાવ, વાલીઓના તણાવ અને ઘરના વિખવાદના મૂળ કારણો સમજવા." },
    },
    {
      step: "Session 2",
      title: { en: "Behavioral Structure & Routine", hi: "सकारात्मक दिनचर्या एवं स्पष्ट नियम", gu: "સકારાત્મક દિનચર્યા અને સ્પષ્ટ નિયમો" },
      desc: { en: "Setting clear, calm household boundaries and consistent rewards/consequences.", hi: "घर में शांतिपूर्ण सीमाएं और निष्पक्ष नियम तय करना जिनका बच्चे खुशी से पालन करें।", gu: "ઘરમાં શાંતિપૂર્ણ નિયમો અને શિસ્ત ઘડવી જેનું બાળકો હોંશે-હોંશે પાલન કરે." },
    },
    {
      step: "Session 3",
      title: { en: "Teen & Child Communication", hi: "बच्चों एवं टीनएजर्स से आत्મીય संवाद", gu: "બાળકો અને ટીનેજર્સ સાથે સ્નેહપૂર્ણ સંવાદ" },
      desc: { en: "Practicing active listening, non-confrontational dialogue, and emotional validation.", hi: "सहानुभूतिपूर्वक सुनने और बिना बहस किए अपनी बात समझाने का अभ्यास करना।", gu: "સહાનુભૂતિપૂર્વક સાંભળવાની અને વગર દલીલે સમજાવવાની સાચી પદ્ધતિ કેળવવી." },
    },
    {
      step: "Session 4",
      title: { en: "Review & Long-Term Calibration", hi: "समीक्षा एवं स्थायी पारिवारिक शांति", gu: "સમીક્ષા અને કાયમી પારિવારિક શાંતિ" },
      desc: { en: "Refining strategies based on real home results for lasting family peace.", hi: "घर के परिणामों के आधार पर रणनीतियों को और बेहतर बनाना ताकि शांति हमेशा बनी रहे।", gu: "ઘરના વાસ્તવિક પરિણામોના આધારે રીતોને વધુ અસરકારક બનાવવી જેથી કાયમી શાંતિ જળવાય." },
    },
  ];

  const takeawayTools = [
    {
      title: { en: "The 3-Second Emotion Pause", hi: "३-सेकंड का मानसिक ठहराव", gu: "૩-સેકન્ડનો માનસિક વિરામ" },
      desc: { en: "A script for parents to regulate their own anger before responding to child tantrums.", hi: "बच्चों के गुस्से पर प्रतिक्रिया देने से पहले माता-पिता द्वारा अपना गुस्सा शांत करने का तरीका।", gu: "બાળકોની જીદ પર ગુસ્સો કરવાને બદલે શાંતિથી વિચારવાની ટેકનિક." },
    },
    {
      title: { en: "Parallel Drive-Time Dialogue", hi: "सहज और अनौपचारिक बातचीत", gu: "સહજ અને મુક્ત સંવાદ" },
      desc: { en: "Framework for talking to teenagers in low-pressure settings like car rides or walks.", hi: "गाड़ी चलाते समय या टहलते हुए टीनएजर्स से बिना किसी तनाव के दिल की बात करने का तरीका।", gu: "કાર ચલાવતી વખતે કે ચાલતાં-ચાલતાં ટીનેજર્સ સાથે તણાવ વગર દિલ ખોલીને વાત કરવાની રીત." },
    },
    {
      title: { en: "Co-Parenting Alignment Matrix", hi: "माता-पिता में परवरिश का तालमेल", gu: "વાલીઓ વચ્ચે બાળ ઉછેરનો સુમેળ" },
      desc: { en: "Agreement template to ensure both parents enforce identical rules without conflict.", hi: "माता और पिता के बीच एक समान नियम तय करने की योजना ताकि बच्चों में भ्रम न रहे।", gu: "માતા અને પિતા વચ્ચે એકસમાન શિસ્ત અને નિયમો નક્કી કરવાની વ્યવહારુ યોજના." },
    },
    {
      title: { en: "Screen-Time Contract Template", hi: "मोबाइल/स्क्रीन समय का नियम", gu: "મોબાઈલ/સ્ક્રીન સમયના નિયમો" },
      desc: { en: "Fair digital boundary agreements designed collaboratively with children.", hi: "बच्चों की सहमति से मोबाइल और टीवी के उपयोग की स्वस्थ सीमाएं तय करना।", gu: "બાળકોની સહમતીથી મોબાઈલ અને ટીવીના વપરાશની સ્વસ્થ મર્યાદાઓ નક્કી કરવી." },
    },
  ];

  const parentingFaqs = [
    {
      q: { en: "Should both parents attend parenting coaching sessions?", hi: "क्या माता और पिता दोनों को पेरेंटिंग सत्र में शामिल होना चाहिए?", gu: "શું માતા અને પિતા બંનેએ પેરેન્ટિંગ સત્રમાં હાજર રહેવું જોઈએ?" },
      a: { en: "While having both parents present builds faster alignment, single-parent attendance is completely effective and common.", hi: "यद्यपि दोनों की उपस्थिति से तालमेल जल्दी बनता है, केवल एक अभिभावक का शामिल होना भी पूरी तरह प्रभावी है।", gu: "જોકે બંને વાલીઓની હાજરીથી ઝડપી પરિણામ મળે છે, તેમ છતાં એક વાલી જોડાય તો પણ સત્ર એટલું જ અસરકારક રહે છે." },
    },
    {
      q: { en: "Do children or teenagers join the session directly?", hi: "क्या बच्चों या टीनएजर्स को सत्र में सीधे शामिल किया जाता है?", gu: "શું બાળકો કે ટીનેજર્સને સત્રમાં સીધા સામેલ કરવામાં આવે છે?" },
      a: { en: "Session 1 is usually parent-only. Depending on the situation, joint parent-teen sessions or 1-on-1 youth guidance can be integrated.", hi: "पहला सत्र सामान्यतः केवल माता-पिता के लिए होता है। आवश्यकतानुसार बाद में बच्चों के साथ संयुक्त सत्र रखे जा सकते हैं।", gu: "પ્રથમ સત્ર સામાન્ય રીતે માત્ર વાલીઓ માટે હોય છે. જરૂરિયાત મુજબ પાછળથી બાળકો સાથે સંયુક્ત સત્રો રાખી શકાય છે." },
    },
    {
      q: { en: "How many sessions are typically required to see results?", hi: "सकारात्मक बदलाव देखने में आमतौर पर कितने सत्र लगते हैं?", gu: "સકારાત્મક ફેરફાર જોવા માટે સામાન્ય રીતે કેટલા સત્રો જરૂરી છે?" },
      a: { en: "Most families report noticeable calm and reduced yelling within 3–4 structured sessions.", hi: "अधिकांश परिवारों को ३ से ४ संरचित सत्रों के भीतर घर में स्पष्ट शांति और चिल्लाने में कमी का अनुभव होता है।", gu: "મોટાભાગના પરિવારોને ૩ થી ૪ સુવ્યવસ્થિત સત્રોમાં જ ઘરમાં શાંતિ અને રાડારાડમાં નોંધપાત્ર ઘટાડો અનુભવાય છે." },
    },
  ];

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B3C2D]/10 text-[#0B3C2D] text-xs font-bold">
              <Users className="w-4 h-4 text-[#D98A2B]" />
              <span>{t(ds?.hero.badge || { en: "Dedicated Parenting Program", hi: "पेरेंटिंग मार्गदर्शन कार्यक्रम", gu: "પેરેન્ટિંગ માર્ગદર્શન કાર્યક્રમ" })}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              {t(ds?.hero.title || { en: "Transform Household Stress & Nurture Confident Children", hi: "घर का तनाव दूर करें और बच्चों में आत्मविश्वास जगाएं", gu: "ઘરનો તણાવ દૂર કરો અને બાળકોમાં આત્મવિશ્વાસ કેળવો" })}
            </h1>

            <p className="text-base text-ink-muted leading-relaxed max-w-3xl">
              {t(ds?.hero.desc || { en: "Parenting in the modern world is filled with noise, exhaustion, and constant self-doubt. Our sessions replace reactive discipline and shouting with structured frameworks that build mutual respect and household calm.", hi: "", gu: "" })}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact?service=Parenting%20Coaching#booking"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t(ds?.hero.bookBtn || { en: "Book Parenting Session", hi: "पेरेंटिंग सत्र बुक करें", gu: "પેરેન્ટિંગ સેશન બુક કરો" })}
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Who It's For & What's Covered */}
        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 space-y-4">
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "Who This Is For", hi: "यह कार्यक्रम किसके लिए है", gu: "આ કાર્યક્રમ કોના માટે છે" })}
              </h2>
              <ul className="space-y-3 text-xs text-deep-ink">
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>{t({ en: "Parents feeling overwhelmed by daily household friction or child tantrums", hi: "माता-पिता जो रोजमर्रा के तनाव, बच्चों की ज़िद और गुस्से से परेशान हैं", gu: "વાલીઓ જે રોજેરોજના કંકાસ, બાળકોની જીદ અને ગુસ્સાથી કંટાળી ગયા છે" })}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>{t({ en: "Families experiencing distance or hostility with teenagers", hi: "परिवार जो किशोरों (टीनએજર્સ) के साथ बढ़ती दूरी या मनमुटाव से जूझ रहे हैं", gu: "પરિવારો જે ટીનેજર્સ સાથેના અંતર કે મતભેદથી ચિંતિત છે" })}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <LeafMotif className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                  <span>{t({ en: "Couples who disagree on parenting styles or discipline methods", hi: "माता-पिता जिनके बीच बच्चों की परवरिश या अनुशासन के तरीकों पर मतभेद हैं", gu: "વાલીઓ જેમના વચ્ચે બાળ ઉછેર કે શિસ્તની પદ્ધતિઓ બાબતે મતભેદ છે" })}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 space-y-4">
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                {t(ds?.coveredTopicsHeading || { en: "Key Parenting Challenges We Address", hi: "मुख्य पेरेंटिंग चुनौतियां और समाधान", gu: "પેરેન્ટિંગના મુખ્ય પડકારો અને સમાધાન" })}
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

        {/* Practical Tools */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                {t({ en: "Practical Takeaways", hi: "व्यावहारिक टूल्स", gu: "વ્યવહારુ પદ્ધતિઓ" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "Frameworks You Take Home", hi: "घर के लिए उपयोगी समाधान और टूल्स", gu: "રોજિંદા જીવન માટે ઉપયોગી પદ્ધતિઓ" })}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {takeawayTools.map((tool, idx) => (
                <div key={idx} className="p-4 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-1">
                  <h4 className="text-sm font-serif-display font-bold text-[#0B3C2D]">{t(tool.title)}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{t(tool.desc)}</p>
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
                {t({ en: "What Your Parenting Arc Looks Like", hi: "पेरेंटिंग कोचिंग की सुव्यवस्थित रूपरेखा", gu: "પેરેન્ટિંગ કોચિંગની વ્યવસ્થિત રૂપરેખા" })}
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

        {/* Parenting FAQs */}
        <ScrollReveal direction="up" delay={300}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#D98A2B]" />
              <h2 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "Parenting Coaching FAQs", hi: "पेरेंटिंग कोचिंग के महत्वपूर्ण प्रश्न", gu: "પેરેન્ટિંગ કોચિંગના મહત્વપૂર્ણ પ્રશ્નો" })}
              </h2>
            </div>
            <div className="space-y-4">
              {parentingFaqs.map((faq, idx) => (
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
            {t({ en: "Bring calm and warmth back to your home", hi: "अपने घर में शांति और आत्मीयता वापस लाएं", gu: "તમારા ઘરમાં શાંતિ અને સ્નેહ પુનઃસ્થાપિત કરો" })}
          </h3>
          <Link
            href="/contact?service=Parenting%20Coaching#booking"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-sm shadow-lg transition-all"
          >
            {t({ en: "Book Your Parenting Session", hi: "अपना पेरेंटिंग सत्र बुक करें", gu: "તમારું પેરેન્ટિંગ સત્ર બુક કરો" })}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
