import { Resource } from "i18next";
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
  leftPanelIsClosed: boolean;
  setItems: (items: FileObj[]) => void;
  setCurrentNote: (note: Note | null) => void;
  setOpenFolder: (folderId: string) => void;
  setStatus: (status: string | null) => void;
  setShowNewItemForm: (value: "note" | "folder" | null) => void;
  setLeftPanelIsClosed: (value: any) => void;
}

export type I18nType = {
  options?: {
    resources: Resource | undefined;
  };
  resolvedLanguage: string;
  changeLanguage: (language: string) => void;
};

export type CustomIconProps<T extends SVGElement> = SVGProps<T> & {
  title?: string;
  size?: string | number;
};
