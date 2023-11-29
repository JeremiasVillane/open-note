import { SVGProps } from "react";

export interface FileObj {
  id: string;
  name: string;
  path: string;
  isFolder: boolean;
  children?: FileObj[];
}

export interface menuControl {
  icon: string;
  onClick: () => boolean;
  title?: string;
}

export interface Note {
  id: string;
  name: string;
  path: string;
  content: string | null;
}

export interface NotesState {
  fileList: FileObj[];
  currentNote: Note | null;
  status: string | null;
  showNoteForm: boolean;
  addFile: (parentId: string, note: FileObj) => void;
  removeFile: (id: string) => void;
  setFiles: (names: FileObj[]) => void;
  setCurrentNote: (note: Note | null) => void;
  setStatus: (status: string | null) => void;
  setShowNoteForm: (value: boolean) => void;
}

export type CustomIconProps<T extends SVGElement> = SVGProps<T> & {
  title?: string;
  size?: string | number;
};
