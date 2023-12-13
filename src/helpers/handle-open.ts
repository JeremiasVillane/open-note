import { TFunction } from "i18next";
import { Note } from "../types";
import { FsOptions } from "@tauri-apps/api/fs";
import { Editor } from "@tiptap/react";

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
  editor: Editor,
  setContext: React.Dispatch<boolean>
) => {
  if (currentNote?.id === noteId) return;
  
  setContext(false);

  const isEdited =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;
  
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
