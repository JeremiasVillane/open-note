import {
  ActionIcon,
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  Burger,
  Group,
  // Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import {
  LanguageToggle,
  Menubar,
  NoteForm,
  NoteList,
  NotePanel,
} from "./components";
import { MoonIcon, SunIcon } from "./components/ui/icons";
import { extensions } from "./lib/extensions";
import { useNotesStore } from "./store/notesStore";

export default function App(): JSX.Element {
  const { i18n, t } = useTranslation();
  const { currentNote, status, showNoteForm } = useNotesStore();
  const [leftPanelIsOpened, setLeftPanelIsOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  useHotkeys([["ctrl+J", toggleColorScheme]]);
  useHotkeys([
    ["ctrl+shift+B", () => setLeftPanelIsOpened(!leftPanelIsOpened)],
  ]);

  const hoverStyles =
    "hover:text-indigo-900 transition-colors ease-in-out duration-150";

  const editor = useEditor({
    extensions,
    content: currentNote?.content,
  });

  useEffect(() => {
    async function createNotesDir() {
      await createDir("open-note", {
        dir: BaseDirectory.Document,
        recursive: true,
      });
    }

    createNotesDir();
  }, []);

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
        className="flex items-center h-[50px] mt-[var(--titlebar-height)]"
      >
        <Group>
          <Burger
            color="transparent relative"
            opened={!leftPanelIsOpened}
            onClick={() => setLeftPanelIsOpened(!leftPanelIsOpened)}
            size="sm"
          >
            <i
              className={`${
                leftPanelIsOpened ? "ri-book-read-line" : "ri-book-read-fill"
              } text-2xl absolute -translate-y-4 -translate-x-1 ${hoverStyles}`}
              title={t("Toggle sidebar") + "\nCtrl + Shift + B"}
            ></i>
          </Burger>
          {editor ? <Menubar editor={editor} /> : null}
        </Group>
        <Group className="ml-auto">
          <LanguageToggle i18n={i18n} />
          <ActionIcon
            id="toggle-theme"
            title={`
            ${t("Dark/Light Theme")}
          Ctrl + J
            `}
            variant="default"
            className={`border-none ${hoverStyles}`}
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === "dark" ? <MoonIcon /> : <SunIcon />}
          </ActionIcon>
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
