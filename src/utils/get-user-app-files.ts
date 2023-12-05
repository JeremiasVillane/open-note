import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { nanoid } from "nanoid";
import { FileObj } from "../types";
import { fs } from "@tauri-apps/api";
import { APP_NAME } from "../constants";

export async function getUserAppFiles(path: string) {
  const scanDir = async (path: string): Promise<FileObj[]> => {
    const _documents = await documentDir();
    const folderContent: FileEntry[] = await readDir(path);

    let folders: FileObj[] = [];
    const files: FileObj[] = [];

    await Promise.all(
      folderContent.map(async (file) => {
        const fileContent = await fs.readTextFile(`${_documents}${APP_NAME}\\${file.name}`);
        const fileJSON: FileObj = JSON.parse(fileContent)
        // const id = nanoid();
        const isFolder: boolean = "children" in file;
        // let subFolder: string | null = null;

        if (isFolder) {
          // subFolder = await join(path, file.name!);
          folders.push({
            id: fileJSON.id,
            name: fileJSON.name,
            parent: fileJSON.parent,
            children: fileJSON.children,
            isFolder,
          });
        } else {
          files.push({
            id: fileJSON.id,
            name: fileJSON.name,
            parent: fileJSON.parent,
            content: fileJSON.content,
            isFolder,
          });
        }
      })
    );

    return [
      ...folders.sort((a, b) => a.name.localeCompare(b.name)),
      ...files.sort((a, b) => a.name.localeCompare(b.name)),
    ];
  };

  return await scanDir(path);
}
