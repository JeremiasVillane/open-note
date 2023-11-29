import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import * as fs from "@tauri-apps/api/fs";
import * as os from "@tauri-apps/api/os";
import * as tauriPath from "@tauri-apps/api/path";
import { appWindow } from "@tauri-apps/api/window";
import React, { useContext, useEffect, useState } from "react";
import { Titlebar } from "../components";
import { APP_NAME, RUNNING_IN_TAURI } from "../constants";
import { getUserAppFiles } from "../utils";
import { useNotesStore } from "../store/notesStore";

const WIN32_CUSTOM_TITLEBAR = true;
// NOTE: Add memoized Tauri calls in this file
//   that you want to use synchronously across components in your app

// defaults are only for auto-complete
const TauriContext = React.createContext({
  loading: true,
  downloads: "",
  documents: "",
  appDocuments: "",
  osType: "",
  fileSep: "/",
});

export const useTauriContext = () => useContext(TauriContext);

export function TauriProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [downloads, setDownloadDir] = useState<string>("");
  const [documents, setDocumentDir] = useState<string>("");
  const [osType, setOsType] = useState<string>("");
  const [fileSep, setFileSep] = useState<string>("/");
  const [appDocuments, setAppDocuments] = useState<string>("");
  const { setItems } = useNotesStore();

  if (RUNNING_IN_TAURI) {
    useEffect(() => {
      if (osType === "Windows_NT") {
        appWindow.setDecorations(!WIN32_CUSTOM_TITLEBAR);
        if (WIN32_CUSTOM_TITLEBAR) {
          const root = document.getElementById("root");
          if (root) {
            root.style.setProperty("--titlebar-height", "28px");
          }
        }
      }
    }, [osType]);

    useEffect(() => {
      // if you want to listen for event listeners, use mountID trick to call unlisten on old listeners
      const callTauriAPIs = async () => {
        // Handle additional app launches (url, etc.)
        await listen(
          "newInstance",
          ({ payload }: { payload: Record<string, any> }) => {
            appWindow.unminimize().then(() => appWindow.setFocus());
            let args = payload?.args;
            if (args?.length > 1) {
            }
          }
        );
        setDownloadDir(await tauriPath.downloadDir());
        const _documents = await tauriPath.documentDir();
        setDocumentDir(_documents);
        const _osType = await os.type();
        setOsType(_osType);
        const _fileSep = _osType === "Windows_NT" ? "\\" : "/";
        setFileSep(_fileSep);
        await fs.createDir(APP_NAME, {
          dir: fs.BaseDirectory.Document,
          recursive: true,
        });
        setAppDocuments(`${_documents}${APP_NAME}`);
        const userAppFiles = await getUserAppFiles(`${_documents}${APP_NAME}`);
        // @ts-ignore
        setItems(userAppFiles);
        setLoading(false);

        invoke("show_main_window");
        // Why? The default background color of webview is white
        //  so we should show the window when the react app loads
        // See: https://github.com/tauri-apps/tauri/issues/1564
      };
      callTauriAPIs().catch(console.error);
    }, []);
  }

  return (
    <TauriContext.Provider
      value={{
        loading,
        fileSep,
        downloads,
        documents,
        osType,
        appDocuments,
      }}
    >
      <Titlebar />
      {children}
    </TauriContext.Provider>
  );
}
