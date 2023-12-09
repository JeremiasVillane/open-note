import { Menu, UnstyledButton } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { loadFiles } from "../../helpers";
import { handleDelete } from "../../helpers/handle-delete";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";
import { OptionsIcon } from "../ui/icons";

export default function FolderMenu({
  menuItemStyles,
  folder,
  setNewItem,
  setToRename,
}: {
  menuItemStyles: string;
  folder: FileObj;
  setNewItem: Dispatch<SetStateAction<Record<string, string>>>;
  setToRename: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const { appFolder } = useTauriContext();
  const { setStatus, setItems } = useNotesStore();

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

  return (
    <Menu position="bottom" shadow="sm">
      <Menu.Target>
        <UnstyledButton onClick={(e) => e.stopPropagation()}>
          <OptionsIcon size={21} className="absolute top-0.5 right-0" />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg">
        <Menu.Item
          className={menuItemStyles}
          onClick={(e) => {
            e.stopPropagation();
            setToRename(true);
          }}
        >
          {t("Rename")}
        </Menu.Item>

        <Menu.Item
          className={menuItemStyles}
          onClick={(e) => handleCreate(e, folder.id, "note")}
        >
          {t("New note")}
        </Menu.Item>

        <Menu.Item
          className={menuItemStyles}
          onClick={(e) => handleCreate(e, folder.id, "folder")}
        >
          {t("New folder")}
        </Menu.Item>

        <Menu.Item
          className={`${menuItemStyles} text-red-600`}
          onClick={async (e) => {
            await handleDelete(e, "folder", setStatus, folder.path, t);
            loadFiles(appFolder, setItems);
          }}
        >
          {t("Delete folder")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
