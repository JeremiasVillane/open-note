import { useClickOutside } from "@mantine/hooks";
import { join } from "@tauri-apps/api/path";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleCreate, loadFiles } from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { useUiStore } from "../../store/uiStore";

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
export default function NewItemForm({
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
  const { setItems, setShowNewItemForm } = useNotesStore();
  const { setStatus } = useUiStore();
  const inputRef = useClickOutside(() => closeForm());

  const closeForm = () =>
    parentId === "root" ? setShowNewItemForm(null) : setNewItem!({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFolder = itemType === "folder";
    const filePath = await join(path, isFolder ? itemName : `${itemName}.on`);

    await handleCreate(filePath, isFolder, setStatus, t);
    await loadFiles(appFolder, setItems);

    setItemName("");
    closeForm();
  };

  return (
    <div className="flex items-center ml-3">
      {itemType === "note" ? (
        <i className="ri-file-2-fill text-blue-400"></i>
      ) : (
        <i className="ri-folder-fill text-yellow-500"></i>
      )}
      <form ref={inputRef} onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          autoFocus
          name="new-item-field"
          id="new-item-field"
          placeholder={t(itemType === "note" ? "New note..." : "New folder...")}
          autoComplete="off"
          className="py-0 pl-1.5 w-full border-none outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItemName(e.target.value)
          }
          onKeyUp={(e) => e.key === "Escape" && closeForm()}
          value={itemName}
        />
        <button type="submit" className="hidden" />
      </form>
    </div>
  );
}
