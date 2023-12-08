import { getFileStructure } from ".";
import { FileObj } from "../types";

export const loadFiles = async (
  path: string,
  loaderFn: (content: FileObj[]) => void
) => {
  const folderContent = await getFileStructure(path);
  loaderFn(folderContent ?? []);
};
