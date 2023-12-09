import { AppShellHeader, Burger, Group } from "@mantine/core";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import { Toolbar } from "..";
import { useNotesStore } from "../../store/notesStore";

export function HeaderLayout() {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { leftPanelIsClosed, setLeftPanelIsClosed } = useNotesStore();

  return (
    <AppShellHeader
      p="md"
      className="flex items-center justify-between h-[50px] mt-[var(--titlebar-height)]"
    >
      <Group className="gap-0">
        <Burger
          color="transparent relative"
          opened={!leftPanelIsClosed}
          onClick={() => setLeftPanelIsClosed(!leftPanelIsClosed)}
          size="sm"
        >
          <i
            className={`${
              leftPanelIsClosed ? "ri-book-read-line" : "ri-book-read-fill"
            } text-2xl absolute -translate-y-4 -translate-x-1 hoverStyles`}
            title={t("Toggle sidebar") + "\nCtrl + Shift + B"}
          ></i>
        </Burger>
        {editor ? <Toolbar /> : null}
      </Group>
    </AppShellHeader>
  );
}
