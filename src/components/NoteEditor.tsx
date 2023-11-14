import { Button } from "@mui/material";
import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useEffect, useRef, useState } from "react";
import { useNotesStore } from "../store/notesStore";

export function NoteEditor() {
  const currentNote = useNotesStore((state) => state.currentNote);
  const [text, setText] = useState<string>("");
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

  return (
    <>
      {currentNote ? (
        <div className="rounded-none p-0">
          <RichTextEditor
            className="h-screen"
            ref={rteRef}
            extensions={[StarterKit]}
            content={currentNote.content ?? ""}
            editable={true}
            renderControls={() => (
              <MenuControlsContainer>
                <MenuSelectHeading />
                <MenuDivider />
                <MenuButtonBold />
                <MenuButtonItalic />
                <MenuDivider />
                <MenuButtonUndo />
                <MenuButtonRedo />
                <Button
                  variant="contained"
                  style={{
                    marginLeft: "auto",
                    fontSize: "12px",
                    padding: "4px 8px",
                  }}
                  onClick={async () => {
                    const documentPath = await documentDir();

                    await writeTextFile(
                      `${documentPath}/open-note/${currentNote.name}.txt`,
                      editor?.getHTML() ?? ""
                    );
                  }}
                >
                  Save
                </Button>
              </MenuControlsContainer>
            )}
            onUpdate={() => {
              const content = editor?.getHTML() || text;
              setText(content);

              useNotesStore.getState().setCurrentNote({
                ...currentNote,
                content,
              });
            }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center inset-0">
          Select a note to edit
        </div>
      )}
    </>
  );
}
