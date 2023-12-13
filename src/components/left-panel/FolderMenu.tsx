import { Paper, UnstyledButton } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { loadFiles } from "../../helpers";
import { handleDelete } from "../../helpers/handle-delete";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { FileObj, itemStateType } from "../../types";
import { useHotkeys } from "@mantine/hooks";

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
}) {
  const { t } = useTranslation();
  const { appFolder } = useTauriContext();
  const { setStatus, setItems, setOpenFolder } = useNotesStore();

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
        await handleDelete(e, "folder", setStatus, folder.path, t);
        await loadFiles(appFolder, setItems);
        updateItemState({ context: false });
      },
      label: "Delete folder",
    },
  ];

  return (
    <Paper shadow="md" className="flex flex-col p-1 z-50">
      {controls.map((control, index) => (
        <UnstyledButton
          key={index}
          onClick={control.onClick}
          className={`${menuItemStyles} ${
            index === controls.length - 1 ? "text-red-600" : ""
          }`}
        >
          {t(control.label)}
        </UnstyledButton>
      ))}
    </Paper>
  );
}
