import { create } from "zustand";
import { NotesState } from "../types";

export const useNotesStore = create<NotesState>((set) => ({
  fileList: [],
  currentNote: null,
  openFolders: {},
  status: null,
  showNewItemForm: null,
  setItems: (items) => set({ fileList: items }),
  setCurrentNote: (note) => set({ currentNote: note }),
  setOpenFolder: (folderId) =>
    set((state) => ({
      openFolders: {
        ...state.openFolders,
        [folderId]: state.openFolders[folderId] ? false : true,
      },
    })),
  setStatus: (status) => {
    set({ status });
    setTimeout(() => {
      set({ status: null });
    }, 2000);
  },
  setShowNewItemForm: (value) => set({ showNewItemForm: value }),
}));
