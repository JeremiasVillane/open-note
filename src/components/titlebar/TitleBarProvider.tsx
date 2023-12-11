import { appWindow } from "@tauri-apps/api/window";
import {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useTauriContext } from "../../providers/tauri-provider";
import { TitleBarContextType } from "../../types";

const TitleBarContext = createContext<TitleBarContextType>({
  windowTitle: "",
  isMaximized: false,
  isOnTop: false,
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
}> = ({ children }: any) => {
  const { osType } = useTauriContext();
  const [windowTitle, setWindowTitle] = useState<string>("");
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isOnTop, setIsOnTop] = useState<boolean>(false);

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
    await appWindow.close();
  }, []);

  return (
    <TitleBarContext.Provider
      value={{
        windowTitle,
        isMaximized,
        isOnTop,
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
