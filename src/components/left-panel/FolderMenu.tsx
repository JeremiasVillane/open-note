import { useHotkeys } from "@mantine/hooks";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { loadFiles } from "../../helpers";
import { handleDelete } from "../../helpers/handle-delete";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { useUiStore } from "../../store/uiStore";
import { FileObj, itemStateType } from "../../types";
import ContextMenu from "./ContextMenu";

/**
 * Renders a folder menu component.
 *
 * @prop {string} menuItemStyles - the styles for the menu items
 * @prop {FileObj} folder - the folder object
 * @prop {Dispatch<SetStateAction<Record<string, string>>>} setNewItem - the function to set a new item
 * @prop {React.Dispatch<itemStateType>} updateItemState - the function to update the item state
 * @return {JSX.Element} - the rendered folder menu component
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
  updateItemState: React.Dispatch<itemStateType>;
}): JSX.Element {
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
