import { fs } from "@tauri-apps/api";
import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { APP_NAME } from "../constants";
import { FileObj } from "../types";

export async function setChildren(parentId: string, childrenId: string) {
  const _documents = await documentDir();
  const path = `${_documents}${APP_NAME}\\`;

  let parentContent = await fs.readTextFile(path)


  const scanDir = async (path: string): Promise<FileObj[]> => {
    const pathContent: FileEntry[] = await readDir(path);

    let folderFound = pathContent.find(item => item.name === parentId);


    const folders: FileObj[] = [];
    const files: FileObj[] = [];

    await Promise.all(
      pathContent.map(async (file) => {
        const fileContent = await fs.readTextFile(`${path}\\${file.name}`);
        const fileJSON: FileObj = JSON.parse(fileContent);
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
      ...folders
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((item) => ids.includes(item.id)),
      ...files
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((item) => ids.includes(item.id)),
    ];
  };

  return await scanDir(`${_documents}${APP_NAME}`);
}
