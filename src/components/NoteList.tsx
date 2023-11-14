import { readDir } from "@tauri-apps/api/fs";
import { useEffect } from "react";
import { documentDir, join } from "@tauri-apps/api/path";
import { useNotesStore } from "../store/notesStore";
import { NoteItem } from ".";

export function NoteList() {
  const setNotesNames = useNotesStore((state) => state.setNotesNames);
  const notesNames = useNotesStore((state) => state.notesNames);

  useEffect(() => {
    async function loadFiles() {
      const documentPath = await documentDir();
      const scanDir = await readDir(await join(documentPath, "open-note"));
      const filenames = scanDir.map((file) => file.name!.split(".")[0]);

      setNotesNames(filenames);
    }

    loadFiles();
  }, []);

  return (
    <section>
      {notesNames.map((noteName) => (
        <NoteItem noteName={noteName} key={noteName} />
      ))}
    </section>
  );
}
