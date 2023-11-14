import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNotesStore } from "../store/notesStore";

export function NoteForm() {
  const [fileName, setFileName] = useState<string>("");
  const setNoteName = useNotesStore((state) => state.setNoteName);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const documentPath = await documentDir();

    await writeTextFile(`${documentPath}/open-note/${fileName}.txt`, ``);

    setFileName("");
    setNoteName(fileName);

    toast.success("Note saved", {
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
        className="bg-neutral-800 text-white p-3 w-full border-none outline-none"
        onChange={(e) => setFileName(e.target.value)}
        value={fileName}
      />

      <button type="submit" className="hidden">
        Save
      </button>
    </form>
  );
}
