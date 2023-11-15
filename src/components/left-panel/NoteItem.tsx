import { useTheme } from "@mui/material";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { toast } from "react-hot-toast";
import { FileMenu } from "..";
import { useNotesStore } from "../../store/notesStore";

export function NoteItem({ noteName }: { noteName: string }): JSX.Element {
  const theme = useTheme();
  const currentNote = useNotesStore((state) => state.currentNote);
  const setCurrentNote = useNotesStore((state) => state.setCurrentNote);
  const saved = useNotesStore((state) => state.saved);
  const setSaved = useNotesStore((state) => state.setSaved);
  const removeNote = useNotesStore((state) => state.removeNote);

  const hadleOpen = async () => {
    if (currentNote?.name === noteName) return;

    const documentPath = await documentDir();
    const filePath = await join(documentPath, "open-note", `${noteName}.html`);
    const content = await readTextFile(filePath);

    setCurrentNote({
      name: noteName,
      content,
    });
  };

  const handleClose = async () => {
    if (!saved) {
      const confirm = await window.confirm(
        "Are you sure you want to discard your changes?"
      );
      if (!confirm) return;
    }

    setCurrentNote(null);
    setSaved(true);
  };

  const handleDelete = async (noteName: string) => {
    const confirm = await window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirm) return;

    const documentPath = await documentDir();
    const filePath = await join(documentPath, "open-note", `${noteName}.html`);

    await removeFile(filePath);
    removeNote(noteName);
    setCurrentNote(null);

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
    <section
      className={`flex justify-between items-center py-2 px-4 cursor-pointer transition-colors duration-300 ease-in-out ${
        currentNote?.name === noteName
          ? "bg-blue-400 text-black"
          : `${
              theme.palette.mode === "dark"
                ? "bg-neutral-900 hover:bg-neutral-800"
                : "bg-neutral-200 hover:bg-neutral-100 text-black"
            }`
      }`}
      onClick={hadleOpen}
    >
      <h1>{noteName}</h1>

      {currentNote?.name === noteName ? (
        <FileMenu
          handleClose={handleClose}
          handleDelete={handleDelete}
          noteName={noteName}
        />
      ) : null}
    </section>
  );
}
