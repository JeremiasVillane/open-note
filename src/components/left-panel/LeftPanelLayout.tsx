import { useMantineColorScheme } from "@mantine/core";
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
  sidebarSize,
  sidebarWidth,
  setSidebarWidth,
}: {
  sidebarSize: { min: number; max: number };
  sidebarWidth: number;
  setSidebarWidth: React.Dispatch<number>;
}): JSX.Element {
  const { leftPanelIsClosed } = useNotesStore();
  const { fileList, showNewItemForm } = useNotesStore();
  const { colorScheme } = useMantineColorScheme();
  const { appFolder } = useTauriContext();
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (event: MouseEvent) => {
      // Check if the resizing flag is true and if the sidebarRef is available
      if (isResizing && sidebarRef.current) {
        // Calculate the new width of the sidebar by subtracting the left position
        // of the mouse event from the left position of the sidebarRef element
        setSidebarWidth(
          event.clientX - sidebarRef.current.getBoundingClientRect().left
        );
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
    <>
      {!leftPanelIsClosed ? (
        <>
          <header
            className={`fixed min-w-[${sidebarSize.min}px] max-w-[${sidebarSize.max}px] z-50`}
            style={{
              width: sidebarWidth,
              marginTop: "calc(var(--titlebar-height) + var(--header-height))",
            }}
          >
            <ExplorerMenubar />
          </header>

          <aside
            className={`titleBarAdjustedHeight overflow-auto flex flex-row flex-grow-0 flex-shrink-0 min-w-[${sidebarSize.min}px] max-w-[${sidebarSize.max}px] border-r border-[var(--mantine-color-gray-light)]`}
            style={{
              width: sidebarWidth,
              marginTop:
                "calc(var(--header-height) + var(--titlebar-height) + 1.5rem)",
            }}
            onMouseDown={(e) => e.preventDefault()}
            ref={sidebarRef}
          >
            <section id="sidebar-content" className="flex-1 flex flex-col z-20">
              <div className="">
                {showNewItemForm ? (
                  <NewItemForm
                    itemType={showNewItemForm}
                    path={appFolder}
                    parentId="root"
                  />
                ) : null}

                <Explorer fileList={fileList} />
              </div>
            </section>
          </aside>

          <div
            id="sidebar-resizer"
            className={`flex-grow-0 flex-shrink-0 basis-1 justify-self-end cursor-col-resize resize-x hover:w-1 ${
              colorScheme === "light"
                ? "hover:bg-slate-300"
                : "hover:bg-slate-600"
            } z-10`}
            onMouseDown={startResizing}
          />
        </>
      ) : null}
    </>
  );
}
