/**
 * Google Apps Script for Nikunj Dhanani Counseling Bookings & Calendar Sync
 * 
 * Instructions to Deploy:
 * 1. Go to https://script.google.com/ and open your project (or create a "New project")
 * 2. Name it "Nikunj Dhanani Calendar Integration"
 * 3. Replace all content in Code.gs with this code.
 * 4. Click "Deploy" -> "New deployment"
 * 5. Select type: "Web app" (click gear icon if needed)
 * 6. Set Description: "Counseling Calendar Webhook"
 * 7. Set "Execute as": "Me (your google account)"
 * 8. Set "Who has access": "Anyone"  <-- CRITICAL: Must be "Anyone" so the website can book without login!
 * 9. Click "Deploy", authorize access when prompted, and copy the Web App URL (ending in /exec).
 * 10. Paste that URL in your website's .env file as:
 *     GOOGLE_SCRIPT_WEB_APP_URL="https://script.google.com/macros/s/.../exec"
 *     Also update GOOGLE_SCRIPT_WEB_APP_URL in Cloudflare Workers -> Settings -> Variables and Secrets.
 */

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : null;
    if (!rawData) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "No post data received" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(rawData);
    var name = data.name || "Client";
    var email = data.email || "";
    var phone = data.phone || "";
    var serviceType = data.serviceType || "Counseling Consultation";
    var notes = data.message || data.notes || "";
    var dateStr = data.date || ""; // e.g. "2026-09-17" or ISO string
    var timeStr = data.time || ""; // e.g. "9:00 AM"

    // 1. Determine Start DateTime
    var startDate = new Date();
    if (dateStr) {
      if (dateStr.indexOf("T") !== -1) {
        var iso = new Date(dateStr);
        startDate = new Date(iso.getFullYear(), iso.getMonth(), iso.getDate());
      } else if (dateStr.indexOf("-") !== -1) {
        var p = dateStr.split("-");
        startDate = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
      } else {
        var parsed = new Date(dateStr);
        if (!isNaN(parsed.getTime())) {
          startDate = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
        }
      }
    } else {
      startDate.setDate(startDate.getDate() + 1);
    }

    // Parse time if provided (e.g. "9:00 AM" or "3:00 PM")
    if (timeStr) {
      var match = timeStr.match(/^0?(\d+):(\d+)\s*(AM|PM)?$/i);
      if (match) {
        var hours = parseInt(match[1], 10);
        var minutes = parseInt(match[2], 10);
        var ampm = (match[3] || (hours >= 12 ? "PM" : "AM")).toUpperCase();

        if (ampm === "PM" && hours !== 12) {
          hours += 12;
        } else if (ampm === "AM" && hours === 12) {
          hours = 0;
        }

        startDate.setHours(hours, minutes, 0, 0);
      }
    } else {
      startDate.setHours(10, 0, 0, 0);
    }

    // 50-minute counseling session length
    var endDate = new Date(startDate.getTime() + 50 * 60 * 1000);

    var calendar = CalendarApp.getDefaultCalendar();

    // 2. CHECK: Only block if an existing COUNSELING session is already booked at this exact time!
    // Other personal/business events (like "Call to buddy", "Meetings", etc.) DO NOT block booking!
    var existingEvents = calendar.getEvents(startDate, endDate);
    for (var i = 0; i < existingEvents.length; i++) {
      var evTitle = (existingEvents[i].getTitle() || "").toLowerCase();
      if (evTitle.indexOf("counsel") !== -1) {
        return ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            error: "This counseling slot is already reserved on Google Calendar."
          })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 3. Create Event in Google Calendar
    var eventTitle = "Counseling: " + name + " (" + serviceType + ")";
    var eventDescription = 
      "CONFIDENTIAL COUNSELING SESSION\n" +
      "----------------------------------\n" +
      "Client Name: " + name + "\n" +
      "Service: " + serviceType + "\n" +
      "Mobile: " + phone + "\n" +
      "Email: " + email + "\n" +
      "Scheduled Slot: " + (timeStr || "Confirmed") + "\n" +
      "Notes / Background: " + notes + "\n\n" +
      "Booked directly via Nikunj Dhanani Website.";

    var eventOptions = {
      description: eventDescription,
      location: "Mota Varachha, Surat, Gujarat / Online via Zoom"
    };

    if (email && email.indexOf("@") !== -1) {
      eventOptions.guests = email;
      eventOptions.sendInvites = true;
    }

    var event = calendar.createEvent(eventTitle, startDate, endDate, eventOptions);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Google Calendar event created successfully",
        eventId: event.getId()
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET Handler: Returns booked counseling slots for a specific date
 * Usage: GET https://script.google.com/.../exec?date=2026-09-17
 * 
 * Returns ONLY events whose title contains "Counsel" (ignoring personal/business events).
 */
function doGet(e) {
  try {
    var calendar = CalendarApp.getDefaultCalendar();
    var dateParam = e && e.parameter ? e.parameter.date : null;

    if (dateParam) {
      var y, m, d;
      if (dateParam.indexOf("-") !== -1) {
        var parts = dateParam.split("-");
        y = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10) - 1;
        d = parseInt(parts[2], 10);
      } else {
        var parsedDate = new Date(dateParam);
        y = parsedDate.getFullYear();
        m = parsedDate.getMonth();
        d = parsedDate.getDate();
      }

      var startOfDay = new Date(y, m, d, 0, 0, 0);
      var endOfDay = new Date(y, m, d, 23, 59, 59);

      var events = calendar.getEvents(startOfDay, endOfDay);
      var bookedTimes = [];

      for (var i = 0; i < events.length; i++) {
        var ev = events[i];
        var title = (ev.getTitle() || "").toLowerCase();

        // CRITICAL: Only count events that are counseling sessions!
        // Ignore other events like "Call to paresh das buddy", "Meeting", "5 Lakh advance", etc.
        if (title.indexOf("counsel") !== -1) {
          var st = ev.getStartTime();
          var h = st.getHours();
          var min = st.getMinutes();
          var ampm = h >= 12 ? "PM" : "AM";
          var h12 = h % 12;
          if (h12 === 0) h12 = 12;
          var formattedTime = h12 + ":" + (min < 10 ? "0" : "") + min + " " + ampm;
          bookedTimes.push(formattedTime);
        }
      }

      return ContentService.createTextOutput(
        JSON.stringify({
          success: true,
          date: dateParam,
          bookedTimes: bookedTimes
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "Active",
        message: "Nikunj Dhanani Google Calendar Webhook is operational."
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: err.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
