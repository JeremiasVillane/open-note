import { useTheme } from "@mui/material";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { toast } from "react-hot-toast";
import { FileMenu } from "..";
import { useNotesStore } from "../../store/notesStore";
import Paper from "@mui/material/Paper";

export function NoteItem({ noteName }: { noteName: string }): JSX.Element {
  const theme = useTheme();
  const { currentNote, setCurrentNote, saved, setSaved, removeNote } =
    useNotesStore();

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
    <Paper
      square
      variant="outlined"
      sx={{
        backgroundColor: `${
          currentNote?.name === noteName
            ? "rgb(96, 165, 250)"
            : theme.palette.mode === "dark"
            ? "rgb(23, 23, 23)"
            : "rgb(229, 229, 229)"
        }`,
      }}
      className={`flex justify-between items-center py-2 px-4 cursor-pointer transition-colors duration-300 ease-in-out ${
        currentNote?.name !== noteName
          ? `${
              theme.palette.mode === "dark"
                ? "hover:bg-neutral-800"
                : "hover:bg-neutral-100"
            }`
          : ""
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
    </Paper>
  );
}
