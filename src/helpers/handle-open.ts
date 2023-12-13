import { TFunction } from "i18next";
import { Note } from "../types";
import { FsOptions } from "@tauri-apps/api/fs";

export const handleOpen = async (
  fileName: string,
  noteId: string,
  path: string,
  t: TFunction,
  currentNote: Note | null,
  setCurrentNote: (note: Note | null) => void,
  setShowNewItemForm: (value: "note" | "folder" | null) => void,
  readTextFile: (
    filePath: string,
    options?: FsOptions | undefined
  ) => Promise<string>,
  isEdited: boolean,
  setContext: React.Dispatch<boolean>
) => {
  if (currentNote?.id === noteId) return;
  
  setContext(false);
  
  if (isEdited) {
    const confirm = await window.confirm(t("ConfirmDiscardChanges"));
    if (!confirm) return;
  }

  const content = await readTextFile(path);

  setCurrentNote({
    id: noteId,
    name: fileName,
    path,
    content,
  });

  setShowNewItemForm(null);
};
