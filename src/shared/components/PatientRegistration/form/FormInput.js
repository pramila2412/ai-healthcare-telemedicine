import React from "react";

/**
 * FormInput — reusable text/number/tel input field with icon and inline error.
 *
 * Props:
 *   name        {string}   — input name attribute
 *   value       {string}   — controlled value
 *   onChange    {fn}       — (e) => void
 *   onBlur      {fn}       — (e) => void
 *   placeholder {string}
 *   type        {string}   — "text" | "number" | "tel" | "email"  (default: "text")
 *   icon        {string}   — SVG src for left icon
 *   iconAlt     {string}   — alt text for icon
 *   error       {string}   — error message (empty = no error)
 *   showError   {boolean}  — whether to display the error
 *   disabled    {boolean}
 *   className   {string}   — extra classes appended to the <input>
 *   suffix      {node}     — element rendered on the right (e.g. unit toggle)
 */
const FormInput = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  type = "text",
  icon,
  iconAlt = "",
  error = "",
  showError = false,
  disabled = false,
  className = "",
  suffix,
}) => {
  const baseClass =
    "h-10 w-full rounded-lg border border-[#E5E7EB] bg-white text-xs font-normal text-[#141414] outline-none placeholder:text-[#666666] focus:border-[#096B58] transition-colors duration-150";

  const errorClass = showError && error ? "border-[#EF4444]" : "";
  const disabledClass = disabled ? "bg-[#F5F5F5] text-[#666666] cursor-not-allowed" : "";

  return (
    <div className="relative">
      {/* Left icon */}
      {icon && (
        <img
          src={icon}
          alt={iconAlt}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 z-10 pointer-events-none"
        />
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseClass} ${errorClass} ${disabledClass} ${icon ? "pl-12" : "px-4"} ${suffix ? "pr-20" : ""} ${className}`}
      />

      {/* Right suffix slot (unit toggle, calendar icon, etc.) */}
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {suffix}
        </div>
      )}

      {/* Inline error */}
      {showError && error && (
        <p className="absolute left-0 top-[calc(100%+2px)] text-xs text-[#EF4444] leading-none">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
