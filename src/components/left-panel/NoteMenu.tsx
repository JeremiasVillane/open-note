import { Menu, UnstyledButton } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { OptionsIcon } from "../ui/icons";

export default function NoteMenu({
  menuItemStyles,
  setToRename,
  handleClose,
  handleDelete,
}: {
  menuItemStyles: string;
  setToRename: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
  handleDelete: () => void;
}) {
  const { t } = useTranslation();

  useHotkeys([["f2", () => setToRename(true)]]);

  return (
    <Menu position="bottom-start" shadow="sm">
      <Menu.Target>
        <UnstyledButton>
          <OptionsIcon size={21} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg">
        <Menu.Item onClick={() => setToRename(true)} className={menuItemStyles}>
          {t("Rename")}
        </Menu.Item>

        <Menu.Item
          onClick={async () => handleClose()}
          className={menuItemStyles}
        >
          {t("Close")}
        </Menu.Item>

        <Menu.Item
          onClick={async () => handleDelete()}
          className={`${menuItemStyles} text-red-600`}
        >
          {t("Delete")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
