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
    <div className="pr-form-group">
      <label className="pr-form-label">
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
            backgroundColor: "#FFFFFF",
            height: "44px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 14px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E6E8EC",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D5D9DF",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00856F",
          },
        }}
      />
    </div>
  );
};

export default FormInput;