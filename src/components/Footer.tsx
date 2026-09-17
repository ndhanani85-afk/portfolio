"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0B3C2D] text-white pt-16 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white/95 border border-white/25 shadow-md flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo.png"
                  alt="Nikunj Dhanani Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="text-xl font-serif-display font-bold tracking-tight text-white group-hover:text-[#D98A2B] transition-colors block">
                  NIKUNJ DHANANI
                </span>
                <span className="block text-[10px] font-bold text-[#A8C3B5] uppercase tracking-widest -mt-1 font-sans">
                  {t(translations.header.subTitle)}
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#E4EEE9]/90 leading-relaxed">
              {t(translations.footer.tagline)}
            </p>
            <div className="pt-2">
              <Link
                href="/faq#confidentiality"
                className="inline-flex items-center space-x-2 text-xs text-[#A8C3B5] hover:text-white transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#D98A2B]" />
                <span>{t(translations.footer.confidentialCare)}</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D98A2B] mb-4 font-sans">
              {t(translations.footer.quickNav)}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E4EEE9]/90">
              <li>
                <Link href="/" className="hover:text-[#D98A2B] transition-colors">
                  {t(translations.header.home)}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#D98A2B] transition-colors">
                  {t(translations.header.services)}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D98A2B] transition-colors">
                  {t(translations.header.aboutMe)}
                </Link>
              </li>
              <li>
                <Link href="/speaking" className="hover:text-[#D98A2B] transition-colors">
                  {t(translations.header.speaking)}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#D98A2B] transition-colors">
                  {t(translations.header.resources)}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#D98A2B] transition-colors">
                  {t(translations.header.faq)}
                </Link>
              </li>
              <li>
                <Link href="/review-generator" className="hover:text-[#D98A2B] transition-colors flex items-center space-x-1.5">
                  <span>{t(translations.header.reviews)}</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#D98A2B] text-[#0B3C2D] rounded-full">AI</span>
                </Link>
              </li>
              <li>
                <Link href="/contact#booking" className="hover:text-white font-bold text-[#D98A2B] transition-colors">
                  {t(translations.header.bookSession)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Focus */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D98A2B] mb-4 font-sans">
              {t(translations.footer.practiceFocus)}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E4EEE9]/90">
              <li>
                <Link href="/services/parenting-coaching" className="hover:text-[#D98A2B] transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> {t(translations.footer.serviceFocus1)}
                </Link>
              </li>
              <li>
                <Link href="/services/relationship-repair" className="hover:text-[#D98A2B] transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> {t(translations.footer.serviceFocus2)}
                </Link>
              </li>
              <li>
                <Link href="/services/counselling-life-coaching" className="hover:text-[#D98A2B] transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> {t(translations.footer.serviceFocus3)}
                </Link>
              </li>
              <li>
                <Link href="/services/parenting-coaching" className="hover:text-[#D98A2B] transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> {t(translations.footer.serviceFocus4)}
                </Link>
              </li>
              <li>
                <Link href="/services/counselling-life-coaching" className="hover:text-[#D98A2B] transition-colors flex items-center">
                  <span className="mr-1.5 text-[#D98A2B]">•</span> {t(translations.footer.serviceFocus5)}
                </Link>
              </li>
            </ul>
            <div className="pt-3 border-t border-white/10 mt-3">
              <span className="text-[10px] font-bold text-[#D98A2B] uppercase block mb-1">
                {t(translations.footer.languagesSpoken)}
              </span>
              <p className="text-xs text-[#A8C3B5]">{t(translations.footer.languagesList)}</p>
            </div>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D98A2B] mb-4 font-sans">
              {t(translations.footer.directContact)}
            </h4>
            <ul className="space-y-3 text-xs text-[#E4EEE9]/90">
              <li>
                <Link href="/contact#booking" className="flex items-start space-x-3 group hover:text-[#D98A2B] transition-colors">
                  <MapPin className="w-4 h-4 text-[#D98A2B] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>Mota Varachha, Surat, Gujarat, India (Online Sessions Available Nationwide)</span>
                </Link>
              </li>
              <li>
                <a href="tel:+919925060609" className="flex items-center space-x-3 group hover:text-[#D98A2B] transition-colors">
                  <Phone className="w-4 h-4 text-[#D98A2B] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+91 99250 60609</span>
                </a>
              </li>
              <li>
                <a href="mailto:ndhanani85@gmail.com" className="flex items-center space-x-3 group hover:text-[#D98A2B] transition-colors">
                  <Mail className="w-4 h-4 text-[#D98A2B] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>ndhanani85@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Developed By */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8C3B5]">
          <p>© {new Date().getFullYear()} {t(translations.footer.allRightsReserved)}</p>
          <a
            href="https://portfolio-avadh.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-0 hover:text-white transition-colors flex items-center space-x-1.5 font-medium"
          >
            <span>{t(translations.footer.developedBy)}</span>
            <span className="font-bold text-white hover:text-[#D98A2B] transition-colors">AD</span>
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
