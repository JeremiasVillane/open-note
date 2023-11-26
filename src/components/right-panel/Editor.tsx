import { RichTextEditor } from "@mantine/tiptap";
import { Editor as EditorTipTap } from "@tiptap/react";
import { useEffect } from "react";
import { useNotesStore } from "../../store/notesStore";

export default function Editor({ editor }: { editor: EditorTipTap }) {
  const { currentNote } = useNotesStore();

  useEffect(() => {
    if (!currentNote || !editor || editor.isDestroyed) {
      return;
    }

    if (!editor.isFocused || !editor.isEditable) {
      queueMicrotask(() => {
        const currentSelection = editor?.state.selection;
        editor
          ?.chain()
          .setContent(currentNote?.content)
          .setTextSelection(currentSelection!)
          .run();
      });
    }
  }, [currentNote]);

  return (
    <RichTextEditor
      className="h-[calc(100vh-6.7rem)] mt-6 overflow-auto"
      editor={editor}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
