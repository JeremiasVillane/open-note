import React from "react";
import { CustomIconProps } from "../../../types";

export const MoonIcon: React.FC<CustomIconProps<SVGSVGElement>> = (props) => (
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
      d="M12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12c0-2.42-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6a6 6 0 0 1 6 6a6 6 0 0 1-6 6m8-9.31V4h-4.69L12 .69L8.69 4H4v4.69L.69 12L4 15.31V20h4.69L12 23.31L15.31 20H20v-4.69L23.31 12z"
    />
  </svg>
);
