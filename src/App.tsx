import { AppShell, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useState } from "react";
import {
  FooterLayout,
  HeaderLayout,
  LeftPanelLayout,
  MainPanelLayout,
} from "./components";
import { loadFiles } from "./helpers";
import { useTauriContext } from "./providers/tauri-provider";
import { useNotesStore } from "./store/notesStore";
import "./styles/App.css";

export default function App(): JSX.Element {
  const { appDocuments } = useTauriContext();
  const { toggleColorScheme } = useMantineColorScheme();
  const { setItems, setShowNewItemForm } = useNotesStore();
  const [leftPanelIsOpened, setLeftPanelIsOpened] = useState(false);

  useHotkeys([
    ["ctrl+J", toggleColorScheme],
    ["ctrl+shift+E", () => setLeftPanelIsOpened(!leftPanelIsOpened)],
    [
      "ctrl+shift+R",
      () => {
        loadFiles(appDocuments, setItems);
        setLeftPanelIsOpened(false);
      },
    ],
    [
      "ctrl+N",
      () => {
        setShowNewItemForm("note");
        setLeftPanelIsOpened(false);
      },
    ],
    [
      "ctrl+shift+F",
      () => {
        setShowNewItemForm("folder");
        setLeftPanelIsOpened(false);
      },
    ],
  ]);

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
      <MainPanelLayout />

      <HeaderLayout
        leftPanelIsOpened={leftPanelIsOpened}
        setLeftPanelIsOpened={setLeftPanelIsOpened}
      />

      <LeftPanelLayout />

      <FooterLayout />
    </AppShell>
  );
}
