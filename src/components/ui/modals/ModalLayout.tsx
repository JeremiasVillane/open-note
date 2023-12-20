import { Button, useMantineColorScheme } from "@mantine/core";
import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

/**
 * Renders a modal layout component.
 *
 * @param {object} props - The props object.
 * @param {string} props.type - The type of the modal layout. It can be "info", "success", "error", or "warning".
 * @param {string} props.content - The content to be displayed in the modal layout.
 * @return {JSX.Element} The rendered modal layout component.
 */
export function ModalLayout({
  type,
  content,
}: {
  type: "info" | "success" | "error" | "warning";
  content: string;
}): JSX.Element {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  const modalButtonsStyles = `border-2 ${
    colorScheme === "light"
      ? "border-blue-200 text-black hover:bg-blue-200 active:bg-blue-100"
      : "border-slate-600 text-white hover:bg-slate-600 active:bg-slate-500"
  } transition-colors ease-in-out duration-150`;

  const handleButton = useCallback(async (type: string) => {
    const mainWindow = WebviewWindow.getByLabel("main");
    await mainWindow?.emit(`modal-${type}`);

    await appWindow.close();
  }, []);

  return (
    <main className="modalLayoutStyles">
      <section className="flex items-center px-1">
        {type === "info" ? (
          <i className="ri-information-2-fill text-blue-400 text-5xl p-3"></i>
        ) : type === "success" ? (
          <i className="ri-checkbox-circle-fill text-green-400 text-5xl p-3"></i>
        ) : type === "error" ? (
          <i className="ri-close-circle-fill text-red-400 text-5xl p-3"></i>
        ) : type === "warning" ? (
          <i className="ri-alert-fill text-yellow-400 text-5xl p-3"></i>
        ) : null}
        <article className="ml-2">{content}</article>
      </section>

      <section className="flex items-center justify-center gap-5 mt-3 w-full h-full border-t border-[var(--mantine-color-gray-light)]">
        <Button
          className={modalButtonsStyles}
          onClick={() => handleButton("ok")}
        >
          {t("OK")}
        </Button>
        <Button
          className={modalButtonsStyles}
          onClick={() => handleButton("cancel")}
        >
          {t("Cancel")}
        </Button>
      </section>
    </main>
  );
}
