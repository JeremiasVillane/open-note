import { useMantineColorScheme } from "@mantine/core";
import ExplorerToolbar from "./ExplorerToolbar";
import LeftPanelContent from "./LeftPanelContent";

/**
 * Renders the layout for the left panel.
 *
 * @param {Object} props - The properties object.
 * @param {React.MutableRefObject<HTMLElement | null>} props.sidebarRef - The ref to the sidebar element.
 * @param {Object} props.sidebarSize - The minimum and maximum size of the sidebar.
 * @param {number} props.sidebarSize.min - The minimum size of the sidebar.
 * @param {number} props.sidebarSize.max - The maximum size of the sidebar.
 * @param {number} props.sidebarWidth - The width of the sidebar.
 * @param {boolean} props.isResizing - Indicates if the left panel is being resized.
 * @param {Function} props.startResizing - The function to start resizing the sidebar.
 * @return {JSX.Element} The rendered left panel layout.
 */
export function LeftPanelLayout({
  sidebarRef,
  sidebarSize,
  sidebarWidth,
  isResizing,
  startResizing,
}: {
  sidebarRef: React.MutableRefObject<HTMLElement | null>;
  sidebarSize: {
    min: number;
    max: number;
  };
  sidebarWidth: number;
  isResizing:boolean;
  startResizing: () => void;
}): JSX.Element {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <section
        className="flex flex-col"
        ref={sidebarRef}
      >
        <ExplorerToolbar
          sidebarSize={sidebarSize}
          sidebarWidth={sidebarWidth}
        />

        <LeftPanelContent
          sidebarSize={sidebarSize}
          sidebarWidth={sidebarWidth}
          isResizing={isResizing}
        />
      </section>

      <div
        id="sidebar-resizer"
        className={`flex-grow-0 flex-shrink-0 basis-1 justify-self-end cursor-col-resize resize-x hover:w-1 ${
          colorScheme === "light" ? "hover:bg-slate-300" : "hover:bg-slate-600"
        } z-10`}
        onMouseDown={startResizing}
      />
    </>
  );
}
