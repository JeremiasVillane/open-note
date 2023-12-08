import { invoke } from "@tauri-apps/api/tauri";
import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { Note } from "../types";

export const handleDelete = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  itemType: string,
  setStatus: (status: string | null) => void,
  path: string,
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

  try {
    await invoke("delete_item", { path, isFolder });

    if (!isFolder) {
      setCurrentNote!(null);
      editor?.chain().clearContent().run();
    }

    setStatus(t(isFolder ? "FolderDeleted" : "NoteDeleted"));
  } catch (error) {
    console.error("Failed to delete item:", error);
    setStatus(t("DeleteFailed"));
  }
};
