import React from "react";
import TextField from "@mui/material/TextField";

const FormTextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  maxLength = 300,
}) => {
  return (
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
        {icon}
        {label}
      </label>

      <TextField
        fullWidth
        multiline
        minRows={4}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        slotProps={{ htmlInput: { maxLength } }}
        sx={{
          "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "12px" },
          "& .MuiOutlinedInput-input": { lineHeight: 1.5 },
        }}
      />

      <div className="mt-1 text-right text-[10px] text-slate-400">
        {(value || "").length}/{maxLength} characters
      </div>
    </div>
  );
};

export default FormTextArea;
