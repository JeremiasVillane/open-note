import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { FileObj, Note } from "../types";
import { documentDir } from "@tauri-apps/api/path";
import { APP_NAME } from "../constants";

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
  const _documents = await documentDir();

  if (currentNote?.name) {
    const path = `${_documents}${APP_NAME}\\${currentNote.name}`
    let fileContent = await readTextFile(path);
    const fileJSON: FileObj = JSON.parse(fileContent)
    fileJSON.content = editor.getHTML();
    fileContent = JSON.stringify(fileJSON);

    await writeTextFile(path, fileContent);

    setCurrentNote({
      ...currentNote,
      name: currentNote.name,
      content: fileJSON.content,
    });

    setStatus(t("NoteSaved"));
  } else null;
};
