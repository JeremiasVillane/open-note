import { listen } from "@tauri-apps/api/event";
import { Editor } from "@tiptap/react";
import { renderModal } from ".";
import { Note } from "@/types";

/**
 * Closes the current note and handles any unsaved changes.
 *
 * @param {boolean} isEdited - Indicates whether the note has unsaved changes.
 * @param {(note: Note | null) => void} setCurrentNote - Function to set the current note.
 * @param {Editor | null} editor - The editor instance.
 * @param {(value: boolean) => void} setActiveModal - Function to set the active modal state.
 * @return {Promise<void>} A promise that resolves once the note is closed.
 */
export const handleClose = async (
  isEdited: boolean,
  setCurrentNote: (note: Note | null) => void,
  editor: Editor | null,
  setActiveModal: (value: boolean) => void
): Promise<void> => {
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

    await listen("modal-ok", () => closing());
  } else {
    closing();
  }
};
