import { useRichTextEditorContext } from "@mantine/tiptap";
import * as fs from "@tauri-apps/api/fs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  handleClose,
  handleDelete,
  handleRename,
  loadFiles,
} from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import NoteMenu from "./NoteMenu";
import { useClickOutside, useHotkeys } from "@mantine/hooks";

export function NoteItem({
  noteName,
  noteId,
  path,
  menuItemStyles,
  contextMenuStyles,
}: {
  noteName: string;
  noteId: string;
  path: string;
  menuItemStyles: string;
  contextMenuStyles: string;
}): JSX.Element {
  const { t } = useTranslation();
  const {
    currentNote,
    setCurrentNote,
    setItems,
    setStatus,
    setShowNewItemForm,
  } = useNotesStore();
  const { appFolder } = useTauriContext();
  const { editor } = useRichTextEditorContext();
  const [toRename, setToRename] = useState(false);
  const [fileName, setFileName] = useState(noteName);
  const [context, setContext] = useState(false);
  const [xYPosistion, setXyPosistion] = useState({ x: 0, y: 0 });
  const ref = useClickOutside(() => setContext(false));

  const showNav = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setContext(false);

    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };

    setXyPosistion(positionChange);
    setContext(true);
  };

  const isEdited: boolean =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;

  const hadleOpen = async () => {
    if (currentNote?.id === noteId) return;

    setContext(false);

    if (isEdited) {
      const confirm = await window.confirm(t("ConfirmDiscardChanges"));
      if (!confirm) return;
    }

    const content = await fs.readTextFile(path);

    setCurrentNote({
      id: noteId,
      name: fileName,
      path,
      content,
    });

    setShowNewItemForm(null);
  };

  useHotkeys(
    [["f2", () => (currentNote?.id === noteId ? setToRename(true) : null)]],
    undefined,
    true
  );

  return (
    <>
      <div
        className="pl-1.5 w-full"
        onClick={toRename ? () => null : hadleOpen}
        onContextMenu={showNav}
      >
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
                  path,
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
        </div>
      </div>

      {currentNote?.id === noteId && context ? (
        <div
          style={{ top: xYPosistion.y, left: xYPosistion.x }}
          className={contextMenuStyles}
          ref={ref}
        >
          <NoteMenu
            menuItemStyles={menuItemStyles}
            setToRename={setToRename}
            setContext={setContext}
            handleClose={async () =>
              await handleClose(t, isEdited, setCurrentNote, editor)
            }
            handleDelete={async () => {
              await handleDelete(
                null,
                "note",
                setStatus,
                path,
                t,
                setCurrentNote,
                editor!
              );
              loadFiles(appFolder, setItems);
            }}
          />
        </div>
      ) : null}
    </>
  );
}
