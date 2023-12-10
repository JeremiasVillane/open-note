import { Text, useMantineColorScheme } from "@mantine/core";
import { appWindow } from "@tauri-apps/api/window";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useNotesStore } from "../../store/notesStore";
import TitleBarButtons from "./TitleBarButtons";
import TitleBarIconMenu from "./TitleBarIconMenu";
import TitleBarMenuBar from "./titlebar-menubar/TitleBarMenuBar";

export function Titlebar() {
  const { colorScheme } = useMantineColorScheme();
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isOnTop, setIsOnTop] = useState<boolean>(false);
  const [windowTitle, setWindowTitle] = useState<string>("");
  const { currentNote } = useNotesStore();

  useLayoutEffect(() => {
    appWindow.title().then((title) => {
      if (windowTitle !== title) setWindowTitle(title);
    });
  }, []);

  useEffect(() => {
    appWindow.isMaximized().then((res) => {
      setIsMaximized(res);
    });
  }, [appWindow.isMaximized()]);

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
  }, []);

  const handleAlwaysOnTop = useCallback(async () => {
    await appWindow.setAlwaysOnTop(!isOnTop);
    setIsOnTop(!isOnTop);
  }, [appWindow, isOnTop]);

  const handleClose = async () => await appWindow.close();

  return (
    <section
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
      <div className="flex items-center gap-1">
        <TitleBarIconMenu
          handleMinimize={handleMinimize}
          handleRestore={handleRestore}
          handleMaximize={handleMaximize}
          handleAlwaysOnTop={handleAlwaysOnTop}
          handleClose={handleClose}
          isOnTop={isOnTop}
          isMaximized={isMaximized}
        />

        <TitleBarMenuBar />
      </div>

      <Text
        data-tauri-drag-region
        inline
        size="sm"
        className="overlook self-center italic"
        data-text={currentNote ? currentNote.name : windowTitle}
      />

      <TitleBarButtons
        handleMinimize={handleMinimize}
        handleRestore={handleRestore}
        handleMaximize={handleMaximize}
        handleClose={handleClose}
        isMaximized={isMaximized}
      />
    </section>
  );
}
