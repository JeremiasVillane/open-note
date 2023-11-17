import React from "react";

export const MaximizeIcon: React.FC<CustomIconProps<SVGSVGElement>> = (
  props
) => (
  <svg
    aria-hidden="false"
    focusable="true"
    height={props.size ?? "1em"}
    width={props.size ?? "1em"}
    role="presentation"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill={props.color ?? "currentColor"}
      d="M3 3v10h10V3H3zm9 9H4V4h8v8z"
    />
  </svg>
);
