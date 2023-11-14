import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { NoteEditor, NoteForm, NoteList } from "./components";

export default function App() {
  useEffect(() => {
    async function createNotesDir() {
      await createDir("open-note", {
        dir: BaseDirectory.Document,
        recursive: true,
      });
    }

    createNotesDir();
  }, []);

  return (
    <div className="h-screen text-white grid grid-cols-12 overflow-y-hidden">
      <div className="col-span-3 bg-neutral-950">
        <NoteForm />
        <NoteList />
      </div>

      <div className="col-span-9 bg-stone-900">
        <NoteEditor />
      </div>
      <Toaster />
    </div>
  );
}
