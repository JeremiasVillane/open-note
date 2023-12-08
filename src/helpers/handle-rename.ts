import { invoke } from "@tauri-apps/api/tauri";
import { TFunction } from "i18next";
import { Note } from "../types";

export const handleRename = async (
  itemType: string,
  event: React.FormEvent<HTMLFormElement>,
  t: TFunction<"translation", undefined>,
  oldName: string,
  newName: string,
  currentPath: string,
  setToRename: React.Dispatch<React.SetStateAction<boolean>>,
  setStatus: (status: string | null) => void,
  currentNote?: Note | null,
  setCurrentNote?: (note: Note | null) => void,
  setFolderName?: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();

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
    setFolderName!(newName);
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
