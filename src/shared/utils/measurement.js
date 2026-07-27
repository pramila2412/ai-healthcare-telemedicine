const roundToOneDecimal = (value) => Math.round(value * 10) / 10;

export const parseFeetAndInches = (value) => {
  const normalizedValue = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\bfeet\b|\bfoot\b/g, "ft")
    .replace(/\binches\b|\binch\b/g, "in");

  if (!normalizedValue) return null;

  const explicitMatch = normalizedValue.match(
    /^(\d{1,2})\s*(?:'|ft|\/|\s)\s*(\d{1,2}(?:\.\d+)?)\s*(?:"|in)?$/,
  );
  if (explicitMatch) {
    const feet = Number(explicitMatch[1]);
    const inches = Number(explicitMatch[2]);
    return inches < 12 ? { feet, inches } : null;
  }

  const feetOnlyMatch = normalizedValue.match(/^(\d{1,2}(?:\.\d+)?)\s*(?:'|ft)?$/);
  if (!feetOnlyMatch) return null;

  const decimalFeet = Number(feetOnlyMatch[1]);
  const feet = Math.floor(decimalFeet);
  return {
    feet,
    inches: roundToOneDecimal((decimalFeet - feet) * 12),
  };
};

export const convertHeightValue = (value, fromUnit, toUnit) => {
  if (value === "" || value === null || value === undefined || fromUnit === toUnit) {
    return value;
  }

  if (fromUnit === "cm" && toUnit === "ft/in") {
    const centimeters = Number(value);
    if (!Number.isFinite(centimeters)) return value;

    const totalInches = centimeters / 2.54;
    let feet = Math.floor(totalInches / 12);
    let inches = Math.round(totalInches - feet * 12);
    if (inches === 12) {
      feet += 1;
      inches = 0;
    }
    return `${feet}' ${inches}"`;
  }

  if (fromUnit === "ft/in" && toUnit === "cm") {
    const measurement = parseFeetAndInches(value);
    if (!measurement) return value;
    return String(
      Math.round((measurement.feet * 12 + measurement.inches) * 2.54),
    );
  }

  return value;
};

export const convertWeightValue = (value, fromUnit, toUnit) => {
  if (value === "" || value === null || value === undefined || fromUnit === toUnit) {
    return value;
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return value;

  if (fromUnit === "kg" && toUnit === "lb") {
    return String(roundToOneDecimal(numericValue * 2.2046226218));
  }

  if (fromUnit === "lb" && toUnit === "kg") {
    return String(roundToOneDecimal(numericValue / 2.2046226218));
  }

  return value;
};
