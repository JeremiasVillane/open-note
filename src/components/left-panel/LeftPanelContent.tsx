import { Suspense, lazy } from "react";
import { Explorer } from "..";
import { useTauriContext } from "../../providers/tauri-provider";
import { useNotesStore } from "../../store/notesStore";

const LazyNewItemForm = lazy(() => import("./NewItemForm"));

/**
 * Renders the content for the left panel.
 *
 * @param {{ sidebarSize: { min: number; max: number }; sidebarWidth: number }} props - The props object containing the sidebar size and width.
 * @returns {JSX.Element} The JSX element representing the left panel content.
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
        className={`overflow-auto flex-grow-0 flex-shrink-0 min-w-[${sidebarSize.min}px] max-w-[${sidebarSize.max}px] border-r border-[var(--mantine-color-gray-light)]`}
        style={{
          width: sidebarWidth,
          height:
            "calc(100vh - (var(--titlebar-height) + var(--header-height) + var(--footer-height) + var(--explorer-menubar-height)))",
          marginTop:
            "calc(var(--header-height) + var(--titlebar-height) + var(--explorer-menubar-height))",
          marginBottom: "var(--footer-height)",
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
