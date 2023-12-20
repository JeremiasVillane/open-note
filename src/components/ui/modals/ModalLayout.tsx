import { Button, useMantineColorScheme } from "@mantine/core";
import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ModalType } from "@/types";

/**
 * Renders a modal layout with specified type, content, and modal properties.
 *
 * @param {object} props - The props object.
 * @param {string} props.type - The type of the modal layout ("info", "success", "error" or "warning").
 * @param {ReactNode} props.content - The content to be displayed in the modal layout.
 * @param {ModalProps} props.modalProps - The optional modal properties.
 * @returns {ReactElement} The rendered modal layout.
 */
export function ModalLayout({
  type,
  content,
  modalProps = {
    buttons: {
      display: true,
      okButton: {
        display: true,
      },
      cancelButton: {
        display: true,
      },
    },
  },
}: Omit<ModalType, "path" | "title">): React.ReactElement {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const { icon, buttons } = modalProps;

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
      {type ? (
        <section id="icon" className="flex items-start">
          {type === "info" ? (
            <i
              className="ri-information-2-fill text-blue-400 text-5xl p-3"
              style={icon?.style ?? {}}
            ></i>
          ) : type === "success" ? (
            <i
              className="ri-checkbox-circle-fill text-green-400 text-5xl p-3"
              style={icon?.style ?? {}}
            ></i>
          ) : type === "error" ? (
            <i
              className="ri-close-circle-fill text-red-400 text-5xl p-3"
              style={icon?.style ?? {}}
            ></i>
          ) : type === "warning" ? (
            <i
              className="ri-alert-fill text-yellow-400 text-5xl p-3"
              style={icon?.style ?? {}}
            ></i>
          ) : null}
          <article className="ml-2 mr-1 self-center">{content}</article>
        </section>
      ) : (
        content
      )}

      {buttons?.display ? (
        <section className="flex items-center justify-center gap-5 mt-3 w-full h-full border-t border-[var(--mantine-color-gray-light)]">
          {buttons?.okButton?.display ? (
            <Button
              className={modalButtonsStyles}
              style={buttons.okButton.style ?? {}}
              onClick={() => handleButton("ok")}
            >
              {buttons.okButton.customText ?? t("OK")}
            </Button>
          ) : null}

          {buttons?.cancelButton?.display ? (
            <Button
              className={modalButtonsStyles}
              style={buttons.cancelButton.style ?? {}}
              onClick={() => handleButton("cancel")}
            >
              {buttons.cancelButton.customText ?? t("Cancel")}
            </Button>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}
