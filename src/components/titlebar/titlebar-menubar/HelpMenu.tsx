import { Menu, Text, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";

/**
 * Renders a HelpMenu component.
 *
 * @param {Object} props - The properties of the HelpMenu component.
 * @param {string} props.menuItemStyles - The styles for the menu items.
 * @param {string} props.menuTitleStyles - The styles for the menu title.
 * @returns {JSX.Element} The rendered HelpMenu component.
 */
export default function HelpMenu({
  menuItemStyles,
  menuTitleStyles,
}: {
  menuItemStyles: string;
  menuTitleStyles: string;
}): JSX.Element {
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
          <Text inline size="sm" className="overlook" data-text={t("About")} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
