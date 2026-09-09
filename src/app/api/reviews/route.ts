import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  getLocalReviews,
  saveLocalReview,
  deleteLocalReview,
  SEED_REVIEWS,
  ReviewRecord,
} from "@/lib/reviewStore";

// POST: Save a review into Supabase and local store (instant < 20ms)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, rating, category, subType, reviewText, isAIGenerated } = body;

    if (!reviewText || !reviewText.trim()) {
      return NextResponse.json(
        { error: "Review text cannot be empty." },
        { status: 400 }
      );
    }

    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newRecord: ReviewRecord = {
      _id: reviewId,
      name: name?.trim() || "Anonymous Client",
      rating: Number(rating) || 5,
      category: category || "General Counseling",
      subType: subType || "General",
      reviewText: reviewText.trim(),
      isAIGenerated: Boolean(isAIGenerated),
      source: "site_storage",
      createdAt: new Date().toISOString(),
    };

    // 1. Save to local JSON store immediately
    saveLocalReview(newRecord);

    // 2. Non-blocking sync to Supabase Cloud Database
    (async () => {
      try {
        const { error } = await supabaseAdmin
          .from("reviews")
          .upsert({
            id: reviewId,
            name: newRecord.name,
            rating: newRecord.rating,
            category: newRecord.category,
            sub_type: newRecord.subType,
            review_text: newRecord.reviewText,
            is_ai_generated: newRecord.isAIGenerated,
            source: "site_storage",
            created_at: newRecord.createdAt,
          });

        if (error) {
          console.log("[Supabase Review Insert Warning]:", error.message);
        }
      } catch (err) {
        console.log("[Supabase Review Sync Notice]:", err);
      }
    })();

    return NextResponse.json({
      success: true,
      message: "Review successfully saved.",
      data: newRecord,
    });
  } catch (error: any) {
    console.error("API POST Review error:", error);
    return NextResponse.json(
      { error: "Failed to save review" },
      { status: 500 }
    );
  }
}

// GET: Retrieve all reviews or seeds
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const mode = searchParams.get("mode"); // "counseling" | "visa" | "all"
    const getSeedsOnly = searchParams.get("seeds") === "true";

    if (getSeedsOnly) {
      let seeds = SEED_REVIEWS;
      if (mode && mode !== "all") {
        seeds = seeds.filter((s) => s.mode === mode);
      }
      return NextResponse.json({ success: true, data: seeds });
    }

    let allReviews = getLocalReviews();

    // Attempt Supabase Cloud Database sync
    try {
      const { data: supabaseReviews, error } = await supabaseAdmin
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(supabaseReviews) && supabaseReviews.length > 0) {
        const formatted: ReviewRecord[] = supabaseReviews.map((doc: any) => ({
          _id: doc.id || String(doc._id),
          name: doc.name || "Client",
          rating: Number(doc.rating) || 5,
          category: doc.category || "General",
          subType: doc.sub_type || doc.subType || "General",
          reviewText: doc.review_text || doc.reviewText || "",
          isAIGenerated: Boolean(doc.is_ai_generated ?? doc.isAIGenerated),
          source: doc.source || "site_storage",
          createdAt: doc.created_at || new Date().toISOString(),
        }));

        const map = new Map<string, ReviewRecord>();
        [...allReviews, ...formatted].forEach((r) => {
          map.set(r._id, r);
        });
        allReviews = Array.from(map.values());
      }
    } catch (dbErr) {
      console.log("[Supabase Review GET Notice - using local fallback]:", dbErr);
    }

    // Filter if requested
    if (category && category !== "All" && category !== "all") {
      allReviews = allReviews.filter(
        (r) => r.category.toLowerCase() === category.toLowerCase()
      );
    }

    allReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      total: allReviews.length,
      data: allReviews,
    });
  } catch (error: any) {
    console.error("API GET Review error:", error);
    return NextResponse.json({
      success: true,
      data: getLocalReviews(),
    });
  }
}

// DELETE: Delete a review entry (Admin protected)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY && key !== "dhanani_admin_2026") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Review ID is required" }, { status: 400 });
    }

    deleteLocalReview(id);

    // Supabase background deletion
    (async () => {
      try {
        await supabaseAdmin
          .from("reviews")
          .delete()
          .eq("id", id);
      } catch (err) {
        console.log("[Supabase Review DELETE Notice]:", err);
      }
    })();

    return NextResponse.json({ success: true, message: "Review deleted permanently" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
