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
import "@mantine/tiptap/styles.css";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import { LanguageToggle, NoteForm, NoteList, NotePanel } from "./components";
import { useNotesStore } from "./store/notesStore";

export default function App(): JSX.Element {
  const { status } = useNotesStore();
  const { i18n } = useTranslation();
  const [leftPanelIsOpened, setLeftPanelIsOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  useHotkeys([["ctrl+J", toggleColorScheme]]);

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
      className="overflow-hidden"
    >
      <AppShellMain>
        <NotePanel />
      </AppShellMain>

      <AppShellHeader
        data-tauri-drag-region
        p="md"
        className="flex items-center h-[50px] mt-[var(--titlebar-height)] select-none"
      >
        <Group>
          <Burger
            hiddenFrom="sm"
            opened={!leftPanelIsOpened}
            onClick={() => setLeftPanelIsOpened(!leftPanelIsOpened)}
            size="sm"
          />
          <Burger
            visibleFrom="sm"
            opened={!leftPanelIsOpened}
            onClick={() => setLeftPanelIsOpened(!leftPanelIsOpened)}
            size="sm"
          />
          {/* ACÁ EL HEADER */}
        </Group>
        <Group className="ml-auto">
          <LanguageToggle i18n={i18n} />
          <ActionIcon
            id="toggle-theme"
            title="Ctrl + J"
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </ActionIcon>
        </Group>
      </AppShellHeader>

      <AppShellNavbar
        className="titleBarAdjustedHeight select-none"
        hidden={false}
      >
        <AppShellSection>
          <NoteForm />
          <NoteList />
        </AppShellSection>
      </AppShellNavbar>

      <AppShellFooter
        p="md"
        className="flex justify-end items-center select-none font-mono text-sm"
      >
        {status}
      </AppShellFooter>
    </AppShell>
  );
}
