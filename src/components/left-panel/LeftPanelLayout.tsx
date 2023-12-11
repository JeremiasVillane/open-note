import {
  AppShellNavbar,
  AppShellSection,
  useMantineColorScheme,
} from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { Explorer, ExplorerMenubar, NewItemForm } from "..";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";

/**
 * Renders the left panel layout of the application.
 *
 * @param {Object} param - An object containing the following properties:
 *   - sidebarWidth: The width of the sidebar.
 *   - setSidebarWidth: A function to set the width of the sidebar.
 * @return {JSX.Element} The JSX element representing the left panel layout.
 */
export function LeftPanelLayout({
  sidebarWidth,
  setSidebarWidth,
}: {
  sidebarWidth: number;
  setSidebarWidth: React.Dispatch<{
    width: number;
  }>;
}): JSX.Element {
  const { fileList, showNewItemForm } = useNotesStore();
  const { colorScheme } = useMantineColorScheme();
  const { appFolder } = useTauriContext();
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (event: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth({
          width:
            // @ts-ignore
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
    <AppShellNavbar
      className="titleBarAdjustedHeight overflow-auto flex flex-row flex-grow-0 flex-shrink-0 min-w-[150px] max-w-[500px]"
      style={{
        width: sidebarWidth,
      }}
      onMouseDown={(e) => e.preventDefault()}
      ref={sidebarRef}
    >
      <section id="sidebar-content" className="flex-1 z-20">
        <AppShellSection
          className="fixed min-w-[150px] max-w-[500px]"
          style={{ width: sidebarWidth }}
        >
          <ExplorerMenubar />
        </AppShellSection>

        <AppShellSection className="mt-7">
          {showNewItemForm ? (
            <NewItemForm
              itemType={showNewItemForm}
              path={appFolder}
              parentId="root"
            />
          ) : null}

          <Explorer fileList={fileList} />
        </AppShellSection>
      </section>

      <div
        id="sidebar-resizer"
        className={`flex-grow-0 flex-shrink-0 basis-1 justify-self-end cursor-col-resize resize-x hover:w-1 ${
          colorScheme === "light" ? "hover:bg-slate-300" : "hover:bg-slate-600"
        } z-10`}
        onMouseDown={startResizing}
      />
    </AppShellNavbar>
  );
}
