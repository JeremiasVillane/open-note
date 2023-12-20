import React from "react";
import { CustomIconProps } from "@/types";

export const MinimizeIcon: React.FC<CustomIconProps<SVGSVGElement>> = (
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
    <path fill={props.color ?? "currentColor"} d="M14 8v1H3V8h11z" />
  </svg>
);
