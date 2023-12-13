import { useClickOutside } from "@mantine/hooks";
import { Dispatch, SetStateAction, Suspense, lazy, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { Explorer, NewItemForm } from "..";
import { handleRename, loadFiles } from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { FileObj, itemStateType } from "../../types";

const LazyFolderMenu = lazy(() => import("./FolderMenu"));

export function FolderItem({
  item,
  newItem,
  setNewItem,
  fileStyles,
  menuItemStyles,
  contextMenuStyles,
}: {
  item: FileObj;
  newItem: Record<string, string>;
  setNewItem: Dispatch<SetStateAction<Record<string, string>>>;
  fileStyles: string;
  menuItemStyles: string;
  contextMenuStyles: string;
}) {
  const { t } = useTranslation();
  const { setStatus, setItems, openFolders, setOpenFolder } = useNotesStore();
  const { appFolder } = useTauriContext();
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
          newState.itemName = item.name;
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
          newState.itemName = item.name;
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

  return (
    <>
      <div
        className={`${fileStyles} group/item justify-between items-center`}
        onClick={() => setOpenFolder(item.id)}
        onContextMenu={showMenu}
      >
        <div className="flex">
          <i
            className={`${
              openFolders[item.id] ? "ri-folder-open-fill" : "ri-folder-fill"
            } text-yellow-500`}
          ></i>

          {itemState.toRename ? (
            <form
              className="pl-1.5 font-semibold"
              onSubmit={async (event) => {
                await handleRename(
                  "folder",
                  event,
                  t,
                  item.name,
                  itemState.itemName!,
                  item.path,
                  (value) => updateItemState({ toRename: value }),
                  setStatus,
                  undefined,
                  undefined,
                  (value) => updateItemState({ itemName: value })
                );
                loadFiles(appFolder, setItems);
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
              className="overlook py-0 pb-0 pl-1.5 font-semibold"
              data-text={item.name}
            />
          )}
        </div>
      </div>

      <div
        className={`ml-5 group-hover/panel:border-l group-hover/panel:ml-[1.19rem] ${
          !openFolders[item.id] && "hidden"
        }`}
      >
        {newItem[item.id] ? (
          <NewItemForm
            itemType={newItem[item.id]}
            path={item.path}
            parentId={item.id}
            setNewItem={setNewItem}
          />
        ) : null}
        <Explorer fileList={item.children!} />
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
              setNewItem={setNewItem}
              updateItemState={updateItemState}
            />
          </Suspense>
        </div>
      ) : null}
    </>
  );
}
