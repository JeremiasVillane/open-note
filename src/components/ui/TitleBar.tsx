import {
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { appWindow } from "@tauri-apps/api/window";
import { useCallback, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppIcon from "../../../src-tauri/icons/32x32.png";
import { CloseIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from "./icons";

export function Titlebar() {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [windowTitle, setWindowTitle] = useState<string>("");

  useLayoutEffect(() => {
    appWindow.isMaximized().then(setIsMaximized);
    appWindow.title().then((title) => {
      if (windowTitle !== title) setWindowTitle(title);
    });
  }, []);

  const handleMinimize = useCallback(() => {
    appWindow.minimize();
  }, [appWindow]);

  const handleMaximize = useCallback(() => {
    appWindow.toggleMaximize();
    setIsMaximized(true);
  }, [appWindow, setIsMaximized]);

  const handleRestore = useCallback(() => {
    appWindow.toggleMaximize();
    setIsMaximized(false);
  }, [appWindow, setIsMaximized]);

  const handleClose = () => appWindow.close();

  const buttonStyles =
    "inline-flex items-center justify-center w-12 h-[var(--titlebar-height)] transition-colors duration-200 cursor-pointer";
  const buttonStylesOnHover =
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-slate-400";
  return (
    <div
      id="titlebar"
      className="h-[var(--titlebar-height)] flex justify-between fixed select-none top-0 left-0 right-0 z-[999]"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? "var(--mantine-color-dark-8)"
            : "var(--mantine-color-gray-1)",
      }}
      data-tauri-drag-region
    >
      <div className="flex items-center">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <UnstyledButton style={{ cursor: "default" }}>
              <img className="h-5 w-5 mx-2 flex-shrink-0" src={AppIcon} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={handleMinimize}
              leftSection={<MinimizeIcon size={14} />}
            >
              {t("Minimize")}
            </Menu.Item>
            {isMaximized ? (
              <Menu.Item
                onClick={handleRestore}
                leftSection={<RestoreIcon size={14} />}
              >
                {t("Restore")}
              </Menu.Item>
            ) : (
              <Menu.Item
                onClick={handleMaximize}
                leftSection={<MaximizeIcon size={14} />}
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
            >
              {t("Close")}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Text data-tauri-drag-region inline size="xs">
          {windowTitle}
        </Text>
      </div>

      <div className="flex items-center">
        <i
          className={`${buttonStyles} ${buttonStylesOnHover}`}
          onClick={handleMinimize}
        >
          <MinimizeIcon title={t("Minimize")} size={18} className="p-0.5" />
        </i>

        {isMaximized ? (
          <i
            className={`${buttonStyles} ${buttonStylesOnHover}`}
            onClick={handleRestore}
          >
            <RestoreIcon title={t("Restore")} size={18} className="p-0.5" />
          </i>
        ) : (
          <i
            onClick={handleMaximize}
            className={`${buttonStyles} ${buttonStylesOnHover}`}
          >
            <MaximizeIcon title={t("Maximize")} size={18} className="p-0.5" />
          </i>
        )}

        <i
          className={`${buttonStyles} hover:bg-red-500 hover:text-gray-100`}
          onClick={handleClose}
        >
          <CloseIcon title={t("Close")} size={18} className="p-0.5" />
        </i>
      </div>
    </div>
  );
}
