import { FileObj } from "../types";

export function renameItemRecursively(
  fileList: FileObj[],
  targetId: string,
  newName: string
) {
  return fileList.map((item) => {
    if (item.id === targetId) {
      item.name = newName
    } else if (item.children) {
      item.children = renameItemRecursively(item.children, targetId, newName);
    }
    return item;
  });
}
