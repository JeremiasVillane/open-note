import { Menu, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { OptionsIcon } from "./icons";

export function FileMenu({
  handleClose,
  handleDelete,
}: {
  handleClose: () => void;
  handleDelete: () => void;
}) {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  const menuItemStyles = `${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;

  return (
    <Menu position="bottom-start" shadow="sm">
      <Menu.Target>
        <UnstyledButton>
          <OptionsIcon size={21} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg">
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
