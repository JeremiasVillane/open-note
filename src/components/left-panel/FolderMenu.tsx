import { useHotkeys } from "@mantine/hooks";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { handleDelete, loadFiles } from "@/helpers";
import { useTauriContext } from "@/providers/tauri-provider";
import { useNotesStore } from "@/store/notesStore";
import { useUiStore } from "@/store/uiStore";
import { FileObj, ItemStateType } from "@/types";
import ContextMenu from "./ContextMenu";

/**
 * Renders a folder menu component.
 *
 * @param {object} props - The props object.
 * @param {string} props.menuItemStyles - the styles for the menu items
 * @param {FileObj} props.folder - the folder object
 * @param {Dispatch<SetStateAction<Record<string, string>>>} props.setNewItem - the function to set a new item
 * @param {React.Dispatch<ItemStateType>} props.updateItemState - the function to update the item state
 * @return {React.ReactElement} - the rendered folder menu component
 */
export default function FolderMenu({
  menuItemStyles,
  folder,
  setNewItem,
  updateItemState,
}: {
  menuItemStyles: string;
  folder: FileObj;
  setNewItem: Dispatch<SetStateAction<Record<string, string>>>;
  updateItemState: React.Dispatch<ItemStateType>;
}): React.ReactElement {
  const { t } = useTranslation();
  const { appFolder } = useTauriContext();
  const { setItems, setOpenFolder } = useNotesStore();
  const { setActiveModal } = useUiStore();
  const { setStatus } = useUiStore();

  const handleCreate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    folderId: string,
    itemType: string
  ) => {
    e.stopPropagation();

    setNewItem({
      [folderId]: itemType,
    });
  };

  useHotkeys(
    [["escape", () => updateItemState({ context: false })]],
    undefined,
    true
  );

  const controls = [
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        updateItemState({ toRename: true, context: false });
      },
      label: "Rename",
    },
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleCreate(e, folder.id, "note");
        setOpenFolder(folder.id);
        updateItemState({ context: false });
      },
      label: "New note",
    },
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleCreate(e, folder.id, "folder");
        setOpenFolder(folder.id);
        updateItemState({ context: false });
      },
      label: "New folder",
    },
    {
      onClick: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await handleDelete(
          e,
          "folder",
          setStatus,
          folder.path,
          t,
          setActiveModal,
          () => loadFiles(appFolder, setItems)
        );
        updateItemState({ context: false });
      },
      label: "Delete folder",
    },
  ];

  return <ContextMenu controls={controls} menuItemStyles={menuItemStyles} />;
}
