import { Close, Maximize, Minimize, SquareOutlined } from "@mui/icons-material";
import { Theme, useTheme } from "@mui/material";
import { appWindow } from "@tauri-apps/api/window";
import { useCallback, useLayoutEffect, useState } from "react";

export function Titlebar() {
  const theme = useTheme<Theme>();
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
    <div
      id="titlebar"
      style={{
        backgroundColor: theme.palette.mode === "dark" ? "#1c1c1c" : "gray",
      }}
      data-tauri-drag-region
    >
      <div className="flex items-center gap-1 5 pl-2">
        <img src="/tauri.svg" style={{ width: 10 }} alt="" />
        <span className="text-xs uppercase">Open Note</span>
      </div>

      <div className="titlebar-actions">
        <i className="titlebar-icon" onClick={handleMinimize}>
          <Minimize />
        </i>

        {isMaximized ? (
          <i className="titlebar-icon" onClick={handleRestore}>
            <Maximize />
          </i>
        ) : (
          <i onClick={handleMaximize} className="titlebar-icon">
            <SquareOutlined />
          </i>
        )}

        <i id="ttb-close" className="titlebar-icon" onClick={handleClose}>
          <Close />
        </i>
      </div>
    </div>
  );
}
