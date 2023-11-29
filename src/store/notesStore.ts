import { create } from "zustand";
import { addItemRecursively, removeItemRecursively } from "../helpers";
import { NotesState } from "../types";

export const useNotesStore = create<NotesState>((set) => ({
  fileList: [],
  currentNote: null,
  status: null,
  showNewItemForm: false,
  addItem: (parentId, newItem) =>
    set((state) => ({
      fileList: addItemRecursively(state.fileList, parentId, newItem),
    })),
  removeItem: (id) =>
    set((state) => ({
      fileList: removeItemRecursively(state.fileList, id),
    })),
  setItems: (items) => set({ fileList: items }),
  setCurrentNote: (note) => set({ currentNote: note }),
  setStatus: (status) => set({ status }),
  setShowNewItemForm: (value) => set({ showNewItemForm: value }),
}));
