import { create } from "zustand";
import { NotesState } from "../types";

export const useNotesStore = create<NotesState>((set) => ({
  fileList: [],
  currentNote: null,
  status: null,
  showNoteForm: false,
  setNote: (note) => set((state) => ({ fileList: [...state.fileList, note] })),
  setFiles: (files) => set({ fileList: files }),
  setCurrentNote: (note) => set({ currentNote: note }),
  removeNote: (name) =>
    set((state) => ({
      fileList: state.fileList.filter((note) => note.name !== name),
    })),
  setStatus: (status) => set({ status }),
  setShowNoteForm: (value) => set({ showNoteForm: value }),
}));
