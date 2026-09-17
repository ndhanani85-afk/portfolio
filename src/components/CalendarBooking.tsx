"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface CalendarBookingProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
];

const fallbackMonthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const fallbackDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function normalizeTime(timeStr: string): string {
  if (!timeStr) return "";
  const match = timeStr.trim().match(/^0?(\d+):(\d+)\s*(AM|PM)?$/i);
  if (!match) return timeStr.trim();
  const hour = parseInt(match[1], 10);
  const min = match[2].padStart(2, "0");
  const ampm = (match[3] || (hour >= 12 ? "PM" : "AM")).toUpperCase();
  const normHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${normHour}:${min} ${ampm}`;
}

export default function CalendarBooking({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect
}: CalendarBookingProps) {
  const { language, t } = useLanguage();
  const formT = translations.contactPage?.form;
  const monthNames = formT?.months?.[language] || fallbackMonthNames;
  const dayNames = formT?.days?.[language] || fallbackDayNames;

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Live booked counseling slots state
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Fetch booked slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    let isMounted = true;
    setIsLoadingSlots(true);

    fetch(`/api/bookings?checkSlots=true&date=${dateStr}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.bookedSlots)) {
          setBookedSlots(data.bookedSlots);
          // If current selectedTime was already booked, unselect it immediately
          if (selectedTime && data.bookedSlots.includes(normalizeTime(selectedTime))) {
            onTimeSelect("");
          }
        } else {
          setBookedSlots([]);
        }
      })
      .catch((err) => {
        console.warn("[CalendarBooking] Slot check notice:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDate, selectedTime, onTimeSelect]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now;
  };

  const checkIsPastTime = (date: Date | null, timeStr: string) => {
    if (!date) return false;
    const now = new Date();
    const isDateToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (!isDateToday) return false;

    const match = timeStr.match(/^0?(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return false;

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();

    if (ampm === "PM" && hours !== 12) {
      hours += 12;
    } else if (ampm === "AM" && hours === 12) {
      hours = 0;
    }

    const slotTime = new Date(date);
    slotTime.setHours(hours, minutes, 0, 0);

    return slotTime < now;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const handleDayClick = (day: number) => {
    if (isPastDate(day)) return;
    const newDate = new Date(currentYear, currentMonth, day);
    onDateSelect(newDate);

    if (selectedTime && checkIsPastTime(newDate, selectedTime)) {
      onTimeSelect("");
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return formT?.chooseDateAbove ? t(formT.chooseDateAbove) : "Please choose a date above";
    const locale = language === "gu" ? "gu-IN" : language === "hi" ? "hi-IN" : "en-IN";
    return selectedDate.toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="bg-white border border-[#0B3C2D]/15 rounded-2xl p-5 md:p-6 shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <CalendarDays className="w-5 h-5 text-[#D98A2B]" />
        <h3 className="text-base font-bold text-[#0B3C2D] font-serif-display">
          {formT?.calendarHeading ? t(formT.calendarHeading) : "Select Session Date"}
        </h3>
      </div>

      <div className="flex items-center justify-between mb-3 bg-[#FAF7F2] px-3 py-2 rounded-xl">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 rounded-full hover:bg-[#8CA899]/20 flex items-center justify-center transition-colors text-[#0B3C2D] cursor-pointer"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold text-[#0B3C2D] font-serif-display">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 rounded-full hover:bg-[#8CA899]/20 flex items-center justify-center transition-colors text-[#0B3C2D] cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[11px] font-bold text-ink-light uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`e-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const disabled = isPastDate(day);
          const selected = isSelected(day);
          const todayMarker = isToday(day);

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(day)}
              className={`w-full aspect-square rounded-xl text-xs font-semibold flex items-center justify-center transition-all duration-150 ${
                selected
                  ? "bg-[#0B3C2D] text-white shadow-md font-bold scale-105"
                  : todayMarker
                  ? "border border-[#D98A2B] text-[#D98A2B] bg-[#D98A2B]/10"
                  : disabled
                  ? "text-ink-light/40 cursor-not-allowed bg-[#FAF7F2]/40"
                  : "text-deep-ink hover:bg-[#8CA899]/20 hover:text-[#0B3C2D] cursor-pointer"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-2 mb-4 px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#0B3C2D]/10">
        <CalendarDays className="w-4 h-4 text-[#D98A2B] shrink-0" />
        <span className="text-xs font-semibold text-[#0B3C2D]">
          {formatSelectedDate()}
        </span>
      </div>

      <div className="border-t border-[#0B3C2D]/10 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#D98A2B]" />
            <span className="text-xs font-bold text-[#0B3C2D] uppercase tracking-wider">
              {formT?.timeHeading ? t(formT.timeHeading) : "Select Available Time Slot"}
            </span>
          </div>
          {isLoadingSlots && (
            <span className="text-[11px] text-[#D98A2B] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D98A2B] inline-block animate-ping" />
              Checking slots...
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
          {timeSlots.map((time) => {
            const isPast = checkIsPastTime(selectedDate, time);
            const isBooked = bookedSlots.includes(normalizeTime(time));
            const isDisabled = isPast || isBooked;
            const isSelectedTime = selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onTimeSelect(time)}
                className={`relative py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-150 border flex flex-col items-center justify-center min-h-[46px] ${
                  isSelectedTime
                    ? "bg-[#D98A2B] text-white border-[#D98A2B] shadow-sm font-bold scale-[1.02]"
                    : isBooked
                    ? "border-rose-200 bg-rose-50/70 text-rose-500 cursor-not-allowed"
                    : isPast
                    ? "border-[#0B3C2D]/10 text-ink-light/40 cursor-not-allowed bg-[#FAF7F2]/40"
                    : "border-[#0B3C2D]/15 text-deep-ink hover:border-[#0B3C2D] hover:bg-[#FAF7F2] cursor-pointer"
                }`}
                title={isBooked ? "This counseling session slot is already booked" : isPast ? "Past time slot" : "Available"}
              >
                <span className={isBooked ? "line-through opacity-75 text-[11px]" : ""}>
                  {time}
                </span>
                {isBooked && (
                  <span className="text-[9px] font-bold tracking-wider text-rose-600 uppercase mt-0.5 leading-none">
                    Booked
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!selectedTime && (
          <p className="text-[11px] text-ink-light mt-3 text-center">
            {formT?.chooseSlotToProceed ? t(formT.chooseSlotToProceed) : "Select an available slot to proceed"}
          </p>
        )}
      </div>
    </div>
  );
}
