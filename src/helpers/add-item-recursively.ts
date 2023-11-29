import { FileObj } from "../types";

export function addItemRecursively(
  fileList: FileObj[],
  parentId: string,
  newItem: FileObj
) {
  return fileList.map((item) => {
    if (item.id === parentId) {
      if (!item.children) {
        item.children = [];
      }
      item.children.push(newItem);
    } else if (item.children) {
      item.children = addItemRecursively(item.children, parentId, newItem);
    }
    return item;
  });
}
