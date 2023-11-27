import React from "react";
import { CustomIconProps } from "../../../types";

export const RestoreIcon: React.FC<CustomIconProps<SVGSVGElement>> = (
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
    <title>{props.title ?? ""}</title>
    <g fill={props.color ?? "currentColor"}>
      <path d="M3 5v9h9V5H3zm8 8H4V6h7v7z" />
      <path
        fillRule="evenodd"
        d="M5 5h1V4h7v7h-1v1h2V3H5v2z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
