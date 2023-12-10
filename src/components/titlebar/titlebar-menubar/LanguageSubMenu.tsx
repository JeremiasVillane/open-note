import { Menu, Text } from "@mantine/core";
import { t } from "i18next";
import { I18nType } from "../../../types";

export default function LanguageSubMenu({
  i18n,
  menuItemStyles,
}: {
  i18n: I18nType | any;
  menuItemStyles: string;
}) {
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
            data-text={t("Language")}
          />
        </Menu.Item>
      </Menu.Target>
      <Menu.Dropdown className="shadow-lg">{langMenu}</Menu.Dropdown>
    </Menu>
  );
}
