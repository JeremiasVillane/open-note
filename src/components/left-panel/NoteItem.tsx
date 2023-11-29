import { useRichTextEditorContext } from "@mantine/tiptap";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { useTranslation } from "react-i18next";
import { FileMenu } from "..";
import { useNotesStore } from "../../store/notesStore";

export function NoteItem({
  noteName,
  noteId,
  path,
}: {
  noteName: string;
  noteId: string;
  path: string;
}): JSX.Element {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const {
    currentNote,
    setCurrentNote,
    removeFile,
    setStatus,
    setShowNoteForm,
  } = useNotesStore();

  const hadleOpen = async () => {
    if (currentNote?.id === noteId) return;

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
      id: noteId,
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

  const handleDelete = async () => {
    const confirm = await window.confirm(t("Delete"));
    if (!confirm) return;

    await removeFile(path);
    removeFile(noteId);
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

        {currentNote?.id === noteId ? (
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
