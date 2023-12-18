import { Text } from "@mantine/core";
import { useContext } from "react";
import { useNotesStore } from "../../store/notesStore";
import TitleBarContext from "../../providers/titlebar-provider";
import { useTranslation } from "react-i18next";

/**
 * Renders the name to be displayed in the title bar of the application.
 *
 * @return {JSX.Element} The JSX element representing the name to be displayed in the title bar.
 */
export default function TitleBarName({
  modal,
}: {
  modal?: string;
}): JSX.Element {
  const { t } = useTranslation();
  const { currentNote } = useNotesStore();
  const { windowTitle } = useContext(TitleBarContext);

  return (
    <Text
      data-tauri-drag-region
      inline
      size="sm"
      className={`overlook self-center italic ${modal ? "ml-3" : ""}`}
      data-text={
        currentNote ? currentNote.name : modal ? t(modal) : windowTitle
      }
    />
  );
}
