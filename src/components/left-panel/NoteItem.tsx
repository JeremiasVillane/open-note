import { useRichTextEditorContext } from "@mantine/tiptap";
import * as fs from "@tauri-apps/api/fs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileMenu } from "..";
import { handleDelete, handleRename, loadFiles } from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";

export function NoteItem({
  noteName,
  noteId,
  path,
  menuItemStyles,
}: {
  noteName: string;
  noteId: string;
  path: string;
  menuItemStyles: string;
}): JSX.Element {
  const { t } = useTranslation();
  const { appFolder } = useTauriContext();
  const { editor } = useRichTextEditorContext();
  const {
    currentNote,
    setCurrentNote,
    setItems,
    setStatus,
    setShowNewItemForm,
  } = useNotesStore();
  const [toRename, setToRename] = useState(false);
  const [fileName, setFileName] = useState(noteName);
  const [currentPath] = useState(path);

  const isEdited: boolean =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;

  const hadleOpen = async () => {
    if (currentNote?.id === noteId) return;

    if (isEdited) {
      const confirm = await window.confirm(t("ConfirmDiscardChanges"));
      if (!confirm) return;
    }

    const content = await fs.readTextFile(currentPath);

    setCurrentNote({
      id: noteId,
      name: fileName,
      path: currentPath,
      content,
    });

    setShowNewItemForm(null);
  };

  const handleClose = async () => {
    if (isEdited) {
      const confirm = await window.confirm(t("ConfirmDiscardChanges"));
      if (!confirm) return;
    }

    setCurrentNote(null);
    editor?.chain().clearContent().run();
  };

  return (
    <div className="pl-1.5 w-full" onClick={toRename ? () => null : hadleOpen}>
      <div className="flex items-center justify-between">
        {toRename ? (
          <form
            onSubmit={async (event) => {
              await handleRename(
                "note",
                event,
                t,
                noteName,
                fileName,
                currentPath,
                setToRename,
                setStatus,
                currentNote,
                setCurrentNote
              );
              loadFiles(appFolder, setItems);
            }}
          >
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onKeyUp={(e) => e.key === "Escape" && setToRename(false)}
              className="outline-none w-full"
              autoFocus
            />
            <button className="hidden" />
          </form>
        ) : (
          <p className="overlook" data-text={noteName.split(".")[0]} />
        )}

        {currentNote?.id === noteId ? (
          <FileMenu
            menuItemStyles={menuItemStyles}
            setToRename={setToRename}
            handleClose={handleClose}
            handleDelete={async () => {
              await handleDelete(
                null,
                "note",
                setStatus,
                currentPath,
                t,
                setCurrentNote,
                editor!
              );
              loadFiles(appFolder, setItems);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
