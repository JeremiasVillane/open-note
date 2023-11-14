import { useTheme } from "@mui/material";
import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor, type RichTextEditorRef } from "mui-tiptap";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNotesStore } from "../../store/notesStore";
import EditorMenuControls from "./EditorMenuControls";

export function NoteEditor({
  togglePaletteMode,
}: {
  togglePaletteMode: () => void;
}) {
  const theme = useTheme();
  const currentNote = useNotesStore((state) => state.currentNote);
  const [text, setText] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(true);
  const rteRef = useRef<RichTextEditorRef>(null);
  const editor = rteRef.current?.editor;

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
          .setContent(text)
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
      `${currentNote?.name}.txt`
    );

    await writeTextFile(filePath, editor?.getHTML() ?? "");

    setSaved(true);

    useNotesStore.getState().setCurrentNote({
      ...currentNote,
      name: currentNote?.name ?? "",
      content: editor?.getHTML() ?? "",
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

  const handleClose = async () => {
    if (!saved) {
      const confirm = await window.confirm(
        "Are you sure you want to discard your changes?"
      );
      if (!confirm) return;
    }

    useNotesStore.getState().setCurrentNote(null);
    setSaved(true);
  };

  return (
    <>
      {currentNote ? (
        <div className="flex flex-col h-screen overflow-y-auto">
          <RichTextEditor
            autofocus
            className="flex-1"
            ref={rteRef}
            extensions={[StarterKit]}
            content={currentNote.content ?? ""}
            RichTextFieldProps={{
              variant: "standard",
            }}
            editable={true}
            renderControls={() => (
              <EditorMenuControls
                togglePaletteMode={togglePaletteMode}
                handleSave={handleSave}
                handleClose={handleClose}
                saved={saved}
              />
            )}
            onUpdate={() => {
              const content = editor?.getHTML() || text;
              setText(content);
              setSaved(false);

              useNotesStore.getState().setCurrentNote({
                ...currentNote,
                content,
              });
            }}
          />
        </div>
      ) : (
        <div className="absolute my-0 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Select a note to edit
        </div>
      )}
    </>
  );
}
