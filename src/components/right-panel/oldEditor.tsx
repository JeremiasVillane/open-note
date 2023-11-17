import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import {
  LinkBubbleMenu,
  RichTextEditor,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNotesStore } from "../../store/notesStore";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";

export default function oldEditor({
  togglePaletteMode,
}: {
  togglePaletteMode: () => void;
}): JSX.Element {
  const { currentNote, setCurrentNote, saved, setSaved } = useNotesStore();
  const [text, setText] = useState<string>("");
  const rteRef = useRef<RichTextEditorRef>(null);
  const editor = rteRef.current?.editor;
  const extensions = useExtensions({
    placeholder: "Start typing...",
  });

  useEffect(() => {
    setText(currentNote?.content ?? "");
  }, [currentNote]);

  useEffect(() => {
    if (!currentNote || !editor || editor.isDestroyed) {
      return;
    }

    if (!editor.isFocused || !editor.isEditable) {
      setText(currentNote?.content ?? "");

      queueMicrotask(() => {
        const currentSelection = editor?.state.selection;
        editor
          ?.chain()
          .setContent(currentNote?.content)
          .setTextSelection(currentSelection!)
          .run();
      });
    }
  }, [text, editor, editor?.isEditable, editor?.isFocused, currentNote]);

  const handleSave = async () => {
    const documentPath = await documentDir();
    const filePath = await join(
      documentPath,
      "open-note",
      `${currentNote?.name}.html`
    );

    await writeTextFile(filePath, editor?.getHTML() ?? "");

    setSaved(true);

    setCurrentNote({
      ...currentNote,
      name: currentNote?.name ?? "",
      content: text,
    });

    toast.success("Note saved", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <RichTextEditor
      className="flex-1"
      ref={rteRef}
      extensions={extensions}
      content={currentNote?.content ?? ""}
      RichTextFieldProps={{
        variant: "standard",
      }}
      editable={true}
      renderControls={() => (
        <EditorMenuControls
          togglePaletteMode={togglePaletteMode}
          handleSave={handleSave}
          saved={saved}
        />
      )}
      onCreate={() => {
        const content = editor?.getHTML() ?? "";
        setText(content);
        setSaved(true);
      }}
      onUpdate={() => {
        const content = editor?.getHTML() ?? "";
        setText(content);
        setSaved(false);

        setCurrentNote({
          ...currentNote,
          name: currentNote?.name ?? "",
          content,
        });
      }}
    >
      {() => (
        <>
          <LinkBubbleMenu />
          <TableBubbleMenu />
        </>
      )}
    </RichTextEditor>
  );
}
