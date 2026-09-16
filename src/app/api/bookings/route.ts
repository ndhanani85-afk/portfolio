import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendBookingEmail } from "@/lib/mail";
import {
  getLocalBookings,
  saveLocalBooking,
  deleteLocalBooking,
  updateLocalBooking,
  BookingRecord,
} from "@/lib/bookingStore";
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

// Time normalization utility e.g. "9:00 AM", "09:00 AM" -> "9:00 AM"
export function normalizeTime(timeStr: string): string {
  if (!timeStr) return "";
  const match = timeStr.trim().match(/^0?(\d+):(\d+)\s*(AM|PM)?$/i);
  if (!match) return timeStr.trim();
  const hour = parseInt(match[1], 10);
  const min = match[2].padStart(2, "0");
  const ampm = (match[3] || (hour >= 12 ? "PM" : "AM")).toUpperCase();
  const normHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${normHour}:${min} ${ampm}`;
}

function extractDateAndSlot(item: { date?: string; time?: string; message?: string }): { dateStr: string; timeStr: string } | null {
  // 1. Direct fields
  if (item.date && item.time) {
    const d = new Date(item.date);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return { dateStr: `${y}-${m}-${day}`, timeStr: normalizeTime(item.time) };
    }
  }

  // 2. Parse from message string (e.g. "Direct Booking: Thu Sep 17 2026 at 9:00 AM." or "Scheduled: Thu Sep 17 2026 at 9:00 AM.")
  if (item.message) {
    const msgMatch = item.message.match(/(?:Direct Booking|Scheduled):\s*([A-Za-z]{3}\s+[A-Za-z]{3}\s+\d+\s+\d{4})\s+at\s+(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
    if (msgMatch) {
      const parsedDate = new Date(msgMatch[1]);
      if (!isNaN(parsedDate.getTime())) {
        const y = parsedDate.getFullYear();
        const m = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const day = String(parsedDate.getDate()).padStart(2, "0");
        return { dateStr: `${y}-${m}-${day}`, timeStr: normalizeTime(msgMatch[2]) };
      }
    }
  }

  return null;
}

async function getBookedSlotsForDate(targetDate: string): Promise<string[]> {
  const bookedSet = new Set<string>();

  // 1. Check local store
  try {
    const local = getLocalBookings();
    for (const item of local) {
      const res = extractDateAndSlot(item);
      if (res && res.dateStr === targetDate) {
        bookedSet.add(res.timeStr);
      }
    }
  } catch (e) {
    console.warn("[SlotCheck] Local store check error:", e);
  }

  // 2. Check Supabase
  try {
    const { data: supabaseLeads } = await supabaseAdmin
      .from("bookings")
      .select("*");
    if (Array.isArray(supabaseLeads)) {
      for (const item of supabaseLeads) {
        const res = extractDateAndSlot({
          date: item.date,
          time: item.time,
          message: item.message,
        });
        if (res && res.dateStr === targetDate) {
          bookedSet.add(res.timeStr);
        }
      }
    }
  } catch (e) {
    console.warn("[SlotCheck] Supabase check notice:", e);
  }

  // 3. Check Google Apps Script / Google Calendar (ONLY events with 'counsel' in title)
  const googleScriptUrl = process.env.GOOGLE_SCRIPT_WEB_APP_URL;
  if (googleScriptUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${googleScriptUrl}?date=${encodeURIComponent(targetDate)}`, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.bookedTimes)) {
          for (const t of data.bookedTimes) {
            bookedSet.add(normalizeTime(t));
          }
        }
      }
    } catch (gErr) {
      // Graceful fallback: local and supabase checks provide coverage
      console.warn("[SlotCheck] Google Calendar live check notice:", gErr);
    }
  }

  return Array.from(bookedSet);
}

