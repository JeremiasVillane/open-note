import React from "react";
import { CustomIconProps } from "@/types";

export const OptionsIcon: React.FC<CustomIconProps<SVGSVGElement>> = (
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
    <title>{props.title ?? ""}</title>
    <path
      fill={props.color ?? "currentColor"}
      d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"
    />
  </svg>
);
