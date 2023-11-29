import { AppShellHeader, Burger, Group } from "@mantine/core";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle, ThemeToggle, Toolbar } from "..";

export function HeaderLayout({
  leftPanelIsOpened,
  setLeftPanelIsOpened,
}: {
  leftPanelIsOpened: boolean;
  setLeftPanelIsOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const { i18n, t } = useTranslation();
  const { editor } = useRichTextEditorContext();

  return (
    <AppShellHeader
      p="md"
      className="flex items-center justify-between h-[50px] mt-[var(--titlebar-height)]"
    >
      <Group className="gap-0">
        <Burger
          color="transparent relative"
          opened={!leftPanelIsOpened}
          onClick={() => setLeftPanelIsOpened(!leftPanelIsOpened)}
          size="sm"
        >
          <i
            className={`${
              leftPanelIsOpened ? "ri-book-read-line" : "ri-book-read-fill"
            } text-2xl absolute -translate-y-4 -translate-x-1 hoverStyles`}
            title={t("Toggle sidebar") + "\nCtrl + Shift + B"}
          ></i>
        </Burger>
        {editor ? <Toolbar /> : null}
      </Group>

      <Group>
        <LanguageToggle i18n={i18n} />
        <ThemeToggle />
      </Group>
    </AppShellHeader>
  );
}
