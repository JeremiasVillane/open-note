import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { Note } from "../types";

/**
 * Handles the close event.
 *
 * @param {TFunction} t - The translation function.
 * @param {boolean} isEdited - Indicates if the note has been edited.
 * @param {(note: Note | null) => void} setCurrentNote - A function to set the current note.
 * @param {Editor | null} editor - The editor instance.
 * @return {void} No return value.
 */
export const handleClose = async (
  t: TFunction,
  isEdited: boolean,
  setCurrentNote: (note: Note | null) => void,
  editor: Editor | null
): Promise<void> => {
  if (isEdited) {
    const confirm = await window.confirm(t("ConfirmDiscardChanges"));
    if (!confirm) return;
  }

  setCurrentNote(null);
  editor?.chain().clearContent().run();
};
