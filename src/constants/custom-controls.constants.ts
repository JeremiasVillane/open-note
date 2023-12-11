import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { handleSave } from "../helpers";
import { Note } from "../types";

/**
 * Generates the custom controls for the editor.
 *
 * @param {TFunction<"translation", undefined>} t - The translation function.
 * @param {Editor} editor - The editor instance.
 * @param {Object} store - The store object.
 * @param {Note | null} store.currentNote - The current note.
 * @param {(note: Note | null) => void} store.setCurrentNote - A function to set the current note.
 * @param {(status: string | null) => void} store.setStatus - A function to update the status bar message.
 * @param {(value: "note" | "folder") => void} store.setShowNewItemForm - A function to show the form to create a new item.
 * @return {Array} An array of custom controls for the editor.
 */
export const customControls = (
  t: TFunction<"translation", undefined>,
  editor: Editor,
  store: {
    currentNote: Note | null;
    setCurrentNote: (note: Note | null) => void;
    setStatus: (status: string | null) => void;
    setShowNewItemForm: (value: "note" | "folder") => void;
  }
) => [
  [
    {
      icon: "save-3-line",
      onClick: () => handleSave(t, editor, store),
      title: t("Save"),
    },
    {
      icon: "arrow-go-back-line",
      onClick: () => editor?.commands.undo(),
      title: t("Undo"),
    },
    {
      icon: "arrow-go-forward-line",
      onClick: () => editor?.commands.redo(),
      title: t("Redo"),
    },
  ],
];
