import * as fs from "@tauri-apps/api/fs";
import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { Note } from "../types";

export const handleDelete = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  itemType: string,
  setStatus: (status: string | null) => void,
  removeItem: (id: string) => void,
  path: string,
  itemId: string,
  t: TFunction<"translation", undefined>,
  setCurrentNote?: (note: Note | null) => void,
  editor?: Editor
) => {
  e && e.stopPropagation();

  const isFolder = itemType === "folder";
  const confirm = await window.confirm(
    t(isFolder ? "ConfirmDeleteFolder" : "ConfirmDeleteNote")
  );
  if (!confirm) return;

  isFolder
    ? await fs.removeDir(path, { recursive: true })
    : await fs.removeFile(path);

  removeItem(itemId);

  if (!isFolder) {
    setCurrentNote!(null);
    editor?.chain().clearContent().run();
  }

  setStatus(t(isFolder ? "FolderDeleted" : "NoteDeleted"));
  setTimeout(() => {
    setStatus(null);
  }, 2000);
};
