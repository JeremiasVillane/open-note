import { Anchor, Text } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { Resource } from "i18next";
import { Fragment } from "react";

type I18nType = {
  options?: {
    resources: Resource | undefined;
  };
  resolvedLanguage: string;
  changeLanguage: (language: string) => void;
};

export function LanguageToggle({ i18n }: { i18n: I18nType | any }) {
  const languages = Object.keys(i18n.options.resources!);
  if (languages.length == 1) return <></>;
  const lang = i18n.resolvedLanguage;
  let nextLangIdx = 0;

  function cycleLang() {
    if (nextLangIdx == languages.length) nextLangIdx = 0;
    i18n.changeLanguage(languages[nextLangIdx]);
  }

  const header = languages.map((supportedLang, index) => {
    const selectedLang = lang === supportedLang;
    if (selectedLang) nextLangIdx = index + 1;
    return (
      <Fragment key={index}>
        {selectedLang ? (
          <Text>{supportedLang.toUpperCase()}</Text>
        ) : (
          <Anchor onClick={() => i18n.changeLanguage(supportedLang)}>
            {supportedLang.toUpperCase()}
          </Anchor>
        )}
        <Text>{index < languages.length - 1 && "|"}</Text>
      </Fragment>
    );
  });
  useHotkeys([["Ctrl+L", cycleLang]]);
  return header;
}
