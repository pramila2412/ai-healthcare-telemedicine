import React from "react";

/**
 * SecondaryButton — ghost/subtle button for "Go Back", "Skip for now" actions.
 *
 * Props:
 *   children  {node}     — button label
 *   onClick   {fn}       — click handler
 *   variant   {string}   — "back" | "skip" (controls colour)
 *                          "back" → grey bg
 *                          "skip" → teal bg (lighter green)
 *   type      {string}   — "button" | "submit" (default: "button")
 *   className {string}   — extra classes
 */
const SecondaryButton = ({
  children,
  onClick,
  variant = "back",
  type = "button",
  className = "",
}) => {
  const variantClass =
    variant === "skip"
      ? "bg-[#EEF4F3] text-[#096B58] hover:bg-[#ddf0ec]"
      : "bg-[#F5F5F5] text-[#096B58] hover:bg-[#EAEAEA] sm:bg-white";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        h-14 w-full sm:w-auto rounded-lg px-6 text-xs font-medium font-TypeFace
        cursor-pointer transition-colors duration-150
        ${variantClass}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
