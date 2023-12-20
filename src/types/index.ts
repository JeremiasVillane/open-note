import { TransitionProps } from "@mantine/core";
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
  showNewItemForm: "note" | "folder" | null;
  setItems: (items: FileObj[]) => void;
  setCurrentNote: (note: Note | null) => void;
  setOpenFolder: (folderId: string) => void;
  toggleOpenFolder: (folderId: string) => void;
  setShowNewItemForm: (value: "note" | "folder" | null) => void;
}

export interface UiState {
  status: string | null;
  leftPanelIsClosed: boolean;
  activeModal: boolean | undefined;
  setStatus: (status: string | null) => void;
  setLeftPanelIsClosed: (value: any) => void;
  setActiveModal: (value: boolean) => void;
}

export interface ModalProps {
  type?: "info" | "success" | "error" | "warning" | undefined;
  path: string;
  title: string;
  content: string | React.ReactElement | JSX.Element;
  modalProps?: {
    displayIcon?: boolean;
    buttons?: {
      display?: boolean;
      okButton?: {
        display?: boolean;
        customText?: string | undefined;
      };
      cancelButton?: {
        display?: boolean;
        customText?: string | undefined;
      };
    };
  };
}

export interface TitleBarContextType {
  windowTitle: string;
  isMaximized: boolean;
  isOnTop: boolean;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  transitionProps?: Partial<Omit<TransitionProps, "mounted">>;
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
