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
import { useEditor } from "@tiptap/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import {
  LanguageToggle,
  NoteForm,
  NoteList,
  NotePanel,
  ThemeToggle,
  Toolbar,
} from "./components";
import { extensions } from "./lib/extensions";
import { useNotesStore } from "./store/notesStore";

export default function App(): JSX.Element {
  const { i18n, t } = useTranslation();
  const { currentNote, status, showNoteForm } = useNotesStore();
  const [leftPanelIsOpened, setLeftPanelIsOpened] = useState(false);
  const { toggleColorScheme } = useMantineColorScheme();
  useHotkeys([["ctrl+J", toggleColorScheme]]);
  useHotkeys([
    ["ctrl+shift+B", () => setLeftPanelIsOpened(!leftPanelIsOpened)],
  ]);

  const editor = useEditor({
    extensions,
    content: currentNote?.content,
  });

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
        <NotePanel editor={editor!} />
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
            <Toolbar
              editor={editor}
              setLeftPanelIsOpened={setLeftPanelIsOpened}
            />
          ) : null}
        </Group>

        <Group>
          <LanguageToggle i18n={i18n} />
          <ThemeToggle />
        </Group>
      </AppShellHeader>

      <AppShellNavbar className="titleBarAdjustedHeight" hidden={false}>
        <AppShellSection>
          {showNoteForm ? <NoteForm /> : null}
          <NoteList editor={editor!} />
        </AppShellSection>
      </AppShellNavbar>

      <AppShellFooter
        p="md"
        className="flex justify-end items-center font-mono text-xs"
      >
        {status}
      </AppShellFooter>
    </AppShell>
  );
}
