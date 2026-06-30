import React from "react";

/**
 * FilePreviewCard — shows a single uploaded/selected file with a remove
 * action. Pairs with UploadBox. Not yet wired into a step — ready for when
 * Health Records Upload is built out.
 *
 * Props:
 *   fileName {string}
 *   fileSize {string}   — pre-formatted size string (see fileUtils.formatFileSize)
 *   onRemove {fn}       — () => void — omit to hide the remove action
 */
const FilePreviewCard = ({ fileName, fileSize, onRemove }) => (
  <div className="flex items-center justify-between gap-3 rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
    <div className="flex min-w-0 flex-col">
      <span className="truncate text-xs font-medium text-[#141414]">{fileName}</span>
      {fileSize && (
        <span className="text-[11px] font-normal text-[#666666]">{fileSize}</span>
      )}
    </div>

    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 text-xs font-medium text-[#EF4444] cursor-pointer"
        aria-label={`Remove ${fileName}`}
      >
        Remove
      </button>
    )}
  </div>
);

export default FilePreviewCard;
