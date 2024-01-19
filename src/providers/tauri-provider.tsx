import { APP_NAME, RUNNING_IN_TAURI } from "@/constants";
import { loadFiles } from "@/helpers";
import { useNotesStore } from "@/store/notesStore";
import { globalShortcut, invoke } from "@tauri-apps/api";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { type } from "@tauri-apps/api/os";
import { documentDir } from "@tauri-apps/api/path";
import { appWindow } from "@tauri-apps/api/window";
import React, { useContext, useEffect, useState } from "react";

const WIN32_CUSTOM_TITLEBAR = true;

const TauriContext = React.createContext({
  appFolder: "",
  osType: "",
});

export const useTauriContext = () => useContext(TauriContext);

/**
 * Initializes the Tauri provider.
 *
 * Code partially based on: https://github.com/elibroftw/modern-desktop-app-template/blob/master/src/TauriProvider.jsx
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children to be rendered inside the provider.
 * @return {React.ReactNode} The rendered children.
 */
export function TauriProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [osType, setOsType] = useState<string>("");
  const [appFolder, setAppFolder] = useState<string>("");
  const { setItems } = useNotesStore();

  // Disable global hotkeys to print and refresh the page,
  // asigning a null function to them.
  useEffect(() => {
    globalShortcut.registerAll(
      ["CommandOrControl+P", "CommandOrControl+R", "F5"],
      () => null
    );
  }, []);

  if (RUNNING_IN_TAURI) {
    // Set window decorations and custom title bar height
    useEffect(() => {
      if (osType !== "Windows_NT") {
        return;
      }

      appWindow.setDecorations(!WIN32_CUSTOM_TITLEBAR);

      if (!WIN32_CUSTOM_TITLEBAR) {
        return;
      }

      const root = document.getElementById("root");
      if (root) {
        root.style.setProperty("--titlebar-height", "28px");
      }
    }, [osType]);

    // Perform Tauri-specific initialization on component mount
    useEffect(() => {
      (async () => {
        // Set the osType global state
        const currentOsType = await type();
        setOsType(currentOsType);

        // Create the app folder within the user Documents folder
        await createDir(APP_NAME, {
          dir: BaseDirectory.Document,
          recursive: true,
        });

        // Set the appFolder global state
        const userDocuments = await documentDir();
        setAppFolder(`${userDocuments}${APP_NAME}`);

        // Read the app folder content and store the files
        // in the fileList global state through setItems
        await loadFiles(`${userDocuments}${APP_NAME}`, setItems);

        // Close the splashscreen window
        invoke("close_splashscreen");
      })().catch(console.error);
    }, []);
  }

  return (
    <TauriContext.Provider
      value={{
        osType,
        appFolder,
      }}
    >
      {children}
    </TauriContext.Provider>
  );
}
