import { create } from "zustand";

interface Note {
  name: string;
  content: string | null;
}

interface NotesState {
  notesNames: string[];
  currentNote: Note | null;
  setNoteName: (name: string) => void;
  setNotesNames: (names: string[]) => void;
  setCurrentNote: (note: Note | null) => void;
  removeNote: (name: string) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notesNames: [],
  currentNote: null,
  setNoteName: (name) =>
    set((state) => ({ notesNames: [...state.notesNames, name] })),
  setNotesNames: (names) => set({ notesNames: names }),
  setCurrentNote: (note) => set({ currentNote: note }),
  removeNote: (name) =>
    set((state) => ({
      notesNames: state.notesNames.filter((note) => note !== name),
    })),
}));
