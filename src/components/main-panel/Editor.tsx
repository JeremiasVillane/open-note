import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { useEffect } from "react";
import { useNotesStore } from "@/store/notesStore";

/**
 * Renders the Editor component and updates it whenever its content changes.
 *
 * @returns {React.ReactElement} The rendered Editor component.
 */
export default function Editor(): React.ReactElement {
  const { editor } = useRichTextEditorContext();
  const { currentNote } = useNotesStore();

  useEffect(() => {
    if (!currentNote || !editor || editor.isDestroyed) {
      return;
    }

    queueMicrotask(() => {
      editor?.chain().setContent(currentNote?.content).run();
    });
  }, [currentNote, editor]);

  return (
    <RichTextEditor
      className="mt-6 overflow-auto border-none"
      style={{
        height:
          "calc(100vh - (var(--titlebar-height) + var(--header-height) + var(--footer-height)))",
      }}
      editor={editor}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
