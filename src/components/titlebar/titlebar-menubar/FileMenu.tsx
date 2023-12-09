import { Menu, Text, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";

export default function FileMenu({
  menuItemStyles,
  menuTitleStyles,
}: {
  menuItemStyles: string;
  menuTitleStyles: string;
}) {
  const { t } = useTranslation();

  return (
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
          <Text inline size="sm" className="overlook" data-text={t("Reload")} />
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
  );
}
