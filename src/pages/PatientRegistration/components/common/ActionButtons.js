import React from "react";
import Button from "@mui/material/Button";

const sharedButtonStyles = {
  borderRadius: "8px",
  fontSize: "11px",
  fontWeight: 700,
  padding: "11px 20px",
  textTransform: "none",
};

const ActionButtons = ({
  onSkip,
  onBack,
  onNext,
  nextLabel,
  skipLabel = "Skip for now",
  backLabel = "Go Back",
  isBackDisabled = false,
  isNextDisabled = false,
}) => {
  return (
    <div className="mt-9 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
      <Button
        type="button"
        variant="contained"
        onClick={onSkip}
        sx={{
          ...sharedButtonStyles,
          backgroundColor: "#EDF8F6",
          color: "#00856F",
          boxShadow: "none",
          "&:hover": { backgroundColor: "#DFF1ED", boxShadow: "none" },
        }}
      >
        {skipLabel}
      </Button>

      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-4">
        <Button
          type="button"
          variant="text"
          onClick={onBack}
          disabled={isBackDisabled}
          sx={{
            ...sharedButtonStyles,
            color: "#172B2B",
            "&:hover": { color: "#00856F", backgroundColor: "transparent" },
          }}
        >
          {backLabel}
        </Button>

        <Button
          type="button"
          variant="contained"
          onClick={onNext}
          disabled={isNextDisabled}
          sx={{
            ...sharedButtonStyles,
            backgroundColor: "#007F68",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#006C59", boxShadow: "none" },
          }}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
