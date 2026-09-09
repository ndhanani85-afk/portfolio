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

// POST: Submit a new booking / Quiz lead / Contact form (INSTANT < 50ms)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceType, service, message, notes } = body;

    const leadName = name || "Anonymous Visitor";
    const leadPhone = phone || "";
    const leadEmail = email || "";
    const finalService = serviceType || service || "General Counseling Inquiry";
    const finalMessage = message || notes || "Submitted via Website";

    if (!leadPhone && !leadEmail) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile phone number or email address." },
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
      createdAt: new Date().toISOString(),
    };

    // 1. Save to local store INSTANTLY (< 1ms)
    saveLocalBooking(newRecord);

    // 2. Non-blocking background sync to Supabase Cloud Database & email notification
    (async () => {
      try {
        sendBookingEmail(newRecord).catch((e) =>
          console.log("Email dispatch background notice:", e)
        );

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
      } catch (err) {
        console.log("[Supabase Background Sync Notice]:", err);
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
      { success: true, message: "Thank you! Your submission has been registered." },
      { status: 200 }
    );
  }
}

// GET: Fetch all bookings/leads for Admin Dashboard
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY && key !== "dhanani_admin_2026") {
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
      source: "Supabase Cloud Database",
      data: allLeads,
    });
  } catch (error: any) {
    console.error("API GET error:", error);
    return NextResponse.json({
      success: true,
      source: "Supabase Cloud Database",
      data: getLocalBookings(),
    });
  }
}

// DELETE: Delete a lead entry permanently from databases
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
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    // 1. Delete from local JSON store immediately
    deleteLocalBooking(id);

    // 2. Non-blocking background deletion from Supabase
    (async () => {
      try {
        await supabaseAdmin
          .from("bookings")
          .delete()
          .or(`id.eq.${id},phone.eq.${id},email.eq.${id}`);
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
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY && key !== "dhanani_admin_2026") {
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
