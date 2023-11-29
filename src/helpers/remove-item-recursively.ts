import { FileObj } from "../types";

export function removeItemRecursively(
  fileList: FileObj[], 
  id: string
) {
  return fileList.filter((note) => {
    if (note.id === id) {
      return false;
    } else if (note.children) {
      note.children = removeItemRecursively(note.children, id);
    }
    return true;
  });
}
