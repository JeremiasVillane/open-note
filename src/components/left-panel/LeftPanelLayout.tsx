import { AppShellNavbar, AppShellSection } from "@mantine/core";
import { Explorer, ExplorerMenubar, NewItemForm } from "..";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";

export function LeftPanelLayout() {
  const { fileList, showNewItemForm } = useNotesStore();
  const { appDocuments } = useTauriContext();

  return (
    <AppShellNavbar
      className="titleBarAdjustedHeight overflow-auto"
      hidden={false}
    >
      <AppShellSection>
        <ExplorerMenubar />
        {showNewItemForm ? (
          <NewItemForm
            itemType={showNewItemForm}
            path={appDocuments}
            parentId="root"
          />
        ) : null}

        <Explorer fileList={fileList} />
      </AppShellSection>
    </AppShellNavbar>
  );
}
