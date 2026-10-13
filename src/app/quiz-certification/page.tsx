"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CreditCard,
  User,
  Mail,
  Phone,
  FileCheck,
  Sparkles,
  Lock,
  Check,
  RefreshCw,
  BookOpen,
  Printer,
  ChevronRight,
  Send,
  HelpCircle,
  Shield,
  LogOut,
  Download,
  X,
  Maximize2,
} from "lucide-react";


interface Question {
  id: number;
  question: string;
  options: string[];
}

interface EvaluationResult {
  scoreMarks: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  timeExpired: boolean;
  breakdown: Array<{
    questionId: number;
    userAnswer: number | null;
    isCorrect: boolean;
  }>;
}

interface CertificateData {
  certificateId: string;
  candidateName: string;
  courseName: string;
  scoreMarks: number;
  totalMarks: number;
  scorePercentage: number;
  issueDate: string;
  status: string;
  watermark: string;
  disclaimer: string;
  isTestPreview: boolean;
}

export default function QuizCertificationPage() {
  // Step navigation: 1 = Overview, 2 = Register, 3 = Payment, 4 = Quiz, 5 = Result, 6 = Certificate Preview
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Registration state — no autofill, user must enter everything
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agreedToTerms: false,
  });
  const [regError, setRegError] = useState("");
  const [registrationId, setRegistrationId] = useState<string>("");
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);

  // Payment state
  const [paymentStatus, setPaymentStatus] = useState<"unpaid" | "verified" | "failed" | "cancelled">("unpaid");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState("");

  // Quiz state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizStartedAt, setQuizStartedAt] = useState<string>("");
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(600); // 10 minutes = 600s
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Result & Certificate state
  const [attemptId, setAttemptId] = useState<string>("");
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);
  const [certPercent, setCertPercent] = useState<number>(0);
  const [certStageText, setCertStageText] = useState<string>("Initializing verification...");
  const [certError, setCertError] = useState("");
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNoAnswerWarning, setShowNoAnswerWarning] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showQuizDisclaimer, setShowQuizDisclaimer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [showTimeExpiredModal, setShowTimeExpiredModal] = useState(false);
  const [isStartingQuiz, setIsStartingQuiz] = useState(false);
  const [showFullscreenCert, setShowFullscreenCert] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // Generate genuine certificate verification QR code linked to actual certificate ID
  useEffect(() => {
    if (certificate?.certificateId) {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://www.nikunjdhanani.com";
      const verifyUrl = `${origin}/quiz-certification/verify/${certificate.certificateId}`;
      QRCode.toDataURL(verifyUrl, {
        width: 140,
        margin: 1,
        color: {
          dark: "#124C3B",
          light: "#FFFDF9",
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error("QR Code generation error:", err));
    }
  }, [certificate?.certificateId]);

  // Automated QA matrix state
  const [qaResults, setQaResults] = useState<unknown[]>([]);
  const [isRunningQa, setIsRunningQa] = useState(false);
  const [activeTab, setActiveTab] = useState<"onboarding" | "qa_matrix">("onboarding");

  // Escape key handler for fullscreen certificate preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowFullscreenCert(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Session storage key for persisting in-progress quiz
  const QUIZ_STORAGE_KEY = "quiz_certification_progress";

  // Save quiz progress to sessionStorage whenever critical state changes
  useEffect(() => {
    if (isQuizActive && currentStep === 4) {
      try {
        const progress = {
          answers,
          currentQIndex,
          timeLeftSeconds,
          quizStartedAt,
          questions,
          registrationId,
          savedAt: new Date().toISOString(),
        };
        sessionStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(progress));
      } catch {
        // sessionStorage full or unavailable — fail silently
      }
    }
  }, [answers, currentQIndex, timeLeftSeconds, isQuizActive, currentStep, quizStartedAt, questions, registrationId]);

  // Restore quiz progress from sessionStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(QUIZ_STORAGE_KEY);
      if (raw) {
        const progress = JSON.parse(raw);
        // Only restore if the saved quiz was still active (started within last 15 minutes)
        const savedAt = new Date(progress.savedAt).getTime();
        const now = Date.now();
        if (now - savedAt < 15 * 60 * 1000 && progress.registrationId) {
          setRegistrationId(progress.registrationId);
          setQuestions(progress.questions || []);
          setAnswers(progress.answers || {});
          setCurrentQIndex(progress.currentQIndex || 0);
          setQuizStartedAt(progress.quizStartedAt || new Date().toISOString());
          setTimeLeftSeconds(Math.max(0, progress.timeLeftSeconds || 0));
          setIsQuizActive(true);
          setCurrentStep(4);
        } else {
          // Expired saved session — clean it up
          sessionStorage.removeItem(QUIZ_STORAGE_KEY);
        }
      }
    } catch {
      // Corrupted data — clear it
      sessionStorage.removeItem(QUIZ_STORAGE_KEY);
    }
  }, []);

  // Load questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async (regId?: string, randomize = false) => {
    try {
      const url = regId
        ? `/api/quiz-certificate/submit?registrationId=${encodeURIComponent(regId)}${randomize ? "&randomize=true" : ""}`
        : "/api/quiz-certificate/submit";
      const res = await fetch(url);
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
      }
    } catch (e) {
      console.error("Failed to load question bank:", e);
    }
  };

  // Timer Countdown Effect — pauses when exit modal is open
  useEffect(() => {
    if (isQuizActive && !isPaused && timeLeftSeconds > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isQuizActive && timeLeftSeconds <= 0) {
      setShowTimeExpiredModal(true);
      setTimeout(() => {
        setShowTimeExpiredModal(false);
        handleQuizSubmit(true);
      }, 2500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isQuizActive, timeLeftSeconds, isPaused]);

  // Prevent accidental page refresh/close during active quiz
  useEffect(() => {
    if (!isQuizActive || currentStep !== 4) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Chrome requires returnValue to be set
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isQuizActive, currentStep]);

  // Form handling
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      setRegError("Please review and accept the Terms, Non-Formal Disclaimer & Non-Refundable Policy before continuing.");
      setShowTermsModal(true);
      return;
    }
    setRegError("");
    setIsSubmittingReg(true);

    try {
      const res = await fetch("/api/quiz-certificate/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-test-mode": "true" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          courseId: "cpd-basic-awareness",
          agreedToTerms: formData.agreedToTerms,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRegError(data.error || "Registration failed.");
        setIsSubmittingReg(false);
        return;
      }
      setRegistrationId(data.registration.registrationId);
      setCurrentStep(3); // Proceed to Sandbox Payment
    } catch (err) {
      setRegError("Network error occurred during registration.");
    } finally {
      setIsSubmittingReg(false);
    }
  };

  // Payment Simulation
  const handlePaymentSimulation = async (action: "simulate_success" | "simulate_failure" | "simulate_cancel") => {
    if (!registrationId) {
      setPaymentNotice("Please complete registration before initiating payment.");
      return;
    }
    setIsProcessingPayment(true);
    setPaymentNotice("");

    try {
      const res = await fetch("/api/quiz-certificate/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          amount: 250,
          simulationAction: action,
        }),
      });
      const data = await res.json();

      if (action === "simulate_success" && data.payment?.status === "verified") {
        setPaymentStatus("verified");
        setPaymentNotice("Sandbox payment verified successfully. Quiz unlocked.");
      } else if (action === "simulate_failure") {
        setPaymentStatus("failed");
        setPaymentNotice("Test Payment Declined (Simulated failure - quiz remains locked).");
      } else if (action === "simulate_cancel") {
        setPaymentStatus("cancelled");
        setPaymentNotice("Test Payment Cancelled by user (Quiz remains locked).");
      }
    } catch (e) {
      setPaymentNotice("Payment gateway simulation network error.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Start Quiz — shows disclaimer acknowledgment first
  const startQuiz = async () => {
    if (paymentStatus !== "verified") {
      setPaymentNotice("Verified course payment is required before starting the quiz.");
      return;
    }
    // Show final disclaimer acknowledgment before quiz begins
    setShowQuizDisclaimer(true);
  };

  // Confirm quiz start after disclaimer acknowledgment
  const confirmAndStartQuiz = async () => {
    setShowQuizDisclaimer(false);
    setIsStartingQuiz(true);
    try {
      if (registrationId) {
        await fetchQuestions(registrationId, false);
      }
      setCurrentQIndex(0);
      setAnswers({});
      setQuizStartedAt(new Date().toISOString());
      setTimeLeftSeconds(600); // 10 minutes
      setIsQuizActive(true);
      setCurrentStep(4);
    } catch (err) {
      console.error("Failed to start quiz:", err);
      alert("Failed to load quiz questions. Please try again.");
      setIsStartingQuiz(false);
    }
  };

  // Handle Answer Selection
  const selectAnswer = (questionId: number, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
    setShowNoAnswerWarning(false);
  };

  // Submit Quiz
  const handleQuizSubmit = async (forcedExpired: boolean = false) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsQuizActive(false);
    setIsSubmittingQuiz(true);
    // Clear saved progress — quiz is complete
    try { sessionStorage.removeItem(QUIZ_STORAGE_KEY); } catch { /* noop */ }

    try {
      const submitISO = new Date().toISOString();
      const res = await fetch("/api/quiz-certificate/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          answers,
          startedAt: quizStartedAt,
          submittedAt: submitISO,
          forceExpired: forcedExpired,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Quiz submission failed.");
        setIsSubmittingQuiz(false);
        return;
      }
      setShowReviewScreen(false);
      setShowTimeExpiredModal(false);
      setAttemptId(data.attempt.attemptId);
      setEvaluation(data.evaluation);
      setCurrentStep(5); // Show Results
    } catch (e) {
      alert("Error submitting quiz results.");
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  // Generate Certificate Preview (with Live Dynamic Percentage Loader)
  const handleGenerateCertificate = async () => {
    if (!attemptId) return;
    setIsGeneratingCert(true);
    setCertPercent(0);
    setCertStageText("Initializing security verification & anti-tamper protocol...");
    setCertError("");

    try {
      const res = await fetch("/api/quiz-certificate/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          candidateNameOverride: formData.fullName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCertError(data.error || "Failed to generate certificate preview.");
        setIsGeneratingCert(false);
        return;
      }
      setCertificate(data.certificate);
      setCurrentStep(6); // Step 6 = Certificate Preview (with blur + percentage loader)

      // Live dynamic percentage counter from 0% to 100% (35ms per tick = ~3.5s smooth, responsive progression)
      const stages = [
        { threshold: 20, text: "Verifying candidate completion record..." },
        { threshold: 42, text: "Cryptographically verifying passing score (≥ 50%)..." },
        { threshold: 68, text: "Generating unique certificate ID & high-res vector credentials..." },
        { threshold: 88, text: "Applying digital security watermark & official seal..." },
        { threshold: 99, text: "Finalizing official luxury certificate rendering..." },
      ];

      let currentP = 0;
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          currentP += 1;
          if (currentP > 100) currentP = 100;
          setCertPercent(currentP);

          const matchingStage = stages.find((s) => currentP <= s.threshold);
          if (matchingStage) {
            setCertStageText(matchingStage.text);
          } else if (currentP >= 100) {
            setCertStageText("Certificate Verified & Issued! Unlocking preview...");
          }

          if (currentP >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              resolve();
            }, 300);
          }
        }, 35); // 100 steps * 35ms = ~3.5 seconds
      });

      setIsGeneratingCert(false);
    } catch (e) {
      setCertError("Network error generating certificate preview.");
      setIsGeneratingCert(false);
    }
  };

  // Run Automated QA Matrix
  const runQaMatrix = async () => {
    setIsRunningQa(true);
    try {
      const res = await fetch("/api/quiz-certificate/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "run_all_test_scenarios" }),
      });
      const data = await res.json();
      if (data.results) {
        setQaResults(data.results);
      }
    } catch (e) {
      console.error("QA Matrix error:", e);
    } finally {
      setIsRunningQa(false);
    }
  };

  // Format Time (MM:SS)
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  };

  // ── FULL-SCREEN IMMERSIVE ASSESSMENT EXPERIENCE (STEP 4) ──
  // Replaces the narrow card with a spacious widescreen split layout matching design references 3, 4, 5
  // ── CERTIFICATE CANVAS (LANDSCAPE A4 - NIKUNJ DHANANI BRANDING) ──
  const renderCertificateCanvas = (isPrintTarget: boolean = false) => {
    if (!certificate) return null;
    const actualDate = (!certificate.issueDate || certificate.issueDate === "TEST DATE" || certificate.issueDate === "[ASSESSMENT DATE]")
      ? new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : certificate.issueDate;
    return (
      <div
        id={isPrintTarget ? "certificate-print-area" : undefined}
        className={`relative bg-[#FFFDF9] text-[#124C3B] p-4 sm:p-6 md:p-8 lg:p-9 overflow-hidden transition-all duration-700 aspect-[1.414/1] w-full flex flex-col justify-between min-h-0 select-text ${
          isGeneratingCert ? "filter blur-md select-none pointer-events-none scale-[0.99]" : "filter-none scale-100"
        }`}
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #FFFDF9 0%, #F8F4EA 100%)",
        }}
      >
        {/* ── 1. Top-Left Sweeping Emerald & Gold Ribbon (Vector SVG) ── */}
        <svg
          className="absolute top-0 left-0 w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 pointer-events-none select-none z-0"
          viewBox="0 0 300 300"
          fill="none"
        >
          <path
            d="M 0 0 L 250 0 C 210 60 160 130 90 190 C 45 230 0 250 0 250 Z"
            fill="#0B2F25"
          />
          <path
            d="M 0 0 L 210 0 C 170 55 130 115 70 175 C 35 210 0 228 Z"
            fill="#124C3B"
          />
          <path
            d="M 0 235 C 28 230 65 210 102 170 C 155 116 195 56 225 0 L 236 0 C 205 60 163 122 108 178 C 70 218 31 239 0 245 Z"
            fill="url(#ribbonGoldGradTL)"
          />
          <path
            d="M 0 0 L 160 0 C 125 42 90 90 48 140 C 20 170 0 185 Z"
            fill="#165B47"
          />
          <path
            d="M 0 190 C 18 180 46 160 74 125 C 112 80 142 38 165 0 L 169 0 C 145 40 114 84 76 128 C 47 163 19 183 0 193 Z"
            fill="#E5C158"
          />
          <defs>
            <linearGradient id="ribbonGoldGradTL" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9D5D14" />
              <stop offset="30%" stopColor="#C9A24A" />
              <stop offset="60%" stopColor="#F3D279" />
              <stop offset="100%" stopColor="#B08028" />
            </linearGradient>
          </defs>
        </svg>

        {/* ── 2. Bottom-Right Sweeping Emerald & Gold Ribbon (Vector SVG) ── */}
        <svg
          className="absolute bottom-0 right-0 w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 pointer-events-none select-none z-0 rotate-180"
          viewBox="0 0 300 300"
          fill="none"
        >
          <path
            d="M 0 0 L 250 0 C 210 60 160 130 90 190 C 45 230 0 250 0 250 Z"
            fill="#0B2F25"
          />
          <path
            d="M 0 0 L 210 0 C 170 55 130 115 70 175 C 35 210 0 228 Z"
            fill="#124C3B"
          />
          <path
            d="M 0 235 C 28 230 65 210 102 170 C 155 116 195 56 225 0 L 236 0 C 205 60 163 122 108 178 C 70 218 31 239 0 245 Z"
            fill="url(#ribbonGoldGradBR)"
          />
          <path
            d="M 0 0 L 160 0 C 125 42 90 90 48 140 C 20 170 0 185 Z"
            fill="#165B47"
          />
          <path
            d="M 0 190 C 18 180 46 160 74 125 C 112 80 142 38 165 0 L 169 0 C 145 40 114 84 76 128 C 47 163 19 183 0 193 Z"
            fill="#E5C158"
          />
          <defs>
            <linearGradient id="ribbonGoldGradBR" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9D5D14" />
              <stop offset="30%" stopColor="#C9A24A" />
              <stop offset="60%" stopColor="#F3D279" />
              <stop offset="100%" stopColor="#B08028" />
            </linearGradient>
          </defs>
        </svg>

        {/* ── 3. Banknote Guilloché Security Wave Mesh ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="certGuilloche" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M0,50 Q25,10 50,50 T100,50 M0,25 Q25,-15 50,25 T100,25 M0,75 Q25,35 50,75 T100,75"
                stroke="#124C3B"
                strokeWidth="0.75"
                fill="none"
              />
              <path
                d="M50,0 Q10,25 50,50 T50,100 M25,0 Q-15,25 25,50 T25,100 M75,0 Q35,25 75,50 T75,100"
                stroke="#C9A24A"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#certGuilloche)" />
        </svg>

        {/* ── 4. Inset Metallic Gold Borders & Filigree Corners ── */}
        <div className="absolute inset-2 sm:inset-3 border-2 border-[#C9A24A]/40 rounded-xl sm:rounded-2xl pointer-events-none z-1" />
        <div className="absolute inset-3.5 sm:inset-5 border border-[#C9A24A]/25 rounded-lg sm:rounded-xl pointer-events-none z-1" />

        {/* Top-Right Filigree Ornament */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 pointer-events-none z-1 text-[#C9A24A]/70">
          <svg className="w-7 h-7 sm:w-10 sm:h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor">
            <path d="M38,2 Q2,2 2,38" strokeWidth="1.2" />
            <path d="M38,7 Q7,7 7,38" strokeWidth="0.6" strokeDasharray="1,2" />
            <circle cx="34" cy="6" r="1.5" fill="currentColor" />
            <circle cx="6" cy="34" r="1.5" fill="currentColor" />
            <path d="M22,12 C26,8 32,8 34,12 C36,16 32,20 28,18 Z" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Bottom-Left Filigree Ornament */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 pointer-events-none z-1 text-[#C9A24A]/70 rotate-180">
          <svg className="w-7 h-7 sm:w-10 sm:h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor">
            <path d="M38,2 Q2,2 2,38" strokeWidth="1.2" />
            <path d="M38,7 Q7,7 7,38" strokeWidth="0.6" strokeDasharray="1,2" />
            <circle cx="34" cy="6" r="1.5" fill="currentColor" />
            <circle cx="6" cy="34" r="1.5" fill="currentColor" />
            <path d="M22,12 C26,8 32,8 34,12 C36,16 32,20 28,18 Z" strokeWidth="0.8" />
          </svg>
        </div>

        {/* ── 5. Certificate Content (Landscape Balanced Layout) ── */}
        <div className="relative z-10 text-center flex flex-col justify-between h-full space-y-1 py-0.5">
          {/* Header: Crest, Brand & Heading */}
          <div className="flex flex-col items-center justify-center space-y-0.5">
            {/* Centred Crest with Official Monogram Logo */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#9D5D14] via-[#F3D279] to-[#C9A24A] shadow-md shadow-[#C9A24A]/20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#FFFDF9] border border-[#C9A24A]/40 p-1 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Nikunj Dhanani Logo"
                  width={48}
                  height={48}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </div>
            </div>

            {/* Sub-Header Branding */}
            <div className="space-y-0.5 pt-0.5">
              <div className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] text-[#124C3B] font-montserrat font-extrabold">
                NIKUNJ DHANANI
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#C9A24A] font-montserrat font-bold">
                CHILD PSYCHOLOGY &amp; PARENTING
              </div>
            </div>

            {/* Prominent Heading in Playfair Display Bold */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-[#124C3B] tracking-wide mt-0.5 leading-tight">
              CERTIFICATE OF ACHIEVEMENT
            </h2>

            {/* Tasteful Gold Divider Accents */}
            <div className="flex items-center justify-center gap-2 max-w-sm mx-auto w-full pt-0.5">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24A] to-[#C9A24A]" />
              <span className="text-[#C9A24A] text-xs">◆</span>
              <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] text-[#9D5D14] font-montserrat font-bold">
                Non-Formal Educational Program
              </span>
              <span className="text-[#C9A24A] text-xs">◆</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C9A24A] to-[#C9A24A]" />
            </div>
          </div>

          {/* Recipient Section */}
          <div className="space-y-1 my-auto">
            <div className="text-[10px] sm:text-xs md:text-sm text-[#43544d] font-montserrat font-semibold tracking-wider uppercase">
              This certificate is proudly presented to
            </div>

            {/* Candidate Full Name in Playfair Display Bold with fine gold underline */}
            <div className="py-0.5">
              <div className="font-playfair font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#124C3B] tracking-tight leading-tight select-all">
                {certificate.candidateName?.trim() || "[RECIPIENT FULL NAME]"}
              </div>
              <div className="w-52 sm:w-72 md:w-96 h-[2px] bg-gradient-to-r from-transparent via-[#C9A24A] to-transparent mx-auto mt-1" />
            </div>

            {/* Prescribed Context & Prominent Course Title */}
            <p className="text-[11px] sm:text-xs md:text-sm text-[#43544d] font-montserrat font-medium leading-relaxed max-w-2xl mx-auto">
              For successfully completing an educational awareness assessment in
            </p>
            <div className="text-base sm:text-xl md:text-2xl lg:text-[25px] font-playfair font-bold text-[#124C3B] tracking-wide mt-0.5">
              {certificate.courseName || "Child Psychology & Development – Basic Awareness"}
            </div>
          </div>

          {/* Structured 3-Column Section: Assessment Details, Verification Badge & Signature */}
          <div className="grid grid-cols-3 items-center pt-1.5 pb-1 border-t border-[#124C3B]/15 max-w-4xl mx-auto w-full gap-2 sm:gap-4">
            {/* Left: Clean Structured Assessment Details */}
            <div className="text-left space-y-1 p-2 sm:p-2.5 rounded-xl bg-white/70 border border-[#C9A24A]/25 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-[9.5px] sm:text-[11px] font-montserrat font-semibold text-[#124C3B]/80 uppercase tracking-wider">
                  Assessment Date:
                </span>
                <span className="text-[10.5px] sm:text-xs md:text-sm font-montserrat font-bold text-[#124C3B]">
                  {actualDate}
                </span>
              </div>
              <div className="h-[1px] bg-[#124C3B]/10 w-full" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-[9.5px] sm:text-[11px] font-montserrat font-semibold text-[#124C3B]/80 uppercase tracking-wider">
                  Certificate ID:
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm font-mono font-bold text-[#124C3B] tracking-wide">
                  {certificate.certificateId || "TEST-CPD-0043"}
                </span>
              </div>
              <div className="h-[1px] bg-[#124C3B]/10 w-full" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-[9.5px] sm:text-[11px] font-montserrat font-semibold text-[#124C3B]/80 uppercase tracking-wider">
                  Assessment Score:
                </span>
                <span className="text-[10.5px] sm:text-xs md:text-sm font-montserrat font-extrabold text-[#C9A24A]">
                  {certificate.scorePercentage !== undefined ? `${certificate.scorePercentage}%` : "60%"}
                </span>
              </div>
            </div>

            {/* Center: Refined Minimal Gold Medallion & Genuine QR Code */}
            <div className="flex flex-col items-center justify-center space-y-1">
              {/* Minimal Tasteful Gold Medallion */}
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#9D5D14] via-[#F3D279] to-[#C9A24A] shadow-md shadow-[#C9A24A]/25 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-[#FFFDF9]/70 p-0.5 flex items-center justify-center bg-gradient-to-br from-[#FFE7A3] via-[#C9A24A] to-[#8C5311]">
                    <div className="w-full h-full rounded-full bg-[#124C3B] border border-[#F3D279]/40 flex flex-col items-center justify-center text-center p-0.5">
                      <span className="text-[6px] sm:text-[7px] font-black font-montserrat uppercase tracking-wider text-[#F3D279] leading-tight">
                        ASSESSMENT
                      </span>
                      <span className="text-[5.5px] sm:text-[6.5px] font-bold font-montserrat text-white uppercase tracking-tight">
                        COMPLETED
                      </span>
                      <span className="text-[5.5px] sm:text-[6.5px] text-[#F3D279] leading-none mt-0.5">✦ ✦ ✦</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Genuine QR Code Verification Area */}
              <div className="flex flex-col items-center justify-center">
                {qrCodeUrl ? (
                  <div className="p-0.5 bg-white rounded border border-[#C9A24A]/30 shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCodeUrl}
                      alt="Certificate Verification QR Code"
                      className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white/80 rounded border border-[#C9A24A]/30 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-[#C9A24A]" />
                  </div>
                )}
                <span className="text-[7px] sm:text-[8px] font-bold font-montserrat uppercase tracking-wider text-[#124C3B] mt-0.5">
                  Scan to Verify
                </span>
              </div>
            </div>

            {/* Right: Signature Block */}
            <div className="text-right flex flex-col items-end justify-center space-y-1">
              <div className="font-signature text-2xl sm:text-3xl md:text-4xl text-[#124C3B] leading-none select-none pr-1">
                Nikunj Dhanani
              </div>
              <div className="w-28 sm:w-44 h-[1.5px] bg-[#124C3B]/40" />
              <div className="text-[11px] sm:text-xs md:text-sm font-bold font-montserrat uppercase tracking-wider text-[#124C3B]">
                Nikunj Dhanani
              </div>
              <div className="text-[10px] sm:text-xs text-[#43544d] font-montserrat font-medium">
                Parenting Coach &amp; Counselor
              </div>
            </div>
          </div>

          {/* Disclaimer & Status Badge */}
          <div className="space-y-0.5 border-t border-[#124C3B]/15 pt-1 max-w-3xl mx-auto w-full">
            <p className="text-[9px] sm:text-[10.5px] md:text-[11.5px] text-[#43544d] font-montserrat italic font-medium leading-relaxed">
              &ldquo;This certificate acknowledges completion of a non-formal educational awareness assessment. It does not represent a professional qualification, licence, government-accredited academic credential, or university degree.&rdquo;
            </p>
            {certificate.isTestPreview && (
              <div className="flex justify-center pt-0.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[9px] sm:text-[10px] font-bold font-montserrat text-amber-800 uppercase tracking-wider">
                  <Shield className="w-3 h-3 text-[#C9A24A]" />
                  <span>Status: Test Preview Assessment</span>
                </div>
              </div>
            )}
          </div>

          {/* Official Contact Footer */}
          <div className="pt-0.5 text-[9.5px] sm:text-[11px] md:text-xs text-[#43544d] font-montserrat flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="font-bold text-[#124C3B]">Nikunj Dhanani Counseling</span>
            <span className="text-[#C9A24A]">✦</span>
            <span>Surat, Gujarat, India</span>
            <span className="text-[#C9A24A]">✦</span>
            <span>📞 +91 98240 12731</span>
            <span className="text-[#C9A24A]">✦</span>
            <span className="font-medium text-[#124C3B]">🌐 www.nikunjdhanani.com</span>
          </div>
        </div>
      </div>
    );
  };

  if (currentStep === 4 && activeTab === "onboarding") {
    const answeredCount = Object.keys(answers).length;
    const progressPercent = Math.round(((currentQIndex + 1) / (questions.length || 10)) * 100);
    const currentQId = questions[currentQIndex]?.id;
    const isCurrentAnswered = currentQId !== undefined && answers[currentQId] !== undefined;

    // Strict pacing: candidate cannot skip ahead past an unanswered question
    const isQuestionUnlocked = (targetIdx: number) => {
      if (targetIdx <= currentQIndex) return true;
      for (let i = 0; i < targetIdx; i++) {
        const qId = questions[i]?.id;
        if (qId === undefined || answers[qId] === undefined) {
          return false;
        }
      }
      return true;
    };

    return (
      <div className="h-screen max-h-screen overflow-hidden brand-liquid-bg relative font-sans selection:bg-[#D98A2B] selection:text-white flex flex-col justify-between p-2 sm:p-2.5 md:px-5 md:py-2">
        {/* ── ORGANIC FLUID BRAND ORBS & WAVES (Emerald, Ochre Amber & Sage) ── */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] rounded-full bg-[#D98A2B]/18 blur-[120px] animate-pulse-glow" />
          <div className="absolute top-[10%] right-[-10%] w-[750px] h-[750px] rounded-full bg-[#0B3C2D]/16 blur-[130px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-[#8CA899]/25 blur-[120px] animate-pulse-glow" style={{ animationDelay: "4s" }} />
        </div>

        {/* ── 1. PROMINENT EXPANDED TOP BRAND & CONTROLS NAVBAR ── */}
        <header className="w-full max-w-7xl mx-auto py-2.5 sm:py-3.5 px-3 sm:px-6 flex items-center justify-between gap-4 relative z-20 shrink-0">
          {/* Brand Logo on Left */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/95 border-2 border-[#0B3C2D]/20 p-1.5 shadow-md flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Nikunj Dhanani Logo"
                width={36}
                height={36}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                priority
              />
            </div>
            <div>
              <div className="text-sm sm:text-lg font-bold font-serif-display text-[#0B3C2D] tracking-tight leading-tight">
                Nikunj Dhanani
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#D98A2B] leading-tight mt-0.5">
                Child Psychology & Development
              </div>
            </div>
          </div>

          {/* Floating Glass Timer Capsule (Center) */}
          <div className="flex items-center">
            <div
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-mono text-sm sm:text-base font-extrabold flex items-center gap-2 border shadow-md transition-all ${
                timeLeftSeconds < 60
                  ? "bg-rose-50 text-rose-700 border-rose-300 animate-pulse ring-2 ring-rose-400/30"
                  : timeLeftSeconds < 120
                  ? "bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-400/30"
                  : "bg-white/95 text-[#0B3C2D] border-[#0B3C2D]/20 backdrop-blur-md"
              }`}
            >
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#D98A2B] shrink-0" />
              <span>{formatTime(timeLeftSeconds)}</span>
              <span className="text-[10px] sm:text-xs uppercase font-sans text-[#7b8d86] hidden md:inline ml-1 font-bold tracking-wider">
                Remaining
              </span>
            </div>
          </div>

          {/* Top-Right Progress Pill & Exit Option */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/90 border border-[#0B3C2D]/20 text-xs sm:text-sm font-bold text-[#0B3C2D] shadow-sm">
              <span className="text-[#D98A2B] font-extrabold text-sm sm:text-base">{answeredCount}</span>
              <span className="text-[#7b8d86]">/</span>
              <span>{questions.length || 10}</span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#7b8d86] ml-0.5">Answered</span>
            </div>

            <button
              onClick={() => { setIsPaused(true); setShowExitModal(true); }}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 hover:bg-white text-[#43544d] hover:text-[#0B3C2D] border border-[#0B3C2D]/20 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow"
              title="Pause or Exit Assessment"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Pause</span>
            </button>
          </div>
        </header>

        {/* ── 2. FULL-SCREEN CENTERED VIEWPORT CANVAS ── */}
        <main className="w-full max-w-5xl mx-auto flex-1 min-h-0 flex flex-col justify-center py-1.5 sm:py-3 px-3 sm:px-6 relative z-10 overflow-hidden">
          
          {/* Elevated Floating Liquid Glass Assessment Card (Compact & Content-Fit on Mobile, Maximized on Desktop) */}
          <div className="w-full my-auto sm:my-0 sm:h-full sm:flex-1 sm:min-h-0 flex flex-col justify-center">
            <div className="brand-liquid-card rounded-3xl sm:rounded-4xl p-4 sm:p-7 md:p-8 lg:p-9 shadow-2xl relative transition-all duration-300 w-full h-auto sm:h-full sm:flex-1 sm:min-h-0 flex flex-col justify-between overflow-hidden border border-[#0B3C2D]/15 bg-white/95 backdrop-blur-xl">
              
              {/* Question Header & Points Badge */}
              <div className="space-y-2 sm:space-y-3 pb-2.5 sm:pb-3 border-b border-[#0B3C2D]/10 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0B3C2D] text-white text-xs sm:text-sm font-bold tracking-wide shadow-2xs">
                      Question {currentQIndex + 1} of {questions.length || 10}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#7b8d86] hidden sm:inline">
                      Single Choice
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#D98A2B]/15 text-[#9D5D14] text-xs sm:text-sm font-bold">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D98A2B]" />
                      <span>1.0 Mark</span>
                    </div>
                  </div>
                </div>

                {/* Smooth Linear Progress Bar */}
                <div className="w-full bg-[#0B3C2D]/10 rounded-full h-1.5 sm:h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D98A2B] via-[#F3D279] to-[#0B3C2D] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${Math.round(((currentQIndex + 1) / (questions.length || 10)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Question Statement (Animated slide-in) */}
              <div key={currentQIndex} className="animate-slide-in my-2.5 sm:my-5 shrink-0">
                <h2 className="text-sm sm:text-xl md:text-2xl font-bold font-serif-display text-[#13221C] leading-snug md:leading-relaxed">
                  {questions[currentQIndex]?.question}
                </h2>
              </div>

              {/* 4 Interactive Option Cards (A, B, C, D) - Clean spacing on mobile, expanded on desktop */}
              <div className="space-y-2 sm:space-y-0 sm:flex-1 sm:min-h-0 sm:flex sm:flex-col sm:justify-center sm:gap-3.5 my-1.5 sm:my-2">
                {questions[currentQIndex]?.options.map((opt, oIdx) => {
                  const isSelected = answers[questions[currentQIndex]?.id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => selectAnswer(questions[currentQIndex].id, oIdx)}
                      className={`w-full py-2.5 px-3 sm:py-4 sm:px-5 md:py-4.5 md:px-6 rounded-xl sm:rounded-3xl text-left transition-all duration-150 flex items-center justify-between cursor-pointer group ${
                        isSelected
                          ? "bg-[#0B3C2D] text-white border-2 border-[#0B3C2D] shadow-md"
                          : "bg-white/95 hover:bg-white text-[#13221C] border border-[#0B3C2D]/15 hover:border-[#D98A2B]/60 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 sm:space-x-4 pr-2">
                        <span
                          className={`w-7 h-7 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-colors ${
                            isSelected
                              ? "bg-[#D98A2B] text-white shadow-2xs"
                              : "bg-[#F8F4EE] text-[#0B3C2D] group-hover:bg-[#D98A2B]/20 group-hover:text-[#9D5D14]"
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className={`text-xs sm:text-sm md:text-base leading-snug ${isSelected ? "font-bold text-white" : "font-semibold text-[#13221C]"}`}>
                          {opt}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#D98A2B] text-white flex items-center justify-center shadow-2xs ml-2">
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[3]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* No Answer Warning - only shows when user clicks Next without answering */}
              {showNoAnswerWarning && !isCurrentAnswered && (
                <div className="shrink-0 mt-2 py-1.5 px-3 sm:py-2 sm:px-3.5 rounded-xl bg-amber-50/95 border border-amber-300 flex items-center gap-2 text-xs text-amber-900 font-semibold animate-fade-in">
                  <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D98A2B] shrink-0" />
                  <span>Please select an option above to unlock the next question.</span>
                </div>
              )}

              {/* Quick Submit Alert if all questions answered before question 10 */}
              {answeredCount === (questions.length || 10) && (
                <div className="mt-2 py-1.5 px-3 sm:py-2 sm:px-3.5 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs animate-fade-in shrink-0">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                    <span>All 10 questions answered! Ready to complete?</span>
                  </span>
                  <button
                    disabled={isSubmittingQuiz}
                    onClick={() => handleQuizSubmit(false)}
                    className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0B3C2D] text-white font-bold text-xs hover:bg-[#07291f] cursor-pointer shadow-2xs shrink-0 ml-2"
                  >
                    Submit Now
                  </button>
                </div>
              )}

              {/* Navigation Controls (Pacing Enforced: Next disabled until current answered) */}
              <div className="flex items-center justify-between pt-2.5 mt-2 sm:pt-4 sm:mt-3 border-t border-[#0B3C2D]/10 shrink-0">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  className="py-2 px-3.5 sm:py-3 sm:px-6 rounded-full bg-white text-[#0B3C2D] border border-[#0B3C2D]/20 font-bold text-xs sm:text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF6F0] flex items-center gap-1.5 sm:gap-2 transition-all shadow-2xs cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Previous</span>
                </button>

                {/* Sleek 10-Dot Step Indicator in Center */}
                <div className="hidden sm:flex items-center gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = currentQIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? "w-7 sm:w-9 bg-[#D98A2B]"
                            : isAnswered
                            ? "w-2.5 sm:w-3 bg-[#0B3C2D]"
                            : "w-2.5 sm:w-3 bg-[#0B3C2D]/20"
                        }`}
                        title={`Question ${idx + 1}`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  {currentQIndex < (questions.length - 1) ? (
                    <button
                      disabled={!isCurrentAnswered}
                      onClick={() => {
                        if (!isCurrentAnswered) {
                          setShowNoAnswerWarning(true);
                          return;
                        }
                        setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1));
                      }}
                      className="brand-pill-btn rounded-full py-2 px-4.5 sm:py-3 sm:px-7 text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D98A2B]" />
                    </button>
                  ) : (
                    <button
                      disabled={isSubmittingQuiz || !isCurrentAnswered}
                      onClick={() => !isSubmittingQuiz && isCurrentAnswered && setShowReviewScreen(true)}
                      className="brand-pill-btn rounded-full py-2 px-5 sm:py-3 sm:px-8 text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-md ring-2 ring-[#D98A2B] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                      {isSubmittingQuiz ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          <span>Grading...</span>
                        </>
                      ) : (
                        <>
                          <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D98A2B]" />
                          <span>Review & Submit</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Auto-Save & Security Indicator (Real sessionStorage persistence) */}
              <div className="text-center pt-1.5 sm:pt-2.5 text-[10px] sm:text-xs text-[#7b8d86] font-medium flex items-center justify-center gap-1.5 sm:gap-2 shrink-0">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                <span>
                  Responses auto-saved to browser storage
                  {typeof window !== "undefined" && sessionStorage.getItem(QUIZ_STORAGE_KEY) && (
                    <span className="text-emerald-700 font-semibold">
                      {" "}• Last saved {new Date(JSON.parse(sessionStorage.getItem(QUIZ_STORAGE_KEY)!).savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>
                  )}
                  {" "}• Anti-tamper grading enabled
                </span>
              </div>
            </div>
          </div>
        </main>


        {/* ── EXIT CONFIRMATION MODAL ── */}
        {showExitModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-2 border-[#0B3C2D]/15 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-serif-display text-[#0B3C2D]">
                  Pause or Exit Assessment?
                </h3>
                <button
                  onClick={() => setShowExitModal(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-[#43544d]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#43544d] leading-relaxed">
                Your 10-minute countdown is currently <strong className="text-emerald-700">paused</strong> ({formatTime(timeLeftSeconds)} remaining). Your selected answers are preserved in browser storage.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowExitModal(false);
                    setIsQuizActive(false);
                    try { sessionStorage.removeItem(QUIZ_STORAGE_KEY); } catch { /* noop */ }
                    setCurrentStep(1);
                  }}
                  className="w-1/2 py-2.5 rounded-full border border-[#0B3C2D]/20 text-[#0B3C2D] font-bold text-xs hover:bg-[#FAF6F0] transition-all"
                >
                  Exit to Overview
                </button>
                <button
                  onClick={() => { setShowExitModal(false); setIsPaused(false); }}
                  className="w-1/2 brand-pill-btn rounded-full py-2.5 text-xs font-bold shadow-md"
                >
                  Keep Taking Quiz
                </button>
              </div>
            </div>
          </div>
        )}

{/* ── TIME EXPIRED MODAL ── */}
            {showTimeExpiredModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-2 border-rose-300 space-y-4 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-rose-50 border-2 border-rose-300 flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif-display text-rose-700">Time&apos;s Up!</h3>
                    <p className="text-xs text-[#43544d] mt-1">
                      Your 10-minute assessment window has expired. Your current answers are being submitted automatically for grading.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#7b8d86]">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span>Submitting your assessment...</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── REVIEW SCREEN BEFORE FINAL SUBMISSION ── */}
            {showReviewScreen && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-2 border-[#0B3C2D]/15 space-y-4 max-h-[80vh] flex flex-col">
                  <div className="flex items-center justify-between shrink-0">
                    <h3 className="text-lg font-bold font-serif-display text-[#0B3C2D]">
                      Review Your Answers
                    </h3>
                    <button
                      onClick={() => setShowReviewScreen(false)}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-[#43544d]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-[#43544d] shrink-0">
                    <span className="font-bold text-[#0B3C2D]">{Object.keys(answers).length} of {questions.length || 10}</span> questions answered
                    {Object.keys(answers).length < (questions.length || 10) && (
                      <span className="text-rose-600 font-semibold"> — {questions.length - Object.keys(answers).length} unanswered</span>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2">
                    {questions.map((q, idx) => {
                      const isAnswered = answers[q.id] !== undefined;
                      return (
                        <button
                          key={q.id}
                          onClick={() => { setShowReviewScreen(false); setCurrentQIndex(idx); }}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isAnswered
                              ? "bg-emerald-50/60 border-emerald-200 hover:border-emerald-400"
                              : "bg-rose-50/60 border-rose-200 hover:border-rose-400"
                          }`}
                        >
                          <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                            isAnswered ? "bg-emerald-600 text-white" : "bg-rose-100 text-rose-700"
                          }`}>
                            {isAnswered ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <span className="text-[11px] text-[#13221C] font-medium truncate">
                            {q.question.substring(0, 60)}...
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3 pt-2 shrink-0">
                    <button
                      onClick={() => setShowReviewScreen(false)}
                      className="w-1/3 py-2.5 rounded-full border border-[#0B3C2D]/20 text-[#0B3C2D] font-bold text-xs hover:bg-[#FAF6F0] transition-all cursor-pointer"
                    >
                      Keep Reviewing
                    </button>
                    <button
                      disabled={isSubmittingQuiz}
                      onClick={() => handleQuizSubmit(false)}
                      className="w-2/3 brand-pill-btn rounded-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <FileCheck className="w-4 h-4 text-[#D98A2B]" />
                      <span>Confirm & Submit</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
      </div>
    );
  }

  return (
    <div className="min-h-screen brand-liquid-bg relative overflow-x-hidden font-sans selection:bg-[#D98A2B] selection:text-white flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* ── ORGANIC FLUID BRAND ORBS & WAVES (Emerald, Ochre Amber & Sage) ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Warm Ochre Glow Top-Left */}
        <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#D98A2B]/16 blur-[100px]" />
        {/* Deep Emerald Glow Top-Right */}
        <div className="absolute top-[5%] right-[-10%] w-[650px] h-[650px] rounded-full bg-[#0B3C2D]/14 blur-[110px]" />
        {/* Soft Dusty Sage Glow Bottom */}
        <div className="absolute bottom-[-10%] left-[25%] w-[600px] h-[600px] rounded-full bg-[#8CA899]/22 blur-[100px]" />
      </div>

      {/* ── FLOATING LIQUID GLASS CARD (Branded Palette: Emerald & Ochre) ── */}
      <div className={`w-full ${currentStep === 6 ? "max-w-5xl xl:max-w-6xl p-4 sm:p-7 md:p-9" : currentStep === 5 ? "max-w-2xl p-6 sm:p-8" : "max-w-xl p-6 sm:p-9 md:p-11"} brand-liquid-card rounded-[32px] sm:rounded-[40px] relative z-10 transition-all duration-300`}>
        

          <div>
            {/* Circular Logo Avatar Badge (Matches reference avatar style) */}
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/90 backdrop-blur-xl border-2 border-[#0B3C2D]/20 p-2 shadow-lg shadow-[#0B3C2D]/10 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#F8F4EE] border border-[#0B3C2D]/10 flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="Nikunj Dhanani Logo"
                      width={80}
                      height={80}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                      priority
                    />
                  </div>
                </div>
                {/* Step indicator pill */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#D98A2B] text-white shadow-md border-2 border-white flex items-center justify-center text-[11px] font-bold">
                  {currentStep}
                </div>
              </div>
            </div>

            {/* Title & Tagline (Deep Emerald & Ochre - High Contrast) */}
            <div className="text-center space-y-1 mb-7">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#0B3C2D] tracking-tight">
                Child Psychology & Development
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#D98A2B]">
                “Basic Awareness Assessment for Parents & Educators”
              </p>
            </div>

            {/* STEP 1: PROGRAM OVERVIEW */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                {/* 3 Metric Pills (Exact match to reference layout) */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="brand-liquid-tile rounded-2xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#0B3C2D]">10</div>
                    <div className="text-[11px] font-semibold text-[#43544d] mt-0.5">Minutes</div>
                  </div>
                  <div className="brand-liquid-tile rounded-2xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#0B3C2D]">10</div>
                    <div className="text-[11px] font-semibold text-[#43544d] mt-0.5">Questions</div>
                  </div>
                  <div className="brand-liquid-tile rounded-2xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#0B3C2D]">50%</div>
                    <div className="text-[11px] font-semibold text-[#43544d] mt-0.5">Pass Mark (5/10)</div>
                  </div>
                </div>

                {/* 2 Pills: Fee & Certificate */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="brand-liquid-tile rounded-2xl p-3 flex items-center justify-center space-x-2 text-[#0B3C2D] font-bold text-xs">
                    <CreditCard className="w-4 h-4 text-[#D98A2B]" />
                    <span>Sample Fee: ₹250</span>
                  </div>
                  <div className="brand-liquid-tile rounded-2xl p-3 flex items-center justify-center space-x-2 text-[#0B3C2D] font-bold text-xs">
                    <Award className="w-4 h-4 text-[#D98A2B]" />
                    <span>Test Certificate</span>
                  </div>
                </div>

                {/* Non-Formal Disclaimer Box */}
                <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-xs leading-relaxed space-y-1">
                  <div className="font-bold text-[#0B3C2D] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#D98A2B] shrink-0" />
                    <span>Non-Formal Educational Program:</span>
                  </div>
                  <p className="text-[#43544d] text-[11px]">
                    This certificate acknowledges successful completion of an educational awareness quiz. It does not represent a professional qualification, licence, government-accredited academic credential, or university degree.
                  </p>
                </div>

                {/* Refund Policy Box */}
                <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-300 text-xs leading-relaxed space-y-1">
                  <div className="font-bold text-rose-800 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Non-Refundable Policy:</span>
                  </div>
                  <p className="text-rose-800/80 text-[11px]">
                    The course fee of <strong>₹250 INR is strictly non-refundable</strong> once payment is verified and the quiz begins. No refunds for incomplete, expired, or failed attempts. Retakes require a new registration and fee.
                  </p>
                </div>

                {/* Primary Pill Button (Matches reference image) */}
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full brand-pill-btn rounded-full py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D98A2B] transition-transform group-hover:translate-x-1" />
                  <span>Begin Candidate Registration</span>
                </button>
              </div>
            )}

            {/* STEP 2: REGISTRATION FORM */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-center text-xs font-semibold text-[#43544d]">
                  Please enter test candidate details to proceed.
                </div>

                {regError && (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                    <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{regError}</span>
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#0B3C2D] mb-1 ml-1">
                      Candidate Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3.5 text-[#0B3C2D]" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white/90 focus:bg-white border-2 border-[#0B3C2D]/15 focus:border-[#0B3C2D] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#13221C] placeholder-[#7b8d86] focus:outline-none transition-all shadow-2xs"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#0B3C2D] mb-1 ml-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#0B3C2D]" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/90 focus:bg-white border-2 border-[#0B3C2D]/15 focus:border-[#0B3C2D] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#13221C] placeholder-[#7b8d86] focus:outline-none transition-all shadow-2xs"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B3C2D] mb-1 ml-1">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-[#0B3C2D]" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/90 focus:bg-white border-2 border-[#0B3C2D]/15 focus:border-[#0B3C2D] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#13221C] placeholder-[#7b8d86] focus:outline-none transition-all shadow-2xs"
                          placeholder="Enter your mobile number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions Toggle Checkbox */}
                  <label className="flex items-start space-x-2.5 cursor-pointer p-3 rounded-2xl bg-white/60 border border-[#0B3C2D]/15 hover:border-[#D98A2B]/40 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData(prev => ({ ...prev, agreedToTerms: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 rounded text-[#0B3C2D] focus:ring-[#0B3C2D] cursor-pointer accent-[#0B3C2D]"
                    />
                    <span className="text-[11px] font-medium text-[#13221C] leading-relaxed">
                      I agree to the <strong>Terms, Non-Formal Disclaimer & Non-Refundable Policy</strong>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTermsModal(true); }}
                        className="ml-1 text-[#D98A2B] font-bold hover:underline cursor-pointer"
                      >
                        Read Full Terms →
                      </button>
                    </span>
                  </label>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-1/3 py-3 px-4 rounded-full bg-white border border-[#0B3C2D]/20 text-[#0B3C2D] font-bold text-xs hover:bg-[#FAF6F0] transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingReg}
                      className="w-2/3 brand-pill-btn rounded-full py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmittingReg ? "Submitting..." : "Continue to Payment"}</span>
                      <ArrowRight className="w-4 h-4 text-[#D98A2B]" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3: SANDBOX PAYMENT */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="p-4 rounded-2xl bg-white/90 border-2 border-[#0B3C2D]/15 text-center space-y-1">
                  <div className="text-xs font-semibold text-[#43544d]">Payable Course Fee (Sandbox)</div>
                  <div className="text-3xl font-bold font-serif-display text-[#0B3C2D]">₹250.00 INR</div>
                  <div className="text-[11px] text-[#43544d]">Registration ID: <strong>{registrationId}</strong></div>
                </div>

                {paymentNotice && (
                  <div className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
                    paymentStatus === "verified"
                      ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
                      : "bg-amber-50 border border-amber-300 text-amber-800"
                  }`}>
                    {paymentStatus === "verified" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                    )}
                    <span className="font-semibold">{paymentNotice}</span>
                  </div>
                )}

                {/* 3 Sandbox Action Tiles */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#0B3C2D] ml-1">Simulate Gateway Response:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={isProcessingPayment}
                      onClick={() => handlePaymentSimulation("simulate_success")}
                      className={`brand-liquid-tile rounded-2xl p-3 text-center cursor-pointer transition-all disabled:opacity-60 ${
                        paymentStatus === "verified" ? "ring-2 ring-[#0B3C2D] bg-[#0B3C2D]/5" : ""
                      }`}
                    >
                      {isProcessingPayment && paymentStatus !== "verified" ? (
                        <div className="w-5 h-5 rounded-full border-2 border-emerald-600/30 border-t-emerald-600 animate-spin mx-auto mb-1" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      )}
                      <div className="text-xs font-bold text-[#0B3C2D]">Test Success</div>
                      <div className="text-[10px] text-[#43544d]">Authorize ₹250</div>
                    </button>

                    <button
                      type="button"
                      disabled={isProcessingPayment}
                      onClick={() => handlePaymentSimulation("simulate_failure")}
                      className={`brand-liquid-tile rounded-2xl p-3 text-center cursor-pointer transition-all ${
                        paymentStatus === "failed" ? "ring-2 ring-rose-500 bg-rose-50" : ""
                      }`}
                    >
                      <XCircle className="w-5 h-5 text-rose-600 mx-auto mb-1" />
                      <div className="text-xs font-bold text-rose-900">Test Fail</div>
                      <div className="text-[10px] text-rose-700">Decline Card</div>
                    </button>

                    <button
                      type="button"
                      disabled={isProcessingPayment}
                      onClick={() => handlePaymentSimulation("simulate_cancel")}
                      className={`brand-liquid-tile rounded-2xl p-3 text-center cursor-pointer transition-all ${
                        paymentStatus === "cancelled" ? "ring-2 ring-amber-500 bg-amber-50" : ""
                      }`}
                    >
                      <RotateCcw className="w-5 h-5 text-[#D98A2B] mx-auto mb-1" />
                      <div className="text-xs font-bold text-amber-900">Test Cancel</div>
                      <div className="text-[10px] text-amber-700">User Abort</div>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-1/3 py-3 px-4 rounded-full bg-white border border-[#0B3C2D]/20 text-[#0B3C2D] font-bold text-xs hover:bg-[#FAF6F0] transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    disabled={paymentStatus !== "verified" || isStartingQuiz}
                    onClick={startQuiz}
                    className="w-2/3 brand-pill-btn rounded-full py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isStartingQuiz ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        <span>Preparing Quiz...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#D98A2B]" />
                        <span>Start 10-Minute Quiz</span>
                        <ArrowRight className="w-4 h-4 text-[#D98A2B]" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: EVALUATION RESULTS */}
            {currentStep === 5 && evaluation && (
              <div className="space-y-5 animate-fade-in">
                {/* Result Status Banner */}
                <div className="text-center space-y-1">
                  <div className={`text-2xl font-serif-display font-bold ${evaluation.passed ? "text-[#0B3C2D]" : "text-rose-700"}`}>
                    {evaluation.passed ? "Assessment Passed" : "Assessment Not Cleared"}
                  </div>
                  <div className="text-xs font-semibold text-[#43544d]">
                    {evaluation.passed
                      ? "Candidate eligible for Digital Certificate of Completion."
                      : "Score did not meet the 50% passing threshold (5 / 10 marks)."}
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="brand-liquid-tile rounded-2xl p-3 text-center">
                    <div className="text-xl font-bold text-[#0B3C2D]">
                      {evaluation.scoreMarks} / {evaluation.totalMarks}
                    </div>
                    <div className="text-[11px] font-semibold text-[#43544d] mt-0.5">Final Marks</div>
                  </div>
                  <div className="brand-liquid-tile rounded-2xl p-3 text-center">
                    <div className="text-xl font-bold text-[#0B3C2D]">
                      {evaluation.percentage}%
                    </div>
                    <div className="text-[11px] font-semibold text-[#43544d] mt-0.5">Score</div>
                  </div>
                  <div className="brand-liquid-tile rounded-2xl p-3 text-center">
                    <div className={`text-lg font-bold uppercase mt-1 ${evaluation.passed ? "text-emerald-700" : "text-rose-700"}`}>
                      {evaluation.passed ? "PASS" : "FAIL"}
                    </div>
                    <div className="text-[11px] font-semibold text-[#43544d] mt-0.5">Result</div>
                  </div>
                </div>

                {/* Eligibility Checklist */}
                <div className="p-3.5 rounded-2xl bg-white/90 border border-[#0B3C2D]/15 text-xs space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-[#0B3C2D]">
                    <Shield className="w-4 h-4 text-[#D98A2B]" />
                    <span>Server-Side Eligibility Checklist:</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-[#13221C] font-medium">
                    <div>✓ Valid Candidate Registration ({formData.fullName})</div>
                    <div>✓ Verified Course Payment (₹250 Sandbox Verified)</div>
                    <div>✓ 10-Minute Assessment Graded Securely on Server</div>
                    <div>
                      {evaluation.passed ? "✓" : "✗"} Passing Mark Condition (&ge; 5/10):{" "}
                      <strong>{evaluation.scoreMarks}/10 ({evaluation.percentage}%)</strong>
                    </div>
                  </div>
                </div>

                {certError && (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs">
                    {certError}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={async () => {
                      if (registrationId) {
                        await fetchQuestions(registrationId, true);
                      }
                      setCurrentQIndex(0);
                      setAnswers({});
                      setTimeLeftSeconds(600);
                      setIsQuizActive(true);
                      setQuizStartedAt(new Date().toISOString());
                      setCurrentStep(4);
                    }}
                    className="w-1/3 py-3 px-4 rounded-full bg-white text-[#0B3C2D] border border-[#0B3C2D]/20 font-bold text-xs hover:bg-[#FAF6F0] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>

                  <button
                    disabled={isGeneratingCert}
                    onClick={handleGenerateCertificate}
                    className="w-2/3 brand-pill-btn rounded-full py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isGeneratingCert ? (
                      <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-[#D98A2B]" />
                    )}
                    <span>{isGeneratingCert ? "Issuing Preview..." : "Preview Certificate"}</span>
                    {isGeneratingCert && (
                      <span className="text-[10px] text-[#D98A2B] font-mono">{certPercent}%</span>
                    )}
                    {!isGeneratingCert && <ArrowRight className="w-4 h-4 text-[#D98A2B]" />}
                  </button>
                </div>
              </div>
            )}

            
  {/* STEP 6: TEST CERTIFICATE PREVIEW (LANDSCAPE ORIENTATION) */}
            {currentStep === 6 && certificate && (
              <div className="space-y-4 animate-fade-in max-w-5xl mx-auto w-full">
                {/* Print & Download Controls Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#0B3C2D] bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#0B3C2D]/15 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm sm:text-base text-[#0B3C2D]">
                      Certificate Preview
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#D98A2B]/15 text-[#9D5D14] font-mono text-xs font-bold">
                      {certificate.certificateId}
                    </span>
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-[#0B3C2D]/10 text-[#0B3C2D] font-bold text-xs">
                      Landscape Format (A4)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const verifyUrl = `${window.location.origin}/quiz-certification/verify/${certificate.certificateId}`;
                        navigator.clipboard.writeText(verifyUrl).then(() => {
                          alert("Verification URL copied to clipboard!");
                        });
                      }}
                      className="px-3.5 py-2.5 rounded-full bg-white hover:bg-[#FAF6F0] border border-[#0B3C2D]/20 font-bold flex items-center gap-1.5 text-[#0B3C2D] text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
                      title="Copy Certificate Verification URL"
                    >
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <span>Copy Verify URL</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="brand-pill-btn rounded-full py-2.5 px-5 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
                      title="Download Certificate as PDF in Landscape"
                    >
                      <Download className="w-4 h-4 text-[#D98A2B]" />
                      <span>Download Certificate (PDF)</span>
                    </button>

                  </div>
                </div>

                {/* Luxury Emerald & Gold Prestigious Certificate Frame (Landscape Golden Aspect Ratio 1.414:1) */}
                <div
                  onClick={() => !isGeneratingCert && setShowFullscreenCert(true)}
                  className={`relative rounded-2xl sm:rounded-3xl border-[3px] sm:border-[4px] border-[#D98A2B] shadow-2xl shadow-[#0B3C2D]/15 overflow-hidden bg-[#FFFDF9] w-full max-w-5xl mx-auto transition-all ${
                    !isGeneratingCert ? "cursor-pointer group hover:ring-4 hover:ring-[#D98A2B]/40 hover:shadow-3xl" : ""
                  }`}
                  title={!isGeneratingCert ? "Click to open full size" : undefined}
                >
                  {/* Hover / Click to Expand Overlay Badge */}
                  {!isGeneratingCert && (
                    <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B3C2D]/90 text-white text-xs font-bold shadow-lg backdrop-blur-sm pointer-events-none">
                      <Maximize2 className="w-3.5 h-3.5 text-[#D98A2B]" />
                      <span>Click to Open Fully</span>
                    </div>
                  )}
                  {/* Certificate Canvas (Target of print and filtered blur during generation) */}
                  {renderCertificateCanvas(true)}

                  {/* ── 7. Generation Loader Overlay: SIBLING of blurred area, 100% CRYSTAL CLEAR & SHARP ── */}
                  {isGeneratingCert && (
                    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#FFFDF9]/92 backdrop-blur-sm p-6 text-center animate-fade-in">
                      {/* High-tech Glowing Radial Progress Ring */}
                      <div className="relative flex items-center justify-center mb-3.5">
                        <div className="absolute w-28 h-28 rounded-full bg-[#D98A2B]/20 blur-xl animate-pulse" />
                        <svg className="w-28 h-28 sm:w-32 sm:h-32 -rotate-90 transform drop-shadow-md" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="rgba(11, 60, 45, 0.12)"
                            strokeWidth="6"
                            fill="transparent"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="url(#certGoldGradientLight)"
                            strokeWidth="6"
                            strokeDasharray={264}
                            strokeDashoffset={264 - (264 * certPercent) / 100}
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-75 ease-out"
                          />
                          <defs>
                            <linearGradient id="certGoldGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#D98A2B" />
                              <stop offset="50%" stopColor="#F3D279" />
                              <stop offset="100%" stopColor="#0B3C2D" />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Center Percentage Display */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-3xl sm:text-4xl font-extrabold text-[#0B3C2D] font-mono tracking-tight drop-shadow-xs">
                            {certPercent}%
                          </span>
                          <span className="text-[9px] uppercase tracking-widest text-[#D98A2B] font-extrabold mt-0.5">
                            Generating
                          </span>
                        </div>
                      </div>

                      {/* Dynamic Pipeline Stage Text */}
                      <div className="space-y-1 max-w-sm px-2">
                        <div className="text-base sm:text-lg font-bold font-serif-display text-[#0B3C2D] tracking-wide">
                          Generating Digital Certificate Preview
                        </div>
                        <p className="text-xs sm:text-[13px] text-[#43544d] font-semibold min-h-[20px] transition-all duration-200">
                          {certStageText}
                        </p>
                      </div>

                      {/* Linear Micro Bar */}
                      <div className="w-52 sm:w-64 bg-[#0B3C2D]/12 rounded-full h-2 overflow-hidden mt-3.5 border border-[#0B3C2D]/15 shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-[#D98A2B] via-[#F3D279] to-[#0B3C2D] rounded-full transition-all duration-75 ease-out"
                          style={{ width: `${certPercent}%` }}
                        />
                      </div>

                      {/* Security Verification Footnote */}
                      <div className="mt-3.5 text-[11px] text-[#0B3C2D]/80 flex items-center gap-1.5 font-mono font-medium">
                        <Shield className="w-3.5 h-3.5 text-[#D98A2B]" />
                        <span>Anti-Tamper Cryptographic Token Generation</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Certificate Validity & Verification Info Bar */}
                <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-md p-4 rounded-2xl sm:rounded-3xl border border-[#0B3C2D]/15 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0B3C2D]">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span>Certificate Validity & Verification</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
                      <div className="font-bold text-emerald-800 mb-0.5">Status</div>
                      <div className="text-emerald-700/80">{certificate.status}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0B3C2D]/5 border border-[#0B3C2D]/15">
                      <div className="font-bold text-[#0B3C2D] mb-0.5">Verification ID</div>
                      <div className="text-[#43544d] font-mono">{certificate.certificateId}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200">
                      <div className="font-bold text-amber-800 mb-0.5">Score Achieved</div>
                      <div className="text-amber-700/80">{certificate.scoreMarks}/{certificate.totalMarks} ({certificate.scorePercentage}%)</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#7b8d86] leading-relaxed">
                    <strong className="text-[#0B3C2D]">How to verify:</strong> Copy the verification URL above and share it with any institution or employer. They can verify this certificate&apos;s authenticity by visiting the URL. This is a <strong>test preview</strong> certificate and is not valid for official use.
                  </div>
                </div>

                
                {/* ── FULLSCREEN CERTIFICATE LIGHTBOX MODAL ── */}
                {showFullscreenCert && (
                  <div
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 animate-fade-in"
                    onClick={() => setShowFullscreenCert(false)}
                  >
                    {/* Top Controls Bar inside Modal */}
                    <div
                      className="w-full max-w-5xl flex items-center justify-between pb-3 text-white shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-extrabold text-sm sm:text-base text-white">
                          Certificate Full View (A4 Landscape)
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-[#D98A2B]/20 text-[#F3D279] font-mono text-xs font-bold border border-[#D98A2B]/40">
                          {certificate.certificateId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.print()}
                          className="brand-pill-btn rounded-full py-2 px-4 sm:px-5 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                          title="Download Certificate as PDF"
                        >
                          <Download className="w-4 h-4 text-[#D98A2B]" />
                          <span>Download Certificate (PDF)</span>
                        </button>
                        <button
                          onClick={() => setShowFullscreenCert(false)}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                          title="Close Full View (Esc)"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Scrollable / Zoomed Full Certificate Card */}
                    <div
                      className="w-full max-w-5xl rounded-2xl sm:rounded-3xl border-[3px] sm:border-[4px] border-[#D98A2B] shadow-2xl bg-[#FFFDF9] overflow-auto max-h-[85vh]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="min-w-[680px] w-full">
                        {renderCertificateCanvas(false)}
                      </div>
                    </div>
                    <p className="text-white/60 text-xs mt-2.5 flex items-center gap-1.5">
                      <span>Click anywhere outside or press</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono text-[10px]">Esc</kbd>
                      <span>to close full view</span>
                    </p>
                  </div>
                )}

                {/* Return Button */}
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full brand-pill-btn rounded-full py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D98A2B]" />
                  <span>Start New Assessment Attempt</span>
                </button>
              </div>
            )}

            {/* ── TERMS, DISCLAIMER & REFUND POLICY MODAL ── */}
            {showTermsModal && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-[#0B3C2D]/15 flex flex-col max-h-[85vh]">
                  <div className="flex items-center justify-between p-5 pb-3 border-b border-[#0B3C2D]/10 shrink-0">
                    <h3 className="text-lg font-bold font-serif-display text-[#0B3C2D]">
                      Terms, Disclaimer & Refund Policy
                    </h3>
                    <button
                      onClick={() => setShowTermsModal(false)}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-[#43544d]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 pt-4 space-y-4 text-xs text-[#13221C] leading-relaxed">
                    <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 space-y-1.5">
                      <div className="font-bold text-[#0B3C2D] flex items-center gap-1.5 text-sm">
                        <AlertTriangle className="w-4 h-4 text-[#D98A2B] shrink-0" />
                        <span>Non-Formal Educational Program Disclaimer</span>
                      </div>
                      <p className="text-[#43544d]">
                        This certificate acknowledges successful completion of a <strong>non-formal educational awareness quiz</strong>. It does <strong>not</strong> represent a professional qualification, licence, government-accredited academic credential, or university degree. This program is designed for general awareness purposes only and does not certify clinical competence.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-[#0B3C2D] text-sm">Assessment Rules</h4>
                      <ul className="list-disc list-inside space-y-1 text-[#43544d]">
                        <li>The assessment consists of <strong>10 multiple-choice questions</strong> randomly selected from a question bank.</li>
                        <li>You have <strong>10 minutes</strong> to complete all questions. The timer begins when the quiz starts and cannot be paused.</li>
                        <li>Each correct answer is worth <strong>1 mark</strong>. The total possible score is <strong>10 marks</strong>.</li>
                        <li>A minimum score of <strong>5 out of 10 (50%)</strong> is required to pass and receive a certificate.</li>
                        <li>You <strong>cannot skip questions</strong>. You must answer each question before proceeding to the next.</li>
                        <li>You may navigate <strong>backwards</strong> to review and change your answers before final submission.</li>
                        <li>All grading is performed <strong>server-side</strong> for integrity. Client-side answers are never trusted.</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-300 space-y-1.5">
                      <div className="font-bold text-rose-800 flex items-center gap-1.5 text-sm">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Non-Refundable Policy</span>
                      </div>
                      <p className="text-rose-800/80">
                        The course fee of <strong>₹250 INR</strong> is <strong>strictly non-refundable</strong> once payment has been verified and the quiz has been initiated. By proceeding, you acknowledge and agree that:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-rose-800/80">
                        <li>No refunds will be issued for incomplete assessments, expired time limits, or failed attempts.</li>
                        <li>No refunds will be issued if you voluntarily exit the assessment before completion.</li>
                        <li>No refunds will be issued for technical issues on the candidate&apos;s device or internet connection.</li>
                        <li>Retake attempts are subject to a new registration and a new fee.</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-[#0B3C2D] text-sm">Technical Acknowledgment</h4>
                      <ul className="list-disc list-inside space-y-1 text-[#43544d]">
                        <li>Your responses are auto-saved to browser storage during the assessment. However, refreshing the page may still result in data loss.</li>
                        <li>It is strongly recommended that you <strong>do not refresh</strong> the assessment page once the quiz has started.</li>
                        <li>The assessment requires a stable internet connection throughout the duration of the quiz.</li>
                        <li>Your personal information (name, email, phone) is used solely for certificate issuance and program records.</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#0B3C2D]/5 border border-[#0B3C2D]/15 space-y-1.5">
                      <div className="font-bold text-[#0B3C2D] flex items-center gap-1.5 text-sm">
                        <Award className="w-4 h-4 text-[#D98A2B] shrink-0" />
                        <span>Certificate Status</span>
                      </div>
                      <p className="text-[#43544d]">
                        Upon successful completion (score ≥ 50%), a <strong>digital certificate of completion</strong> will be generated. The certificate will include your name, course title, score, issue date, and a unique verification ID. The certificate is watermarked as a test preview and is not valid for official use.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-[#0B3C2D]/10 shrink-0">
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, agreedToTerms: true }));
                        setShowTermsModal(false);
                      }}
                      className="w-full brand-pill-btn rounded-full py-3 px-6 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-[#D98A2B]" />
                      <span>I Have Read & Accept These Terms</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── FINAL QUIZ DISCLAIMER ACKNOWLEDGMENT ── */}
            {showQuizDisclaimer && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-2 border-[#0B3C2D]/15 space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#D98A2B] shrink-0" />
                    <h3 className="text-lg font-bold font-serif-display text-[#0B3C2D]">
                      Before You Begin
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs text-[#13221C] leading-relaxed">
                    <div className="p-3 rounded-2xl bg-amber-50/90 border border-amber-300">
                      <p className="font-bold text-[#0B3C2D] mb-1">Non-Formal Educational Program</p>
                      <p className="text-[#43544d]">
                        This is a <strong>non-formal educational awareness quiz</strong>. The certificate does not represent a professional qualification, licence, or government-accredited credential.
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-rose-50/90 border border-rose-300">
                      <p className="font-bold text-rose-800 mb-1">Non-Refundable Fee</p>
                      <p className="text-rose-800/80">
                        Your payment of <strong>₹250 is strictly non-refundable</strong> once the quiz begins. No refunds for incomplete, expired, or failed attempts.
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/90 border border-[#0B3C2D]/15">
                      <p className="font-bold text-[#0B3C2D] mb-1">10-Minute Time Limit</p>
                      <p className="text-[#43544d]">
                        The timer <strong>cannot be paused</strong> once started. Your answers are auto-saved to browser storage, but <strong>refreshing the page may cause data loss</strong>.
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/90 border border-[#0B3C2D]/15">
                      <p className="font-bold text-[#0B3C2D] mb-1">50% Passing Threshold</p>
                      <p className="text-[#43544d]">
                        You need at least <strong>5 out of 10</strong> correct answers to pass and receive a certificate.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setShowQuizDisclaimer(false)}
                      className="w-1/3 py-2.5 rounded-full border border-[#0B3C2D]/20 text-[#0B3C2D] font-bold text-xs hover:bg-[#FAF6F0] transition-all cursor-pointer"
                    >
                      Go Back
                    </button>
                    <button
                      onClick={confirmAndStartQuiz}
                      disabled={isStartingQuiz}
                      className="w-2/3 brand-pill-btn rounded-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isStartingQuiz ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          <span>Loading Questions...</span>
                        </>
                      ) : (
                        <>
                          <span>I Understand — Start Quiz</span>
                          <ArrowRight className="w-4 h-4 text-[#D98A2B]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

                      </div>
      </div>
    </div>
  );
}
