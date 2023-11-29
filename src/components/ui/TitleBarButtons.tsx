import { useMantineColorScheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { CloseIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from "./icons";

export default function TitleBarButtons({
  handleMinimize,
  handleRestore,
  handleMaximize,
  handleClose,
  isMaximized,
}: {
  handleMinimize: () => void;
  handleRestore: () => void;
  handleMaximize: () => void;
  handleClose: () => Promise<void>;
  isMaximized: boolean;
}) {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  const buttonStyles =
    "inline-flex items-center justify-center w-12 h-[var(--titlebar-height)] transition-colors duration-200";
  const buttonStylesOnHover =
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-slate-400";

  return (
    <div className="flex items-center">
      <i
        className={`${buttonStyles} ${buttonStylesOnHover}`}
        onClick={handleMinimize}
      >
        <MinimizeIcon title={t("Minimize")} size={18} className="p-0.5" />
      </i>

      {isMaximized ? (
        <i
          className={`${buttonStyles} ${buttonStylesOnHover}`}
          onClick={handleRestore}
        >
          <RestoreIcon title={t("Restore")} size={18} className="p-0.5" />
        </i>
      ) : (
        <i
          onClick={handleMaximize}
          className={`${buttonStyles} ${buttonStylesOnHover}`}
        >
          <MaximizeIcon title={t("Maximize")} size={18} className="p-0.5" />
        </i>
      )}

      <i
        className={`${buttonStyles} hover:bg-red-500 hover:text-gray-100`}
        onClick={handleClose}
      >
        <CloseIcon title={t("Close")} size={18} className="p-0.5" />
      </i>
    </div>
  );
}
