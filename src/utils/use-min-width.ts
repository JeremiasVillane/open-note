import { currentMonitor, getCurrent } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { RUNNING_IN_TAURI } from "../constants";

// ***** Code by elibroftw

export function useMinWidth(minWidth: number) {
  if (RUNNING_IN_TAURI) {
    useEffect(() => {
      async function resizeWindow() {
        // to set a size consistently across devices,
        //  one must use LogicalSize (Physical cannot be relied upon)
        const physicalSize = await getCurrent().innerSize();
        // Since innerSize returns Physical size, we need
        //   to get the current monitor scale factor
        //   to convert the physical size into a logical size
        const monitor = await currentMonitor();
        const scaleFactor = monitor?.scaleFactor;
        const logicalSize = physicalSize.toLogical(scaleFactor ?? 1);
        if (logicalSize.width < minWidth) {
          logicalSize.width = minWidth;
          await getCurrent().setSize(logicalSize);
        }
      }
      resizeWindow().catch(console.error);
    }, []);
  }
}
