import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { RichTextEditor, type RichTextEditorRef } from "mui-tiptap";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNotesStore } from "../../store/notesStore";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";

export function NoteEditor({
  togglePaletteMode,
}: {
  togglePaletteMode: () => void;
}) {
  const currentNote = useNotesStore((state) => state.currentNote);
  const [text, setText] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(true);
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

    useNotesStore.getState().setCurrentNote({
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
  console.log(
    "text: ",
    text,
    "\ncurrentNote content: ",
    currentNote?.content,
    "\neditor: ",
    editor?.getHTML()
  );
  return (
    <>
      {currentNote ? (
        <div className="flex flex-col h-screen overflow-y-auto">
          <RichTextEditor
            className="flex-1"
            ref={rteRef}
            extensions={extensions}
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
            onCreate={() => {
              const content = editor?.getHTML() ?? "";
              setText(content);
              setSaved(true);
            }}
            onUpdate={() => {
              const content = editor?.getHTML() ?? "";
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
