import { Menu, Text, useMantineColorScheme } from "@mantine/core";
import { useTranslation } from "react-i18next";

/**
 * Renders a ThemeSubMenu component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.menuItemStyles - The styles for the menu items.
 * @return {JSX.Element} The rendered ThemeSubMenu component.
 */
export default function ThemeSubMenu({
  menuItemStyles,
}: {
  menuItemStyles: string;
}): JSX.Element {
  const { t } = useTranslation();
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Menu trigger="hover" position="right-start" shadow="md" offset={5}>
      <Menu.Target>
        <Menu.Item
          className={`${menuItemStyles} py-[inherit]`}
          rightSection={<i className="ri-arrow-right-s-line text-lg" />}
        >
          <Text
            inline
            size="sm"
            className={"overlook"}
            data-text={t("Theme")}
          />
        </Menu.Item>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg">
        <Menu.Item
          className={`${menuItemStyles}`}
          onClick={() => setColorScheme("light")}
        >
          <Text
            inline
            size="sm"
            className={"overlook"}
            data-text={t("Light")}
          />
        </Menu.Item>

        <Menu.Item
          className={`${menuItemStyles}`}
          onClick={() => setColorScheme("dark")}
        >
          <Text inline size="sm" className={"overlook"} data-text={t("Dark")} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
