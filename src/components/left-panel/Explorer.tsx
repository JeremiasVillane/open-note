import { useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { FolderItem, NoteItem } from "..";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";

export function Explorer({
  fileList,
  currentParent,
}: {
  fileList: FileObj[];
  currentParent: string;
}): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const { currentNote } = useNotesStore();
  const [openFolder, setOpenFolder] = useState<Record<string, boolean>>({});
  const [newItem, setNewItem] = useState<Record<string, string>>({});

  const fileStyles = `itemStyles ${
    colorScheme === "dark" ? "hover:bg-gray-700" : "hover:bg-slate-100"
  }`;
  const menuItemStyles = `${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;

  const handleOpenFolder = (folderId: string) => {
    setOpenFolder({
      ...openFolder,
      [folderId]: openFolder[folderId] ? false : true,
    });
  };

  return (
    <aside className="group/panel">
      {fileList?.map((item) =>
        item.isFolder ? (
          <section key={item.id}>
            <FolderItem
              item={item}
              newItem={newItem}
              setNewItem={setNewItem}
              openFolder={openFolder}
              handleOpenFolder={handleOpenFolder}
              fileStyles={fileStyles}
              menuItemStyles={menuItemStyles}
            />
          </section>
        ) : item.parent === currentParent ? (
          <section
            key={item.id}
            className={`${fileStyles} ${
              currentNote?.id === item.id &&
              (colorScheme === "dark" ? "bg-slate-800" : "bg-gray-300")
            }`}
          >
            <i className="ri-file-2-fill text-blue-400"></i>
            <NoteItem item={item} menuItemStyles={menuItemStyles} />
          </section>
        ) : null
      )}
    </aside>
  );
}
