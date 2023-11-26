import { Menu, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { Resource, t } from "i18next";

type I18nType = {
  options?: {
    resources: Resource | undefined;
  };
  resolvedLanguage: string;
  changeLanguage: (language: string) => void;
};

export function LanguageToggle({ i18n }: { i18n: I18nType | any }) {
  const { colorScheme } = useMantineColorScheme();

  const languages = Object.keys(i18n?.options?.resources!);
  if (languages.length == 1) return <></>;
  const lang = i18n.resolvedLanguage;
  let nextLangIdx = 0;

  function cycleLang() {
    if (nextLangIdx == languages.length) nextLangIdx = 0;
    i18n.changeLanguage(languages[nextLangIdx]);
  }

  const langMenu = languages.map((supportedLang, index) => {
    const selectedLang = lang === supportedLang;
    if (selectedLang) nextLangIdx = index + 1;

    return (
      <Menu.Item
        key={index}
        onClick={() => i18n.changeLanguage(supportedLang)}
        className={`${selectedLang ? "text-violet-600" : ""} "cursor-default" ${
          colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
        } transition-colors ease-in-out font-semibold`}
      >
        {supportedLang.toUpperCase()}
      </Menu.Item>
    );
  });

  useHotkeys([["Ctrl+L", cycleLang]]);

  return (
    <Menu>
      <Menu.Target>
        <i
          className="ri-translate cursor-pointer text-xl hover:text-indigo-900 transition-colors ease-in-out duration-150"
          title={`
        ${t("Switch language")}
        Ctrl + L`}
        />
      </Menu.Target>
      <Menu.Dropdown className="shadow-lg">{langMenu}</Menu.Dropdown>
    </Menu>
  );
}
