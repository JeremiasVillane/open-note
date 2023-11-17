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
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import "@mantine/tiptap/styles.css";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "simplebar-react/dist/simplebar.min.css";
import classes from "./App.module.css";
import { NoteForm, NoteList, NotePanel } from "./components";
import { HEADER_TITLE } from "./utils";
// import LanguageHeaders from "./Components/LanguageHeaders";
// import { ScrollToTop } from "./Components/ScrollToTop";

export default function App(): JSX.Element {
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
    <>
      <AppShell
        header={{ height: 60 }}
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
        // className={classes.appShell}
      >
        <AppShellMain>
          <NotePanel />
          {/* <ScrollToTop
              scroller={scrollbarRef.current}
              bottom={showFooter ? 70 : 20}
            /> */}
        </AppShellMain>

        <AppShellHeader
          data-tauri-drag-region
          p="md"
          className={classes.header}
        >
          <Group h="100%">
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
            {/* <Text>{HEADER_TITLE}</Text> */}
          </Group>
          <Group className={classes.headerRightItems} h="110%">
            {/* <LanguageHeaders i18n={i18n} /> */}
            <ActionIcon
              id="toggle-theme"
              title="Ctrl + J"
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {colorScheme === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </ActionIcon>
          </Group>
        </AppShellHeader>

        <AppShellNavbar
          className={classes.titleBarAdjustedHeight}
          hidden={!leftPanelIsOpened}
        >
          <AppShellSection>
            <NoteForm />
            <NoteList />
          </AppShellSection>
        </AppShellNavbar>

        <AppShellFooter p="md" className={classes.footer}>
          Footer
        </AppShellFooter>
      </AppShell>

      <Toaster />
    </>
  );
}
