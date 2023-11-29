import { Menu, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { OptionsIcon } from "./icons";
import { Dispatch, SetStateAction } from "react";
import { FileObj } from "../../types";

export function FolderMenu({
  folder,
  newFile,
  setNewFile,
}: {
  folder: FileObj;
  newFile: Record<string, boolean>;
  setNewFile: Dispatch<SetStateAction<Record<string, boolean>>>;
}) {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  const menuItemStyles = `${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;

  const handleCreateFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    folderId: string
  ) => {
    e.stopPropagation();

    setNewFile({
      [folderId]: true,
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
          onClick={(e) => handleCreateFile(e, folder.id)}
        >
          {t("New note")}
        </Menu.Item>
        <Menu.Item className={menuItemStyles}>{t("New folder")}</Menu.Item>
        <Menu.Item className={`${menuItemStyles} text-red-600`}>
          {t("Delete folder")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
