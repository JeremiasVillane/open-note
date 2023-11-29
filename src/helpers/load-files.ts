import { FileObj } from "../types";
import { getUserAppFiles } from "../utils";

export const loadFiles = async (
  path: string,
  loaderFn: (content: FileObj[]) => void
) => {
  const folderContent = await getUserAppFiles(path);
  loaderFn(folderContent);
};
