import * as fs from "@tauri-apps/api/fs";
import { nanoid } from "nanoid";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";

export function NewItemForm({
  itemType,
  path,
  parentId,
  setNewItem,
}: {
  itemType: string;
  path: string;
  parentId: string;
  setNewItem?: Dispatch<SetStateAction<Record<string, string>>>;
}): JSX.Element {
  const { t } = useTranslation();
  const [itemName, setItemName] = useState<string>("");
  const { addItem, setShowNewItemForm, setStatus } = useNotesStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = nanoid();
    const isFolder = itemType === "folder";

    if (parentId !== "root") {
      let parentContent = JSON.parse(
        await fs.readTextFile(`${path}\\${parentId}`)
      );
      parentContent = {
        ...parentContent,
        children: [...parentContent.children, id],
      };

      await fs.writeTextFile(
        `${path}\\${parentId}`,
        JSON.stringify(parentContent)
      );
    }

    let newItemObj: FileObj = {
      id,
      name: itemName,
      parent: parentId,
      tags: [],
      isFolder,
    };

    isFolder
      ? (newItemObj = { ...newItemObj, children: [] })
      : (newItemObj = { ...newItemObj, content: "" });

    await fs.writeTextFile(`${path}\\${id}`, JSON.stringify(newItemObj));

    setItemName("");
    addItem(parentId, newItemObj);
    

    parentId === "root" ? setShowNewItemForm(null) : setNewItem!({});

    setStatus(t(isFolder ? "FolderCreated" : "NoteCreated"));
  };
  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        autoFocus
        name="new-item-field"
        id="new-item-field"
        placeholder={t(itemType === "note" ? "New note" : "New folder")}
        autoComplete="off"
        className="py-1 bg-[var(--mantine-color-gray-light)] p-3 w-full border-none outline-none"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setItemName(e.target.value)
        }
        value={itemName}
      />
      <i
        className="ri-close-circle-line absolute text-lg translate-y-[12%] right-1 cursor-pointer hover:text-red-800 transition-colors ease-in-out duration-150"
        onClick={() =>
          parentId === "root" ? setShowNewItemForm(null) : setNewItem!({})
        }
        title={t("Cancel")}
      ></i>
      <button type="submit" className="hidden" />
    </form>
  );
}
