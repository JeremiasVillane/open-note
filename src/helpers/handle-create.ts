import { invoke } from "@tauri-apps/api/tauri";
import { TFunction } from "i18next";

export const handleCreate = async (
  path: string,
  isFolder: boolean,
  setStatus: (status: string | null) => void,
  t: TFunction<"translation", undefined>
) => {
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
