import { useRichTextEditorContext } from "@mantine/tiptap";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileMenu } from "..";
import { handleDelete, handleRename } from "../../helpers";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";

export function NoteItem({
  item,
  menuItemStyles,
}: {
  item: FileObj;
  menuItemStyles: string;
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
  const [fileName, setFileName] = useState(item.name);

  const isEdited: boolean =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;

  const hadleOpen = async () => {
    if (currentNote?.id === item.id) return;

    if (isEdited) {
      const confirm = await window.confirm(t("ConfirmDiscardChanges"));
      if (!confirm) return;
    }

    setCurrentNote({
      id: item.id,
      name: fileName,
      content: item.content,
      parent: item.parent,
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
            onSubmit={(event) =>
              handleRename(
                "note",
                event,
                t,
                item.id,
                item.name,
                fileName,
                parent,
                "currentPath",
                () => null,
                setToRename,
                setFileName,
                setStatus,
                renameItem,
                currentNote,
                setCurrentNote
              )
            }
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
          <p className="overlook" data-text={item.name.split(".")[0]} />
        )}

        {currentNote?.id === item.id ? (
          <FileMenu
            menuItemStyles={menuItemStyles}
            setToRename={setToRename}
            handleClose={handleClose}
            handleDelete={() =>
              handleDelete(
                null,
                "note",
                setStatus,
                removeItem,
                "currentPath",
                item.id,
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
