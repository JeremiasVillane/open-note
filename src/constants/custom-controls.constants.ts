import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { Dispatch, SetStateAction } from "react";
import { getFocus, handleSave } from "../helpers";

export const customControls = (
  t: TFunction<"translation", undefined>,
  editor: Editor,
  store: {
    currentNote: Note | null;
    setCurrentNote: (note: Note | null) => void;
    setStatus: (status: string | null) => void;
    setShowNoteForm: (value: boolean) => void;
    setLeftPanelIsOpened: Dispatch<SetStateAction<boolean>>;
  }
) => [
  [
    {
      icon: "file-add-line",
      onClick: () => {
        store.setLeftPanelIsOpened(false);
        store.setShowNoteForm(true);
      },
      title: t("New note"),
    },
    {
      icon: "save-3-line",
      onClick: () => handleSave(t, editor, store),
      title: t("Save"),
    },
    {
      icon: "arrow-go-back-line",
      onClick: () => getFocus(editor).undo().run(),
      title: t("Undo"),
    },
    {
      icon: "arrow-go-forward-line",
      onClick: () => getFocus(editor).redo().run(),
      title: t("Redo"),
    },
  ],
];
