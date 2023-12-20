import { Button, useMantineColorScheme } from "@mantine/core";
import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ModalProps } from "../../../types";

/**
 * Renders a modal layout with the specified type, content, and modal properties.
 *
 * @param {object} props - The props object.
 * @param {string} props.type - The type of the modal layout (e.g., "info", "success", "error", "warning").
 * @param {string | JSX.Element} props.content - The content to be displayed in the modal layout.
 * @param {object} props.modalProps - The modal properties.
 * @param {boolean} [modalProps.displayIcon=true] - Determines whether to display an icon in the modal layout.
 * @param {object} [modalProps.buttons] - The buttons to be displayed in the modal layout.
 * @param {boolean} [modalProps.buttons.display=true] - Determines whether to display the buttons in the modal layout.
 * @param {object} [modalProps.buttons.okButton] - The OK button properties.
 * @param {boolean} [modalProps.buttons.okButton.display=true] - Determines whether to display the OK button.
 * @param {string} [modalProps.buttons.okButton.customText] - The custom text for the OK button.
 * @param {object} [modalProps.buttons.cancelButton] - The Cancel button properties.
 * @param {boolean} [modalProps.buttons.cancelButton.display=true] - Determines whether to display the Cancel button.
 * @param {string} [modalProps.buttons.cancelButton.customText] - The custom text for the Cancel button.
 *
 * @returns {JSX.Element} The rendered modal layout.
 */
export function ModalLayout({
  type,
  content,
  modalProps = {
    displayIcon: true,
    buttons: {
      display: true,
      okButton: {
        display: true,
        customText: undefined,
      },
      cancelButton: {
        display: true,
        customText: undefined,
      },
    },
  },
}: Omit<ModalProps, "path" | "title">): JSX.Element {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const { displayIcon, buttons } = modalProps;

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
      {displayIcon ? (
        <section id="icon" className="flex items-center px-1">
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
      ) : (
        content
      )}

      {buttons?.display ? (
        <section className="flex items-center justify-center gap-5 mt-3 w-full h-full border-t border-[var(--mantine-color-gray-light)]">
          {buttons?.okButton?.display ? (
            <Button
              className={modalButtonsStyles}
              onClick={() => handleButton("ok")}
            >
              {buttons.okButton.customText ?? t("OK")}
            </Button>
          ) : null}

          {buttons?.cancelButton?.display ? (
            <Button
              className={modalButtonsStyles}
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
