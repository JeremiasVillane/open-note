import { AppShellHeader, Group, UnstyledButton } from "@mantine/core";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import { Toolbar } from "..";
import { useNotesStore } from "../../store/notesStore";

/**
 * Renders the header layout of the application,
 * containing the sidebar toggle button and the Editor Toolbar.
 *
 * @return {JSX.Element} The header layout component.
 */
export function HeaderLayout(): JSX.Element {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { leftPanelIsClosed, setLeftPanelIsClosed } = useNotesStore();

  return (
    <AppShellHeader
      p="md"
      className="flex items-center justify-between mt-[var(--titlebar-height)]"
    >
      <Group className="gap-5">
        <UnstyledButton
          onClick={() => setLeftPanelIsClosed(!leftPanelIsClosed)}
          size="sm"
        >
          <i
            className={`${
              leftPanelIsClosed ? "ri-book-read-line" : "ri-book-read-fill"
            } text-2xl absolute -translate-y-4 -translate-x-1 hoverStyles`}
            title={t("Toggle sidebar") + "\nCtrl + Shift + B"}
          ></i>
        </UnstyledButton>
        {editor ? <Toolbar /> : null}
      </Group>
    </AppShellHeader>
  );
}
