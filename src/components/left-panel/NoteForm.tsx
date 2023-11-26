import { useMantineColorScheme } from "@mantine/core";
import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNotesStore } from "../../store/notesStore";

export function NoteForm(): JSX.Element {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const [fileName, setFileName] = useState<string>("");
  const { setNoteName, setStatus, setShowNoteForm } = useNotesStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const documentPath = await documentDir();
    const filePath = await join(documentPath, "open-note", `${fileName}.html`);

    await writeTextFile(filePath, ``);

    setFileName("");
    setNoteName(fileName);
    setShowNoteForm(false);

    setStatus(t("NoteCreated"));
    setTimeout(() => {
      setStatus(null);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        autoFocus
        name="note-field"
        id="note-field"
        placeholder={t("New note")}
        autoComplete="off"
        className={`${
          colorScheme === "dark"
            ? "bg-neutral-800 text-white"
            : "bg-neutral-300 text-black"
        }  p-3 w-full border-none outline-none`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFileName(e.target.value)
        }
        value={fileName}
      />
      <i
        className="ri-close-circle-line absolute text-xl translate-y-[44%] right-1 cursor-pointer hover:text-red-900"
        onClick={() => setShowNoteForm(false)}
      ></i>
      <button type="submit" className="hidden" />
    </form>
  );
}
