"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Star,
  BookmarkCheck,
  HeartHandshake,
  ArrowLeft,
  Layers,
  X
} from "lucide-react";
import LeafMotif from "@/components/LeafMotif";

interface ReviewSeed {
  category: string;
  subType: string;
  mode: "counseling" | "visa";
  text: string;
}

export default function ReviewGeneratorPage() {
  // Selected Filter Pills (Counseling Practice Mode Only)
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  // Review Text state - Default is BLANK as requested
  const [reviewText, setReviewText] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [rating, setRating] = useState<number>(5);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // Generation & AI simulation states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [submittedAuthor, setSubmittedAuthor] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Reviews pool loaded from server or seed fallback
  const [reviewsPool, setReviewsPool] = useState<ReviewSeed[]>([]);
  const [lastIndex, setLastIndex] = useState<number>(-1);

  // Recently saved site reviews
  const [recentSavedReviews, setRecentSavedReviews] = useState<any[]>([]);

  // Fetch seeds and existing reviews on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/reviews?seeds=true&mode=counseling");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const counselingOnly = data.data.filter((r: ReviewSeed) => r.mode === "counseling");
          setReviewsPool(counselingOnly.length > 0 ? counselingOnly : data.data);
        }
      } catch (err) {
        console.log("Could not load seeds:", err);
      }

      try {
        const resReviews = await fetch("/api/reviews");
        const rData = await resReviews.json();
        if (rData.success && Array.isArray(rData.data)) {
          setRecentSavedReviews(rData.data.slice(0, 4));
        }
      } catch (err) {
        console.log("Could not load stored reviews:", err);
      }
    }
    loadData();
  }, []);

  // Counseling Practice Focus Areas
  const counselingFocus = [
    { label: "All Focus Areas", id: "All", icon: "✨" },
    { label: "Parenting Coaching", id: "Parenting Coaching", icon: "🌱" },
    { label: "Relationship Repair", id: "Relationship Repair", icon: "❤️" },
    { label: "Corporate Burnout", id: "Corporate Burnout", icon: "💼" },
    { label: "Life Coaching", id: "Life Coaching", icon: "🧭" },
    { label: "Teen Counseling", id: "Teen Counseling", icon: "🎓" },
    { label: "Emotional Wellness", id: "Emotional Wellness", icon: "🧘" },
    { label: "Communication", id: "Communication", icon: "💬" },
  ];

  // Counseling Practice Formats
  const counselingFormats = [
    { label: "All Formats", id: "All", icon: "✨" },
    { label: "1-on-1 Sessions", id: "1-on-1 Sessions", icon: "👤" },
    { label: "Online Video", id: "Online Video", icon: "💻" },
    { label: "Couple Therapy", id: "Couple Therapy", icon: "🤝" },
    { label: "Family Sessions", id: "Family Sessions", icon: "🏡" },
    { label: "Executive Coaching", id: "Executive Coaching", icon: "👔" },
  ];

  // Dynamic Typewriter / AI Generation Animation
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const simulateAITyping = (fullText: string) => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    
    let currentIndex = 0;
    setReviewText("");
    
    typingTimerRef.current = setInterval(() => {
      currentIndex += 3;
      if (currentIndex >= fullText.length) {
        setReviewText(fullText);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setIsGenerating(false);
      } else {
        setReviewText(fullText.slice(0, currentIndex));
      }
    }, 12);
  };

  // Generate / Randomly Swap Review (swaps randomly across 30 reviews in DB/seeds)
  const handleGenerateOrSwap = (categoryOverride?: string, typeOverride?: string) => {
    const activeCat = categoryOverride !== undefined ? categoryOverride : selectedCategory;
    const activeTyp = typeOverride !== undefined ? typeOverride : selectedType;

    setIsGenerating(true);

    let candidates = reviewsPool.filter((r) => r.mode === "counseling" || !r.mode);

    // Optional category match
    if (activeCat !== "All") {
      const matched = candidates.filter(
        (r) => r.category.toLowerCase() === activeCat.toLowerCase()
      );
      if (matched.length > 0) {
        candidates = matched;
      }
    }

    // Optional format match
    if (activeTyp !== "All") {
      const matched = candidates.filter(
        (r) => r.subType?.toLowerCase() === activeTyp.toLowerCase()
      );
      if (matched.length > 0) {
        candidates = matched;
      }
    }

    // Fallback if empty
    if (candidates.length === 0) {
      candidates = [
        {
          category: activeCat,
          subType: activeTyp,
          mode: "counseling",
          text: "Working with Nikunj Dhanani provided our family with deep emotional clarity and practical frameworks that gave us back daily peace. Highly recommended."
        }
      ];
    }

    let nextIdx = Math.floor(Math.random() * candidates.length);
    if (candidates.length > 1 && nextIdx === lastIndex) {
      nextIdx = (nextIdx + 1) % candidates.length;
    }
    setLastIndex(nextIdx);

    const chosen = candidates[nextIdx];

    setTimeout(() => {
      simulateAITyping(chosen.text);
    }, 220);
  };

  // Copy to Clipboard handler
  const handleCopyReview = async () => {
    if (!reviewText.trim()) return;
    try {
      await navigator.clipboard.writeText(reviewText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.log("Clipboard error:", err);
    }
  };

  // Post Review handler (Requires Name, non-technical, animates like 2nd image)
  const handlePostReview = async () => {
    // 1. Validate Name is required
    if (!clientName.trim()) {
      setNameError("Please enter your name before posting your review.");
      nameInputRef.current?.focus();
      return;
    }
    setNameError("");

    // 2. Validate Review Text
    if (!reviewText.trim()) {
      alert("Please generate or enter your review before posting.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        name: clientName.trim(),
        rating: rating,
        category: selectedCategory !== "All" ? selectedCategory : "General Counseling",
        subType: selectedType !== "All" ? selectedType : "General",
        reviewText: reviewText.trim(),
        isAIGenerated: true,
      };

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Capture author name for celebration modal before clearing
        setSubmittedAuthor(clientName.trim());
        // Trigger celebratory animated modal
        setSaveSuccess(true);

        // Prepend to recent reviews list
        setRecentSavedReviews((prev) => [data.data, ...prev]);

        // Copy text for user's convenience too
        try {
          await navigator.clipboard.writeText(reviewText);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2500);
        } catch (e) {}

        // Clear all form fields
        setReviewText("");
        setClientName("");
        setSelectedCategory("All");
        setSelectedType("All");
        setRating(5);
        setNameError("");
      } else {
        alert(data.error || "Failed to post your review. Please try again.");
      }
    } catch (err) {
      console.log("Error posting review:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const wordCount = reviewText.trim() ? reviewText.trim().split(/\s+/).length : 0;

  // Celebratory Confetti Elements for 2nd Image Animation
  const confettiList = [
    { top: "8%", left: "12%", color: "bg-[#06B6D4]", rotate: "rotate-12", width: "w-3 h-1.5" },
    { top: "6%", left: "28%", color: "bg-[#F43F5E]", rotate: "-rotate-45", width: "w-2.5 h-1.5" },
    { top: "14%", left: "42%", color: "bg-[#F59E0B]", rotate: "rotate-45", width: "w-2 h-2" },
    { top: "10%", left: "70%", color: "bg-[#10B981]", rotate: "-rotate-12", width: "w-3 h-1.5" },
    { top: "12%", left: "86%", color: "bg-[#F43F5E]", rotate: "rotate-90", width: "w-2.5 h-1.5" },
    { top: "25%", left: "8%", color: "bg-[#F59E0B]", rotate: "rotate-30", width: "w-2 h-2" },
    { top: "22%", left: "90%", color: "bg-[#06B6D4]", rotate: "-rotate-30", width: "w-3 h-1.5" },
    { top: "35%", left: "15%", color: "bg-[#10B981]", rotate: "rotate-45", width: "w-2.5 h-1.5" },
    { top: "42%", left: "85%", color: "bg-[#F43F5E]", rotate: "-rotate-60", width: "w-3 h-1.5" },
    { top: "65%", left: "10%", color: "bg-[#06B6D4]", rotate: "rotate-15", width: "w-2 h-2" },
    { top: "68%", left: "88%", color: "bg-[#F59E0B]", rotate: "-rotate-45", width: "w-2.5 h-1.5" },
    { top: "80%", left: "18%", color: "bg-[#F43F5E]", rotate: "rotate-60", width: "w-3 h-1.5" },
    { top: "84%", left: "80%", color: "bg-[#10B981]", rotate: "-rotate-15", width: "w-2 h-2" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 text-[#13221C] antialiased">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Top Navigation Row: Back to Home Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#0B3C2D] font-bold text-xs sm:text-sm border border-[#E4DDD0] transition-all shadow-xs hover-lift"
          >
            <ArrowLeft className="w-4 h-4 text-[#D98A2B]" />
            <span>Back to Home</span>
          </Link>

          <span className="text-xs font-semibold text-[#8C847C] hidden sm:inline-flex items-center">
            <LeafMotif className="w-3.5 h-3.5 mr-1.5 text-[#0B3C2D]" />
            Nikunj Dhanani Counseling Practice
          </span>
        </div>

        {/* Top Floating Brand Card / Rating Header (Exact match to screenshot) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E4DDD0] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-[#0B3C2D] flex items-center justify-center text-white shadow-sm">
              <LeafMotif className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold font-serif-display text-[#0B3C2D] block">
                N. DHANANI
              </span>
              <span className="text-[10px] font-bold text-[#D98A2B] uppercase tracking-widest block -mt-1">
                Family Counselor & Life Coach
              </span>
            </div>
          </div>

          {/* 5-Star Rating Tag */}
          <div className="flex items-center space-x-1.5 bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#E4DDD0]">
            <div className="flex items-center text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-black text-[#13221C] ml-1">5.0</span>
          </div>
        </div>

        {/* Main Generator Card (Exact UI Layout from Screenshot) */}
        <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-lg border border-[#E4DDD0] space-y-7">
          
          {/* Header Row: Title & AI POWERED Badge */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#13221C] tracking-tight">
                Client Review Generator
              </h1>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#6366F1]/15 to-[#A855F7]/15 text-[#6366F1] border border-[#6366F1]/30 shadow-2xs">
                <Sparkles className="w-3 h-3 mr-1 text-[#6366F1]" />
                AI POWERED
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5E5852] leading-relaxed">
              Select options below to generate an AI-assisted review, or write your own thoughts. Post your review to share your genuine experience with other families!
            </p>
          </div>

          {/* SECTION 1: PRACTICE FOCUS AREA (OPTIONAL) */}
          <div className="space-y-2.5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#5E5852]">
              1. PRACTICE FOCUS AREA (OPTIONAL)
            </label>

            <div className="flex flex-wrap gap-2">
              {counselingFocus.map((focus) => {
                const isSelected = selectedCategory === focus.id;
                return (
                  <button
                    key={focus.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(focus.id);
                      handleGenerateOrSwap(focus.id, selectedType);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
                      isSelected
                        ? "bg-[#0B3C2D] text-white border-[#0B3C2D] shadow-sm scale-[1.02]"
                        : "bg-[#F8F4EE] text-[#13221C] border-[#E4DDD0] hover:bg-[#EDE7DA]"
                    }`}
                  >
                    <span className="text-sm">{focus.icon}</span>
                    <span>{focus.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: SESSION FORMAT (OPTIONAL) */}
          <div className="space-y-2.5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#5E5852]">
              2. SESSION FORMAT (OPTIONAL)
            </label>

            <div className="flex flex-wrap gap-2">
              {counselingFormats.map((format) => {
                const isSelected = selectedType === format.id;
                return (
                  <button
                    key={format.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(format.id);
                      handleGenerateOrSwap(selectedCategory, format.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
                      isSelected
                        ? "bg-[#0B3C2D] text-white border-[#0B3C2D] shadow-sm scale-[1.02]"
                        : "bg-[#F8F4EE] text-[#13221C] border-[#E4DDD0] hover:bg-[#EDE7DA]"
                    }`}
                  >
                    <span className="text-sm">{format.icon}</span>
                    <span>{format.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: GENERATED REVIEW BOX (Default Blank as commanded) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold uppercase tracking-wider text-[#5E5852]">
                GENERATED REVIEW {wordCount > 0 ? `(~${wordCount} WORDS)` : "(~30 WORDS)"}
              </span>
              <span className="font-bold text-[#8C847C] flex items-center space-x-1">
                {isGenerating ? (
                  <span className="text-[#0B3C2D] flex items-center">
                    <Sparkles className="w-3 h-3 animate-spin mr-1 text-[#D98A2B]" />
                    AI Generating...
                  </span>
                ) : reviewText.trim() ? (
                  <span className="text-[#10B981] flex items-center">
                    <Check className="w-3 h-3 mr-0.5" />
                    Ready to post
                  </span>
                ) : (
                  <span>Click Regenerate or select options</span>
                )}
              </span>
            </div>

            {/* Interactive Review Box */}
            <div className="relative group">
              <textarea
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Click 'Regenerate' below or select a category to auto-generate a natural AI-assisted review. You can also write your own custom thoughts directly here..."
                className="w-full p-4 sm:p-5 pr-12 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm sm:text-base font-medium text-[#1E293B] focus:outline-none focus:border-[#0B3C2D] focus:bg-white transition-all shadow-inner leading-relaxed resize-y"
              />

              {/* In-box Quick Copy Button */}
              {reviewText.trim() && (
                <button
                  type="button"
                  onClick={handleCopyReview}
                  className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] transition-all shadow-xs"
                  title="Copy review text"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-[#10B981]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* REQUIRED Name Field & Star Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#13221C] mb-1">
                Your Full Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                ref={nameInputRef}
                type="text"
                required
                placeholder="e.g. Priya Sharma or Siddharth Mehta"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (nameError) setNameError("");
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold text-[#1E293B] focus:outline-none transition-all ${
                  nameError
                    ? "border-red-500 bg-red-50/30 focus:border-red-500"
                    : "border-[#E2E8F0] bg-[#F8FAFC] focus:border-[#0B3C2D] focus:bg-white"
                }`}
              />
              {nameError && (
                <p className="text-[11px] font-bold text-red-600 mt-1">
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5E5852] mb-1">
                Rating Stars
              </label>
              <div className="flex items-center space-x-1.5 py-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 text-[#F59E0B] hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        s <= rating ? "fill-current text-[#F59E0B]" : "text-[#D1D5DB]"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#5E5852] ml-2">{rating}.0 / 5.0</span>
              </div>
            </div>
          </div>

          {/* BOTTOM ACTION BUTTONS */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            
            {/* Primary Button: Post Review */}
            <button
              type="button"
              onClick={handlePostReview}
              disabled={isSaving || !reviewText.trim()}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-white transition-all shadow-md flex items-center justify-center space-x-2.5 glow-btn ${
                !reviewText.trim()
                  ? "bg-[#D1D5DB] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309]"
              }`}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Posting Review...</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-5 h-5" />
                  <span>Post Review</span>
                </>
              )}
            </button>

            {/* Secondary Button: Regenerate / Swap Randomly */}
            <button
              type="button"
              onClick={() => handleGenerateOrSwap()}
              disabled={isGenerating}
              className="py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-[#0D9488] hover:bg-[#0F766E] transition-all shadow-md flex items-center justify-center space-x-2 shrink-0"
            >
              <RefreshCw className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`} />
              <span>Regenerate</span>
            </button>
          </div>

        </div>

        {/* Recently Submitted Reviews Section */}
        {recentSavedReviews.length > 0 && (
          <div className="space-y-3 pt-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#5E5852] flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-[#0B3C2D]" />
                <span>Recent Client Reviews ({recentSavedReviews.length})</span>
              </h3>
              <span className="text-[11px] font-bold text-[#8CA899]">Verified Feedback</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {recentSavedReviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-white p-4 rounded-2xl border border-[#E4DDD0] shadow-xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-[#F59E0B]">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569]">
                        {rev.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#334155] line-clamp-3 leading-relaxed">
                      "{rev.reviewText}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#94A3B8]">
                    <span className="font-semibold text-[#64748B]">{rev.name || "Client"}</span>
                    <span>
                      {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── CELEBRATORY SUBMISSION MODAL (Exact match to 2nd image animation) ── */}
      {saveSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#13221C]/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-7 sm:p-9 shadow-2xl border border-[#E4DDD0] text-center overflow-hidden animate-fade-up">
            
            {/* Multi-colored Confetti Flakes (Matching 2nd image) */}
            {confettiList.map((c, idx) => (
              <div
                key={idx}
                className={`absolute ${c.width} ${c.color} ${c.rotate} rounded-xs pointer-events-none opacity-85 animate-confetti`}
                style={{ top: c.top, left: c.left }}
              />
            ))}

            {/* Close Button */}
            <button
              onClick={() => setSaveSuccess(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C847C] hover:bg-[#FAF8F5] transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Concentric Green Circle Checkmark Emblem (Image 2 style) */}
            <div className="relative my-4 flex items-center justify-center">
              {/* Outer soft glowing green halo */}
              <div className="w-28 h-28 rounded-full bg-[#E6F4EA] animate-halo-pulse flex items-center justify-center">
                {/* Inner solid green circle */}
                <div className="w-16 h-16 rounded-full bg-[#0F9D58] text-white flex items-center justify-center shadow-lg shadow-[#0F9D58]/30 animate-success-pop">
                  {/* Double Checkmark Icon (Exact match to 2nd image) */}
                  <svg
                    className="w-8 h-8 text-white stroke-current"
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

            {/* Heading & Friendly Non-Technical Subtitle */}
            <div className="space-y-2 mt-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#13221C] tracking-tight">
                Review Submitted!
              </h2>
              <p className="text-xs sm:text-sm text-[#5E5852] leading-relaxed">
                Thank you, <strong className="text-[#13221C]">{submittedAuthor || "Client"}</strong>! Your feedback has been shared with Nikunj Dhanani.
              </p>
            </div>

            {/* Done Action Buttons */}
            <div className="mt-6 pt-2 space-y-2">
              <button
                onClick={() => setSaveSuccess(false)}
                className="w-full py-3 px-5 rounded-2xl bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                Done
              </button>

              <Link
                href="/"
                className="block text-xs font-bold text-[#8C847C] hover:text-[#0B3C2D] py-1 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
