import React, { useState } from "react";

export function Calendar({ selected, onSelect, className }) {
  const [date, setDate] = useState(selected || new Date());

  const handleDateClick = (day) => {
    setDate(day);
    if (onSelect) {
      onSelect(day);
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const weeks = [];
    let days = [];

    // Fill the first week with empty days if necessary
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-center"></div>);
    }

    // Fill the calendar with days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year;

      days.push(
        <div
          key={day}
          className={`text-center p-2 cursor-pointer rounded-full ${
            isSelected
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onClick={() => handleDateClick(new Date(year, month, day))}
        >
          {day}
        </div>
      );

      // Start a new week after 7 days
      if (days.length === 7) {
        weeks.push(
          <div key={`week-${weeks.length}`} className="grid grid-cols-7 gap-1">
            {days}
          </div>
        );
        days = [];
      }
    }

    // Fill the last week with empty days if necessary
    if (days.length > 0) {
      while (days.length < 7) {
        days.push(<div key={`empty-end-${days.length}`} className="text-center"></div>);
      }
      weeks.push(
        <div key={`week-${weeks.length}`} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
    }

    return weeks;
  };

  const goToPreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${className}`}>
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          {"<"}
        </button>
        <div className="font-semibold">
          {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
        </div>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          {">"}
        </button>
      </div>

      {/* Calendar Days */}
      <div className="space-y-1">
        <div className="grid grid-cols-7 gap-1 text-sm text-gray-500 dark:text-gray-400">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center">
              {day}
            </div>
          ))}
        </div>
        {renderCalendar()}
      </div>
    </div>
  );
}