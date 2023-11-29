import { useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { FolderMenu, NoteForm, NoteItem } from "..";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";

export function FileList({ fileList }: { fileList: FileObj[] }): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const { currentNote } = useNotesStore();
  const [openFolder, setOpenFolder] = useState<Record<string, boolean>>({});
  const [newFile, setNewFile] = useState<Record<string, boolean>>({});

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
              className={`${fileStyles} group justify-between items-center relative`}
              onClick={() => handleOpenFolder(file.id)}
            >
              <div className="flex">
                <i
                  className={`${
                    openFolder[file.id]
                      ? "ri-folder-open-fill"
                      : "ri-folder-fill"
                  } text-yellow-500`}
                ></i>

                <div className="py-0 pb-0 pl-1.5 font-semibold">
                  {file.name}
                </div>
              </div>

              <div className="invisible group-hover:visible">
                <FolderMenu folder={file} newFile={newFile} setNewFile={setNewFile} />
              </div>
            </div>

            <div
              className={`ml-5 border-l ${!openFolder[file.id] && "hidden"}`}
            >
              {newFile[file.id] ? <NoteForm path={file.path} parentId={file.id} setNewFile={setNewFile} /> : null}
              <FileList fileList={file.children!} />
            </div>
          </section>
        ) : (
          <section
            key={file.id}
            className={`${fileStyles} ${
              currentNote?.id === file.id &&
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
