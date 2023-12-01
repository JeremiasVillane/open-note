import * as fs from "@tauri-apps/api/fs";
import { TFunction } from "i18next";

export const handleRename = async (
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
  renameItem: (targetId: string, newName: string) => void
) => {
  event.preventDefault();

  if (oldName === newName) {
    setToRename(false);
    return;
  }

  const oldPath = currentPath.split("\\");
  oldPath[oldPath.length - 1] = newName;

  const newPath = oldPath.join("\\");
  setCurrentPath(newPath);

  try {
    await fs.renameFile(currentPath, newPath);
  } catch (error) {
    setStatus(t("ErrorRenaming"));
    setFileName(oldName);
    setCurrentPath(path);
    return;
  }

  renameItem(itemId, newName);
  setToRename(false);
};
