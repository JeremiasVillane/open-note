import { i18n } from "i18next";

export function cycleLang(i18n: i18n) {
  const languages = Object.keys(i18n.options.resources!);
  const lang = i18n.language;

  let langIdx = languages.findIndex((l) => l === lang);

  langIdx += 1;

  if (langIdx == languages.length) langIdx = 0;

  i18n.changeLanguage(languages[langIdx]);
}
