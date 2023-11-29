import { useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { FolderMenu, NewItemForm, NoteItem } from "..";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";

export function FileList({ fileList }: { fileList: FileObj[] }): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const { currentNote } = useNotesStore();
  const [openFolder, setOpenFolder] = useState<Record<string, boolean>>({});
  const [newItem, setNewItem] = useState<Record<string, string>>({});

  const fileStyles = `itemStyles ${
    colorScheme === "dark" ? "hover:bg-gray-700" : "hover:bg-slate-100"
  }`;

  const handleOpenFolder = (folderId: string) => {
    setOpenFolder({
      ...openFolder,
      [folderId]: openFolder[folderId] ? false : true,
    });
  };

  return (
    <aside>
      {fileList?.map((item) =>
        item.isFolder ? (
          <section key={item.id}>
            <div
              className={`${fileStyles} group justify-between items-center relative`}
              onClick={() => handleOpenFolder(item.id)}
            >
              <div className="flex">
                <i
                  className={`${
                    openFolder[item.id]
                      ? "ri-folder-open-fill"
                      : "ri-folder-fill"
                  } text-yellow-500`}
                ></i>

                <div className="py-0 pb-0 pl-1.5 font-semibold">
                  {item.name}
                </div>
              </div>

              <div className="invisible group-hover:visible">
                <FolderMenu folder={item} setNewItem={setNewItem} />
              </div>
            </div>

            <div
              className={`ml-5 border-l ${!openFolder[item.id] && "hidden"}`}
            >
              {newItem[item.id] ? (
                <NewItemForm
                  itemType={newItem[item.id]}
                  path={item.path}
                  parentId={item.id}
                  setNewItem={setNewItem}
                />
              ) : null}
              <FileList fileList={item.children!} />
            </div>
          </section>
        ) : (
          <section
            key={item.id}
            className={`${fileStyles} ${
              currentNote?.id === item.id &&
              (colorScheme === "dark" ? "bg-slate-800" : "bg-gray-300")
            }`}
          >
            <i className="ri-file-2-fill text-blue-400"></i>
            <NoteItem noteName={item.name} noteId={item.id} path={item.path} />
          </section>
        )
      )}
    </aside>
  );
}
