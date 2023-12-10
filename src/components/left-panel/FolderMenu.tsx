import { Paper, UnstyledButton } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { loadFiles } from "../../helpers";
import { handleDelete } from "../../helpers/handle-delete";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";
import { useHotkeys } from "@mantine/hooks";

export default function FolderMenu({
  menuItemStyles,
  folder,
  setNewItem,
  setToRename,
  setContext,
}: {
  menuItemStyles: string;
  folder: FileObj;
  setNewItem: Dispatch<SetStateAction<Record<string, string>>>;
  setToRename: Dispatch<SetStateAction<boolean>>;
  setContext: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const { appFolder } = useTauriContext();
  const { setStatus, setItems, setOpenFolder } = useNotesStore();

  const handleCreate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    folderId: string,
    itemType: string
  ) => {
    e.stopPropagation();

    setNewItem({
      [folderId]: itemType,
    });
  };

  useHotkeys([["escape", () => setContext(false)]], undefined, true);

  return (
    <Paper shadow="md" className="flex flex-col p-1 z-50">
      <UnstyledButton
        className={menuItemStyles}
        onClick={(e) => {
          e.stopPropagation();
          setToRename(true);
          setContext(false);
        }}
      >
        {t("Rename")}
      </UnstyledButton>

      <UnstyledButton
        className={menuItemStyles}
        onClick={(e) => {
          handleCreate(e, folder.id, "note");
          setOpenFolder(folder.id)
          setContext(false);
        }}
      >
        {t("New note")}
      </UnstyledButton>

      <UnstyledButton
        className={menuItemStyles}
        onClick={(e) => {
          handleCreate(e, folder.id, "folder");
          setOpenFolder(folder.id)
          setContext(false);
        }}
      >
        {t("New folder")}
      </UnstyledButton>

      <UnstyledButton
        className={`${menuItemStyles} text-red-600`}
        onClick={async (e) => {
          await handleDelete(e, "folder", setStatus, folder.path, t);
          loadFiles(appFolder, setItems);
          setContext(false);
        }}
      >
        {t("Delete folder")}
      </UnstyledButton>
    </Paper>
  );
}
