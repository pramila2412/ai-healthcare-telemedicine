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
  const handleSkip = () => {
    if (typeof onSkip === "function") {
      onSkip();
    }
  };

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  const handleNext = () => {
    if (typeof onNext === "function") {
      onNext();
    }
  };

  return (
    <div className="pr-action-buttons">
      <Button
        type="button"
        variant="contained"
        onClick={handleSkip}
        sx={{
          backgroundColor: "#EDF8F6",
          color: "#00856F",
          boxShadow: "none",
          borderRadius: "8px",
          fontSize: "11px",
          fontWeight: 700,
          padding: "11px 20px",
          textTransform: "none",
          minWidth: "120px",
          "&:hover": {
            backgroundColor: "#DFF1ED",
            boxShadow: "none",
          },
        }}
      >
        {skipLabel}
      </Button>

      <div className="pr-action-right">
        <Button
          type="button"
          variant="text"
          onClick={handleBack}
          disabled={isBackDisabled}
          sx={{
            color: "#172B2B",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "none",
            padding: "10px 12px",
            minWidth: "90px",
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
          onClick={handleNext}
          disabled={isNextDisabled}
          sx={{
            backgroundColor: "#007F68",
            color: "#FFFFFF",
            boxShadow: "none",
            borderRadius: "8px",
            fontSize: "11px",
            fontWeight: 700,
            padding: "11px 20px",
            textTransform: "none",
            minWidth: "170px",
            "&:hover": {
              backgroundColor: "#006C59",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              backgroundColor: "#CBD5E1",
              color: "#FFFFFF",
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