import { invoke } from "@tauri-apps/api/tauri";
import { FileObj } from "../types";

/**
 * Loads files from a given path and executes a loader function with the content.
 *
 * @param {string} path - The path of the folder to scan for files.
 * @param {(content: FileObj[]) => void} loaderFn - The function to execute with the scanned files.
 * @return {void} undefined
 */
export const loadFiles = async (
  path: string,
  loaderFn: (content: FileObj[]) => void
) => {
  const folderScan: FileObj = await invoke("get_user_app_files_command", {
    path,
  });

  loaderFn(folderScan?.children ?? []);
};
