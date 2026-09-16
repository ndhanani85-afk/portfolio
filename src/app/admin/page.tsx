"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  MessageCircle
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
  
  // Tab State: "leads" | "reviews"
  const [activeTab, setActiveTab] = useState<"leads" | "reviews">("leads");

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
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#1E2C24] flex items-center justify-center text-white mx-auto shadow-md">
              <Shield className="w-7 h-7 text-[#C97B5B]" />
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
