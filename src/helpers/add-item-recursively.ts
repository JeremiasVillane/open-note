import { FileObj } from "../types";

export function addItemRecursively(
  fileList: FileObj[],
  parentId: string,
  newItem: FileObj
) {
  return fileList.map((item) => {
    if (item.id === parentId) {
      item.children = item.children ? [...item.children, newItem] : [newItem];

      const folders = item.children
        .filter((item) => item.isFolder)
        .sort((a, b) => a.name.localeCompare(b.name));
      const notes = item.children
        .filter((item) => !item.isFolder)
        .sort((a, b) => a.name.localeCompare(b.name));

      item.children = [...folders, ...notes];
    } else if (item.children) {
      item.children = addItemRecursively(item.children, parentId, newItem);
    }
    return item;
  });
}
