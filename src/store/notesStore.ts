import { create } from "zustand";
import { addFileRecursively, removeFileRecursively } from "../helpers";
import { NotesState } from "../types";

export const useNotesStore = create<NotesState>((set) => ({
  fileList: [],
  currentNote: null,
  status: null,
  showNoteForm: false,
  addFile: (parentId, note) =>
    set((state) => ({
      fileList: addFileRecursively(state.fileList, parentId, note),
    })),
  removeFile: (id) =>
    set((state) => ({
      fileList: removeFileRecursively(state.fileList, id),
    })),
  setFiles: (files) => set({ fileList: files }),
  setCurrentNote: (note) => set({ currentNote: note }),
  setStatus: (status) => set({ status }),
  setShowNoteForm: (value) => set({ showNoteForm: value }),
}));
