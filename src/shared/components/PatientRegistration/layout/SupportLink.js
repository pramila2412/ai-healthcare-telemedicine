import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import React from "react";

const SupportLink = () => {
  return (
    <div className="pr-support-link">
      <HeadsetMicOutlinedIcon sx={{ fontSize: 24, color: "#64748B" }} />

      <div>
        <span>Need Help?</span>
        <a href="/support">Contact Support</a>
      </div>
    </div>
  );
};

export default SupportLink;