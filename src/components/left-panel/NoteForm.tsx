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
  const { setNoteName, setStatus } = useNotesStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const documentPath = await documentDir();
    const filePath = await join(documentPath, "open-note", `${fileName}.html`);

    await writeTextFile(filePath, ``);

    setFileName("");
    setNoteName(fileName);

    setStatus(t("NoteCreated"));
    setTimeout(() => {
      setStatus(null);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="note-field"
        id="note-field"
        placeholder={t("Placeholder")}
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

      <button type="submit" className="hidden" />
    </form>
  );
}
