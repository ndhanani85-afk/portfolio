"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CalendarBooking from "@/components/CalendarBooking";
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, MessageCircle, Clock, CalendarDays, Lock, AlertCircle, X } from "lucide-react";
import LeafMotif from "@/components/LeafMotif";
import ScrollReveal from "@/components/ScrollReveal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/components/animate-ui/components/base/alert-dialog";

const confettiList = [
  { top: "12%", left: "12%", color: "bg-emerald-400", width: "w-2 h-3.5", rotate: "rotate-12" },
  { top: "18%", left: "84%", color: "bg-amber-400", width: "w-2.5 h-2.5", rotate: "-rotate-45" },
  { top: "10%", left: "48%", color: "bg-[#0B3C2D]", width: "w-1.5 h-3", rotate: "rotate-45" },
  { top: "28%", left: "6%", color: "bg-teal-400", width: "w-3 h-2", rotate: "-rotate-12" },
  { top: "32%", left: "90%", color: "bg-amber-500", width: "w-2 h-4", rotate: "rotate-24" },
  { top: "8%", left: "75%", color: "bg-emerald-500", width: "w-2.5 h-2", rotate: "rotate-90" },
];

function ContactBookingContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "Parenting Coaching";

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>(initialService);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Restore service param from URL on mount
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setSessionType(serviceParam);
    }
  }, [searchParams]);

  // Validate phone as user types
  useEffect(() => {
    const phoneCleaned = formData.phone.replace(/\D/g, "");
    if (formData.phone && !/^[6-9]\d{9}$/.test(phoneCleaned)) {
      setPhoneError(
        "Enter a valid 10-digit Indian mobile number (starting with 6-9)."
      );
    } else {
      setPhoneError("");
    }
  }, [formData.phone]);

  const isPhoneValid =
    formData.phone.length === 0 ||
    /^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""));

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!selectedDate || !selectedTime) {
      setSubmitError("Please select a date and time slot for your session.");
      return;
    }
    if (!formData.name.trim()) {
      setSubmitError("Please enter your name.");
      return;
    }
    if (!isPhoneValid) {
      setSubmitError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone.replace(/\D/g, ""),
          serviceType: sessionType,
          message: `Scheduled: ${selectedDate.toDateString()} at ${selectedTime}. Notes: ${formData.notes || "None"}`,
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
      console.error("Booking error:", err);
      setSubmitError("Connection error. Please check your network and try again.");
      return;
    } finally {
      setIsSubmitting(false);
    }
    setIsBooked(true);
    setShowCelebration(true);
  };

  return (
    <div className="bg-[#F8F4EE] py-12 md:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header Hero */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D98A2B]">
              Direct Scheduling
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-[#0B3C2D]">
              Book Your Confidential Counseling Session
            </h1>
            <p className="text-base text-ink-muted leading-relaxed">
              Choose your preferred date, time slot, and session focus. Every session is conducted directly by me with 100% privacy.
            </p>
          </div>
        </ScrollReveal>

        {/* Booking & Contact Section */}
        <div id="booking" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Info & Prep Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="up" delay={150}>
              <div className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 shadow-md space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#0B3C2D] text-white flex items-center justify-center">
                    <LeafMotif className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif-display font-bold text-[#0B3C2D]">
                      Nikunj Dhanani
                    </h3>
                    <p className="text-xs text-ink-muted">Independent Counselor & Speaker</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-deep-ink border-t border-[#0B3C2D]/10 pt-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#0B3C2D]">Practice Location:</strong>
                      <span>Mota Varachha, Surat, Gujarat (Online Nationwide via Zoom)</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#D98A2B] shrink-0" />
                    <div>
                      <strong className="block text-[#0B3C2D]">Phone / WhatsApp:</strong>
                      <span>+91 99250 60609</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#D98A2B] shrink-0" />
                    <div>
                      <strong className="block text-[#0B3C2D]">Email:</strong>
                      <span>ndhanani85@gmail.com</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#0B3C2D]/10 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#0B3C2D]">
                    <ShieldCheck className="w-4 h-4 text-[#8CA899]" />
                    <span>100% Confidential & Private Care</span>
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    No third-party platforms or shared data. All communications remain strictly between you and me.
                  </p>
                </div>

                {/* WhatsApp Callout */}
                <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#0B3C2D] block">Prefer quick WhatsApp chat?</span>
                    <span className="text-[11px] text-ink-muted">Ask questions before booking</span>
                  </div>
                  <a
                    href="https://wa.me/919925060609?text=Hi%20Nikunj,%20I'd%20like%20to%20ask%20a%20question."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba5a] transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* What Happens Next Box */}
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-white rounded-3xl p-6 border border-[#0B3C2D]/10 space-y-3">
                <span className="text-xs font-bold text-[#D98A2B] uppercase tracking-wider block">What Happens Next?</span>
                <ul className="space-y-2 text-xs text-ink-muted">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Instant confirmation email & WhatsApp text with session details.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Private Zoom link or Surat practice address provided prior to session.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3C2D] shrink-0 mt-0.5" />
                    <span>Optional 5-minute pre-session questionnaire sent for goal alignment.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Calendar & Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={150}>
              {!isBooked ? (
                <form onSubmit={handleSubmitBooking} className="bg-white rounded-3xl p-8 border border-[#0B3C2D]/10 shadow-md space-y-6">
                  <h3 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                    Schedule Your Session
                  </h3>

                  {/* Session Type Picker */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-2 uppercase tracking-wider">
                      Select Session Offering
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        "Parenting Coaching",
                        "Relationship Repair",
                        "Counselling & Life Coaching",
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSessionType(type)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                            sessionType === type
                              ? "bg-[#0B3C2D] text-white border-[#0B3C2D] shadow-sm"
                              : "bg-[#F8F4EE] border-[#0B3C2D]/15 text-deep-ink hover:bg-[#8CA899]/20"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Calendar Component */}
                  <CalendarBooking
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateSelect={(d) => setSelectedDate(d)}
                    onTimeSelect={(t) => setSelectedTime(t)}
                  />

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Phone / WhatsApp Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-5 text-[#8C847C] absolute left-3 top-3.5" />
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                            })
                          }
                          onBlur={() => {
                            if (formData.phone && !isPhoneValid) setPhoneError("");
                          }}
                          placeholder="+91 98765 43210"
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#0B3C2D] bg-white transition-colors ${
                            phoneError ? "border-red-500 ring-2 ring-red-500/20" : "border-[#0B3C2D]/20"
                          }`}
                        />
                      </div>
                      {phoneError && (
                        <p className="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-red-600">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="priya@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1">Brief Note / What brings you to counseling? (Optional)</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share any background details or specific concerns..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3C2D]/20 text-xs focus:outline-none focus:border-[#0B3C2D] bg-white"
                    ></textarea>
                  </div>

                  {submitError && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !isPhoneValid}
                    className={`w-full py-4 rounded-full text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                      isSubmitting || !isPhoneValid
                        ? "bg-[#7a9b8e] cursor-not-allowed"
                        : "bg-[#0B3C2D] hover:bg-[#07291f] hover:shadow-xl"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-[#D98A2B]" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 4.373 0 12h4z" />
                        </svg>
                        Processing Reservation...
                      </>
                    ) : (
                      "Confirm & Reserve Time Slot"
                    )}
                  </button>

                </form>
              ) : (
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0B3C2D]/10 shadow-lg text-center space-y-6 animate-fade-in relative overflow-hidden">
                  {/* Concentric Green Circle Checkmark Emblem */}
                  <div className="relative my-2 flex items-center justify-center">
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

                  <h3 className="text-3xl font-serif-display font-bold text-[#0B3C2D]">
                    Session Reserved!
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Your <strong>{sessionType}</strong> session has been reserved for:
                  </p>
                  <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#0B3C2D]/10 max-w-sm mx-auto text-xs font-bold text-[#0B3C2D] space-y-1">
                    <p>📅 {selectedDate?.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
                    <p>⏰ {selectedTime}</p>
                  </div>
                  <p className="text-xs text-ink-muted">
                    A confirmation email & WhatsApp message with link/location details will be sent to <strong>{formData.email}</strong>.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                      type="button"
                      onClick={() => setShowCelebration(true)}
                      className="px-6 py-2.5 rounded-full bg-[#0B3C2D]/10 hover:bg-[#0B3C2D]/20 text-[#0B3C2D] font-bold text-xs transition-colors"
                    >
                      View Booking Summary
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsBooked(false);
                        setFormData({ name: "", email: "", phone: "", notes: "" });
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs transition-colors shadow-md"
                    >
                      Book Another Session
                    </button>
                  </div>
                </div>
              )}
            </ScrollReveal>
          </div>

        </div>

      </div>

      {/* ── CELEBRATORY COUNSELING BOOKING ALERT DIALOG (animate-ui animated alert-dialog with from="bottom") ── */}
      <AlertDialog open={showCelebration} onOpenChange={setShowCelebration}>
        <AlertDialogPopup from="bottom" className="w-[92%] sm:max-w-[425px] p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
          {/* Multi-colored Confetti Flakes */}
          {confettiList.map((c, idx) => (
            <div
              key={idx}
              className={`absolute ${c.width} ${c.color} ${c.rotate} rounded-xs pointer-events-none opacity-85 animate-confetti`}
              style={{ top: c.top, left: c.left }}
            />
          ))}

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowCelebration(false)}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 rounded-full text-[#8C847C] hover:bg-[#FAF8F5] transition-colors z-10 touch-manipulation"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Concentric Green Circle Checkmark Emblem */}
          <div className="relative my-3 sm:my-4 flex items-center justify-center">
            {/* Outer soft glowing green halo */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E6F4EA] animate-halo-pulse flex items-center justify-center">
              {/* Inner solid green circle */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0F9D58] text-white flex items-center justify-center shadow-lg shadow-[#0F9D58]/30 animate-success-pop">
                {/* Double Checkmark Icon */}
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

          <AlertDialogHeader className="mb-4">
            <AlertDialogTitle className="text-lg sm:text-2xl text-center">Session Reserved!</AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm text-center">
              Thank you, <strong className="text-[#13221C]">{formData.name}</strong>! Your <strong className="text-[#0B3C2D]">{sessionType}</strong> session has been reserved.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Scheduled Details Card */}
          <div className="bg-[#F8F4EE] p-3.5 rounded-2xl border border-[#0B3C2D]/10 text-xs font-semibold text-[#0B3C2D] space-y-1 text-center my-3">
            <p className="flex items-center justify-center gap-1.5">
              <span>📅</span>
              <span>{selectedDate?.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
            </p>
            <p className="flex items-center justify-center gap-1.5 text-[#D98A2B] font-bold">
              <span>⏰</span>
              <span>{selectedTime}</span>
            </p>
          </div>

          <p className="text-[11px] text-ink-muted text-center leading-relaxed">
            A confirmation email & WhatsApp message with private session details have been sent to <strong>{formData.email}</strong>.
          </p>

          <AlertDialogFooter className="flex-col sm:flex-col gap-2 mt-4">
            <AlertDialogAction
              onClick={() => setShowCelebration(false)}
              className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 touch-manipulation"
            >
              Done
            </AlertDialogAction>
            <Link
              href="/"
              onClick={() => setShowCelebration(false)}
              className="block text-xs font-bold text-[#8C847C] hover:text-[#0B3C2D] py-1 transition-colors text-center"
            >
              Return to Homepage
            </Link>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading booking portal...</div>}>
      <ContactBookingContent />
    </Suspense>
  );
}
