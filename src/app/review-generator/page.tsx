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

import {
  AlertDialog,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/animate-ui/components/base/alert-dialog";

interface ReviewSeed {
  category: string;
  subType: string;
  mode?: "counseling";
  text: string;
}

const confettiList = [
  { top: "12%", left: "15%", width: "w-2 h-3.5", color: "bg-[#EA580C]", rotate: "rotate-12" },
  { top: "18%", left: "82%", width: "w-3 h-2", color: "bg-[#0F9D58]", rotate: "-rotate-45" },
  { top: "25%", left: "10%", width: "w-2.5 h-2.5", color: "bg-[#F59E0B]", rotate: "rotate-45" },
  { top: "35%", left: "88%", width: "w-2 h-4", color: "bg-[#3B82F6]", rotate: "rotate-12" },
  { top: "65%", left: "8%", width: "w-3 h-2", color: "bg-[#EC4899]", rotate: "-rotate-12" },
  { top: "72%", left: "85%", width: "w-2.5 h-3", color: "bg-[#8B5CF6]", rotate: "rotate-45" },
  { top: "82%", left: "18%", width: "w-2 h-3", color: "bg-[#10B981]", rotate: "-rotate-30" },
  { top: "85%", left: "78%", width: "w-3 h-2", color: "bg-[#F97316]", rotate: "rotate-60" },
];

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
  const [saveError, setSaveError] = useState<string>("");
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
    setSaveError("");
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
        setSubmittedAuthor(clientName.trim());
        setSaveSuccess(true);
        setRecentSavedReviews((prev) => [data.data, ...prev]);
        try {
          await navigator.clipboard.writeText(reviewText);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2500);
        } catch (e) {}
        setReviewText("");
        setClientName("");
        setSelectedCategory("All");
        setSelectedType("All");
        setRating(5);
        setSaveError("");
      } else {
        setSaveError(data.error || "Failed to post your review. Please try again.");
      }
    } catch (err) {
      console.log("Error posting review:", err);
      setSaveError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const wordCount = reviewText.trim() ? reviewText.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-4 sm:py-8 md:py-10 px-3.5 sm:px-6 lg:px-8 text-[#13221C] antialiased">
      <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-5">

        {/* Top Navigation Row: Back to Home Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#0B3C2D] font-bold text-xs sm:text-sm border border-[#E4DDD0] transition-all shadow-xs hover-lift active:scale-95 touch-manipulation"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D98A2B]" />
            <span>Back to Home</span>
          </Link>

          <span className="text-xs font-semibold text-[#8C847C] hidden sm:inline-flex items-center">
            <LeafMotif className="w-3.5 h-3.5 mr-1.5 text-[#0B3C2D]" />
            Nikunj Dhanani Counseling Practice
          </span>
        </div>

        {/* Top Floating Brand Card / Rating Header */}
        <div className="bg-white rounded-2xl p-3 sm:p-5 shadow-sm border border-[#E4DDD0] flex items-center justify-between gap-2.5">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0B3C2D] flex items-center justify-center text-white shadow-sm shrink-0">
              <LeafMotif className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-lg font-bold font-serif-display text-[#0B3C2D] block leading-tight truncate">
                NIKUNJ DHANANI
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#D98A2B] uppercase tracking-wider block mt-0.5 truncate">
                Family Counselor & Life Coach
              </span>
            </div>
          </div>

          {/* 5-Star Rating Tag */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 bg-[#FAF8F5] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#E4DDD0] shrink-0">
            <div className="flex items-center text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs font-black text-[#13221C] ml-0.5 sm:ml-1">5.0</span>
          </div>
        </div>

        {/* Main Generator Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-lg border border-[#E4DDD0] space-y-4 sm:space-y-6">
          
          {/* Header Row: Title & AI POWERED Badge */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#13221C] tracking-tight">
                Client Review Generator
              </h1>
              
              <span className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#6366F1]/15 to-[#A855F7]/15 text-[#6366F1] border border-[#6366F1]/30 shadow-2xs shrink-0">
                <Sparkles className="w-3 h-3 mr-1 text-[#6366F1]" />
                AI POWERED
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5E5852] leading-relaxed">
              Select options below to generate an AI-assisted review, or write your own thoughts. Post your review to share your genuine experience with other families!
            </p>
          </div>

          {/* SECTION 1: PRACTICE FOCUS AREA (OPTIONAL) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#5E5852]">
                1. PRACTICE FOCUS AREA (OPTIONAL)
              </label>
              <span className="text-[10px] font-semibold text-[#8C847C] sm:hidden">
                Swipe →
              </span>
            </div>

            {/* Mobile Horizontal Swipe / Desktop Wrapped Pills */}
            <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-1.5 sm:gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-1 pt-0.5 touch-pan-x">
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
                    className={`shrink-0 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border whitespace-nowrap active:scale-95 touch-manipulation ${
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#5E5852]">
                2. SESSION FORMAT (OPTIONAL)
              </label>
              <span className="text-[10px] font-semibold text-[#8C847C] sm:hidden">
                Swipe →
              </span>
            </div>

            {/* Mobile Horizontal Swipe / Desktop Wrapped Pills */}
            <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-1.5 sm:gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-1 pt-0.5 touch-pan-x">
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
                    className={`shrink-0 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border whitespace-nowrap active:scale-95 touch-manipulation ${
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

          {/* SECTION 3: GENERATED REVIEW BOX */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
              <span className="font-extrabold uppercase tracking-wider text-[#5E5852] text-[11px] sm:text-xs">
                GENERATED REVIEW <span className="text-[#8C847C] font-normal">{wordCount > 0 ? `(${wordCount} words)` : "(~30 words)"}</span>
              </span>
              <span className="font-bold text-[#8C847C] text-[11px] sm:text-xs flex items-center space-x-1">
                {isGenerating ? (
                  <span className="text-[#0B3C2D] flex items-center">
                    <Sparkles className="w-3 h-3 animate-spin mr-1 text-[#D98A2B]" />
                    Generating...
                  </span>
                ) : reviewText.trim() ? (
                  <span className="text-[#10B981] flex items-center">
                    <Check className="w-3 h-3 mr-0.5" />
                    Ready to post
                  </span>
                ) : (
                  <span className="hidden xs:inline">Select options or write</span>
                )}
              </span>
            </div>

            {/* Interactive Review Box */}
            <div className="relative group">
              <textarea
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Click 'Regenerate' below or select a category to auto-generate a review. You can also write your own thoughts directly here..."
                className="w-full p-3.5 sm:p-5 pr-11 sm:pr-12 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-base sm:text-base font-medium text-[#1E293B] focus:outline-none focus:border-[#0B3C2D] focus:bg-white transition-all shadow-inner leading-relaxed resize-y min-h-[120px]"
              />

              {/* In-box Quick Copy Button */}
              {reviewText.trim() && (
                <button
                  type="button"
                  onClick={handleCopyReview}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] transition-all shadow-xs touch-manipulation active:scale-90"
                  title="Copy review text"
                  aria-label="Copy review text"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#13221C] mb-1">
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
                if (saveError) setSaveError("");
              }}
              className={`w-full px-3.5 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm font-semibold text-[#1E293B] focus:outline-none transition-all ${
                saveError ? "border-red-500 bg-red-50/30 focus:border-red-500" : "border-[#E2E8F0] bg-[#F8FAFC] focus:border-[#0B3C2D] focus:bg-white"
              }`}
            />
            {saveError && (
              <p className="text-[11px] font-bold text-red-600 mt-1">
                {saveError}
              </p>
            )}
          </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#5E5852] mb-1">
                Rating Stars
              </label>
              <div className="flex items-center space-x-1 sm:space-x-1.5 py-1.5 sm:py-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1.5 sm:p-1 text-[#F59E0B] hover:scale-110 active:scale-125 transition-transform touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg"
                    aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`w-5 h-5 sm:w-5 sm:h-5 ${
                        s <= rating ? "fill-current text-[#F59E0B]" : "text-[#D1D5DB]"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#5E5852] ml-1 sm:ml-2">{rating}.0 / 5.0</span>
              </div>
            </div>
          </div>

          {/* BOTTOM ACTION BUTTONS */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
            
            {/* Secondary Button: Regenerate / Swap Randomly */}
            <button
              type="button"
              onClick={() => handleGenerateOrSwap()}
              disabled={isGenerating}
              className="w-full sm:w-auto py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-[#0D9488] hover:bg-[#0F766E] active:scale-[0.98] transition-all shadow-md flex items-center justify-center space-x-2 shrink-0 touch-manipulation"
            >
              <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isGenerating ? "animate-spin" : ""}`} />
              <span>Regenerate</span>
            </button>

            {/* Primary Button: Post Review */}
            <button
              type="button"
              onClick={handlePostReview}
              disabled={isSaving || !reviewText.trim()}
              className={`w-full flex-1 py-3.5 sm:py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-white active:scale-[0.98] transition-all shadow-md flex items-center justify-center space-x-2.5 glow-btn touch-manipulation ${
                !reviewText.trim()
                  ? "bg-[#D1D5DB] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309]"
              }`}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span>Posting Review...</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Post Review</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Recently Submitted Reviews Section */}
        {recentSavedReviews.length > 0 && (
          <div className="space-y-3 pt-2 sm:pt-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#5E5852] flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-[#0B3C2D]" />
                <span>Recent Client Reviews ({recentSavedReviews.length})</span>
              </h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#8CA899]">Verified Feedback</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {recentSavedReviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E4DDD0] shadow-xs space-y-2 flex flex-col justify-between hover-lift"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center text-[#F59E0B]">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] truncate max-w-[140px]">
                        {rev.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#334155] line-clamp-3 leading-relaxed">
                      "{rev.reviewText}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#94A3B8]">
                    <span className="font-semibold text-[#64748B] truncate max-w-[150px]">{rev.name || "Client"}</span>
                    <span className="shrink-0">
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

      {/* ── CELEBRATORY SUBMISSION ALERT DIALOG (animate-ui animated alert-dialog with from="bottom") ── */}
      <AlertDialog open={saveSuccess} onOpenChange={setSaveSuccess}>
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
            onClick={() => setSaveSuccess(false)}
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
            <AlertDialogTitle className="text-lg sm:text-2xl">Review Submitted!</AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm">
              Thank you, <strong className="text-[#13221C]">{submittedAuthor || "Client"}</strong>! Your feedback has been shared with Nikunj Dhanani.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col sm:flex-col gap-2 mt-4">
            <AlertDialogAction
              onClick={() => setSaveSuccess(false)}
              className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-[#0B3C2D] hover:bg-[#07291f] text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 touch-manipulation"
            >
              Done
            </AlertDialogAction>
            <Link
              href="/"
              onClick={() => setSaveSuccess(false)}
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
