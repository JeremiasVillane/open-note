import { create } from "zustand";
import {
  addItemRecursively,
  removeItemRecursively,
  renameItemRecursively,
} from "../helpers";
import { NotesState } from "../types";

export const useNotesStore = create<NotesState>((set) => ({
  fileList: [],
  currentNote: null,
  status: null,
  showNewItemForm: null,
  addItem: (parentId, newItem) => {
    if (parentId === "root") {
      set((state) => ({
        fileList: [...state.fileList, newItem],
      }));
    } else {
      set((state) => ({
        fileList: addItemRecursively(state.fileList, parentId, newItem),
      }));
    }
  },
  removeItem: (id) =>
    set((state) => ({
      fileList: removeItemRecursively(state.fileList, id),
    })),
  renameItem: (targetId, newName) =>
    set((state) => ({
      fileList: renameItemRecursively(state.fileList, targetId, newName),
    })),
  setItems: (items) => set({ fileList: items }),
  setCurrentNote: (note) => set({ currentNote: note }),
  setStatus: (status) => set({ status }),
  setShowNewItemForm: (value) => set({ showNewItemForm: value }),
}));
