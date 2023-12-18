import { create } from "zustand";
import { NotesState } from "../types";

export const useNotesStore = create<NotesState>((set) => ({
  fileList: [],
  currentNote: null,
  openFolders: {},
  showNewItemForm: null,
  setItems: (items) => set({ fileList: items }),
  setCurrentNote: (note) => set({ currentNote: note }),
  setOpenFolder: (folderId) =>
    set((state) => ({
      openFolders: {
        ...state.openFolders,
        [folderId]: true,
      },
    })),
  toggleOpenFolder: (folderId) =>
    set((state) => ({
      openFolders: {
        ...state.openFolders,
        [folderId]: state.openFolders[folderId] ? false : true,
      },
    })),
  setShowNewItemForm: (value) => set({ showNewItemForm: value }),
}));
