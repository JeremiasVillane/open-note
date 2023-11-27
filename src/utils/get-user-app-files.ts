import { documentDir, join } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";
import { APP_NAME } from "../constants";

export async function getUserAppFiles() {
  const documentPath = await documentDir();
  const scanDir = await readDir(await join(documentPath, APP_NAME));
  const filenames = scanDir.map((file) => file.name);

  return filenames;
}
