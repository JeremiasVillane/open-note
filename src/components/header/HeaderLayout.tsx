import { AppShellHeader, Group, UnstyledButton } from "@mantine/core";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import { useUiStore } from "@/store/uiStore";
import { Toolbar } from "./Toolbar";

/**
 * Renders the header layout of the application,
 * containing the sidebar toggle button and the Editor Toolbar.
 *
 * @return {React.ReactElement} The header layout component.
 */
export function HeaderLayout(): React.ReactElement {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { leftPanelIsClosed, setLeftPanelIsClosed } = useUiStore();

  return (
    <AppShellHeader
      p="md"
      className="flex items-center justify-between mt-[var(--titlebar-height)]"
    >
      <Group className="gap-1">
        <UnstyledButton
          onClick={() => setLeftPanelIsClosed(!leftPanelIsClosed)}
          size="sm"
        >
          <i
            className={`${
              leftPanelIsClosed ? "ri-book-read-line" : "ri-book-read-fill"
            } text-2xl hoverStyles`}
            title={t("Toggle sidebar") + "\nCtrl + Shift + B"}
          ></i>
        </UnstyledButton>
        {editor ? <Toolbar /> : null}
      </Group>
    </AppShellHeader>
  );
}
