"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, CheckCircle2, XCircle, Award, AlertTriangle } from "lucide-react";

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

export default function CertificateVerificationPage({ params }: { params: Promise<{ certId: string }> }) {
  const [certId, setCertId] = useState<string>("");
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(({ certId }) => setCertId(certId));
  }, [params]);

  useEffect(() => {
    if (!certId) return;
    const fetchCertificate = async () => {
      try {
        const res = await fetch(`/api/quiz-certificate/certificate?certId=${encodeURIComponent(certId)}`);
        const data = await res.json();
        if (res.ok && data.certificate) {
          setCertificate(data.certificate);
        } else {
          setError(data.error || "Certificate not found.");
        }
      } catch {
        setError("Failed to verify certificate. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [certId]);

  return (
    <div className="min-h-screen brand-liquid-bg relative overflow-x-hidden font-sans flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#D98A2B]/16 blur-[100px]" />
        <div className="absolute top-[5%] right-[-10%] w-[650px] h-[650px] rounded-full bg-[#0B3C2D]/14 blur-[110px]" />
        <div className="absolute bottom-[-10%] left-[25%] w-[600px] h-[600px] rounded-full bg-[#8CA899]/22 blur-[100px]" />
      </div>

      <div className="w-full max-w-lg brand-liquid-card rounded-[32px] sm:rounded-[40px] p-6 sm:p-9 md:p-11 relative z-10 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-xl border-2 border-[#0B3C2D]/20 p-2 shadow-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#0B3C2D]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#0B3C2D] tracking-tight">
            Certificate Verification
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#D98A2B] mt-1">
            Verify the authenticity of a certificate
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8 space-y-3">
            <div className="w-10 h-10 rounded-full border-4 border-[#D98A2B]/30 border-t-[#D98A2B] animate-spin mx-auto" />
            <p className="text-xs text-[#43544d]">Verifying certificate...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 border-2 border-rose-300 flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8 text-rose-600" />
            </div>
            <p className="text-sm font-bold text-rose-700">Verification Failed</p>
            <p className="text-xs text-[#43544d]">{error}</p>
            <Link
              href="/quiz-certification"
              className="inline-block brand-pill-btn rounded-full py-3 px-6 text-xs font-bold text-white no-underline"
            >
              Back to Assessment
            </Link>
          </div>
        )}

        {/* Certificate Found */}
        {certificate && !loading && (
          <div className="space-y-5 animate-fade-in">
            {/* Status Banner */}
            <div className={`p-4 rounded-2xl text-center space-y-1 ${
              certificate.isTestPreview
                ? "bg-amber-50/90 border border-amber-300"
                : "bg-emerald-50/90 border border-emerald-300"
            }`}>
              <div className={`flex items-center justify-center gap-2 font-bold ${
                certificate.isTestPreview ? "text-amber-800" : "text-emerald-800"
              }`}>
                {certificate.isTestPreview ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
                <span>{certificate.isTestPreview ? "Test Preview Certificate" : "Valid Certificate"}</span>
              </div>
              <p className={`text-[11px] ${
                certificate.isTestPreview ? "text-amber-700/80" : "text-emerald-700/80"
              }`}>
                {certificate.isTestPreview
                  ? "This is a test preview and is not valid for official use."
                  : "This certificate has been verified as authentic."}
              </p>
            </div>

            {/* Certificate Details */}
            <div className="p-4 rounded-2xl bg-white/90 border border-[#0B3C2D]/15 space-y-3">
              <div className="text-center pb-3 border-b border-[#0B3C2D]/10">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#7b8d86] font-semibold mb-1">
                  Certificate ID
                </div>
                <div className="font-mono text-sm font-bold text-[#0B3C2D]">{certificate.certificateId}</div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#7b8d86] font-medium">Recipient</span>
                  <span className="font-bold text-[#0B3C2D]">{certificate.candidateName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7b8d86] font-medium">Course</span>
                  <span className="font-bold text-[#0B3C2D] text-right max-w-[60%]">{certificate.courseName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7b8d86] font-medium">Score</span>
                  <span className="font-bold text-[#0B3C2D]">{certificate.scoreMarks}/{certificate.totalMarks} ({certificate.scorePercentage}%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7b8d86] font-medium">Issue Date</span>
                  <span className="font-bold text-[#0B3C2D]">{certificate.issueDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7b8d86] font-medium">Status</span>
                  <span className="font-bold text-amber-700">{certificate.status}</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-xs leading-relaxed">
              <div className="font-bold text-[#0B3C2D] flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-4 h-4 text-[#D98A2B] shrink-0" />
                <span>Disclaimer</span>
              </div>
              <p className="text-[#43544d] text-[11px]">{certificate.disclaimer}</p>
            </div>

            {/* Non-Refundable Notice */}
            <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-300 text-xs leading-relaxed">
              <div className="font-bold text-rose-800 flex items-center gap-1.5 mb-1">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Non-Refundable Policy</span>
              </div>
              <p className="text-rose-800/80 text-[11px]">
                All course fees are strictly non-refundable once payment is verified and the quiz has been initiated.
              </p>
            </div>

            {/* Back Link */}
            <div className="text-center">
              <Link
                href="/quiz-certification"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0B3C2D] hover:text-[#D98A2B] transition-colors no-underline"
              >
                <Award className="w-4 h-4" />
                <span>Take the Assessment</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
