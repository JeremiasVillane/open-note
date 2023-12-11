import { Text } from "@mantine/core";
import { useContext } from "react";
import { useNotesStore } from "../../store/notesStore";
import TitleBarContext from "./TitleBarProvider";

/**
 * Renders the name to be displayed in the title bar of the application.
 *
 * @return {JSX.Element} The JSX element representing the name to be displayed in the title bar.
 */
export default function TitleBarName(): JSX.Element {
  const { currentNote } = useNotesStore();
  const { windowTitle } = useContext(TitleBarContext);

  return (
    <Text
      data-tauri-drag-region
      inline
      size="sm"
      className="overlook self-center italic"
      data-text={currentNote ? currentNote.name : windowTitle}
    />
  );
}
