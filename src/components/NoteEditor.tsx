// import { Button } from "@mui/material";
import { Save } from "@mui/icons-material";
import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButton,
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

  const handleSave = async () => {
    const documentPath = await documentDir();

    await writeTextFile(
      `${documentPath}/open-note/${currentNote?.name}.txt`,
      editor?.getHTML() ?? ""
    );
  };

  return (
    <>
      {currentNote ? (
        <div className="flex flex-col h-screen overflow-y-auto">
          <RichTextEditor
            className="bg-stone-900 flex-1"
            autofocus
            ref={rteRef}
            extensions={[StarterKit]}
            content={currentNote.content ?? ""}
            editable={true}
            renderControls={() => (
              <MenuControlsContainer>
                <MenuButton
                  value="save"
                  tooltipLabel="Save note"
                  size="small"
                  onClick={handleSave}
                  // selected={saved}
                  IconComponent={Save}
                />
                <MenuDivider />
                <MenuSelectHeading />
                <MenuDivider />
                <MenuButtonBold />
                <MenuButtonItalic />
                <MenuDivider />
                <MenuButtonUndo />
                <MenuButtonRedo />
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
        <div className="absolute my-0 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Select a note to edit
        </div>
      )}
    </>
  );
}
