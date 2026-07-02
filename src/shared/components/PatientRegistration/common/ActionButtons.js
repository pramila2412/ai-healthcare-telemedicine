import React from "react";

const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}) => (
  <button
    type={type}
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
    className={`
      h-14 rounded-lg px-6 text-xs font-medium font-TypeFace
      flex items-center justify-center transition-colors duration-150
      w-full md:w-auto
      ${
        disabled
          ? "bg-[#F4F4F4] text-[#838383] cursor-not-allowed"
          : "bg-[#096B58] text-white cursor-pointer hover:bg-[#074f40]"
      }
      ${className}
    `}
  >
    {children}
  </button>
);

const SecondaryButton = ({
  children,
  onClick,
  variant = "back",
  type = "button",
}) => {
  const variantClass =
    variant === "skip"
      ? "bg-[#EEF4F3] text-[#096B58] hover:bg-[#ddf0ec]"
      : "bg-[#F5F5F5] text-[#096B58] hover:bg-[#EAEAEA] md:bg-white";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        h-14 w-full md:w-auto rounded-lg px-6 text-xs font-medium font-TypeFace
        cursor-pointer transition-colors duration-150
        ${variantClass}
      `}
    >
      {children}
    </button>
  );
};

const ActionButtons = ({ skip, back, next }) => {
  const nextButton = next && (
    <PrimaryButton onClick={next.onClick} disabled={next.disabled}>
      {next.label}
    </PrimaryButton>
  );

  const backButton = back && (
    <SecondaryButton variant="back" onClick={back.onClick}>
      {back.label}
    </SecondaryButton>
  );

  const skipButton = skip && (
    <SecondaryButton variant="skip" onClick={skip.onClick}>
      {skip.label}
    </SecondaryButton>
  );

  if (!skip && !back) {
    return (
      <div className="w-full flex justify-end">
        {nextButton}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="order-2 md:order-1">
        {skipButton}
      </div>

      <div className="order-1 flex flex-col gap-4 md:order-2 md:flex-row-reverse md:items-center">
        {nextButton}
        {backButton}
      </div>
    </div>
  );
};

export default ActionButtons;