import { Menu, Text, TransitionProps } from "@mantine/core";
import { i18n, t } from "i18next";

/**
 * Renders the language submenu component.
 *
 * @param {Object} props - The component props.
 * @param {i18n} props.i18n - The i18n object.
 * @param {string} props.menuItemStyles - The CSS styles for the menu item.
 * @return {JSX.Element} The rendered language submenu.
 */
export default function LanguageSubMenu({
  i18n,
  menuItemStyles,
  transitionProps,
}: {
  i18n: i18n;
  menuItemStyles: string;
  transitionProps: Partial<Omit<TransitionProps, "mounted">>;
}): JSX.Element {
  const languages = Object.keys(i18n?.options?.resources!);

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
