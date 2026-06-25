import Button from "@mui/material/Button";
import React from "react";

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
    <div className="mt-9 flex items-center justify-between gap-4 max-md:flex-col max-md:items-stretch">
      <Button
        type="button"
        variant="contained"
        onClick={onSkip}
        sx={{
          backgroundColor: "#EDF8F6",
          color: "#00856F",
          boxShadow: "none",
          borderRadius: "8px",
          fontSize: "11px",
          fontWeight: 700,
          padding: "11px 20px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#DFF1ED",
            boxShadow: "none",
          },
        }}
      >
        {skipLabel}
      </Button>

      <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch">
        <Button
          type="button"
          variant="text"
          onClick={onBack}
          disabled={isBackDisabled}
          sx={{
            color: "#172B2B",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              color: "#00856F",
              backgroundColor: "transparent",
            },
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
            backgroundColor: "#007F68",
            boxShadow: "none",
            borderRadius: "8px",
            fontSize: "11px",
            fontWeight: 700,
            padding: "11px 20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#006C59",
              boxShadow: "none",
            },
          }}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;