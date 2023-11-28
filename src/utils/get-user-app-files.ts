import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { nanoid } from "nanoid";
import { FileObj } from "../types";

export async function getUserAppFiles(path: string) {
  const scanDir = async (path: string): Promise<FileObj[]> => {
    const folderContent: FileEntry[] = await readDir(path);

    const files: FileObj[] = await Promise.all(
      folderContent.map(async (file) => {
        const isFolder: boolean = "children" in file;
        let subFolder: string | null = null;
        const id = nanoid();

        if (isFolder) {
          subFolder = await join(path, file.name!);
        }

        const output: FileObj = {
          id,
          name: file.name ?? "",
          isFolder,
          children: isFolder ? await scanDir(subFolder!) : undefined,
        };

        return output;
      })
    );

    return files;
  };

  return await scanDir(path);
}
