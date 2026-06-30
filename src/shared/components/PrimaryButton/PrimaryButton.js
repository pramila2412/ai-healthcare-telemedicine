import React from "react";

/**
 * PrimaryButton — the main green CTA button used across all registration steps.
 *
 * Props:
 *   children  {node}     — button label text
 *   onClick   {fn}       — click handler
 *   disabled  {boolean}  — when true, renders as grey "not-allowed" state
 *   type      {string}   — "button" | "submit" (default: "button")
 *   className {string}   — extra classes
 *   fullWidth {boolean}  — if true, button is full-width; otherwise w-full sm:w-auto
 */
const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`
        h-14 rounded-lg px-6 text-xs font-medium font-TypeFace
        flex items-center justify-center transition-colors duration-150
        ${fullWidth ? "w-full" : "w-full sm:w-auto"}
        ${
          disabled
            ? "bg-[#F4F4F4] text-[#838383] cursor-not-allowed"
            : "bg-[#096B58] text-white cursor-pointer hover:bg-[#074f40]"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
