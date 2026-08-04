import { Icon } from "@iconify/react";
import React from "react";

export const CheckboxUncheckedIcon = () => (
  <Icon icon="tabler:square" width={20} height={20} />
);

export const CheckboxCheckedIcon = () => (
  <span className="relative inline-flex h-5 w-5 items-center justify-center">
    <Icon icon="tabler:square" width={20} height={20} />
    <Icon
      icon="tabler:check"
      width={14}
      height={14}
      className="absolute"
    />
  </span>
);
