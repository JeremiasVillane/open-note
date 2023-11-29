import { Text, useMantineColorScheme } from "@mantine/core";
import { appWindow } from "@tauri-apps/api/window";
import { useCallback, useLayoutEffect, useState } from "react";
import TitleBarButtons from "./TitleBarButtons";
import TitleBarMenu from "./TitleBarMenu";

export function Titlebar() {
  const { colorScheme } = useMantineColorScheme();
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [windowTitle, setWindowTitle] = useState<string>("");

  useLayoutEffect(() => {
    appWindow.isMaximized().then(setIsMaximized);
    appWindow.title().then((title) => {
      if (windowTitle !== title) setWindowTitle(title);
    });
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

  const handleClose = async () => await appWindow.close();

  return (
    <div
      id="titlebar"
      className="h-[var(--titlebar-height)] flex justify-between fixed select-none top-0 left-0 right-0 z-[999]"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? "var(--mantine-color-dark-8)"
            : "var(--mantine-color-gray-1)",
      }}
      data-tauri-drag-region
    >
      <div className="flex items-center">
        <TitleBarMenu
          handleMinimize={handleMinimize}
          handleRestore={handleRestore}
          handleMaximize={handleMaximize}
          handleClose={handleClose}
          isMaximized={isMaximized}
        />

        <Text data-tauri-drag-region inline size="xs">
          {windowTitle}
        </Text>
      </div>

      <TitleBarButtons
        handleMinimize={handleMinimize}
        handleRestore={handleRestore}
        handleMaximize={handleMaximize}
        handleClose={handleClose}
        isMaximized={isMaximized}
      />
    </div>
  );
}
