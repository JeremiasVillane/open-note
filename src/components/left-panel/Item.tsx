import { useClickOutside, useHotkeys } from "@mantine/hooks";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { readTextFile } from "@tauri-apps/api/fs";
import { Dispatch, SetStateAction, Suspense, lazy, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { Explorer } from "..";
import {
  handleClose,
  handleDelete,
  handleOpen,
  handleRename,
  loadFiles,
} from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { useUiStore } from "../../store/uiStore";
import { FileObj, itemStateType } from "../../types";

const LazyNoteMenu = lazy(() => import("./NoteMenu"));
const LazyFolderMenu = lazy(() => import("./FolderMenu"));
const LazyNewItemForm = lazy(() => import("./NewItemForm"));

/**
 * Renders an item component.
 *
 * @prop {string} type - The type of the item ("note" or "folder").
 * @prop {FileObj} item - The item object.
 * @prop {string} menuItemStyles - The styles for the menu item.
 * @prop {string} contextMenuStyles - The styles for the context menu.
 * @prop {string} fileStyles - The styles for the file.
 * @prop {Record<string, string>} newItem - The new item object.
 * @prop {Dispatch<SetStateAction<Record<string, string>>>} setNewItem - The function to set the new item object.
 * @return {JSX.Element} The rendered item component.
 */
export function Item({
  type,
  item,
  menuItemStyles,
  contextMenuStyles,
  fileStyles,
  newItem,
  setNewItem,
  isResizing,
}: {
  type: "note" | "folder";
  item: FileObj;
  menuItemStyles: string;
  contextMenuStyles: string;
  fileStyles?: string;
  newItem?: Record<string, string>;
  setNewItem?: Dispatch<SetStateAction<Record<string, string>>>;
  isResizing?: boolean;
}): JSX.Element {
  const { t } = useTranslation();
  const {
    currentNote,
    setCurrentNote,
    setItems,
    setShowNewItemForm,
    openFolders,
    toggleOpenFolder,
  } = useNotesStore();
  const { setActiveModal, setStatus } = useUiStore();
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

  const isEdited =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;

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
        className={
          type === "note"
            ? "pl-1.5 w-full"
            : `${fileStyles} group/item justify-between items-center`
        }
        onClick={
          type === "note"
            ? itemState.toRename
              ? () => null
              : async () =>
                  await handleOpen(
                    item.name,
                    item.id,
                    item.path,
                    currentNote,
                    setCurrentNote,
                    setShowNewItemForm,
                    setActiveModal,
                    readTextFile,
                    editor!,
                    (value) => updateItemState({ context: value })
                  )
            : () => toggleOpenFolder(item.id)
        }
        onContextMenu={showMenu}
      >
        <section className="flex items-center justify-between">
          {type === "folder" ? (
            <i
              className={`${
                openFolders[item.id] ? "ri-folder-open-fill" : "ri-folder-fill"
              } text-yellow-500`}
            ></i>
          ) : null}

          {itemState.toRename ? (
            <form
              className={type === "folder" ? "pl-1.5 font-semibold" : ""}
              onSubmit={async (event) => {
                await handleRename(
                  type,
                  event,
                  t,
                  item.name,
                  itemState.itemName!,
                  item.path,
                  (value) => updateItemState({ toRename: value }),
                  setStatus,
                  type === "note" ? currentNote : undefined,
                  type === "note" ? setCurrentNote : undefined,
                  type === "folder"
                    ? (value) => updateItemState({ itemName: value })
                    : undefined
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
              <button onClick={(e) => e.stopPropagation()} className="hidden" />
            </form>
          ) : (
            <p
              className={`${
                type === "note"
                  ? "overlook"
                  : "overlook py-0 pb-0 pl-1.5 font-semibold"
              } whitespace-nowrap`}
              data-text={item.name.split(".")[0]}
            />
          )}
        </section>
      </main>

      {type === "note" ? (
        currentNote?.id === item.id && itemState.context ? (
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
                  await handleClose(
                    isEdited,
                    setCurrentNote,
                    editor,
                    setActiveModal
                  )
                }
                handleDelete={async () => {
                  await handleDelete(
                    null,
                    "note",
                    setStatus,
                    item.path,
                    t,
                    setActiveModal,
                    () => loadFiles(appFolder, setItems),
                    setCurrentNote,
                    editor!
                  );
                }}
              />
            </Suspense>
          </div>
        ) : null
      ) : (
        <>
          <div
            className={`ml-5 group-hover/panel:border-l group-hover/panel:ml-[1.19rem] ${
              !openFolders[item.id] && "hidden"
            }`}
          >
            {newItem![item.id] ? (
              <Suspense>
                <LazyNewItemForm
                  itemType={newItem![item.id]}
                  path={item.path}
                  parentId={item.id}
                  setNewItem={setNewItem}
                />
              </Suspense>
            ) : null}
            <Explorer fileList={item.children!} isResizing={isResizing!} />
          </div>

          {itemState.context ? (
            <div
              style={{
                top: itemState.xYPosistion?.y,
                left: itemState.xYPosistion?.x,
              }}
              className={contextMenuStyles}
              ref={menuRef}
            >
              <Suspense>
                <LazyFolderMenu
                  menuItemStyles={menuItemStyles}
                  folder={item}
                  setNewItem={setNewItem!}
                  updateItemState={updateItemState}
                />
              </Suspense>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
