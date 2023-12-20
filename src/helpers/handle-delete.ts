import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { renderModal } from ".";
import { Note } from "../types";

/**
 * Handles the delete action for a given item.
 *
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent> | null} e - The mouse event that triggered the delete action, or null if called programmatically.
 * @param {string} itemType - The type of the item being deleted ("folder" or "note").
 * @param {(status: string | null) => void} setStatus - The function to set the status message.
 * @param {string} path - The path of the item being deleted.
 * @param {TFunction<"translation", undefined>} t - The translation function.
 * @param {(value: boolean) => void} setActiveModal - The function to set the active modal state.
 * @param {() => Promise<void>} loadFiles - The function to load the files after the delete action.
 * @param {(note: Note | null) => void} [setCurrentNote] - The function to set the current note.
 * @param {Editor} [editor] - The editor instance.
 */
export const handleDelete = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  itemType: string,
  setStatus: (status: string | null) => void,
  path: string,
  t: TFunction<"translation", undefined>,
  setActiveModal: (value: boolean) => void,
  loadFiles: () => Promise<void>,
  setCurrentNote?: (note: Note | null) => void,
  editor?: Editor
) => {
  e && e.stopPropagation();

  const isFolder = itemType === "folder";

  renderModal({
    label: `delete-${itemType}`,
    setActiveModal,
  });

  await listen("modal-cancel", () => {
    setActiveModal(false);
    return;
  });

  await listen("modal-ok", async () => {
    try {
      if (!isFolder) {
        setCurrentNote!(null);
        editor?.chain().clearContent().run();
      }

      await invoke("delete_item", { path, isFolder });

      setStatus(t(isFolder ? "FolderDeleted" : "NoteDeleted"));
      await loadFiles();
      setActiveModal(false);
    } catch (error) {
      console.error("Failed to delete item:", error);
      setStatus(t("DeleteFailed"));
    }
  });
  return;
};
