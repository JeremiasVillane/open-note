import { TransitionProps, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import TitleBarButtons from "./TitleBarButtons";
import TitleBarIconMenu from "./TitleBarIconMenu";
import TitleBarName from "./TitleBarName";
import { TitleBarProvider } from "./TitleBarProvider";
import TitleBarMenuBar from "./titlebar-menubar/TitleBarMenuBar";

/**
 * Renders the Titlebar component,
 * containing the icon menu, menu bar, window name and window controls.
 *
 * @return {JSX.Element} The rendered Titlebar component.
 */
export function Titlebar(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const [open, setOpen] = useState(false);

  const transitionProps: Partial<Omit<TransitionProps, "mounted">> = {
    transition: "fade",
    duration: 1,
  };

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
        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setOpen(false)}
        >
          <TitleBarIconMenu
            transitionProps={transitionProps}
            open={open}
            setOpen={setOpen}
          />

          <TitleBarMenuBar
            transitionProps={transitionProps}
            open={open}
            setOpen={setOpen}
          />
        </div>

        <TitleBarName />

        <TitleBarButtons />
      </section>
    </TitleBarProvider>
  );
}
