import { useMantineColorScheme } from "@mantine/core";
import TitleBarButtons from "./TitleBarButtons";
import TitleBarIconMenu from "./TitleBarIconMenu";
import { TitleBarProvider } from "./TitleBarProvider";
import TitleBarMenuBar from "./titlebar-menubar/TitleBarMenuBar";
import TitleBarName from "./TitleBarName";

export function Titlebar() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <TitleBarProvider>
      <section
        id="titlebar"
        className="h-[var(--titlebar-height)] flex justify-between fixed select-none top-0 left-0 right-0 z-[999]"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? "var(--mantine-color-dark-8)"
              : "var(--mantine-color-gray-1)",
        }}
        data-tauri-drag-region
      >
        <div className="flex items-center gap-1">
          <TitleBarIconMenu />

          <TitleBarMenuBar />
        </div>

        <TitleBarName />

        <TitleBarButtons />
      </section>
    </TitleBarProvider>
  );
}
