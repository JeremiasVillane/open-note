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

/**
 * Renders the main application component.
 * The component includes a dynamic sidebar that can be resized,
 * as well as header, main panel, and footer layouts.
 * @returns The JSX element representing the application.
 */
export default function App(): JSX.Element {
  const { leftPanelIsClosed } = useNotesStore();

  /**
   * Reducer function to update the sidebar state.
   * @param prev The previous sidebar state.
   * @param next The new sidebar state.
   * @returns The updated sidebar state.
   */
  const sidebarReducer = (prev: { width: number }, next: { width: number }) => {
    const newState = { ...prev, ...next };

    // Ensure the sidebar width does not exceed 500
    if (newState.width > 500) {
      newState.width = 500;
    }

    // Ensure the sidebar width does not go below 150
    if (newState.width < 150) {
      newState.width = 150;
    }

    return newState;
  };

  // Initialize the sidebar state with a default width of 200
  const [sidebarState, updateSidebarState] = useReducer(sidebarReducer, {
    width: 200,
  });

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
        setSidebarWidth={(value) => updateSidebarState({ width: value })}
      />

      <FooterLayout />
    </AppShell>
  );
}
