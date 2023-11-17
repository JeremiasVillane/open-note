import { useMantineColorScheme } from "@mantine/core";
import { Stack } from "@mui/material";
import { appWindow } from "@tauri-apps/api/window";
import { useCallback, useLayoutEffect, useState } from "react";
import { CloseIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from "./icons";

export function Titlebar() {
  const { colorScheme } = useMantineColorScheme();
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  useLayoutEffect(() => {
    appWindow.isMaximized().then(setIsMaximized);
  }, []);

  const handleMinimize = useCallback(() => {
    appWindow.minimize();
  }, [appWindow]);

  const handleMaximize = useCallback(() => {
    appWindow.toggleMaximize();
    setIsMaximized(true);
  }, [appWindow, setIsMaximized]);

  const handleRestore = useCallback(() => {
    appWindow.toggleMaximize();
    setIsMaximized(false);
  }, [appWindow, setIsMaximized]);

  const handleClose = () => appWindow.close();

  return (
    <Stack
      id="titlebar"
      direction="row"
      style={{
        borderColor: colorScheme === "dark" ? "#2f2f2f" : "rgb(209, 213, 219)",
      }}
      data-tauri-drag-region
    >
      <div className="flex items-center gap-1 5 pl-2">
        <img src="/tauri.svg" style={{ width: 10 }} alt="" />
        <span className="text-xs uppercase">Open Note</span>
      </div>

      <div className="titlebar-actions">
        <i className="titlebar-icon" onClick={handleMinimize}>
          <MinimizeIcon size={18} />
        </i>

        {isMaximized ? (
          <i className="titlebar-icon" onClick={handleRestore}>
            <RestoreIcon size={18} />
          </i>
        ) : (
          <i onClick={handleMaximize} className="titlebar-icon">
            <MaximizeIcon size={18} />
          </i>
        )}

        <i id="ttb-close" className="titlebar-icon" onClick={handleClose}>
          <CloseIcon size={18} />
        </i>
      </div>
    </Stack>
  );
}
