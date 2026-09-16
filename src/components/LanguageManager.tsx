"use client";

import React, { useState, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage, LANGUAGES, SupportedLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

// ── HEADER LANGUAGE SELECTOR (Desktop & Mobile) ──
export function LanguageSelector({ isMobile = false }: { isMobile?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  if (isMobile) {
    return (
      <div className="py-2 border-t border-[#0B3C2D]/10">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#0B3C2D] mb-2.5">
          <Globe className="w-4 h-4 text-[#D98A2B]" />
          <span>Language / ભાષા / भाषा:</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {LANGUAGES.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => handleSelect(l.code)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center space-x-1 ${
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
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#0B3C2D]/15 text-[#0B3C2D] text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer"
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
              const isSelected = language === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleSelect(l.code)}
                  className={`w-full px-3.5 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
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
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal on first visit until user selects a language preference
    const saved = localStorage.getItem("user_lang_preference");
    if (!saved) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B3C2D]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#0B3C2D]/15 space-y-6 text-center">

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#0B3C2D] text-white flex items-center justify-center mx-auto shadow-md">
          <Globe className="w-7 h-7 text-[#D98A2B]" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#0B3C2D]">
            {t(translations.welcomeModal.title)}
          </h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            {t(translations.welcomeModal.subtitle)}
          </p>
        </div>

        {/* 3 Language Action Cards */}
        <div className="space-y-2.5 pt-1">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => handleSelect(l.code)}
              className="w-full p-3.5 rounded-2xl border border-[#0B3C2D]/15 bg-[#FAF8F5] hover:bg-[#0B3C2D] hover:text-white text-[#0B3C2D] font-bold text-sm flex items-center justify-between transition-all group shadow-2xs hover:shadow-sm cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{l.flag}</span>
                <div className="text-left">
                  <span className="block font-serif-display text-base leading-none">
                    {l.nativeName}
                  </span>
                  <span className="block text-[10px] text-ink-muted group-hover:text-[#A8C3B5] mt-0.5 font-sans font-normal">
                    {t(translations.welcomeModal.continueIn)} {l.label}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#D98A2B] group-hover:text-white transition-colors">
                {t(translations.welcomeModal.selectBtn)}
              </span>
            </button>
          ))}
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-ink-muted pt-1">
          {t(translations.welcomeModal.changeAnytime)}
        </p>
      </div>
    </div>
  );
}
