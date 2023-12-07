import { AppShellNavbar, AppShellSection } from "@mantine/core";
import { Explorer, ExplorerMenubar, NewItemForm } from "..";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";

export function LeftPanelLayout() {
  const { fileList, showNewItemForm } = useNotesStore();
  const { appFolder } = useTauriContext();

  return (
    <AppShellNavbar
      className="titleBarAdjustedHeight overflow-auto"
      hidden={false}
    >
      <AppShellSection className="fixed w-[12.5rem] z-50">
        <ExplorerMenubar />
      </AppShellSection>

      <AppShellSection className="mt-7">
        {showNewItemForm ? (
          <NewItemForm
            itemType={showNewItemForm}
            path={appFolder}
            parentId="root"
          />
        ) : null}

        <Explorer fileList={fileList} />
      </AppShellSection>
    </AppShellNavbar>
  );
}
