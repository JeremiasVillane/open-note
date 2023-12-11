import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { useEffect } from "react";
import { useNotesStore } from "../../store/notesStore";

/**
 * Renders the Editor component and updates it whenever its content changes.
 *
 * @returns {JSX.Element} The rendered Editor component.
 */
export default function Editor(): JSX.Element {
  const { editor } = useRichTextEditorContext();
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
      className="h-[calc(100vh-6.7rem)] mt-6 overflow-auto border-none"
      editor={editor}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
