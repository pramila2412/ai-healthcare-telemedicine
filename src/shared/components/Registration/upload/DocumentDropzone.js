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
  createUploadStatus,
  UPLOAD_STATUS_CODE,
} from "@/shared/constants/uploadStatus";
import {
  formatFileSize,
  getFileExtension,
  isAllowedFileType,
  isWithinMaxSize,
} from "@/shared/utils/PatientRegistration/fileUtils";
import { resolveUploadErrorStatus } from "@/shared/utils/uploadErrorUtils";

import UploadStatusSnackbar from "./UploadStatusSnackbar";

const createDocumentRecord = (file, index, uploadedRecord = {}) => ({
  id: uploadedRecord.id || `${Date.now()}-${index}-${file.name}`,
  name: uploadedRecord.name || file.name,
  size: uploadedRecord.size ?? file.size,
  type: uploadedRecord.type || file.type,
  lastModified: uploadedRecord.lastModified ?? file.lastModified,
  url: uploadedRecord.url,
});

const isSameFile = (firstFile, secondFile) =>
  firstFile.name === secondFile.name &&
  firstFile.size === secondFile.size &&
  firstFile.lastModified === secondFile.lastModified;

const normalizeUploadResponse = (response, sourceFiles) => {
  const responseData = response?.data ?? response;
  const uploadedFiles = Array.isArray(responseData)
    ? responseData
    : Array.isArray(responseData?.files)
      ? responseData.files
      : [];

  return sourceFiles.map((file, index) =>
    createDocumentRecord(file, index, uploadedFiles[index]),
  );
};

const DocumentDropzone = ({
  label,
  instruction,
  infoTooltip,
  infoLabel,
  onInfoClick,
  value = [],
  onChange,
  rules,
  onUploadSuccess,
  uploadFiles,
}) => {
  const inputRef = useRef(null);
  const retryFilesRef = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const files = Array.isArray(value) ? value : [];
  const maxFiles = rules?.maxFiles ?? Number.POSITIVE_INFINITY;

  const getValidationStatus = (file, acceptedSourceFiles, remainingSlots) => {
    if (!file?.name || !Number.isFinite(file.size) || file.size <= 0) {
      return createUploadStatus(UPLOAD_STATUS_CODE.INVALID_FILE);
    }

    if (!isAllowedFileType(file.name, rules.allowedExtensions)) {
      return createUploadStatus(UPLOAD_STATUS_CODE.UNSUPPORTED_FORMAT);
    }

    if (!isWithinMaxSize(file, rules.maxSizeMB)) {
      return createUploadStatus(UPLOAD_STATUS_CODE.FILE_SIZE_EXCEEDED, {
        message: `The selected file exceeds the maximum size limit of ${rules.maxSizeMB} MB.`,
      });
    }

    const isDuplicate =
      files.some((currentFile) => isSameFile(currentFile, file)) ||
      acceptedSourceFiles.some((currentFile) => isSameFile(currentFile, file));

    if (isDuplicate) {
      return createUploadStatus(UPLOAD_STATUS_CODE.FILE_ALREADY_UPLOADED);
    }

    if (acceptedSourceFiles.length >= remainingSlots) {
      return createUploadStatus(UPLOAD_STATUS_CODE.UPLOAD_LIMIT_REACHED, {
        message: `You can upload up to ${maxFiles} files.`,
      });
    }

    return null;
  };

  const addFiles = async (fileList) => {
    const selectedFiles = Array.from(fileList || []);
    if (!selectedFiles.length) return;
    setUploadStatus(null);

    const remainingSlots = Number.isFinite(maxFiles)
      ? Math.max(maxFiles - files.length, 0)
      : Number.POSITIVE_INFINITY;
    const acceptedSourceFiles = [];
    let firstValidationStatus = null;

    selectedFiles.forEach((file) => {
      const validationStatus = getValidationStatus(
        file,
        acceptedSourceFiles,
        remainingSlots,
      );

      if (validationStatus) {
        firstValidationStatus ||= validationStatus;
        return;
      }

      acceptedSourceFiles.push(file);
    });

    if (firstValidationStatus) setUploadStatus(firstValidationStatus);

    if (acceptedSourceFiles.length) {
      retryFilesRef.current = acceptedSourceFiles;
      setIsUploading(true);

      try {
        const response = uploadFiles
          ? await uploadFiles(acceptedSourceFiles)
          : null;
        const uploadedRecords = normalizeUploadResponse(
          response,
          acceptedSourceFiles,
        );

        onChange?.([...files, ...uploadedRecords]);
        if (!firstValidationStatus) {
          onUploadSuccess?.(uploadedRecords.length);
        }
      } catch (error) {
        setUploadStatus(
          resolveUploadErrorStatus(error, {
            maxSizeMB: rules.maxSizeMB,
            maxFiles,
          }),
        );
      } finally {
        setIsUploading(false);
      }
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  const hasReachedLimit =
    Number.isFinite(maxFiles) && files.length >= maxFiles;
  const isDropzoneDisabled = hasReachedLimit || isUploading;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-[14px] font-medium leading-5 text-[#141414]">
          {label}
        </label>
        {infoTooltip && (
          <Tooltip title={infoTooltip} arrow>
            {infoLabel ? (
              <button
                type="button"
                onClick={onInfoClick}
                aria-label={`${label} information`}
                className="flex h-6 items-center gap-1 rounded-full bg-[#F0FBFA] px-2 text-[10px] font-medium text-[#248B8F] hover:bg-[#E3F6F5]"
              >
                <InfoOutlinedIcon sx={{ fontSize: 12 }} />
                <span>{infoLabel}</span>
              </button>
            ) : (
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
            )}
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
        tabIndex={isDropzoneDisabled ? -1 : 0}
        aria-disabled={isDropzoneDisabled}
        aria-busy={isUploading}
        onClick={() => !isDropzoneDisabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (
            !isDropzoneDisabled &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!isDropzoneDisabled) setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (!isDropzoneDisabled) addFiles(event.dataTransfer.files);
        }}
        className={`flex min-h-14 items-center justify-center rounded-lg border border-dashed px-5 py-4 text-center transition-colors ${
          isDropzoneDisabled
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
                    setUploadStatus(null);
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

      <UploadStatusSnackbar
        open={Boolean(uploadStatus)}
        status={uploadStatus}
        onClose={() => setUploadStatus(null)}
        onRetry={
          uploadStatus?.retryable && retryFilesRef.current.length
            ? () => {
                setUploadStatus(null);
                addFiles(retryFilesRef.current);
              }
            : undefined
        }
      />
    </div>
  );
};

export default DocumentDropzone;
