import {
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { ReactNode, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import AppIcon from "../../../src-tauri/icons/32x32.png";
import TitleBarContext from "../../providers/titlebar-provider";
import {
  CloseIcon,
  MaximizeIcon,
  MinimizeIcon,
  RestoreIcon,
} from "../ui/icons";

/**
 * Renders a title bar icon menu component.
 *
 * @param {object} props - The props object.
 * @param {boolean} props.open - Indicates whether the menu is open.
 * @param {function} props.setOpen - A function to set the state of the open prop.
 * @param {object} props.transitionProps - Menu transition props.
 * @return {ReactNode} The rendered title bar icon menu component.
 */
export default function TitleBarIconMenu(): ReactNode {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const {
    isMaximized,
    isOnTop,
    openMenu,
    setOpenMenu,
    transitionProps,
    handleMinimize,
    handleMaximize,
    handleOnTop,
    handleExit,
  } = useContext(TitleBarContext);
  const [opened, setOpened] = useState(false);

  const menuItemStyles = `cursor-default ${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;

  return (
    <Menu
      trigger={openMenu ? "hover" : "click"}
      transitionProps={transitionProps}
      opened={opened}
      onChange={setOpened}
      shadow="md"
      width={180}
      offset={4}
    >
      <Menu.Target>
        <UnstyledButton
          className="cursor-default"
          onClick={() => {
            setOpenMenu(!openMenu);
            setOpened(!opened);
          }}
        >
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
