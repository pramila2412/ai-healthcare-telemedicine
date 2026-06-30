import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calender1 from "../../../assets/patientRegistration/calender1.svg";
import calender from "../../../assets/patientRegistration/calender.svg";
import dob from "../../../assets/patientRegistration/dob.svg";

/**
 * FormDatePicker — date picker with left icon (switches when value is set),
 * calendar toggle button on the right, and an inline error.
 *
 * Props:
 *   name      {string}   — field name
 *   value     {string}   — ISO date string ("YYYY-MM-DD") or ""
 *   onChange  {fn}       — (name, isoDateString) => void
 *   onBlur    {fn}       — (name) => void
 *   error     {string}   — error message
 *   showError {boolean}  — whether to display the error
 *   label     {string}   — not rendered here; parent should render the label
 */
const FormDatePicker = ({
  name,
  value,
  onChange,
  onBlur,
  error = "",
  showError = false,
}) => {
  const inputBase =
    "h-14 w-full rounded-lg border border-[#E5E7EB] bg-white pl-12 pr-12 text-sm font-normal text-[#141414] outline-none placeholder:text-[#666666] focus:border-[#096B58] transition-colors duration-150";

  const handleChange = (date) => {
    const iso = date ? date.toISOString().split("T")[0] : "";
    onChange(name, iso);
  };

  const handleCalendarClose = () => {
    if (!value) onBlur?.(name);
  };

  return (
    <div className="relative">
      {/* Left icon — switches from empty-calendar to filled-dob when value set */}
      <img
        src={value ? dob : calender1}
        alt={value ? "dob" : "calendar"}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 z-10 pointer-events-none"
      />

      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={handleChange}
        onCalendarClose={handleCalendarClose}
        dateFormat="d MMMM yyyy"
        placeholderText="Select date of birth"
        wrapperClassName="w-full"
        className={`${inputBase} ${showError && error ? "border-[#EF4444]" : ""}`}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
      />

      {/* Right calendar button (decorative / opens picker) */}
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <img src={calender} alt="calendar" className="w-6 h-6" />
      </button>

      {/* Inline error */}
      {showError && error && (
        <p className="absolute left-0 top-[calc(100%+2px)] text-xs text-[#EF4444] leading-none">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormDatePicker;
