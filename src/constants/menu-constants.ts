import { Editor } from "@tiptap/react";
import { TFunction } from "i18next";
import { getFocus, handleSave, isActive } from "../helpers";

export const menuControls = (
  t: TFunction<"translation", undefined>,
  editor: Editor,
  store: {
    currentNote: Note | null;
    setCurrentNote: (note: Note | null) => void;
    setStatus: (status: string | null) => void;
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
      onClick: () => getFocus(editor).undo().run(),
      title: t("Undo"),
    },
    {
      icon: "arrow-go-forward-line",
      onClick: () => getFocus(editor).redo().run(),
      title: t("Redo"),
    },
  ],
  [
    {
      icon: "bold",
      onClick: () => getFocus(editor).toggleBold().run(),
      isActive: isActive("bold", editor),
      title: t("Bold"),
    },
    {
      icon: "italic",
      onClick: () => getFocus(editor).toggleItalic().run(),
      isActive: isActive("italic", editor),
      title: t("Italic"),
    },
    {
      icon: "underline",
      onClick: () => getFocus(editor).toggleUnderline().run(),
      isActive: isActive("underline", editor),
      title: t("Underline"),
    },
    {
      icon: "strikethrough",
      onClick: () => getFocus(editor).toggleStrike().run(),
      isActive: isActive("strike", editor),
      title: t("Strikethrough"),
    },
    {
      icon: "code-line",
      onClick: () => getFocus(editor).toggleCode().run(),
      isActive: isActive("code", editor),
      title: t("Code"),
    },
    {
      icon: "mark-pen-line",
      onClick: () => getFocus(editor).toggleHighlight().run(),
      isActive: isActive("highlight", editor),
      title: t("Highlight"),
    },
  ],
  [
    {
      icon: "h-1",
      onClick: () => getFocus(editor).toggleHeading({ level: 1 }).run(),
      isActive: isActive("heading", editor, { level: 1 }),
    },
    {
      icon: "h-2",
      onClick: () => getFocus(editor).toggleHeading({ level: 2 }).run(),
      isActive: isActive("heading", editor, { level: 2 }),
    },
    {
      icon: "h-3",
      onClick: () => getFocus(editor).toggleHeading({ level: 3 }).run(),
      isActive: isActive("heading", editor, { level: 3 }),
    },
    {
      icon: "h-4",
      onClick: () => getFocus(editor).toggleHeading({ level: 4 }).run(),
      isActive: isActive("heading", editor, { level: 4 }),
    },
  ],
  [
    {
      icon: "list-unordered",
      onClick: () => getFocus(editor).toggleBulletList().run(),
      isActive: isActive("bulletList", editor),
      title: t("List"),
    },
    {
      icon: "list-ordered",
      onClick: () => getFocus(editor).toggleOrderedList().run(),
      isActive: isActive("orderedList", editor),
      title: t("Ordered List"),
    },
    {
      icon: "subscript",
      onClick: () => getFocus(editor).toggleSubscript().run(),
      isActive: isActive("subscript", editor),
      title: t("Subscript"),
    },
    {
      icon: "superscript",
      onClick: () => getFocus(editor).toggleSuperscript().run(),
      isActive: isActive("superscript", editor),
      title: t("Superscript"),
    },
  ],
  [
    {
      icon: "code-box-line",
      onClick: () => getFocus(editor).toggleCodeBlock().run(),
      isActive: isActive("codeBlock", editor),
      title: t("Code Box"),
    },
    {
      icon: "double-quotes-l",
      onClick: () => getFocus(editor).toggleBlockquote().run(),
      isActive: isActive("blockquote", editor),
      title: t("Quote"),
    },
    {
      icon: "separator",
      onClick: () => getFocus(editor).setHorizontalRule().run(),
      title: t("Separator"),
    },
  ],
  [
    {
      icon: "align-left",
      onClick: () => getFocus(editor).setTextAlign("left").run(),
      title: t("Align Left"),
    },
    {
      icon: "align-center",
      onClick: () => getFocus(editor).setTextAlign("center").run(),
      title: t("Align Center"),
    },
    {
      icon: "align-justify",
      onClick: () => getFocus(editor).setTextAlign("justify").run(),
      title: t("Justify Text"),
    },
    {
      icon: "align-right",
      onClick: () => getFocus(editor).setTextAlign("right").run(),
      title: t("Align Right"),
    },
  ],
];
