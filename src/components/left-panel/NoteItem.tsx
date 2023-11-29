import { useRichTextEditorContext } from "@mantine/tiptap";
import { readTextFile } from "@tauri-apps/api/fs";
import { useTranslation } from "react-i18next";
import { FileMenu } from "..";
import { handleDelete } from "../../helpers/handle-delete";
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
    removeItem,
    setStatus,
    setShowNewItemForm,
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

    setShowNewItemForm(null);
  };

  const handleClose = async () => {
    if (editor?.getHTML() !== currentNote?.content) {
      const confirm = await window.confirm(t("Discard"));
      if (!confirm) return;
    }

    setCurrentNote(null);
    editor?.chain().clearContent().run();
  };

  return (
    <div className="pl-1.5 w-full" onClick={hadleOpen}>
      <div className="flex items-center justify-between">
        <h1>{noteName}</h1>

        {currentNote?.id === noteId ? (
          <FileMenu
            handleClose={handleClose}
            handleDelete={() =>
              handleDelete(
                null,
                "note",
                setStatus,
                removeItem,
                path,
                noteId,
                t,
                setCurrentNote,
                editor!
              )
            }
          />
        ) : null}
      </div>
    </div>
  );
}
