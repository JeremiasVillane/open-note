import { AppShellMain } from "@mantine/core";
import { useNotesStore } from "../../store/notesStore";
import Editor from "./Editor";
import Welcome from "./Welcome";

/**
 * Renders the main panel layout.
 *
 * @return {JSX.Element} The JSX element representing the main panel layout.
 *
 * If a note is seleted, it renders the Editor component. Otherwise, it renders a Welcome component.
 */
export function MainPanelLayout(): JSX.Element {
  const { currentNote } = useNotesStore();

  return (
    <AppShellMain className="flex-1">
      {currentNote ? <Editor /> : <Welcome />}
    </AppShellMain>
  );
}
