import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 56,
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    color: "#141414",
    "& fieldset": { borderColor: "#D0D0D0", borderWidth: "0.5px" },
    "&:hover fieldset": { borderColor: "#98A2B3" },
    "&.Mui-focused fieldset": {
      borderColor: "#096B58",
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#666666",
    opacity: 1,
  },
};

const TagAutocomplete = ({
  value = [],
  inputValue = "",
  options = [],
  placeholder = "",
  IconComponent,
  onChange,
  onInputChange,
}) => (
  <div>
    {value.length > 0 && (
      <div className="mb-2 flex min-h-7 flex-wrap gap-2">
        {value.map((selectedValue) => (
          <Chip
            key={selectedValue}
            label={selectedValue}
            size="small"
            deleteIcon={<CloseIcon />}
            onDelete={() =>
              onChange?.(value.filter((item) => item !== selectedValue))
            }
            sx={{
              height: 28,
              border: 0,
              borderRadius: "4px",
              backgroundColor: "#E8F7F7",
              color: "#248B8F",
              fontSize: "12px",
              fontWeight: 400,
              "& .MuiChip-label": { px: 1.5 },
              "& .MuiChip-deleteIcon": {
                mr: 0.75,
                fontSize: 15,
                color: "#248B8F",
                "&:hover": { color: "#1D7275" },
              },
            }}
          />
        ))}
      </div>
    )}

    <Autocomplete
      multiple
      freeSolo
      filterSelectedOptions
      options={options}
      value={value}
      inputValue={inputValue}
      onChange={(_event, nextValue) => onChange?.(nextValue)}
      onInputChange={(_event, nextValue, reason) => {
        if (reason === "input" || reason === "clear") {
          onInputChange?.(nextValue);
        }
      }}
      renderTags={() => null}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          sx={fieldSx}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              startAdornment: IconComponent ? (
                <InputAdornment position="start">
                  <IconComponent sx={{ fontSize: 20, color: "#667085" }} />
                </InputAdornment>
              ) : null,
            },
          }}
        />
      )}
    />
  </div>
);

export default TagAutocomplete;
