import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LinearProgress from "@mui/material/LinearProgress";

const ProfileProgressCard = ({ progress }) => {
  return (
    <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:mt-10">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="m-0 text-xs font-semibold text-slate-800">Profile Progress</h4>
        <span className="whitespace-nowrap text-xs font-semibold text-emerald-700">
          {progress}% Complete
        </span>
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

      <p className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400">
        <AccessTimeIcon sx={{ fontSize: 12 }} />
        Estimated Time: 2-3 Minutes
      </p>
    </div>
  );
};

export default ProfileProgressCard;