// POST: Submit a new booking / Quiz lead / Contact form (INSTANT < 50ms)
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
    const rawEmail = typeof body.email === "string" ? body.email : "";
    const rawPhone = typeof body.phone === "string" ? body.phone : "";
    const rawServiceType = typeof body.serviceType === "string" ? body.serviceType : "";
    const rawService = typeof body.service === "string" ? body.service : "";
    const rawMessage = typeof body.message === "string" ? body.message : "";
    const rawNotes = typeof body.notes === "string" ? body.notes : "";
    const rawDate = typeof body.date === "string" ? body.date : undefined;
    const rawTime = typeof body.time === "string" ? body.time : undefined;

    // Length limits to prevent abuse
    if (rawName.length > 200) {
      return NextResponse.json({ error: "Name is too long (max 200 characters)." }, { status: 400 });
    }
    if (rawEmail.length > 254) {
      return NextResponse.json({ error: "Email is too long." }, { status: 400 });
    }
    if (rawPhone.length > 20) {
      return NextResponse.json({ error: "Phone number is too long." }, { status: 400 });
    }
    if (rawMessage.length > 5000 || rawNotes.length > 5000) {
      return NextResponse.json({ error: "Message is too long (max 5000 characters)." }, { status: 400 });
    }
    if (rawDate && rawDate.length > 50) {
      return NextResponse.json({ error: "Invalid date format." }, { status: 400 });
    }
    if (rawTime && rawTime.length > 50) {
      return NextResponse.json({ error: "Invalid time format." }, { status: 400 });
    }

    // CHECK: If date and time are provided, ensure slot is NOT already reserved!
    if (rawDate && rawTime) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const targetDate = `${y}-${m}-${day}`;
        const currentBooked = await getBookedSlotsForDate(targetDate);
        if (currentBooked.includes(normalizeTime(rawTime))) {
          return NextResponse.json(
            {
              success: false,
              error: "This counseling slot is already reserved. Please choose another available time.",
              message: "This counseling slot is already reserved. Please choose another available time.",
            },
            { status: 409 }
          );
        }
      }
    }

    const leadName = rawName.trim() || "Anonymous Visitor";
    const leadPhone = rawPhone.trim().replace(/[^\d+]/g, "");
    const leadEmail = rawEmail.trim().toLowerCase();
    const finalService = rawServiceType.trim() || rawService.trim() || "General Counseling Inquiry";
    const finalMessage = rawMessage.trim() || rawNotes.trim() || "Submitted via Website";

    // Email format validation (if provided)
    if (leadEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Phone validation (if provided) — must have at least 7 digits
    if (leadPhone && leadPhone.replace(/\D/g, "").length < 7) {
      return NextResponse.json(
        { error: "Please provide a valid phone number (at least 7 digits)." },
        { status: 400 }
      );
    }

    if (!leadPhone && !leadEmail) {
      return NextResponse.json(
        { error: "Please provide a valid phone number or email address." },
        { status: 400 }
      );
    }

    const bookingId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const newRecord: BookingRecord = {
      _id: bookingId,
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      serviceType: finalService,
      message: finalMessage,
      date: rawDate,
      time: rawTime,
      createdAt: new Date().toISOString(),
    };

    // 1. Save to local store INSTANTLY (< 1ms)
    saveLocalBooking(newRecord);

    // 2. Non-blocking background sync to Supabase, Web3Forms email, and Google Apps Script Calendar
    (async () => {
      try {
        sendBookingEmail({ ...newRecord, date: rawDate, time: rawTime }).catch((e) =>
          console.log("Email dispatch background notice:", e)
        );

        // Supabase sync
        const { error: supabaseError } = await supabaseAdmin
          .from("bookings")
          .upsert({
            id: bookingId,
            name: leadName,
            email: leadEmail,
            phone: leadPhone,
            service_type: finalService,
            message: finalMessage,
            created_at: newRecord.createdAt,
          });

        if (supabaseError) {
          console.log("[Supabase Lead Insert Warning]:", supabaseError.message);
        }

        // Google Apps Script Google Calendar sync
        const googleScriptUrl = process.env.GOOGLE_SCRIPT_WEB_APP_URL;
        if (googleScriptUrl) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            fetch(googleScriptUrl, {
              method: "POST",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              redirect: "follow",
              body: JSON.stringify({
                name: leadName,
                email: leadEmail,
                phone: leadPhone,
                serviceType: finalService,
                message: finalMessage,
                date: rawDate || "",
                time: rawTime || "",
              }),
              signal: controller.signal,
            })
              .then(async (res) => {
                const text = await res.text();
                try {
                  const data = JSON.parse(text);
                  console.log("[Google Script Calendar Sync Success]:", data);
                } catch {
                  console.log("[Google Script Calendar Sync Response]:", text);
                }
              })
              .catch((err) => console.log("[Google Script Calendar Sync Notice]:", err.message))
              .finally(() => clearTimeout(timeoutId));
          } catch (gasErr) {
            console.log("[Google Script Dispatch Exception]:", gasErr);
          }
        }
      } catch (err) {
        console.log("[Background Sync Notice]:", err);
      }
    })();

    // 3. Return INSTANT response to client (< 20ms)
    return NextResponse.json({
      success: true,
      message: "Thank you! Your information has been received successfully.",
      data: newRecord,
    });
  } catch (error: any) {
    console.error("API POST error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET: Fetch all bookings/leads for Admin Dashboard, or live booked slots check
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const checkSlots = searchParams.get("checkSlots");
    const dateParam = searchParams.get("date");

    // Public endpoint for live calendar slot availability check
    if (checkSlots === "true" && dateParam) {
      const bookedSlots = await getBookedSlotsForDate(dateParam);
      return NextResponse.json({
        success: true,
        date: dateParam,
        bookedSlots,
      });
    }

    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Always load local store immediately
    let allLeads = getLocalBookings();

    // Try fetching from Supabase Cloud Database
    try {
      const { data: supabaseLeads, error } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(supabaseLeads) && supabaseLeads.length > 0) {
        const formatted: BookingRecord[] = supabaseLeads.map((doc: any) => ({
          _id: doc.id || String(doc._id),
          name: doc.name || "",
          email: doc.email || "",
          phone: doc.phone || "",
          serviceType: doc.service_type || doc.serviceType || "General Counseling Inquiry",
          message: doc.message || "",
          createdAt: doc.created_at || new Date().toISOString(),
        }));

        // Smart Deduplication by phone/email or _id
        const leadMap = new Map<string, BookingRecord>();
        [...allLeads, ...formatted].forEach((item) => {
          const uniqueKey = item.phone || item.email || item._id;
          if (!leadMap.has(uniqueKey)) {
            leadMap.set(uniqueKey, item);
          } else {
            const existing = leadMap.get(uniqueKey);
            if (!existing?._id || existing._id.startsWith("lead_")) {
              leadMap.set(uniqueKey, item);
            }
          }
        });
        allLeads = Array.from(leadMap.values());
      }
    } catch (dbErr) {
      console.log("[Supabase GET notice - using local store fallback]:", dbErr);
    }

    allLeads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      source: "Lead Submission Channels",
      data: allLeads,
    });
  } catch (error: any) {
    console.error("API GET error:", error);
    return NextResponse.json({
      success: true,
      source: "Lead Submission Channels",
      data: getLocalBookings(),
    });
  }
}

// DELETE: Delete a lead entry permanently from databases
export async function DELETE(req: Request) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    // 1. Delete from local JSON store immediately (match by ID only)
    const deleted = deleteLocalBooking(id);

    // 2. Non-blocking background deletion from Supabase (match by ID only)
    (async () => {
      try {
        await supabaseAdmin
          .from("bookings")
          .delete()
          .eq("id", id);
      } catch (e) {
        console.log("[Supabase DELETE notice]:", e);
      }
    })();

    return NextResponse.json({ success: true, message: "Lead deleted permanently" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete lead entry" }, { status: 500 });
  }
}

// PUT: Edit/Update a lead entry
export async function PUT(req: Request) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, email, phone, serviceType, message } = body;

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const updateData = { name, email, phone, serviceType, message };
    const updated = updateLocalBooking(id, updateData);

    try {
      await supabaseAdmin
        .from("bookings")
        .update({
          name,
          email,
          phone,
          service_type: serviceType,
          message,
        })
        .eq("id", id);
    } catch (e) {
      console.log("[Supabase PUT notice]:", e);
    }

    return NextResponse.json({ success: true, message: "Lead updated successfully", data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update lead entry" }, { status: 500 });
  }
}
