import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Explorer, FolderMenu, NewItemForm } from "..";
import { handleRename, loadFiles } from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";

export function FolderItem({
  item,
  newItem,
  setNewItem,
  fileStyles,
  menuItemStyles,
}: {
  item: FileObj;
  newItem: Record<string, string>;
  setNewItem: Dispatch<SetStateAction<Record<string, string>>>;
  fileStyles: string;
  menuItemStyles: string;
}) {
  const { t } = useTranslation();
  const { setStatus, setItems, openFolders, setOpenFolder } = useNotesStore();
  const [toRename, setToRename] = useState(false);
  const [folderName, setFolderName] = useState(item.name);
  const { appFolder } = useTauriContext();

  return (
    <>
      <div
        className={`${fileStyles} group/item justify-between items-center relative`}
        onClick={() => setOpenFolder(item.id)}
      >
        <div className="flex">
          <i
            className={`${
              openFolders[item.id] ? "ri-folder-open-fill" : "ri-folder-fill"
            } text-yellow-500`}
          ></i>
          {toRename ? (
            <form
              className="pl-1.5 font-semibold"
              onSubmit={async (event) => {
                await handleRename(
                  "folder",
                  event,
                  t,
                  item.name,
                  folderName,
                  item.path,
                  setToRename,
                  setStatus,
                  undefined,
                  undefined,
                  setFolderName
                );
                loadFiles(appFolder, setItems);
              }}
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
    </>
  );
}
