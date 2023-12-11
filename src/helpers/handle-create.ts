import { invoke } from "@tauri-apps/api/tauri";
import { TFunction } from "i18next";

/**
 * Handles the creation of a file or directory at the specified path.
 *
 * @param {string} path - The path where the file or directory should be created.
 * @param {boolean} isFolder - Indicates whether the item to be created is a folder.
 * @param {function} setStatus - A function to update the status bar message.
 * @param {TFunction} t - A translation function to retrieve localized strings.
 * @return {void}
 */
export const handleCreate = async (
  path: string,
  isFolder: boolean,
  setStatus: (status: string | null) => void,
  t: TFunction<"translation", undefined>
): Promise<void> => {
  try {
    if (!isFolder) {
      await invoke("write_text_file", {
        path,
        content: "",
      });
    } else {
      await invoke("create_directory", { path });
    }

    setStatus(t(isFolder ? "FolderCreated" : "NoteCreated"));
  } catch (error) {
    console.error("Failed to create item:", error);
    setStatus(t("CreationFailed"));
  }
};
