import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import React from "react";
import { ALLOWED_FILE_EXTENSIONS } from "../utils/fileUtils";

const UploadBox = ({
  title,
  description,
  supportText = "Supported formats: PDF, JPG, PNG. Max size: 5MB",
  multiple = false,
  onFilesSelect,
}) => {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length > 0) {
      onFilesSelect(selectedFiles);
    }

    // Allows user to upload the same file again after removing it.
    event.target.value = "";
  };

  return (
    <label className="flex min-h-[150px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-7 text-center transition hover:border-emerald-700 hover:bg-emerald-50/40">
      <input
        type="file"
        className="hidden"
        multiple={multiple}
        accept={ALLOWED_FILE_EXTENSIONS}
        onChange={handleFileChange}
      />

      <div>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CloudUploadOutlinedIcon sx={{ fontSize: 30 }} />
        </div>

        <h4 className="mb-1 text-xs font-bold text-slate-700">{title}</h4>
        <p className="mb-1 text-[11px] text-slate-500">{description}</p>
        <small className="text-[10px] text-slate-400">{supportText}</small>
      </div>
    </label>
  );
};

export default UploadBox;