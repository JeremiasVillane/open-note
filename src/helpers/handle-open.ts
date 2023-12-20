import { listen } from "@tauri-apps/api/event";
import { FsOptions } from "@tauri-apps/api/fs";
import { Editor } from "@tiptap/react";
import { renderModal } from ".";
import { Note } from "@/types";

/**
 * Handles the opening of a file.
 *
 * @param {string} fileName - The real-time updated name of the note.
 * @param {string} noteId - The ID of the note.
 * @param {string} path - The path of the file.
 * @param {Note | null} currentNote - The current note object.
 * @param {(note: Note | null) => void} setCurrentNote - The function to set the current note.
 * @param {(value: "note" | "folder" | null) => void} setShowNewItemForm - The function to show the file creation form.
 * @param {(value: boolean) => void} setActiveModal - The function to set the active modal value.
 * @param {(filePath: string, options?: FsOptions | undefined) => Promise<string>} readTextFile - The function to read a text file.
 * @param {Editor} editor - The rich text editor.
 * @param {React.Dispatch<boolean>} setContext - The function to hide/show the context menu.
 * @return {Promise<void>} A promise that resolves to undefined.
 */
export const handleOpen = async (
  fileName: string,
  noteId: string,
  path: string,
  currentNote: Note | null,
  setCurrentNote: (note: Note | null) => void,
  setShowNewItemForm: (value: "note" | "folder" | null) => void,
  setActiveModal: (value: boolean) => void,
  readTextFile: (
    filePath: string,
    options?: FsOptions | undefined
  ) => Promise<string>,
  editor: Editor,
  setContext: React.Dispatch<boolean>
): Promise<void> => {
  if (currentNote?.id === noteId) return;

  setContext(false);

  const isEdited =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;

  const opening = async () => {
    const content = await readTextFile(path);

    setCurrentNote({
      id: noteId,
      name: fileName,
      path,
      content,
    });
  };

  const closing = () => {
    setCurrentNote(null);
    editor?.chain().clearContent().run();

    setActiveModal(false);
    return;
  };

  if (isEdited) {
    renderModal({
      label: "discard",
      setActiveModal,
    });
    await listen("modal-cancel", () => {
      setActiveModal(false);
      return;
    });

    await listen("modal-ok", () => {
      closing();
      opening();
    });
  } else {
    opening();
  }

  setShowNewItemForm(null);
};
