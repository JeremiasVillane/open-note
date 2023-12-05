import { SVGProps } from "react";

export interface FileObj {
  id: string;
  name: string;
  parent: string;
  content?: string;
  tags?: string[];
  children?: string[];
  isFolder: boolean;
}

export interface menuControl {
  icon: string;
  onClick: () => boolean;
  title?: string;
}

export interface Note {
  id: string;
  name: string;
  content: string | undefined;
  parent: string;
}

export interface NotesState {
  fileList: FileObj[];
  currentNote: Note | null;
  status: string | null;
  showNewItemForm: "note" | "folder" | null;
  addItem: (parentId: string, note: FileObj) => void;
  removeItem: (id: string) => void;
  renameItem: (
    targetId: string,
    newName: string,
    currentPath: string,
    setCurrentPath: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  setItems: (items: FileObj[]) => void;
  setCurrentNote: (note: Note | null) => void;
  setStatus: (status: string | null) => void;
  setShowNewItemForm: (value: "note" | "folder" | null) => void;
}

export type CustomIconProps<T extends SVGElement> = SVGProps<T> & {
  title?: string;
  size?: string | number;
};
