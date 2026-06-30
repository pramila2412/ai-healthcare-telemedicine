import React from "react";

/**
 * StepFormLayout — wraps a registration step form with consistent padding
 * and a responsive CTA footer row.
 *
 * Props:
 *   children      {node}   — the form fields
 *   ctaLeft       {node}   — left CTA slot (e.g. "Skip for now")
 *   ctaRight      {node}   — right CTA slot (e.g. "Go Back" + "Proceed")
 *   topSpacing     {string} — Tailwind class for top margin (default "mt-6 md:mt-12")
 *   bottomSpacing  {string} — Tailwind class for bottom margin before CTA row
 */
const StepFormLayout = ({
  children,
  ctaLeft,
  ctaRight,
  topSpacing = "mt-6 md:mt-12",
  bottomSpacing = "mt-16 md:mt-30.5",
}) => {
  return (
    <div className={`px-4 md:px-10 ${topSpacing}`}>
      {/* Form fields */}
      {children}

      {/* Responsive CTA row */}
      {(ctaLeft || ctaRight) && (
        <div
          className={`${bottomSpacing} flex flex-col-reverse sm:flex-row gap-4 items-stretch sm:items-center sm:justify-between`}
        >
          {/* Left slot — e.g. Skip button */}
          {ctaLeft && <div>{ctaLeft}</div>}

          {/* Right slot — e.g. Go Back + Proceed */}
          {ctaRight && (
            <div className="flex flex-col-reverse sm:flex-row gap-4 items-stretch sm:items-center">
              {ctaRight}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StepFormLayout;
