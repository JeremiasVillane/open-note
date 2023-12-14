import { Image, Kbd, Popover, useMantineColorScheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { APP_AUTHOR, APP_NAME, APP_VERSION } from "../../constants";
import { GitHubIcon, LinkedInIcon } from "../ui/icons";

/**
 * Renders the Welcome component.
 *
 * @return {JSX.Element} The rendered Welcome component.
 */
export default function Welcome(): JSX.Element {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  const linkStyle =
    "cursor-pointer hover:text-blue-300 active:scale-95 transition-colors ease-in-out duration-300";

  return (
    <main className="flex lg:flex-row flex-col gap-3 items-center justify-center h-[86vh] text-slate-400">
      <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col text-center">
          <Image
            src={"/open-note.png"}
            h={300}
            w="auto"
            className="saturate-50 opacity-50"
            draggable="false"
          />
          <article>
            <p aria-label="Application name" className="font-black text-3xl">
              {APP_NAME}
            </p>
            <div className="font-mono">
              (v. {APP_VERSION}){" "}
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <span className={`font-semibold ${linkStyle}`}>INFO</span>
                </Popover.Target>
                <Popover.Dropdown className="text-sm text-center select-none">
                  <p>
                    {t("Powered by")}{" "}
                    <a
                      className="text-blue-400 hover:underline"
                      href="https://tauri.app"
                      title="https://tauri.app"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      Tauri
                    </a>
                  </p>
                  <p>{t("AboutInfo")}</p>
                </Popover.Dropdown>
              </Popover>
            </div>
          </article>
          <article className="text-sm">
            <em>
              {t("Developed by")} {APP_AUTHOR}
            </em>
          </article>
        </div>

        <div className="flex gap-5 p-2 text-slate-400">
          <a
            aria-label="GitHub button"
            href="https://snppr.vercel.app/r0nyEBaLC"
            rel="noreferrer noopener"
            target="_blank"
            draggable="false"
          >
            <GitHubIcon
              size={21}
              title="https://github.com/JeremiasVillane"
              className={linkStyle}
              colorscheme={colorScheme}
            />
          </a>

          <a
            aria-label="LinkedIn button"
            href="https://snppr.vercel.app/2Vt7W2xMe"
            rel="noreferrer noopener"
            target="_blank"
            draggable="false"
          >
            <LinkedInIcon size={21} title="https://www.linkedin.com/in/jeremias-villane" className={linkStyle} />
          </a>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 text-sm leading-9">
        <div className="text-right">
          <p>{t("New note")}</p>
          <p>{t("New folder")}</p>
          <p>{t("Toggle explorer")}</p>
          <p>{t("Reload explorer")}</p>
          <p>{t("Switch language")}</p>
          <p>{t("Dark/Light theme")}</p>
        </div>

        <div>
          <p>
            <Kbd>Ctrl</Kbd> + <Kbd>N</Kbd>
          </p>
          <p>
            <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>F</Kbd>
          </p>
          <p>
            <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>E</Kbd>
          </p>
          <p>
            <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>R</Kbd>
          </p>
          <p>
            <Kbd>Ctrl</Kbd> + <Kbd>L</Kbd>
          </p>
          <p>
            <Kbd>Ctrl</Kbd> + <Kbd>T</Kbd>
          </p>
        </div>
      </section>
    </main>
  );
}
