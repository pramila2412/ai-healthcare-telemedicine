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
    <footer className="flex shrink-0 items-center justify-between gap-2 border-t-[0.5px] border-card-border bg-white px-3 py-4 sm:gap-4 sm:px-6 md:px-10 lg:px-10 lg:py-6">
      {showSkip ? (
        <button
          onClick={onSkip}
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-card-border px-3 py-2 text-xs font-medium text-[#6B7280] hover:bg-slate-50 sm:px-4 lg:h-14 lg:w-31.75 lg:px-6"
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
          <span className="font-semibold  text-text-body">{autoSavedLabel}</span>
        </div>

        <button
          onClick={onContinue}
          disabled={isContinueDisabled}
          className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition-opacity sm:px-6 sm:text-sm lg:h-14 lg:w-36.75 lg:px-6 ${
            isContinueDisabled
              ? "btn-disabled"
              : "bg-primary text-white hover:bg-[--color-primary-hover]"
          }`}
        >
          {continueLabel}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
