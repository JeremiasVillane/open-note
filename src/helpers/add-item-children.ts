import { FileObj } from "../types";

export function addItemChildren(
  fileList: FileObj[],
  parentId: string,
  newItemId: string
) {
  let parent = fileList.find((item) => item.id === parentId);
  if (!parent) return fileList;
  parent = { ...parent, children: [...parent.children!, newItemId] };

  const updatedFileList = [
    ...fileList.filter((item) => item.id !== parentId),
    parent,
  ];

  const folders = updatedFileList
    .filter((item) => item.isFolder)
    .sort((a, b) => a.name.localeCompare(b.name));
  const notes = updatedFileList
    .filter((item) => !item.isFolder)
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...folders, ...notes];
}

