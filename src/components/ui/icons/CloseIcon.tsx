import React from "react";

export const CloseIcon: React.FC<CustomIconProps<SVGSVGElement>> = (props) => (
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
      fillRule="evenodd"
      d="m7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884L7.116 8z"
      clipRule="evenodd"
    />
  </svg>
);
