import { Menu, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { handleDelete } from "../../helpers/handle-delete";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";
import { OptionsIcon } from "./icons";

export function FolderMenu({
  folder,
  setNewItem,
  setToRename,
}: {
  folder: FileObj;
  setNewItem: Dispatch<SetStateAction<Record<string, string>>>;
  setToRename: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const { setStatus, removeItem } = useNotesStore();

  const menuItemStyles = `${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;

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
          onClick={(e) =>
            handleDelete(
              e,
              "folder",
              setStatus,
              removeItem,
              folder.path,
              folder.id,
              t
            )
          }
        >
          {t("Delete folder")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
