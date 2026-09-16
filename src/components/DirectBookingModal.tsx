"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Heart,
  Users,
  Brain,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import CalendarBooking from "./CalendarBooking";

interface DirectBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const COUNSELING_SERVICES = [
  {
    id: "couples",
    name: "Couples Relationship Repair",
    subtitle: "Break circular arguments, rebuild warmth & trust",
    icon: Heart,
    color: "#D98A2B",
    bg: "#FFF9F0",
  },
  {
    id: "family",
    name: "Parenting & Family Coaching",
    subtitle: "End daily screen battles, manage teen/child triggers",
    icon: Users,
    color: "#0B3C2D",
    bg: "#E8F3EE",
  },
  {
    id: "mentor",
    name: "Individual Counseling & Mentorship",
    subtitle: "Overcome burnout, regain emotional clarity & resilience",
    icon: Brain,
    color: "#2C6E49",
    bg: "#EFF8F3",
  },
];

export default function DirectBookingModal({
  isOpen,
  onClose,
  initialService = "Couples Relationship Repair",
}: DirectBookingModalProps) {
  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<"schedule" | "contact" | "confirmed">("schedule");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initial service when modal opens
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService, isOpen]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Validate Indian Phone
  useEffect(() => {
    const cleaned = formData.phone.replace(/\D/g, "");
    if (formData.phone && !/^[6-9]\d{9}$/.test(cleaned)) {
      setPhoneError("Enter a valid 10-digit mobile number (starts with 6-9).");
    } else {
      setPhoneError("");
    }
  }, [formData.phone]);

  if (!isOpen) return null;

  const isPhoneValid =
    formData.phone.length === 0 ||
    /^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""));

  // Build Google Calendar TEMPLATE URL for 1-click add to client calendar
  const getGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return "#";

    const date = new Date(selectedDate);
    const match = selectedTime.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    let hours = 10;
    let minutes = 0;

    if (match) {
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === "PM" && hours !== 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
    }

    date.setHours(hours, minutes, 0, 0);
    const endDate = new Date(date.getTime() + 50 * 60 * 1000);

    const formatGDate = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    };

    const title = encodeURIComponent(`Counseling Session: ${selectedService} with Nikunj Dhanani`);
    const details = encodeURIComponent(
      `Confidential Counseling & Coaching Session with Nikunj Dhanani.\nService: ${selectedService}\nClient: ${formData.name}\nPhone: ${formData.phone}\n\nGoogle Meet / Zoom link or clinic location will be sent prior to session.`
    );
    const location = encodeURIComponent("Online Zoom / Google Meet or Practice Clinic");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGDate(date)}/${formatGDate(endDate)}&details=${details}&location=${location}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!selectedDate || !selectedTime) {
      setSubmitError("Please select a date and time slot first.");
      setStep("schedule");
      return;
    }
    if (!formData.name.trim()) {
      setSubmitError("Please enter your name.");
      return;
    }
    if (!formData.phone || !isPhoneValid) {
      setSubmitError("Please provide a valid 10-digit mobile number.");
      return;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError("Please provide a valid email address.");
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
          serviceType: selectedService,
          date: selectedDate.toISOString(),
          time: selectedTime,
          message: `Direct Booking: ${selectedDate.toDateString()} at ${selectedTime}. Focus: ${formData.notes || "Standard Counseling Session"}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.message || data.error || "Submission failed. Please try again.");
        return;
      }

      setStep("confirmed");
    } catch (err) {
      console.error("Direct booking error:", err);
      setSubmitError("Connection error. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep("schedule");
    setSelectedDate(null);
    setSelectedTime("");
    setFormData({ name: "", phone: "", email: "", notes: "" });
    setSubmitError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B3C2D]/60 backdrop-blur-sm transition-opacity"
        onClick={resetAndClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#0B3C2D]/15 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="bg-[#0B3C2D] text-white px-5 sm:px-7 py-4.5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#D98A2B] text-white flex items-center justify-center shadow-sm">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-lg sm:text-xl text-white leading-tight">
                {step === "confirmed" ? "Session Confirmed" : "Book Confidential Counseling"}
              </h3>
              <p className="text-[11px] text-[#A8C3B5] tracking-wide">
                Directly with Nikunj Dhanani • 100% Private
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1 & 2: Service Selection Tabs */}
          {step !== "confirmed" && (
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B3C2D] block">
                1. Select Focus Area
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {COUNSELING_SERVICES.map((srv) => {
                  const Icon = srv.icon;
                  const isCurrent = selectedService === srv.name;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv.name)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isCurrent
                          ? "border-[#0B3C2D] bg-[#0B3C2D] text-white shadow-sm"
                          : "border-[#0B3C2D]/15 bg-[#F8F4EE]/60 hover:bg-white text-[#13221C]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon
                          className={`w-4.5 h-4.5 ${
                            isCurrent ? "text-[#D98A2B]" : "text-[#0B3C2D]"
                          }`}
                        />
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-[#D98A2B]"></span>
                        )}
                      </div>
                      <div>
                        <span className={`block font-bold text-xs leading-snug ${isCurrent ? "text-white" : "text-[#0B3C2D]"}`}>
                          {srv.name}
                        </span>
                        <span className={`block text-[10px] line-clamp-1 mt-0.5 ${isCurrent ? "text-[#E4EEE9]" : "text-ink-muted"}`}>
                          {srv.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 1: Date & Time Picker */}
          {step === "schedule" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B3C2D]">
                  2. Choose Preferred Date & Time
                </label>
                {selectedDate && selectedTime && (
                  <span className="text-xs font-bold text-[#D98A2B]">
                    {selectedDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} at {selectedTime}
                  </span>
                )}
              </div>

              {/* Embed Calendar Component */}
              <div className="border border-[#0B3C2D]/10 rounded-2xl p-2 sm:p-3 bg-[#F8F4EE]/40">
                <CalendarBooking
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateSelect={(d) => setSelectedDate(d)}
                  onTimeSelect={(t) => setSelectedTime(t)}
                />
              </div>

              {/* Continue to Details Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep("contact")}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition-all"
                >
                  Continue to Contact Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Contact Form */}
          {step === "contact" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#0B3C2D]/10 pb-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#0B3C2D]">
                  <Calendar className="w-4 h-4 text-[#D98A2B]" />
                  <span>
                    {selectedDate?.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })} at {selectedTime}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("schedule")}
                  className="text-xs font-bold text-[#D98A2B] hover:underline"
                >
                  Change Slot
                </button>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B3C2D] block">
                  3. Your Confidential Details
                </label>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0B3C2D]/20 focus:border-[#0B3C2D] focus:outline-none text-xs text-ink-navy bg-[#F8F4EE]/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Mobile Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none text-xs text-ink-navy bg-[#F8F4EE]/40 ${
                        phoneError ? "border-red-500" : "border-[#0B3C2D]/20 focus:border-[#0B3C2D]"
                      }`}
                    />
                    {phoneError && (
                      <p className="text-[10px] text-red-500 mt-1">{phoneError}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#0B3C2D]/20 focus:border-[#0B3C2D] focus:outline-none text-xs text-ink-navy bg-[#F8F4EE]/40"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe what you're hoping to work through (Optional & 100% Confidential)..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0B3C2D]/20 focus:border-[#0B3C2D] focus:outline-none text-xs text-ink-navy bg-[#F8F4EE]/40 resize-none"
                  />
                </div>
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                  {submitError}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep("schedule")}
                  className="px-5 py-2.5 rounded-full border border-[#0B3C2D]/20 text-[#0B3C2D] font-bold text-xs hover:bg-[#F8F4EE] transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] disabled:opacity-60 text-white font-bold text-xs shadow-md transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Confirming Session...
                    </span>
                  ) : (
                    "Confirm & Schedule Session"
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-ink-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B3C2D]" />
                <span>Zero spam • 100% strictly confidential care</span>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmed with Google Calendar Sync & 1-Click Link */}
          {step === "confirmed" && (
            <div className="text-center py-4 space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-[#E8F3EE] text-[#0B3C2D] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#0B3C2D]" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-serif-display font-bold text-[#0B3C2D]">
                  Session Reserved Successfully!
                </h4>
                <p className="text-xs text-ink-muted max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your session for{" "}
                  <strong>{selectedService}</strong> has been secured in the calendar.
                </p>
              </div>

              {/* Appointment Card */}
              <div className="bg-[#F8F4EE] rounded-2xl p-4 max-w-md mx-auto border border-[#0B3C2D]/10 text-xs font-bold text-[#0B3C2D] space-y-1.5 shadow-2xs">
                <p className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#D98A2B]" />
                  <span>
                    {selectedDate?.toLocaleDateString("en-IN", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <p className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4 text-[#D98A2B]" />
                  <span>{selectedTime}</span>
                </p>
              </div>

              {/* 1-Click Google Calendar Button */}
              <div className="space-y-2 pt-1 max-w-sm mx-auto">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md hover-lift transition-all"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to your Google Calendar
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80" />
                </a>
                <p className="text-[11px] text-ink-muted">
                  A WhatsApp and email reminder with your private session link has also been queued.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-full bg-[#0B3C2D] hover:bg-[#07291f] text-white text-xs font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
