import {
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import AppIcon from "../../../src-tauri/icons/32x32.png";
import { CloseIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from "./icons";

export default function TitleBarMenu({
  handleMinimize,
  handleRestore,
  handleMaximize,
  handleClose,
  isMaximized,
}: {
  handleMinimize: () => void;
  handleRestore: () => void;
  handleMaximize: () => void;
  handleClose: () => Promise<void>;
  isMaximized: boolean;
}) {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  const menuItemStyles = `cursor-default ${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton className="cursor-default">
          <img className="h-5 w-5 mx-2 flex-shrink-0" src={AppIcon} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg">
        <Menu.Item
          onClick={handleMinimize}
          leftSection={<MinimizeIcon size={14} />}
          className={menuItemStyles}
        >
          {t("Minimize")}
        </Menu.Item>

        {isMaximized ? (
          <Menu.Item
            onClick={handleRestore}
            leftSection={<RestoreIcon size={14} />}
            className={menuItemStyles}
          >
            {t("Restore")}
          </Menu.Item>
        ) : (
          <Menu.Item
            onClick={handleMaximize}
            leftSection={<MaximizeIcon size={14} />}
            className={menuItemStyles}
          >
            {t("Maximize")}
          </Menu.Item>
        )}

        <Menu.Divider />
        
        <Menu.Item
          onClick={handleClose}
          leftSection={<CloseIcon size={14} />}
          rightSection={
            <Text w="bold" size="xs">
              Alt + F4
            </Text>
          }
          className={menuItemStyles}
        >
          {t("Close")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
