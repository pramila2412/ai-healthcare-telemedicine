import React from "react";
import HelpIcon from "@mui/icons-material/Help";

const SupportLink = () => {
  return (
    <div className="mb-5 flex items-center justify-start gap-2 text-slate-500 md:justify-end">
      <HelpIcon sx={{ fontSize: 18 }} />

      <div>
        <span className="block text-[10px]">Need help?</span>
        <a href="#support" className="text-[11px] font-semibold text-emerald-700 underline">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default SupportLink;
