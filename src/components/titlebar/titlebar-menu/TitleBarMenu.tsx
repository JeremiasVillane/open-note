import {
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function TitleBarMenu() {
  const { t, i18n } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  const menuItemStyles = `cursor-default ${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;
  const menuTitleStyles = `overlook py-1 px-2 rounded-sm ${menuItemStyles}`;

  return (
    <>
      <Menu position="bottom-start" shadow="md" offset={3}>
        <Menu.Target>
          <UnstyledButton className="cursor-default">
            <Text
              inline
              size="sm"
              className={menuTitleStyles}
              data-text={t("File")}
            />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="shadow-lg whitespace-nowrap">
          <Menu.Item
            onClick={() => null}
            className={menuItemStyles}
            rightSection={<Text size="xs">Ctrl + N</Text>}
          >
            <Text
              inline
              size="sm"
              className="overlook"
              data-text={t("New note")}
            />
          </Menu.Item>

          <Menu.Item
            onClick={() => null}
            className={menuItemStyles}
            rightSection={<Text size="xs">Ctrl + Shift + F</Text>}
          >
            <Text
              inline
              size="sm"
              className="overlook"
              data-text={t("New folder")}
            />
          </Menu.Item>

          <Menu.Item
            onClick={() => null}
            className={menuItemStyles}
            rightSection={<Text size="xs">Ctrl + W</Text>}
          >
            <Text
              inline
              size="sm"
              className="overlook"
              data-text={t("Close note")}
            />
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            onClick={() => null}
            className={menuItemStyles}
            rightSection={
              <Text size="xs" className="whitespace-nowrap">
                Ctrl + Shift + R
              </Text>
            }
          >
            <Text
              inline
              size="sm"
              className="overlook"
              data-text={t("Reload")}
            />
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            onClick={() => null}
            rightSection={<Text size="xs">Alt + F4</Text>}
            className={menuItemStyles}
          >
            <Text inline size="sm" className="overlook" data-text={t("Exit")} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Menu position="bottom-start" shadow="md" width={200} offset={3}>
        <Menu.Target>
          <UnstyledButton className="cursor-default">
            <Text
              inline
              size="sm"
              className={menuTitleStyles}
              data-text={t("Edit")}
            />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="shadow-lg">
          <Menu.Item
            onClick={() => null}
            className={menuItemStyles}
            rightSection={<Text size="xs">Ctrl + Z</Text>}
          >
            <Text inline size="sm" className="overlook" data-text={t("Undo")} />
          </Menu.Item>

          <Menu.Item
            onClick={() => null}
            className={menuItemStyles}
            rightSection={<Text size="xs">Ctrl + Shift + Z</Text>}
          >
            <Text inline size="sm" className="overlook" data-text={t("Redo")} />
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            onClick={() => null}
            className={menuItemStyles}
            rightSection={<Text size="xs">Ctrl + X</Text>}
          >
            <Text inline size="sm" className="overlook" data-text={t("Cut")} />
          </Menu.Item>

          <Menu.Item
            onClick={() => null}
            className={menuItemStyles}
            rightSection={<Text size="xs">Ctrl + C</Text>}
          >
            <Text inline size="sm" className="overlook" data-text={t("Copy")} />
          </Menu.Item>

          <Menu.Item
            onClick={() => null}
            className={menuItemStyles}
            rightSection={<Text size="xs">Ctrl + V</Text>}
          >
            <Text
              inline
              size="sm"
              className="overlook"
              data-text={t("Paste")}
            />
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            className={`${menuItemStyles} py-[inherit]`}
            rightSection={<i className="ri-arrow-right-s-line text-lg" />}
          >
            <Menu
              trigger="hover"
              position="right-start"
              shadow="md"
              offset={40}
            >
              <Menu.Target>
                <Text
                  inline
                  size="sm"
                  className={`overlook ${menuItemStyles}`}
                  data-text={t("Preferences")}
                />
              </Menu.Target>

              <Menu.Dropdown className="shadow-lg">
                <LanguageToggle i18n={i18n} menuItemStyles={menuItemStyles} />
                <ThemeToggle menuItemStyles={menuItemStyles} />
              </Menu.Dropdown>
            </Menu>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Menu position="bottom-start" shadow="md" width={150} offset={3}>
        <Menu.Target>
          <UnstyledButton className="cursor-default">
            <Text
              inline
              size="sm"
              className={menuTitleStyles}
              data-text={t("Help")}
            />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="shadow-lg">
          <Menu.Item onClick={() => null} className={menuItemStyles}>
            <Text
              inline
              size="sm"
              className="overlook"
              data-text={t("Welcome")}
            />
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item onClick={() => null} className={menuItemStyles}>
            <Text
              inline
              size="sm"
              className="overlook"
              data-text={t("About")}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
