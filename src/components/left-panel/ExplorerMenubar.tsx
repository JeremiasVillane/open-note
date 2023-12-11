import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { explorerMenubarControls } from "../../constants";
import { loadFiles } from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";

/**
 * Renders the menubar component for the explorer.
 *
 * @return {JSX.Element} The rendered menubar component.
 */
export function ExplorerMenubar(): JSX.Element {
  const { t } = useTranslation();
  const { setItems, setShowNewItemForm, setStatus } = useNotesStore();
  const { appFolder } = useTauriContext();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Group
      justify="flex-end"
      gap="1"
      bg={`${colorScheme === "light" ? "#e8f3fc" : "#1b2c3c"}`}
      className="pr-1 border-r border-[var(--mantine-color-gray-light)]"
    >
      {explorerMenubarControls(
        t,
        setShowNewItemForm,
        loadFiles,
        appFolder,
        setItems,
        setStatus
      ).map((control, index) => {
        return (
          <ActionIcon
            key={index}
            variant="default"
            className={control.className}
            title={control.title}
            onClick={control.onClick}
          >
            <i className={`ri-${control.icon}`}></i>
          </ActionIcon>
        );
      })}
    </Group>
  );
}
