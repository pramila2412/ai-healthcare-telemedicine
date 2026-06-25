import React from "react";

const InfoChip = ({ icon, label }) => {
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
      <span className="text-emerald-700">{icon}</span>
      {label}
    </span>
  );
};

export default InfoChip;
