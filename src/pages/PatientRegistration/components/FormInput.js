import TextField from "@mui/material/TextField";
import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  error = false,
  helperText = "",
}) => {
  return (
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
        {icon}
        {label}
      </label>

      <TextField
        fullWidth
        size="small"
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            fontSize: "12px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "13px 14px",
          },
        }}
      />
    </div>
  );
};

export default FormInput;