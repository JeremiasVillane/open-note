import { Menu, Text, useMantineColorScheme } from "@mantine/core";
import { Suspense, lazy, useContext } from "react";
import { useTranslation } from "react-i18next";
import TitleBarContext from "@/providers/titlebar-provider";

const MenuDropdown = lazy(() =>
  import("@mantine/core").then((module) => ({ default: module.Menu.Dropdown }))
);

/**
 * Renders a ThemeSubMenu component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.menuItemStyles - The styles for the menu items.
 * @return {React.ReactElement} The rendered ThemeSubMenu component.
 */
export default function ThemeSubMenu({
  menuItemStyles,
}: {
  menuItemStyles: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const { setColorScheme } = useMantineColorScheme();
  const { transitionProps } = useContext(TitleBarContext);

  return (
    <Menu
      transitionProps={transitionProps}
      trigger="hover"
      position="right-start"
      shadow="md"
      offset={5}
    >
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

      <Suspense>
        <MenuDropdown className="shadow-lg">
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
            <Text
              inline
              size="sm"
              className={"overlook"}
              data-text={t("Dark")}
            />
          </Menu.Item>
        </MenuDropdown>
      </Suspense>
    </Menu>
  );
}
