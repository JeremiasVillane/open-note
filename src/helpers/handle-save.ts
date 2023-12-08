import { invoke } from "@tauri-apps/api/tauri";
import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { Note } from "../types";

export const handleSave = async (
  t: TFunction<"translation", undefined>,
  editor: Editor,
  store: {
    currentNote: Note | null;
    setCurrentNote: (note: Note | null) => void;
    setStatus: (status: string | null) => void;
  }
) => {
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
