import React from "react";
import { Icon } from "@iconify/react";

const Footer = ({
  onSkip,
  onContinue,
  showSkip = true,
  continueLabel = "Save & Continue",
  isContinueDisabled = false,
  autoSavedLabel = "Just now",
}) => {
  return (
    <footer className="flex shrink-0 items-center justify-between gap-2 border-t-[0.5px] border-[#D1D5DB] bg-white px-3 py-4 sm:gap-4 sm:px-6 md:px-10 lg:px-10 lg:py-10">
      {showSkip ? (
        <button
          onClick={onSkip}
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#D1D5DB] px-3 py-2 text-xs font-medium text-[#6B7280] hover:bg-slate-50 sm:px-4 lg:h-14 lg:w-31.75 lg:px-6"
        >
          Skip for now
        </button>
      ) : (
        <span />
      )}

      <div className="flex items-center gap-4 lg:gap-14 lg:w-75.75 lg:h-14">
        <div className="hidden sm:flex flex-col items-end justify-center text-xs text-[#6B7280] leading-tight lg:w-25 lg:h-11 gap-2">
          <div className="flex items-center gap-1">
            <Icon icon="tabler:cloud-upload" width={14} height={14} />
            <span>Auto-Saved</span>
          </div>
          <span className="font-semibold  text-[#374151]">{autoSavedLabel}</span>
        </div>

        <button
          onClick={onContinue}
          disabled={isContinueDisabled}
          className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition-opacity sm:px-6 sm:text-sm lg:h-14 lg:w-36.75 lg:px-6 ${
            isContinueDisabled
              ? "bg-[#248B8F] text-white opacity-40 cursor-not-allowed"
              : "bg-[#248B8F] text-white hover:bg-[#1D7275]"
          }`}
        >
          {continueLabel}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
