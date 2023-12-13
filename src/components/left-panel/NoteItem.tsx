import { useClickOutside, useHotkeys } from "@mantine/hooks";
import { useRichTextEditorContext } from "@mantine/tiptap";
import * as fs from "@tauri-apps/api/fs";
import { Suspense, lazy, useReducer } from "react";
import { useTranslation } from "react-i18next";
import {
  handleClose,
  handleDelete,
  handleRename,
  loadFiles,
} from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { FileObj, itemStateType } from "../../types";

const LazyNoteMenu = lazy(() => import("./NoteMenu"));

export function NoteItem({
  item,
  menuItemStyles,
  contextMenuStyles,
}: {
  item: FileObj;
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
  const menuRef = useClickOutside(() => updateItemState({ context: false }));
  const renameFormRef = useClickOutside(() =>
    updateItemState({ toRename: false })
  );

  const [itemState, updateItemState] = useReducer(
    (prev: itemStateType, next: itemStateType) => {
      const newState = { ...prev, ...next };

      if (newState.itemName) {
        if (newState.itemName.length < 2) {
          setStatus(t("ErrorNameLength"));
          newState.itemName = currentNote?.name;
        }

        if (newState.itemName!.length > 21) {
          setStatus(t("ErrorNameLength"));
          newState.itemName = newState.itemName!.slice(0, 21);
        }

        const specialCharacters = ["\\", "/", ":", "*", "?", "<", ">", "|"];
        const containsSpecialCharacter = new RegExp(
          `[${specialCharacters.join("\\")}]`
        ).test(newState.itemName!);

        if (containsSpecialCharacter) {
          setStatus(t("ErrorNameChars"));
          newState.itemName = currentNote?.name;
        }
      }

      return newState;
    },
    {
      itemName: item.name,
      toRename: false,
      context: false,
      xYPosistion: { x: 0, y: 0 },
    }
  );

  const showMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    updateItemState({ context: false });

    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };

    updateItemState({ xYPosistion: positionChange });
    updateItemState({ context: true });
  };

  const isEdited: boolean =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;

  const handleOpen = async () => {
    if (currentNote?.id === item.id) return;

    updateItemState({ context: false });

    if (isEdited) {
      const confirm = await window.confirm(t("ConfirmDiscardChanges"));
      if (!confirm) return;
    }

    const content = await fs.readTextFile(item.path);

    setCurrentNote({
      id: item.id,
      name: itemState.itemName!,
      path: item.path,
      content,
    });

    setShowNewItemForm(null);
  };

  useHotkeys(
    [
      [
        "f2",
        () =>
          currentNote?.id === item.id
            ? updateItemState({ toRename: true })
            : null,
      ],
    ],
    undefined,
    true
  );

  return (
    <>
      <main
        className="pl-1.5 w-full"
        onClick={itemState.toRename ? () => null : handleOpen}
        onContextMenu={showMenu}
      >
        <section className="flex items-center justify-between">
          {itemState.toRename ? (
            <form
              onSubmit={async (event) => {
                await handleRename(
                  "note",
                  event,
                  t,
                  item.name,
                  itemState.itemName!,
                  item.path,
                  (value) => updateItemState({ toRename: value }),
                  setStatus,
                  currentNote,
                  setCurrentNote
                );
                await loadFiles(appFolder, setItems);
              }}
              ref={renameFormRef}
            >
              <input
                type="text"
                value={itemState.itemName}
                onChange={(e) => updateItemState({ itemName: e.target.value })}
                onKeyUp={(e) =>
                  e.key === "Escape" && updateItemState({ toRename: false })
                }
                className="outline-none w-full"
                autoFocus
              />
              <button className="hidden" />
            </form>
          ) : (
            <p className="overlook" data-text={item.name.split(".")[0]} />
          )}
        </section>
      </main>

      {currentNote?.id === item.id && itemState.context ? (
        <div
          style={{
            top: itemState.xYPosistion?.y,
            left: itemState.xYPosistion?.x,
          }}
          className={contextMenuStyles}
          ref={menuRef}
        >
          <Suspense>
            <LazyNoteMenu
              menuItemStyles={menuItemStyles}
              updateItemState={updateItemState}
              handleClose={async () =>
                await handleClose(t, isEdited, setCurrentNote, editor)
              }
              handleDelete={async () => {
                await handleDelete(
                  null,
                  "note",
                  setStatus,
                  item.path,
                  t,
                  setCurrentNote,
                  editor!
                );
                await loadFiles(appFolder, setItems);
              }}
            />
          </Suspense>
        </div>
      ) : null}
    </>
  );
}
