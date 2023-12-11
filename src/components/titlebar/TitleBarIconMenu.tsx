import {
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import AppIcon from "../../../src-tauri/icons/32x32.png";
import {
  CloseIcon,
  MaximizeIcon,
  MinimizeIcon,
  RestoreIcon,
} from "../ui/icons";
import TitleBarContext from "./TitleBarProvider";

export default function TitleBarIconMenu() {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const {
    isMaximized,
    isOnTop,
    handleMinimize,
    handleMaximize,
    handleOnTop,
    handleExit,
  } = useContext(TitleBarContext);

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
        <UnstyledButton className="cursor-default" onDoubleClick={handleExit}>
          <img className="h-5 w-5 ml-2 flex-shrink-0" src={AppIcon} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg">
        <Menu.Item
          onClick={handleMinimize}
          leftSection={<MinimizeIcon size={11} />}
          className={menuItemStyles}
        >
          <Text
            inline
            size="xs"
            className="overlook ml-0.5"
            data-text={t("Minimize")}
          />
        </Menu.Item>

        <Menu.Item
          onClick={handleMaximize}
          leftSection={
            isMaximized ? <RestoreIcon size={11} /> : <MaximizeIcon size={9} />
          }
          className={`${menuItemStyles} ml-0.5`}
        >
          <Text
            inline
            size="xs"
            className="overlook ml-0.5"
            data-text={t(isMaximized ? "Restore" : "Maximize")}
          />
        </Menu.Item>

        <Menu.Item
          onClick={handleOnTop}
          leftSection={
            isOnTop ? (
              <i className="ri-layout-top-2-fill text-sm" />
            ) : (
              <i className="ri-layout-top-line text-sm" />
            )
          }
          className={menuItemStyles}
        >
          <Text inline size="xs" className="overlook" data-text={t("On top")} />
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={handleExit}
          leftSection={<CloseIcon size={9} />}
          rightSection={
            <Text w="bold" size="xs">
              Alt + F4
            </Text>
          }
          className={`${menuItemStyles} ml-0.5`}
        >
          <Text
            inline
            size="xs"
            className="overlook ml-0.5"
            data-text={t("Close")}
          />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
