import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { APP_NAME } from "../constants";
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
  const documentPath = await documentDir();
  const filePath = await join(documentPath, APP_NAME, `${currentNote?.name}`);

  if (currentNote?.name) {
    await writeTextFile(filePath, editor.getHTML());

    setCurrentNote({
      ...currentNote,
      name: currentNote.name,
      content: editor.getHTML(),
    });

    setStatus(t("NoteSaved"));
    setTimeout(() => {
      setStatus(null);
    }, 2000);
  } else null;
};
