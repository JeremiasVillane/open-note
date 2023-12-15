import { Suspense, lazy } from "react";
import { Explorer } from "..";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";

const LazyNewItemForm = lazy(() => import("./NewItemForm"));

/**
 * Renders the left panel layout of the application.
 *
 * @param {Object} param - An object containing the following properties:
 *   - sidebarWidth: The width of the sidebar.
 *   - setSidebarWidth: A function to set the width of the sidebar.
 * @return {JSX.Element} The JSX element representing the left panel layout.
 */
export default function LeftPanelContent({
  sidebarSize,
  sidebarWidth,
}: {
  sidebarSize: { min: number; max: number };
  sidebarWidth: number;
}): JSX.Element {
  const { fileList, showNewItemForm } = useNotesStore();

  const { appFolder } = useTauriContext();

  return (
    <>
      <aside
        className={`titleBarAdjustedHeight overflow-auto flex-grow-0 flex-shrink-0 min-w-[${sidebarSize.min}px] max-w-[${sidebarSize.max}px] border-r border-[var(--mantine-color-gray-light)]`}
        style={{
          width: sidebarWidth,
          marginTop:
            "calc(var(--header-height) + var(--titlebar-height) + 1.5rem)",
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <section id="sidebar-content" className="flex-1 flex flex-col z-20">
          <div className="">
            {showNewItemForm ? (
              <Suspense>
                <LazyNewItemForm
                  itemType={showNewItemForm}
                  path={appFolder}
                  parentId="root"
                />
              </Suspense>
            ) : null}

            <Explorer fileList={fileList} />
          </div>
        </section>
      </aside>
    </>
  );
}
