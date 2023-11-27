import { Card, useMantineColorScheme } from "@mantine/core";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { Editor } from "@tiptap/react";
import { useTranslation } from "react-i18next";
import { FileMenu } from "..";
import { useTauriContext } from "../../providers/tauri-provider";
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
  const { appDocuments } = useTauriContext();
  const {
    currentNote,
    setCurrentNote,
    removeNote,
    setStatus,
    setShowNoteForm,
  } = useNotesStore();

  const hadleOpen = async () => {
    if (currentNote?.name === noteName) return;

    if (
      editor?.getHTML() !== "<p></p>" &&
      editor?.getHTML() !== undefined &&
      editor?.getHTML() !== currentNote?.content
    ) {
      const confirm = await window.confirm(t("Discard"));
      if (!confirm) return;
    }

    const filePath = await join(appDocuments, noteName);
    const content = await readTextFile(filePath);

    setCurrentNote({
      name: noteName,
      content,
    });

    setShowNoteForm(false);
  };

  const handleClose = async () => {
    if (editor?.getHTML() !== currentNote?.content) {
      const confirm = await window.confirm(t("Discard"));
      if (!confirm) return;
    }

    setCurrentNote(null);
    editor.chain().clearContent().run();
  };

  const handleDelete = async (noteName: string) => {
    const confirm = await window.confirm(t("Delete"));
    if (!confirm) return;

    const filePath = await join(appDocuments, noteName);

    await removeFile(filePath);
    removeNote(noteName);
    setCurrentNote(null);
    editor.chain().clearContent().run();

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
