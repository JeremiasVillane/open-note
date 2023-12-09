import { Menu, Text, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";
import LanguageSubMenu from "./LanguageSubMenu";
import ThemeSubMenu from "./ThemeSubMenu";

export default function EditMenu({
  menuItemStyles,
  menuTitleStyles,
}: {
  menuItemStyles: string;
  menuTitleStyles: string;
}) {
  const { i18n, t } = useTranslation();

  return (
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
          <Text inline size="sm" className="overlook" data-text={t("Paste")} />
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          className={`${menuItemStyles} py-[inherit]`}
          rightSection={<i className="ri-arrow-right-s-line text-lg" />}
        >
          <Menu trigger="hover" position="right-start" shadow="md" offset={40}>
            <Menu.Target>
              <Text
                inline
                size="sm"
                className={`overlook ${menuItemStyles}`}
                data-text={t("Preferences")}
              />
            </Menu.Target>

            <Menu.Dropdown className="shadow-lg">
              <LanguageSubMenu i18n={i18n} menuItemStyles={menuItemStyles} />
              <ThemeSubMenu menuItemStyles={menuItemStyles} />
            </Menu.Dropdown>
          </Menu>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
