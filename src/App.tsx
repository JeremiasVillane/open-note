import { AppShell } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
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
 *
 * The component includes a dynamic sidebar that can be resized,
 * as well as header, main panel, and footer layouts.
 * @returns The JSX element representing the application.
 *
 * Resizing logic based partially on: https://codereview.stackexchange.com/questions/263970/react-based-resizable-sidebar
 */
export default function App(): JSX.Element {
  const { leftPanelIsClosed, setLeftPanelIsClosed } = useNotesStore();
  const { ref, width } = useElementSize();
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const sidebarSize = { min: 150, max: width / 2 };

  const [sidebarState, updateSidebarState] = useReducer(
    (prev: { width: number }, next: { width: number }) => {
      const newState = { ...prev, ...next };

      if (newState.width > sidebarSize.max) {
        newState.width = sidebarSize.max;
      }

      if (newState.width < sidebarSize.min) {
        setLeftPanelIsClosed(true);
        newState.width = sidebarSize.min;
      }

      return newState;
    },
    {
      width: 200,
    }
  );

  const startResizing = useCallback(() => {
    setIsResizing(true);

    const root = document.getElementById("root");
    if (root) {
      root.style.setProperty("cursor", "col-resize");
    }
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);

    const root = document.getElementById("root");
    if (root) {
      root.style.setProperty("cursor", "default");
    }
  }, []);

  const resize = useCallback(
    (event: MouseEvent) => {
      // Check if the resizing flag is true and if the sidebarRef is available
      if (isResizing && sidebarRef.current) {
        // Calculate the new width of the sidebar by subtracting the left position
        // of the mouse event from the left position of the sidebarRef element
        updateSidebarState({
          width:
            event.clientX - sidebarRef.current.getBoundingClientRect().left,
        });
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <AppShell
      ref={ref}
      header={{ height: "var(--header-height)" }}
      footer={{ height: "var(--footer-height)" }}
      className="overflow-hidden select-none flex flex-row"
    >
      {!leftPanelIsClosed ? (
        <LeftPanelLayout
          sidebarRef={sidebarRef}
          sidebarSize={sidebarSize}
          sidebarWidth={sidebarState.width}
          isResizing={isResizing}
          startResizing={startResizing}
        />
      ) : null}

      <MainPanelLayout />

      <HeaderLayout />

      <FooterLayout />
    </AppShell>
  );
}
