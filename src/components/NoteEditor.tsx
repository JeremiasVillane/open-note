import { Close, Save } from "@mui/icons-material";
import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
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
import { toast } from "react-hot-toast";
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
    const filePath = await join(
      documentPath,
      "open-note",
      `${currentNote?.name}.txt`
    );

    await writeTextFile(filePath, editor?.getHTML() ?? "");

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
    <>
      {currentNote ? (
        <div className="flex flex-col h-screen overflow-y-auto">
          <RichTextEditor
            className="bg-stone-900 flex-1"
            ref={rteRef}
            extensions={[StarterKit]}
            content={currentNote.content ?? ""}
            editable={true}
            renderControls={() => (
              <MenuControlsContainer className="flex justify-between items-center">
                <div id="main-buttons" className="flex justify-center items-center">
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
                </div>
                <MenuButton
                  className="ml-auto"
                  value="close"
                  tooltipLabel="Close note"
                  size="small"
                  onClick={() => {
                    useNotesStore.getState().setCurrentNote(null);
                  }}
                  IconComponent={Close}
                />
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
