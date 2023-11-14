import { useTheme } from "@mui/material";
import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNotesStore } from "../store/notesStore";

export function NoteForm() {
  const theme = useTheme();
  const [fileName, setFileName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const documentPath = await documentDir();
    const filePath = await join(documentPath, "open-note", `${fileName}.txt`);

    await writeTextFile(filePath, ``);

    setFileName("");
    useNotesStore.getState().setNoteName(fileName);

    toast.success("Note created", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="note-field"
        id="note-field"
        placeholder="Write a new note"
        className={`${
          theme.palette.mode === "dark"
            ? "bg-neutral-800 text-white"
            : "bg-neutral-300 text-black"
        }  p-3 w-full border-none outline-none`}
        onChange={(e) => setFileName(e.target.value)}
        value={fileName}
      />

      <button type="submit" className="hidden">
        Save
      </button>
    </form>
  );
}
