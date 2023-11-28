import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { nanoid } from "nanoid";
import { FileObj } from "../types";

export async function getUserAppFiles(path: string) {
  const scanDir = async (path: string): Promise<FileObj[]> => {
    const folderContent: FileEntry[] = await readDir(path);

    const folders: FileObj[] = [];
    const files: FileObj[] = [];

    await Promise.all(
      folderContent.map(async (file) => {
        const id = nanoid();
        const isFolder: boolean = "children" in file;
        let subFolder: string | null = null;

        if (isFolder) {
          subFolder = await join(path, file.name!);
          folders.push({
            id,
            name: file.name ?? "",
            path: file.path,
            isFolder,
            children: isFolder ? await scanDir(subFolder!) : undefined,
          });
        } else {
          files.push({
            id,
            name: file.name ?? "",
            path: file.path,
            isFolder,
          });
        }
      })
    );

    return [...folders, ...files];
  };

  return await scanDir(path);
}
