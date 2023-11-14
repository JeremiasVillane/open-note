import { Delete } from "@mui/icons-material";
import { type PaletteMode } from "@mui/material";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { toast } from "react-hot-toast";
import { useNotesStore } from "../store/notesStore";

export function NoteItem({
  noteName,
  theme,
}: {
  noteName: string;
  theme: PaletteMode;
}) {
  const currentNote = useNotesStore((state) => state.currentNote);

  const handleDelete = async (noteName: string) => {
    const confirm = await window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirm) return;

    const documentPath = await documentDir();
    const filePath = await join(documentPath, "open-note", `${noteName}.txt`);

    await removeFile(filePath);
    useNotesStore.getState().removeNote(noteName);
    useNotesStore.getState().setCurrentNote(null);

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
      className={`flex justify-between py-2 px-4 cursor-pointer transition-colors duration-300 ease-in-out ${
        currentNote?.name === noteName
          ? "bg-blue-400 text-black"
          : `${
              theme === "dark"
                ? "bg-neutral-900 hover:bg-neutral-800"
                : "bg-neutral-200 hover:bg-neutral-100 text-black"
            }`
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

        useNotesStore.getState().setCurrentNote({
          name: noteName,
          content,
        });
      }}
    >
      <h1>{noteName}</h1>

      {currentNote?.name === noteName ? (
        <div className="flex gap-2 items-center justify-center">
          <Delete
            fontSize="small"
            className="file-icons"
            onClick={async (e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              await handleDelete(noteName);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
