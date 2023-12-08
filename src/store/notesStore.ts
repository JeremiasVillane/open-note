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
      set((state) => {
        const newList = [...state.fileList, newItem];

        const folders = newList
          .filter((item) => item.is_folder)
          .sort((a, b) => a.name.localeCompare(b.name));
        const notes = newList
          .filter((item) => !item.is_folder)
          .sort((a, b) => a.name.localeCompare(b.name));

        return {
          fileList: [...folders, ...notes],
        };
      });
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
  renameItem: (targetId, newName, currentPath, setCurrentPath) =>
    set((state) => ({
      fileList: renameItemRecursively(
        state.fileList,
        targetId,
        newName,
        currentPath,
        setCurrentPath
      ),
    })),
  setItems: (items) => set({ fileList: items }),
  setCurrentNote: (note) => set({ currentNote: note }),
  setStatus: (status) => {
    set({ status });
    setTimeout(() => {
      set({ status: null });
    }, 2000);
  },
  setShowNewItemForm: (value) => set({ showNewItemForm: value }),
}));
