import { useRichTextEditorContext } from "@mantine/tiptap";
import * as fs from "@tauri-apps/api/fs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileMenu } from "..";
import { handleDelete } from "../../helpers";
import { useNotesStore } from "../../store/notesStore";

export function NoteItem({
  noteName,
  noteId,
  path,
}: {
  noteName: string;
  noteId: string;
  path: string;
}): JSX.Element {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const {
    currentNote,
    setCurrentNote,
    removeItem,
    renameItem,
    setStatus,
    setShowNewItemForm,
  } = useNotesStore();
  const [toRename, setToRename] = useState(false);
  const [fileName, setFileName] = useState(noteName);
  const [currentPath, setCurrentPath] = useState(path);

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

  const handleRename = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (noteName === fileName) {
      setToRename(false);
      return;
    }

    const newPath = currentPath.replace(noteName, fileName);
    setCurrentPath(newPath);

    try {
      await fs.renameFile(currentPath, newPath);
    } catch (error) {
      setStatus(t("ErrorRenaming"));
      setFileName(noteName);
      setCurrentPath(path);
      return;
    }

    renameItem(noteId, fileName);
    setToRename(false);
  };

  return (
    <div className="pl-1.5 w-full" onClick={toRename ? () => null : hadleOpen}>
      <div className="flex items-center justify-between">
        {toRename ? (
          <form onSubmit={handleRename}>
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
          <h1>{noteName}</h1>
        )}

        {currentNote?.id === noteId ? (
          <FileMenu
            setToRename={setToRename}
            handleClose={handleClose}
            handleDelete={() =>
              handleDelete(
                null,
                "note",
                setStatus,
                removeItem,
                path,
                noteId,
                t,
                setCurrentNote,
                editor!
              )
            }
          />
        ) : null}
      </div>
    </div>
  );
}
