export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export const ALLOWED_FILE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const isValidFileType = (file) => {
  return ALLOWED_FILE_TYPES.includes(file.type);
};

export const isValidFileSize = (file) => {
  return file.size <= MAX_FILE_SIZE_BYTES;
};

export const formatFileSize = (size) => {
  if (!size) return "0 KB";

  const sizeInKb = size / 1024;

  if (sizeInKb < 1024) {
    return `${sizeInKb.toFixed(2)} KB`;
  }

  return `${(sizeInKb / 1024).toFixed(2)} MB`;
};

export const createFileRecord = (file, documentType = "Medical Record") => {
  return {
    id: `${Date.now()}-${Math.random()}`,
    file,
    documentType,
    progress: 100,
  };
};

export const validateFiles = (files) => {
  const validFiles = [];
  const invalidFiles = [];

  files.forEach((file) => {
    if (isValidFileType(file) && isValidFileSize(file)) {
      validFiles.push(file);
    } else {
      invalidFiles.push(file);
    }
  });

  return {
    validFiles,
    invalidFiles,
  };
};
