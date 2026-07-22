export const UPLOAD_STATUS_CODE = Object.freeze({
  SUCCESS: "UPLOAD_SUCCESS",
  UNSUPPORTED_FORMAT: "UNSUPPORTED_FORMAT",
  FILE_SIZE_EXCEEDED: "FILE_SIZE_EXCEEDED",
  CONNECTION_ERROR: "CONNECTION_ERROR",
  INVALID_FILE: "INVALID_FILE",
  FILE_ALREADY_UPLOADED: "FILE_ALREADY_UPLOADED",
  UPLOAD_LIMIT_REACHED: "UPLOAD_LIMIT_REACHED",
  UPLOAD_FAILED: "UPLOAD_FAILED",
  UPLOAD_INTERRUPTED: "UPLOAD_INTERRUPTED",
});

const STATUS_CONTENT = Object.freeze({
  [UPLOAD_STATUS_CODE.SUCCESS]: {
    severity: "success",
    title: "File Uploaded Successfully",
    message:
      "Your document has been uploaded successfully and added to your health records.",
  },
  [UPLOAD_STATUS_CODE.UNSUPPORTED_FORMAT]: {
    severity: "error",
    title: "Unsupported File Format",
    message: "Please upload a PDF, JPG, JPEG, or PNG file.",
  },
  [UPLOAD_STATUS_CODE.FILE_SIZE_EXCEEDED]: {
    severity: "error",
    title: "File Size Exceeded",
    message: "The selected file exceeds the maximum allowed size.",
  },
  [UPLOAD_STATUS_CODE.CONNECTION_ERROR]: {
    severity: "error",
    title: "Connection Error",
    message: "Check your internet connection and try again.",
    retryable: true,
  },
  [UPLOAD_STATUS_CODE.INVALID_FILE]: {
    severity: "error",
    title: "Invalid File",
    message:
      "The selected file cannot be opened. Please choose another file.",
  },
  [UPLOAD_STATUS_CODE.FILE_ALREADY_UPLOADED]: {
    severity: "error",
    title: "File Already Uploaded",
    message: "This document has already been uploaded.",
  },
  [UPLOAD_STATUS_CODE.UPLOAD_LIMIT_REACHED]: {
    severity: "error",
    title: "Upload Limit Reached",
    message: "The maximum number of files has already been selected.",
  },
  [UPLOAD_STATUS_CODE.UPLOAD_FAILED]: {
    severity: "error",
    title: "Upload Failed",
    message: "Something went wrong. Please try again.",
    retryable: true,
  },
  [UPLOAD_STATUS_CODE.UPLOAD_INTERRUPTED]: {
    severity: "error",
    title: "Upload Interrupted",
    message: "The upload was interrupted. Please try again.",
    retryable: true,
  },
});

export const createUploadStatus = (code, overrides = {}) => ({
  code,
  ...(STATUS_CONTENT[code] || STATUS_CONTENT[UPLOAD_STATUS_CODE.UPLOAD_FAILED]),
  ...overrides,
});
