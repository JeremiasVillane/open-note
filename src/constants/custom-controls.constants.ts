import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { handleSave } from "../helpers";
import { Note } from "../types";

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
