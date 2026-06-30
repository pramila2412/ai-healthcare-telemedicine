import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";

const ProfileProgressCard = ({ progress }) => {
  return (
    <div className="pr-progress-card">
      <div className="pr-progress-header">
        <h4>Profile Progress</h4>
        <span>{progress}% Complete</span>
      </div>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 7,
          borderRadius: 50,
          backgroundColor: "#E5E7EB",
          "& .MuiLinearProgress-bar": {
            borderRadius: 50,
            backgroundColor: "#00856F",
          },
        }}
      />

      <p className="pr-progress-time">
        <AccessTimeIcon sx={{ fontSize: 12 }} />
        Estimated Time: 2-3 Minutes
      </p>
    </div>
  );
};

export default ProfileProgressCard;