import { Menu, Text, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";

export default function HelpMenu({
  menuItemStyles,
  menuTitleStyles,
}: {
  menuItemStyles: string;
  menuTitleStyles: string;
}) {
  const { t } = useTranslation();

  return (
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
          <Text inline size="sm" className="overlook" data-text={t("About")} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
