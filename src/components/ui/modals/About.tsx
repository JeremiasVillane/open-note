import { useTranslation } from "react-i18next";
import {
  APP_AUTHOR,
  APP_LICENSE,
  APP_NAME,
  APP_VERSION,
  REACT_VERSION,
  TAURI_VERSION,
} from "../../../constants";
import { useTauriContext } from "../../../providers/tauri-provider";

/**
 * Renders the About component, which displays information about the application.
 *
 * @return {JSX.Element} The rendered About component.
 */
export function About(): JSX.Element {
  const { t } = useTranslation();
  const { osType } = useTauriContext();

  return (
    <>
      <h1 aria-label="Application name" className="font-black text-xl mt-3">
        {APP_NAME}
      </h1>

      <article aria-label="About the application" className="mt-3 text-sm">
        <section className="text-left">
          <p>
            {t("Version")}: {APP_VERSION}
          </p>
          <p>
            {t("Author")}: {APP_AUTHOR}
          </p>
          <p>
            {t("License")}: {APP_LICENSE}
          </p>
          <p>{t("Date")}: 2023</p>
          <p className="mt-2">Tauri: {TAURI_VERSION}</p>
          <p>React: {REACT_VERSION}</p>
          <p>OS: {osType === "Windows_NT" ? "Windows" : osType}</p>
        </section>
      </article>
    </>
  );
}
