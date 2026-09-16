import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  getLocalReviews,
  saveLocalReview,
  deleteLocalReview,
  SEED_REVIEWS,
  ReviewRecord,
} from "@/lib/reviewStore";
import { checkRateLimit, maybeCleanupStaleEntries } from "@/lib/rateLimit";
import { validateSession, getSessionCookieName } from "@/lib/session";

function getSessionToken(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map(c => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${getSessionCookieName()}=`)) {
      return cookie.substring(getSessionCookieName().length + 1);
    }
  }
  return null;
}

async function isAdmin(req: Request): Promise<boolean> {
  const token = getSessionToken(req);
  return validateSession(token);
}

// POST: Save a review into Supabase and local store (instant < 20ms)
export async function POST(req: Request) {
  maybeCleanupStaleEntries();

  const rateResult = checkRateLimit(req);
  if (!rateResult.allowed) {
    return NextResponse.json(
      {
        error: "Too many submissions. Please wait a few minutes before trying again.",
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // --- Input Validation ---
    const rawName = typeof body.name === "string" ? body.name : "";
    const rawReviewText = typeof body.reviewText === "string" ? body.reviewText : "";
    const rawCategory = typeof body.category === "string" ? body.category : "";
    const rawSubType = typeof body.subType === "string" ? body.subType : "";
    const rawRating = Number(body.rating);

    if (!rawReviewText.trim()) {
      return NextResponse.json(
        { error: "Review text cannot be empty." },
        { status: 400 }
      );
    }

    if (rawReviewText.length > 5000) {
      return NextResponse.json(
        { error: "Review is too long (max 5000 characters)." },
        { status: 400 }
      );
    }

    if (rawName.length > 200) {
      return NextResponse.json(
        { error: "Name is too long (max 200 characters)." },
        { status: 400 }
      );
    }

    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newRecord: ReviewRecord = {
      _id: reviewId,
      name: rawName.trim() || "Anonymous Client",
      rating: isNaN(rawRating) || rawRating < 1 ? 5 : Math.min(rawRating, 5),
      category: rawCategory.trim() || "General Counseling",
      subType: rawSubType.trim() || "General",
      reviewText: rawReviewText.trim(),
      isAIGenerated: Boolean(body.isAIGenerated),
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
    const mode = searchParams.get("mode"); // "counseling" | "all"
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

    // Only expose real submissions to the public feed. Seeds remain available via ?seeds=true.
    const realReviews = allReviews.filter((r) => r.source !== "seed_storage");
    realReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      total: realReviews.length,
      data: realReviews,
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
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

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
