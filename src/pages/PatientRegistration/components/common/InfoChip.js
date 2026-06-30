import React from "react";

const InfoChip = ({ icon, label }) => {
  return (
    <span className="pr-info-chip">
      <span className="pr-info-chip-icon">{icon}</span>
      {label}
    </span>
  );
};

export default InfoChip;
