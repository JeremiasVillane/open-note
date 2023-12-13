import { useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { FolderItem, NoteItem } from "..";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";

/**
 * Renders the Explorer component.
 *
 * @param {Array<FileObj>} fileList - The list of files to display in the Explorer.
 * @returns {JSX.Element} The JSX representation of the Explorer component.
 */
export function Explorer({ fileList }: { fileList: FileObj[] }): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const { currentNote } = useNotesStore();
  const [newItem, setNewItem] = useState<Record<string, string>>({});

  const fileStyles = `itemStyles ${
    colorScheme === "dark" ? "hover:bg-gray-700" : "hover:bg-slate-100"
  }`;

  const menuItemStyles = `${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out text-sm cursor-default pl-4 pr-2 py-1 rounded-sm`;

  const contextMenuStyles = `z-10 fixed rounded-sm border border-[var(--mantine-color-gray-light)]`;

  return (
    <aside className="group/panel">
      {fileList?.map((item) =>
        item.is_folder ? (
          <section key={item.id}>
            <FolderItem
              item={item}
              newItem={newItem}
              setNewItem={setNewItem}
              fileStyles={fileStyles}
              menuItemStyles={menuItemStyles}
              contextMenuStyles={contextMenuStyles}
            />
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
            <NoteItem
              item={item}
              menuItemStyles={menuItemStyles}
              contextMenuStyles={contextMenuStyles}
            />
          </section>
        )
      )}
    </aside>
  );
}
