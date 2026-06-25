import HelpIcon from "@mui/icons-material/Help";
import React from "react";

const SupportLink = () => {
  return (
    <div className="mb-5 flex items-center justify-end gap-2 text-slate-500 max-md:justify-start">
      <HelpIcon sx={{ fontSize: 18 }} />

      <div>
        <span className="block text-[10px]">Need help?</span>
        <a
          href="#support"
          className="text-[11px] font-semibold text-emerald-700 underline"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default SupportLink;