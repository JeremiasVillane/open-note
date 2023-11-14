import { Close, Save } from "@mui/icons-material";
import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import StarterKit from "@tiptap/starter-kit";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
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
import { type PaletteMode } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNotesStore } from "../store/notesStore";

export function NoteEditor({
  theme,
}: {
  theme: {
    mode: PaletteMode;
    toggle: () => void;
  };
}) {
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

    await writeTextFile(filePath, text ?? "");

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
              <MenuControlsContainer className="flex justify-between items-center">
                <div
                  id="menu-controls"
                  className="flex justify-center items-center"
                >
                  <MenuButton
                    value="save"
                    tooltipLabel="Save note"
                    size="small"
                    onClick={handleSave}
                    disabled={saved || text === currentNote?.content}
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
                <div id="menu-actions">
                  <MenuButton
                    value="toggle-dark-mode"
                    tooltipLabel="Toggle dark/light mode"
                    size="small"
                    onClick={theme.toggle}
                    IconComponent={
                      theme.mode === "dark" ? Brightness7Icon : Brightness4Icon
                    }
                  />
                  <MenuButton
                    value="close"
                    tooltipLabel="Close note"
                    size="small"
                    onClick={handleClose}
                    IconComponent={Close}
                  />
                </div>
              </MenuControlsContainer>
            )}
            onUpdate={() => {
              const content = editor?.getHTML() || text;
              setText(content);
              setSaved(false);
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
