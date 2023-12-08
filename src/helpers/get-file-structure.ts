import { invoke } from "@tauri-apps/api/tauri";
import { FileObj } from "../types";

export async function getFileStructure(path: string) {
  const result: FileObj | undefined = await invoke(
    "get_user_app_files_command",
    { path }
  );

  return result?.children;
}
