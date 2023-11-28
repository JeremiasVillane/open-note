import { useRichTextEditorContext } from "@mantine/tiptap";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { useTranslation } from "react-i18next";
import { FileMenu } from "..";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";

export function NoteItem({
  noteName,
  path,
}: {
  noteName: string;
  path: string;
}): JSX.Element {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
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

    const content = await readTextFile(path);

    setCurrentNote({
      name: noteName,
      path,
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
    editor?.chain().clearContent().run();
  };

  const handleDelete = async (noteName: string) => {
    const confirm = await window.confirm(t("Delete"));
    if (!confirm) return;

    const filePath = await join(appDocuments, noteName);

    await removeFile(filePath);
    removeNote(noteName);
    setCurrentNote(null);
    editor?.chain().clearContent().run();

    setStatus(t("NoteDeleted"));
    setTimeout(() => {
      setStatus(null);
    }, 2000);
  };

  return (
    <div className="pl-1.5 w-full" onClick={hadleOpen}>
      <div className="flex items-center justify-between">
        <h1>{noteName}</h1>

        {currentNote?.name === noteName ? (
          <FileMenu
            handleClose={handleClose}
            handleDelete={handleDelete}
            noteName={noteName}
          />
        ) : null}
      </div>
    </div>
  );
}
