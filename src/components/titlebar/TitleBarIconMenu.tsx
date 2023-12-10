import {
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import AppIcon from "../../../src-tauri/icons/32x32.png";
import {
  CloseIcon,
  MaximizeIcon,
  MinimizeIcon,
  RestoreIcon,
} from "../ui/icons";
import { useState } from "react";
import { useHotkeys } from "@mantine/hooks";

export default function TitleBarIconMenu({
  handleMinimize,
  handleRestore,
  handleMaximize,
  handleAlwaysOnTop,
  handleClose,
  isOnTop,
  isMaximized,
}: {
  handleMinimize: () => void;
  handleRestore: () => void;
  handleMaximize: () => void;
  handleAlwaysOnTop: () => Promise<void>;
  handleClose: () => Promise<void>;
  isOnTop: boolean;
  isMaximized: boolean;
}) {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);

  useHotkeys([["ctrl+Space", () => setOpened(!opened)]], undefined, true);

  const menuItemStyles = `cursor-default ${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      shadow="md"
      width={180}
      offset={4}
    >
      <Menu.Target>
        <UnstyledButton className="cursor-default" onDoubleClick={handleClose}>
          <img className="h-5 w-5 ml-2 flex-shrink-0" src={AppIcon} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg">
        <Menu.Item
          onClick={handleMinimize}
          leftSection={<MinimizeIcon size={14} />}
          className={menuItemStyles}
        >
          <Text
            inline
            size="sm"
            className="overlook"
            data-text={t("Minimize")}
          />
        </Menu.Item>

        <Menu.Item
          onClick={isMaximized ? handleRestore : handleMaximize}
          leftSection={
            isMaximized ? <RestoreIcon size={14} /> : <MaximizeIcon size={14} />
          }
          className={menuItemStyles}
        >
          <Text
            inline
            size="sm"
            className="overlook"
            data-text={t(isMaximized ? "Restore" : "Maximize")}
          />
        </Menu.Item>

        <Menu.Item
          onClick={handleAlwaysOnTop}
          leftSection={
            isOnTop ? (
              <i className="ri-layout-top-2-fill" />
            ) : (
              <i className="ri-layout-top-line" />
            )
          }
          className={menuItemStyles}
        >
          <Text inline size="sm" className="overlook" data-text={t("On top")} />
        </Menu.Item>

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
          <Text inline size="sm" className="overlook" data-text={t("Close")} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
