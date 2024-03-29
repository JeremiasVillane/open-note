import { FileObj } from "@/types";
import { TFunction } from "i18next";
import { HK_NEW_FOLDER, HK_NEW_NOTE, HK_RELOAD_EXPLORER } from ".";

const commonStyles = "border-none hoverStyles";

/**
 * Generates the toolbar controls for the explorer.
 *
 * @param {TFunction<"translation", undefined>} t - The translation function.
 * @param {function} setShowNewItemForm - The function to show the form to create a new item.
 * @param {function} loadFiles - The function to load files.
 * @param {string} appFolder - The application folder.
 * @param {function} setItems - The function to update the fileList global state.
 * @param {function} setStatus - The function to update the status bar message.
 * @return {Array} An array of menubar control objects.
 */
export const explorerToolbarControls = (
  t: TFunction<"translation", undefined>,
  setShowNewItemForm: (value: "note" | "folder" | null) => void,
  loadFiles: (
    path: string,
    loaderFn: (content: FileObj[]) => void
  ) => Promise<void>,
  appFolder: string,
  setItems: (items: FileObj[]) => void,
  setStatus: (status: string | null) => void
) => [
  {
    icon: "file-add-line",
    title: `${t("New note")} 
    ${HK_NEW_NOTE}`,
    className: commonStyles,
    onClick: () => setShowNewItemForm("note"),
  },
  {
    icon: "folder-add-line",
    title: t("New folder") + `\n${HK_NEW_FOLDER}`,
    className: commonStyles,
    onClick: () => setShowNewItemForm("folder"),
  },
  {
    icon: "refresh-line",
    title: t("Reload explorer") + `\n${HK_RELOAD_EXPLORER}`,
    className: commonStyles,
    onClick: async () => {
      await loadFiles(appFolder, setItems);
      setStatus(t("Files loaded"));
    },
  },
];
