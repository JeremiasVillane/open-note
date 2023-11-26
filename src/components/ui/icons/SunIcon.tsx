import React from "react";

export const SunIcon: React.FC<CustomIconProps<SVGSVGElement>> = (
  props
) => (
  <svg
    aria-hidden="false"
    focusable="true"
    height={props.size ?? "24"}
    width={props.size ?? "24"}
    role="presentation"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill={props.color ?? "currentColor"}
      d="M12 8a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 10a6 6 0 0 1-6-6a6 6 0 0 1 6-6a6 6 0 0 1 6 6a6 6 0 0 1-6 6m8-9.31V4h-4.69L12 .69L8.69 4H4v4.69L.69 12L4 15.31V20h4.69L12 23.31L15.31 20H20v-4.69L23.31 12z"
    />
  </svg>
);
