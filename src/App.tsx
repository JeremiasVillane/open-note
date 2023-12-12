import { AppShell } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useReducer } from "react";
import {
  FooterLayout,
  HeaderLayout,
  LeftPanelLayout,
  MainPanelLayout,
} from "./components";
import "./styles/App.css";

/**
 * Renders the main application component.
 *
 * The component includes a dynamic sidebar that can be resized,
 * as well as header, main panel, and footer layouts.
 * @returns The JSX element representing the application.
 */
export default function App(): JSX.Element {
  const { ref, width } = useElementSize();

  const sidebarSize = { min: 150, max: width / 2 };

  /**
   * Reducer function to update the sidebar state.
   * @param prev The previous sidebar state.
   * @param next The new sidebar state.
   * @returns The updated sidebar state.
   */
  const sidebarReducer = (prev: { width: number }, next: { width: number }) => {
    const newState = { ...prev, ...next };

    // Ensure the sidebar width does not exceed half of the window
    if (newState.width > sidebarSize.max) {
      newState.width = sidebarSize.max;
    }

    // Ensure the sidebar width does not go below 150
    if (newState.width < sidebarSize.min) {
      newState.width = sidebarSize.min;
    }

    return newState;
  };

  // Initialize the sidebar state with a default width of 200
  const [sidebarState, updateSidebarState] = useReducer(sidebarReducer, {
    width: 200,
  });

  return (
    <AppShell
      ref={ref}
      header={{ height: "var(--header-height)" }}
      footer={{ height: "var(--footer-height)" }}
      className="overflow-hidden select-none flex flex-row"
    >
      <LeftPanelLayout
        sidebarSize={sidebarSize}
        sidebarWidth={sidebarState.width}
        setSidebarWidth={(value) => updateSidebarState({ width: value })}
      />

      <MainPanelLayout />

      <HeaderLayout />

      <FooterLayout />
    </AppShell>
  );
}
