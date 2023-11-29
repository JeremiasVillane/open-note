import { FileObj } from "../types";

export function removeFileRecursively(
  fileList: FileObj[], 
  id: string
) {
  return fileList.filter((note) => {
    if (note.id === id) {
      return false;
    } else if (note.children) {
      note.children = removeFileRecursively(note.children, id);
    }
    return true;
  });
}
