import { type PaletteMode } from "@mui/material";
import { readDir } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { useEffect } from "react";
import { NoteItem } from ".";
import { useNotesStore } from "../store/notesStore";

export function NoteList({ theme }: { theme: PaletteMode }) {
  const notesNames = useNotesStore((state) => state.notesNames);

  useEffect(() => {
    async function loadFiles() {
      const documentPath = await documentDir();
      const scanDir = await readDir(await join(documentPath, "open-note"));
      const filenames = scanDir.map((file) => file.name!.split(".")[0]);

      useNotesStore.getState().setNotesNames(filenames);
    }

    loadFiles();
  }, []);

  return (
    <section>
      {notesNames.map((noteName) => (
        <NoteItem key={noteName} noteName={noteName} theme={theme} />
      ))}
    </section>
  );
}
