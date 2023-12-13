import { join } from "@tauri-apps/api/path";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleCreate, loadFiles } from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";

/**
 * Renders a form for creating a new item.
 *
 * @param {Object} props - The props object.
 * @param {string} props.itemType - The type of the item (note or folder).
 * @param {string} props.path - The path of the item.
 * @param {string} props.parentId - The ID of the parent item.
 * @param {Dispatch<SetStateAction<Record<string, string>>>} [props.setNewItem] - Optional setter function used here to hide the new item form if it was called within a subfolder.
 * @return {JSX.Element} The JSX element representing the new item form.
 */
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
  const { appFolder } = useTauriContext();
  const [itemName, setItemName] = useState<string>("");
  const { setItems, setStatus, setShowNewItemForm } = useNotesStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFolder = itemType === "folder";
    const filePath = await join(path, isFolder ? itemName : `${itemName}.on`);

    await handleCreate(filePath, isFolder, setStatus, t);
    await loadFiles(appFolder, setItems);

    setItemName("");
    parentId === "root" ? setShowNewItemForm(null) : setNewItem!({});
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
