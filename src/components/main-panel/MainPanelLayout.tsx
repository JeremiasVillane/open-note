import { AppShellMain } from "@mantine/core";
import { useNotesStore } from "../../store/notesStore";
import Editor from "./Editor";
import Welcome from "./Welcome";

export function MainPanelLayout(): JSX.Element {
  const { currentNote } = useNotesStore();

  return (
    <AppShellMain className="flex-1">
      {currentNote ? <Editor /> : <Welcome />}
    </AppShellMain>
  );
}
