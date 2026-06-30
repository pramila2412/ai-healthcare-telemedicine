import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { formatFileSize } from "../../utils/fileUtils";

const FilePreviewCard = ({
  file,
  title,
  status = "Queued",
  progress = 100,
  showProgress = false,
  onRemove,
}) => {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file || !file.type?.startsWith("image/")) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!file) return null;

  const fileType = file.type?.includes("pdf") ? "PDF" : "PNG";
  const displayTitle = title || file.name?.split(".")[0] || "Document";

  return (
    <div className="pr-file-card">
      <div className="pr-file-preview">
        {previewUrl ? (
          <img src={previewUrl} alt={file.name} />
        ) : (
          <div className="pr-file-preview-placeholder">PDF</div>
        )}
      </div>

      <div className="pr-file-info">
        <h5>
          <span>{displayTitle}</span>
          <EditOutlinedIcon sx={{ fontSize: 12 }} />
        </h5>

        <p>
          {fileType} • {formatFileSize(file.size)}
        </p>

        <div className="pr-file-status-row">
          <span>{status || "Queued"}</span>

          <button type="button" onClick={onRemove}>
            <CloseIcon sx={{ fontSize: 12 }} />
            {status === "Queued" ? "Cancel" : "Delete"}
          </button>
        </div>

        {showProgress && (
          <div className="pr-file-progress-row">
            <span>{progress}%</span>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                flex: 1,
                height: 4,
                borderRadius: 50,
                backgroundColor: "#E5E7EB",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 50,
                  backgroundColor: "#00856F",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreviewCard;