"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mic, Users, Calendar, ArrowRight, CheckCircle2, Mail, Send, X, Star, FileText } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";

const confettiList = [
  { top: "10%", left: "10%", color: "bg-emerald-400", width: "w-2 h-3.5", rotate: "rotate-12" },
  { top: "15%", left: "80%", color: "bg-amber-400", width: "w-2.5 h-2.5", rotate: "-rotate-45" },
  { top: "8%", left: "45%", color: "bg-[#0B3C2D]", width: "w-1.5 h-3", rotate: "rotate-45" },
  { top: "25%", left: "5%", color: "bg-teal-400", width: "w-3 h-2", rotate: "-rotate-12" },
  { top: "30%", left: "85%", color: "bg-amber-500", width: "w-2 h-4", rotate: "rotate-24" },
  { top: "6%", left: "70%", color: "bg-emerald-500", width: "w-2.5 h-2", rotate: "rotate-90" },
];

export default function SpeakingPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", org: "", date: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-open modal when navigating to #booking-form
  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#booking-form") {
        setSelectedTopic("General Keynote & Corporate Workshop");
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const keynoteTalks = [
    {
      title: "Leading Through Uncertainty: Executive Resilience & Calm",
      category: "Corporate Leadership & Executives",
      format: "45–60 Min Keynote or 2-Hour Interactive Workshop",
      audience: "C-Suite, Senior Managers, Corporate Teams, Founders",
      outcome: "Equips leaders with decision-fatigue management, emotional regulation, and stress prevention tools.",
      highlights: [
        "Managing high-stakes decision fatigue without burnout",
        "Building psychological safety in team environments",
        "Personal stress prevention strategies for corporate leaders",
      ],
    },
    {
      title: "Modern Parenting & Teen Anxiety: Building Safe Emotional Spaces",
      category: "Schools, PTAs & Parent Communities",
      format: "60–90 Min Interactive Seminar with Q&A",
      audience: "Parents, Educators, School Administrators, Counselors",
      outcome: "Gives parents actionable scripts and frameworks to replace yelling with calm emotional boundaries.",
      highlights: [
        "Managing digital screen time and social anxiety in teenagers",
        "De-escalating parent-child friction during exam seasons",
        "Creating predictable, calm household routines",
      ],
    },
    {
      title: "Conflict De-escalation & Relational Intelligence",
      category: "Institutions, Associations & Retreats",
      format: "Half-Day Workshop or Masterclass",
      audience: "Community Leaders, Professional Guilds, Team Leads",
      outcome: "Teaches practical active-listening and non-defensive communication for high-pressure relationships.",
      highlights: [
        "Breaking destructive defense mechanisms in real-time",
        "Active listening frameworks for emotional calibration",
        "Sustaining long-term empathy under organizational stress",
      ],
    },
  ];

  const organizerReviews = [
    {
      quote: "Nikunj's keynote on executive burnout was the highest-rated session at our annual leadership summit. Grounded, practical, and highly engaging.",
      author: "V. K. Mehta",
      role: "VP of HR, Technology Firm",
    },
    {
      quote: "Our school parents were raving about Nikunj's talk on teen digital anxiety. He provided realistic scripts that parents could use the same evening.",
      author: "S. Merchant",
      role: "PTA President, International School",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.org ? `Org: ${formData.org}` : "",
          serviceType: "Keynote Speaking Request",
          message: `Topic: ${selectedTopic}. Proposed Details: ${formData.message || "None"}`,
        }),
      });
    } catch (err) {
      console.error("Speaking request error:", err);
    } finally {
      setIsSubmitted(true);
    }
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
                <span>Keynote Speaking & Corporate Workshops</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#0B3C2D]">
                Transformative Keynotes on Family Resilience & Leadership
              </h1>

              <p className="text-base text-ink-muted leading-relaxed">
                I deliver engaging, evidence-based keynotes and interactive workshops for corporate leadership teams, educational institutions, and community organizations.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTopic("General Keynote & Corporate Workshop");
                    setIsSubmitted(false);
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all inline-flex items-center cursor-pointer active:scale-98"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Request Speaking Engagement
                </button>
                <Link
                  href="/contact#booking"
                  className="px-5 py-3.5 rounded-full bg-[#F8F4EE] hover:bg-[#efe8dd] text-[#0B3C2D] font-bold text-xs border border-[#0B3C2D]/15 transition-all inline-flex items-center"
                >
                  Book 1-on-1 Counseling
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
                  <p className="text-[11px] text-gray-200">Keynote Speaker & Executive Life Coach</p>
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
                Keynote Topics
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#0B3C2D] mt-1">
                Popular Speaking Topics & Masterclasses
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {keynoteTalks.map((talk, idx) => (
              <ScrollReveal key={idx} direction="up" delay={150 + idx * 50}>
                <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 shadow-md flex flex-col justify-between hover-lift space-y-6 h-full">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#0B3C2D]/10 text-[#0B3C2D] text-[11px] font-bold">
                      {talk.category}
                    </span>

                    <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D] leading-snug">
                      {talk.title}
                    </h3>

                    <div className="space-y-2 text-xs text-ink-muted bg-[#F8F4EE] p-4 rounded-2xl border border-[#0B3C2D]/10">
                      <p><strong className="text-[#0B3C2D]">Format:</strong> {talk.format}</p>
                      <p><strong className="text-[#0B3C2D]">Audience:</strong> {talk.audience}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">
                        Core Outcome:
                      </span>
                      <p className="text-xs text-deep-ink leading-relaxed">
                        {talk.outcome}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#0B3C2D] block">Key Session Takeaways:</span>
                      <ul className="space-y-1.5 text-xs text-ink-muted">
                        {talk.highlights.map((h, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8CA899] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0B3C2D]/10">
                    <button
                      onClick={() => setSelectedTopic(talk.title)}
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors"
                    >
                      Request This Keynote
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
              <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider">Organizer Feedback</span>
              <h2 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">What Event Host Committees Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {organizerReviews.map((rev, idx) => (
                <div key={idx} className="p-5 bg-[#F8F4EE] rounded-2xl border border-[#0B3C2D]/10 space-y-3">
                  <div className="flex items-center space-x-1 text-[#D98A2B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-ink-muted italic leading-relaxed">"{rev.quote}"</p>
                  <div>
                    <span className="text-xs font-bold text-[#0B3C2D] block">{rev.author}</span>
                    <span className="text-[11px] text-ink-light">{rev.role}</span>
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
                  <span className="text-[10px] font-bold text-[#D98A2B] uppercase tracking-wider block">Keynote Booking Request</span>
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
                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Your Name *</label>
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
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Work Email *</label>
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
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Organization / School Name *</label>
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
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Proposed Date / Details (Optional)</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share proposed event dates, audience size, or specific requirements..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    Submit Keynote Request
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4 animate-fade-in">
                  {/* Concentric Green Circle Checkmark Emblem */}
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

                  <h4 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">Request Received!</h4>
                  <p className="text-xs text-ink-muted max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#13221C]">{formData.name}</strong>! Your keynote speaking request for <strong className="text-[#0B3C2D]">{selectedTopic}</strong> has been received. Nikunj will review your event details and respond within 24 business hours.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => { setSelectedTopic(null); setIsSubmitted(false); }}
                      className="w-full py-3.5 rounded-2xl bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 transition-all"
                    >
                      Done
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
