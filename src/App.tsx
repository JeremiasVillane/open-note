import { AppShell, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useState } from "react";
import {
  FooterLayout,
  HeaderLayout,
  LeftPanelLayout,
  MainPanelLayout,
} from "./components";
import "./styles/App.css";

export default function App(): JSX.Element {
  const [leftPanelIsOpened, setLeftPanelIsOpened] = useState(false);
  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([["ctrl+J", toggleColorScheme]]);
  useHotkeys([
    ["ctrl+shift+B", () => setLeftPanelIsOpened(!leftPanelIsOpened)],
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
