"use client";

import React, { useState, useEffect } from "react";
import { Globe, Check, X, ChevronDown, Sparkles } from "lucide-react";

export type SupportedLanguage = "en" | "hi" | "gu";

export const LANGUAGES: { code: SupportedLanguage; label: string; nativeName: string; flag: string }[] = [
  { code: "en", label: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "gu", label: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
];

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

// Function to set Google Translate language cookie and trigger change
export function setSiteLanguage(lang: SupportedLanguage) {
  localStorage.setItem("user_lang_preference", lang);

  // Set cookies for current domain and host
  const cookieValue = `/en/${lang}`;
  document.cookie = `googtrans=${cookieValue}; path=/;`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname};`;

  // If on a subdomain or localhost, also set domain-wide
  const domainParts = window.location.hostname.split(".");
  if (domainParts.length >= 2) {
    const rootDomain = domainParts.slice(-2).join(".");
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${rootDomain};`;
  }

  // Trigger Google Translate combo if present in DOM
  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (combo) {
    combo.value = lang;
    combo.dispatchEvent(new Event("change"));
  } else {
    // Reload page to let Google Translate script pick up new cookie
    window.location.reload();
  }
}

export function getSavedLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("user_lang_preference");
  if (saved === "hi" || saved === "gu" || saved === "en") {
    return saved;
  }
  return "en";
}

// ── HEADER LANGUAGE SELECTOR (Desktop & Mobile) ──
export function LanguageSelector({ isMobile = false }: { isMobile?: boolean }) {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>("en");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLang(getSavedLanguage());
  }, []);

  const handleSelect = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    setIsOpen(false);
    setSiteLanguage(lang);
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  if (isMobile) {
    return (
      <div className="py-2 border-t border-[#0B3C2D]/10">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#0B3C2D] mb-2.5">
          <Globe className="w-4 h-4 text-[#D98A2B]" />
          <span>Language / ભાષા / भाषा:</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {LANGUAGES.map((l) => {
            const isSelected = currentLang === l.code;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => handleSelect(l.code)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center space-x-1.5 ${
                  isSelected
                    ? "bg-[#0B3C2D] text-white shadow-xs"
                    : "bg-[#F8F4EE] hover:bg-[#E8F3EE] text-[#0B3C2D] border border-[#0B3C2D]/10"
                }`}
              >
                <span>{l.nativeName}</span>
                {isSelected && <Check className="w-3 h-3 text-[#D98A2B]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Language"
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#0B3C2D]/15 text-[#0B3C2D] text-xs font-bold transition-all shadow-2xs hover:shadow-xs"
      >
        <Globe className="w-3.5 h-3.5 text-[#D98A2B]" />
        <span>{activeLangObj.nativeName}</span>
        <ChevronDown className="w-3 h-3 text-ink-muted" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-[#0B3C2D]/15 py-1.5 z-50 animate-fade-in overflow-hidden">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-muted border-b border-[#0B3C2D]/10">
              Select Language
            </div>
            {LANGUAGES.map((l) => {
              const isSelected = currentLang === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleSelect(l.code)}
                  className={`w-full px-3.5 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-[#F8F4EE] text-[#0B3C2D] font-bold"
                      : "text-deep-ink hover:bg-[#FAF8F5] hover:text-[#0B3C2D]"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{l.flag}</span>
                    <span>{l.nativeName}</span>
                    <span className="text-[10px] text-ink-muted">({l.label})</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0B3C2D]" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ── FIRST-VISIT WELCOME LANGUAGE MODAL ──
export function FirstVisitLanguageModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show if user hasn't explicitly chosen or dismissed before
    const saved = localStorage.getItem("user_lang_preference");
    const dismissed = sessionStorage.getItem("lang_modal_dismissed");
    if (!saved && !dismissed) {
      // Small timeout so it pops up smoothly after initial page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelect = (lang: SupportedLanguage) => {
    setSiteLanguage(lang);
    setIsOpen(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem("lang_modal_dismissed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B3C2D]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#0B3C2D]/15 space-y-6 text-center">
        
        {/* Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F8F4EE] hover:bg-[#E8F3EE] text-[#0B3C2D] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#0B3C2D] text-white flex items-center justify-center mx-auto shadow-md">
          <Globe className="w-7 h-7 text-[#D98A2B]" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#0B3C2D]">
            Welcome • स्वागत है • સ્વાગત છે
          </h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Choose your preferred language to explore counseling services:
          </p>
        </div>

        {/* 3 Language Action Cards */}
        <div className="space-y-2.5 pt-1">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => handleSelect(l.code)}
              className="w-full p-3.5 rounded-2xl border border-[#0B3C2D]/15 bg-[#FAF8F5] hover:bg-[#0B3C2D] hover:text-white text-[#0B3C2D] font-bold text-sm flex items-center justify-between transition-all group shadow-2xs hover:shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{l.flag}</span>
                <div className="text-left">
                  <span className="block font-serif-display text-base leading-none">
                    {l.nativeName}
                  </span>
                  <span className="block text-[10px] text-ink-muted group-hover:text-[#A8C3B5] mt-0.5 font-sans font-normal">
                    Continue in {l.label}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#D98A2B] group-hover:text-white transition-colors">
                Select →
              </span>
            </button>
          ))}
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-ink-muted pt-1">
          You can change this anytime using the 🌐 selector in the top menu.
        </p>

      </div>
    </div>
  );
}

// ── GOOGLE TRANSLATE ENGINE SCRIPT LOADER ──
export function GoogleTranslateInit() {
  useEffect(() => {
    // 1. Define global init callback
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,gu",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // 2. Inject Google Translate script if not already added
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Hidden container for Google Translate widget */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      {/* First visit welcoming language selection modal */}
      <FirstVisitLanguageModal />
    </>
  );
}
