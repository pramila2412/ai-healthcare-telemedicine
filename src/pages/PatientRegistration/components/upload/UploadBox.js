import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import React from "react";
import { ALLOWED_FILE_EXTENSIONS } from "../../utils/fileUtils";

const UploadBox = ({
  title,
  browseText = "browse",
  supportText,
  multiple = false,
  onFilesSelect,
}) => {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length > 0) {
      onFilesSelect(selectedFiles);
    }

    event.target.value = "";
  };

  return (
    <label className="pr-upload-box">
      <input
        type="file"
        className="pr-upload-input"
        multiple={multiple}
        accept={ALLOWED_FILE_EXTENSIONS}
        onChange={handleFileChange}
      />

      <CloudUploadOutlinedIcon className="pr-upload-icon" />

      <p className="pr-upload-title">
        {title}
        <span>{browseText}</span>
      </p>

      <small className="pr-upload-support-text">{supportText}</small>
    </label>
  );
};

export default UploadBox;