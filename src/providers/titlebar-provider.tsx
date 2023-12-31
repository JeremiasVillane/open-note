import { TransitionProps } from "@mantine/core";
import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { TitleBarContextType } from "@/types";
import { useTauriContext } from "./tauri-provider";

const TitleBarContext = createContext<TitleBarContextType>({
  windowTitle: "",
  isMaximized: false,
  isOnTop: false,
  openMenu: false,
  transitionProps: undefined,
  setOpenMenu: () => {},
  handleMinimize: () => Promise.resolve(),
  handleMaximize: () => Promise.resolve(),
  handleOnTop: () => Promise.resolve(),
  handleExit: () => Promise.resolve(),
});

/**
 * It provides the necessary context for managing the title bar of the application window.
 *
 * @param {React.ReactNode} children - The children components to be wrapped by the provider.
 * @return {React.ReactNode} The wrapped children components.
 */
export const TitleBarProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: any): React.ReactNode => {
  const { osType } = useTauriContext();
  const [windowTitle, setWindowTitle] = useState<string>("");
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isOnTop, setIsOnTop] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState(false);

  const transitionProps: Partial<Omit<TransitionProps, "mounted">> = {
    transition: "fade",
    duration: 1,
  };

  useLayoutEffect(() => {
    appWindow.title().then((title) => {
      if (windowTitle !== title) setWindowTitle(title);
    });
  }, []);

  // Update the isMaximized state when the window is resized
  const updateIsWindowMaximized = useCallback(async () => {
    if (appWindow) {
      const isWindowMaximized = await appWindow.isMaximized();
      setIsMaximized(isWindowMaximized);
    }
  }, [appWindow]);

  useEffect(() => {
    // https://github.com/agmmnn/tauri-controls/issues/10#issuecomment-1675884962
    if (osType !== "macos") {
      updateIsWindowMaximized();
      let unlisten: () => void = () => {};

      const listen = async () => {
        if (appWindow) {
          unlisten = await appWindow.onResized(() => {
            updateIsWindowMaximized();
          });
        }
      };
      listen();

      return () => unlisten && unlisten();
    }
  }, [appWindow, updateIsWindowMaximized]);

  const handleMinimize = useCallback(async () => {
    await appWindow.minimize();
  }, [appWindow]);

  const handleMaximize = useCallback(async () => {
    await appWindow.toggleMaximize();
  }, [appWindow, setIsMaximized]);

  const handleOnTop = useCallback(async () => {
    await appWindow.setAlwaysOnTop(!isOnTop);
    setIsOnTop(!isOnTop);
  }, [appWindow, isOnTop]);

  const handleExit = useCallback(async () => {
    const mainWindow = WebviewWindow.getByLabel("main");
    await mainWindow?.emit("modal-closed");

    await appWindow.close();
  }, []);

  return (
    <TitleBarContext.Provider
      value={{
        windowTitle,
        isMaximized,
        isOnTop,
        openMenu,
        setOpenMenu,
        transitionProps,
        handleMinimize,
        handleMaximize,
        handleOnTop,
        handleExit,
      }}
    >
      {children}
    </TitleBarContext.Provider>
  );
};

export default TitleBarContext;
