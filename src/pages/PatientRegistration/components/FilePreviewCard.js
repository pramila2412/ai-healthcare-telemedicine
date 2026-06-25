import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { formatFileSize } from "../utils/fileUtils";

const FilePreviewCard = ({
  file,
  documentType,
  documentTypes = [],
  showDocumentType = false,
  progress = 100,
  onDocumentTypeChange,
  onRemove,
}) => {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file || !file.type?.startsWith("image/")) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!file) return null;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
      <div className="flex h-24 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-100 to-stone-100 text-emerald-700">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <DescriptionOutlinedIcon sx={{ fontSize: 30 }} />
        )}
      </div>

      <div className="mt-2">
        <h5
          title={file.name}
          className="truncate text-[11px] font-bold text-slate-700"
        >
          {file.name}
        </h5>
        <p className="mt-0.5 text-[10px] text-slate-400">
          {formatFileSize(file.size)}
        </p>
      </div>

      {showDocumentType && (
        <Select
          size="small"
          fullWidth
          value={documentType}
          onChange={(event) => onDocumentTypeChange(event.target.value)}
          sx={{
            mt: 1,
            mb: 1,
            borderRadius: "8px",
            fontSize: "10px",
            "& .MuiSelect-select": {
              padding: "8px 10px",
            },
          }}
        >
          {documentTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      )}

      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="small"
          color="error"
          variant="text"
          startIcon={<CloseIcon sx={{ fontSize: 13 }} />}
          onClick={onRemove}
          sx={{
            minWidth: "auto",
            padding: 0,
            fontSize: "10px",
            textTransform: "none",
          }}
        >
          Remove
        </Button>

        <LinearProgress
          variant="determinate"
          value={progress}
          className="flex-1"
          sx={{
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
    </div>
  );
};

export default FilePreviewCard;