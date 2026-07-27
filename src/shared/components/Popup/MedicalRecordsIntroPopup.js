import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";

import Popup from "./Popup";

const INFORMATION_TIPS = Object.freeze([
  {
    icon: FactCheckOutlinedIcon,
    text: "Add only information you're confident is accurate.",
  },
  {
    icon: CloudUploadOutlinedIcon,
    text: "Upload documents only if they're current and clearly readable.",
  },
  {
    icon: EditOutlinedIcon,
    text: "You can update or remove this information anytime.",
  },
  {
    icon: ShieldOutlinedIcon,
    text: "Your health information is securely encrypted and shared only with your permission.",
  },
]);

const MedicalRecordsIntroPopup = ({
  open,
  dontShowAgain,
  onDontShowAgainChange,
  onSkip,
  onContinue,
}) => (
  <Popup
    open={open}
    onClose={() => {}}
    title="Help us personalize your healthcare experience"
    maxWidth={false}
    fullWidth={false}
    showCloseButton={false}
    closeOnBackdropClick={false}
    closeOnEscapeKeyDown={false}
    paperSx={{
      width: "calc(100% - 32px)",
      maxWidth: "480px",
    }}
    actions={
      <div className="flex w-full items-center justify-between gap-4">
        <Button
          variant="outlined"
          onClick={onSkip}
          sx={{
            minWidth: 120,
            minHeight: 48,
            borderRadius: "8px",
            borderColor: "#248B8F",
            color: "#196E72",
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 500,
            "&:hover": {
              borderColor: "#1E7A7E",
              backgroundColor: "#F4FBFA",
            },
          }}
        >
          Skip for now
        </Button>

        <Button
          variant="contained"
          onClick={onContinue}
          sx={{
            minWidth: 120,
            minHeight: 48,
            borderRadius: "8px",
            backgroundColor: "#248B8F",
            color: "#FFFFFF",
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 500,
            boxShadow: "0 2px 4px rgba(0, 49, 51, 0.12)",
            "&:hover": { backgroundColor: "#1E7A7E" },
          }}
        >
          Continue
        </Button>
      </div>
    }
  >
    <p className="mt-1 text-[12px] font-medium leading-[18px] text-[#248B8F]">
      Providing your medical information is completely optional.
    </p>

    <div className="mt-5 space-y-4 text-[12px] leading-[18px] text-[#667085]">
      <p>
        If you know your medical history, allergies, medications, or insurance
        details, adding them now helps doctors provide more accurate care and
        speeds up future appointments.
      </p>
      <p>
        If you're unsure about any information, don't have supporting
        documents, or don't currently have insurance, you can safely skip this
        step and add these details later from your profile.
      </p>
    </div>

    <div className="mt-5 space-y-3 rounded-lg bg-[#F1F9F7] px-4 py-3">
      {INFORMATION_TIPS.map(({ icon: TipIcon, text }) => (
        <div
          key={text}
          className="flex items-start gap-3 text-[11px] leading-4 text-[#475467]"
        >
          <TipIcon sx={{ mt: 0.1, fontSize: 15, color: "#248B8F" }} />
          <p>{text}</p>
        </div>
      ))}
    </div>

    <FormControlLabel
      className="mt-4"
      control={
        <Checkbox
          size="small"
          checked={dontShowAgain}
          onChange={(event) => onDontShowAgainChange?.(event.target.checked)}
          sx={{
            color: "#98A2B3",
            "&.Mui-checked": { color: "#248B8F" },
          }}
        />
      }
      label={
        <span className="text-[11px] leading-4 text-[#475467]">
          Don't show this message again
        </span>
      }
    />
  </Popup>
);

export default MedicalRecordsIntroPopup;
