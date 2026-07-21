import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import React, { useRef, useState } from "react";

import {
  formatFileSize,
  getFileExtension,
  isAllowedFileType,
  isWithinMaxSize,
} from "@/shared/utils/PatientRegistration/fileUtils";

const createDocumentRecord = (file, index) => ({
  id: `${Date.now()}-${index}-${file.name}`,
  name: file.name,
  size: file.size,
  type: file.type,
  lastModified: file.lastModified,
});

const DocumentDropzone = ({
  label,
  instruction,
  infoTooltip,
  onInfoClick,
  value = [],
  onChange,
  rules,
  onUploadSuccess,
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const files = Array.isArray(value) ? value : [];
  const maxFiles = rules?.maxFiles ?? Number.POSITIVE_INFINITY;

  const addFiles = (fileList) => {
    const selectedFiles = Array.from(fileList || []);
    if (!selectedFiles.length) return;

    const remainingSlots = Number.isFinite(maxFiles)
      ? Math.max(maxFiles - files.length, 0)
      : Number.POSITIVE_INFINITY;
    const acceptedFiles = [];
    let invalidCount = 0;

    selectedFiles.forEach((file, index) => {
      const isDuplicate = files.some(
        (currentFile) =>
          currentFile.name === file.name &&
          currentFile.size === file.size &&
          currentFile.lastModified === file.lastModified,
      );
      const isValid =
        isAllowedFileType(file.name, rules.allowedExtensions) &&
        isWithinMaxSize(file, rules.maxSizeMB) &&
        !isDuplicate &&
        acceptedFiles.length < remainingSlots;

      if (!isValid) {
        invalidCount += 1;
        return;
      }

      acceptedFiles.push(createDocumentRecord(file, index));
    });

    setErrorMessage(
      invalidCount
        ? `Some files were skipped. Upload ${rules.supportedLabel} files up to ${rules.maxSizeMB}MB${
            Number.isFinite(maxFiles)
              ? ` and a maximum of ${maxFiles} files.`
              : "."
          }`
        : "",
    );

    if (acceptedFiles.length) {
      onChange?.([...files, ...acceptedFiles]);
      onUploadSuccess?.(acceptedFiles.length);
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  const hasReachedLimit =
    Number.isFinite(maxFiles) && files.length >= maxFiles;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-[14px] font-medium leading-5 text-[#141414]">
          {label}
        </label>
        {infoTooltip && (
          <Tooltip title={infoTooltip} arrow>
            <IconButton
              size="small"
              onClick={onInfoClick}
              aria-label={`${label} information`}
              sx={{
                width: 24,
                height: 24,
                color: "#0D8B72",
                backgroundColor: "#F1F9F7",
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple={maxFiles !== 1}
        accept={rules.accept}
        className="hidden"
        onChange={(event) => addFiles(event.target.files)}
      />

      <Box
        role="button"
        tabIndex={hasReachedLimit ? -1 : 0}
        aria-disabled={hasReachedLimit}
        onClick={() => !hasReachedLimit && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (!hasReachedLimit && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!hasReachedLimit) setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (!hasReachedLimit) addFiles(event.dataTransfer.files);
        }}
        className={`flex min-h-14 items-center justify-center rounded-lg border border-dashed px-5 py-4 text-center transition-colors ${
          hasReachedLimit
            ? "cursor-not-allowed border-[#E4E7EC] bg-[#F8F9FA] opacity-70"
            : isDragging
              ? "cursor-copy border-[#0D8B72] bg-[#F1F9F7]"
              : "cursor-pointer border-[#C9D1DC] bg-white hover:border-[#0D8B72] hover:bg-[#FBFEFD]"
        }`}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 text-[14px] text-[#344054]">
          <CloudUploadOutlinedIcon sx={{ fontSize: 20, color: "#667085" }} />
          <span>{instruction}</span>
          <span className="font-medium text-[#0D8B72] underline underline-offset-2">
            browse
          </span>
        </div>
      </Box>

      <div className="mt-2 flex flex-col gap-1 text-[12px] text-[#667085] sm:flex-row sm:justify-between">
        <span>Files Supported: {rules.supportedLabel}</span>
        <span>
          Maximum size: {rules.maxSizeMB}MB
          {Number.isFinite(maxFiles) ? ` | Upload up to ${maxFiles} files` : ""}
        </span>
      </div>

      {errorMessage && (
        <Alert severity="error" sx={{ mt: 1.5, fontSize: 12 }}>
          {errorMessage}
        </Alert>
      )}

      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {files.map((file) => {
            const extension = getFileExtension(file.name);
            const FileIcon =
              extension === "pdf"
                ? DescriptionOutlinedIcon
                : InsertPhotoOutlinedIcon;

            return (
              <div
                key={file.id}
                className="flex w-full min-w-0 items-center gap-3 rounded-lg border border-[#E4E7EC] bg-white px-3 py-2.5 sm:w-64"
              >
                <FileIcon sx={{ fontSize: 22, color: "#228E90" }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-[#344054]">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-[#667085]">
                    {extension.toUpperCase()} · {formatFileSize(file.size)}
                  </p>
                </div>
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    setErrorMessage("");
                    onChange?.(files.filter((item) => item.id !== file.id));
                  }}
                  aria-label={`Remove ${file.name}`}
                  sx={{ color: "#667085" }}
                >
                  <CloseIcon sx={{ fontSize: 17 }} />
                </IconButton>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentDropzone;
