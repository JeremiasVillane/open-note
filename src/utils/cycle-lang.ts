import { i18n } from "i18next";

/**
 * Updates the language in the i18n object to the next available language in the list of resources.
 *
 * @param {i18n} i18n - The i18n object.
 * @return {void} This function does not return anything.
 */
export function cycleLang(i18n: i18n): void {
  const languages = Object.keys(i18n.options.resources!);
  const lang = i18n.language;

  let langIdx = languages.findIndex((l) => l === lang);

  langIdx += 1;

  if (langIdx == languages.length) langIdx = 0;

  i18n.changeLanguage(languages[langIdx]);
}
