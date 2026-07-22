import {
  createUploadStatus,
  UPLOAD_STATUS_CODE,
} from "@/shared/constants/uploadStatus";

const KNOWN_ERROR_CODES = Object.freeze({
  UNSUPPORTED_FORMAT: UPLOAD_STATUS_CODE.UNSUPPORTED_FORMAT,
  UNSUPPORTED_MEDIA_TYPE: UPLOAD_STATUS_CODE.UNSUPPORTED_FORMAT,
  FILE_SIZE_EXCEEDED: UPLOAD_STATUS_CODE.FILE_SIZE_EXCEEDED,
  FILE_TOO_LARGE: UPLOAD_STATUS_CODE.FILE_SIZE_EXCEEDED,
  CONNECTION_ERROR: UPLOAD_STATUS_CODE.CONNECTION_ERROR,
  NETWORK_ERROR: UPLOAD_STATUS_CODE.CONNECTION_ERROR,
  INVALID_FILE: UPLOAD_STATUS_CODE.INVALID_FILE,
  FILE_ALREADY_UPLOADED: UPLOAD_STATUS_CODE.FILE_ALREADY_UPLOADED,
  DUPLICATE_FILE: UPLOAD_STATUS_CODE.FILE_ALREADY_UPLOADED,
  UPLOAD_LIMIT_REACHED: UPLOAD_STATUS_CODE.UPLOAD_LIMIT_REACHED,
  UPLOAD_FAILED: UPLOAD_STATUS_CODE.UPLOAD_FAILED,
  UPLOAD_INTERRUPTED: UPLOAD_STATUS_CODE.UPLOAD_INTERRUPTED,
});

const normalizeErrorCode = (error) =>
  String(
    error?.response?.data?.code ||
      error?.response?.data?.errorCode ||
      error?.response?.data?.error?.code ||
      error?.code ||
      "",
  ).toUpperCase();

export const resolveUploadErrorStatus = (error, context = {}) => {
  const errorCode = normalizeErrorCode(error);
  const httpStatus = error?.response?.status ?? error?.status;
  const createResolvedStatus = (code) => {
    if (code === UPLOAD_STATUS_CODE.FILE_SIZE_EXCEEDED && context.maxSizeMB) {
      return createUploadStatus(code, {
        message: `The selected file exceeds the maximum size limit of ${context.maxSizeMB} MB.`,
      });
    }

    if (code === UPLOAD_STATUS_CODE.UPLOAD_LIMIT_REACHED && context.maxFiles) {
      return createUploadStatus(code, {
        message: `You can upload up to ${context.maxFiles} files.`,
      });
    }

    return createUploadStatus(code);
  };

  if (KNOWN_ERROR_CODES[errorCode]) {
    return createResolvedStatus(KNOWN_ERROR_CODES[errorCode]);
  }

  if (
    error?.name === "AbortError" ||
    errorCode === "ERR_CANCELED"
  ) {
    return createResolvedStatus(UPLOAD_STATUS_CODE.UPLOAD_INTERRUPTED);
  }

  if (
    errorCode === "ERR_NETWORK" ||
    errorCode === "NETWORK_ERROR" ||
    errorCode === "ECONNABORTED" ||
    (error?.request && !error?.response) ||
    httpStatus === 408 ||
    httpStatus === 504 ||
    (typeof navigator !== "undefined" && navigator.onLine === false)
  ) {
    return createResolvedStatus(UPLOAD_STATUS_CODE.CONNECTION_ERROR);
  }

  if (httpStatus === 413) {
    return createResolvedStatus(UPLOAD_STATUS_CODE.FILE_SIZE_EXCEEDED);
  }

  if (httpStatus === 415) {
    return createResolvedStatus(UPLOAD_STATUS_CODE.UNSUPPORTED_FORMAT);
  }

  if (httpStatus === 409) {
    return createResolvedStatus(UPLOAD_STATUS_CODE.FILE_ALREADY_UPLOADED);
  }

  if (httpStatus === 400 || httpStatus === 422) {
    return createResolvedStatus(UPLOAD_STATUS_CODE.INVALID_FILE);
  }

  return createResolvedStatus(UPLOAD_STATUS_CODE.UPLOAD_FAILED);
};
