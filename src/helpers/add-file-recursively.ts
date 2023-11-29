import { FileObj } from "../types";

export function addFileRecursively(
  fileList: FileObj[],
  parentId: string,
  note: FileObj
) {
  return fileList.map((item) => {
    if (item.id === parentId) {
      if (!item.children) {
        item.children = [];
      }
      item.children.push(note);
    } else if (item.children) {
      item.children = addFileRecursively(item.children, parentId, note);
    }
    return item;
  });
}
