import { invoke } from "@tauri-apps/api/tauri";
import { FileObj } from "../types";

export const loadFiles = async (
  path: string,
  loaderFn: (content: FileObj[]) => void
) => {
  const folderScan: FileObj = await invoke("get_user_app_files_command", {
    path,
  });

  loaderFn(folderScan?.children ?? []);
};
