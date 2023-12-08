import { SVGProps } from "react";

export interface FileObj {
  id: string;
  name: string;
  path: string;
  is_folder: boolean;
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
  openFolders: Record<string, boolean>;
  status: string | null;
  showNewItemForm: "note" | "folder" | null;
  setItems: (items: FileObj[]) => void;
  setCurrentNote: (note: Note | null) => void;
  setOpenFolder: (folderId: string) => void;
  setStatus: (status: string | null) => void;
  setShowNewItemForm: (value: "note" | "folder" | null) => void;
}

export type CustomIconProps<T extends SVGElement> = SVGProps<T> & {
  title?: string;
  size?: string | number;
};
