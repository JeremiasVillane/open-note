import { invoke } from "@tauri-apps/api/tauri";
import { TFunction } from "i18next";
import { Note } from "@/types";

/**
 * Handles the rename action for a given item.
 *
 * @param {string} itemType - The type of the item being renamed ("note" | "folder").
 * @param {React.FormEvent<HTMLFormElement>} event - The form event triggered by the rename action.
 * @param {TFunction<"translation", undefined>} t - The translation function.
 * @param {string} oldName - The current name of the item.
 * @param {string} newName - The new name for the item.
 * @param {string} currentPath - The current path of the item.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setToRename - A function to set the renaming state.
 * @param {(status: string | null) => void} setStatus - A function to update the status bar message.
 * @param {Note | null | undefined} currentNote - The current note object.
 * @param {(note: Note | null) => void} setCurrentNote - A function to set the current note.
 * @param {React.Dispatch<React.SetStateAction<string>>} setItemName - A function to set the item name.
 */
export const handleRename = async (
  itemType: string,
  event: React.FormEvent<HTMLFormElement>,
  t: TFunction<"translation", undefined>,
  oldName: string,
  newName: string,
  currentPath: string,
  setToRename: React.Dispatch<boolean>,
  setStatus: (status: string | null) => void,
  setItemName: React.Dispatch<string>,
  currentNote?: Note | null,
  setCurrentNote?: (note: Note | null) => void
) => {
  event.preventDefault();

  if (newName.length < 3) {
    setItemName(oldName);
    setToRename(false);
    setStatus(t("ErrorNameLength"));
    return;
  }

  if (oldName === newName) {
    setToRename(false);
    return;
  }

  const newPath = `${currentPath
    .split("\\")
    .slice(0, -1)
    .join("\\")}\\${newName}`;

  if (itemType === "note") {
    setCurrentNote!({
      ...currentNote!,
      name: newName,
      path: newPath,
    });
  }

  if (itemType === "folder") {
    setItemName!(newName);
  }

  try {
    await invoke("rename_item", {
      oldPath: currentPath,
      newName: itemType === "folder" ? newName : `${newName}.on`,
    });
    setStatus(`${oldName} ${t("renamed to")} ${newName}`);
  } catch (error) {
    console.error("Failed to rename item:", error);
    setStatus(t("RenameFailed"));
  }

  setToRename(false);
};
