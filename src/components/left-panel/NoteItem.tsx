import { Card, useMantineColorScheme } from "@mantine/core";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { Editor } from "@tiptap/react";
import { useTranslation } from "react-i18next";
import { FileMenu } from "..";
import { useNotesStore } from "../../store/notesStore";

export function NoteItem({
  noteName,
  editor,
}: {
  noteName: string;
  editor: Editor;
}): JSX.Element {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const { currentNote, setCurrentNote, removeNote, setStatus } =
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
    if (editor?.getHTML() !== currentNote?.content) {
      const confirm = await window.confirm(
        "Are you sure you want to discard your changes?"
      );
      if (!confirm) return;
    }

    setCurrentNote(null);
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

    setStatus(t("NoteDeleted"));
    setTimeout(() => {
      setStatus(null);
    }, 2000);
  };

  return (
    <Card
      withBorder
      // style={{
      //   backgroundColor: `${
      //     currentNote?.name === noteName
      //       ? "rgb(96, 165, 250)"
      //       : colorScheme === "dark"
      //       ? "rgb(23, 23, 23)"
      //       : "rgb(229, 229, 229)"
      //   }`,
      // }}
      className={`cursor-pointer transition-colors duration-300 ease-in-out ${
        currentNote?.name !== noteName
          ? `${
              colorScheme === "dark"
                ? "hover:bg-neutral-800"
                : "hover:bg-neutral-100"
            }`
          : ""
      }`}
      onClick={hadleOpen}
    >
      <div className="flex justify-between items-center">
        <h1>{noteName}</h1>

        {currentNote?.name === noteName ? (
          <FileMenu
            handleClose={handleClose}
            handleDelete={handleDelete}
            noteName={noteName}
          />
        ) : null}
      </div>
    </Card>
  );
}
