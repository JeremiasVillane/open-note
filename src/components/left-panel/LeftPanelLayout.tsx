import { AppShellNavbar, AppShellSection } from "@mantine/core";
import { Explorer, ExplorerMenubar } from "..";
import { useNotesStore } from "../../store/notesStore";

export function LeftPanelLayout() {
  const { fileList } = useNotesStore();

  return (
    <AppShellNavbar className="titleBarAdjustedHeight overflow-auto" hidden={false}>
      <AppShellSection>
        <ExplorerMenubar />
        <Explorer fileList={fileList} />
      </AppShellSection>
    </AppShellNavbar>
  );
}
