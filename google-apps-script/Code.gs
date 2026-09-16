/**
 * Google Apps Script for Nikunj Dhanani Counseling Bookings
 * 
 * Instructions to Deploy:
 * 1. Go to https://script.google.com/ and create a "New project"
 * 2. Name it "Nikunj Dhanani Calendar Integration"
 * 3. Replace all content in Code.gs with this code.
 * 4. Click "Deploy" -> "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me (your google account)"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy", authorize access when prompted, and copy the Web App URL.
 * 9. Paste that URL in your website's .env file as:
 *    GOOGLE_SCRIPT_WEB_APP_URL="https://script.google.com/macros/s/.../exec"
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
    var dateStr = data.date || ""; // e.g. "2026-09-20" or "Fri Sep 20 2026"
    var timeStr = data.time || ""; // e.g. "10:00 AM"

    // 1. Determine Start & End DateTimes
    var startDate = null;
    if (dateStr) {
      startDate = new Date(dateStr);
    } else {
      startDate = new Date();
      startDate.setDate(startDate.getDate() + 1); // fallback: tomorrow
    }

    // Parse time if provided (e.g. "10:00 AM" or "3:00 PM")
    if (timeStr) {
      var match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
      if (match) {
        var hours = parseInt(match[1], 10);
        var minutes = parseInt(match[2], 10);
        var ampm = match[3].toUpperCase();

        if (ampm === "PM" && hours !== 12) {
          hours += 12;
        } else if (ampm === "AM" && hours === 12) {
          hours = 0;
        }

        startDate.setHours(hours, minutes, 0, 0);
      }
    } else {
      startDate.setHours(10, 0, 0, 0); // Default 10:00 AM
    }

    // Default 50-minute session length
    var endDate = new Date(startDate.getTime() + 50 * 60 * 1000);

    // 2. Create Event in Nikunj's Google Calendar
    var calendar = CalendarApp.getDefaultCalendar();
    var eventTitle = "Counseling: " + name + " (" + serviceType + ")";
    var eventDescription = 
      "CONFIDENTIAL COUNSELING SESSION\n" +
      "----------------------------------\n" +
      "Client Name: " + name + "\n" +
      "Service: " + serviceType + "\n" +
      "Mobile: " + phone + "\n" +
      "Email: " + email + "\n" +
      "Scheduled Slot: " + timeStr + "\n" +
      "Notes / Client Background: " + notes + "\n\n" +
      "Organized via Nikunj Dhanani Website Booking.";

    var eventOptions = {
      description: eventDescription,
      location: "Private Online Zoom / Google Meet or Practice Location"
    };

    if (email) {
      eventOptions.guests = email;
      eventOptions.sendInvites = true;
    }

    var event = calendar.createEvent(eventTitle, startDate, endDate, eventOptions);

    // 3. Optional: Append to Google Sheet if running within a spreadsheet container
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet();
      if (sheet) {
        var activeTab = sheet.getActiveSheet();
        activeTab.appendRow([
          new Date(),
          name,
          phone,
          email,
          serviceType,
          startDate,
          timeStr,
          notes,
          event.getId()
        ]);
      }
    } catch (sheetErr) {
      // Standalone script without bound sheet — continue
    }

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

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "Active",
      message: "Nikunj Dhanani Google Apps Script Booking Webhook is operational."
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
