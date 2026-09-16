"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mic, Calendar, ArrowRight, CheckCircle2, X, Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const confettiList = [
  { top: "10%", left: "10%", color: "bg-emerald-400", width: "w-2 h-3.5", rotate: "rotate-12" },
  { top: "15%", left: "80%", color: "bg-amber-400", width: "w-2.5 h-2.5", rotate: "-rotate-45" },
  { top: "8%", left: "45%", color: "bg-[#0B3C2D]", width: "w-1.5 h-3", rotate: "rotate-45" },
  { top: "25%", left: "5%", color: "bg-teal-400", width: "w-3 h-2", rotate: "-rotate-12" },
  { top: "30%", left: "85%", color: "bg-amber-500", width: "w-2 h-4", rotate: "rotate-24" },
  { top: "6%", left: "70%", color: "bg-emerald-500", width: "w-2.5 h-2", rotate: "rotate-90" },
];

export default function SpeakingPage() {
  const { t } = useLanguage();
  const sp = translations.speakingPage;

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", org: "", date: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Auto-open modal when navigating to #booking-form
  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#booking-form") {
        setSelectedTopic(t({ en: "General Keynote & Corporate Workshop", hi: "सामान्य व्याख्यान एवं वर्कशॉप", gu: "સામાન્ય વક્તવ્ય અને વર્કશોપ" }));
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [t]);

  const keynoteTalks = [
    {
      title: sp?.talks.talk1.title || { en: "Leading Through Uncertainty: Executive Resilience & Calm", hi: "", gu: "" },
      category: sp?.talks.talk1.category || { en: "Corporate Leadership & Executives", hi: "", gu: "" },
      format: sp?.talks.talk1.format || { en: "45–60 Min Keynote or 2-Hour Interactive Workshop", hi: "", gu: "" },
      audience: sp?.talks.talk1.audience || { en: "C-Suite, Senior Managers, Corporate Teams, Founders", hi: "", gu: "" },
      outcome: sp?.talks.talk1.outcome || { en: "Equips leaders with decision-fatigue management, emotional regulation, and stress prevention tools.", hi: "", gu: "" },
      highlights: [
        { en: "Managing high-stakes decision fatigue without burnout", hi: "निर्णय के तनाव को बिना मानसिक थकावट के संभालना", gu: "નિર્ણયોના તણાવને માનસિક થાક વિના સંભાળવો" },
        { en: "Building psychological safety in team environments", hi: "टीम के भीतर सुरक्षित और सकारात्मक माहौल बनाना", gu: "ટીમમાં સુરક્ષિત અને સકારાત્મક વાતાવરણ ઊભું કરવું" },
        { en: "Personal stress prevention strategies for corporate leaders", hi: "कॉरपोरेट लीडर्स के लिए तनाव नियंत्रण की रणनीतियां", gu: "કોર્પોરેટ લીડર્સ માટે તણાવ નિયંત્રણની વ્યૂહરચના" },
      ],
    },
    {
      title: sp?.talks.talk2.title || { en: "Modern Parenting & Teen Anxiety: Building Safe Emotional Spaces", hi: "", gu: "" },
      category: sp?.talks.talk2.category || { en: "Schools, PTAs & Parent Communities", hi: "", gu: "" },
      format: sp?.talks.talk2.format || { en: "60–90 Min Interactive Seminar with Q&A", hi: "", gu: "" },
      audience: sp?.talks.talk2.audience || { en: "Parents, Educators, School Administrators, Counselors", hi: "", gu: "" },
      outcome: sp?.talks.talk2.outcome || { en: "Gives parents actionable scripts and frameworks to replace yelling with calm emotional boundaries.", hi: "", gu: "" },
      highlights: [
        { en: "Managing digital screen time and social anxiety in teenagers", hi: "किशोरों में मोबाइल समय और मानसिक चिंता का प्रबंधन", gu: "કિશોરોમાં મોબાઈલ સમય અને માનસિક ચિંતાનું નિયમન" },
        { en: "De-escalating parent-child friction during exam seasons", hi: "परीक्षा के दौरान माता-पिता और बच्चों में तनाव कम करना", gu: "પરીક્ષાના સમયમાં વાલીઓ અને બાળકો વચ્ચેનો તણાવ ઘટાડવો" },
        { en: "Creating predictable, calm household routines", hi: "घर में शांत और व्यवस्थित दिनचर्या का निर्माण", gu: "ઘરમાં શાંત અને વ્યવસ્થિત દિનચર્યાની રચના" },
      ],
    },
    {
      title: sp?.talks.talk3.title || { en: "Conflict De-escalation & Relational Intelligence", hi: "", gu: "" },
      category: sp?.talks.talk3.category || { en: "Institutions, Associations & Retreats", hi: "", gu: "" },
      format: sp?.talks.talk3.format || { en: "Half-Day Workshop or Masterclass", hi: "", gu: "" },
      audience: sp?.talks.talk3.audience || { en: "Community Leaders, Professional Guilds, Team Leads", hi: "", gu: "" },
      outcome: sp?.talks.talk3.outcome || { en: "Teaches practical active-listening and non-defensive communication for high-pressure relationships.", hi: "", gu: "" },
      highlights: [
        { en: "Breaking destructive defense mechanisms in real-time", hi: "बहस के दौरान नकारात्मक प्रतिक्रियाओं को तुरंत रोकना", gu: "વિવાદ દરમિયાન નકારાત્મક પ્રતિક્રિયાઓને તુરંત રોકવી" },
        { en: "Active listening frameworks for emotional calibration", hi: "भावनात्मक संतुलन के लिए ध्यानपूर्वक सुनने की कला", gu: "ભાવનાત્મક સમતુલા માટે ધ્યાનપૂર્વક સાંભળવાની કળા" },
        { en: "Sustaining long-term empathy under organizational stress", hi: "दबाव के समय भी आपसी सहानुभूति और सहयोग बनाए रखना", gu: "તણાવના સમયે પણ પરસ્પર સહાનુભૂતિ અને સાથ જાળવી રાખવો" },
      ],
    },
  ];

  const organizerReviews = [
    {
      quote: {
        en: "Nikunj's keynote on executive burnout was the highest-rated session at our annual leadership summit. Grounded, practical, and highly engaging.",
        hi: "कार्यस्थल बर्नआउट पर निकुंज जी का व्याख्यान हमारे वार्षिक सम्मेलन का सर्वश्रेष्ठ सत्र रहा। बेहद व्यावहारिक और ज्ञानवर्धक।",
        gu: "વર્કપ્લેસ બર્નઆઉટ પર નિકુંજભાઈનું વક્તવ્ય અમારા વાર્ષિક સમિટનું સર્વશ્રેષ્ઠ સત્ર રહ્યું. અત્યંત વ્યવહારુ અને પ્રેરણાદાયી.",
      },
      author: "V. K. Mehta",
      role: { en: "VP of HR, Technology Firm", hi: "एचआर प्रमुख, टेक्नोलॉजी फर्म", gu: "એચઆર હેડ, ટેકનોલોજી ફર્મ" },
    },
    {
      quote: {
        en: "Our school parents were raving about Nikunj's talk on teen digital anxiety. He provided realistic scripts that parents could use the same evening.",
        hi: "टीनएजर्स की मोबाइल चिंता पर निकुंज जी के सत्र की अभिभावकों ने अत्यधिक सराहना की। उन्होंने तत्काल काम आने वाले उपाय सिखाए।",
        gu: "ટીનેજર્સની મોબાઈલ ચિંતા પર નિકુંજભાઈના સત્રની વાલીઓએ ખૂબ પ્રશંસા કરી. તેમણે તરત જ અમલમાં મૂકી શકાય તેવી સચોટ રીતો શીખવી.",
      },
      author: "S. Merchant",
      role: { en: "PTA President, International School", hi: "पीटीए अध्यक्ष, इंटरनेशनल स्कूल", gu: "પીટીએ પ્રમુખ, ઇન્ટરનેશનલ સ્કૂલ" },
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: "",
          serviceType: "Keynote Speaking Request",
          message: `Topic: ${selectedTopic}. Organization: ${formData.org}. Proposed Details: ${formData.message || "None"}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(
          data.message || "Something went wrong. Please try again."
        );
        return;
      }
    } catch (err) {
      console.error("Speaking request error:", err);
      setSubmitError("Network error. Please check your connection and try again.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D98A2B]/15 text-[#D98A2B] text-xs font-bold">
                <Mic className="w-4 h-4" />
                <span>{t(sp?.header.badge || { en: "Keynote Speaking & Corporate Workshops", hi: "की-नोट व्याख्यान एवं कॉरपोरेट वर्कशॉप", gu: "કીનોટ વ્યાખ્યાન અને કોર્પોરેટ વર્કશોપ" })}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#0B3C2D]">
                {t(sp?.header.title || { en: "Transformative Keynotes on Family Resilience & Leadership", hi: "लीडर्स, परिवारों और संस्थाओं के लिए मानसिक मजबूती एवं संतुलन", gu: "લીડર્સ, પરિવારો અને સંસ્થાઓ માટે માનસિક મનોબળ અને સમતુલા" })}
              </h1>

              <p className="text-base text-ink-muted leading-relaxed">
                {t(sp?.header.subtitle || { en: "I deliver engaging, evidence-based keynotes and interactive workshops for corporate leadership teams, educational institutions, and community organizations.", hi: "", gu: "" })}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTopic(t({ en: "General Keynote & Corporate Workshop", hi: "सामान्य व्याख्यान एवं वर्कशॉप", gu: "સામાન્ય વક્તવ્ય અને વર્કશોપ" }));
                    setIsSubmitted(false);
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all inline-flex items-center cursor-pointer active:scale-98"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t({ en: "Request Speaking Engagement", hi: "व्याख्यान आमंत्रित करें", gu: "વક્તવ્ય માટે આમંત્રણ આપો" })}
                </button>
                <Link
                  href="/contact#booking"
                  className="px-5 py-3.5 rounded-full bg-[#F8F4EE] hover:bg-[#efe8dd] text-[#0B3C2D] font-bold text-xs border border-[#0B3C2D]/15 transition-all inline-flex items-center"
                >
                  {t({ en: "Book 1-on-1 Counseling", hi: "व्यक्तिगत परामर्श बुक करें", gu: "વ્યક્તિગત કાઉન્સેલિંગ બુક કરો" })}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[#0B3C2D]/10 group">
                <Image
                  src="/01.jpeg"
                  alt="Nikunj Dhanani Keynote Speaker - Growing Together Event"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[center_60%] group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C2D]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/20">
                  <p className="text-xs font-bold">Nikunj Dhanani</p>
                  <p className="text-[11px] text-gray-200">
                    {t({ en: "Keynote Speaker & Executive Life Coach", hi: "की-नोट स्पीकर एवं एग्जीक्यूटिव लाइफ कोच", gu: "કીનોટ સ્પીકર અને એક્ઝિક્યુટિવ લાઈફ કોચ" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Expanded Keynote Cards */}
        <div className="space-y-8">
          <ScrollReveal direction="up" delay={150}>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
                {t(sp?.talks.badge || { en: "Keynote Topics", hi: "प्रमुख व्याख्यान विषय", gu: "મુખ્ય વિષયો અને વક્તવ્યો" })}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#0B3C2D] mt-1">
                {t(sp?.talks.heading || { en: "Signature Speaking Programs & Formats", hi: "विशेष व्याख्यान एवं वर्कशॉप प्रारूप", gu: "વિશિષ્ટ વક્તવ્ય અને વર્કશોપનું માળખું" })}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {keynoteTalks.map((talk, idx) => (
              <ScrollReveal key={idx} direction="up" delay={150 + idx * 50}>
                <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 shadow-md flex flex-col justify-between hover-lift space-y-6 h-full">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#0B3C2D]/10 text-[#0B3C2D] text-[11px] font-bold">
                      {t(talk.category)}
                    </span>

                    <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D] leading-snug">
                      {t(talk.title)}
                    </h3>

                    <div className="space-y-2 text-xs text-ink-muted bg-[#F8F4EE] p-4 rounded-2xl border border-[#0B3C2D]/10">
                      <p><strong className="text-[#0B3C2D]">{t({ en: "Format:", hi: "स्वरूप:", gu: "માળખું:" })}</strong> {t(talk.format)}</p>
                      <p><strong className="text-[#0B3C2D]">{t({ en: "Audience:", hi: "श्रोता:", gu: "શ્રોતાઓ:" })}</strong> {t(talk.audience)}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">
                        {t({ en: "Core Outcome:", hi: "मुख्य परिणाम:", gu: "મુખ્ય પરિણામ:" })}
                      </span>
                      <p className="text-xs text-deep-ink leading-relaxed">
                        {t(talk.outcome)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#0B3C2D] block">
                        {t({ en: "Key Session Takeaways:", hi: "प्रमुख निष्कर्ष एवं टूल्स:", gu: "સત્રની મુખ્ય પદ્ધતિઓ:" })}
                      </span>
                      <ul className="space-y-1.5 text-xs text-ink-muted">
                        {talk.highlights.map((h, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8CA899] shrink-0 mt-0.5" />
                            <span>{t(h)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0B3C2D]/10">
                    <button
                      onClick={() => setSelectedTopic(t(talk.title))}
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      {t({ en: "Request This Keynote", hi: "यह व्याख्यान आमंत्रित करें", gu: "આ વક્તવ્ય માટે વિનંતી કરો" })}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Event Organizer Testimonials */}
        <ScrollReveal direction="up" delay={250}>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#0B3C2D]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">
                {t({ en: "Organizer Feedback", hi: "आयोजकों का अनुभव", gu: "આયોજકોનો પ્રતિસાદ" })}
              </span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                {t({ en: "What Event Host Committees Say", hi: "आयोजक संस्थाएं क्या कहती हैं", gu: "આયોજક સમિતિઓ શું કહે છે" })}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {organizerReviews.map((rev, idx) => (
                <div key={idx} className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-3">
                  <div className="flex items-center space-x-1 text-[#D98A2B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-ink-muted italic leading-relaxed">"{t(rev.quote)}"</p>
                  <div>
                    <span className="text-xs font-bold text-[#0B3C2D] block">{rev.author}</span>
                    <span className="text-[11px] text-ink-light">{t(rev.role)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Modal Request Form */}
        {selectedTopic && (
          <div
            id="booking-form"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#13221C]/70 backdrop-blur-sm animate-fade-in"
          >
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-[#0B3C2D]/10 my-auto overflow-hidden">
              {/* Confetti Flakes when submitted */}
              {isSubmitted && (
                <>
                  {confettiList.map((c, idx) => (
                    <div
                      key={idx}
                      className={`absolute ${c.width} ${c.color} ${c.rotate} rounded-xs pointer-events-none opacity-85 animate-confetti`}
                      style={{ top: c.top, left: c.left }}
                    />
                  ))}
                </>
              )}

              <div className="flex items-center justify-between border-b border-[#0B3C2D]/10 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#D98A2B] uppercase tracking-wider block">
                    {t(sp?.modal.title || { en: "Keynote Booking Request", hi: "व्याख्यान बुकिंग अनुरोध", gu: "વક્તવ્ય બુકિંગ વિનંતી" })}
                  </span>
                  <h3 className="text-lg font-serif-display font-bold text-[#0B3C2D]">{selectedTopic}</h3>
                </div>
                <button
                  onClick={() => { setSelectedTopic(null); setIsSubmitted(false); }}
                  className="p-1.5 rounded-full text-ink-muted hover:bg-[#F8F4EE] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {submitError && (
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                      <X className="w-4 h-4 shrink-0" />
                      {submitError}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">
                      {t(sp?.modal.nameLabel || { en: "Your Name", hi: "आपका नाम", gu: "તમારું નામ" })} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">
                      {t(sp?.modal.emailLabel || { en: "Work Email", hi: "ईमेल", gu: "ઈમેલ" })} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">
                      {t(sp?.modal.orgLabel || { en: "Organization / School Name", hi: "संस्था / कंपनी का नाम", gu: "સંસ્થા / કંપનીનું નામ" })} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      placeholder="e.g. Acme Corp / International School"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">
                      {t(sp?.modal.notesLabel || { en: "Proposed Date / Details (Optional)", hi: "श्रोताओं की संख्या एवं आयोजन का विवरण", gu: "શ્રોતાઓની સંખ્યા અને કાર્યક્રમની વિગતો" })}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t({ en: "Share proposed event dates, audience size, or specific requirements...", hi: "प्रस्तावित तारीखें, श्रोताओं की संख्या या अन्य विवरण साझा करें...", gu: "સંભવિત તારીખો, શ્રોતાઓની સંખ્યા કે અન્ય વિગતો જણાવો..." })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    {t(sp?.modal.submitBtn || { en: "Submit Keynote Request", hi: "पूछताछ भेजें", gu: "પૂછપરછ મોકલો" })}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4 animate-fade-in">
                  <div className="relative my-3 flex items-center justify-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E6F4EA] animate-halo-pulse flex items-center justify-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0F9D58] text-white flex items-center justify-center shadow-lg shadow-[#0F9D58]/30 animate-success-pop">
                        <svg
                          className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-current"
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 12l4 4L18 6" />
                          <path d="M9 12l2.5 2.5L20 7" opacity="0.85" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    {t({ en: "Request Received!", hi: "अनुरोध प्राप्त हुआ!", gu: "વિનંતી પ્રાપ્ત થઈ!" })}
                  </h4>
                  <p className="text-xs text-ink-muted max-w-sm mx-auto leading-relaxed">
                    {t({
                      en: `Thank you, ${formData.name}! Your keynote speaking request has been received. Nikunj will review your event details and respond within 24 business hours.`,
                      hi: `धन्यवाद, ${formData.name}! आपका व्याख्यान अनुरोध प्राप्त हो गया है। निकुंज जी २४ व्यावसायिक घंटों के भीतर आपसे संपर्क करेंगे।`,
                      gu: `આભાર, ${formData.name}! તમારી વક્તવ્ય માટેની વિનંતી મળી ગઈ છે. નિકુંજભાઈ ૨૪ કલાકમાં તમારો સંપર્ક કરશે.`,
                    })}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => { setSelectedTopic(null); setIsSubmitted(false); }}
                      className="w-full py-3.5 rounded-2xl bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 transition-all"
                    >
                      {t({ en: "Done", hi: "संपन्न", gu: "પૂર્ણ" })}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
