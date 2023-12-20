import { invoke } from "@tauri-apps/api/tauri";
import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { Note } from "../types";

/**
 * Saves the current note content to a file.
 *
 * @param {TFunction<"translation", undefined>} t - The translation function.
 * @param {Editor} editor - The editor instance.
 * @param {{ currentNote: Note | null; setCurrentNote: (note: Note | null) => void; setStatus: (status: string | null) => void; }} store - The store object containing the current note, setCurrentNote function, and setStatus function.
 * @return {Promise<void>} - A promise that resolves when the saving is complete.
 */
export const handleSave = async (
  t: TFunction<"translation", undefined>,
  editor: Editor,
  store: {
    currentNote: Note | null;
    setCurrentNote: (note: Note | null) => void;
    setStatus: (status: string | null) => void;
  }
): Promise<void> => {
  const { currentNote, setCurrentNote, setStatus } = store;

  if (currentNote?.name) {
    try {
      await invoke("write_text_file", {
        path: currentNote.path,
        content: editor.getHTML(),
      });

      setCurrentNote({
        ...currentNote,
        name: currentNote.name,
        path: currentNote.path,
        content: editor.getHTML(),
      });

      setStatus(t("NoteSaved"));
    } catch (error) {
      console.error("Failed to write text file:", error);
      setStatus(t("SaveFailed"));
    }
  } else null;
};
