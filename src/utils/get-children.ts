import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { nanoid } from "nanoid";
import { FileObj } from "../types";
import { fs } from "@tauri-apps/api";
import { APP_NAME } from "../constants";

export async function getChildren(ids: string[]) {
  const _documents = await documentDir();

  const scanDir = async (path: string): Promise<FileObj[]> => {
    const folderContent: FileEntry[] = await readDir(path);

    const folders: FileObj[] = [];
    const files: FileObj[] = [];

    await Promise.all(
      folderContent.map(async (file) => {
        const fileContent = await fs.readTextFile(`${path}\\${file.name}`);
        const fileJSON: FileObj = JSON.parse(fileContent)
        const isFolder: boolean = fileJSON.isFolder;

        if (isFolder) {
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
      ...folders.sort((a, b) => a.name.localeCompare(b.name)).filter(item => ids.includes(item.id)),
      ...files.sort((a, b) => a.name.localeCompare(b.name)).filter(item => ids.includes(item.id)),
    ];
  };

  return await scanDir(`${_documents}${APP_NAME}`);
}
