"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Lock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Filter,
  Database,
  Search,
  CheckCircle,
  Inbox,
  LogOut,
  RefreshCw,
  Trash2,
  Edit3,
  X,
  Save,
  Tag,
  AlertTriangle,
  Star,
  Sparkles,
  ExternalLink,
  Layers,
  MessageCircle,
  Award,
  Download,
  FileText,
  CheckCircle2,
  XCircle,
  Eye
} from "lucide-react";

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt: string;
}

interface ReviewItem {
  _id: string;
  name: string;
  rating: number;
  category: string;
  subType?: string;
  reviewText: string;
  isAIGenerated: boolean;
  source: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  // Tab State: "leads" | "reviews" | "certifications"
  const [activeTab, setActiveTab] = useState<"leads" | "reviews" | "certifications">("leads");

  // Quiz & Digital Certificates State
  const [certAdminData, setCertAdminData] = useState<any | null>(null);
  const [certLoading, setCertLoading] = useState(false);
  const [previewCertModal, setPreviewCertModal] = useState<any | null>(null);
  const [certFilterStatus, setCertFilterStatus] = useState<string>("All");

  // Bookings / Leads State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Edit Booking State
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Reviews State (Site Storage)
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ReviewItem[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [reviewFilterCategory, setReviewFilterCategory] = useState("All");

  // Check session on mount
  useEffect(() => {
    // Check if session cookie exists by making a test request
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchBookings();
          fetchReviews();
          fetchCertAdminData();
        }
      }
    } catch (err) {
      // Not authenticated
    }
  };

  // Filter Bookings logic
  useEffect(() => {
    let result = bookings;
    
    if (filterType !== "All") {
      result = result.filter((b) => b.serviceType.toLowerCase().includes(filterType.toLowerCase()));
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(term) ||
          b.email.toLowerCase().includes(term) ||
          b.phone.toLowerCase().includes(term) ||
          b.message.toLowerCase().includes(term) ||
          b.serviceType.toLowerCase().includes(term)
      );
    }
    
    setFilteredBookings(result);
  }, [bookings, searchTerm, filterType]);

  // Filter Reviews logic
  useEffect(() => {
    let result = reviews;

    if (reviewFilterCategory !== "All") {
      result = result.filter((r) =>
        r.category.toLowerCase().includes(reviewFilterCategory.toLowerCase())
      );
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.category.toLowerCase().includes(term) ||
          r.reviewText.toLowerCase().includes(term) ||
          (r.subType && r.subType.toLowerCase().includes(term))
      );
    }

    setFilteredReviews(result);
  }, [reviews, searchTerm, reviewFilterCategory]);

  const fetchBookings = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings`);
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setBookings(data.data || []);
        setFilteredBookings(data.data || []);
        setSource(data.source || "Lead Submission Channels");
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (err) {
      console.log("Admin bookings fetch error:", err);
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (res.ok && data.success) {
        setReviews(data.data || []);
        setFilteredReviews(data.data || []);
      }
    } catch (err) {
      console.log("Admin reviews fetch error:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  const fetchCertAdminData = async () => {
    setCertLoading(true);
    try {
      const res = await fetch("/api/quiz-certificate/admin");
      const data = await res.json();
      if (res.ok && data.success) {
        setCertAdminData(data);
      }
    } catch (err) {
      console.log("Admin cert fetch error:", err);
    } finally {
      setCertLoading(false);
    }
  };

  const exportCertReport = (format: "csv" | "json") => {
    if (!certAdminData) return;
    if (format === "json") {
      const blob = new Blob([JSON.stringify(certAdminData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quiz_certificate_test_audit_${Date.now()}.json`;
      a.click();
    } else {
      const rows = [
        ["Candidate Name", "Email", "Phone", "Status", "Payment", "Score", "Percentage", "Passed", "Certificate ID"]
      ];
      (certAdminData.registrations || []).forEach((r: any) => {
        const p = (certAdminData.payments || []).find((pay: any) => pay.registrationId === r.registrationId);
        const a = (certAdminData.attempts || []).find((att: any) => att.registrationId === r.registrationId);
        const c = (certAdminData.certificates || []).find((cert: any) => cert.registrationId === r.registrationId);
        rows.push([
          `"${r.fullName || ""}"`,
          `"${r.email || ""}"`,
          `"${r.phone || ""}"`,
          `"${r.status || ""}"`,
          `"${p?.status || "unpaid"}"`,
          `"${a ? `${a.scoreMarks}/${a.totalMarks}` : "N/A"}"`,
          `"${a ? `${a.percentage}%` : "N/A"}"`,
          `"${a ? (a.passed ? "PASS" : "FAIL") : "N/A"}"`,
          `"${c?.certificateId || "None"}"`
        ]);
      });
      const csvContent = rows.map((e) => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quiz_certificate_candidates_${Date.now()}.csv`;
      a.click();
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!password) return;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchBookings();
        fetchReviews();
        fetchCertAdminData();
      } else {
        const data = await res.json();
        setLoginError(data.message || "Invalid administrator password");
      }
    } catch (err) {
      setLoginError("Network error. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } catch (err) {
      // Ignore errors on logout
    }
    setIsAuthenticated(false);
    setPassword("");
    setBookings([]);
    setFilteredBookings([]);
    setReviews([]);
    setFilteredReviews([]);
  };

  const handleRefresh = () => {
    fetchBookings();
    fetchReviews();
  };

  // Delete Lead Handler
  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead entry?")) {
      return;
    }

    setBookings((prev) => prev.filter((b) => b._id !== id));
    setFilteredBookings((prev) => prev.filter((b) => b._id !== id));

    setDeletingId(id);
    try {
      await fetch(`/api/bookings?id=${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log("Error deleting lead from server:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Delete Review Handler (Site Storage)
  const handleDeleteReview = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this review from site storage?")) {
      return;
    }

    setReviews((prev) => prev.filter((r) => r._id !== id));
    setFilteredReviews((prev) => prev.filter((r) => r._id !== id));

    setDeletingReviewId(id);
    try {
      await fetch(`/api/reviews?id=${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log("Error deleting review:", err);
    } finally {
      setDeletingReviewId(null);
    }
  };

  // Edit Lead Handlers
  const handleStartEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setEditForm({
      name: booking.name,
      email: booking.email || "",
      phone: booking.phone || "",
      serviceType: booking.serviceType || "General Counseling Inquiry",
      message: booking.message || "",
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    setIsUpdating(true);
    setUpdateError(null);
    try {
      const res = await fetch(`/api/bookings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingBooking._id,
          ...editForm,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookings(
          bookings.map((b) =>
            b._id === editingBooking._id ? { ...b, ...editForm } : b
          )
        );
        setEditingBooking(null);
        setUpdateError(null);
      } else {
        setUpdateError(data.error || "Failed to update lead");
      }
    } catch (err) {
      setUpdateError("Network error. Please check your connection and try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Multi-Source Metrics Calculations
  const totalCount = bookings.length;
  const quizLeadsCount = bookings.filter((b) => b.serviceType.toLowerCase().includes("quiz") || b.serviceType.toLowerCase().includes("check-in")).length;
  const directBookingsCount = bookings.filter((b) => b.serviceType.toLowerCase().includes("counseling") || b.serviceType.toLowerCase().includes("parenting") || b.serviceType.toLowerCase().includes("relationship")).length;
  const speakingCount = bookings.filter((b) => b.serviceType.toLowerCase().includes("speaking") || b.serviceType.toLowerCase().includes("keynote")).length;
  const resourceCount = bookings.filter((b) => b.serviceType.toLowerCase().includes("resource") || b.serviceType.toLowerCase().includes("guide") || b.serviceType.toLowerCase().includes("download")).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] px-4 py-12 text-[#2E2A26]">
        <div className="max-w-md w-full bg-[#FFFDF9] p-8 rounded-3xl shadow-xl border border-[#E6DEC8] space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#E6DEC8] flex items-center justify-center mx-auto shadow-sm overflow-hidden p-1">
              <Image
                src="/logo.png"
                alt="Nikunj Dhanani Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-serif-display font-bold text-[#1E2C24]">
              Practitioner Admin Portal
            </h1>
            <p className="text-xs text-[#5E5852]">
              Enter administrator password to view and manage client leads and reviews.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="adminKey" className="block text-xs font-bold uppercase tracking-wider text-[#1E2C24] mb-1.5">
                Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C847C]" />
                <input
                  type="password"
                  id="adminKey"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] text-xs font-medium text-[#1E2C24] focus:outline-none focus:border-[#6B7F62]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-full bg-[#1E2C24] hover:bg-[#142019] text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-2 glow-btn"
            >
              {loading ? <span>Verifying Password...</span> : <span>Access Admin Dashboard</span>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-8 sm:py-12 text-[#2E2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 bg-[#FFFDF9] p-6 rounded-3xl border border-[#E6DEC8] shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E6DEC8] flex items-center justify-center shadow-xs overflow-hidden p-1 shrink-0">
              <Image
                src="/logo.png"
                alt="Nikunj Dhanani Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C97B5B] block">
                Nikunj Dhanani • Master Practice Admin Center
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1E2C24]">
                {activeTab === "leads" ? "Multi-Source Client Inquiries & Leads" : "Site Storage Client Reviews"}
              </h1>
              <p className="text-xs text-[#5E5852] flex items-center mt-1">
                <Database className="w-3.5 h-3.5 mr-1.5 text-[#6B7F62]" />
                Lead Sources: <strong className="ml-1 text-[#1E2C24] font-bold">{source}</strong>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link
              href="/review-generator"
              className="px-3.5 py-2.5 rounded-2xl border border-[#E6DEC8] bg-[#FFFDF9] hover:bg-[#FAF6F0] text-[#1E2C24] text-xs font-bold transition-all flex items-center space-x-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>Review Generator</span>
              <ExternalLink className="w-3 h-3 text-[#8C847C]" />
            </Link>

            <button
              onClick={handleRefresh}
              className="p-3 rounded-2xl border border-[#E6DEC8] bg-[#FAF6F0] hover:bg-[#EBF0E8] text-[#1E2C24] transition-all flex items-center space-x-1.5 text-xs font-bold shadow-2xs"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading || reviewsLoading ? "animate-spin text-[#C97B5B]" : "text-[#6B7F62]"}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 font-bold transition-all text-xs flex items-center space-x-1.5 border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* PRIMARY TAB SWITCHER: Leads vs Reviews */}
        <div className="flex items-center space-x-3 border-b border-[#E6DEC8] pb-1">
          <button
            onClick={() => setActiveTab("leads")}
            className={`pb-3 px-4 text-sm font-bold transition-all border-b-2 flex items-center space-x-2 ${
              activeTab === "leads"
                ? "border-[#1E2C24] text-[#1E2C24]"
                : "border-transparent text-[#8C847C] hover:text-[#1E2C24]"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#C97B5B]" />
            <span>Client Inquiries & Leads ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 px-4 text-sm font-bold transition-all border-b-2 flex items-center space-x-2 ${
              activeTab === "reviews"
                ? "border-[#1E2C24] text-[#1E2C24]"
                : "border-transparent text-[#8C847C] hover:text-[#1E2C24]"
            }`}
          >
            <Star className="w-4 h-4 text-[#F59E0B]" />
            <span>Site Storage Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("certifications");
              fetchCertAdminData();
            }}
            className={`pb-3 px-4 text-sm font-bold transition-all border-b-2 flex items-center space-x-2 ${
              activeTab === "certifications"
                ? "border-[#1E2C24] text-[#1E2C24]"
                : "border-transparent text-[#8C847C] hover:text-[#1E2C24]"
            }`}
          >
            <Award className="w-4 h-4 text-[#D98A2B]" />
            <span>Quiz & Digital Certifications ({certAdminData?.stats?.totalCertificates || 0})</span>
          </button>
        </div>

        {/* ─── TAB 1: CLIENT LEADS VIEW ─── */}
        {activeTab === "leads" && (
          <div className="space-y-8">
            {/* Multi-Source Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Total Submissions", val: totalCount, border: "border-l-[#1E2C24]" },
                { label: "Stress Quiz Leads", val: quizLeadsCount, border: "border-l-[#C97B5B]" },
                { label: "1-on-1 Counseling", val: directBookingsCount, border: "border-l-[#6B7F62]" },
                { label: "Speaking Requests", val: speakingCount, border: "border-l-[#D98A2B]" },
                { label: "Resource Downloads", val: resourceCount, border: "border-l-[#8A7B9C]" }
              ].map((metric, idx) => (
                <div key={idx} className={`bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] border-l-4 ${metric.border} shadow-2xs space-y-1`}>
                  <span className="block text-[11px] font-bold text-[#8C847C] uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <span className="block text-2xl sm:text-3xl font-serif-display font-bold text-[#1E2C24]">
                    {metric.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Filters and Controls */}
            <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C847C]" />
                <input
                  type="text"
                  placeholder="Search leads by name, phone, email, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] focus:outline-none focus:border-[#6B7F62] text-xs font-semibold text-[#1E2C24]"
                />
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <Filter className="w-4 h-4 text-[#8C847C]" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] focus:outline-none text-xs font-bold text-[#1E2C24]"
                >
                  <option value="All">All Lead Sources</option>
                  <option value="Quiz">Stress Quiz Leads</option>
                  <option value="Counseling">Counseling & Coaching</option>
                  <option value="Parenting">Parenting</option>
                  <option value="Relationship">Relationship Repair</option>
                  <option value="Speaking">Keynote Speaking</option>
                  <option value="Resource">Resource Downloads</option>
                </select>
              </div>
            </div>

            {/* Client Inquiries Display Grid */}
            {loading && bookings.length === 0 ? (
              <div className="text-center py-20 bg-[#FFFDF9] rounded-3xl border border-[#E6DEC8]">
                <RefreshCw className="w-10 h-10 animate-spin text-[#C97B5B] mx-auto mb-3" />
                <p className="text-xs font-bold text-[#1E2C24]">Fetching Client Submissions...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-[#FFFDF9] rounded-3xl p-16 text-center space-y-3 border border-[#E6DEC8]">
                <Inbox className="w-12 h-12 text-[#8C847C] mx-auto" />
                <h3 className="text-lg font-serif-display font-bold text-[#1E2C24]">No Inquiries Found</h3>
                <p className="text-xs text-[#5E5852] max-w-md mx-auto">
                  No entries match your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-[#FFFDF9] hover:bg-[#FAF6F0]/70 transition-all p-6 rounded-2xl border border-[#E6DEC8] shadow-sm flex flex-col justify-between space-y-4 border-l-4 border-l-[#C97B5B] relative group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-serif-display font-bold text-[#1E2C24] leading-snug">
                            {booking.name}
                          </h3>
                          <span className="inline-block px-3 py-1 mt-1.5 rounded-full bg-[#F9EFEA] text-[#C97B5B] text-[10px] font-extrabold uppercase tracking-wider border border-[#C97B5B]/30">
                            🏷️ {booking.serviceType}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => handleStartEdit(booking)}
                            className="p-2 rounded-xl bg-[#FAF6F0] hover:bg-[#EBF0E8] text-[#1E2C24] border border-[#E6DEC8] transition-colors"
                            title="Edit Lead Details"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#6B7F62]" />
                          </button>

                          <button
                            onClick={() => handleDeleteLead(booking._id)}
                            disabled={deletingId === booking._id}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors"
                            title="Delete Lead Entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] font-semibold text-[#5E5852] bg-[#FAF6F0] px-3 py-1.5 rounded-xl border border-[#E6DEC8] inline-flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-[#6B7F62] mr-1" />
                        <span>
                          Submitted: {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                        <div className="flex items-center space-x-2 text-[#1E2C24] font-semibold bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E6DEC8]">
                          <Phone className="w-4 h-4 text-[#6B7F62] shrink-0" />
                          <a href={`tel:${booking.phone}`} className="hover:underline text-[#1E2C24]">
                            {booking.phone ? `+91 ${booking.phone}` : "No Phone"}
                          </a>
                        </div>

                        {booking.email ? (
                          <div className="flex items-center space-x-2 text-[#1E2C24] font-semibold bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E6DEC8]">
                            <Mail className="w-4 h-4 text-[#6B7F62] shrink-0" />
                            <a href={`mailto:${booking.email}`} className="hover:underline text-[#1E2C24] truncate">
                              {booking.email}
                            </a>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-[#8C847C] font-medium bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E6DEC8]">
                            <Mail className="w-4 h-4 text-[#8C847C] shrink-0" />
                            <span>Email Optional</span>
                          </div>
                        )}
                      </div>

                      {booking.message && (
                        <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E6DEC8] text-xs text-[#2E2A26] space-y-1">
                          <span className="text-[10px] font-bold text-[#6B7F62] uppercase tracking-wider block">
                            Submission Context / Client Notes:
                          </span>
                          <div className="flex items-start space-x-2">
                            <MessageSquare className="w-4 h-4 text-[#C97B5B] shrink-0 mt-0.5" />
                            <p className="text-xs text-[#2E2A26] font-medium leading-relaxed">
                              {booking.message}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#E6DEC8] flex items-center justify-between">
                      <span className="text-[11px] text-[#6B7F62] font-bold uppercase flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 mr-1 text-[#6B7F62]" />
                        Confidential Submission
                      </span>
                      
                      {booking.phone && (
                        <a
                          href={`https://wa.me/91${booking.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hi ${booking.name}, thank you for submitting an inquiry regarding ${booking.serviceType}. This is Nikunj Dhanani.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold transition-all shadow-2xs flex items-center space-x-1"
                        >
                          <span>Reply on WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: SITE STORAGE REVIEWS VIEW ─── */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Reviews Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] border-l-4 border-l-[#1E2C24] shadow-2xs space-y-1">
                <span className="block text-[11px] font-bold text-[#8C847C] uppercase tracking-wider">
                  Total Reviews Stored
                </span>
                <span className="block text-2xl sm:text-3xl font-serif-display font-bold text-[#1E2C24]">
                  {reviews.length}
                </span>
              </div>

              <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] border-l-4 border-l-[#F59E0B] shadow-2xs space-y-1">
                <span className="block text-[11px] font-bold text-[#8C847C] uppercase tracking-wider">
                  5-Star Rating Ratio
                </span>
                <span className="block text-2xl sm:text-3xl font-serif-display font-bold text-[#1E2C24]">
                  {reviews.length > 0
                    ? `${Math.round((reviews.filter((r) => r.rating === 5).length / reviews.length) * 100)}%`
                    : "100%"}
                </span>
              </div>

              <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] border-l-4 border-l-[#6366F1] shadow-2xs space-y-1">
                <span className="block text-[11px] font-bold text-[#8C847C] uppercase tracking-wider">
                  AI-Generated Reviews
                </span>
                <span className="block text-2xl sm:text-3xl font-serif-display font-bold text-[#1E2C24]">
                  {reviews.filter((r) => r.isAIGenerated).length}
                </span>
              </div>

              <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] border-l-4 border-l-[#10B981] shadow-2xs space-y-1">
                <span className="block text-[11px] font-bold text-[#8C847C] uppercase tracking-wider">
                  Active Storage Engine
                </span>
                <span className="block text-base sm:text-lg font-bold text-[#0B3C2D] pt-1">
                  Lead Storage: <strong className="ml-1 text-[#0B3C2D] font-bold">Site Database</strong>
                </span>
              </div>
            </div>

            {/* Reviews Filter and Search */}
            <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C847C]" />
                <input
                  type="text"
                  placeholder="Search reviews by content, author, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] focus:outline-none focus:border-[#6B7F62] text-xs font-semibold text-[#1E2C24]"
                />
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <Filter className="w-4 h-4 text-[#8C847C]" />
                <select
                  value={reviewFilterCategory}
                  onChange={(e) => setReviewFilterCategory(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] focus:outline-none text-xs font-bold text-[#1E2C24]"
                >
                  <option value="All">All Categories</option>
                  <option value="Parenting">Parenting Coaching</option>
                  <option value="Relationship">Relationship Repair</option>
                  <option value="Burnout">Corporate Burnout</option>
                  <option value="Life">Life Coaching</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Reviews Cards Display */}
            {reviewsLoading && reviews.length === 0 ? (
              <div className="text-center py-20 bg-[#FFFDF9] rounded-3xl border border-[#E6DEC8]">
                <RefreshCw className="w-10 h-10 animate-spin text-[#C97B5B] mx-auto mb-3" />
                <p className="text-xs font-bold text-[#1E2C24]">Loading Reviews from Site Storage...</p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="bg-[#FFFDF9] rounded-3xl p-16 text-center space-y-3 border border-[#E6DEC8]">
                <Inbox className="w-12 h-12 text-[#8C847C] mx-auto" />
                <h3 className="text-lg font-serif-display font-bold text-[#1E2C24]">No Reviews Found</h3>
                <p className="text-xs text-[#5E5852] max-w-md mx-auto">
                  No reviews match your current filters. Generate or submit reviews from the{" "}
                  <Link href="/review-generator" className="text-[#0B3C2D] font-bold underline">
                    Review Generator Page
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredReviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="bg-[#FFFDF9] hover:bg-[#FAF6F0]/70 transition-all p-5 rounded-2xl border border-[#E6DEC8] shadow-sm flex flex-col justify-between space-y-4 relative group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center text-[#F59E0B]">
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="inline-block px-2.5 py-0.5 mt-1.5 rounded-full bg-[#EBF0E8] text-[#0B3C2D] text-[10px] font-extrabold uppercase tracking-wider">
                            {rev.category} {rev.subType ? `• ${rev.subType}` : ""}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteReview(rev._id)}
                          disabled={deletingReviewId === rev._id}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#1E2C24] font-medium leading-relaxed italic">
                        "{rev.reviewText}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E6DEC8] flex items-center justify-between text-[11px] text-[#8C847C]">
                      <span className="font-bold text-[#1E2C24]">{rev.name || "Anonymous Client"}</span>
                      <span>
                        {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 3: QUIZ & DIGITAL CERTIFICATIONS (SANDBOX AUDIT) ─── */}
        {activeTab === "certifications" && (
          <div className="space-y-8 animate-fade-in">
            {/* Certifications Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {[
                { label: "Candidates", val: certAdminData?.stats?.totalRegistrations || 0, border: "border-l-[#1E2C24]" },
                { label: "Verified Paid", val: certAdminData?.stats?.verifiedPayments || 0, border: "border-l-[#10B981]" },
                { label: "Total Attempts", val: certAdminData?.stats?.totalAttempts || 0, border: "border-l-[#3B82F6]" },
                { label: "Passed (≥5/10)", val: certAdminData?.stats?.passedAttempts || 0, border: "border-l-[#059669]" },
                { label: "Failed (<5/10)", val: certAdminData?.stats?.failedAttempts || 0, border: "border-l-[#EF4444]" },
                { label: "Test Previews", val: certAdminData?.stats?.totalCertificates || 0, border: "border-l-[#D98A2B]" },
              ].map((m, idx) => (
                <div key={idx} className={`bg-[#FFFDF9] p-4 rounded-2xl border border-[#E6DEC8] border-l-4 ${m.border} shadow-2xs space-y-1`}>
                  <span className="block text-[10px] font-bold text-[#8C847C] uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span className="block text-2xl font-serif-display font-bold text-[#1E2C24]">
                    {m.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Controls, Duplicate Warning, & Exports */}
            <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#E6DEC8] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <span className="text-xs font-bold text-[#1E2C24]">Filter by Result:</span>
                {["All", "Passed", "Failed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setCertFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      certFilterStatus === st
                        ? "bg-[#1E2C24] text-white"
                        : "bg-[#FAF6F0] text-[#5E5852] hover:bg-[#E6DEC8]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => exportCertReport("csv")}
                  className="px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#E6DEC8] text-[#1E2C24] font-bold text-xs flex items-center space-x-1.5 border border-[#E6DEC8] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#C97B5B]" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => exportCertReport("json")}
                  className="px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#E6DEC8] text-[#1E2C24] font-bold text-xs flex items-center space-x-1.5 border border-[#E6DEC8] transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C97B5B]" />
                  <span>Export JSON</span>
                </button>
                <Link
                  href="/quiz-certification"
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-[#D98A2B] hover:bg-[#bd7522] text-black font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Open Quiz Page</span>
                </Link>
              </div>
            </div>

            {/* Duplicate Notice if any */}
            {certAdminData?.duplicateEmails && certAdminData.duplicateEmails.length > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Duplicate Candidate Registrations Detected:</div>
                  <div className="mt-1 space-y-0.5">
                    {certAdminData.duplicateEmails.map((d: any, idx: number) => (
                      <div key={idx}>
                        • <code>{d.email}</code> ({d.count} registrations)
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Candidate Records Table */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#E6DEC8] shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6F0] border-b border-[#E6DEC8] text-[#5E5852] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3 px-4">Candidate Name</th>
                      <th className="py-3 px-4">Email / Phone</th>
                      <th className="py-3 px-4">Sandbox Fee (₹250)</th>
                      <th className="py-3 px-4">Quiz Score</th>
                      <th className="py-3 px-4">Eligibility</th>
                      <th className="py-3 px-4">Certificate ID</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6DEC8]/60">
                    {(() => {
                      const regs = certAdminData?.registrations || [];
                      let filtered = regs;
                      if (certFilterStatus === "Passed") {
                        filtered = regs.filter((r: any) => {
                          const att = certAdminData?.attempts.find((a: any) => a.registrationId === r.registrationId);
                          return att?.passed;
                        });
                      } else if (certFilterStatus === "Failed") {
                        filtered = regs.filter((r: any) => {
                          const att = certAdminData?.attempts.find((a: any) => a.registrationId === r.registrationId);
                          return att && !att.passed;
                        });
                      }

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-[#8C847C]">
                              No quiz candidates recorded in sandbox storage yet.
                            </td>
                          </tr>
                        );
                      }

                      return filtered.map((r: any) => {
                        const pay = certAdminData?.payments.find((p: any) => p.registrationId === r.registrationId);
                        const att = certAdminData?.attempts.find((a: any) => a.registrationId === r.registrationId);
                        const cert = certAdminData?.certificates.find((c: any) => c.registrationId === r.registrationId);

                        return (
                          <tr key={r.registrationId} className="hover:bg-[#FAF6F0]/60 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-[#1E2C24]">
                              {r.fullName}
                            </td>
                            <td className="py-3.5 px-4 text-[#5E5852]">
                              <div>{r.email}</div>
                              <div className="text-[11px] text-[#8C847C]">{r.phone}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                                pay?.status === "verified"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : pay?.status === "failed"
                                  ? "bg-red-50 text-red-800 border border-red-200"
                                  : "bg-amber-50 text-amber-800 border border-amber-200"
                              }`}>
                                {pay?.status || "Unpaid"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              {att ? (
                                <div>
                                  <span className="font-bold text-[#1E2C24]">{att.scoreMarks}/10</span>
                                  <span className="text-[11px] text-[#8C847C] ml-1">({att.percentage}%)</span>
                                </div>
                              ) : (
                                <span className="text-[#8C847C] italic">Not taken</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              {att ? (
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                                  att.passed
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {att.passed ? "Eligible (Pass)" : "Ineligible (Fail)"}
                                </span>
                              ) : (
                                <span className="text-[#8C847C]">Pending Quiz</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#D98A2B]">
                              {cert?.certificateId || "—"}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              {cert ? (
                                <button
                                  onClick={() => setPreviewCertModal(cert)}
                                  className="px-3 py-1.5 rounded-lg bg-[#FAF6F0] hover:bg-[#E6DEC8] text-[#1E2C24] font-bold text-xs flex items-center space-x-1 ml-auto border border-[#E6DEC8]"
                                >
                                  <Eye className="w-3.5 h-3.5 text-[#C97B5B]" />
                                  <span>View Preview</span>
                                </button>
                              ) : (
                                <span className="text-[#8C847C] text-[11px]">No Certificate</span>
                              )}
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TEST CERTIFICATE PREVIEW MODAL IN ADMIN DASHBOARD */}
        {previewCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div
              className="relative w-full max-w-3xl bg-[#FFFDF9] text-[#13221C] rounded-2xl sm:rounded-3xl p-6 sm:p-9 border-[3px] sm:border-[4px] border-[#D98A2B] shadow-2xl my-auto overflow-hidden"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, #FFFDF9 0%, #FAF5EC 100%)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewCertModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#0B3C2D] z-30 transition-colors cursor-pointer"
                title="Close Certificate Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ── 1. Top-Left Sweeping Ribbon (SVG) ── */}
              <svg
                className="absolute top-0 left-0 w-36 sm:w-56 h-36 sm:h-56 pointer-events-none select-none z-0"
                viewBox="0 0 300 300"
                fill="none"
              >
                <path d="M 0 0 L 250 0 C 210 60 160 130 90 190 C 45 230 0 250 0 250 Z" fill="#06251C" />
                <path d="M 0 0 L 210 0 C 170 55 130 115 70 175 C 35 210 0 228 Z" fill="#0B3C2D" />
                <path d="M 0 235 C 28 230 65 210 102 170 C 155 116 195 56 225 0 L 236 0 C 205 60 163 122 108 178 C 70 218 31 239 0 245 Z" fill="url(#adminRibbonGoldTL)" />
                <path d="M 0 0 L 160 0 C 125 42 90 90 48 140 C 20 170 0 185 Z" fill="#124E3B" />
                <path d="M 0 190 C 18 180 46 160 74 125 C 112 80 142 38 165 0 L 169 0 C 145 40 114 84 76 128 C 47 163 19 183 0 193 Z" fill="#F3D279" />
                <defs>
                  <linearGradient id="adminRibbonGoldTL" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B8731F" />
                    <stop offset="35%" stopColor="#F3D279" />
                    <stop offset="65%" stopColor="#D98A2B" />
                    <stop offset="100%" stopColor="#9D5D14" />
                  </linearGradient>
                </defs>
              </svg>

              {/* ── 2. Bottom-Right Sweeping Ribbon (SVG) ── */}
              <svg
                className="absolute bottom-0 right-0 w-36 sm:w-56 h-36 sm:h-56 pointer-events-none select-none z-0 rotate-180"
                viewBox="0 0 300 300"
                fill="none"
              >
                <path d="M 0 0 L 250 0 C 210 60 160 130 90 190 C 45 230 0 250 0 250 Z" fill="#06251C" />
                <path d="M 0 0 L 210 0 C 170 55 130 115 70 175 C 35 210 0 228 Z" fill="#0B3C2D" />
                <path d="M 0 235 C 28 230 65 210 102 170 C 155 116 195 56 225 0 L 236 0 C 205 60 163 122 108 178 C 70 218 31 239 0 245 Z" fill="url(#adminRibbonGoldBR)" />
                <path d="M 0 0 L 160 0 C 125 42 90 90 48 140 C 20 170 0 185 Z" fill="#124E3B" />
                <path d="M 0 190 C 18 180 46 160 74 125 C 112 80 142 38 165 0 L 169 0 C 145 40 114 84 76 128 C 47 163 19 183 0 193 Z" fill="#F3D279" />
                <defs>
                  <linearGradient id="adminRibbonGoldBR" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B8731F" />
                    <stop offset="35%" stopColor="#F3D279" />
                    <stop offset="65%" stopColor="#D98A2B" />
                    <stop offset="100%" stopColor="#9D5D14" />
                  </linearGradient>
                </defs>
              </svg>

              {/* ── 3. Banknote Security Mesh ── */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] z-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="adminCertGuilloche" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M0,50 Q25,10 50,50 T100,50 M0,25 Q25,-15 50,25 T100,25 M0,75 Q25,35 50,75 T100,75" stroke="#0B3C2D" strokeWidth="0.75" fill="none" />
                    <path d="M50,0 Q10,25 50,50 T50,100 M25,0 Q-15,25 25,50 T25,100 M75,0 Q35,25 75,50 T75,100" stroke="#D98A2B" strokeWidth="0.5" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#adminCertGuilloche)" />
              </svg>

              {/* Inset Gold Borders */}
              <div className="absolute inset-2 sm:inset-3 border border-[#D98A2B]/40 rounded-xl sm:rounded-2xl pointer-events-none z-1" />
              <div className="absolute inset-3.5 sm:inset-5 border border-[#D98A2B]/20 rounded-lg sm:rounded-xl pointer-events-none z-1" />

              {/* Watermark overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-1 overflow-hidden">
                <div className="transform -rotate-20 text-rose-950/[0.05] text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.25em] text-center border-4 border-rose-950/[0.05] py-3 px-8 rounded-3xl">
                  {previewCertModal.watermark || "TEST PREVIEW – NOT VALID FOR OFFICIAL USE"}
                </div>
              </div>

              {/* Certificate content */}
              <div className="relative z-10 text-center space-y-3 py-1">
                {/* Top Logo Monogram */}
                <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="w-14 h-14 rounded-full p-1 bg-gradient-to-tr from-[#9D5D14] via-[#F3D279] to-[#D98A2B] shadow-md shadow-[#D98A2B]/20 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#FFFDF9] border border-[#D98A2B]/40 p-1 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/logo.png"
                        alt="Nikunj Dhanani Official Emblem"
                        width={50}
                        height={50}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-[#0B3C2D] font-extrabold">
                    Nikunj Dhanani • Child Psychology & Parenting
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-2xl sm:text-3xl font-serif-display font-extrabold text-[#0B3C2D] tracking-wide">
                    CERTIFICATE OF ACHIEVEMENT
                  </h3>
                  <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D98A2B]" />
                    <span className="text-[#D98A2B] text-xs">◆</span>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-[#9D5D14] font-bold">
                      Non-Formal Educational Program Preview
                    </span>
                    <span className="text-[#D98A2B] text-xs">◆</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D98A2B]" />
                  </div>
                </div>

                <div className="text-[10px] text-[#586C63] font-semibold tracking-wider uppercase">
                  Presented to Candidate
                </div>

                {/* Candidate Calligraphy Name */}
                <div className="py-0.5">
                  <div className="font-signature text-3xl sm:text-4xl text-[#0B3C2D] tracking-normal leading-tight">
                    {previewCertModal.candidateName}
                  </div>
                  <div className="w-44 h-[2px] bg-gradient-to-r from-transparent via-[#D98A2B] to-transparent mx-auto mt-1" />
                </div>

                <div className="space-y-0.5 max-w-lg mx-auto">
                  <p className="text-[11px] text-[#43544d] font-medium leading-relaxed">
                    for successfully demonstrating foundational awareness and passing the assessment:
                  </p>
                  <div className="text-base sm:text-lg font-serif-display font-bold text-[#0B3C2D]">
                    {previewCertModal.courseName}
                  </div>
                </div>

                {/* Metric Badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-[#0B3C2D] font-semibold pt-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0B3C2D]/8 border border-[#0B3C2D]/15">
                    Score: <strong>{previewCertModal.scorePercentage}%</strong>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D98A2B]/10 border border-[#D98A2B]/25">
                    ID: <strong className="font-mono text-[#9D5D14]">{previewCertModal.certificateId}</strong>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0B3C2D]/8 border border-[#0B3C2D]/15">
                    Date: <strong>{previewCertModal.issueDate}</strong>
                  </span>
                </div>

                {/* Signatories & Seal */}
                <div className="grid grid-cols-3 items-end pt-3 pb-1 border-t border-[#0B3C2D]/10 mt-2 max-w-lg mx-auto w-full">
                  <div className="text-left space-y-0.5">
                    <div className="text-[10px] font-mono text-[#0B3C2D] font-bold">{previewCertModal.issueDate}</div>
                    <div className="w-20 h-[1px] bg-[#0B3C2D]/30" />
                    <div className="text-[8px] font-bold uppercase tracking-wider text-[#0B3C2D]">Date & Verification</div>
                    <div className="text-[7px] text-[#7b8d86] font-mono">{previewCertModal.certificateId}</div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="relative flex flex-col items-center">
                      <div className="absolute -bottom-2 flex justify-center gap-1 z-0">
                        <div className="w-2.5 h-5 bg-gradient-to-b from-[#D98A2B] to-[#8C5311] -rotate-12 rounded-b-xs shadow-sm" />
                        <div className="w-2.5 h-5 bg-gradient-to-b from-[#D98A2B] to-[#8C5311] rotate-12 rounded-b-xs shadow-sm" />
                      </div>
                      <div className="relative z-10 w-14 h-14 rounded-full p-1 bg-gradient-to-tr from-[#9D5D14] via-[#FCE8B3] to-[#D98A2B] shadow-md flex items-center justify-center">
                        <div className="w-full h-full rounded-full border border-[#FFFDF9]/60 p-0.5 flex items-center justify-center bg-gradient-to-br from-[#FFE7A3] via-[#D98A2B] to-[#784005]">
                          <div className="w-full h-full rounded-full bg-[#0B3C2D] border border-[#F3D279]/50 flex flex-col items-center justify-center text-center p-1">
                            <span className="text-[6px] font-extrabold uppercase tracking-widest text-[#F3D279]">VERIFIED</span>
                            <span className="text-[5px] text-white/95 uppercase">EXCELLENCE</span>
                            <span className="text-[5px] text-[#F3D279]">★★★</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-0.5">
                    <div className="font-signature text-xl text-[#0B3C2D] leading-none">Nikunj Dhanani</div>
                    <div className="w-20 h-[1px] bg-[#0B3C2D]/30 ml-auto" />
                    <div className="text-[8px] font-bold uppercase tracking-wider text-[#0B3C2D]">Nikunj Dhanani</div>
                    <div className="text-[7px] text-[#7b8d86]">Parenting Coach & Counselor</div>
                  </div>
                </div>

                <p className="text-[8px] text-[#43544d]/80 italic border-t border-[#0B3C2D]/10 pt-2 leading-relaxed max-w-md mx-auto">
                  &quot;{previewCertModal.disclaimer}&quot;
                </p>

                <div className="pt-1 text-[9px] text-amber-800 font-bold uppercase tracking-wider">
                  Status: {previewCertModal.status}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT LEAD MODAL */}
        {editingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2C24]/75 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl shadow-2xl p-6 sm:p-8 border border-[#E6DEC8] my-auto text-[#2E2A26]">
              <div className="flex items-center justify-between border-b border-[#E6DEC8] pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-[#6B7F62] text-white flex items-center justify-center">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif-display font-bold text-lg text-[#1E2C24]">
                      Edit Lead Information
                    </h3>
                    <span className="text-[11px] text-[#5E5852]">ID: {editingBooking._id}</span>
                  </div>
                </div>
                <button
                  onClick={() => setEditingBooking(null)}
                  className="p-1.5 rounded-full text-[#8C847C] hover:bg-[#FAF6F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-left">
                {updateError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
                    {updateError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-[#1E2C24] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] text-xs font-medium text-[#1E2C24]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E2C24] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] text-xs font-medium text-[#1E2C24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2C24] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] text-xs font-medium text-[#1E2C24]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2C24] mb-1">Service Type / Lead Source Tag</label>
                  <select
                    value={editForm.serviceType}
                    onChange={(e) => setEditForm({ ...editForm, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] text-xs font-bold text-[#1E2C24]"
                  >
                    <option value="2-Min Stress Check-in Lead">2-Min Stress Check-in Lead</option>
                    <option value="Parenting Coaching">Parenting Coaching</option>
                    <option value="Relationship Repair">Relationship Repair</option>
                    <option value="Counselling & Life Coaching">Counselling & Life Coaching</option>
                    <option value="Keynote Speaking Request">Keynote Speaking Request</option>
                    <option value="Resource Download">Resource Download</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2C24] mb-1">Context Notes & Assessment Summary</label>
                  <textarea
                    rows={3}
                    value={editForm.message}
                    onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DEC8] bg-[#FAF6F0] text-xs font-medium text-[#1E2C24]"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingBooking(null)}
                    className="px-5 py-2.5 rounded-full border border-[#E6DEC8] text-xs font-bold text-[#5E5852] hover:bg-[#FAF6F0]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 py-2.5 rounded-full bg-[#C97B5B] hover:bg-[#BD5C3D] text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 glow-btn"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
