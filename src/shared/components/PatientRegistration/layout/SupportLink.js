import HelpIcon from "@mui/icons-material/Help";
import React from "react";

const SupportLink = () => {
  return (
    <div className="pr-support-link">
      <HelpIcon sx={{ fontSize: 18 }} />

      <div>
        <span>Need help?</span>
        <a href="#support">Contact Support</a>
      </div>
    </div>
  );
};

export default SupportLink;