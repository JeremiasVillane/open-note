import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { toast } from "react-hot-toast";
import { FiTrash, FiX } from "react-icons/fi";
import { useNotesStore } from "../store/notesStore";

export function NoteItem({ noteName }: { noteName: string }) {
  const currentNote = useNotesStore((state) => state.currentNote);
  const setCurrentNote = useNotesStore((state) => state.setCurrentNote);
  const removeNote = useNotesStore((state) => state.removeNote);

  const handleDelete = async (noteName: string) => {
    const confirm = await window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirm) return;

    const documentPath = await documentDir();
    const filePath = await join(
      documentPath,
      "open-note",
      `${noteName}.txt`
    );

    await removeFile(filePath);
    removeNote(noteName);

    toast.success("Note deleted", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div
      className={`flex justify-between py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out ${
        currentNote?.name === noteName
          ? "bg-blue-400 text-black"
          : "bg-neutral-900 hover:bg-neutral-800"
      }`}
      onClick={async () => {
        if (currentNote?.name === noteName) return;

        const documentPath = await documentDir();
        const filePath = await join(
          documentPath,
          "open-note",
          `${noteName}.txt`
        );
        const content = await readTextFile(filePath);

        setCurrentNote({
          name: noteName,
          content,
        });
      }}
    >
      <h1>{noteName}</h1>

      {currentNote?.name === noteName ? (
        <div className="flex gap-2 items-center justify-center">
          <FiTrash
            onClick={async (e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              await handleDelete(noteName);
            }}
            className="file-icons"
          />
          <FiX
            onClick={(e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              setCurrentNote(null);
            }}
            className="file-icons"
          />
        </div>
      ) : null}
    </div>
  );
}
