import { SVGProps } from "react";

export interface FileObj {
  id: string;
  name: string;
  isFolder: boolean;
  children?: FileObj[];
}

export interface menuControl {
  icon: string;
  onClick: () => boolean;
  title?: string;
}

export interface Note {
  name: string;
  content: string | null;
}

export interface NotesState {
  fileList: FileObj[];
  currentNote: Note | null;
  status: string | null;
  showNoteForm: boolean;
  setNote: (note: FileObj) => void;
  setFiles: (names: FileObj[]) => void;
  setCurrentNote: (note: Note | null) => void;
  removeNote: (name: string) => void;
  setStatus: (status: string | null) => void;
  setShowNoteForm: (value: boolean) => void;
}

export type CustomIconProps<T extends SVGElement> = SVGProps<T> & {
  title?: string;
  size?: string | number;
};
