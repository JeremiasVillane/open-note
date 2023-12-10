import { AppShell } from "@mantine/core";
import { useReducer } from "react";
import {
  FooterLayout,
  HeaderLayout,
  LeftPanelLayout,
  MainPanelLayout,
} from "./components";
import { useNotesStore } from "./store/notesStore";
import "./styles/App.css";

export default function App(): JSX.Element {
  const { leftPanelIsClosed } = useNotesStore();
  const [sidebarState, updateSidebarState] = useReducer(
    (prev: { width: number }, next: { width: number }) => {
      const newState = { ...prev, ...next };

      if (newState.width > 500) {
        newState.width = 500;
      }
      if (newState.width < 150) {
        newState.width = 150;
      }

      return newState;
    },
    { width: 200 }
  );

  return (
    <AppShell
      header={{ height: 50 }}
      footer={{ height: 33 }}
      navbar={{
        width: sidebarState.width,
        breakpoint: "sm",
        collapsed: {
          mobile: leftPanelIsClosed,
          desktop: leftPanelIsClosed,
        },
      }}
      className="overflow-hidden select-none flex flex-row"
    >
      <MainPanelLayout />

      <HeaderLayout />

      <LeftPanelLayout
        sidebarWidth={sidebarState.width}
        setSidebarWidth={updateSidebarState}
      />

      <FooterLayout />
    </AppShell>
  );
}
