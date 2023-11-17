import { readDir } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { Editor } from "@tiptap/react";
import { useEffect } from "react";
import { NoteItem } from "..";
import { useNotesStore } from "../../store/notesStore";

export function NoteList({ editor }: { editor: Editor }): JSX.Element {
  const { notesNames, setNotesNames } = useNotesStore();

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
        <NoteItem key={noteName} noteName={noteName} editor={editor} />
      ))}
    </section>
  );
}
