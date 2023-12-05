import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Explorer, FolderMenu, NewItemForm } from "..";
import { handleRename } from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";
import { getChildren } from "../../utils/get-children";

export function FolderItem({
  item,
  newItem,
  setNewItem,
  openFolder,
  handleOpenFolder,
  fileStyles,
  menuItemStyles,
}: {
  item: FileObj;
  newItem: Record<string, string>;
  setNewItem: Dispatch<SetStateAction<Record<string, string>>>;
  openFolder: Record<string, boolean>;
  handleOpenFolder: (folderId: string) => void;
  fileStyles: string;
  menuItemStyles: string;
}) {
  const { t } = useTranslation();
  const { renameItem, setStatus, setItems } = useNotesStore();
  const [toRename, setToRename] = useState(false);
  const [folderName, setFolderName] = useState(item.name);
  const [children, setChildren] = useState<FileObj[]>([]);
  const { appDocuments } = useTauriContext();

  useLayoutEffect(() => {
    const loadFolderContent = async () => {
      return await getChildren(item.children!);
    };

    (async () => {
      const loadedChildren = await loadFolderContent();
      setChildren(loadedChildren);
    })();
  }, [item.children]);

  return (
    <>
      <div
        className={`${fileStyles} group/item justify-between items-center relative`}
        onClick={() => handleOpenFolder(item.id)}
      >
        <div className="flex">
          <i
            className={`${
              openFolder[item.id] ? "ri-folder-open-fill" : "ri-folder-fill"
            } text-yellow-500`}
          ></i>
          {toRename ? (
            <form
              className="pl-1.5 font-semibold"
              onSubmit={(event) =>
                handleRename(
                  "folder",
                  event,
                  t,
                  item.id,
                  item.name,
                  folderName,
                  item.path,
                  currentPath,
                  setCurrentPath,
                  setToRename,
                  setFolderName,
                  setStatus,
                  renameItem,
                  undefined,
                  undefined,
                  setFolderName
                )
              }
            >
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onKeyUp={(e) => e.key === "Escape" && setToRename(false)}
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

        <div className="invisible group-hover/item:visible">
          <FolderMenu
            menuItemStyles={menuItemStyles}
            folder={item}
            setNewItem={setNewItem}
            setToRename={setToRename}
          />
        </div>
      </div>

      <div
        className={`ml-5 group-hover/panel:border-l group-hover/panel:ml-[1.19rem] ${
          !openFolder[item.id] && "hidden"
        }`}
      >
        {newItem[item.id] ? (
          <NewItemForm
            itemType={newItem[item.id]}
            path={currentPath}
            parentId={item.id}
            setNewItem={setNewItem}
          />
        ) : null}
        <Explorer fileList={children!} currentParent={item.id} />
      </div>
    </>
  );
}
