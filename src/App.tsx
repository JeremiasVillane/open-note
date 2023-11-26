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
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import { LanguageToggle, NoteForm, NoteList, NotePanel } from "./components";
import { useNotesStore } from "./store/notesStore";
import Menubar from "./components/header/Menubar";

export default function App(): JSX.Element {
  const { currentNote, status } = useNotesStore();
  const { i18n } = useTranslation();
  const [leftPanelIsOpened, setLeftPanelIsOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  useHotkeys([["ctrl+J", toggleColorScheme]]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
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
      className="overflow-hidden"
    >
      <AppShellMain>
        <NotePanel editor={editor!} />
      </AppShellMain>

      <AppShellHeader
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
          {editor ? <Menubar editor={editor} /> : null}
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
          <NoteList editor={editor!} />
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
