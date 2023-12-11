import { invoke } from "@tauri-apps/api/tauri";
import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { Note } from "../types";

/**
 * Handles the delete action for an item.
 *
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent> | null} e - The mouse event that triggered the delete action.
 * @param {string} itemType - The type of item being deleted ("note" | "folder").
 * @param {(status: string | null) => void} setStatus - The function to update the status bar message.
 * @param {string} path - The path of the item being deleted.
 * @param {TFunction<"translation", undefined>} t - The translation function.
 * @param {(note: Note | null) => void} [setCurrentNote] - The function to update the current note.
 * @param {Editor} [editor] - The editor instance.
 */
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
