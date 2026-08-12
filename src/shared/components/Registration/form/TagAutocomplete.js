import { Icon } from "@iconify/react";
import Chip from "@mui/material/Chip";
import React from "react";

import FormSelect from "./FormSelect";

const TagAutocomplete = ({
  value = [],
  options = [],
  placeholder = "",
  icon,
  onChange,
}) => (
  <div>
    {value.length > 0 && (
      <div className="mb-2 flex min-h-7 flex-wrap gap-2">
        {value.map((selectedValue) => (
          <Chip
            key={selectedValue}
            label={selectedValue}
            size="small"
            deleteIcon={
              <Icon icon="tabler:letter-x" width={15} height={15} />
            }
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

    <FormSelect
      value=""
      options={options.filter((option) => !value.includes(option))}
      placeholder={placeholder}
      searchPlaceholder={`Search ${placeholder.toLowerCase().replace("enter your ", "")}`}
      icon={icon}
      showDropdownIcon={false}
      onSelect={(_name, selectedValue) => {
        onChange?.([...value, selectedValue]);
      }}
    />
  </div>
);

export default TagAutocomplete;
