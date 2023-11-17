interface Math {
  clamp(num: number, min: number, max: number): number;
}

interface Note {
  name: string;
  content: string | null;
}

interface NotesState {
  notesNames: string[];
  currentNote: Note | null;
  status: string | null;
  setNoteName: (name: string) => void;
  setNotesNames: (names: string[]) => void;
  setCurrentNote: (note: Note | null) => void;
  removeNote: (name: string) => void;
  setStatus: (status: string | null) => void;
}

type CustomIconProps<T extends SVGElement> = SVGProps<T> & {
  size?: string | number;
};
