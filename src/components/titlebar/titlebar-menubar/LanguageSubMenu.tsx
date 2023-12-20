import { Menu, Text } from "@mantine/core";
import { i18n, t } from "i18next";
import { useContext } from "react";
import TitleBarContext from "../../../providers/titlebar-provider";

/**
 * Renders the language submenu component.
 *
 * @param {Object} props - The component props.
 * @param {i18n} props.i18n - The i18n object.
 * @param {string} props.menuItemStyles - The CSS styles for the menu item.
 * @return {React.ReactElement} The rendered language submenu.
 */
export default function LanguageSubMenu({
  i18n,
  menuItemStyles,
}: {
  i18n: i18n;
  menuItemStyles: string;
}): React.ReactElement {
  const languages = Object.keys(i18n?.options?.resources!);
  const { transitionProps } = useContext(TitleBarContext);

  const langMenu = languages.map((supportedLang, index) => {
    return (
      <Menu.Item
        key={index}
        onClick={() => i18n.changeLanguage(supportedLang)}
        className={`${menuItemStyles} py-1`}
      >
        <Text
          inline
          size="sm"
          className="overlook"
          data-text={supportedLang.toUpperCase()}
        />
      </Menu.Item>
    );
  });

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
            data-text={t("Language")}
          />
        </Menu.Item>
      </Menu.Target>
      <Menu.Dropdown className="shadow-lg">{langMenu}</Menu.Dropdown>
    </Menu>
  );
}
