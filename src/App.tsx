import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  Burger,
  Group,
  useMantineColorScheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { count } from "letter-count";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FileList,
  LanguageToggle,
  NotePanel,
  ThemeToggle,
  Toolbar,
} from "./components";
import { useNotesStore } from "./store/notesStore";
import "./styles/App.css";
import { ItemListMenubar } from "./components/left-panel/ItemListMenubar";

export default function App(): JSX.Element {
  const { i18n, t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { fileList, status } = useNotesStore();
  const [leftPanelIsOpened, setLeftPanelIsOpened] = useState(false);
  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([["ctrl+J", toggleColorScheme]]);
  useHotkeys([
    ["ctrl+shift+B", () => setLeftPanelIsOpened(!leftPanelIsOpened)],
  ]);

  const editorContent = editor?.getText();
  const stadistics = count(editorContent ?? "");

  return (
    <AppShell
      header={{ height: 50 }}
      footer={{ height: 33 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: {
          mobile: leftPanelIsOpened,
          desktop: leftPanelIsOpened,
        },
      }}
      className="overflow-hidden select-none"
    >
      <AppShellMain>
        <NotePanel />
      </AppShellMain>

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
          {editor ? (
            <Toolbar setLeftPanelIsOpened={setLeftPanelIsOpened} />
          ) : null}
        </Group>

        <Group>
          <LanguageToggle i18n={i18n} />
          <ThemeToggle />
        </Group>
      </AppShellHeader>

      <AppShellNavbar className="titleBarAdjustedHeight" hidden={false}>
        <AppShellSection>
          <ItemListMenubar />
          <FileList fileList={fileList} />
        </AppShellSection>
      </AppShellNavbar>

      <AppShellFooter
        p="md"
        className="flex justify-between items-center font-mono text-xs"
      >
        {editorContent?.length ? (
          <div>
            {t("Characters")}: {stadistics.chars}{" "}|{" "}
            {t("Letters")}: {stadistics.letters}{" "}|{" "}
            {t("Words")}: {stadistics.words}{" "}|{" "}
            {t("Lines")}: {stadistics.lines > 1 
              ? stadistics.lines - (stadistics.lines - 1) / 2 
              : stadistics.lines}
          </div>
        ) : (
          <></>
        )}

        {status}
      </AppShellFooter>
    </AppShell>
  );
}
