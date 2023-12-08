import { globalShortcut, invoke } from "@tauri-apps/api";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { type } from "@tauri-apps/api/os";
import { documentDir } from "@tauri-apps/api/path";
import { appWindow } from "@tauri-apps/api/window";
import React, { useContext, useEffect, useState } from "react";
import { Titlebar } from "../components";
import { APP_NAME, RUNNING_IN_TAURI } from "../constants";
import { getFileStructure } from "../helpers";
import { useNotesStore } from "../store/notesStore";
import { FileObj } from "../types";

const WIN32_CUSTOM_TITLEBAR = true;

const TauriContext = React.createContext({
  appFolder: "",
  osType: "",
});

export const useTauriContext = () => useContext(TauriContext);

export function TauriProvider({ children }: { children: React.ReactNode }) {
  const [osType, setOsType] = useState<string>("");
  const [appFolder, setAppFolder] = useState<string>("");
  const { setItems } = useNotesStore();

  useEffect(() => {
    globalShortcut.registerAll(["CommandOrControl+P", "F5"], () => null);
  }, []);

  if (RUNNING_IN_TAURI) {
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

    useEffect(() => {
      (async () => {
        const currentOsType = await type();
        setOsType(currentOsType);

        await createDir(APP_NAME, {
          dir: BaseDirectory.Document,
          recursive: true,
        });

        const userDocuments = await documentDir();
        setAppFolder(`${userDocuments}${APP_NAME}`);

        const userAppFiles: FileObj[] | undefined = await getFileStructure(
          `${userDocuments}${APP_NAME}`
        );
        setItems(userAppFiles ?? []);

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
      <Titlebar />
      {children}
    </TauriContext.Provider>
  );
}
