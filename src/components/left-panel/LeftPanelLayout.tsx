import { useMantineColorScheme } from "@mantine/core";
import ExplorerMenubar from "./ExplorerMenubar";
import LeftPanelContent from "./LeftPanelContent";

export function LeftPanelLayout({
  sidebarRef,
  sidebarSize,
  sidebarWidth,
  startResizing,
}: {
  sidebarRef: React.MutableRefObject<HTMLElement | null>;
  sidebarSize: {
    min: number;
    max: number;
  };
  sidebarWidth: number;
  startResizing: () => void;
}) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <section className="flex flex-col" ref={sidebarRef}>
        <ExplorerMenubar
          sidebarSize={sidebarSize}
          sidebarWidth={sidebarWidth}
        />

        <LeftPanelContent
          sidebarSize={sidebarSize}
          sidebarWidth={sidebarWidth}
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
