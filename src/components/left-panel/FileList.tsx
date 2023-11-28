import { useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { NoteItem } from "..";
import { FileObj } from "../../types";
import { useNotesStore } from "../../store/notesStore";

export function FileList({ fileList }: { fileList: FileObj[] }): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const [openFolder, setOpenFolder] = useState<Record<string, boolean>>({});
  const { currentNote } = useNotesStore();

  const fileStyles = `itemStyles ${
    colorScheme === "dark" ? "hover:bg-gray-700" : "hover:bg-slate-100"
  }`;

  const handleOpenFolder = (fileId: string) => {
    setOpenFolder({
      ...openFolder,
      [fileId]: openFolder[fileId] ? false : true,
    });
  };

  return (
    <aside>
      {fileList.map((file) =>
        file.isFolder ? (
          <section key={file.id}>
            <div
              className={fileStyles}
              onClick={() => handleOpenFolder(file.id)}
            >
              <i
                className={`${
                  openFolder[file.id] ? "ri-folder-open-fill" : "ri-folder-fill"
                } text-yellow-500`}
              ></i>
              <div className="flex justify-between py-0 pb-0 pl-1.5 font-semibold">
                {file.name}
              </div>
            </div>

            <div
              className={`ml-5 border-l ${!openFolder[file.id] && "hidden"}`}
            >
              <FileList fileList={file.children!} />
            </div>
          </section>
        ) : (
          <section
            key={file.id}
            className={`${fileStyles} ${
              currentNote?.name === file.name &&
              (colorScheme === "dark" ? "bg-slate-800" : "bg-gray-300")
            }`}
          >
            <i className="ri-file-2-fill text-blue-400"></i>
            <NoteItem noteName={file.name} noteId={file.id} path={file.path} />
          </section>
        )
      )}
    </aside>
  );
}
