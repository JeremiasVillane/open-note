import { create } from "zustand";
import { NotesState } from "../types";
import { removeNoteRecursively } from "../helpers";

export const useNotesStore = create<NotesState>((set) => ({
  fileList: [],
  currentNote: null,
  status: null,
  showNoteForm: false,
  setNote: (note) => set((state) => ({ fileList: [...state.fileList, note] })),
  setFiles: (files) => set({ fileList: files }),
  setCurrentNote: (note) => set({ currentNote: note }),
  removeNote: (id) =>
    set((state) => ({
      fileList: removeNoteRecursively(state.fileList, id),
    })),
  setStatus: (status) => set({ status }),
  setShowNoteForm: (value) => set({ showNoteForm: value }),
}));
