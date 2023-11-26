import { Editor } from "@tiptap/react";

export function getFocus(editor: Editor) {
  return editor.chain().focus();
}
