import { FileObj } from "../types";

export function renameItemRecursively(
  fileList: FileObj[],
  targetId: string,
  newName: string,
  currentPath: string,
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>
) {
  return fileList.map((item) => {
    if (item.id === targetId) {
      const newPath = `${currentPath
        .split("\\")
        .slice(0, -1)
        .join("\\")}\\${newName}`;

      item.name = newName;
      item.path = newPath;
      setCurrentPath(newPath);

      // TODO: make it recursive
      if (item.children) {
        item.children.forEach((subitem) => {
          subitem.path = `${newPath}\\${subitem.name}`;
        });
      }
    } else if (item.children) {
      item.children = renameItemRecursively(
        item.children,
        targetId,
        newName,
        currentPath,
        setCurrentPath
      );
    }
    return item;
  });
}
