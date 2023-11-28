import { FileObj } from "../types";

export function removeNoteRecursively(fileList: FileObj[], id: string) {
  return fileList.filter((note) => {
    if (note.id === id) {
      return false;
    } else if (note.children) {
      note.children = removeNoteRecursively(note.children, id);
    }
    return true;
  });
}
