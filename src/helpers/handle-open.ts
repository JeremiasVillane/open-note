import { FsOptions } from "@tauri-apps/api/fs";
import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { Note } from "../types";

/**
 * Handles the opening of a note.
 *
 * @param {string} fileName - The real-time updated name of the note.
 * @param {string} noteId - The ID of the note.
 * @param {string} path - The path of the note.
 * @param {TFunction} t - The translation function.
 * @param {Note | null} currentNote - The current note object.
 * @param {(note: Note | null) => void} setCurrentNote - The function to set the current note.
 * @param {(value: "note" | "folder" | null) => void} setShowNewItemForm - The function to show the file creation form.
 * @param {(filePath: string, options?: FsOptions | undefined) => Promise<string>} readTextFile - The function to read a text file.
 * @param {Editor} editor - The rich text editor.
 * @param {React.Dispatch<boolean>} setContext - The function to hide/show the context menu.
 * @return {void}
 */
export const handleOpen = async (
  fileName: string,
  noteId: string,
  path: string,
  t: TFunction,
  currentNote: Note | null,
  setCurrentNote: (note: Note | null) => void,
  setShowNewItemForm: (value: "note" | "folder" | null) => void,
  readTextFile: (
    filePath: string,
    options?: FsOptions | undefined
  ) => Promise<string>,
  editor: Editor,
  setContext: React.Dispatch<boolean>
): Promise<void> => {
  if (currentNote?.id === noteId) return;

  setContext(false);

  const isEdited =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;

  if (isEdited) {
    const confirm = await window.confirm(t("ConfirmDiscardChanges"));
    if (!confirm) return;
  }

  const content = await readTextFile(path);

  setCurrentNote({
    id: noteId,
    name: fileName,
    path,
    content,
  });

  setShowNewItemForm(null);
};
