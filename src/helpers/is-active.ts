import { Editor } from "@tiptap/react";

export function isActive(type: string, editor: Editor, options?: any) {
  return editor.isActive(type, options ?? {}) ? "text-violet-600" : "";
}
