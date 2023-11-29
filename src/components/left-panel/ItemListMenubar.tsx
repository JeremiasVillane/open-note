import { ActionIcon, Group } from "@mantine/core";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { getUserAppFiles } from "../../utils";

export function ItemListMenubar() {
  const { setItems, setShowNewItemForm } = useNotesStore();
  const { appDocuments } = useTauriContext();

  const handleRefresh = async () => {
    const folderContent = await getUserAppFiles(appDocuments);
    setItems(folderContent);
  };

  return (
    <Group
      justify="flex-end"
      gap="1"
      bg="var(--mantine-color-blue-light)"
      className="pr-1"
    >
      <ActionIcon
        variant="default"
        className="border-none"
        onClick={() => setShowNewItemForm("note")}
      >
        <i className="ri-file-add-line hoverStyles"></i>
      </ActionIcon>

      <ActionIcon
        variant="default"
        className="border-none"
        onClick={() => setShowNewItemForm("folder")}
      >
        <i className="ri-folder-add-line hoverStyles"></i>
      </ActionIcon>

      <ActionIcon
        variant="default"
        className="border-none"
        onClick={handleRefresh}
      >
        <i className="ri-refresh-line hoverStyles"></i>
      </ActionIcon>
    </Group>
  );
}
