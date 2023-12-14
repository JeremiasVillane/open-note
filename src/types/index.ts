import { SVGProps } from "react";

export interface FileObj {
  id: string;
  name: string;
  path: string;
  is_folder: boolean;
  children?: FileObj[];
}

export interface MenuControl {
  icon: string;
  onClick: (() => boolean) | (() => Promise<void>);
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
  leftPanelIsClosed: boolean;
  setItems: (items: FileObj[]) => void;
  setCurrentNote: (note: Note | null) => void;
  setOpenFolder: (folderId: string) => void
  toggleOpenFolder: (folderId: string) => void;
  setStatus: (status: string | null) => void;
  setShowNewItemForm: (value: "note" | "folder" | null) => void;
  setLeftPanelIsClosed: (value: any) => void;
}

export interface TitleBarContextType {
  windowTitle: string;
  isMaximized: boolean;
  isOnTop: boolean;
  handleMinimize: () => Promise<void>;
  handleMaximize: () => Promise<void>;
  handleOnTop: () => Promise<void>;
  handleExit: () => Promise<void>;
}

export interface itemStateType {
  itemName?: string;
  toRename?: boolean;
  context?: boolean;
  xYPosistion?: { x: number; y: number };
}

export type CustomIconProps<T extends SVGElement> = SVGProps<T> & {
  title?: string;
  size?: string | number;
};
