import * as fs from "@tauri-apps/api/fs";
import { TFunction } from "i18next";
import { Note } from "../types";

export const handleRename = async (
  itemType: string,
  event: React.FormEvent<HTMLFormElement>,
  t: TFunction<"translation", undefined>,
  itemId: string,
  oldName: string,
  newName: string,
  path: string,
  currentPath: string,
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>,
  setToRename: React.Dispatch<React.SetStateAction<boolean>>,
  setFileName: React.Dispatch<React.SetStateAction<string>>,
  setStatus: (status: string | null) => void,
  renameItem: (
    targetId: string,
    newName: string,
    currentPath: string,
    setCurrentPath: React.Dispatch<React.SetStateAction<string>>
  ) => void,
  currentNote?: Note | null,
  setCurrentNote?: (note: Note | null) => void,
  setFolderName?: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();

  if (oldName === newName) {
    setToRename(false);
    return;
  }

  const newPath = `${currentPath
    .split("\\")
    .slice(0, -1)
    .join("\\")}\\${newName}`;

  if (itemType === "note") {
    setCurrentNote!({
      ...currentNote!,
      name: newName,
      path: newPath,
    });
  }

  if (itemType === "folder") {
    setFolderName!(newName);
  }

  await fs.renameFile(currentPath, newPath).catch((error) => console.log(error));

  renameItem(itemId, newName, currentPath, setCurrentPath);
  // setCurrentPath(newPath);
  setToRename(false);
};
