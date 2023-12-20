import { useMantineColorScheme } from "@mantine/core";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  CloseIcon,
  MaximizeIcon,
  MinimizeIcon,
  RestoreIcon,
} from "@/components/ui/icons";
import TitleBarContext from "@/providers/titlebar-provider";

/**
 * Renders the window controls.
 *
 * @return {React.ReactElement} The rendered title bar buttons.
 */
export default function TitleBarButtons({
  modal,
}: {
  modal: boolean;
}): React.ReactElement {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const { isMaximized, handleMinimize, handleMaximize, handleExit } =
    useContext(TitleBarContext);

  const buttonStyles =
    "inline-flex items-center justify-center w-12 h-[var(--titlebar-height)] transition-colors duration-200";
  const buttonStylesOnHover =
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-slate-400";

  return (
    <div className="flex items-center">
      {!modal ? (
        <>
          <i
            className={`${buttonStyles} ${buttonStylesOnHover}`}
            onClick={handleMinimize}
          >
            <MinimizeIcon title={t("Minimize")} className="p-0.5" />
          </i>

          <i
            className={`${buttonStyles} ${buttonStylesOnHover}`}
            onClick={handleMaximize}
          >
            {isMaximized ? (
              <RestoreIcon title={t("Restore")} className="p-0.5" />
            ) : (
              <MaximizeIcon title={t("Maximize")} className="p-0.5" />
            )}
          </i>
        </>
      ) : null}

      <i
        className={`${buttonStyles} hover:bg-red-500 hover:text-gray-100`}
        onClick={handleExit}
      >
        <CloseIcon title={t("Close")} className="p-0.5" />
      </i>
    </div>
  );
}
