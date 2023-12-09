import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { Note } from "../types";

export const handleClose = async (
  t: TFunction,
  isEdited: boolean,
  setCurrentNote: (note: Note | null) => void,
  editor: Editor | null
) => {
  if (isEdited) {
    const confirm = await window.confirm(t("ConfirmDiscardChanges"));
    if (!confirm) return;
  }

  setCurrentNote(null);
  editor?.chain().clearContent().run();
};
