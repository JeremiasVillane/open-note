import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { explorerToolbarControls } from "../../constants";
import { loadFiles } from "../../helpers";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";
import { useUiStore } from "../../store/uiStore";

/**
 * Renders the menubar component for the explorer.
 *
 * @return {React.ReactElement} The rendered menubar component.
 */
export default function ExplorerToolbar({
  sidebarSize,
  sidebarWidth,
}: {
  sidebarSize: { min: number; max: number };
  sidebarWidth: number;
}): React.ReactElement {
  const { t } = useTranslation();
  const { setItems, setShowNewItemForm } = useNotesStore();
  const { setStatus } = useUiStore();
  const { appFolder } = useTauriContext();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Group
      justify="flex-end"
      gap="1"
      bg={`${colorScheme === "light" ? "#e8f3fc" : "#1b2c3c"}`}
      className={`fixed pr-1 border-r border-[var(--mantine-color-gray-light)] min-w-[${sidebarSize.min}px] max-w-[${sidebarSize.max}px]`}
      style={{
        height: "var(--explorer-menubar-height)",
        width: sidebarWidth,
        marginTop: "calc(var(--titlebar-height) + var(--header-height))",
      }}
    >
      {explorerToolbarControls(
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
