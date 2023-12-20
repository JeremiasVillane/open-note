import { TransitionProps } from "@mantine/core";
import React, { SVGProps } from "react";

export type FileObj = {
  id: string;
  name: string;
  path: string;
  is_folder: boolean;
  children?: FileObj[];
};

export type Note = {
  id: string;
  name: string;
  path: string;
  content: string | null;
};

export type NotesState = {
  fileList: FileObj[];
  currentNote: Note | null;
  openFolders: Record<string, boolean>;
  showNewItemForm: "note" | "folder" | null;
  setItems: (items: FileObj[]) => void;
  setCurrentNote: (note: Note | null) => void;
  setOpenFolder: (folderId: string) => void;
  toggleOpenFolder: (folderId: string) => void;
  setShowNewItemForm: (value: "note" | "folder" | null) => void;
};

export type UiState = {
  status: string | null;
  leftPanelIsClosed: boolean;
  activeModal: boolean | undefined;
  setStatus: (status: string | null) => void;
  setLeftPanelIsClosed: (value: any) => void;
  setActiveModal: (value: boolean) => void;
};

type ModalButtonType = {
  display?: boolean | undefined;
  customText?: string | undefined;
  style?: React.CSSProperties | undefined;
};

export type ModalType = {
  type?: "info" | "success" | "error" | "warning" | undefined;
  path: string;
  title: string;
  content: string | React.ReactElement;
  modalProps?: {
    icon?: {
      style?: React.CSSProperties | undefined;
    };
    buttons?: {
      display?: boolean | undefined;
      okButton?: ModalButtonType;
      cancelButton?: ModalButtonType;
    };
  };
};

export type TitleBarContextType = {
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
};

export type ItemStateType = {
  itemName?: string;
  toRename?: boolean;
  context?: boolean;
  xYPosistion?: { x: number; y: number };
};

export type MenuControl = {
  icon: string;
  onClick: (() => boolean) | (() => Promise<void>);
  title?: string;
};

export type CustomIconProps<T extends SVGElement> = SVGProps<T> & {
  title?: string;
  size?: string | number;
};
