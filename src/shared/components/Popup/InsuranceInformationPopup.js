import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import Button from "@mui/material/Button";
import React from "react";

import insuranceCardBack from "@assets/patientRegistration/insurance-card-back.png";
import insuranceCardFront from "@assets/patientRegistration/insurance-card-front.png";

import Popup from "./Popup";

const InsuranceCardPreview = ({ side }) => {
  const isFront = side === "front";
  const cardImage = isFront ? insuranceCardFront : insuranceCardBack;

  return (
    <div className="mx-auto w-full max-w-[208px]">
      <div className="rounded-lg border-[0.5px] border-[#E6E6E6] bg-[#FCFCFC] p-[3px]">
        <img
          src={cardImage}
          alt={isFront ? "Insurance card front side" : "Insurance card backside"}
          className="aspect-[200/126] w-full rounded-[6px] object-cover"
        />
      </div>
      <p className="mt-2 text-center text-[10px] leading-4 text-[#6B7280]">
        {isFront ? "Front side" : "Backside"}
      </p>
    </div>
  );
};

const InsuranceInformationPopup = ({ open, onClose }) => (
  <Popup
    open={open}
    onClose={onClose}
    title="Insurance Information"
    description="Providing insurance information helps us verify your coverage, speed up claim processing, and provide a smoother healthcare experience for you."
    maxWidth={false}
    fullWidth={false}
    paperSx={{ width: "calc(100% - 32px)", maxWidth: "480px" }}
    actions={
      <Button
        fullWidth
        variant="contained"
        onClick={onClose}
        sx={{
          minHeight: 48,
          borderRadius: "8px",
          backgroundColor: "#248B8F",
          textTransform: "none",
          fontSize: "12px",
          fontWeight: 500,
          boxShadow: "0 2px 4px rgba(0, 49, 51, 0.12)",
          "&:hover": { backgroundColor: "#1E7A7E" },
        }}
      >
        Ok, I understand
      </Button>
    }
  >
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <InsuranceCardPreview side="front" />
      <InsuranceCardPreview side="back" />
    </div>

    <div className="mt-5 flex min-h-14 items-center gap-3 rounded-sm bg-[#F2F2F2] px-4 py-3 text-[10px] leading-[14px] text-[#374151]">
      <HealthAndSafetyOutlinedIcon sx={{ fontSize: 14, color: "#374151" }} />
      <p>
        Your information remains private, encrypted, and accessible only for
        authorized healthcare purposes.
      </p>
    </div>
  </Popup>
);

export default InsuranceInformationPopup;
